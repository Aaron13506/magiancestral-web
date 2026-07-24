<template>
  <div>
    <div class="admin-page-header">
      <h1>Editar artículo</h1>
      <button type="button" class="btn btn-danger" @click="onDelete">Borrar artículo</button>
    </div>
    <BlogForm :initial="article || {}" :loading="loading" :error="error" submit-label="Guardar cambios" @submit="onSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BlogForm from '~/components/Admin/BlogForm.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const loading = ref(false)
const error = ref('')

const { data: article } = await useAsyncData(`admin-blog-${route.params.id}`, () =>
  $fetch(`/api/admin/blog/${route.params.id}`)
)

const onSubmit = async (payload) => {
  loading.value = true
  error.value = ''
  try {
    await $fetch(`/api/admin/blog/${route.params.id}`, { method: 'PUT', body: payload })
    await navigateTo('/admin/blog')
  } catch (err) {
    error.value = err?.data?.message || 'No se pudo guardar el artículo'
  } finally {
    loading.value = false
  }
}

const onDelete = async () => {
  if (!confirm('¿Borrar este artículo?')) return
  await $fetch(`/api/admin/blog/${route.params.id}`, { method: 'DELETE' })
  await navigateTo('/admin/blog')
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
