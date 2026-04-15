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
              </div>

              <!-- Vista lista de próximos eventos -->
              <div v-else class="event-list">
                <h3 class="panel-title">Eventos de {{ monthNames[currentMonth] }}</h3>
                <div v-if="monthEvents.length === 0" class="no-events">
                  <p>No hay eventos programados para {{ monthNames[currentMonth] }}.</p>
                </div>
                <div
                  v-for="event in monthEvents"
                  :key="event.id"
                  class="event-list-item"
                  @click="selectEvent(event)"
                >
                  <img :src="event.logo" :alt="event.title" class="event-list-logo">
                  <div class="event-list-info">
                    <span class="event-list-date">{{ formatEventDateShort(event.date) }}</span>
                    <span class="event-list-title">{{ event.title }}</span>
                    <span class="event-list-location">{{ event.location }}</span>
                  </div>
                  <span class="event-list-arrow">›</span>
                </div>
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
              <p class="subtitle">En este enlace describimos los eventos que organizamos, los cuales te especificamos a continuación ☺</p>
            </div>
          </div>
        </div>

        <!-- Evento Principal - Reino Fungi -->
        <div class="row mb-5">
          <div class="col-xl-12">
            <div class="evento-card evento-card-principal">
              <div class="evento-icon">
                <img src="/assets/images/Servicios/Reino_fungi.png" alt="Reino Fungi" class="emblema emblema-principal">
              </div>
              <h3>MEDICINA DEL REINO FUNGI</h3>

              <div class="fungi-variants-grid">
                <div class="variant-item">
                  <h4>"ENCANTAMIENTO"</h4>
                  <p>Encuentro Ritual de conexión con las energías elementales y las fuerzas naturales, con la ingesta de una dosis ritual de setas psilocibicas deshidratadas, rezos de intención, rueda medicinal, oráculos, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial, que constituye el altar principal. Finaliza con círculo de palabra y de acompañamiento terapéutico.</p>
                </div>

                <div class="variant-item">
                  <h4>"HECHIZO"</h4>
                  <p>Encuentro Ritual de conexión con las energías elementales y las fuerzas naturales, con la ingesta de una dosis ritual profunda de setas psilocibicas deshidratadas, rezos de intención, rueda medicinal, oráculos, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial, que constituye el altar principal. Finaliza con círculo de palabra y de acompañamiento terapéutico.</p>
                </div>

                <div class="variant-item">
                  <h4>"CONJURO"</h4>
                  <p>Encuentro Ritual exclusivo para estudiosos y caminantes de esta medicina, de conexión con las energías elementales y las fuerzas naturales, con la ingesta de una dosis ritual super profunda de setas psilocibicas deshidratadas, rezos de intención, rueda medicinal, oráculos, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial, que constituye el altar principal. Finaliza con círculo de palabra y de acompañamiento terapéutico.</p>
                </div>

                <div class="variant-item">
                  <h4>RESONANCIA MÁGICA MEDITATIVA</h4>
                  <p>Círculo de meditación, con la ingesta de una dosis meditativa/sensorial de setas psilocibicas deshidratadas, acompañado de sonidos vibratorios orgánicos y música meditativa en vivo, para el despertar sensorial del propio ser, induciendo a la calma y al encuentro consigo mismo, bien como un primer acercamiento a la Medicina del Reino Fungi, o para entrar en una meditación profunda, mientras se reciben los beneficios biológicos de esta medicina (Duración: 4 horas).</p>
                </div>

                <div class="variant-item variant-item-centered">
                  <h4>RESONANCIA MÁGICA MUSICAL</h4>
                  <p>Círculo medicinal contemplativo, acompañado de música de medicina, con la ingesta de una dosis meditativa/sensorial de setas psilocibicas deshidratadas, para desplegar estados favorables en el despertar de la creatividad, la armonía interna, la alegría y la expresión del ser a través de la danza, la pintura, la escritura y la participación musical, mientras se reciben los beneficios biológicos de esta medicina. (Duración: 5 horas).</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Eventos Secundarios -->
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-12 mb-4">
            <div class="evento-card evento-card-large">
              <div class="evento-icon">
                <img src="/assets/images/Servicios/YageAyahuasca.png" alt="Medicina Ancestral de la Selva" class="emblema">
              </div>
              <h3>MEDICINA ANCESTRAL DE LA SELVA</h3>
              <p>Encuentro chamánico grupal, con la ingesta de esta Planta de Poder, que emplea la energía ancestral y la conexión con las fuerzas elementales, acompañado de rezos, rueda medicinal, armonización energética, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial. Finaliza con círculo de palabra y de acompañamiento terapéutico.</p>
            </div>
          </div>

          <div class="col-xl-6 col-lg-6 col-md-12 mb-4">
            <div class="evento-card evento-card-large">
              <div class="evento-icon">
                <img src="/assets/images/Servicios/Teramai_Senchen.png" alt="Reiki Teramai" class="emblema">
              </div>
              <h3>TERAMAI – SEICHEM (SISTEMA DE CURACIÓN NATURAL Y CANALIZACIÓN DE ENERGÍAS SANADORAS)</h3>
              <p>Formación grupal y proceso iniciático de canalización energética de los rayos de sanación de la Tierra, el Agua, el Aire y el Fuego. Manejo de la energía angelical, la sanación con colores, la armonía vibracional, la danza chamánica y el canto curativo. Formación en 6 Niveles: 2 Niveles de Formación Reiki Teramai-Seichem; 3 Niveles de Magia Teramai - Seichem y Maestría.</p>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-6 mb-4">
            <div class="evento-card evento-card-medium">
              <div class="evento-icon">
                <img src="/assets/images/Servicios/Abra_Cadabra.png" alt="Abra Cadabra" class="emblema emblema-medium">
              </div>
              <h3>ABRA CADABRA</h3>
              <p>Compartir grupal y de aprendizaje, a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora en los procesos individuales, así como el incremento de la comunicación amorosa. (Duración: 2 horas).</p>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-6 mb-4">
            <div class="evento-card evento-card-medium">
              <div class="evento-icon">
                <img src="/assets/images/icon/sesiones.png" alt="Sesiones" class="emblema emblema-medium">
              </div>
              <h3>SESIONES</h3>
              <p>Recital de Música de Medicina, con la participación de varios músicos invitados, a través del cual se genera un espacio de esparcimiento que emplea la música como medio de conciencia. (Duración: 4 horas).</p>
            </div>
          </div>

          <div class="col-xl-4 col-lg-4 col-md-6 mb-4">
            <div class="evento-card evento-card-medium">
              <div class="evento-icon">
                <img src="/assets/images/Servicios/MagicSaDan.png" alt="MagicsaDan" class="emblema emblema-medium">
              </div>
              <h3>MAGICSADAN</h3>
              <p>Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos, que combina danza sagrada y rituales de poder, que reconectan con la fuerza vital primordial, y la naturaleza Divina del Ser. Herramienta de autoconocimiento, para regular el bienestar, disminuir los efectos del cortisol en el cuerpo, producto del estrés y conectar al participante con su biología, su esencia, la consciencia de estar vivo, la Magia que porta y la sacralidad en todo lo existente. (Duración: 3 horas).</p>
            </div>
          </div>
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

