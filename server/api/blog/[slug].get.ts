import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug is required'
    })
  }

  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`)

  // Verificar si el archivo existe
  if (!fs.existsSync(filePath)) {
    throw createError({
      statusCode: 404,
      message: 'Article not found'
    })
  }

  // Leer y parsear el archivo
  const fileContent = fs.readFileSync(filePath, 'utf-8')
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
