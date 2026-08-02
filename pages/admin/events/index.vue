<template>
  <div>
    <AdminPageHeader
      title="Eventos"
      :subtitle="subtitle"
      :crumbs="[{ label: 'Eventos' }]"
    >
      <template #actions>
        <div class="a-viewswitch">
          <button
            type="button"
            :class="{ 'a-viewswitch--on': view === 'calendar' }"
            @click="view = 'calendar'"
          >
            <i class="fas fa-calendar-alt" /> Calendario
          </button>
          <button
            type="button"
            :class="{ 'a-viewswitch--on': view === 'list' }"
            @click="view = 'list'"
          >
            <i class="fas fa-list" /> Lista
          </button>
        </div>
        <NuxtLink to="/admin/events/new" class="a-btn a-btn--primary">
          <i class="fas fa-plus" /> Nuevo evento
        </NuxtLink>
      </template>
    </AdminPageHeader>

    <div v-if="error" class="a-alert a-alert--error" style="margin-bottom: 16px;">
      <i class="fas fa-exclamation-triangle" />
      <span>No se pudieron cargar los eventos.</span>
      <button type="button" class="a-btn a-btn--ghost a-btn--sm" @click="refresh()">Reintentar</button>
    </div>

    <div v-if="pending" class="a-card">
      <div class="a-card__body">
        <div class="a-skeleton" style="height: 340px;" />
      </div>
    </div>

    <AdminEventsCalendar v-else-if="view === 'calendar'" :events="events" @delete="onDelete" />

    <AdminDataTable
      v-else
      :items="visible"
      :columns="columns"
      :total-count="events.length"
      :search-keys="['title', 'location', 'subtitle']"
      search-placeholder="Buscar por título o ubicación…"
      empty-title="No hay eventos"
      empty-text="Programa el primer encuentro para que aparezca en el calendario del sitio."
      empty-icon="fas fa-calendar-alt"
      default-sort="eventDate"
      default-sort-dir="desc"
    >
      <template #filters>
        <select v-model="timeFilter" class="a-select" style="width: auto;">
          <option value="upcoming">Próximos</option>
          <option value="past">Pasados</option>
          <option value="">Todos</option>
        </select>

        <select v-model="typeFilter" class="a-select" style="width: auto;">
          <option value="">Todos los tipos</option>
          <option v-for="type in EVENT_TYPES" :key="type.value" :value="type.value">{{ type.label }}</option>
        </select>
      </template>

      <template #cell-title="{ item }">
        <div class="a-cellstack">
          <img
            :src="item.logo || getEventTypeLogo(item.type)"
            :alt="item.title"
            style="width: 34px; height: 34px; object-fit: contain; flex-shrink: 0;"
          >
          <span class="a-cellstack__text">
            <strong>{{ item.title }}</strong>
            <span>{{ item.subtitle || getEventTypeLabel(item.type) }}</span>
          </span>
        </div>
      </template>

      <template #cell-eventDate="{ value }">
        <div class="a-inline" style="gap: 6px;">
          <span class="a-nowrap">{{ formatDate(value) }}</span>
          <span class="a-badge" :class="badgeFor(value).kind">{{ badgeFor(value).label }}</span>
        </div>
      </template>

      <template #cell-location="{ value }">
        <span v-if="value"><i class="fas fa-map-marker-alt a-muted" /> {{ value }}</span>
        <span v-else class="a-muted">Sin ubicación</span>
      </template>

      <template #actions="{ item }">
        <NuxtLink :to="`/admin/events/${item.id}`" class="a-btn a-btn--ghost a-btn--sm">
          <i class="fas fa-edit" /> Editar
        </NuxtLink>
        <button
          type="button"
          class="a-btn a-btn--danger-ghost a-btn--sm"
          title="Borrar"
          :disabled="busyId === item.id"
          @click="onDelete(item)"
        >
          <i class="fas fa-trash-alt" />
        </button>
      </template>

      <template #empty-action>
        <NuxtLink to="/admin/events/new" class="a-btn a-btn--primary">
          <i class="fas fa-plus" /> Nuevo evento
        </NuxtLink>
      </template>
    </AdminDataTable>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminDataTable from '~/components/Admin/AdminDataTable.vue'
