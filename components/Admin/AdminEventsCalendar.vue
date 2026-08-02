<template>
  <div class="a-calendar-layout">
    <!-- Rejilla del mes -->
    <div class="a-card">
      <div class="a-card__head">
        <div class="a-inline">
          <button type="button" class="a-btn a-btn--ghost a-btn--icon" aria-label="Mes anterior" @click="shiftMonth(-1)">
            <i class="fas fa-chevron-left" />
          </button>
          <h2 class="a-card__title" style="min-width: 165px; text-align: center;">
            {{ MONTHS[cursorMonth] }} {{ cursorYear }}
          </h2>
          <button type="button" class="a-btn a-btn--ghost a-btn--icon" aria-label="Mes siguiente" @click="shiftMonth(1)">
            <i class="fas fa-chevron-right" />
          </button>
        </div>
        <button type="button" class="a-btn a-btn--subtle a-btn--sm" @click="goToday">Hoy</button>
      </div>

      <div class="a-card__body">
        <div class="a-cal">
          <div v-for="day in WEEKDAYS" :key="day" class="a-cal__dow">{{ day }}</div>
          <button
            v-for="(cell, index) in cells"
            :key="index"
            type="button"
            class="a-cal__day"
            :class="{
              'a-cal__day--muted': !cell.dateKey,
              'a-cal__day--events': cell.events.length > 0,
              'a-cal__day--today': cell.isToday,
              'a-cal__day--selected': cell.dateKey === selectedKey
            }"
            :tabindex="cell.dateKey ? 0 : -1"
            :aria-label="cell.dateKey ? `${cell.day} — ${cell.events.length} eventos` : ''"
            @click="cell.dateKey && (selectedKey = cell.dateKey)"
          >
            <template v-if="cell.dateKey">
              <span class="a-cal__num">{{ cell.day }}</span>
              <span v-if="cell.events.length" class="a-cal__dots">
                <img
                  v-for="ev in cell.events.slice(0, 3)"
                  :key="ev.id"
                  :src="ev.logo || getEventTypeLogo(ev.type)"
                  :alt="ev.title"
                  class="a-cal__dot"
                >
              </span>
              <span v-if="cell.events.length > 3" class="a-cal__more">+{{ cell.events.length - 3 }}</span>
            </template>
          </button>
        </div>
      </div>
    </div>

    <!-- Panel del día seleccionado -->
    <div class="a-card">
      <div class="a-card__head">
        <h2 class="a-card__title">{{ selectedLabel }}</h2>
        <NuxtLink :to="`/admin/events/new?date=${selectedKey}`" class="a-btn a-btn--primary a-btn--sm">
          <i class="fas fa-plus" /> Añadir
        </NuxtLink>
      </div>

      <div v-if="selectedEvents.length === 0" class="a-empty" style="padding: 40px 20px;">
        <div class="a-empty__icon"><i class="fas fa-calendar-day" /></div>
        <p class="a-empty__text" style="margin-bottom: 14px !important;">No hay encuentros este día.</p>
        <NuxtLink :to="`/admin/events/new?date=${selectedKey}`" class="a-btn a-btn--ghost a-btn--sm">
          Programar uno
        </NuxtLink>
      </div>

      <div v-for="ev in selectedEvents" v-else :key="ev.id" class="a-list__item">
        <img
          :src="ev.logo || getEventTypeLogo(ev.type)"
          :alt="ev.title"
          style="width: 38px; height: 38px; object-fit: contain; flex-shrink: 0;"
        >
        <span class="a-list__body">
          <strong>{{ ev.title }}</strong>
          <span>{{ ev.subtitle || getEventTypeLabel(ev.type) }}</span>
          <span v-if="ev.location" class="a-muted" style="display: block; font-size: 11.5px;">
            <i class="fas fa-map-marker-alt" /> {{ ev.location }}
          </span>
        </span>
        <span class="a-inline" style="gap: 5px; flex-shrink: 0;">
          <NuxtLink :to="`/admin/events/${ev.id}`" class="a-btn a-btn--ghost a-btn--sm">
            <i class="fas fa-edit" />
          </NuxtLink>
          <button type="button" class="a-btn a-btn--danger-ghost a-btn--sm" @click="$emit('delete', ev)">
            <i class="fas fa-trash-alt" />
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getEventTypeLabel, getEventTypeLogo } from '~/utils/eventTypes'
import { toDateInput } from '~/utils/format'

const props = defineProps({
  events: { type: Array, default: () => [] }
})

defineEmits(['delete'])

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]
// Semana de lunes a domingo, como se usa en español.
const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const todayKey = toDateInput()
const now = new Date()

const cursorMonth = ref(now.getMonth())
const cursorYear = ref(now.getFullYear())
const selectedKey = ref(todayKey)

const keyFor = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

const eventsByDay = computed(() => {
  const map = {}
  for (const ev of props.events) {
    if (!ev.eventDate) continue
    const key = String(ev.eventDate).slice(0, 10)
    ;(map[key] ||= []).push(ev)
  }
  return map
})

const cells = computed(() => {
  // `getDay()` devuelve 0 para domingo; lo desplazamos para que lunes sea 0.
  const firstWeekday = (new Date(cursorYear.value, cursorMonth.value, 1).getDay() + 6) % 7
  const daysInMonth = new Date(cursorYear.value, cursorMonth.value + 1, 0).getDate()
  const list = []

  for (let i = 0; i < firstWeekday; i++) list.push({ dateKey: null, events: [] })

  for (let day = 1; day <= daysInMonth; day++) {
    const key = keyFor(cursorYear.value, cursorMonth.value, day)
    list.push({
      day,
      dateKey: key,
      isToday: key === todayKey,
      events: eventsByDay.value[key] || []
    })
  }

  return list
})

const selectedEvents = computed(() => eventsByDay.value[selectedKey.value] || [])

const selectedLabel = computed(() => {
  const [year, month, day] = selectedKey.value.split('-').map(Number)
  if (selectedKey.value === todayKey) return `Hoy, ${day} de ${MONTHS[month - 1].toLowerCase()}`
  return `${day} de ${MONTHS[month - 1].toLowerCase()} de ${year}`
})

// Al saltar de mes, mantener seleccionado un día fuera de la vista despista;
// seleccionamos el día 1 del mes que se está mirando.
watch([cursorMonth, cursorYear], () => {
  const [year, month] = selectedKey.value.split('-').map(Number)
  if (year !== cursorYear.value || month - 1 !== cursorMonth.value) {
    selectedKey.value = keyFor(cursorYear.value, cursorMonth.value, 1)
  }
})

function shiftMonth(delta) {
  const next = new Date(cursorYear.value, cursorMonth.value + delta, 1)
  cursorMonth.value = next.getMonth()
  cursorYear.value = next.getFullYear()
}

function goToday() {
  cursorMonth.value = now.getMonth()
  cursorYear.value = now.getFullYear()
  selectedKey.value = todayKey
}

defineExpose({
  /** Coloca el calendario sobre una fecha concreta (`YYYY-MM-DD`). */
  focusDate: (key) => {
    if (!key) return
    const [year, month] = key.split('-').map(Number)
    cursorYear.value = year
    cursorMonth.value = month - 1
    selectedKey.value = key
  }
})
</script>

<style scoped>
.a-calendar-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 18px;
  align-items: start;
}

@media (max-width: 1000px) {
  .a-calendar-layout {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
