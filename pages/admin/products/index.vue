<template>
  <div>
    <div class="admin-page-header">
      <h1>Productos</h1>
      <NuxtLink to="/admin/products/new" class="btn btn-primary">Nuevo producto</NuxtLink>
    </div>

    <AdminTable :items="products" :columns="columns" empty-text="Todavía no hay productos.">
      <template #cell-price="{ value, item }">{{ item.currency }} {{ Number(value).toFixed(2) }}</template>
      <template #cell-inStock="{ value }">{{ value ? 'Sí' : 'No' }}</template>
      <template #actions="{ item }">
        <NuxtLink :to="`/admin/products/${item.id}`" class="btn btn-sm btn-outline-secondary">Editar</NuxtLink>
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
  { key: 'name', label: 'Nombre' },
  { key: 'slug', label: 'Slug' },
  { key: 'price', label: 'Precio' },
  { key: 'category', label: 'Categoría' },
  { key: 'inStock', label: 'En stock' }
]

const { data, refresh } = await useAsyncData('admin-products', () => $fetch('/api/admin/products'))
const products = ref(data.value || [])
watch(data, (val) => { products.value = val || [] })

const onDelete = async (item) => {
  if (!confirm(`¿Borrar el producto "${item.name}"?`)) return
  await $fetch(`/api/admin/products/${item.id}`, { method: 'DELETE' })
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
