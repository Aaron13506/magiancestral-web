<template>
  <section class="taumaturgia-section">
    <div class="container">
      <!-- Título principal -->
      <div class="row">
        <div class="col-xl-12">
          <div class="main-title text-center mb-5">
            <h1>TAUMATURGIA (EVENTOS MÁGICOS)</h1>
          </div>
        </div>
      </div>

      <!-- Sección PRESAGIO -->
      <div class="presagio-section">
        <div class="row">
          <div class="col-xl-12">
            <div class="presagio-title text-center mb-4">
              <h2>PRESAGIO</h2>
              <div class="title-ornament">✦</div>
            </div>
          </div>
        </div>

        <!-- Calendario 2 columnas -->
        <div class="row calendar-layout">
          <!-- Columna izquierda: Calendario -->
          <div class="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <div class="calendar-container">
              <div class="calendar-header">
                <button class="cal-nav-btn" @click="prevMonth">◂</button>
                <h3>{{ monthNames[currentMonth] }} {{ currentYear }}</h3>
                <button class="cal-nav-btn" @click="nextMonth">▸</button>
              </div>
              <div class="calendar-grid">
                <div v-for="day in daysOfWeek" :key="day" class="calendar-day-header">{{ day }}</div>
                <div
                  v-for="(cell, index) in calendarDays"
                  :key="index"
                  class="calendar-day"
                  :class="{
                    'empty': cell.isEmpty,
                    'has-event': cell.event,
                    'is-selected': cell.event && selectedEvent && cell.event.id === selectedEvent.id,
                    'is-today': cell.isToday
                  }"
                  @click="cell.event && selectEvent(cell.event)"
                >
                  <template v-if="!cell.isEmpty">
                    <span class="day-number">{{ cell.day }}</span>
                    <img
                      v-if="cell.event"
                      :src="cell.event.logo"
                      :alt="cell.event.title"
                      class="day-event-logo"
                    >
                  </template>
                </div>
              </div>
            </div>
          </div>

          <!-- Columna derecha: Panel de información -->
          <div class="col-lg-6 col-md-12">
            <div class="event-panel">
              <!-- Vista detalle de evento seleccionado -->
              <div v-if="selectedEvent" class="event-detail">
                <button class="back-btn" @click="selectedEvent = null">← Volver a la lista</button>
                <div class="event-detail-header">
                  <img :src="selectedEvent.logo" :alt="selectedEvent.title" class="event-detail-logo">
                  <div>
                    <h3>{{ selectedEvent.title }}</h3>
                    <h4>{{ selectedEvent.subtitle }}</h4>
                  </div>
                </div>
                <div class="event-detail-meta">
                  <span class="meta-item">📍 {{ selectedEvent.location }}</span>
                  <span class="meta-item">📅 {{ formatEventDate(selectedEvent.date) }}</span>
                </div>
                <div class="event-detail-description">
                  <p>{{ selectedEvent.description }}</p>
                </div>
                <button class="see-more-btn" @click="goToServiceDetail(selectedEvent.type)">
                  Ver más sobre este evento →
                </button>
              </div>

              <!-- Vista vacía - invitar a seleccionar -->
              <div v-else class="event-empty">
                <div v-if="monthEvents.length === 0" class="no-events">
                  <div class="empty-ornament">✦</div>
                  <p>No hay eventos programados para {{ monthNames[currentMonth] }}.</p>
                </div>
                <template v-else>
                  <div class="empty-invite">
                    <div class="empty-ornament">✦</div>
                    <p class="empty-hint">Selecciona un día marcado en el calendario para ver los detalles del evento.</p>
                    <span class="month-count-badge">{{ monthEvents.length }} evento{{ monthEvents.length > 1 ? 's' : '' }} en {{ monthNames[currentMonth] }}</span>
                  </div>
                  <div class="event-badge-list">
                    <div
                      v-for="event in monthEvents"
                      :key="event.id"
                      class="event-badge"
                      @click="selectEvent(event)"
                    >
                      <img :src="event.logo" :alt="event.title" class="badge-logo">
                      <div class="badge-content">
                        <span class="badge-date">{{ formatEventDateShort(event.date) }}</span>
                        <span class="badge-title">{{ event.title }}</span>
                      </div>
                      <span class="badge-arrow">›</span>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sección Encuentros ceremoniales y rituales -->
      <div class="encuentros-section mt-5">
        <div class="row">
          <div class="col-xl-12">
            <div class="section-title text-center mb-5">
              <h2>Encuentros ceremoniales y rituales</h2>
              <p class="subtitle">Selecciona un encuentro para conocer sus detalles ☺</p>
            </div>
          </div>
        </div>

        <!-- Selector grid -->
        <div class="service-selector-grid">
          <div
            v-for="service in services"
            :key="service.id"
            class="service-tile"
            :class="{ 'is-active': selectedService && selectedService.id === service.id }"
            @click="toggleService(service)"
          >
            <img :src="service.logo" :alt="service.title" class="tile-logo">
            <span class="tile-title">{{ service.title }}</span>
            <span class="tile-chevron">{{ selectedService && selectedService.id === service.id ? '▲' : '▼' }}</span>
          </div>
        </div>

        <!-- Detail panel -->
        <div class="service-detail-panel" :class="{ 'is-open': selectedService }">
          <template v-if="selectedService">
            <div class="service-detail-inner">
              <div class="service-detail-header">
                <img :src="selectedService.logo" :alt="selectedService.title" class="detail-logo">
                <h3>{{ selectedService.title }}</h3>
              </div>

              <!-- Fungi has sub-variants -->
              <div v-if="selectedService.variants" class="fungi-variants-grid">
                <div v-for="v in selectedService.variants" :key="v.name" class="variant-item" :class="{ 'variant-item-centered': v.centered }">
                  <h4>{{ v.name }}</h4>
                  <p>{{ v.description }}</p>
                </div>
              </div>
              <p v-else class="detail-description">{{ selectedService.description }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]
