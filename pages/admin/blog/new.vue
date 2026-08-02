<template>
  <div>
    <AdminPageHeader
      title="Nuevo artículo"
      subtitle="Aparecerá en el blog en cuanto lo guardes."
      :crumbs="[{ label: 'Blog', to: '/admin/blog' }, { label: 'Nuevo' }]"
    />

    <BlogForm
      ref="formRef"
      :loading="loading"
      :error="error"
      submit-label="Crear artículo"
      @submit="onSubmit"
      @dirty="dirty = $event"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminPageHeader from '~/components/Admin/AdminPageHeader.vue'
import BlogForm from '~/components/Admin/BlogForm.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useHead({ title: 'Nuevo artículo · Panel Magiancestral' })

const api = useAdminApi()
const toast = useAdminToast()

const formRef = ref(null)
const loading = ref(false)
const error = ref('')
const dirty = ref(false)

const { release } = useUnsavedGuard(dirty)

const onSubmit = async (payload) => {
  loading.value = true
  error.value = ''
  try {
    const created = await api.post('/api/admin/blog', payload)
    formRef.value?.markSaved()
    release()
    toast.success(`“${created.title}” se publicó`)
    await navigateTo('/admin/blog')
  } catch (err) {
    error.value = adminErrorMessage(err, 'No se pudo crear el artículo')
  } finally {
    loading.value = false
  }
}
</script>
