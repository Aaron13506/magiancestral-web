<template>
  <div>
    <AdminPageHeader
      title="Nuevo evento"
      subtitle="Aparecerá en el calendario del sitio en cuanto lo guardes."
      :crumbs="[{ label: 'Eventos', to: '/admin/events' }, { label: 'Nuevo' }]"
    />

    <EventForm
      ref="formRef"
      :initial="initial"
      :loading="loading"
      :error="error"
      submit-label="Crear evento"
      @submit="onSubmit"
      @dirty="dirty = $event"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminPageHeader from '~/components/Admin/AdminPageHeader.vue'
import EventForm from '~/components/Admin/EventForm.vue'
import { toDateInput } from '~/utils/format'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useHead({ title: 'Nuevo evento · Panel Magiancestral' })

const route = useRoute()
const api = useAdminApi()
const toast = useAdminToast()

// El calendario enlaza con `?date=YYYY-MM-DD` al pulsar «Añadir» en un día.
const queryDate = typeof route.query.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(route.query.date)
  ? route.query.date
  : toDateInput()

const initial = ref({ eventDate: queryDate })

const formRef = ref(null)
const loading = ref(false)
const error = ref('')
const dirty = ref(false)

const { release } = useUnsavedGuard(dirty)

const onSubmit = async (payload) => {
  loading.value = true
  error.value = ''
  try {
    await api.post('/api/admin/events', payload)
    formRef.value?.markSaved()
    release()
    toast.success('Evento creado')
    await navigateTo('/admin/events')
  } catch (err) {
    error.value = adminErrorMessage(err, 'No se pudo crear el evento')
  } finally {
    loading.value = false
  }
}
</script>
