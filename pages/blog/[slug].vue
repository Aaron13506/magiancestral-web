  <template>
  <div>
    <Nav />
    <PageHeader title="Bitácora" />

    <section class="news_detail" v-if="article">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 col-lg-7">
            <div class="news_detail_left">
              <div class="news_detail_image_box">
                <img :src="article.image || '/assets/images/blog/news-detail-img-1.jpg'" :alt="article.title">
                <div class="news_detail_date_box">
                  <p>{{ formatDate(article.date) }}</p>
                </div>
              </div>
              <div class="news_detail_content">
                <h2>{{ article.title }}</h2>

                <!-- Renderizar el contenido Markdown -->
                <div class="prose prose-lg" v-html="article?.html"></div>
              </div>

              <div class="news_detail__bottom">
                <div class="news_detail__social-list">
                  <a href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank">
                    <i class="fab fa-facebook-square"></i>
                  </a>
                  <a href="https://twitter.com/intent/tweet?url=" target="_blank">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.instagram.com/magiancestral_ven" target="_blank">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a href="https://t.me/share/url?url=" target="_blank">
                    <i class="fab fa-telegram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-5">
            <div class="sidebar">
              <div class="sidebar__single sidebar__post" v-if="recentArticles && recentArticles.length">
                <h3 class="sidebar__title">Artículos Recientes</h3>
                <ul class="sidebar__post-list list-unstyled">
                  <li v-for="recent in recentArticles" :key="recent.slug">
                    <div class="sidebar__post-image">
                      <img :src="recent.image || '/assets/images/blog/lp-1-1.jpg'" :alt="recent.title">
                    </div>
                    <div class="sidebar__post-content">
                      <h3>
                        <nuxt-link :to="`/blog/${recent.slug}`">
                          {{ recent.title }}
                        </nuxt-link>
                      </h3>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Artículo no encontrado -->
    <section v-else class="py-5">
      <div class="container text-center">
        <h2>Artículo no encontrado</h2>
        <p>Lo sentimos, el artículo que buscas no existe.</p>
        <nuxt-link to="/blog" class="thm-btn">Volver a la Bitácora</nuxt-link>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
// Los componentes se auto-importan en Nuxt 3
// import Nav from "../../components/Nav";
// import PageHeader from "../../components/PageHeader";
// import Footer from "../../components/Footer";

const route = useRoute()
const slug = route.params.slug

// Obtener el artículo específico desde la API
const { data: article, error } = await useFetch(`/api/blog/${slug}`)

// Si hay error, mostrar 404
if (error.value) {
  throw createError({
    statusCode: 404,
    message: 'Artículo no encontrado'
  })
}

// Obtener todos los artículos para mostrar recientes
const { data: allArticles } = await useFetch('/api/blog')

// Filtrar artículos recientes (últimos 3, excluyendo el actual)
const recentArticles = computed(() => {
  if (!allArticles.value) return []
  return allArticles.value
    .filter(a => a.slug !== slug)
    .slice(0, 3)
})

// Función para formatear la fecha
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`
}

// Meta tags dinámicos
useHead({
  title: article.value ? `${article.value.title} | Magiancestral` : 'Artículo | Magiancestral',
  meta: [
    {
      name: 'description',
      content: article.value?.description || 'Lee nuestros artículos sobre medicina natural'
    },
    // Open Graph / Facebook
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: article.value?.title },
    { property: 'og:description', content: article.value?.description },
    { property: 'og:image', content: article.value?.image },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: article.value?.title },
    { name: 'twitter:description', content: article.value?.description },
    { name: 'twitter:image', content: article.value?.image }
  ]
})
</script>

<style scoped>
/* Estilos para el contenido Markdown */
.news_detail_content :deep(.prose) {
  max-width: 100%;
  color: #333;
}

.news_detail_content :deep(.prose h2) {
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #0e3858;
}

.news_detail_content :deep(.prose h3) {
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  color: #0e3858;
}

.news_detail_content :deep(.prose p) {
  margin-bottom: 1rem;
  line-height: 1.8;
  font-size: 1rem;
}

.news_detail_content :deep(.prose ul),
.news_detail_content :deep(.prose ol) {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.news_detail_content :deep(.prose li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.news_detail_content :deep(.prose strong) {
  font-weight: 700;
  color: #0e3858;
}

.news_detail_content :deep(.prose a) {
  color: #b3a85a;
  text-decoration: none;
}

.news_detail_content :deep(.prose a:hover) {
  text-decoration: underline;
}

.news_detail_content :deep(.prose blockquote) {
  border-left: 4px solid #b3a85a;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #666;
}

.news_detail_content :deep(.prose code) {
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.9em;
}

.news_detail_content :deep(.prose pre) {
  background-color: #2d2d2d;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.news_detail_content :deep(.prose pre code) {
  background-color: transparent;
  padding: 0;
}

.news_detail_content :deep(.prose hr) {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 2rem 0;
}

/* Mantener imagen del artículo en proporción 1:1 */
.news_detail_image_box {
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* Proporción 1:1 */
  overflow: hidden;
}

.news_detail_image_box img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Mantener posición de la fecha sobre la imagen */
.news_detail_date_box {
  position: absolute;
  z-index: 10;
}

/* Mantener imágenes de artículos recientes en proporción 1:1 */
.sidebar__post-image {
  position: relative !important;
  width: 90px !important;
  min-width: 90px !important;
  height: 90px !important;
  overflow: hidden !important;
  flex-shrink: 0 !important;
}

.sidebar__post-image img {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}

/* Asegurar que el contenedor del artículo reciente tenga el layout correcto */
.sidebar__post-list li {
  display: flex !important;
  gap: 15px !important;
  align-items: flex-start !important;
  margin-bottom: 20px !important;
}

.sidebar__post-content {
  flex: 1 !important;
  min-width: 0 !important;
}
</style>
