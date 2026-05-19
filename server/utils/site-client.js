function normalizeOptionalString(value) {
  const normalized = String(value ?? '').trim()
  return normalized || null
}

function getClientName(user) {
  return normalizeOptionalString(user?.name)
    ?? normalizeOptionalString(user?.email)
    ?? normalizeOptionalString(user?.phoneNumber)
    ?? 'Клиент сайта'
}

function isDuplicateEntryError(error) {
  return error?.code === 'ER_DUP_ENTRY'
    || String(error?.message ?? '').includes('Duplicate entry')
}

async function findClient(database, user) {
  const siteUserId = normalizeOptionalString(user?.id)
  const email = normalizeOptionalString(user?.email)
  const phone = normalizeOptionalString(user?.phoneNumber)

  if (siteUserId) {
    const client = await database
      .selectFrom('clients')
      .select(['id'])
      .where('site_user_id', '=', siteUserId)
      .executeTakeFirst()

    if (client) return client
  }

  const matchConditions = []
  if (email) matchConditions.push(eb => eb('email', '=', email))
  if (phone) matchConditions.push(eb => eb('phone', '=', phone))

  if (!matchConditions.length) {
    return null
  }

  return database
    .selectFrom('clients')
    .select(['id'])
    .where(eb => eb.or(matchConditions.map(condition => condition(eb))))
    .executeTakeFirst()
}

export async function ensureSiteClient(database, user) {
  const siteUserId = normalizeOptionalString(user?.id)

  if (!siteUserId) {
    return null
  }

  const name = getClientName(user)
  const email = normalizeOptionalString(user?.email)
  const phone = normalizeOptionalString(user?.phoneNumber)
  const now = new Date()
  const existingClient = await findClient(database, user)

  if (existingClient?.id) {
    const updates = {
      site_user_id: siteUserId,
      name,
      updated_at: now
    }

    if (email) updates.email = email
    if (phone) updates.phone = phone

    await database
      .updateTable('clients')
      .set(updates)
      .where('id', '=', existingClient.id)
      .execute()

    return Number(existingClient.id)
  }

  try {
    const result = await database
      .insertInto('clients')
      .values({
        site_user_id: siteUserId,
        name,
        email,
        phone,
        created_at: now,
        updated_at: now
      })
      .executeTakeFirst()

    return Number(result.insertId) || null
  } catch (error) {
    if (!isDuplicateEntryError(error)) {
      throw error
    }

    const client = await findClient(database, user)
    return client?.id ? Number(client.id) : null
  }
}
