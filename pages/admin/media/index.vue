<template>
  <div>
    <AdminPageHeader
      title="Biblioteca de medios"
      :subtitle="subtitle"
      :crumbs="[{ label: 'Biblioteca' }]"
    >
      <template #actions>
        <button
          v-if="selected.size"
          type="button"
          class="a-btn a-btn--danger-ghost"
          :disabled="deleting"
          @click="onDeleteSelected"
        >
          <i class="fas fa-trash-alt" /> Borrar {{ selected.size }} seleccionado{{ selected.size === 1 ? '' : 's' }}
        </button>
        <button type="button" class="a-btn a-btn--ghost" :disabled="pending" @click="refresh()">
          <i class="fas fa-sync-alt" /> Actualizar
        </button>
        <button type="button" class="a-btn a-btn--primary" @click="fileInput?.click()">
          <i class="fas fa-cloud-upload-alt" /> Subir archivos
        </button>
      </template>
    </AdminPageHeader>

    <input
      ref="fileInput"
      type="file"
      multiple
      accept="image/*,application/pdf"
      style="display: none;"
      @change="onFilesChosen"
    >

    <div v-if="error" class="a-alert a-alert--error" style="margin-bottom: 16px;">
      <i class="fas fa-exclamation-triangle" />
      <span class="a-grow">
        No se pudo leer el almacenamiento. Comprueba las variables <code>S3_*</code> del entorno.
      </span>
      <button type="button" class="a-btn a-btn--ghost a-btn--sm" @click="refresh()">Reintentar</button>
    </div>

    <div v-if="uploads.length" class="a-alert a-alert--info" style="margin-bottom: 16px;">
      <i class="a-spinner" />
      <span>Subiendo {{ uploads.length }} archivo{{ uploads.length === 1 ? '' : 's' }}…</span>
    </div>

    <div class="a-card">
      <div class="a-tabletools">
        <div class="a-search">
          <i class="fas fa-search a-search__icon" />
          <input v-model="query" type="search" class="a-input" placeholder="Buscar por nombre de archivo…">
        </div>

        <select v-model="kindFilter" class="a-select" style="width: auto;">
          <option value="">Todos los tipos</option>
          <option value="image">Imágenes</option>
          <option value="document">Documentos PDF</option>
        </select>

        <select v-model="usageFilter" class="a-select" style="width: auto;">
          <option value="">En uso o no</option>
          <option value="used">En uso</option>
          <option value="orphan">Sin usar</option>
        </select>

        <span class="a-grow" />

        <button
          v-if="visible.length"
          type="button"
          class="a-btn a-btn--subtle a-btn--sm"
          @click="toggleSelectAll"
        >
          <i class="fas fa-check" />
          {{ allVisibleSelected ? 'Quitar selección' : 'Seleccionar todo' }}
        </button>
      </div>

      <div class="a-card__body">
        <div v-if="pending" class="a-media-grid">
          <div v-for="n in 12" :key="n" class="a-skeleton" style="aspect-ratio: 4/3;" />
        </div>

        <div v-else-if="visible.length === 0" class="a-empty">
          <div class="a-empty__icon"><i class="fas fa-images" /></div>
          <h3 class="a-empty__title">{{ items.length ? 'Sin coincidencias' : 'La biblioteca está vacía' }}</h3>
          <p class="a-empty__text">
            {{ items.length
              ? 'Ningún archivo coincide con los filtros aplicados.'
              : 'Todo lo que subas desde los formularios de productos, blog y eventos aparecerá aquí.' }}
          </p>
          <button v-if="!items.length" type="button" class="a-btn a-btn--primary" @click="fileInput?.click()">
            <i class="fas fa-cloud-upload-alt" /> Subir archivos
          </button>
        </div>

        <div v-else class="a-media-grid">
          <div
            v-for="item in visible"
            :key="item.key"
            class="a-media"
            :class="{ 'a-media--selected': selected.has(item.key) }"
            @click="toggle(item.key)"
          >
            <span class="a-media__thumb">
              <img v-if="item.kind === 'image'" :src="item.url" :alt="item.name" loading="lazy">
              <i v-else class="fas fa-file-pdf a-media__doc" />
            </span>
            <span class="a-media__meta">
              <strong :title="item.name">{{ item.name }}</strong>
              <span>{{ formatBytes(item.size) }} · {{ formatDateTime(item.lastModified) }}</span>
              <span class="a-inline" style="gap: 4px; margin-top: 6px;">
                <span
                  v-if="item.usedBy.length"
                  class="a-badge a-badge--ok a-badge--plain"
                  :title="item.usedBy.map(u => u.label).join(', ')"
                >
                  En uso ({{ item.usedBy.length }})
                </span>
                <span v-else class="a-badge a-badge--neutral a-badge--plain">Sin usar</span>
                <a
                  :href="item.url"
                  target="_blank"
                  rel="noopener"
                  class="a-btn a-btn--subtle a-btn--sm"
                  title="Abrir"
                  @click.stop
                >
                  <i class="fas fa-external-link-alt" />
                </a>
                <button
                  type="button"
                  class="a-btn a-btn--subtle a-btn--sm"
                  title="Copiar URL"
                  @click.stop="copyUrl(item.url)"
                >
                  <i class="fas fa-link" />
                </button>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminPageHeader from '~/components/Admin/AdminPageHeader.vue'
