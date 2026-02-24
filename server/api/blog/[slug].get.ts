import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const filePath = resolve(`public/data/blog/${slug}.json`)

  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, message: 'Article not found' })
  }

  const data = JSON.parse(readFileSync(filePath, 'utf-8'))
  return data
})
