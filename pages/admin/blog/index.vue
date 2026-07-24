<template>
  <div>
    <div class="admin-page-header">
      <h1>Blog</h1>
      <NuxtLink to="/admin/blog/new" class="btn btn-primary">Nuevo artículo</NuxtLink>
    </div>

    <AdminTable :items="articles" :columns="columns" empty-text="Todavía no hay artículos.">
      <template #actions="{ item }">
        <NuxtLink :to="`/admin/blog/${item.id}`" class="btn btn-sm btn-outline-secondary">Editar</NuxtLink>
        <button type="button" class="btn btn-sm btn-danger" @click="onDelete(item)">Borrar</button>
      </template>
    </AdminTable>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import AdminTable from '~/components/Admin/AdminTable.vue'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const columns = [
  { key: 'title', label: 'Título' },
  { key: 'slug', label: 'Slug' },
  { key: 'date', label: 'Fecha' },
  { key: 'category', label: 'Categoría' }
]

const { data, refresh } = await useAsyncData('admin-blog', () => $fetch('/api/admin/blog'))
const articles = ref(data.value || [])
watch(data, (val) => { articles.value = val || [] })

const onDelete = async (item) => {
  if (!confirm(`¿Borrar el artículo "${item.title}"?`)) return
  await $fetch(`/api/admin/blog/${item.id}`, { method: 'DELETE' })
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
