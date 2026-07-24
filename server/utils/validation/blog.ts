import { z } from 'zod'

export const createArticleSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido'),
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  image: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  category: z.enum(['estudios-cientificos', 'reflexiones-del-espiritu']),
  pdfUrl: z.string().optional().nullable(),
  content: z.string().optional().nullable()
})

export const updateArticleSchema = createArticleSchema.partial()
