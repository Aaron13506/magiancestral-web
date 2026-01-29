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

const { data: product } = await useFetch(`/api/products/${route.params.slug}`)

useHead({
  title: `Magiancestral | ${product.value?.shortName || product.value?.name || 'Producto'}`
})
</script>
