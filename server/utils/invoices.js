import { rm } from 'node:fs/promises'
import { sql } from 'kysely'
import { INVOICE_DESIGN_LINE_NAME, INVOICE_SELLER, INVOICE_VAT } from './invoice-config.js'
import { createInvoicePdfPath, fileExists, generateInvoicePdfFromSnapshot, readInvoicePdf } from './invoice-renderer.js'
import { getRegistrationEmailError } from '~~/shared/utils/auth-identifier.js'
import { INVOICE_EMAIL_STATUS } from '~~/shared/utils/invoice-email-status.js'

function parseJson(value, fallback = null) {
  if (!value) return fallback
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

async function nextInvoiceSequence(database, year) {
  await sql`
    INSERT INTO site_invoice_counters (invoice_year, last_sequence)
    VALUES (${year}, LAST_INSERT_ID(1))
    ON DUPLICATE KEY UPDATE last_sequence = LAST_INSERT_ID(last_sequence + 1)
  `.execute(database)

  const row = await sql`SELECT LAST_INSERT_ID() AS sequence`.execute(database)
  return Number(row.rows?.[0]?.sequence || 0)
}

function formatInvoiceNumber(year, sequence) {
  return `IND-${year}-${String(sequence).padStart(5, '0')}`
}

export async function getInvoiceByOrderId(database, orderId) {
  return database
    .selectFrom('site_order_invoices')
    .selectAll()
    .where('site_order_id', '=', orderId)
    .executeTakeFirst()
}

export function getInvoiceDownloadUrl(invoice, accessToken = '') {
  const query = accessToken ? `?accessToken=${encodeURIComponent(accessToken)}` : ''
  return `/api/invoices/${invoice.id}/download${query}`
}

async function getOrderItems(database, orderId) {
  return database
    .selectFrom('site_order_items')
    .selectAll()
    .where('site_order_id', '=', orderId)
    .orderBy('id', 'asc')
    .execute()
}

function buildInvoiceLines(items) {
  const lines = []

  for (const item of items) {
    const quantity = Number(item.quantity || 1)
    const unitPrice = Number(item.unit_price || 0)
    const productTotal = Math.round(unitPrice * quantity * 100) / 100
    lines.push({ name: item.name, quantity, unit: 'шт.', price: unitPrice, total: productTotal, vat: INVOICE_VAT })

    const designPrice = Number(item.design_price || 0)
    if (designPrice > 0) {
      lines.push({ name: INVOICE_DESIGN_LINE_NAME, quantity: 1, unit: 'усл.', price: designPrice, total: designPrice, vat: INVOICE_VAT })
    }
  }

  return lines
}

function normalizePayer(checkout) {
  const organization = checkout.organization || {}
  return {
    name: String(organization.name || '').trim(),
    inn: String(organization.inn || '').trim(),
    kpp: String(organization.kpp || '').trim(),
    address: String(organization.address || '').trim()
  }
}

function validateInvoiceInput({ checkout, payer }) {
  const email = String(checkout.customer?.email || '').trim().toLowerCase()
  const emailError = getRegistrationEmailError(email)

  if (emailError) throw createError({ statusCode: 400, statusMessage: 'Invalid email', message: emailError })
  if (!payer.name || !payer.inn) throw createError({ statusCode: 400, statusMessage: 'Missing organization', message: 'Выберите организацию для оплаты по счёту' })

  return email
}

export async function sendInvoicePdf(event, invoice) {
  const pdf = await readInvoicePdf(invoice)

  setHeader(event, 'content-type', 'application/pdf')
  setHeader(event, 'content-disposition', `attachment; filename="${invoice.invoice_number}.pdf"`)
  return pdf
}

function isDuplicateInvoiceError(error) {
  return error?.code === 'ER_DUP_ENTRY' || error?.errno === 1062
}

async function markOrderAsInvoicePayment(database, orderId, now = new Date()) {
  await database
    .updateTable('site_orders')
    .set({ payment_provider: 'invoice', payment_status: 'pending', updated_at: now })
    .where('id', '=', orderId)
    .execute()
}

export async function createOrGetInvoice(database, event, order) {
  const orderId = Number(order.id)
  const existing = await getInvoiceByOrderId(database, orderId)
  if (existing) {
    if (!await fileExists(existing.pdf_path)) {
      await generateInvoicePdfFromSnapshot(existing)
    }

    await markOrderAsInvoicePayment(database, orderId)
    return { invoice: existing, created: false }
  }

  const payload = parseJson(order.payload, {})
  const checkout = payload.checkout || {}
  const payer = normalizePayer(checkout)
  const customerEmail = validateInvoiceInput({ checkout, payer })
  const items = await getOrderItems(database, orderId)
  const lines = buildInvoiceLines(items)
  const now = new Date()

  try {
    const invoice = await database.transaction().execute(async (trx) => {
      const year = now.getFullYear()
      const sequence = await nextInvoiceSequence(trx, year)
      const invoiceNumber = formatInvoiceNumber(year, sequence)
      const pdfPath = await createInvoicePdfPath(year, invoiceNumber)

      const result = await trx
        .insertInto('site_order_invoices')
        .values({
          site_order_id: orderId,
          invoice_number: invoiceNumber,
          invoice_year: year,
          sequence,
          amount: Number(order.amount || 0),
          currency: order.currency || 'RUB',
          customer_email: customerEmail,
          payer_snapshot: JSON.stringify(payer),
          seller_snapshot: JSON.stringify(INVOICE_SELLER),
          lines_snapshot: JSON.stringify(lines),
          pdf_path: pdfPath,
          email_status: INVOICE_EMAIL_STATUS.QUEUED,
          created_at: now,
          updated_at: now
        })
        .executeTakeFirst()

      return trx
        .selectFrom('site_order_invoices')
        .selectAll()
        .where('id', '=', Number(result.insertId))
        .executeTakeFirst()
    })

    try {
      await generateInvoicePdfFromSnapshot(invoice)
    } catch (error) {
      await database.deleteFrom('site_order_invoices').where('id', '=', invoice.id).execute()
      await rm(invoice.pdf_path, { force: true }).catch(() => {})
      throw error
    }

    await markOrderAsInvoicePayment(database, orderId, now)

    return { invoice, created: true }
  } catch (error) {
    if (!isDuplicateInvoiceError(error)) throw error

    const invoice = await getInvoiceByOrderId(database, orderId)
    if (invoice) {
      if (!await fileExists(invoice.pdf_path)) {
        await generateInvoicePdfFromSnapshot(invoice)
      }

      await markOrderAsInvoicePayment(database, orderId)
      return { invoice, created: false }
    }

    throw error
  }
}
