<template>
  <div>
    <h1>Nuevo producto</h1>
    <ProductForm :loading="loading" :error="error" submit-label="Crear producto" @submit="onSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductForm from '~/components/Admin/ProductForm.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const loading = ref(false)
const error = ref('')

const onSubmit = async (payload) => {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/products', { method: 'POST', body: payload })
    await navigateTo('/admin/products')
  } catch (err) {
    error.value = err?.data?.message || 'No se pudo crear el producto'
  } finally {
    loading.value = false
  }
}
</script>