import { formatBytes, formatDateTime } from '~/utils/format'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useHead({ title: 'Biblioteca · Panel Magiancestral' })

const api = useAdminApi()
const toast = useAdminToast()
const { confirm } = useAdminConfirm()

const fileInput = ref(null)
const query = ref('')
const kindFilter = ref('')
const usageFilter = ref('')
const selected = ref(new Set())
const uploads = ref([])
const deleting = ref(false)

const { data, pending, error, refresh } = await useAsyncData(
  'admin-media',
  () => api.get('/api/admin/media'),
  { default: () => [] }
)

const items = computed(() => data.value || [])

const visible = computed(() => {
  const term = query.value.trim().toLowerCase()
  return items.value.filter((item) => {
    if (kindFilter.value && item.kind !== kindFilter.value) return false
    if (usageFilter.value === 'used' && !item.usedBy.length) return false
    if (usageFilter.value === 'orphan' && item.usedBy.length) return false
    if (term && !item.name.toLowerCase().includes(term)) return false
    return true
  })
})

const subtitle = computed(() => {
  if (pending.value) return 'Cargando…'
  const bytes = items.value.reduce((sum, item) => sum + item.size, 0)
  const orphans = items.value.filter(item => !item.usedBy.length).length
  return `${items.value.length} archivos · ${formatBytes(bytes)} · ${orphans} sin usar`
})

const allVisibleSelected = computed(() =>
  visible.value.length > 0 && visible.value.every(item => selected.value.has(item.key))
)

function toggle(key) {
  // Reasignamos el Set para que Vue detecte el cambio.
  const next = new Set(selected.value)
  next.has(key) ? next.delete(key) : next.add(key)
  selected.value = next
}

function toggleSelectAll() {
  selected.value = allVisibleSelected.value
    ? new Set()
    : new Set(visible.value.map(item => item.key))
}

async function copyUrl(url) {
  try {
    await navigator.clipboard.writeText(url)
    toast.success('URL copiada al portapapeles')
  } catch {
    toast.error('El navegador no permitió copiar la URL')
  }
}

async function onFilesChosen(event) {
  const files = Array.from(event.target.files || [])
  event.target.value = ''
  if (!files.length) return

  uploads.value = files
  let ok = 0

  for (const file of files) {
    const endpoint = file.type === 'application/pdf'
      ? '/api/admin/uploads/document'
      : '/api/admin/uploads/image'
    try {
      const formData = new FormData()
      formData.append('file', file)
      await api.post(endpoint, formData)
      ok++
    } catch (err) {
      toast.error(`${file.name}: ${adminErrorMessage(err, 'no se pudo subir')}`)
    }
  }

  uploads.value = []
  if (ok) toast.success(`${ok} archivo${ok === 1 ? '' : 's'} subido${ok === 1 ? '' : 's'}`)
  await refresh()
}

async function onDeleteSelected() {
  const keys = [...selected.value]
  const chosen = items.value.filter(item => keys.includes(item.key))
  const inUse = chosen.filter(item => item.usedBy.length)

  const ok = await confirm({
    title: `Borrar ${keys.length} archivo${keys.length === 1 ? '' : 's'}`,
    message: inUse.length
      ? `${inUse.length} de estos archivos están en uso.`
      : '¿Seguro que quieres borrarlos del almacenamiento?',
    detail: inUse.length
      ? `Si los borras, ${inUse.map(i => i.usedBy.map(u => u.label).join(', ')).join(' · ')} se quedarán sin imagen. Esta acción no se puede deshacer.`
      : 'Esta acción no se puede deshacer.',
    confirmLabel: 'Borrar',
    danger: true
  })
  if (!ok) return

  deleting.value = true
  try {
    const result = await api.del('/api/admin/media', { body: { keys } })
    selected.value = new Set()
    if (result.failed) {
      toast.warn(`Se borraron ${result.deleted}, fallaron ${result.failed}`)
    } else {
      toast.success(`${result.deleted} archivo${result.deleted === 1 ? '' : 's'} borrado${result.deleted === 1 ? '' : 's'}`)
    }
    await refresh()
  } catch (err) {
    toast.error(adminErrorMessage(err, 'No se pudieron borrar los archivos'))
  } finally {
    deleting.value = false
  }
}
</script>