const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

const now = new Date()
const currentMonth = ref(now.getMonth())
const currentYear = ref(now.getFullYear())
const selectedEvent = ref(null)

const { data: rawEvents } = await useAsyncData('events', () => $fetch('/api/events'))
const events = computed(() => (rawEvents.value || []).map(e => ({
  id: e.slug,
  date: new Date(`${e.eventDate.slice(0, 10)}T00:00:00`),
  title: e.title,
  subtitle: e.subtitle,
  location: e.location,
  type: e.type,
  logo: e.logo,
  description: e.description
})))

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const today = new Date()
  const cells = []

  for (let i = 0; i < firstDay; i++) {
    cells.push({ isEmpty: true })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const event = events.value.find(e =>
      e.date.getDate() === day &&
      e.date.getMonth() === currentMonth.value &&
      e.date.getFullYear() === currentYear.value
    )
    const isToday =
      day === today.getDate() &&
      currentMonth.value === today.getMonth() &&
      currentYear.value === today.getFullYear()

    cells.push({ day, event: event || null, isEmpty: false, isToday })
  }

  return cells
})

const monthEvents = computed(() => {
  return events.value
    .filter(e =>
      e.date.getMonth() === currentMonth.value &&
      e.date.getFullYear() === currentYear.value
    )
    .sort((a, b) => a.date - b.date)
})

