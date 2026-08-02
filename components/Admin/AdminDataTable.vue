<template>
  <div class="a-card">
    <!-- Barra de herramientas: buscador + filtros de la página -->
    <div v-if="searchable || $slots.filters" class="a-tabletools">
      <div v-if="searchable" class="a-search">
        <i class="fas fa-search a-search__icon" />
        <input
          v-model="query"
          type="search"
          class="a-input"
          :placeholder="searchPlaceholder"
          :aria-label="searchPlaceholder"
        >
      </div>
      <slot name="filters" />
      <span class="a-grow" />
      <slot name="tools" />
    </div>

    <!-- Cargando -->
    <div v-if="loading" class="a-card__body">
      <div v-for="n in 5" :key="n" class="a-skeleton" :style="{ height: '38px', marginBottom: '8px' }" />
    </div>

    <!-- Sin resultados -->
    <div v-else-if="filtered.length === 0" class="a-empty">
      <div class="a-empty__icon"><i :class="emptyIcon" /></div>
      <h3 class="a-empty__title">{{ noMatches ? 'Sin coincidencias' : emptyTitle }}</h3>
      <p class="a-empty__text">
        <template v-if="isFiltered">No hay resultados para “{{ query }}”. Prueba con otro término.</template>
        <template v-else-if="noMatches">Ningún registro coincide con los filtros aplicados.</template>
        <template v-else>{{ emptyText }}</template>
      </p>
      <button v-if="isFiltered" type="button" class="a-btn a-btn--ghost" @click="query = ''">
        Limpiar búsqueda
      </button>
      <slot v-else-if="!noMatches" name="empty-action" />
    </div>

    <template v-else>
      <div class="a-tablewrap">
        <table class="a-table">
          <thead>
            <tr>
              <th
                v-for="col in columns"
                :key="col.key"
                :class="[
                  { 'is-sortable': col.sortable !== false, 'is-sorted': sortKey === col.key },
                  col.headerClass
                ]"
                :style="col.width ? { width: col.width } : null"
                @click="col.sortable !== false && toggleSort(col.key)"
              >
                {{ col.label }}
                <i
                  v-if="col.sortable !== false"
                  class="a-table__sort fas"
                  :class="sortKey === col.key && sortDir === 'desc' ? 'fa-arrow-down' : 'fa-arrow-up'"
                />
              </th>
              <th v-if="$slots.actions" class="a-table__actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in paginated" :key="item[rowKey]">
              <td v-for="col in columns" :key="col.key" :class="col.cellClass">
                <slot :name="`cell-${col.key}`" :item="item" :value="item[col.key]">
                  {{ formatCell(item[col.key]) }}
                </slot>
              </td>
              <td v-if="$slots.actions" class="a-table__actions">
                <slot name="actions" :item="item" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filtered.length > pageSize || total !== filtered.length" class="a-tablefoot">
        <span>
          Mostrando {{ rangeStart }}–{{ rangeEnd }} de {{ filtered.length }}
          <template v-if="isFiltered">(filtrados de {{ total }})</template>
        </span>
        <div v-if="pageCount > 1" class="a-pager">
          <button
            type="button"
            class="a-btn a-btn--ghost a-btn--sm"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <i class="fas fa-chevron-left" />
          </button>
          <span class="a-nowrap" style="padding: 0 8px;">{{ currentPage }} / {{ pageCount }}</span>
          <button
            type="button"
            class="a-btn a-btn--ghost a-btn--sm"
            :disabled="currentPage === pageCount"
            @click="currentPage++"
          >
            <i class="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  /** `[{ key, label, sortable?, width?, headerClass?, cellClass?, sortValue?(item) }]` */
  columns: { type: Array, required: true },
  items: { type: Array, default: () => [] },
  rowKey: { type: String, default: 'id' },
  loading: { type: Boolean, default: false },
  searchable: { type: Boolean, default: true },
  /** Campos sobre los que busca el input. Por defecto, las columnas visibles. */
  searchKeys: { type: Array, default: null },
  searchPlaceholder: { type: String, default: 'Buscar…' },
  emptyTitle: { type: String, default: 'No hay registros todavía' },
  emptyText: { type: String, default: 'Cuando crees el primero aparecerá aquí.' },
  emptyIcon: { type: String, default: 'fas fa-inbox' },
  /**
   * Total de registros antes de los filtros que aplica la página (los selects
   * del slot `filters`). Permite distinguir «no hay nada» de «los filtros no
   * devuelven nada».
   */
  totalCount: { type: Number, default: null },
  pageSize: { type: Number, default: 15 },
  defaultSort: { type: String, default: '' },
  defaultSortDir: { type: String, default: 'asc' }
})

const query = ref('')
const sortKey = ref(props.defaultSort)
const sortDir = ref(props.defaultSortDir)
const currentPage = ref(1)

const total = computed(() => props.items.length)
const isFiltered = computed(() => query.value.trim().length > 0)

// Vacío por culpa de un filtro (buscador o los selects de la página), no
// porque no exista ningún registro.
const noMatches = computed(() => (
  isFiltered.value || (props.totalCount != null && props.totalCount > 0 && props.items.length === 0)
))

const searchFields = computed(() => props.searchKeys || props.columns.map(c => c.key))

const normalize = (value) => String(value ?? '')
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()

const filtered = computed(() => {
  const term = normalize(query.value.trim())
  const rows = term
    ? props.items.filter(item => searchFields.value.some(key => normalize(item[key]).includes(term)))
    : [...props.items]

  if (!sortKey.value) return rows

  const col = props.columns.find(c => c.key === sortKey.value)
  const valueOf = col?.sortValue || (item => item[sortKey.value])
  const dir = sortDir.value === 'desc' ? -1 : 1

  return rows.sort((a, b) => {
    const va = valueOf(a)
    const vb = valueOf(b)
    if (va == null && vb == null) return 0
    if (va == null) return 1
    if (vb == null) return -1
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir
    if (typeof va === 'boolean' && typeof vb === 'boolean') return (Number(va) - Number(vb)) * dir
    return String(va).localeCompare(String(vb), 'es', { numeric: true, sensitivity: 'base' }) * dir
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / props.pageSize)))

const paginated = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return filtered.value.slice(start, start + props.pageSize)
})

const rangeStart = computed(() => (filtered.value.length ? (currentPage.value - 1) * props.pageSize + 1 : 0))
const rangeEnd = computed(() => Math.min(currentPage.value * props.pageSize, filtered.value.length))

// Al filtrar o al encogerse la lista (p. ej. tras borrar) la página actual
// puede quedar fuera de rango.
watch([query, pageCount], () => {
  if (currentPage.value > pageCount.value) currentPage.value = pageCount.value
})

function toggleSort(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

function formatCell(value) {
  if (value == null || value === '') return '—'
  if (typeof value === 'boolean') return value ? 'Sí' : 'No'
  return value
}
</script>
