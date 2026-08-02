import { desc } from 'drizzle-orm'
import { useDb } from '../../db/client'
import { products } from '../../db/schema'
import { PRODUCT_CATEGORIES } from '../../../utils/productCategories'

export default defineEventHandler(async () => {
  const db = useDb()
  const rows = await db.select().from(products).orderBy(desc(products.id))

  return {
    products: rows,
    categories: PRODUCT_CATEGORIES,
    metadata: {
      totalProducts: rows.length,
      currency: 'USD',
      disclaimer: 'Estos productos no son medicamentos. Su consumo es responsabilidad de quien los usa. Productos de elaboración artesanal con ingredientes naturales.'
    }
  }
})
