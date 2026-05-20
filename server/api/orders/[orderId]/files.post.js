import { extname } from 'node:path'
import { useDatabase } from '../../../utils/database.js'
import { getOwnedSiteOrder } from '../../../utils/site-orders.js'

const MAX_FILE_SIZE = 50 * 1024 * 1024
const ALLOWED_EXTENSIONS = new Set(['.tiff', '.tif', '.ai', '.cdr', '.jpg', '.jpeg', '.png'])

function sanitizeFileName(name) {
  return String(name || 'file').replace(/[\\/\0]/g, '_').slice(0, 180)
}

export default defineEventHandler(async (event) => {
  const orderId = Number(getRouterParam(event, 'orderId'))

  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid order id',
      message: 'Некорректный номер заказа'
    })
  }

  const form = await readMultipartFormData(event)
  const accessToken = form?.find(part => part.name === 'accessToken')?.data?.toString('utf8') || ''
  const fileParts = (form || []).filter(part => part.name === 'files' && part.filename)

  if (!fileParts.length) {
    return { files: [] }
  }

  const database = useDatabase()
  await getOwnedSiteOrder(database, event, orderId, accessToken)

  const runtimeConfig = useRuntimeConfig()
  const crmBaseUrl = String(runtimeConfig.crmApi?.baseUrl || process.env.CRM_API_BASE_URL || '').replace(/\/$/, '')
  const crmApiToken = runtimeConfig.crmApi?.token || process.env.CRM_API_TOKEN || ''

  if (!crmBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'CRM API is not configured',
      message: 'Не настроен CRM_API_BASE_URL для загрузки макетов'
    })
  }

  const crmFormData = new FormData()

  for (const part of fileParts) {
    const originalName = sanitizeFileName(part.filename)
    const extension = extname(originalName).toLowerCase()

    if (!ALLOWED_EXTENSIONS.has(extension)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file type',
        message: `Недопустимый формат файла: ${originalName}`
      })
    }

    if (part.data.length > MAX_FILE_SIZE) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File is too large',
        message: `Файл слишком большой: ${originalName}`
      })
    }

    crmFormData.append('files[]', new Blob([part.data], { type: part.type || 'application/octet-stream' }), originalName)
  }

  return $fetch(`${crmBaseUrl}/api/site-orders/${orderId}/files`, {
    method: 'POST',
    headers: crmApiToken
      ? { Authorization: `Bearer ${crmApiToken}` }
      : undefined,
    body: crmFormData
  })
})
