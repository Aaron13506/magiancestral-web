<template>
  <div>
    <h1>Nuevo artículo</h1>
    <BlogForm :loading="loading" :error="error" submit-label="Crear artículo" @submit="onSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BlogForm from '~/components/Admin/BlogForm.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const loading = ref(false)
const error = ref('')

const onSubmit = async (payload) => {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/blog', { method: 'POST', body: payload })
    await navigateTo('/admin/blog')
  } catch (err) {
    error.value = err?.data?.message || 'No se pudo crear el artículo'
  } finally {
    loading.value = false
  }
}
</script>
