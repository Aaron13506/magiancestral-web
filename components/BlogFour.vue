<template>
  <section class="blog_four">
    <div class="container">
      <div class="row">
        <div class="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="100ms">
          <div class="block-title text-left">
            <p>del blog</p>
            <h3>Artículos sobre<br>medicina natural</h3>
            <div class="leaf">
              <img src="/assets/images/resources/leaf.png" alt="">
            </div>
          </div>
          <div class="blog-four_btn">
            <nuxt-link to="/blog" class="thm-btn">Ver Todos los Artículos</nuxt-link>
          </div>
        </div>

        <!-- Artículos dinámicos desde Nuxt Content -->
        <div v-for="(article, index) in articles" :key="article._path" class="col-xl-4 col-lg-4">
          <div class="blog_four_single wow fadeInLeft" :data-wow-delay="`${(index + 1) * 300}ms`">
            <div class="blog_four_image">
              <img :src="article.image || '/assets/images/blog/blog-4-img-1.jpg'" :alt="article.title">
              <div class="blog_four_date_box">
                <p>{{ formatDate(article.date) }}</p>
              </div>
            </div>
            <div class="blog-four_content">
              <ul class="list-unstyled blog-four_meta">
                <li>
                  <nuxt-link :to="`/blog/${article._path.split('/').pop()}`">
                    <i class="far fa-user-circle"></i> {{ article.author || 'Admin' }}
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="`/blog/${article._path.split('/').pop()}`">
                    <i class="far fa-bookmark"></i> {{ article.tags ? article.tags.length : 0 }} Tags
                  </nuxt-link>
                </li>
              </ul>
              <h3>
                <nuxt-link :to="`/blog/${article._path.split('/').pop()}`" class="blog_four_title">
                  {{ truncateTitle(article.title) }}
                </nuxt-link>
              </h3>
              <div class="blog_four_read_more_btn">
                <nuxt-link :to="`/blog/${article._path.split('/').pop()}`">
                  <i class="fa fa-angle-right"></i>Leer Más
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Mensaje si no hay artículos -->
        <div v-if="!articles || articles.length === 0" class="col-xl-8 col-lg-8">
          <p class="text-muted">No hay artículos disponibles aún.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Obtener los últimos 2 artículos del blog
const { data: articles } = await useAsyncData('blog-home', () =>
  queryContent('/blog')
    .sort({ date: -1 })
    .limit(2)
    .find()
)

// Función para formatear la fecha
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`
}

// Función para truncar el título si es muy largo
const truncateTitle = (title) => {
  if (!title) return ''
  // Limitar a 60 caracteres aproximadamente
  if (title.length > 60) {
    return title.substring(0, 57) + '...'
  }
  return title
}
</script>

<style scoped>
.blog_four_title {
  display: block;
  min-height: 80px; /* Asegurar altura consistente */
}
</style>
