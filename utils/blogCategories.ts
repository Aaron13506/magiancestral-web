export interface BlogCategoryDef {
  value: string
  label: string
  /** Ruta del listado público de la categoría. */
  path: string
}

/**
 * Las dos categorías del blog. Los `value` coinciden con el enum de
 * `server/utils/validation/blog.ts` y con las rutas de `pages/blog/`.
 */
export const BLOG_CATEGORIES: BlogCategoryDef[] = [
  { value: 'estudios-cientificos', label: 'Estudios científicos', path: '/blog/estudios-cientificos' },
  { value: 'reflexiones-del-espiritu', label: 'Reflexiones del espíritu', path: '/blog/reflexiones-del-espiritu' }
]

export const BLOG_CATEGORY_VALUES = BLOG_CATEGORIES.map(c => c.value) as [string, ...string[]]

export function getBlogCategoryLabel(value: string | null | undefined): string {
  return BLOG_CATEGORIES.find(c => c.value === value)?.label || value || ''
}
