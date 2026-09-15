import { HERO_SETTINGS_KEY, DEFAULT_HERO_SETTINGS, normalizeHeroSettings } from '../../../utils/heroSlides'
import { getSiteSetting } from '../../utils/siteSettings'

/**
 * Fotos de la portada para el sitio público.
 *
 * Nunca falla: si la tabla aún no existe (despliegue anterior a la migración)
 * o la base de datos no responde, se devuelven las fotos de fábrica. La
 * portada es lo primero que se ve de la página; degradar es mejor que un 500.
 */
export default defineEventHandler(async () => {
  try {
    const stored = await getSiteSetting(HERO_SETTINGS_KEY)
    // Sin fila guardada valen las fotos de fábrica ENTERAS, con su lista de
    // teléfono: si solo se devolviera la de escritorio, el móvil perdería los
    // encuadres afinados que el hero ya tenía antes de ser editable.
    return normalizeHeroSettings(stored ?? DEFAULT_HERO_SETTINGS)
  } catch (err) {
    console.error('[settings/hero] No se pudieron leer las fotos de portada:', err)
    return normalizeHeroSettings(DEFAULT_HERO_SETTINGS)
  }
})
