<template>
  <div>
    <AdminPageHeader
      :title="eventItem?.title || 'Editar evento'"
      :subtitle="subtitle"
      :crumbs="[{ label: 'Eventos', to: '/admin/events' }, { label: eventItem?.title || 'Editar' }]"
    >
      <template #actions>
        <a href="/projects" target="_blank" rel="noopener" class="a-btn a-btn--ghost">
          <i class="fas fa-eye" /> Ver calendario del sitio
        </a>
        <button type="button" class="a-btn a-btn--danger-ghost" :disabled="deleting" @click="onDelete">
          <i class="fas fa-trash-alt" /> Borrar
        </button>
      </template>
    </AdminPageHeader>

    <div v-if="loadError" class="a-alert a-alert--error">
      <i class="fas fa-exclamation-triangle" />
      <span class="a-grow">No se encontró este evento o no se pudo cargar.</span>
      <NuxtLink to="/admin/events" class="a-btn a-btn--ghost a-btn--sm">Volver al calendario</NuxtLink>
    </div>

    <div v-else-if="pending" class="a-card">
      <div class="a-card__body">
        <div class="a-skeleton" style="height: 380px;" />
      </div>
    </div>

    <EventForm
      v-else
      ref="formRef"
      :initial="eventItem || {}"
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
import EventForm from '~/components/Admin/EventForm.vue'
import { formatDate } from '~/utils/format'

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

const { data: eventItem, pending, error: loadError } = await useAsyncData(
  `admin-event-${route.params.id}`,
  () => api.get(`/api/admin/events/${route.params.id}`)
)

useHead(() => ({ title: `${eventItem.value?.title || 'Evento'} · Panel Magiancestral` }))

const subtitle = computed(() => (
  eventItem.value?.eventDate ? formatDate(eventItem.value.eventDate, 'long') : ''
))

const onSubmit = async (payload) => {
  saving.value = true
  error.value = ''
  try {
    await api.put(`/api/admin/events/${route.params.id}`, payload)
    formRef.value?.markSaved()
    release()
    toast.success('Cambios guardados')
    await navigateTo('/admin/events')
  } catch (err) {
    error.value = adminErrorMessage(err, 'No se pudo guardar el evento')
  } finally {
    saving.value = false
  }
}

const onDelete = async () => {
  const ok = await confirm({
    title: 'Borrar evento',
    message: `¿Seguro que quieres borrar “${eventItem.value?.title}”?`,
    detail: 'Esta acción no se puede deshacer.',
    confirmLabel: 'Borrar',
    danger: true
  })
  if (!ok) return

  deleting.value = true
  try {
    await api.del(`/api/admin/events/${route.params.id}`)
    release()
    toast.success('Evento borrado')
    await navigateTo('/admin/events')
  } catch (err) {
    toast.error(adminErrorMessage(err, 'No se pudo borrar el evento'))
  } finally {
    deleting.value = false
  }
}
</script>
