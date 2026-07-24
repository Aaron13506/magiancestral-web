<template>
  <div>
    <div class="admin-page-header">
      <h1>Editar producto</h1>
      <button type="button" class="btn btn-danger" @click="onDelete">Borrar producto</button>
    </div>
    <ProductForm :initial="product || {}" :loading="loading" :error="error" submit-label="Guardar cambios" @submit="onSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductForm from '~/components/Admin/ProductForm.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const loading = ref(false)
const error = ref('')

const { data: product } = await useAsyncData(`admin-product-${route.params.id}`, () =>
  $fetch(`/api/admin/products/${route.params.id}`)
)

const onSubmit = async (payload) => {
  loading.value = true
  error.value = ''
  try {
    await $fetch(`/api/admin/products/${route.params.id}`, { method: 'PUT', body: payload })
    await navigateTo('/admin/products')
  } catch (err) {
    error.value = err?.data?.message || 'No se pudo guardar el producto'
  } finally {
    loading.value = false
  }
}

const onDelete = async () => {
  if (!confirm('¿Borrar este producto?')) return
  await $fetch(`/api/admin/products/${route.params.id}`, { method: 'DELETE' })
  await navigateTo('/admin/products')
}
</script>

<style scoped>
.admin-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 720px;
  margin-bottom: 20px;
}
</style>
