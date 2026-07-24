import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido'),
  shortName: z.string().optional().nullable(),
  price: z.coerce.number().nonnegative(),
  currency: z.string().min(1).default('USD'),
  image: z.string().optional().nullable(),
  gallery: z.array(z.string()).default([]),
  category: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  usage: z.string().optional().nullable(),
  ingredients: z.string().optional().nullable(),
  precautions: z.string().optional().nullable(),
  benefits: z.array(z.string()).default([]),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  topProduct: z.boolean().default(false),
  artisanal: z.boolean().default(false)
})

export const updateProductSchema = createProductSchema.partial()