import AdminEventsCalendar from '~/components/Admin/AdminEventsCalendar.vue'
import AdminPageHeader from '~/components/Admin/AdminPageHeader.vue'
import { EVENT_TYPES, getEventTypeLabel, getEventTypeLogo } from '~/utils/eventTypes'
import { daysUntil, formatDate, toDateInput } from '~/utils/format'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useHead({ title: 'Eventos · Panel Magiancestral' })

const api = useAdminApi()
const toast = useAdminToast()
const { confirm } = useAdminConfirm()

const columns = [
  { key: 'title', label: 'Encuentro' },
  { key: 'eventDate', label: 'Fecha', width: '210px' },
  { key: 'location', label: 'Ubicación' }
]

const { data, pending, error, refresh } = await useAsyncData(
  'admin-events',
  () => api.get('/api/admin/events'),
  { default: () => [] }
)

const events = computed(() => data.value || [])
const busyId = ref(null)
const view = ref('calendar')
const timeFilter = ref('upcoming')
const typeFilter = ref('')

const today = toDateInput()

const upcomingCount = computed(() => events.value.filter(e => String(e.eventDate).slice(0, 10) >= today).length)

const subtitle = computed(() => {
  if (pending.value) return 'Cargando…'
  const total = events.value.length
  return `${upcomingCount.value} ${upcomingCount.value === 1 ? 'encuentro próximo' : 'encuentros próximos'} · ${total} en total`
})

const visible = computed(() => events.value.filter((item) => {
  const date = String(item.eventDate).slice(0, 10)
  if (timeFilter.value === 'upcoming' && date < today) return false
  if (timeFilter.value === 'past' && date >= today) return false
  if (typeFilter.value && item.type !== typeFilter.value) return false
  return true
}))

const badgeFor = (date) => {
  const days = daysUntil(date)
  if (days == null) return { kind: 'a-badge--neutral', label: '—' }
  if (days < 0) return { kind: 'a-badge--neutral', label: 'Pasado' }
  if (days === 0) return { kind: 'a-badge--warn', label: 'Hoy' }
  if (days === 1) return { kind: 'a-badge--warn', label: 'Mañana' }
  if (days <= 7) return { kind: 'a-badge--warn', label: `En ${days} días` }
  return { kind: 'a-badge--ok', label: `En ${days} días` }
}

const onDelete = async (item) => {
  const ok = await confirm({
    title: 'Borrar evento',
    message: `¿Seguro que quieres borrar “${item.title}”?`,
    detail: `Programado para el ${formatDate(item.eventDate, 'long')}. Esta acción no se puede deshacer.`,
    confirmLabel: 'Borrar',
    danger: true
  })
  if (!ok) return

  busyId.value = item.id
  try {
    await api.del(`/api/admin/events/${item.id}`)
    toast.success('Evento borrado')
    await refresh()
  } catch (err) {
    toast.error(adminErrorMessage(err, 'No se pudo borrar el evento'))
  } finally {
    busyId.value = null
  }
}
</script>

<style scoped>
.a-viewswitch {
  display: inline-flex;
  border: 1px solid var(--a-border-strong);
  border-radius: var(--a-radius-sm);
  overflow: hidden;
  background: #fff;
}

.a-viewswitch button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 13px;
  border: none;
  background: transparent;
  color: var(--a-text-soft);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}

.a-viewswitch button + button {
  border-left: 1px solid var(--a-border);
}

.a-viewswitch button:hover {
  background: var(--a-surface-alt);
  color: var(--a-text);
}

.a-viewswitch--on,
.a-viewswitch--on:hover {
  background: var(--a-accent) !important;
  color: #fff !important;
}
</style>