function prevMonth() {
  selectedEvent.value = null
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  selectedEvent.value = null
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function selectEvent(event) {
  selectedEvent.value = event
  // Navigate calendar to the event's month
  currentMonth.value = event.date.getMonth()
  currentYear.value = event.date.getFullYear()
}

function formatEventDate(date) {
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  return `${day} de ${month}, ${year}`
}

function formatEventDateShort(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = monthNames[date.getMonth()].substring(0, 3)
  return `${day} ${month}`
}

const selectedService = ref(null)

const services = [
  {
    id: 'fungi',
    title: 'MEDICINA DEL REINO FUNGI',
    logo: '/assets/images/Servicios/Reino_fungi.png',
    variants: [
      {
        name: '"ENCANTAMIENTO"',
        description: 'Encuentro Ritual de conexión con las energías elementales y las fuerzas naturales, con la ingesta de una dosis ritual de setas psilocibicas deshidratadas, rezos de intención, rueda medicinal, oráculos, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial. Finaliza con círculo de palabra y de acompañamiento terapéutico.'
      },
      {
        name: '"HECHIZO"',
        description: 'Encuentro Ritual con la ingesta de una dosis ritual profunda de setas psilocibicas deshidratadas, rezos de intención, rueda medicinal, oráculos, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial. Finaliza con círculo de palabra y de acompañamiento terapéutico.'
      },
      {
        name: '"CONJURO"',
        description: 'Encuentro Ritual exclusivo para estudiosos de esta medicina, con la ingesta de una dosis ritual super profunda de setas psilocibicas deshidratadas, rezos de intención, rueda medicinal, oráculos, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial. Finaliza con círculo de palabra y de acompañamiento terapéutico.'
      },
      {
        name: 'RESONANCIA MÁGICA MEDITATIVA',
        description: 'Círculo de meditación con la ingesta de una dosis meditativa/sensorial de setas psilocibicas deshidratadas, acompañado de sonidos vibratorios orgánicos y música meditativa en vivo, para el despertar sensorial del propio ser. (Duración: 4 horas).'
      },
      {
        name: 'RESONANCIA MÁGICA MUSICAL',
        centered: true,
        description: 'Círculo medicinal contemplativo con música de medicina y la ingesta de una dosis meditativa/sensorial de setas psilocibicas, para despertar la creatividad, la armonía interna, la alegría y la expresión del ser a través de la danza, la pintura, la escritura y la participación musical. (Duración: 5 horas).'
      }
    ]
  },
  {
    id: 'ayahuasca',
    title: 'MEDICINA ANCESTRAL DE LA SELVA',
    logo: '/assets/images/Servicios/YageAyahuasca.png',
    description: 'Encuentro chamánico grupal con la ingesta de esta Planta de Poder, que emplea la energía ancestral y la conexión con las fuerzas elementales, acompañado de rezos, rueda medicinal, armonización energética, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial. Finaliza con círculo de palabra y de acompañamiento terapéutico.'
  },
  {
    id: 'teramai',
    title: 'TERAMAI – SEICHEM',
    logo: '/assets/images/Servicios/Teramai_Senchen.png',
    description: 'Formación grupal y proceso iniciático de canalización energética de los rayos de sanación de la Tierra, el Agua, el Aire y el Fuego. Manejo de la energía angelical, la sanación con colores, la armonía vibracional, la danza chamánica y el canto curativo. Formación en 6 Niveles: 2 de Reiki Teramai-Seichem, 3 de Magia Teramai-Seichem y Maestría.'
  },
  {
    id: 'abracadabra',
    title: 'ABRA CADABRA',
    logo: '/assets/images/Servicios/Abra_Cadabra.png',
    description: 'Compartir grupal y de aprendizaje a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora en los procesos individuales, así como el incremento de la comunicación amorosa. (Duración: 2 horas).'
  },
  {
    id: 'velada',
    title: 'VELADA MUSICAL',
    logo: '/assets/images/Servicios/Velada_Musical.png',
    description: 'Recital de Música de Medicina con la participación de varios músicos invitados, a través del cual se genera un espacio de esparcimiento que emplea la música como medio de conciencia. Una velada nocturna para conectar con la sanación a través del sonido y la vibración. (Duración: 4 horas).'
  },
  {
    id: 'magicsadan',
    title: 'MAGICSADAN',
    logo: '/assets/images/Servicios/MagicSaDan.png',
    description: 'Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos que combina danza sagrada y rituales de poder. Herramienta de autoconocimiento para regular el bienestar, disminuir el cortisol y conectar con la biología, la esencia y la sacralidad del ser. (Duración: 3 horas).'
  }
]

function toggleService(service) {
  selectedService.value = selectedService.value?.id === service.id ? null : service
}

const eventTypeServiceMap = {
  fungi: 'fungi',
  ayahuasca: 'yage',
  teramai: 'teramai',
  abracadabra: 'abra',
  velada: 'sesiones',
  magicsadan: 'magicsadan'
}

function goToServiceDetail(type) {
  const serviceKey = eventTypeServiceMap[type]
  if (!serviceKey) return
  navigateTo(`/service-detail?service=${serviceKey}`)
}
</script>

<style scoped>
.taumaturgia-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #0a2e1f 0%, #114736 50%, #0a2e1f 100%);
  min-height: 100vh;
}

