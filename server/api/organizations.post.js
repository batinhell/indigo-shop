import { randomUUID } from 'node:crypto'

import { auth } from '../utils/auth.js'
import { useDatabase } from '../utils/database.js'

const normalizeString = value => String(value ?? '').trim()
const normalizeNullableString = (value) => {
  const normalized = normalizeString(value)
  return normalized || null
}

const normalizeInn = value => String(value ?? '').replace(/\D/g, '')

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: getRequestHeaders(event)
  })

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Войдите, чтобы добавить организацию'
    })
  }

  const body = await readBody(event)
  const organization = body.organization ?? {}
  const inn = normalizeInn(organization.inn)
  const name = normalizeString(organization.name || organization.value)

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing organization name',
      message: 'Выберите организацию из списка'
    })
  }

  if (!/^\d{10}$|^\d{12}$/.test(inn)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid organization inn',
      message: 'Введите корректный ИНН'
    })
  }

  const now = new Date()
  const payload = {
    id: randomUUID(),
    userId: session.user.id,
    name,
    inn,
    kpp: normalizeNullableString(organization.kpp),
    ogrn: normalizeNullableString(organization.ogrn),
    type: normalizeNullableString(organization.type),
    address: normalizeNullableString(organization.address),
    dadataPayload: JSON.stringify(organization),
    updatedAt: now
  }

  const database = useDatabase()

  await database
    .insertInto('userOrganization')
    .values({
      ...payload,
      createdAt: now
    })
    .onDuplicateKeyUpdate({
      name: payload.name,
      kpp: payload.kpp,
      ogrn: payload.ogrn,
      type: payload.type,
      address: payload.address,
      dadataPayload: payload.dadataPayload,
      updatedAt: now
    })
    .execute()

  const savedOrganization = await database
    .selectFrom('userOrganization')
    .select([
      'id',
      'userId',
      'name',
      'inn',
      'kpp',
      'ogrn',
      'type',
      'address',
      'createdAt',
      'updatedAt'
    ])
    .where('userId', '=', session.user.id)
    .where('inn', '=', inn)
    .executeTakeFirst()

  return {
    organization: savedOrganization
  }
})
