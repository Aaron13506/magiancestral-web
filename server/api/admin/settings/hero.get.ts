import { DEFAULT_HERO_SETTINGS, HERO_SETTINGS_KEY, normalizeHeroSettings } from '../../../../utils/heroSlides'
import { getSiteSetting } from '../../../utils/siteSettings'

/**
 * Igual que el endpoint público, pero sin red de seguridad: si la base de
 * datos falla, el panel debe enterarse en vez de editar unas fotos de fábrica
 * que luego sobrescribirían lo guardado.
 */
export default defineEventHandler(async () => {
  const stored = await getSiteSetting(HERO_SETTINGS_KEY)
  // El panel debe mostrar lo mismo que está viendo el público, incluidas las
  // fotos de fábrica mientras nadie haya guardado nada.
  return normalizeHeroSettings(stored ?? DEFAULT_HERO_SETTINGS)
})
