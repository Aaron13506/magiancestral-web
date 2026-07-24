export interface EventTypeDef {
  value: string
  label: string
  logo: string
  subtitle: string
  description: string
}

export const EVENT_TYPES: EventTypeDef[] = [
  {
    value: 'fungi',
    label: 'Medicina del Reino Fungi',
    logo: '/assets/images/Servicios/Reino_fungi.png',
    subtitle: 'Encuentro Ceremonial Nocturno',
    description: 'Encuentro Ritual de conexión con las energías elementales y las fuerzas naturales, con la ingesta de una dosis ritual de setas psilocibicas deshidratadas, rezos de intención, rueda medicinal, oráculos, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial. Finaliza con círculo de palabra y de acompañamiento terapéutico.'
  },
  {
    value: 'ayahuasca',
    label: 'Medicina Ancestral de la Selva (Ayahuasca/Yagé)',
    logo: '/assets/images/Servicios/YageAyahuasca.png',
    subtitle: 'Encuentro Ceremonial Nocturno',
    description: 'Encuentro chamánico grupal con la ingesta de esta Planta de Poder, que emplea la energía ancestral y la conexión con las fuerzas elementales, acompañado de rezos, rueda medicinal, armonización energética, cantos, icaros y música de medicina en vivo, en un espacio de Naturaleza, en presencia del Fuego Ceremonial. Finaliza con círculo de palabra y de acompañamiento terapéutico.'
  },
  {
    value: 'teramai',
    label: 'Teramai – Seichem',
    logo: '/assets/images/Servicios/Teramai_Senchen.png',
    subtitle: 'Formación en Teramai Seichem',
    description: 'Formación grupal y proceso iniciático de canalización energética de los rayos de sanación de la Tierra, el Agua, el Aire y el Fuego. Manejo de la energía angelical, la sanación con colores, la armonía vibracional, la danza chamánica y el canto curativo. Formación en 6 Niveles: 2 de Reiki Teramai-Seichem, 3 de Magia Teramai-Seichem y Maestría.'
  },
  {
    value: 'abracadabra',
    label: 'Abra Cadabra',
    logo: '/assets/images/Servicios/Abra_Cadabra.png',
    subtitle: 'Círculo de Palabra Integradora',
    description: 'Compartir grupal y de aprendizaje a través de la palabra, guiado con actividades creativas y dinámicas grupales que permiten desarrollar la conciencia del aquí y ahora en los procesos individuales, así como el incremento de la comunicación amorosa. (Duración: 2 horas).'
  },
  {
    value: 'velada',
    label: 'Velada Musical',
    logo: '/assets/images/Servicios/Velada_Musical.png',
    subtitle: 'Música Medicina en Vivo',
    description: 'Recital de Música de Medicina con la participación de varios músicos invitados, a través del cual se genera un espacio de esparcimiento que emplea la música como medio de conciencia. Una velada nocturna para conectar con la sanación a través del sonido y la vibración. (Duración: 4 horas).'
  },
  {
    value: 'magicsadan',
    label: 'MagicSaDan',
    logo: '/assets/images/Servicios/MagicSaDan.png',
    subtitle: 'Sesión Grupal de Movimiento Mágico Ancestral',
    description: 'Sagradas sesiones grupales de movimiento mágico ancestral; movimiento auténtico y consciente de efectos terapéuticos que combina danza sagrada y rituales de poder. Herramienta de autoconocimiento para regular el bienestar, disminuir el cortisol y conectar con la biología, la esencia y la sacralidad del ser.'
  }
]

export const EVENT_TYPE_VALUES = EVENT_TYPES.map(t => t.value) as [string, ...string[]]

export function getEventType(value: string | null | undefined): EventTypeDef | undefined {
  return EVENT_TYPES.find(t => t.value === value)
}

export function getEventTypeLogo(value: string | null | undefined): string {
  return getEventType(value)?.logo || ''
}

export function getEventTypeLabel(value: string | null | undefined): string {
  return getEventType(value)?.label || value || ''
}

export function getEventTypeSubtitle(value: string | null | undefined): string {
  return getEventType(value)?.subtitle || ''
}

export function getEventTypeDescription(value: string | null | undefined): string {
  return getEventType(value)?.description || ''
}
