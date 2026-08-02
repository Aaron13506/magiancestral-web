<template>
  <div>
    <AdminPageHeader
      :title="product?.name || 'Editar producto'"
      :subtitle="subtitle"
      :crumbs="[{ label: 'Productos', to: '/admin/products' }, { label: product?.name || 'Editar' }]"
    >
      <template #actions>
        <a
          v-if="product?.slug"
          :href="`/producto/${product.slug}`"
          target="_blank"
          rel="noopener"
          class="a-btn a-btn--ghost"
        >
          <i class="fas fa-eye" /> Ver en el sitio
        </a>
        <button type="button" class="a-btn a-btn--danger-ghost" :disabled="deleting" @click="onDelete">
          <i class="fas fa-trash-alt" /> Borrar
        </button>
      </template>
    </AdminPageHeader>

    <div v-if="loadError" class="a-alert a-alert--error">
      <i class="fas fa-exclamation-triangle" />
      <span class="a-grow">No se encontró este producto o no se pudo cargar.</span>
      <NuxtLink to="/admin/products" class="a-btn a-btn--ghost a-btn--sm">Volver al listado</NuxtLink>
    </div>

    <div v-else-if="pending" class="a-card">
      <div class="a-card__body">
        <div class="a-skeleton" style="height: 380px;" />
      </div>
    </div>

    <ProductForm
      v-else
      ref="formRef"
      :initial="product || {}"
      :loading="saving"
      :error="error"
      submit-label="Guardar cambios"
      @submit="onSubmit"
      @dirty="dirty = $event"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminPageHeader from '~/components/Admin/AdminPageHeader.vue'
import ProductForm from '~/components/Admin/ProductForm.vue'
import { formatDateTime } from '~/utils/format'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const api = useAdminApi()
const toast = useAdminToast()
const { confirm } = useAdminConfirm()

const formRef = ref(null)
const saving = ref(false)
const deleting = ref(false)
const error = ref('')
const dirty = ref(false)

const { release } = useUnsavedGuard(dirty)

const { data: product, pending, error: loadError } = await useAsyncData(
  `admin-product-${route.params.id}`,
  () => api.get(`/api/admin/products/${route.params.id}`)
)

useHead(() => ({ title: `${product.value?.name || 'Producto'} · Panel Magiancestral` }))

const subtitle = computed(() => (
  product.value?.updatedAt ? `Última edición: ${formatDateTime(product.value.updatedAt)}` : ''
))

const onSubmit = async (payload) => {
  saving.value = true
  error.value = ''
  try {
    await api.put(`/api/admin/products/${route.params.id}`, payload)
    formRef.value?.markSaved()
    release()
    toast.success('Cambios guardados')
    await navigateTo('/admin/products')
  } catch (err) {
    error.value = adminErrorMessage(err, 'No se pudo guardar el producto')
  } finally {
    saving.value = false
  }
}

const onDelete = async () => {
  const ok = await confirm({
    title: 'Borrar producto',
    message: `¿Seguro que quieres borrar “${product.value?.name}”?`,
    detail: 'Desaparecerá de la botica de inmediato. Esta acción no se puede deshacer.',
    confirmLabel: 'Borrar',
    danger: true
  })
  if (!ok) return

  deleting.value = true
  try {
    await api.del(`/api/admin/products/${route.params.id}`)
    release()
    toast.success('Producto borrado')
    await navigateTo('/admin/products')
  } catch (err) {
    toast.error(adminErrorMessage(err, 'No se pudo borrar el producto'))
  } finally {
    deleting.value = false
  }
}
</script>
