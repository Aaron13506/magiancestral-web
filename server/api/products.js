import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'products.json')
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading products.json:', error)
    return {
      products: [],
      categories: [],
      metadata: {
        totalProducts: 0,
        lastUpdated: new Date().toISOString(),
        currency: 'MXN'
      }
    }
  }
})
