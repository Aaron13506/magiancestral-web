<template>
  <div class="admin-dashboard">
    <h1>Panel Admin</h1>
    <div class="admin-dashboard-cards">
      <NuxtLink to="/admin/products" class="admin-dashboard-card">
        <h2>Productos</h2>
        <p>Gestionar catálogo de la botica</p>
      </NuxtLink>
      <NuxtLink to="/admin/blog" class="admin-dashboard-card">
        <h2>Blog</h2>
        <p>Gestionar artículos del blog</p>
      </NuxtLink>
      <NuxtLink to="/admin/events" class="admin-dashboard-card">
        <h2>Eventos</h2>
        <p>Gestionar calendario de eventos</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'admin', layout: 'admin' })
</script>

<style scoped>
.admin-dashboard-cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.admin-dashboard-card {
  background: #fff;
  border-radius: 6px;
  padding: 25px;
  min-width: 220px;
  flex: 1 1 220px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
.admin-dashboard-card h2 {
  margin: 0 0 8px;
  font-size: 18px;
}
.admin-dashboard-card p {
  margin: 0;
  color: #777;
}
</style>
