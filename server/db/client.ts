import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'

declare global {
  // eslint-disable-next-line no-var
  var __magiancestralDb: ReturnType<typeof drizzle> | undefined
  // eslint-disable-next-line no-var
  var __magiancestralSql: ReturnType<typeof postgres> | undefined
}

function createDb() {
  const config = useRuntimeConfig()
  const sql = postgres(config.databaseUrl, { prepare: false })
  return { sql, db: drizzle(sql, { schema }) }
}

export function useDb() {
  if (!globalThis.__magiancestralDb) {
    const { sql, db } = createDb()
    globalThis.__magiancestralSql = sql
    globalThis.__magiancestralDb = db
  }
  return globalThis.__magiancestralDb
}
