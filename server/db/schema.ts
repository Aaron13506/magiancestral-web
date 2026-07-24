import { boolean, date, jsonb, numeric, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  shortName: text('short_name'),
  price: numeric('price', { precision: 10, scale: 2, mode: 'number' }).notNull(),
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
