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
  return normalizeHeroSettings(saved)
})