const events = [
  // FEBRERO 2026
  {
    id: 'feb04-magicsadan',
    date: new Date(2026, 1, 4),
    title: 'MAGICSADAN',
    subtitle: 'SESIÓN GRUPAL DE MOVIMIENTO MÁGICO ANCESTRAL',
    location: 'Caracas',
    type: 'magicsadan',
    logo: '/assets/images/Servicios/MagicSaDan.png',
    description: 'Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos, que combina danza sagrada y rituales de poder, que reconectan con la fuerza vital primordial, y la naturaleza Divina del Ser. Herramienta de autoconocimiento, para regular el bienestar, disminuir los efectos del cortisol en el cuerpo, producto del estrés y conectar al participante con su biología, su esencia, la consciencia de estar vivo, la Magia que porta y la sacralidad en todo lo existente. (Duración: 3 horas).'
  },
  {
    id: 'feb11-abracadabra',
    date: new Date(2026, 1, 11),
    title: 'ABRA CADABRA',
    subtitle: 'CÍRCULO DE PALABRA INTEGRADORA',
    location: 'Caracas',
    type: 'abracadabra',
    logo: '/assets/images/Servicios/Abra_Cadabra.png',
    description: 'Compartir grupal y de aprendizaje, a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora en los procesos individuales, así como el incremento de la comunicación amorosa. (Duración: 2 horas).'
  },
  {
    id: 'feb18-magicsadan',
    date: new Date(2026, 1, 18),
    title: 'MAGICSADAN',
    subtitle: 'SESIÓN GRUPAL DE MOVIMIENTO MÁGICO ANCESTRAL',
    location: 'Caracas',
    type: 'magicsadan',
    logo: '/assets/images/Servicios/MagicSaDan.png',
    description: 'Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos, que combina danza sagrada y rituales de poder, que reconectan con la fuerza vital primordial, y la naturaleza Divina del Ser. Herramienta de autoconocimiento, para regular el bienestar, disminuir los efectos del cortisol en el cuerpo, producto del estrés y conectar al participante con su biología, su esencia, la consciencia de estar vivo, la Magia que porta y la sacralidad en todo lo existente. (Duración: 3 horas).'
  },
  {
    id: 'feb21-fungi',
    date: new Date(2026, 1, 21),
    title: 'MEDICINA FUNGI',
    subtitle: 'ENCUENTRO CEREMONIAL NOCTURNO',
    location: 'Altos Mirandinos',
    type: 'fungi',
    logo: '/assets/images/Servicios/Reino_fungi.png',
    description: 'Encuentro Ritual de conexión con las energías elementales y las fuerzas naturales, con la ingesta de una dosis ritual de setas psilocibicas deshidratadas, rezos de intención, rueda medicinal, oráculos, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial, que constituye el altar principal. Finaliza con círculo de palabra y de acompañamiento terapéutico.'
  },
  {
    id: 'feb25-abracadabra',
    date: new Date(2026, 1, 25),
    title: 'ABRA CADABRA',
    subtitle: 'CÍRCULO DE PALABRA INTEGRADORA',
    location: 'Caracas',
    type: 'abracadabra',
    logo: '/assets/images/Servicios/Abra_Cadabra.png',
    description: 'Compartir grupal y de aprendizaje, a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora en los procesos individuales, así como el incremento de la comunicación amorosa. (Duración: 2 horas).'
  },
  {
    id: 'feb28-velada',
    date: new Date(2026, 1, 28),
    title: 'VELADA MUSICAL',
    subtitle: 'MÚSICA MEDICINA EN VIVO',
    location: 'Caracas',
    type: 'velada',
    logo: '/assets/images/Servicios/Velada_Musical.png',
    description: 'Recital de Música de Medicina, con la participación de varios músicos invitados, a través del cual se genera un espacio de esparcimiento que emplea la música como medio de conciencia. Una velada nocturna para conectar con la sanación a través del sonido y la vibración. (Duración: 4 horas).'
  },
  // MARZO 2026
  {
    id: 'mar04-magicsadan',
    date: new Date(2026, 2, 4),
    title: 'MAGICSADAN',
    subtitle: 'SESIÓN GRUPAL DE MOVIMIENTO MÁGICO ANCESTRAL',
    location: 'Caracas',
    type: 'magicsadan',
    logo: '/assets/images/Servicios/MagicSaDan.png',
    description: 'Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos, que combina danza sagrada y rituales de poder, que reconectan con la fuerza vital primordial, y la naturaleza Divina del Ser. (Duración: 3 horas).'
  },
  {
    id: 'mar11-abracadabra',
    date: new Date(2026, 2, 11),
    title: 'ABRA CADABRA',
    subtitle: 'CÍRCULO DE PALABRA INTEGRADORA',
    location: 'Caracas',
    type: 'abracadabra',
    logo: '/assets/images/Servicios/Abra_Cadabra.png',
    description: 'Compartir grupal y de aprendizaje, a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora en los procesos individuales, así como el incremento de la comunicación amorosa. (Duración: 2 horas).'
  },
  {
    id: 'mar14-ayahuasca',
    date: new Date(2026, 2, 14),
    title: 'AYAHUASCA',
    subtitle: 'ENCUENTRO CEREMONIAL NOCTURNO',
    location: 'Altos Mirandinos',
    type: 'ayahuasca',
    logo: '/assets/images/Servicios/YageAyahuasca.png',
    description: 'Encuentro chamánico grupal, con la ingesta de esta Planta de Poder, que emplea la energía ancestral y la conexión con las fuerzas elementales, acompañado de rezos, rueda medicinal, armonización energética, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial. Finaliza con círculo de palabra y de acompañamiento terapéutico.'
  },
  {
    id: 'mar18-magicsadan',
    date: new Date(2026, 2, 18),
    title: 'MAGICSADAN',
    subtitle: 'SESIÓN GRUPAL DE MOVIMIENTO MÁGICO ANCESTRAL',
    location: 'Caracas',
    type: 'magicsadan',
    logo: '/assets/images/Servicios/MagicSaDan.png',
    description: 'Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos, que combina danza sagrada y rituales de poder. (Duración: 3 horas).'
  },
  {
    id: 'mar25-abracadabra',
    date: new Date(2026, 2, 25),
    title: 'ABRA CADABRA',
    subtitle: 'CÍRCULO DE PALABRA INTEGRADORA',
    location: 'Caracas',
    type: 'abracadabra',
    logo: '/assets/images/Servicios/Abra_Cadabra.png',
    description: 'Compartir grupal y de aprendizaje, a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora. (Duración: 2 horas).'
  },
  {
    id: 'mar28-resonancia',
    date: new Date(2026, 2, 28),
    title: 'RESONANCIA',
    subtitle: 'ACERCAMIENTO A LA MEDICINA FUNGI CON MÚSICA',
    location: 'Caracas',
    type: 'fungi',
    logo: '/assets/images/Servicios/Reino_fungi.png',
    description: 'Círculo de meditación, con la ingesta de una dosis meditativa/sensorial de setas psilocibicas deshidratadas, acompañado de sonidos vibratorios orgánicos y música meditativa en vivo, para el despertar sensorial del propio ser, induciendo a la calma y al encuentro consigo mismo. (Duración: 4 horas).'
  },
  // ABRIL 2026
  {
    id: 'abr08-magicsadan',
    date: new Date(2026, 3, 8),
    title: 'MAGICSADAN',
    subtitle: 'SESIÓN GRUPAL DE MOVIMIENTO MÁGICO ANCESTRAL',
    location: 'Caracas',
    type: 'magicsadan',
    logo: '/assets/images/Servicios/MagicSaDan.png',
    description: 'Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos, que combina danza sagrada y rituales de poder, que reconectan con la fuerza vital primordial, y la naturaleza Divina del Ser. (Duración: 3 horas).'
  },
  {
    id: 'abr11-fungi',
    date: new Date(2026, 3, 11),
    title: 'RITUAL MACRODOSIS FUNGI',
    subtitle: 'ENCUENTRO CEREMONIAL NOCTURNO',
    location: 'Altos Mirandinos',
    type: 'fungi',
    logo: '/assets/images/Servicios/Reino_fungi.png',
    description: 'Encuentro Ritual de conexión con las energías elementales y las fuerzas naturales, con la ingesta de una dosis ritual de setas psilocibicas deshidratadas, rezos de intención, rueda medicinal, oráculos, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial, que constituye el altar principal. Finaliza con círculo de palabra y de acompañamiento terapéutico.'
  },
  {
    id: 'abr15-abracadabra',
    date: new Date(2026, 3, 15),
    title: 'ABRA CADABRA',
    subtitle: 'CÍRCULO DE PALABRA INTEGRADORA',
    location: 'Caracas',
    type: 'abracadabra',
    logo: '/assets/images/Servicios/Abra_Cadabra.png',
    description: 'Compartir grupal y de aprendizaje, a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora en los procesos individuales, así como el incremento de la comunicación amorosa. (Duración: 2 horas).'
  },
  {
    id: 'abr22-magicsadan',
    date: new Date(2026, 3, 22),
    title: 'MAGICSADAN',
    subtitle: 'SESIÓN GRUPAL DE MOVIMIENTO MÁGICO ANCESTRAL',
    location: 'Caracas',
    type: 'magicsadan',
    logo: '/assets/images/Servicios/MagicSaDan.png',
    description: 'Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos, que combina danza sagrada y rituales de poder, que reconectan con la fuerza vital primordial, y la naturaleza Divina del Ser. (Duración: 3 horas).'
  },
  {
    id: 'abr24-velada',
    date: new Date(2026, 3, 24),
    title: 'VELADA MUSICAL ÍNTIMA',
    subtitle: 'MÚSICA MEDICINA EN VIVO',
    location: 'Caracas',
    type: 'velada',
    logo: '/assets/images/Servicios/Velada_Musical.png',
    description: 'Recital de Música de Medicina, con la participación de varios músicos invitados, a través del cual se genera un espacio de esparcimiento que emplea la música como medio de conciencia. Una velada nocturna para conectar con la sanación a través del sonido y la vibración. (Duración: 4 horas).'
  },
  {
    id: 'abr29-abracadabra',
    date: new Date(2026, 3, 29),
    title: 'ABRA CADABRA',
    subtitle: 'CÍRCULO DE PALABRA INTEGRADORA',
    location: 'Caracas',
    type: 'abracadabra',
    logo: '/assets/images/Servicios/Abra_Cadabra.png',
    description: 'Compartir grupal y de aprendizaje, a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora en los procesos individuales, así como el incremento de la comunicación amorosa. (Duración: 2 horas).'
  },
  // MAYO 2026
  {
    id: 'may06-magicsadan',
    date: new Date(2026, 4, 6),
    title: 'MAGICSADAN',
    subtitle: 'SESIÓN GRUPAL DE MOVIMIENTO MÁGICO ANCESTRAL',
    location: 'Caracas',
    type: 'magicsadan',
    logo: '/assets/images/Servicios/MagicSaDan.png',
    description: 'Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos, que combina danza sagrada y rituales de poder, que reconectan con la fuerza vital primordial, y la naturaleza Divina del Ser. (Duración: 3 horas).'
  },
  {
    id: 'may09-yage',
    date: new Date(2026, 4, 9),
    title: 'RITUAL CEREMONIAL CON MEDICINA YAGÉ',
    subtitle: 'ENCUENTRO CEREMONIAL NOCTURNO',
    location: 'Altos Mirandinos',
    type: 'ayahuasca',
    logo: '/assets/images/Servicios/YageAyahuasca.png',
    description: 'Encuentro chamánico grupal, con la ingesta de esta Planta de Poder, que emplea la energía ancestral y la conexión con las fuerzas elementales, acompañado de rezos, rueda medicinal, armonización energética, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial. Finaliza con círculo de palabra y de acompañamiento terapéutico.'
  },
  {
    id: 'may13-abracadabra',
    date: new Date(2026, 4, 13),
    title: 'ABRA CADABRA',
    subtitle: 'CÍRCULO DE PALABRA INTEGRADORA',
    location: 'Caracas',
    type: 'abracadabra',
    logo: '/assets/images/Servicios/Abra_Cadabra.png',
    description: 'Compartir grupal y de aprendizaje, a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora en los procesos individuales, así como el incremento de la comunicación amorosa. (Duración: 2 horas).'
  },
  {
    id: 'may20-magicsadan',
    date: new Date(2026, 4, 20),
    title: 'MAGICSADAN',
    subtitle: 'SESIÓN GRUPAL DE MOVIMIENTO MÁGICO ANCESTRAL',
    location: 'Caracas',
    type: 'magicsadan',
    logo: '/assets/images/Servicios/MagicSaDan.png',
    description: 'Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos, que combina danza sagrada y rituales de poder, que reconectan con la fuerza vital primordial, y la naturaleza Divina del Ser. (Duración: 3 horas).'
  },
  {
    id: 'may23-resonancia',
    date: new Date(2026, 4, 23),
    title: 'RESONANCIA',
    subtitle: 'ACERCAMIENTO A LA MEDICINA FUNGI CON MÚSICA',
    location: 'Caracas',
    type: 'fungi',
    logo: '/assets/images/Servicios/Reino_fungi.png',
    description: 'Círculo de meditación, con la ingesta de una dosis meditativa/sensorial de setas psilocibicas deshidratadas, acompañado de sonidos vibratorios orgánicos y música meditativa en vivo, para el despertar sensorial del propio ser, induciendo a la calma y al encuentro consigo mismo. (Duración: 4 horas).'
  },
  {
    id: 'may27-abracadabra',
    date: new Date(2026, 4, 27),
    title: 'ABRA CADABRA',
    subtitle: 'CÍRCULO DE PALABRA INTEGRADORA',
    location: 'Caracas',
    type: 'abracadabra',
    logo: '/assets/images/Servicios/Abra_Cadabra.png',
    description: 'Compartir grupal y de aprendizaje, a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora en los procesos individuales, así como el incremento de la comunicación amorosa. (Duración: 2 horas).'
  },
  {
    id: 'may30-teramai',
    date: new Date(2026, 4, 30),
    title: 'FORMACIÓN EN TERAMAI',
    subtitle: 'FORMACIÓN EN TERAMAI SENCHEN',
    location: 'Caracas',
    type: 'teramai',
    logo: '/assets/images/Servicios/Teramai_Senchen.png',
    description: 'Formación en Teramai Senchen, un sistema ancestral de sanación energética.'
  },
  {
    id: 'may31-teramai',
    date: new Date(2026, 4, 31),
    title: 'FORMACIÓN EN TERAMAI',
    subtitle: 'FORMACIÓN EN TERAMAI SENCHEN',
    location: 'Caracas',
    type: 'teramai',
    logo: '/assets/images/Servicios/Teramai_Senchen.png',
    description: 'Formación en Teramai Senchen, un sistema ancestral de sanación energética.'
  }
]

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const today = new Date()
  const cells = []

  for (let i = 0; i < firstDay; i++) {
    cells.push({ isEmpty: true })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const event = events.find(e =>
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
  return events
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
}

.panel-title {
  font-family: 'Fraunces', serif;
  font-size: 1.5rem;
  color: var(--thm-base, #b3a85a);
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(179, 168, 90, 0.2);
}

/* Event List */
.event-list-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(179, 168, 90, 0.1);
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.event-list-item:hover {
  background: rgba(179, 168, 90, 0.1);
  border-color: rgba(179, 168, 90, 0.3);
  transform: translateX(4px);
}

.event-list-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  flex-shrink: 0;
  filter: brightness(1.1);
}

.event-list-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.event-list-date {
  font-size: 0.75rem;
  color: var(--thm-accent, #7da052);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.event-list-title {
  font-family: 'Fraunces', serif;
  font-size: 1rem;
  color: var(--thm-base, #b3a85a);
  font-weight: 600;
}

.event-list-location {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

.event-list-arrow {
  color: var(--thm-base, #b3a85a);
  font-size: 1.5rem;
  opacity: 0.4;
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.event-list-item:hover .event-list-arrow {
  opacity: 1;
}

.no-events p {
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;
  text-align: center;
  padding: 40px 0;
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

/* Evento Cards */
.evento-card {
  background: rgba(17, 71, 54, 0.5);
  padding: 40px 30px;
  border-radius: 15px;
  border: 1px solid rgba(179, 168, 90, 0.15);
  text-align: center;
  transition: all 0.3s ease;
  height: 100%;
}

.evento-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(179, 168, 90, 0.4);
}

.evento-icon {
  margin-bottom: 25px;
}

.emblema {
  width: 80px;
  height: 80px;
  object-fit: contain;
  filter: brightness(1.1);
  transition: all 0.3s ease;
}

.evento-card:hover .emblema {
  transform: scale(1.1);
}

.evento-card h3 {
  font-family: 'Fraunces', serif;
  font-size: 1.6rem;
  color: var(--thm-base, #b3a85a);
  font-weight: 600;
  margin-bottom: 20px;
}

.evento-card p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  font-size: 0.95rem;
}

/* Card Principal - Reino Fungi */
.evento-card-principal {
  background: rgba(17, 71, 54, 0.6);
  padding: 60px 50px;
  border: 2px solid rgba(179, 168, 90, 0.3);
  border-radius: 25px;
}

.evento-card-principal h3 {
  font-size: 2.2rem;
  margin-bottom: 40px;
}

.emblema-principal {
  width: 120px;
  height: 120px;
  margin: 0 auto 30px;
  display: block;
}

.fungi-variants-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;
}

.variant-item {
  padding: 20px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  border-left: 4px solid var(--thm-base, #b3a85a);
  text-align: left;
  transition: all 0.3s ease;
  border: 1px solid rgba(179, 168, 90, 0.1);
  border-left: 4px solid var(--thm-base, #b3a85a);
}

.variant-item:hover {
  border-color: rgba(179, 168, 90, 0.3);
  border-left-color: var(--thm-base, #b3a85a);
  background: rgba(179, 168, 90, 0.05);
  transform: translateY(-3px);
}

.variant-item h4 {
  color: var(--thm-base, #b3a85a);
  font-family: 'Fraunces', serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.variant-item p {
  margin-bottom: 0;
  font-size: 0.9rem;
}

.variant-item-centered {
  grid-column: 1 / -1;
  max-width: 600px;
  margin: 0 auto;
}

/* Cards grandes */
.evento-card-large {
  padding: 50px 40px;
}

.evento-card-large h3 {
  font-size: 1.8rem;
  margin-bottom: 25px;
}

.evento-card-large p {
  font-size: 1rem;
  line-height: 1.7;
}

/* Cards medianas */
.evento-card-medium {
  padding: 35px 25px;
}

.evento-card-medium h3 {
  font-size: 1.4rem;
}

.emblema-medium {
  width: 70px;
  height: 70px;
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

  .panel-title {
    font-size: 1.3rem;
  }

  .evento-card {
    padding: 30px 20px;
  }

  .evento-card h3 {
    font-size: 1.4rem;
  }

  .evento-card-principal {
    padding: 40px 25px;
  }

  .evento-card-principal h3 {
    font-size: 1.8rem;
  }

  .fungi-variants-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .emblema-principal {
    width: 80px;
    height: 80px;
  }

  .evento-card-large {
    padding: 30px 25px;
  }

  .evento-card-large h3 {
    font-size: 1.5rem;
  }

  .evento-card-medium {
    padding: 25px 20px;
  }

  .evento-card-medium h3 {
    font-size: 1.3rem;
  }

  .emblema-medium {
    width: 60px;
    height: 60px;
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
