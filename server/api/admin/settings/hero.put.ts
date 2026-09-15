import { HERO_SETTINGS_KEY, normalizeHeroSettings } from '../../../../utils/heroSlides'
import { putSiteSetting } from '../../../utils/siteSettings'
import { heroSettingsSchema } from '../../../utils/validation/settings'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsed = heroSettingsSchema.safeParse(body)
  if (!parsed.success) {
    throw createError({ statusCode: 400, message: parsed.error.issues[0]?.message || 'Datos inválidos' })
  }

  const saved = await putSiteSetting(HERO_SETTINGS_KEY, normalizeHeroSettings(parsed.data))

  // Sin esto, la portada usa ISR de 5 minutos y en un sitio con poco tráfico
  // el cambio puede tardar mucho más en verse: nadie visita para disparar la
  // regeneración de fondo. Mejor esfuerzo: si falla, el guardado ya sucedió.
  await revalidatePath(event, '/')

  return normalizeHeroSettings(saved)
})
