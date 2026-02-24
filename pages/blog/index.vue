<template>
  <div>
    <Nav />
    <PageHeader />

    <!-- Page Title Section -->
    <section class="page-title-section">
      <div class="container">
        <h1 class="page-title">Bitácora</h1>
        <p class="page-subtitle">Explora nuestras secciones de conocimiento</p>
      </div>
    </section>

    <!-- Categorías -->
    <section class="categories-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-5 col-lg-5 col-md-6 mb-4">
            <nuxt-link to="/blog/estudios-cientificos" class="category-card">
              <div class="category-card__icon">
                <i class="fa fa-flask"></i>
              </div>
              <div class="category-card__content">
                <h2 class="category-card__title">Estudios Científicos</h2>
                <p class="category-card__desc">
                  Investigaciones y estudios científicos sobre medicina ancestral, plantas sagradas y sus efectos en la salud y el bienestar humano.
                </p>
                <span class="category-card__btn">
                  Explorar <i class="fa fa-arrow-right"></i>
                </span>
              </div>
            </nuxt-link>
          </div>

          <div class="col-xl-5 col-lg-5 col-md-6 mb-4">
            <nuxt-link to="/blog/reflexiones-del-espiritu" class="category-card">
              <div class="category-card__icon">
                <i class="fa fa-feather-alt"></i>
              </div>
              <div class="category-card__content">
                <h2 class="category-card__title">Reflexiones del Espíritu</h2>
                <p class="category-card__desc">
                  Meditaciones, enseñanzas y reflexiones sobre el camino espiritual, la sabiduría ancestral y el despertar de la conciencia.
                </p>
                <span class="category-card__btn">
                  Explorar <i class="fa fa-arrow-right"></i>
                </span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
useHead({
  title: 'Magiancestral | Bitácora',
  meta: [
    { name: 'description', content: 'Explora nuestros artículos sobre medicina ancestral, estudios científicos y reflexiones espirituales' }
  ]
})
</script>

<style scoped>
.page-title-section {
  padding: 80px 0 50px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
}

.page-title {
  font-size: 4rem;
  color: #b3a85a;
  font-weight: 700;
  margin: 0 0 10px;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

@media (max-width: 768px) {
  .page-title-section {
    padding: 60px 0 40px;
  }
  .page-title {
    font-size: 2.5rem;
  }
}

.categories-section {
  padding: 80px 0;
  background: #fff;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 50px 35px;
  border: 2px solid #e8e5d8;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  height: 100%;
  transition: all 0.3s ease;
  background: #fff;
}

.category-card:hover {
  border-color: #b3a85a;
  box-shadow: 0 15px 40px rgba(179, 168, 90, 0.15);
  transform: translateY(-5px);
  color: inherit;
  text-decoration: none;
}

.category-card__icon {
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #b3a85a, #d4c76b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
  flex-shrink: 0;
}

.category-card__icon i {
  font-size: 2.2rem;
  color: #fff;
}

.category-card__title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #0e3858;
  margin-bottom: 15px;
}

.category-card__desc {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 28px;
}

.category-card__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #b3a85a;
  font-weight: 600;
  font-size: 0.95rem;
  transition: gap 0.3s ease;
}

.category-card:hover .category-card__btn {
  gap: 14px;
}

@media (max-width: 576px) {
  .categories-section {
    padding: 50px 0;
  }
  .category-card {
    padding: 40px 25px;
  }
  .category-card__title {
    font-size: 1.4rem;
  }
}
</style>
