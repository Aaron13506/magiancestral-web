<template>
  <Teleport to="body">
    <div class="admin-shell a-modal-backdrop" role="dialog" aria-modal="true" @click.self="$emit('close')">
      <div class="a-modal a-modal--wide">
        <div class="a-modal__head">
          <h3>Biblioteca de medios</h3>
          <button type="button" class="a-btn a-btn--subtle a-btn--icon" aria-label="Cerrar" @click="$emit('close')">
            <i class="fas fa-times" />
          </button>
        </div>

        <div class="a-modal__body">
          <div class="a-inline" style="margin-bottom: 16px;">
            <div class="a-search a-grow">
              <i class="fas fa-search a-search__icon" />
              <input v-model="query" type="search" class="a-input" placeholder="Buscar por nombre de archivo…">
            </div>
            <button type="button" class="a-btn a-btn--ghost a-btn--sm" :disabled="pending" @click="refresh()">
              <i class="fas fa-sync-alt" /> Actualizar
            </button>
          </div>

          <div v-if="pending" class="a-media-grid">
            <div v-for="n in 8" :key="n" class="a-skeleton" style="aspect-ratio: 4/3;" />
          </div>

          <div v-else-if="error" class="a-alert a-alert--error">
            <i class="fas fa-exclamation-triangle" />
            <span>No se pudo cargar la biblioteca. Revisa la configuración del almacenamiento.</span>
          </div>

          <div v-else-if="visible.length === 0" class="a-empty">
            <div class="a-empty__icon"><i class="fas fa-images" /></div>
            <h3 class="a-empty__title">Nada por aquí</h3>
            <p class="a-empty__text">
              {{ query ? 'Ningún archivo coincide con la búsqueda.' : 'Todavía no has subido archivos de este tipo.' }}
            </p>
          </div>

          <div v-else class="a-media-grid">
            <button
              v-for="item in visible"
              :key="item.key"
              type="button"
              class="a-media"
              :class="{ 'a-media--selected': selected === item.url }"
              @click="selected = item.url"
              @dblclick="choose"
            >
              <span class="a-media__thumb">
                <img v-if="item.kind === 'image'" :src="item.url" :alt="item.name" loading="lazy">
                <i v-else class="fas fa-file-pdf a-media__doc" />
              </span>
              <span class="a-media__meta">
                <strong>{{ item.name }}</strong>
                <span>{{ formatBytes(item.size) }}</span>
              </span>
            </button>
          </div>
        </div>

        <div class="a-modal__foot">
          <button type="button" class="a-btn a-btn--ghost" @click="$emit('close')">Cancelar</button>
          <button type="button" class="a-btn a-btn--primary" :disabled="!selected" @click="choose">
            Usar este archivo
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref } from 'vue'
import { formatBytes } from '~/utils/format'

const props = defineProps({
  /** `image` | `document` | `all` */
  kind: { type: String, default: 'image' }
})

const emit = defineEmits(['close', 'select'])

const api = useAdminApi()
const query = ref('')
const selected = ref('')

// Sin `await`: el selector se monta dentro de un `v-if`, y un setup asíncrono
// obligaría a envolverlo en <Suspense> en cada formulario.
const { data, pending, error, refresh } = useAsyncData(
  'admin-media-picker',
  () => api.get('/api/admin/media'),
  { default: () => [] }
)

const visible = computed(() => {
  const term = query.value.trim().toLowerCase()
  return (data.value || [])
    .filter(item => props.kind === 'all' || item.kind === props.kind)
    .filter(item => !term || item.name.toLowerCase().includes(term))
})

const choose = () => {
  if (!selected.value) return
  emit('select', selected.value)
  emit('close')
}
</script>
