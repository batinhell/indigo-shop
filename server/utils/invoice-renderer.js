import { mkdir, readFile, stat } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { INVOICE_SELLER, INVOICE_VAT } from './invoice-config.js'

const STORAGE_ROOT = resolve(process.cwd(), 'storage/invoices')
const PHP_INVOICE_GENERATOR = resolve(process.cwd(), 'server/invoice-pdf/generate.php')

function dateRu(value) {
  return new Date(value).toLocaleDateString('ru-RU')
}

function parseJson(value, fallback = null) {
  if (!value) return fallback
  if (typeof value === 'object') return value

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function buildPhpInvoicePayload({ invoice, seller, payer, lines }) {
  return {
    invoice_number: invoice.invoice_number,
    invoice_date: dateRu(invoice.created_at),
    company: {
      name: seller.name,
      short_name: seller.shortName,
      director_name: seller.signerName,
      inn: seller.inn,
      ogrnip: seller.ogrnip,
      address: seller.legalAddress,
      actual_address: seller.actualAddress,
      bank_name: seller.bankName,
      bik: seller.bik,
      account: seller.rs,
      corr_account: seller.ks,
      phone: seller.phone,
      email: seller.email,
      basis: seller.basis
    },
    payer,
    items: lines.map(line => ({
      name: line.name,
      unit: line.unit || 'шт.',
      qty: Number(line.quantity || 0),
      price: Number(line.price || 0),
      total: Number(line.total || 0)
    })),
    total: Number(invoice.amount || 0),
    vat_text: INVOICE_VAT,
    director_name: seller.signerName
  }
}

async function generatePdfFile({ invoice, seller, payer, lines, path }) {
  const payload = JSON.stringify(buildPhpInvoicePayload({ invoice, seller, payer, lines }))

  await new Promise((resolvePromise, reject) => {
    const child = spawn(process.env.PHP_BINARY || 'php', [PHP_INVOICE_GENERATOR, path], {
      stdio: ['pipe', 'ignore', 'pipe']
    })
    const stderr = []

    child.stderr.on('data', chunk => stderr.push(chunk))
    child.on('error', reject)
    child.on('close', (code) => {
      const errorOutput = Buffer.concat(stderr).toString('utf8').trim()
      if (code === 0) {
        if (errorOutput) console.error('[invoice/pdf] PHP generator stderr:', errorOutput)
        resolvePromise()
        return
      }

      reject(new Error(errorOutput || `PHP invoice generator failed with exit code ${code}`))
    })

    child.stdin.end(payload)
  })
}

export async function createInvoicePdfPath(year, invoiceNumber) {
  const path = join(STORAGE_ROOT, String(year), `${invoiceNumber}.pdf`)
  await mkdir(dirname(path), { recursive: true })
  return path
}

export async function fileExists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

export async function generateInvoicePdfFromSnapshot(invoice) {
  const seller = parseJson(invoice.seller_snapshot, INVOICE_SELLER)
  const payer = parseJson(invoice.payer_snapshot, {})
  const lines = parseJson(invoice.lines_snapshot, [])

  await generatePdfFile({ invoice, seller, payer, lines, path: invoice.pdf_path })
}

export async function readInvoicePdf(invoice) {
  if (!await fileExists(invoice.pdf_path)) {
    await generateInvoicePdfFromSnapshot(invoice)
  }

  return readFile(invoice.pdf_path)
}
