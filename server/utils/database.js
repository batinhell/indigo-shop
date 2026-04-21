import { Kysely, MysqlDialect } from 'kysely'
import { createPool } from 'mysql2'

let database

const readEnv = name => process.env[name]?.trim() ?? ''
const readNumberEnv = (name, fallback) => {
  const value = Number(readEnv(name))
  return Number.isFinite(value) ? value : fallback
}

const DEFAULT_CONNECT_TIMEOUT = 5000
const DEFAULT_CONNECTION_LIMIT = 10

const getDatabaseUrl = () => {
  const databaseUrl = readEnv('DATABASE_URL')

  if (!databaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database is not configured',
      message: 'Missing DATABASE_URL'
    })
  }

  return databaseUrl
}

export const useDatabase = () => {
  if (!database) {
    database = new Kysely({
      dialect: new MysqlDialect({
        pool: createPool({
          uri: getDatabaseUrl(),
          waitForConnections: true,
          connectionLimit: readNumberEnv('DATABASE_CONNECTION_LIMIT', DEFAULT_CONNECTION_LIMIT),
          connectTimeout: readNumberEnv('DATABASE_CONNECT_TIMEOUT', DEFAULT_CONNECT_TIMEOUT)
        })
      })
    })
  }

  return database
}
