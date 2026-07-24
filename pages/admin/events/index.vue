<template>
  <div>
    <div class="admin-page-header">
      <h1>Eventos</h1>
      <NuxtLink to="/admin/events/new" class="btn btn-primary">Nuevo evento</NuxtLink>
    </div>

    <AdminEventsCalendar :events="eventsList" @delete="onDelete" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import AdminEventsCalendar from '~/components/Admin/AdminEventsCalendar.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const { data, refresh } = await useAsyncData('admin-events', () => $fetch('/api/admin/events'))
const eventsList = ref(data.value || [])
watch(data, (val) => { eventsList.value = val || [] })

const onDelete = async (item) => {
  if (!confirm(`¿Borrar el evento "${item.title}"?`)) return
  await $fetch(`/api/admin/events/${item.id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<style scoped>
.admin-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
