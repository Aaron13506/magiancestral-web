<template>
  <div>
    <AdminPageHeader
      title="Productos"
      :subtitle="`${products.length} ${products.length === 1 ? 'producto' : 'productos'} en la botica`"
      :crumbs="[{ label: 'Productos' }]"
    >
      <template #actions>
        <NuxtLink to="/admin/products/new" class="a-btn a-btn--primary">
          <i class="fas fa-plus" /> Nuevo producto
        </NuxtLink>
      </template>
    </AdminPageHeader>

    <div v-if="error" class="a-alert a-alert--error" style="margin-bottom: 16px;">
      <i class="fas fa-exclamation-triangle" />
      <span>No se pudieron cargar los productos.</span>
      <button type="button" class="a-btn a-btn--ghost a-btn--sm" @click="refresh()">Reintentar</button>
    </div>

    <AdminDataTable
      :items="visible"
      :columns="columns"
      :loading="pending"
      :total-count="products.length"
      :search-keys="['name', 'slug', 'shortName']"
      search-placeholder="Buscar por nombre o URL…"
      empty-title="La botica está vacía"
      empty-text="Crea el primer producto para que aparezca en el catálogo del sitio."
      empty-icon="fas fa-box-open"
      default-sort="name"
    >
      <template #filters>
        <select v-model="categoryFilter" class="a-select" style="width: auto;">
          <option value="">Todas las categorías</option>
          <option v-for="cat in PRODUCT_CATEGORIES" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          <option value="__none">Sin categoría</option>
        </select>

        <select v-model="stateFilter" class="a-select" style="width: auto;">
          <option value="">Cualquier estado</option>
          <option value="in-stock">En stock</option>
          <option value="out-of-stock">Agotados</option>
          <option value="featured">Destacados</option>
          <option value="no-image">Sin imagen</option>
        </select>

        <button
          v-if="categoryFilter || stateFilter"
          type="button"
          class="a-btn a-btn--subtle a-btn--sm"
          @click="clearFilters"
        >
          <i class="fas fa-times" /> Limpiar
        </button>
      </template>

      <template #cell-name="{ item }">
        <div class="a-cellstack">
          <img v-if="item.image" :src="item.image" :alt="item.name" class="a-table__thumb">
          <span v-else class="a-table__thumb a-table__thumb--empty"><i class="fas fa-box-open" /></span>
          <span class="a-cellstack__text">
            <strong>{{ item.name }}</strong>
            <span class="a-mono">/{{ item.slug }}</span>
          </span>
        </div>
      </template>

      <template #cell-category="{ value }">
        <span v-if="value" class="a-badge a-badge--neutral a-badge--plain">{{ getProductCategoryName(value) }}</span>
        <span v-else class="a-badge a-badge--warn">Sin categoría</span>
      </template>

      <template #cell-price="{ item }">
        <span class="a-nowrap">{{ formatPrice(item.price, item.currency) }}</span>
      </template>

      <template #cell-inStock="{ item }">
        <div class="a-inline" style="gap: 5px;">
          <span class="a-badge" :class="item.inStock ? 'a-badge--ok' : 'a-badge--off'">
            {{ item.inStock ? 'En stock' : 'Agotado' }}
          </span>
          <span v-if="item.featured" class="a-badge a-badge--gold a-badge--plain">Destacado</span>
          <span v-if="item.topProduct" class="a-badge a-badge--info a-badge--plain">Top</span>
        </div>
      </template>

      <template #actions="{ item }">
        <a
          :href="`/producto/${item.slug}`"
          target="_blank"
          rel="noopener"
          class="a-btn a-btn--subtle a-btn--sm"
          title="Ver en el sitio"
        >
          <i class="fas fa-eye" />
        </a>
        <button
          type="button"
          class="a-btn a-btn--subtle a-btn--sm"
          title="Duplicar"
          :disabled="busyId === item.id"
          @click="onDuplicate(item)"
        >
          <i class="fas fa-clone" />
        </button>
        <NuxtLink :to="`/admin/products/${item.id}`" class="a-btn a-btn--ghost a-btn--sm">
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
        <NuxtLink to="/admin/products/new" class="a-btn a-btn--primary">
          <i class="fas fa-plus" /> Nuevo producto
        </NuxtLink>
      </template>
    </AdminDataTable>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminDataTable from '~/components/Admin/AdminDataTable.vue'
