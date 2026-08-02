<template>
  <div class="a-stack" style="gap: 22px;">
    <AdminPageHeader :title="greeting" :subtitle="todayLabel">
      <template #actions>
        <NuxtLink to="/admin/products/new" class="a-btn a-btn--ghost">
          <i class="fas fa-plus" /> Producto
        </NuxtLink>
        <NuxtLink to="/admin/blog/new" class="a-btn a-btn--ghost">
          <i class="fas fa-plus" /> Artículo
        </NuxtLink>
        <NuxtLink to="/admin/events/new" class="a-btn a-btn--primary">
          <i class="fas fa-plus" /> Evento
        </NuxtLink>
      </template>
    </AdminPageHeader>

    <div v-if="error" class="a-alert a-alert--error">
      <i class="fas fa-exclamation-triangle" />
      <span>No se pudieron cargar las estadísticas. Revisa la conexión con la base de datos.</span>
    </div>

    <!-- Métricas -->
    <div class="a-stats">
      <NuxtLink to="/admin/products" class="a-stat">
        <div class="a-stat__top">
          <span class="a-stat__label">Productos</span>
          <span class="a-stat__icon"><i class="fas fa-box-open" /></span>
        </div>
        <p class="a-stat__value">{{ pending ? '—' : stats.products.total }}</p>
        <p class="a-stat__meta">
          {{ stats.products.featured }} destacados ·
          <span :class="{ 'a-badge a-badge--off': stats.products.outOfStock > 0 }">
            {{ stats.products.outOfStock }} agotados
          </span>
        </p>
      </NuxtLink>

      <NuxtLink to="/admin/blog" class="a-stat">
        <div class="a-stat__top">
          <span class="a-stat__label">Artículos</span>
          <span class="a-stat__icon"><i class="fas fa-feather-alt" /></span>
        </div>
        <p class="a-stat__value">{{ pending ? '—' : stats.blog.total }}</p>
        <p class="a-stat__meta">
          {{ stats.blog.studies }} estudios · {{ stats.blog.reflections }} reflexiones
        </p>
      </NuxtLink>

      <NuxtLink to="/admin/events" class="a-stat">
        <div class="a-stat__top">
          <span class="a-stat__label">Próximos eventos</span>
          <span class="a-stat__icon"><i class="fas fa-calendar-alt" /></span>
        </div>
        <p class="a-stat__value">{{ pending ? '—' : stats.events.upcoming }}</p>
        <p class="a-stat__meta">{{ stats.events.total }} en total, incluidos los pasados</p>
      </NuxtLink>

      <NuxtLink to="/admin/media" class="a-stat">
        <div class="a-stat__top">
          <span class="a-stat__label">Biblioteca</span>
          <span class="a-stat__icon"><i class="fas fa-images" /></span>
        </div>
        <p class="a-stat__value">{{ pending ? '—' : stats.media.total }}</p>
        <p class="a-stat__meta">{{ formatBytes(stats.media.bytes) }} almacenados</p>
      </NuxtLink>
    </div>

    <!-- Avisos accionables -->
    <div v-if="alerts.length" class="a-stack" style="gap: 10px;">
      <div v-for="alert in alerts" :key="alert.text" class="a-alert" :class="`a-alert--${alert.kind}`">
        <i class="fas fa-exclamation-triangle" />
        <span class="a-grow">{{ alert.text }}</span>
        <NuxtLink :to="alert.to" class="a-btn a-btn--ghost a-btn--sm">{{ alert.action }}</NuxtLink>
      </div>
    </div>

    <div class="a-cols-2">
      <!-- Próximos encuentros -->
      <div class="a-card">
        <div class="a-card__head">
          <h2 class="a-card__title">Próximos encuentros</h2>
          <NuxtLink to="/admin/events" class="a-btn a-btn--subtle a-btn--sm">Ver calendario</NuxtLink>
        </div>

        <div v-if="pending" class="a-card__body">
          <div v-for="n in 3" :key="n" class="a-skeleton" style="height: 42px; margin-bottom: 8px;" />
        </div>

        <div v-else-if="!stats.upcomingEvents.length" class="a-empty" style="padding: 34px 20px;">
          <div class="a-empty__icon"><i class="fas fa-calendar-day" /></div>
          <p class="a-empty__text" style="margin-bottom: 12px !important;">No hay encuentros programados.</p>
          <NuxtLink to="/admin/events/new" class="a-btn a-btn--primary a-btn--sm">Programar uno</NuxtLink>
        </div>

        <NuxtLink
          v-for="item in stats.upcomingEvents"
          v-else
          :key="item.id"
          :to="`/admin/events/${item.id}`"
          class="a-list__item"
        >
          <img
            v-if="item.logo || getEventTypeLogo(item.type)"
            :src="item.logo || getEventTypeLogo(item.type)"
            :alt="item.title"
            style="width: 34px; height: 34px; object-fit: contain;"
          >
          <span class="a-list__body">
            <strong>{{ item.title }}</strong>
            <span>{{ formatDate(item.eventDate, 'long') }}<template v-if="item.location"> · {{ item.location }}</template></span>
          </span>
          <span class="a-badge" :class="daysUntil(item.eventDate) <= 7 ? 'a-badge--warn' : 'a-badge--neutral'">
            {{ countdownLabel(item.eventDate) }}
          </span>
        </NuxtLink>
      </div>

      <!-- Últimos artículos -->
      <div class="a-card">
        <div class="a-card__head">
          <h2 class="a-card__title">Últimos artículos</h2>
          <NuxtLink to="/admin/blog" class="a-btn a-btn--subtle a-btn--sm">Ver todos</NuxtLink>
        </div>

        <div v-if="pending" class="a-card__body">
          <div v-for="n in 3" :key="n" class="a-skeleton" style="height: 42px; margin-bottom: 8px;" />
        </div>

        <div v-else-if="!stats.recentArticles.length" class="a-empty" style="padding: 34px 20px;">
          <div class="a-empty__icon"><i class="fas fa-feather-alt" /></div>
          <p class="a-empty__text" style="margin-bottom: 12px !important;">Todavía no hay artículos publicados.</p>
          <NuxtLink to="/admin/blog/new" class="a-btn a-btn--primary a-btn--sm">Escribir el primero</NuxtLink>
        </div>

        <NuxtLink
          v-for="item in stats.recentArticles"
          v-else
          :key="item.id"
          :to="`/admin/blog/${item.id}`"
          class="a-list__item"
        >
          <img v-if="item.image" :src="item.image" :alt="item.title" class="a-table__thumb">
          <span v-else class="a-table__thumb a-table__thumb--empty"><i class="fas fa-feather-alt" /></span>
          <span class="a-list__body">
            <strong>{{ item.title }}</strong>
            <span>{{ formatDate(item.date) }} · {{ getBlogCategoryLabel(item.category) }}</span>
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- Productos editados recientemente -->
    <div class="a-card">
      <div class="a-card__head">
        <h2 class="a-card__title">Productos editados recientemente</h2>
        <NuxtLink to="/admin/products" class="a-btn a-btn--subtle a-btn--sm">Ver catálogo</NuxtLink>
      </div>

      <div v-if="pending" class="a-card__body">
        <div v-for="n in 3" :key="n" class="a-skeleton" style="height: 42px; margin-bottom: 8px;" />
      </div>

      <div v-else-if="!stats.recentProducts.length" class="a-empty" style="padding: 34px 20px;">
        <div class="a-empty__icon"><i class="fas fa-box-open" /></div>
        <p class="a-empty__text" style="margin-bottom: 12px !important;">La botica está vacía.</p>
        <NuxtLink to="/admin/products/new" class="a-btn a-btn--primary a-btn--sm">Añadir un producto</NuxtLink>
      </div>

      <NuxtLink
        v-for="item in stats.recentProducts"
        v-else
        :key="item.id"
        :to="`/admin/products/${item.id}`"
        class="a-list__item"
      >
        <img v-if="item.image" :src="item.image" :alt="item.name" class="a-table__thumb">
        <span v-else class="a-table__thumb a-table__thumb--empty"><i class="fas fa-box-open" /></span>
        <span class="a-list__body">
          <strong>{{ item.name }}</strong>
          <span>{{ formatPrice(item.price, item.currency) }} · editado {{ formatDateTime(item.updatedAt) }}</span>
        </span>
        <span class="a-badge" :class="item.inStock ? 'a-badge--ok' : 'a-badge--off'">
          {{ item.inStock ? 'En stock' : 'Agotado' }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AdminPageHeader from '~/components/Admin/AdminPageHeader.vue'
import { getBlogCategoryLabel } from '~/utils/blogCategories'
import { getEventTypeLogo } from '~/utils/eventTypes'
import { daysUntil, formatBytes, formatDate, formatDateTime, formatPrice } from '~/utils/format'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useHead({ title: 'Panel · Magiancestral' })

const api = useAdminApi()

const EMPTY = {
  username: '',
  products: { total: 0, outOfStock: 0, featured: 0, noImage: 0 },
  blog: { total: 0, studies: 0, reflections: 0 },
  events: { total: 0, upcoming: 0 },
  media: { total: 0, bytes: 0 },
  recentProducts: [],
  recentArticles: [],
  upcomingEvents: []
}

// Comparte la clave con el layout: una sola petición alimenta el menú y el panel.
const { data, pending, error } = await useAsyncData(
  'admin-nav-stats',
  () => api.get('/api/admin/stats'),
  { default: () => null }
)

const stats = computed(() => data.value || EMPTY)

const greeting = computed(() => {
  const hour = new Date().getHours()
  const part = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches'
  return stats.value.username ? `${part}, ${stats.value.username}` : part
})

const todayLabel = computed(() => {
  const now = new Date()
  const formatted = new Intl.DateTimeFormat('es', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(now)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
})

const alerts = computed(() => {
  const list = []
  const s = stats.value

  if (s.products.outOfStock > 0) {
    list.push({
      kind: 'warn',
      text: `${s.products.outOfStock} ${s.products.outOfStock === 1 ? 'producto está agotado' : 'productos están agotados'} y aparecen sin opción de compra.`,
      to: '/admin/products?filter=out-of-stock',
      action: 'Revisar'
    })
  }

  if (s.products.noImage > 0) {
    list.push({
      kind: 'warn',
      text: `${s.products.noImage} ${s.products.noImage === 1 ? 'producto no tiene' : 'productos no tienen'} imagen principal.`,
      to: '/admin/products?filter=no-image',
      action: 'Completar'
    })
  }

  if (!pending.value && s.events.upcoming === 0 && s.events.total > 0) {
    list.push({
      kind: 'info',
      text: 'No hay encuentros próximos: el calendario del sitio se verá vacío.',
      to: '/admin/events/new',
      action: 'Programar'
    })
  }

  return list
})

const countdownLabel = (date) => {
  const days = daysUntil(date)
  if (days == null) return ''
  if (days === 0) return 'Hoy'
  if (days === 1) return 'Mañana'
  return `En ${days} días`
}
</script>