.main-title h1 {
  font-family: 'Fraunces', serif;
  font-size: 3.5rem;
  color: var(--thm-base, #b3a85a);
  font-weight: 700;
  margin-bottom: 40px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
}

/* PRESAGIO Section */
.presagio-section {
  background: rgba(10, 46, 31, 0.6);
  padding: 50px 40px;
  border-radius: 20px;
  border: 1px solid rgba(179, 168, 90, 0.2);
  margin-bottom: 60px;
  backdrop-filter: blur(10px);
}

.presagio-title h2 {
  font-family: 'Fraunces', serif;
  font-size: 2.8rem;
  color: var(--thm-base, #b3a85a);
  font-weight: 700;
  margin-bottom: 5px;
  letter-spacing: 3px;
}

.title-ornament {
  color: var(--thm-base, #b3a85a);
  font-size: 1.5rem;
  opacity: 0.7;
}

/* Calendar Container */
.calendar-container {
  background: rgba(17, 71, 54, 0.5);
  border: 1px solid rgba(179, 168, 90, 0.3);
  border-radius: 16px;
  padding: 25px;
  height: 100%;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-header h3 {
  font-family: 'Fraunces', serif;
  font-size: 1.6rem;
  color: var(--thm-base, #b3a85a);
  font-weight: 600;
  margin: 0;
}

.cal-nav-btn {
  background: rgba(179, 168, 90, 0.15);
  color: var(--thm-base, #b3a85a);
  border: 1px solid rgba(179, 168, 90, 0.3);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.cal-nav-btn:hover {
  background: var(--thm-base, #b3a85a);
  color: var(--thm-secondary, #114736);
}

/* Calendar Grid */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day-header {
  padding: 8px 4px;
  text-align: center;
  font-weight: 600;
  color: var(--thm-base, #b3a85a);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
}

.calendar-day {
  aspect-ratio: 1;
  position: relative;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  cursor: default;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid transparent;
  overflow: hidden;
  padding: 2px;
}

.calendar-day.empty {
  background: transparent;
  border: none;
}

.calendar-day.is-today:not(.has-event) {
  border-color: rgba(125, 160, 82, 0.5);
  background: rgba(125, 160, 82, 0.1);
}

.day-number {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  z-index: 1;
  line-height: 1;
}

.calendar-day.is-today .day-number {
  color: var(--thm-accent, #7da052);
  font-weight: 700;
}

/* Days with events */
.calendar-day.has-event {
  border: 1px solid rgba(179, 168, 90, 0.5);
  background: rgba(12, 119, 55, 0.15);
  cursor: pointer;
}

.calendar-day.has-event:hover {
  border-color: var(--thm-base, #b3a85a);
  background: rgba(179, 168, 90, 0.15);
  transform: scale(1.05);
  z-index: 2;
}

.calendar-day.has-event .day-number {
  color: var(--thm-base, #b3a85a);
  font-weight: 700;
  font-size: 0.75rem;
  position: absolute;
  top: 2px;
  left: 4px;
}

.day-event-logo {
  width: 55%;
  max-width: 32px;
  height: auto;
  object-fit: contain;
  opacity: 0.85;
  filter: brightness(1.1);
  margin-top: 4px;
}

.calendar-day.has-event:hover .day-event-logo {
  opacity: 1;
  transform: scale(1.1);
  transition: all 0.25s ease;
}

/* Selected day */
.calendar-day.is-selected {
  background: var(--thm-base, #b3a85a) !important;
  border-color: var(--thm-base, #b3a85a) !important;
}

.calendar-day.is-selected .day-number {
  color: var(--thm-secondary, #114736) !important;
}

.calendar-day.is-selected .day-event-logo {
  filter: brightness(0.3);
  opacity: 1;
}

/* Event Panel */
.event-panel {
  background: rgba(17, 71, 54, 0.4);
  border: 1px solid rgba(179, 168, 90, 0.25);
  border-radius: 16px;
  padding: 30px;
  height: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.event-empty {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  min-height: 0;
}

.event-badge-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  padding-right: 4px;
}

.event-badge-list::-webkit-scrollbar {
  width: 4px;
}

.event-badge-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
}

.event-badge-list::-webkit-scrollbar-thumb {
  background: rgba(179, 168, 90, 0.3);
  border-radius: 4px;
}

/* Empty / invite state */

.empty-invite {
  text-align: center;
  padding: 30px 20px 10px;
}

.empty-ornament {
  color: var(--thm-base, #b3a85a);
  font-size: 2rem;
  opacity: 0.4;
  margin-bottom: 14px;
}

.empty-hint {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 16px;
}

.month-count-badge {
  display: inline-block;
  background: rgba(179, 168, 90, 0.12);
  border: 1px solid rgba(179, 168, 90, 0.3);
  color: var(--thm-base, #b3a85a);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 20px;
}

.event-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(179, 168, 90, 0.1);
  cursor: pointer;
  transition: all 0.25s ease;
}

.event-badge:hover {
  background: rgba(179, 168, 90, 0.1);
  border-color: rgba(179, 168, 90, 0.35);
  transform: translateX(4px);
}

.badge-logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
  flex-shrink: 0;
  filter: brightness(1.1);
}

.badge-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.badge-date {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.badge-title {
  font-family: 'Fraunces', serif;
  font-size: 0.95rem;
  color: var(--thm-base, #b3a85a);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge-arrow {
  color: var(--thm-base, #b3a85a);
  font-size: 1.4rem;
  opacity: 0.35;
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.event-badge:hover .badge-arrow {
  opacity: 1;
}

.no-events {
  text-align: center;
  padding: 40px 20px;
}

.no-events p {
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;
}

/* Event Detail */
.event-detail {
  animation: fadeSlideIn 0.3s ease;
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateX(10px); }
  to { opacity: 1; transform: translateX(0); }
}

.back-btn {
  background: none;
  border: 1px solid rgba(179, 168, 90, 0.3);
  color: var(--thm-base, #b3a85a);
  font-size: 0.85rem;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 20px;
  transition: all 0.2s;
}

.back-btn:hover {
  background: rgba(179, 168, 90, 0.15);
  border-color: var(--thm-base, #b3a85a);
}

.event-detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.event-detail-logo {
  width: 70px;
  height: 70px;
  object-fit: contain;
  flex-shrink: 0;
  filter: brightness(1.1);
}

.event-detail-header h3 {
  font-family: 'Fraunces', serif;
  font-size: 1.6rem;
  color: var(--thm-base, #b3a85a);
  font-weight: 700;
  margin: 0 0 4px 0;
  line-height: 1.2;
}

.event-detail-header h4 {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  margin: 0;
  line-height: 1.3;
}

.event-detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 25px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  border: 1px solid rgba(179, 168, 90, 0.1);
}

.meta-item {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.event-detail-description p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  font-size: 0.95rem;
}

.see-more-btn {
  margin-top: 20px;
  background: rgba(179, 168, 90, 0.1);
  border: 1px solid rgba(179, 168, 90, 0.4);
  color: var(--thm-base, #b3a85a);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 25px;
  letter-spacing: 0.5px;
  width: 100%;
  transition: all 0.25s ease;
}

.see-more-btn:hover {
  background: rgba(179, 168, 90, 0.2);
  border-color: var(--thm-base, #b3a85a);
  transform: translateY(-2px);
}


/* Encuentros Section */
.encuentros-section {
  background: rgba(10, 46, 31, 0.6);
  padding: 60px 40px;
  border-radius: 20px;
  border: 1px solid rgba(179, 168, 90, 0.2);
  backdrop-filter: blur(10px);
}

.section-title h2 {
  font-family: 'Fraunces', serif;
  font-size: 2.5rem;
  color: var(--thm-base, #b3a85a);
  font-weight: 700;
  margin-bottom: 15px;
}

.section-title .subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0;
}

/* Service selector grid */
.service-selector-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 0;
}

.service-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 22px 16px 16px;
  background: rgba(17, 71, 54, 0.5);
  border: 1px solid rgba(179, 168, 90, 0.15);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;
  position: relative;
}

.service-tile:hover {
  border-color: rgba(179, 168, 90, 0.45);
  background: rgba(179, 168, 90, 0.08);
  transform: translateY(-3px);
}

.service-tile.is-active {
  border-color: var(--thm-base, #b3a85a);
  background: rgba(179, 168, 90, 0.12);
  transform: translateY(0);
}

.tile-logo {
  width: 54px;
  height: 54px;
  object-fit: contain;
  filter: brightness(1.1);
  transition: transform 0.25s ease;
}

.service-tile:hover .tile-logo,
.service-tile.is-active .tile-logo {
  transform: scale(1.1);
}

.tile-title {
  font-family: 'Fraunces', serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--thm-base, #b3a85a);
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.tile-chevron {
  font-size: 0.65rem;
  color: rgba(179, 168, 90, 0.5);
  margin-top: -4px;
}

.service-tile.is-active .tile-chevron {
  color: var(--thm-base, #b3a85a);
}

/* Service detail panel */
.service-detail-panel {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s ease;
  opacity: 0;
  margin-top: 0;
}

.service-detail-panel.is-open {
  max-height: 800px;
  opacity: 1;
  margin-top: 20px;
}

.service-detail-inner {
  background: rgba(17, 71, 54, 0.55);
  border: 1px solid rgba(179, 168, 90, 0.25);
  border-radius: 16px;
  padding: 35px 40px;
}

.service-detail-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.detail-logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
  filter: brightness(1.1);
  flex-shrink: 0;
}

.service-detail-header h3 {
  font-family: 'Fraunces', serif;
  font-size: 1.6rem;
  color: var(--thm-base, #b3a85a);
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.detail-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  font-size: 0.95rem;
  margin: 0;
}

/* Fungi variants inside detail panel */
.fungi-variants-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.variant-item {
  padding: 18px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  border: 1px solid rgba(179, 168, 90, 0.1);
  border-left: 4px solid var(--thm-base, #b3a85a);
  text-align: left;
}

.variant-item h4 {
  color: var(--thm-base, #b3a85a);
  font-family: 'Fraunces', serif;
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.variant-item p {
  margin-bottom: 0;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
}

.variant-item-centered {
  grid-column: 1 / -1;
  max-width: 600px;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 991px) {
  .event-panel {
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .main-title h1 {
    font-size: 2.2rem;
  }

  .presagio-title h2 {
    font-size: 2rem;
  }

  .presagio-section,
  .encuentros-section {
    padding: 30px 20px;
  }

  .calendar-container {
    padding: 15px;
  }

  .calendar-header h3 {
    font-size: 1.3rem;
  }

  .day-number {
    font-size: 0.7rem;
  }

  .calendar-day.has-event .day-number {
    font-size: 0.65rem;
  }

  .day-event-logo {
    max-width: 22px;
  }

  .event-panel {
    padding: 20px;
  }

  .fungi-variants-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .service-selector-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .service-detail-inner {
    padding: 25px 20px;
  }

  .service-detail-header {
    flex-direction: column;
    text-align: center;
  }

  .event-detail-header {
    flex-direction: column;
    text-align: center;
  }

  .event-detail-meta {
    flex-direction: column;
    gap: 10px;
  }

  .section-title h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .main-title h1 {
    font-size: 1.8rem;
  }

  .calendar-grid {
    gap: 2px;
  }

  .calendar-day-header {
    font-size: 0.65rem;
    padding: 6px 2px;
  }

  .day-number {
    font-size: 0.6rem;
  }

  .calendar-day.has-event .day-number {
    font-size: 0.55rem;
    top: 1px;
    left: 2px;
  }

  .day-event-logo {
    max-width: 16px;
    margin-top: 2px;
  }

  .cal-nav-btn {
    width: 32px;
    height: 32px;
    font-size: 1.1rem;
  }

}
</style>
