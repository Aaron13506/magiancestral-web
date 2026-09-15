/**
 * Portada (hero) de la página de inicio.
 *
 * Las fotos se editan desde el panel (`/admin/portada`) y se guardan en la
 * tabla `site_settings` bajo la clave `hero`. Hay dos listas independientes
 * porque un encuadre horizontal se recorta fatal en un teléfono y viceversa:
 *
 *   - `desktop`: obligatoria, es la que se ve en pantallas anchas.
 *   - `mobile`:  opcional. Si está vacía, el teléfono reutiliza `desktop`.
 *
 * Cada foto guarda además su punto de interés (`focusX` / `focusY`, en % de
 * la imagen), que se traduce a `background-position`. Es lo que evita que un
 * recorte se coma las caras cuando la proporción de la pantalla no coincide
 * con la de la foto.
 */

export interface HeroSlide {
  image: string
  /** Punto de interés horizontal, 0 = borde izquierdo, 100 = borde derecho. */
  focusX: number
  /** Punto de interés vertical, 0 = borde superior, 100 = borde inferior. */
  focusY: number
}

export interface HeroSettings {
  desktop: HeroSlide[]
  mobile: HeroSlide[]
}

export type HeroMode = 'desktop' | 'mobile'

/** Clave de la fila en `site_settings`. */
export const HERO_SETTINGS_KEY = 'hero'

/** Tope de fotos por modo. Más de seis y el carrusel no se termina nunca. */
export const HERO_MAX_SLIDES = 6

/**
 * A partir de este ancho se usan las fotos de escritorio. Coincide con el
 * `@media (max-width: 768px)` del resto del hero, así que el cambio de fotos
 * ocurre exactamente en el mismo punto que el cambio de maquetación.
 */
export const HERO_MOBILE_BREAKPOINT = 768

/** Fotos de fábrica: el encuadre que tenía el hero antes de ser editable. */
export const DEFAULT_HERO_SETTINGS: HeroSettings = {
  desktop: [
    { image: '/assets/images/main-slider/sliderMain1.jpg', focusX: 50, focusY: 50 },
    { image: '/assets/images/main-slider/sliderMain2.jpg', focusX: 65, focusY: 50 },
    { image: '/assets/images/main-slider/sliderMain3.jpg', focusX: 50, focusY: 50 }
  ],
  mobile: [
    { image: '/assets/images/main-slider/sliderMain1.jpg', focusX: 50, focusY: 35 },
    { image: '/assets/images/main-slider/sliderMain2.jpg', focusX: 75, focusY: 30 },
    { image: '/assets/images/main-slider/sliderMain3.jpg', focusX: 65, focusY: 35 }
  ]
}

const clampPercent = (value: unknown, fallback = 50): number => {
  const num = Number(value)
  if (!Number.isFinite(num)) return fallback
  return Math.min(100, Math.max(0, Math.round(num)))
}

function normalizeSlide(raw: any): HeroSlide | null {
  // Se admite una cadena suelta para poder pegar una URL sin más ceremonia.
  const image = typeof raw === 'string' ? raw : String(raw?.image || '').trim()
  if (!image) return null
  return {
    image,
    focusX: clampPercent(typeof raw === 'string' ? 50 : raw?.focusX),
    focusY: clampPercent(typeof raw === 'string' ? 50 : raw?.focusY)
  }
}

function normalizeList(raw: any): HeroSlide[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map(normalizeSlide)
    .filter((slide): slide is HeroSlide => slide !== null)
    .slice(0, HERO_MAX_SLIDES)
}

/**
 * Deja cualquier valor guardado (o a medio guardar) con la forma esperada.
 * Si no queda ninguna foto de escritorio se vuelve a las de fábrica: la
 * portada nunca debe quedarse en negro por una edición incompleta.
 */
export function normalizeHeroSettings(raw: any): HeroSettings {
  const desktop = normalizeList(raw?.desktop)
  return {
    desktop: desktop.length ? desktop : DEFAULT_HERO_SETTINGS.desktop.map(s => ({ ...s })),
    mobile: normalizeList(raw?.mobile)
  }
}

/** Fotos que tocan en cada modo, aplicando la herencia de móvil → escritorio. */
export function heroSlidesFor(settings: HeroSettings, mode: HeroMode): HeroSlide[] {
  if (mode === 'mobile' && settings.mobile.length) return settings.mobile
  return settings.desktop
}

/**
 * Proporción aproximada del hueco de la portada en cada modo, usada tanto por
 * la vista previa como por el aviso de recorte del editor: una pantalla ancha
 * 16:9 y un teléfono con el hero al 85 % de su alto.
 */
export const HERO_FRAME_RATIO: Record<HeroMode, number> = {
  desktop: 16 / 9,
  mobile: 39 / 72
}

/**
 * Con `background-size: cover` solo se recorta por UN eje: el que le sobra a
 * la foto respecto al hueco. Saberlo evita la confusión de arrastrar un
 * deslizador que no puede mover nada.
 */
export function heroCropAxis(imageRatio: number, mode: HeroMode): 'x' | 'y' | null {
  if (!Number.isFinite(imageRatio) || imageRatio <= 0) return null
  const frame = HERO_FRAME_RATIO[mode]
  if (Math.abs(imageRatio - frame) < 0.02) return null
  return imageRatio > frame ? 'x' : 'y'
}

/** `background-position` / `object-position` de una foto. */
export function heroFocusStyle(slide: HeroSlide): string {
  return `${clampPercent(slide?.focusX)}% ${clampPercent(slide?.focusY)}%`
}
