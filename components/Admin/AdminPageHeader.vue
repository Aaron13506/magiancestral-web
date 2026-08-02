<template>
  <div class="a-pagehead">
    <div>
      <h1 class="a-pagehead__title">{{ title }}</h1>
      <p v-if="subtitle" class="a-pagehead__sub">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="a-pagehead__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
import { watchEffect } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  /** Migas para el topbar, ej. `[{ label: 'Productos', to: '/admin/products' }, { label: 'Nuevo' }]` */
  crumbs: { type: Array, default: () => [] }
})

const route = useRoute()
const page = useAdminPage()

// Publica el breadcrumb que dibuja el layout. `watchEffect` mantiene la
// sincronía cuando el título/migas dependen de datos que llegan tarde.
watchEffect(() => {
  page.value = {
    path: route.path,
    crumbs: props.crumbs.length ? props.crumbs : [{ label: props.title }]
  }
})
</script>
