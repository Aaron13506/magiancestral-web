import { boolean, customType, date, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * `numeric` de Postgres llega al cliente como CADENA (`'15.00'`), porque el
 * tipo no cabe en un `number` de JS sin perder precisión.
 *
 * La opción `numeric(..., { mode: 'number' })` que convertiría el valor no
 * existe en drizzle-orm 0.33 — su `numeric()` solo lee `precision` y `scale`,
 * de modo que `mode` se ignoraba EN SILENCIO y el precio viajaba como cadena
 * hasta las vistas, donde `price.toFixed(2)` reventaba el render de la botica.
 *
 * Este tipo hace la conversión de verdad, en el único punto por el que pasan
 * todas las lecturas y escrituras de la columna.
 */
const priceColumn = customType<{
  data: number
  driverData: string
  config: { precision?: number, scale?: number }
}>({
  dataType(config) {
    if (config?.precision != null && config?.scale != null) return `numeric(${config.precision}, ${config.scale})`
    if (config?.precision != null) return `numeric(${config.precision})`
    return 'numeric'
  },
  fromDriver: value => Number(value),
  toDriver: value => String(value)
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  shortName: text('short_name'),
  price: priceColumn('price', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').notNull().default('USD'),
  image: text('image'),
  gallery: jsonb('gallery').notNull().default([]),
  category: text('category'),
  description: text('description'),
  content: text('content'),
  usage: text('usage'),
  ingredients: text('ingredients'),
  precautions: text('precautions'),
  benefits: jsonb('benefits').notNull().default([]),
  inStock: boolean('in_stock').notNull().default(true),
  featured: boolean('featured').notNull().default(false),
  topProduct: boolean('top_product').notNull().default(false),
  artisanal: boolean('artisanal').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
})

export const blogArticles = pgTable('blog_articles', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  date: date('date').notNull(),
  image: text('image'),
  author: text('author'),
  category: text('category').notNull(),
  pdfUrl: text('pdf_url'),
  content: text('content'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
})

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  eventDate: date('event_date').notNull(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  location: text('location'),
  type: text('type'),
  logo: text('logo'),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
})

/**
 * Ajustes del sitio editables desde el panel, guardados como pares
 * clave → JSON. La primera clave es `hero` (las fotos de la portada); el
 * formato de cada valor lo define su propio esquema de validación.
 */
export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: jsonb('value').notNull().default({}),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
})
