/** Formatos compartidos por el panel administrativo. */

export function formatBytes(bytes: number): string {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / Math.pow(1024, exponent)
  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`
}

export function formatPrice(price: number | string | null | undefined, currency = 'USD'): string {
  const value = Number(price)
  if (!Number.isFinite(value)) return '—'
  return `${currency} ${value.toFixed(2)}`
}

const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

/**
 * Formatea una fecha `YYYY-MM-DD` (columna `date` de Postgres) sin pasar por
 * `new Date(string)`, que la interpretaría como UTC y podría restar un día
 * según la zona horaria del navegador.
 */
export function formatDate(value: string | null | undefined, style: 'short' | 'long' = 'short'): string {
  if (!value) return '—'
  const [year, month, day] = value.slice(0, 10).split('-').map(Number)
  if (!year || !month || !day) return String(value)
  return style === 'long'
    ? `${day} de ${MONTHS_ES[month - 1]} de ${year}`
    : `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
}

/** Formatea un `timestamp` ISO completo (created_at / updated_at). */
export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return '—'
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return `${formatDate(toDateInput(date))} · ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

/** Fecha local en formato `YYYY-MM-DD`, apto para `<input type="date">`. */
export function toDateInput(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/** Días que faltan (positivo) o que pasaron (negativo) respecto a hoy. */
export function daysUntil(value: string | null | undefined): number | null {
  if (!value) return null
  const [year, month, day] = value.slice(0, 10).split('-').map(Number)
  if (!year || !month || !day) return null
  const target = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / 86_400_000)
}

/** Recorta texto conservando palabras completas. */
export function truncate(text: string | null | undefined, max = 90): string {
  const value = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (value.length <= max) return value
  return `${value.slice(0, value.lastIndexOf(' ', max) || max)}…`
}

/** Convierte HTML a texto plano (para previsualizaciones y contadores). */
export function stripHtml(html: string | null | undefined): string {
  return String(html ?? '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
}
