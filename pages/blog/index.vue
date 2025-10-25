<template>
  <div>
    <Nav />
    <PageHeader />

    <!-- Page Title Section -->
    <section class="page-title-section">
      <div class="container">
        <h1 class="page-title">Bitácora</h1>
      </div>
    </section>

    <!-- Bitácora Listing Section -->
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
                    <nuxt-link :to="`/blog/${article.slug}`">
                      {{ article.title }}
                    </nuxt-link>
                  </h3>
                  <div class="blog_one_text">
                    <p>{{ article.description }}</p>
                  </div>
                  <div class="read_more_btn">
                    <nuxt-link :to="`/blog/${article.slug}`">
                      <i class="fa fa-angle-right"></i>Leer Más
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensaje si no hay artículos -->
          <div v-if="!articles || articles.length === 0" class="col-12 text-center py-5">
            <p class="text-muted">No hay artículos publicados aún.</p>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
// Los componentes se auto-importan en Nuxt 3
// import Nav from "../components/Nav";
// import PageHeader from "../components/PageHeader";
// import Footer from "../components/Footer";

// Obtener todos los artículos del blog desde la API
const { data: articles } = await useFetch('/api/blog')

// Función para formatear la fecha
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`
}

// Meta tags
useHead({
  title: 'Magiancestral | Bitácora',
  meta: [
    { name: 'description', content: 'Descubre artículos sobre medicina natural y plantas medicinales ancestrales' }
  ]
})
</script>

<style scoped>
.page-title-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
}

.page-title {
  font-size: 4rem;
  color: #b3a85a;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .page-title-section {
    padding: 60px 0;
  }

  .page-title {
    font-size: 2.5rem;
  }
}

/* Mantener imágenes del blog en proporción 1:1 */
.blog_image {
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* Proporción 1:1 */
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
