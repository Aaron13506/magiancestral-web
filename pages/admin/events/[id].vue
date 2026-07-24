<template>
  <div>
    <div class="admin-page-header">
      <h1>Editar evento</h1>
      <button type="button" class="btn btn-danger" @click="onDelete">Borrar evento</button>
    </div>
    <EventForm :initial="eventItem || {}" :loading="loading" :error="error" submit-label="Guardar cambios" @submit="onSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EventForm from '~/components/Admin/EventForm.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const loading = ref(false)
const error = ref('')

const { data: eventItem } = await useAsyncData(`admin-event-${route.params.id}`, () =>
  $fetch(`/api/admin/events/${route.params.id}`)
)

const onSubmit = async (payload) => {
  loading.value = true
  error.value = ''
  try {
    await $fetch(`/api/admin/events/${route.params.id}`, { method: 'PUT', body: payload })
    await navigateTo('/admin/events')
  } catch (err) {
    error.value = err?.data?.message || 'No se pudo guardar el evento'
  } finally {
    loading.value = false
  }
}

const onDelete = async () => {
  if (!confirm('¿Borrar este evento?')) return
  await $fetch(`/api/admin/events/${route.params.id}`, { method: 'DELETE' })
  await navigateTo('/admin/events')
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
