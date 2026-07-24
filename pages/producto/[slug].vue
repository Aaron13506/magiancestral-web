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

// Cargar producto desde la API (respaldada por la base de datos)
const product = ref(null)

const loadProduct = async () => {
  try {
    product.value = await $fetch(`/api/products/${route.params.slug}`)
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