import AdminPageHeader from '~/components/Admin/AdminPageHeader.vue'
import { formatPrice } from '~/utils/format'
import { PRODUCT_CATEGORIES, getProductCategoryName } from '~/utils/productCategories'
import { slugify } from '~/utils/slugify'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useHead({ title: 'Productos · Panel Magiancestral' })

const route = useRoute()
const api = useAdminApi()
const toast = useAdminToast()
const { confirm } = useAdminConfirm()

const columns = [
  { key: 'name', label: 'Producto' },
  { key: 'category', label: 'Categoría', width: '160px' },
  { key: 'price', label: 'Precio', width: '110px', sortValue: item => Number(item.price) },
  { key: 'inStock', label: 'Estado', width: '230px', sortValue: item => Number(item.inStock) }
]

const { data, pending, error, refresh } = await useAsyncData(
  'admin-products',
  () => api.get('/api/admin/products'),
  { default: () => [] }
)

const products = computed(() => data.value || [])
const busyId = ref(null)

// El panel enlaza aquí con `?filter=…` desde los avisos del inicio.
const categoryFilter = ref('')
const stateFilter = ref(typeof route.query.filter === 'string' ? route.query.filter : '')

const visible = computed(() => products.value.filter((item) => {
  if (categoryFilter.value === '__none' && item.category) return false
  if (categoryFilter.value && categoryFilter.value !== '__none' && item.category !== categoryFilter.value) return false

  switch (stateFilter.value) {
    case 'in-stock': return item.inStock
    case 'out-of-stock': return !item.inStock
    case 'featured': return item.featured
    case 'no-image': return !item.image
    default: return true
  }
}))

const clearFilters = () => {
  categoryFilter.value = ''
  stateFilter.value = ''
}

const onDelete = async (item) => {
  const ok = await confirm({
    title: 'Borrar producto',
    message: `¿Seguro que quieres borrar “${item.name}”?`,
    detail: 'Desaparecerá de la botica de inmediato. Esta acción no se puede deshacer.',
    confirmLabel: 'Borrar',
    danger: true
  })
  if (!ok) return

  busyId.value = item.id
  try {
    await api.del(`/api/admin/products/${item.id}`)
    toast.success(`“${item.name}” se borró`)
    await refresh()
  } catch (err) {
    toast.error(adminErrorMessage(err, 'No se pudo borrar el producto'))
  } finally {
    busyId.value = null
  }
}

const onDuplicate = async (item) => {
  busyId.value = item.id
  try {
    // Pedimos la fila completa: el listado no trae los campos largos.
    const full = await api.get(`/api/admin/products/${item.id}`)
    const { id, createdAt, updatedAt, ...rest } = full

    const created = await api.post('/api/admin/products', {
      ...rest,
      name: `${full.name} (copia)`,
      slug: uniqueSlug(slugify(`${full.slug}-copia`)),
      // Una copia empieza fuera de los escaparates para no duplicar destacados.
      featured: false,
      topProduct: false
    })

    toast.success('Producto duplicado. Ajusta la copia antes de publicarla.')
    await navigateTo(`/admin/products/${created.id}`)
  } catch (err) {
    toast.error(adminErrorMessage(err, 'No se pudo duplicar el producto'))
  } finally {
    busyId.value = null
  }
}

/** Añade un sufijo numérico si el slug ya existe en el catálogo. */
function uniqueSlug(base) {
  const taken = new Set(products.value.map(p => p.slug))
  if (!taken.has(base)) return base
  let n = 2
  while (taken.has(`${base}-${n}`)) n++
  return `${base}-${n}`
}
</script>
