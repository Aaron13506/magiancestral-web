<template>
  <section class="product">
    <div class="container">
      <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-6">
          <div class="sidebar-wrapper style2">
            <!--Start single sidebar-->
            <div class="single-sidebar wow fadeInUp animated animated" data-wow-delay="0.1s" data-wow-duration="1200ms" style="visibility: visible; animation-duration: 1200ms; animation-delay: 0.1s; animation-name: fadeInUp;">
              <div class="sidebar-search-box">
                <form class="search-form" @submit.prevent="handleSearch">
                  <input v-model="searchQuery" placeholder="Buscar productos..." type="text">
                  <button type="submit"><i class="icon-magnifying-glass" aria-hidden="true"></i></button>
                </form>
              </div>
            </div>
            <!--End single sidebar-->
            <!--Start sidebar categories Box-->
            <div class="single-sidebar wow fadeInUp animated animated" data-wow-delay="0.3s" data-wow-duration="1200ms" style="visibility: visible; animation-duration: 1200ms; animation-delay: 0.3s; animation-name: fadeInUp;">
              <div class="categories-box">
                <div class="title">
                  <h3>Categorías</h3>
                </div>
                <ul class="categories clearfix">
                  <li v-for="category in categories" :key="category.id">
                    <a href="#" @click.prevent="filterByCategory(category.id)">{{ category.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <!--End sidebar categories Box-->
            <!--Start single sidebar-->
            <div class="single-sidebar wow fadeInUp animated animated" data-wow-delay="0.5s" data-wow-duration="1200ms" style="visibility: visible; animation-duration: 1200ms; animation-delay: 0.5s; animation-name: fadeInUp;">
              <div class="top_sellers">
                <div class="title">
                  <h3>Productos Destacados</h3>
                </div>
                <ul class="top-products">
                  <li v-for="product in topProducts" :key="product.id">
                    <div class="product_item">
                      <div class="img-box">
                        <img :src="product.image" :alt="product.name">
                        <div class="overlay-content">
                          <nuxt-link :to="`/producto/${product.slug}`"><i class="fa fa-link" aria-hidden="true"></i></nuxt-link>
                        </div>
                      </div>
                      <div class="title-box">
                        <h4><nuxt-link :to="`/producto/${product.slug}`">{{ product.shortName || product.name }}</nuxt-link></h4>
                        <div class="value">${{ product.price.toFixed(2) }} {{ product.currency }}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!--End single sidebar-->

          </div>
        </div>
        <!--End Sidebar Wrapper-->
        <div class="col-xl-9 col-lg-9">
          <div class="product-items">
            <div class="row">
              <div class="col-xl-12">
                <div class="showing-result-shorting">
                  <div class="left">
                    <div class="showing">
                      <p>Mostrando {{ filteredProducts.length }} de {{ totalProducts }} Productos</p>
                    </div>
                  </div>
                  <div class="right">
                    <div class="shorting">
                      <div class="dropdown shorting bootstrap-select" style="width: 100%;">
                        <select v-model="sortOrder" class="selectpicker" data-width="100%" @change="handleSort">
                          <option value="default">Ordenar por defecto</option>
                          <option value="price-asc">Precio: Menor a Mayor</option>
                          <option value="price-desc">Precio: Mayor a Menor</option>
                          <option value="name-asc">Nombre: A a Z</option>
                          <option value="name-desc">Nombre: Z a A</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="all_products">
              <div class="row">
                <div v-for="product in displayProducts" :key="product.id" class="col-xl-4 col-lg-4 col-md-6">
                  <div class="all_products_single text-center">
                    <div class="all_product_item_image">
                      <img :src="product.image" :alt="product.name">
                      <div class="all_product_hover">
                        <div class="all_product_icon">
                          <nuxt-link :to="`/producto/${product.slug}`"><span class="icon-shopping-cart"></span></nuxt-link>
                        </div>
                      </div>
                    </div>
                    <h4><nuxt-link :to="`/producto/${product.slug}`">{{ product.shortName || product.name }}</nuxt-link></h4>
                    <p>${{ product.price.toFixed(2) }} {{ product.currency }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref(null)
const sortOrder = ref('default')

// Fetch products data from API endpoint
const { data: productsData } = await useFetch('/api/products')

// Computed properties
const allProducts = computed(() => {
  if (!productsData.value) return []
  // Mostrar todos los productos en la lista principal
  return productsData.value.products || []
})

const topProducts = computed(() => {
  if (!productsData.value) return []
  return productsData.value.products.filter(p => p.topProduct === true)
})

const categories = computed(() => {
  if (!productsData.value) return []
  return productsData.value.categories || []
})

const totalProducts = computed(() => {
  if (!productsData.value) return 0
  return productsData.value.products?.length || 0
})

const filteredProducts = computed(() => {
  let products = [...allProducts.value]

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    products = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    products = products.filter(p => p.category === selectedCategory.value)
  }

  return products
})

const displayProducts = computed(() => {
  let products = [...filteredProducts.value]

  // Apply sorting
  switch (sortOrder.value) {
    case 'price-asc':
      products.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      products.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      products.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      products.sort((a, b) => b.name.localeCompare(a.name))
      break
    default:
      // Default sorting by ID
      products.sort((a, b) => a.id - b.id)
  }

  return products
})

// Methods
const handleSearch = () => {
  // Search is handled by computed property
}

const filterByCategory = (categoryId) => {
  if (selectedCategory.value === categoryId) {
    selectedCategory.value = null // Toggle off if clicked again
  } else {
    selectedCategory.value = categoryId
  }
}

const handleSort = () => {
  // Sorting is handled by computed property
}
</script>

<style scoped>
.categories a {
  cursor: pointer;
}
</style>
