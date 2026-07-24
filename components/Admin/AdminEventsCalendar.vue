<template>
  <div class="admin-calendar">
    <div class="admin-calendar-grid-wrap">
      <div class="admin-calendar-header">
        <button type="button" class="cal-nav-btn" @click="prevMonth">‹</button>
        <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
        <button type="button" class="cal-nav-btn" @click="nextMonth">›</button>
      </div>

      <div class="admin-calendar-grid">
        <div v-for="day in daysOfWeek" :key="day" class="admin-calendar-day-header">{{ day }}</div>
        <div
          v-for="(cell, index) in calendarCells"
          :key="index"
          class="admin-calendar-day"
          :class="{ empty: cell.isEmpty, 'has-events': cell.events?.length, selected: cell.dateKey && cell.dateKey === selectedDateKey, today: cell.isToday }"
          @click="cell.dateKey && selectDay(cell.dateKey)"
        >
          <template v-if="!cell.isEmpty">
            <span class="day-number">{{ cell.day }}</span>
            <div v-if="cell.events?.length" class="day-event-logos">
              <img
                v-for="ev in cell.events.slice(0, 3)"
                :key="ev.id"
                :src="ev.logo || getEventTypeLogo(ev.type)"
                :alt="ev.title"
                class="day-event-logo"
              >
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="admin-calendar-panel">
      <div class="admin-calendar-panel-header">
        <h3>{{ selectedDateLabel }}</h3>
        <NuxtLink :to="newEventLink" class="btn btn-sm btn-primary">+ Nuevo evento</NuxtLink>
      </div>

      <p v-if="selectedDayEvents.length === 0" class="admin-calendar-empty">
        No hay eventos este día.
      </p>

      <ul v-else class="admin-calendar-event-list">
        <li v-for="ev in selectedDayEvents" :key="ev.id" class="admin-calendar-event-item">
          <img :src="ev.logo || getEventTypeLogo(ev.type)" :alt="ev.title" class="event-item-logo">
          <div class="event-item-body">
            <strong>{{ ev.title }}</strong>
            <span class="event-item-meta">{{ getEventTypeLabel(ev.type) }} · {{ ev.location || 'Sin ubicación' }}</span>
          </div>
          <div class="event-item-actions">
            <NuxtLink :to="`/admin/events/${ev.id}`" class="btn btn-sm btn-outline-secondary">Editar</NuxtLink>
            <button type="button" class="btn btn-sm btn-danger" @click="$emit('delete', ev)">Borrar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getEventTypeLabel, getEventTypeLogo } from '~/utils/eventTypes'

const props = defineProps({
  events: { type: Array, default: () => [] }
})

defineEmits(['delete'])

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]
const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const now = new Date()
const currentMonth = ref(now.getMonth())
const currentYear = ref(now.getFullYear())

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

const todayKey = dateKey(now.getFullYear(), now.getMonth(), now.getDate())
const selectedDateKey = ref(todayKey)

const eventsByDay = computed(() => {
  const map = {}
  for (const ev of props.events) {
    if (!ev.eventDate) continue
    const key = ev.eventDate.slice(0, 10)
    if (!map[key]) map[key] = []
    map[key].push(ev)
  }
  return map
})

const calendarCells = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const cells = []

  for (let i = 0; i < firstDay; i++) {
    cells.push({ isEmpty: true })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const key = dateKey(currentYear.value, currentMonth.value, day)
    cells.push({
      day,
      dateKey: key,
      isEmpty: false,
      isToday: key === todayKey,
      events: eventsByDay.value[key] || []
    })
  }

  return cells
})

const selectedDayEvents = computed(() => eventsByDay.value[selectedDateKey.value] || [])

const selectedDateLabel = computed(() => {
  if (!selectedDateKey.value) return 'Selecciona un día'
  const [year, month, day] = selectedDateKey.value.split('-').map(Number)
  return `${day} de ${monthNames[month - 1]}, ${year}`
})

const newEventLink = computed(() => `/admin/events/new?date=${selectedDateKey.value || todayKey}`)

function selectDay(key) {
  selectedDateKey.value = key
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}
</script>

<style scoped>
.admin-calendar {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 20px;
  align-items: start;
}

.admin-calendar-grid-wrap,
.admin-calendar-panel {
  background: #fff;
  border-radius: 6px;
  padding: 20px;
}

.admin-calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.admin-calendar-header h2 {
  font-size: 1.2rem;
  margin: 0;
  text-transform: capitalize;
}

.cal-nav-btn {
  background: #f0f0f0;
  border: 1px solid #ddd;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
}

.cal-nav-btn:hover {
  background: #e2e2e2;
}

.admin-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.admin-calendar-day-header {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  padding: 6px 0;
}

.admin-calendar-day {
  aspect-ratio: 1;
  border-radius: 6px;
  border: 1px solid transparent;
  padding: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #f7f7f7;
}

.admin-calendar-day.empty {
  background: transparent;
}

.admin-calendar-day.today {
  border-color: #7da052;
}

.admin-calendar-day.has-events {
  cursor: pointer;
  background: #eef4e7;
  border-color: #cfe0bd;
}

.admin-calendar-day.has-events:hover {
  border-color: #7da052;
}

.admin-calendar-day.selected {
  background: #b3a85a;
  border-color: #b3a85a;
}

.admin-calendar-day.selected .day-number {
  color: #fff;
}

.day-number {
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
}

.day-event-logos {
  display: flex;
  gap: 2px;
  margin-top: 2px;
  flex-wrap: wrap;
  justify-content: center;
}

.day-event-logo {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.admin-calendar-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 15px;
}

.admin-calendar-panel-header h3 {
  margin: 0;
  font-size: 1.1rem;
  text-transform: capitalize;
}

.admin-calendar-empty {
  color: #888;
}

.admin-calendar-event-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.admin-calendar-event-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 6px;
}

.event-item-logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
  flex-shrink: 0;
}

.event-item-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.event-item-meta {
  font-size: 0.8rem;
  color: #888;
}

.event-item-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .admin-calendar {
    grid-template-columns: 1fr;
  }
}
</style>
