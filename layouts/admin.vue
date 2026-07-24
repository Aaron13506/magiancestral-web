<template>
  <div class="admin-layout">
    <header class="admin-header">
      <NuxtLink to="/admin" class="admin-brand">Magiancestral · Admin</NuxtLink>
      <nav class="admin-nav">
        <NuxtLink to="/admin/products">Productos</NuxtLink>
        <NuxtLink to="/admin/blog">Blog</NuxtLink>
        <NuxtLink to="/admin/events">Eventos</NuxtLink>
        <button type="button" class="admin-logout-btn" @click="logout">Cerrar sesión</button>
      </nav>
    </header>
    <main class="admin-main container">
      <slot />
    </main>
  </div>
</template>

<script setup>
const logout = async () => {
  await $fetch('/api/admin/auth/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background: #f5f5f5;
}
.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 25px;
  background: #222;
  color: #fff;
  flex-wrap: wrap;
  gap: 15px;
}
.admin-brand {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.admin-nav {
  display: flex;
  align-items: center;
  gap: 20px;
}
.admin-nav a {
  color: #ccc;
  text-decoration: none;
}
.admin-nav a.router-link-active {
  color: #fff;
  font-weight: 600;
}
.admin-logout-btn {
  background: transparent;
  border: 1px solid #666;
  color: #ccc;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.admin-logout-btn:hover {
  color: #fff;
  border-color: #fff;
}
.admin-main {
  padding: 30px 25px;
}
</style>

<style>
.admin-main h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #222;
  margin: 0;
}
</style>
