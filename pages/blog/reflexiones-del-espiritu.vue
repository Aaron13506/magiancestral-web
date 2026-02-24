<template>
  <div>
    <Nav />
    <PageHeader />

    <!-- Page Title Section -->
    <section class="page-title-section">
      <div class="container">
        <div class="breadcrumb-nav">
          <nuxt-link to="/blog">Bitácora</nuxt-link>
          <i class="fa fa-chevron-right"></i>
          <span>Reflexiones del Espíritu</span>
        </div>
        <h1 class="page-title">Reflexiones del Espíritu</h1>
      </div>
    </section>

    <!-- Listado de Artículos -->
    <section class="blog-one news">
      <div class="container">
        <div class="row">
          <div v-for="article in articles" :key="article.slug" class="col-xl-4 col-lg-4">
            <div class="blog_one_single mb-30">
              <div class="blog_one_image">
                <div class="blog_image">
                  <img :src="article.image || '/assets/images/blog/blog-1-img-1.jpg'" :alt="article.title">
                  <div class="blog_one_date_box">
                    <p>{{ formatDate(article.date) }}</p>
                  </div>
                </div>
                <div class="blog-one__content">
                  <h3>
                    <a v-if="article.pdfUrl" :href="article.pdfUrl" target="_blank" rel="noopener noreferrer">
                      {{ article.title }}
                    </a>
                    <nuxt-link v-else :to="`/blog/${article.slug}`">
                      {{ article.title }}
                    </nuxt-link>
                  </h3>
                  <div class="blog_one_text">
                    <p>{{ article.description }}</p>
                  </div>
                  <div class="read_more_btn">
                    <a v-if="article.pdfUrl" :href="article.pdfUrl" target="_blank" rel="noopener noreferrer">
                      <i class="fa fa-file-pdf"></i> Ver PDF
                    </a>
                    <nuxt-link v-else :to="`/blog/${article.slug}`">
                      <i class="fa fa-angle-right"></i>Leer Más
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensaje si no hay artículos -->
          <div v-if="!articles?.length" class="col-12 text-center py-5">
            <p class="text-muted">No hay artículos publicados en esta sección aún.</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
const { data: articles } = await useAsyncData('reflexiones-del-espiritu', async () => {
  const data = await $fetch('/api/blog')
  return data.filter(a => a.category === 'reflexiones-del-espiritu')
})

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`
}

useHead({
  title: 'Reflexiones del Espíritu | Bitácora | Magiancestral',
  meta: [
    { name: 'description', content: 'Meditaciones, enseñanzas y reflexiones sobre el camino espiritual y la sabiduría ancestral' }
  ]
})
</script>

<style scoped>
.page-title-section {
  padding: 60px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #888;
}

.breadcrumb-nav a {
  color: #b3a85a;
  text-decoration: none;
}

.breadcrumb-nav a:hover {
  text-decoration: underline;
}

.breadcrumb-nav i {
  font-size: 0.7rem;
  color: #aaa;
}

.page-title {
  font-size: 3rem;
  color: #0e3858;
  font-weight: 700;
  margin: 0;
}

@media (max-width: 768px) {
  .page-title-section {
    padding: 50px 0;
  }
  .page-title {
    font-size: 2rem;
  }
}

.blog_image {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
}

.blog_image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
