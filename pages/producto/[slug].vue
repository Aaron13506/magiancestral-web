<template>
  <div>
    <Nav />
    <PageHeader :title="product?.shortName || product?.name || 'Producto'" />
    <ProductDetail :product="product" />
    <Footer />
  </div>
</template>

<script setup>
import Nav from "../../components/Nav.vue"
import PageHeader from "../../components/PageHeader.vue"
import ProductDetail from "../../components/ProductDetail.vue"
import Footer from "../../components/Footer.vue"

const route = useRoute()

// Cargar producto desde archivo JSON estático (mismo patrón que bitácora)
const product = ref(null)

const loadProduct = async () => {
  try {
    const response = await fetch('/data/products.json')
    const data = await response.json()
    product.value = data.products.find(p => p.slug === route.params.slug) || null
  } catch (error) {
    console.error('Error loading product:', error)
    product.value = null
  }
}

await loadProduct()

useHead({
  title: `Magiancestral | ${product.value?.shortName || product.value?.name || 'Producto'}`
})
</script>
