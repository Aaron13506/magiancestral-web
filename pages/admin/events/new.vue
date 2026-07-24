<template>
  <div>
    <h1>Nuevo evento</h1>
    <EventForm :initial="initial" :loading="loading" :error="error" submit-label="Crear evento" @submit="onSubmit" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EventForm from '~/components/Admin/EventForm.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const initial = ref(route.query.date ? { eventDate: String(route.query.date) } : {})
const loading = ref(false)
const error = ref('')

const onSubmit = async (payload) => {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/events', { method: 'POST', body: payload })
    await navigateTo('/admin/events')
  } catch (err) {
    error.value = err?.data?.message || 'No se pudo crear el evento'
  } finally {
    loading.value = false
  }
}
</script>
