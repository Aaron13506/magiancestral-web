<template>
  <div class="admin-shell" :class="{ 'admin-shell--menu': menuOpen }">
    <!-- Barra lateral -->
    <aside class="a-sidebar">
      <NuxtLink to="/admin" class="a-sidebar__brand" @click="menuOpen = false">
        <span class="a-sidebar__mark">M</span>
        <span class="a-sidebar__name">
          <strong>Magiancestral</strong>
          <span>Panel</span>
        </span>
      </NuxtLink>

      <div class="a-sidebar__scroll">
        <div v-for="group in navGroups" :key="group.label" class="a-sidebar__group">
          <p class="a-sidebar__group-label">{{ group.label }}</p>
          <NuxtLink
            v-for="item in group.items"
            :key="item.to"
            :to="item.to"
            class="a-navlink"
            :class="{ 'a-navlink--active': isActive(item) }"
            @click="menuOpen = false"
          >
            <i class="a-navlink__icon" :class="item.icon" />
            <span>{{ item.label }}</span>
            <span v-if="item.count != null" class="a-navlink__count">{{ item.count }}</span>
          </NuxtLink>
        </div>
      </div>

      <div class="a-sidebar__foot">
        <div class="a-sidebar__user">
          <span class="a-sidebar__avatar">{{ userInitial }}</span>
          <span class="a-sidebar__user-info">
            <strong>{{ username }}</strong>
            <span>Administrador</span>
          </span>
        </div>
        <button type="button" class="a-sidebar__logout" :disabled="loggingOut" @click="onLogout">
          <i class="fas fa-sign-out-alt" />
          {{ loggingOut ? 'Saliendo…' : 'Cerrar sesión' }}
        </button>
      </div>
    </aside>

    <div class="a-scrim" @click="menuOpen = false" />

    <!-- Área de trabajo -->
    <div class="a-main">
      <header class="a-topbar">
        <button type="button" class="a-topbar__burger" aria-label="Abrir menú" @click="menuOpen = !menuOpen">
          <i class="fas fa-bars" />
        </button>

        <nav class="a-breadcrumb" aria-label="Ruta">
          <NuxtLink to="/admin">Panel</NuxtLink>
          <template v-for="(crumb, i) in crumbs" :key="i">
            <span class="a-breadcrumb__sep">/</span>
            <NuxtLink v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</NuxtLink>
            <span v-else class="a-breadcrumb__current">{{ crumb.label }}</span>
          </template>
        </nav>

        <span class="a-topbar__spacer" />

        <a href="/" target="_blank" rel="noopener" class="a-btn a-btn--ghost a-btn--sm">
          <i class="fas fa-external-link-alt" />
          <span class="a-nowrap">Ver sitio</span>
        </a>
      </header>

      <main class="a-content">
        <slot />
      </main>
    </div>

    <AdminConfirmDialog />
    <AdminToaster />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import AdminConfirmDialog from '~/components/Admin/AdminConfirmDialog.vue'
import AdminToaster from '~/components/Admin/AdminToaster.vue'

const route = useRoute()
const api = useAdminApi()
const toast = useAdminToast()
const page = useAdminPage()

const menuOpen = ref(false)
const loggingOut = ref(false)

// Cierra el drawer móvil al navegar.
watch(() => route.fullPath, () => { menuOpen.value = false })

// Contadores del menú lateral. Se refrescan en cada navegación dentro del
// panel para que reflejen altas y bajas sin recargar la página.
const { data: stats, refresh: refreshStats } = await useAsyncData(
  'admin-nav-stats',
  () => api.get('/api/admin/stats'),
  { default: () => null }
)

watch(() => route.path, () => { refreshStats() })

const username = computed(() => stats.value?.username || 'Admin')
const userInitial = computed(() => (username.value || 'A').charAt(0).toUpperCase())

const navGroups = computed(() => [
  {
    label: 'General',
    items: [
      { to: '/admin', label: 'Inicio', icon: 'fas fa-th-large', exact: true }
    ]
  },
  {
    label: 'Contenido',
    items: [
      { to: '/admin/products', label: 'Productos', icon: 'fas fa-box-open', count: stats.value?.products?.total },
      { to: '/admin/blog', label: 'Blog', icon: 'fas fa-feather-alt', count: stats.value?.blog?.total },
      { to: '/admin/events', label: 'Eventos', icon: 'fas fa-calendar-alt', count: stats.value?.events?.upcoming }
    ]
  },
  {
    label: 'Recursos',
    items: [
      { to: '/admin/media', label: 'Biblioteca', icon: 'fas fa-images', count: stats.value?.media?.total }
    ]
  }
])

const isActive = (item) => (
  item.exact ? route.path === item.to : route.path.startsWith(item.to)
)

// El breadcrumb lo publica <AdminPageHeader> de cada página; si la página no
// alcanzó a registrarlo (o cambió la ruta), no mostramos migas obsoletas.
const crumbs = computed(() => (page.value.path === route.path ? page.value.crumbs : []))

const onLogout = async () => {
  loggingOut.value = true
  try {
    await api.post('/api/admin/auth/logout')
  } catch {
    // Da igual el resultado: siempre volvemos al login.
  } finally {
    loggingOut.value = false
    toast.success('Sesión cerrada')
    await navigateTo('/admin/login')
  }
}
</script>
