import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug is required'
    })
  }

  const isDev = process.env.NODE_ENV === 'development'
  let fileContent: string

  if (isDev) {
    // En desarrollo, usar el filesystem normal
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`)

    if (!fs.existsSync(filePath)) {
      throw createError({
        statusCode: 404,
        message: 'Article not found'
      })
    }

    fileContent = fs.readFileSync(filePath, 'utf-8')
  } else {
    // En producción (Vercel), usar el server asset
    const storage = useStorage('assets:content')
    const content = await storage.getItem(`blog/${slug}.md`) as string

    if (!content) {
      throw createError({
        statusCode: 404,
        message: 'Article not found'
      })
    }

    fileContent = content
  }

  // Parsear el archivo
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    image: data.image,
    author: data.author,
    tags: data.tags,
    content,
    html: md.render(content)
  }
})
