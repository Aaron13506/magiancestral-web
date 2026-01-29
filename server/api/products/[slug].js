import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  try {
    const slug = getRouterParam(event, 'slug')
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json')
    const data = fs.readFileSync(filePath, 'utf-8')
    const { products } = JSON.parse(data)

    const product = products.find(p => p.slug === slug)

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Producto no encontrado'
      })
    }

    return product
  } catch (error) {
    if (error.statusCode === 404) {
      throw error
    }
    console.error('Error reading product:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al cargar el producto'
    })
  }
})
