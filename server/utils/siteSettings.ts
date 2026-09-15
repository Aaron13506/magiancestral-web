import { eq } from 'drizzle-orm'
import { useDb } from '../db/client'
import { siteSettings } from '../db/schema'

/**
 * Lee un ajuste del sitio. Devuelve `null` si nadie lo ha guardado todavía,
 * para que quien llame decida cuál es su valor por defecto.
 */
export async function getSiteSetting<T = unknown>(key: string): Promise<T | null> {
  const db = useDb()
  const [row] = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1)
  return (row?.value as T) ?? null
}

/** Guarda (o reemplaza) un ajuste del sitio. */
export async function putSiteSetting<T>(key: string, value: T): Promise<T> {
  const db = useDb()
  const [row] = await db
    .insert(siteSettings)
    .values({ key, value: value as any, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: value as any, updatedAt: new Date() }
    })
    .returning()
  return row.value as T
}
