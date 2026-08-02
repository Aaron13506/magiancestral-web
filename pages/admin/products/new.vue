<template>
  <div>
    <AdminPageHeader
      title="Nuevo producto"
      subtitle="Se publicará en la botica en cuanto lo guardes."
      :crumbs="[{ label: 'Productos', to: '/admin/products' }, { label: 'Nuevo' }]"
    />

    <ProductForm
      ref="formRef"
      :loading="loading"
      :error="error"
      submit-label="Crear producto"
      @submit="onSubmit"
      @dirty="dirty = $event"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminPageHeader from '~/components/Admin/AdminPageHeader.vue'
import ProductForm from '~/components/Admin/ProductForm.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useHead({ title: 'Nuevo producto · Panel Magiancestral' })

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
    const created = await api.post('/api/admin/products', payload)
    formRef.value?.markSaved()
    release()
    toast.success(`“${created.name}” se creó correctamente`)
    await navigateTo('/admin/products')
  } catch (err) {
    error.value = adminErrorMessage(err, 'No se pudo crear el producto')
  } finally {
    loading.value = false
  }
}
</script>
