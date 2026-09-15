import { z } from 'zod'
import { HERO_MAX_SLIDES } from '../../../utils/heroSlides'

const heroSlideSchema = z.object({
  image: z.string().min(1, 'Cada foto necesita una imagen'),
  focusX: z.coerce.number().min(0).max(100).default(50),
  focusY: z.coerce.number().min(0).max(100).default(50)
})

export const heroSettingsSchema = z.object({
  // El escritorio es la lista de respaldo del móvil, así que no puede quedar
  // vacía: sin ella la portada no tendría ninguna foto que mostrar.
  desktop: z
    .array(heroSlideSchema)
    .min(1, 'Añade al menos una foto para computadora')
    .max(HERO_MAX_SLIDES, `Como máximo ${HERO_MAX_SLIDES} fotos`),
  mobile: z
    .array(heroSlideSchema)
    .max(HERO_MAX_SLIDES, `Como máximo ${HERO_MAX_SLIDES} fotos`)
    .default([])
})
