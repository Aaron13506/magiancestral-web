import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'

declare global {
  // eslint-disable-next-line no-var
  var __magiancestralDb: ReturnType<typeof drizzle> | undefined
  // eslint-disable-next-line no-var
  var __magiancestralSql: ReturnType<typeof postgres> | undefined
}

// En Vercel cada instancia atiende una petición a la vez, así que un pool
// grande solo consume conexiones del pooler de Supabase sin dar nada a cambio.
// postgres.js hace pipelining sobre una sola conexión, de modo que las
// consultas concurrentes (p. ej. las del dashboard) siguen yendo en paralelo.
const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)

function createDb() {
  const config = useRuntimeConfig()
  const url = config.databaseUrl

  if (!url) {
    throw new Error(
      'DATABASE_URL no está definida en el entorno del servidor. ' +
      'En Vercel debe existir como variable de entorno del entorno correspondiente ' +
      '(Production/Preview), no solo en el .env local.'
    )
  }

  warnAboutDirectConnection(url)

  const sql = postgres(url, {
    // Obligatorio con el pooler de Supabase en modo transacción (pgbouncer):
    // las sentencias preparadas no sobreviven entre transacciones.
    prepare: false,
    max: IS_SERVERLESS ? 1 : 10,
    // Sin esto, un destino inalcanzable deja la petición colgada hasta que
    // Vercel mata la función y devuelve un 500 sin explicación.
    connect_timeout: 10,
    idle_timeout: IS_SERVERLESS ? 20 : 0,
    onnotice: () => {}
  })

  return { sql, db: drizzle(sql, { schema }) }
}

/**
 * Supabase sirve la conexión directa (puerto 5432) solo por IPv6, y las
 * funciones de Vercel son IPv4: el resultado es un `ENETUNREACH` inmediato en
 * producción aunque la misma URL funcione perfectamente en local. La conexión
 * agrupada (`...pooler.supabase.com`, puerto 6543) sí es IPv4.
 */
function warnAboutDirectConnection(url: string) {
  if (!IS_SERVERLESS) return
  if (url.includes('pooler.supabase.com') || url.includes(':6543')) return

  console.warn(
    '[db] DATABASE_URL parece una conexión DIRECTA de Supabase (puerto 5432). ' +
    'En serverless suele fallar con ENETUNREACH porque solo resuelve por IPv6. ' +
    'Usa la cadena "Connection pooling" (pooler.supabase.com, puerto 6543).'
  )
}

export function useDb() {
  if (!globalThis.__magiancestralDb) {
    const { sql, db } = createDb()
    globalThis.__magiancestralSql = sql
    globalThis.__magiancestralDb = db
  }
  return globalThis.__magiancestralDb
}
