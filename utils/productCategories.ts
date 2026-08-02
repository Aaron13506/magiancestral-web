export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string
}

/**
 * Taxonomía fija del catálogo. El filtro del sitio público compara
 * `producto.category === categoria.id`, así que el selector del panel debe
 * ofrecer exactamente estos `id` — antes era un campo de texto libre y
 * cualquier errata dejaba el producto fuera de todos los filtros.
 */
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'consumibles',
    name: 'Consumibles',
    slug: 'consumibles',
    description: 'Productos naturales para consumo: extractos, microdosis, hongos medicinales y alimentos ancestrales'
  },
  {
    id: 'objetos-poder',
    name: 'Objetos de Poder',
    slug: 'objetos-de-poder',
    description: 'Objetos ceremoniales y amuletos para rituales y protección energética'
  }
]

export const PRODUCT_CATEGORY_IDS = PRODUCT_CATEGORIES.map(c => c.id) as [string, ...string[]]

export function getProductCategoryName(id: string | null | undefined): string {
  return PRODUCT_CATEGORIES.find(c => c.id === id)?.name || id || ''
}
