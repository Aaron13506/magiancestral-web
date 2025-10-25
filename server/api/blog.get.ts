import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default defineEventHandler(async () => {
  // En desarrollo, usar el path normal
  // En producción (Vercel), usar el server asset
  const isDev = process.env.NODE_ENV === 'development'

  let contentDir: string

  if (isDev) {
    contentDir = path.join(process.cwd(), 'content', 'blog')
  } else {
    // En producción, los archivos están en el server asset
    const storage = useStorage('assets:content')
    const keys = await storage.getKeys('blog')

    const articles = await Promise.all(
      keys.map(async (key) => {
        const fileContent = await storage.getItem(key) as string
        const { data } = matter(fileContent)

        return {
          slug: key.replace('blog/', '').replace('.md', ''),
          title: data.title,
          description: data.description,
          date: data.date,
          image: data.image,
          author: data.author,
          tags: data.tags,
          content: fileContent.split('---').slice(2).join('---').trim()
        }
      })
    )

    // Ordenar por fecha descendente
    articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return articles
  }

  // Código para desarrollo
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'))

  const articles = files.map(file => {
    const filePath = path.join(contentDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug: file.replace('.md', ''),
      title: data.title,
      description: data.description,
      date: data.date,
      image: data.image,
      author: data.author,
      tags: data.tags,
      content
    }
  })

  // Ordenar por fecha descendente
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return articles
})
