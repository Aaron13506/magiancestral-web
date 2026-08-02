<template>
  <div>
    <AdminPageHeader
      :title="article?.title || 'Editar artículo'"
      :subtitle="subtitle"
      :crumbs="[{ label: 'Blog', to: '/admin/blog' }, { label: article?.title || 'Editar' }]"
    >
      <template #actions>
        <a
          v-if="article"
          :href="article.pdfUrl || `/blog/${article.slug}`"
          target="_blank"
          rel="noopener"
          class="a-btn a-btn--ghost"
        >
          <i class="fas fa-eye" /> {{ article.pdfUrl ? 'Abrir PDF' : 'Ver en el sitio' }}
        </a>
        <button type="button" class="a-btn a-btn--danger-ghost" :disabled="deleting" @click="onDelete">
          <i class="fas fa-trash-alt" /> Borrar
        </button>
      </template>
    </AdminPageHeader>

    <div v-if="loadError" class="a-alert a-alert--error">
      <i class="fas fa-exclamation-triangle" />
      <span class="a-grow">No se encontró este artículo o no se pudo cargar.</span>
      <NuxtLink to="/admin/blog" class="a-btn a-btn--ghost a-btn--sm">Volver al listado</NuxtLink>
    </div>

    <div v-else-if="pending" class="a-card">
      <div class="a-card__body">
        <div class="a-skeleton" style="height: 380px;" />
      </div>
    </div>

    <BlogForm
      v-else
      ref="formRef"
      :initial="article || {}"
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
import BlogForm from '~/components/Admin/BlogForm.vue'
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

const { data: article, pending, error: loadError } = await useAsyncData(
  `admin-blog-${route.params.id}`,
  () => api.get(`/api/admin/blog/${route.params.id}`)
)

useHead(() => ({ title: `${article.value?.title || 'Artículo'} · Panel Magiancestral` }))

const subtitle = computed(() => (
  article.value?.updatedAt ? `Última edición: ${formatDateTime(article.value.updatedAt)}` : ''
))

const onSubmit = async (payload) => {
  saving.value = true
  error.value = ''
  try {
    await api.put(`/api/admin/blog/${route.params.id}`, payload)
    formRef.value?.markSaved()
    release()
    toast.success('Cambios guardados')
    await navigateTo('/admin/blog')
  } catch (err) {
    error.value = adminErrorMessage(err, 'No se pudo guardar el artículo')
  } finally {
    saving.value = false
  }
}

const onDelete = async () => {
  const ok = await confirm({
    title: 'Borrar artículo',
    message: `¿Seguro que quieres borrar “${article.value?.title}”?`,
    detail: 'Dejará de estar disponible en el blog. Esta acción no se puede deshacer.',
    confirmLabel: 'Borrar',
    danger: true
  })
  if (!ok) return

  deleting.value = true
  try {
    await api.del(`/api/admin/blog/${route.params.id}`)
    release()
    toast.success('Artículo borrado')
    await navigateTo('/admin/blog')
  } catch (err) {
    toast.error(adminErrorMessage(err, 'No se pudo borrar el artículo'))
  } finally {
    deleting.value = false
  }
}
</script>
