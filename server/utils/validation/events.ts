import { z } from 'zod'
import { EVENT_TYPE_VALUES } from '../../../utils/eventTypes'

export const createEventSchema = z.object({
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug inválido'),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  title: z.string().min(1),
  subtitle: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  type: z.enum(EVENT_TYPE_VALUES),
  logo: z.string().optional().nullable(),
  description: z.string().optional().nullable()
})

export const updateEventSchema = createEventSchema.partial()
