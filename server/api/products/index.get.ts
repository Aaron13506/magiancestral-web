import { desc } from 'drizzle-orm'
import { useDb } from '../../db/client'
import { products } from '../../db/schema'

// Taxonomía fija de categorías del catálogo (no editable desde el admin en esta versión).
const CATEGORIES = [
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

export default defineEventHandler(async () => {
  const db = useDb()
  const rows = await db.select().from(products).orderBy(desc(products.id))

  return {
    products: rows,
    categories: CATEGORIES,
    metadata: {
      totalProducts: rows.length,
      currency: 'USD',
      disclaimer: 'Estos productos no son medicamentos. Su consumo es responsabilidad de quien los usa. Productos de elaboración artesanal con ingredientes naturales.'
    }
  }
})
