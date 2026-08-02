<template>
  <div>
    <AdminPageHeader
      title="Blog"
      :subtitle="`${articles.length} ${articles.length === 1 ? 'artículo publicado' : 'artículos publicados'}`"
      :crumbs="[{ label: 'Blog' }]"
    >
      <template #actions>
        <NuxtLink to="/admin/blog/new" class="a-btn a-btn--primary">
          <i class="fas fa-plus" /> Nuevo artículo
        </NuxtLink>
      </template>
    </AdminPageHeader>

    <div v-if="error" class="a-alert a-alert--error" style="margin-bottom: 16px;">
      <i class="fas fa-exclamation-triangle" />
      <span>No se pudieron cargar los artículos.</span>
      <button type="button" class="a-btn a-btn--ghost a-btn--sm" @click="refresh()">Reintentar</button>
    </div>

    <AdminDataTable
      :items="visible"
      :columns="columns"
      :loading="pending"
      :total-count="articles.length"
      :search-keys="['title', 'slug', 'author', 'description']"
      search-placeholder="Buscar por título, autor o URL…"
      empty-title="Todavía no hay artículos"
      empty-text="Publica el primer artículo para llenar la sección de blog del sitio."
      empty-icon="fas fa-feather-alt"
      default-sort="date"
      default-sort-dir="desc"
    >
      <template #filters>
        <select v-model="categoryFilter" class="a-select" style="width: auto;">
          <option value="">Todas las categorías</option>
          <option v-for="cat in BLOG_CATEGORIES" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
        </select>

        <select v-model="formatFilter" class="a-select" style="width: auto;">
          <option value="">Cualquier formato</option>
          <option value="article">Artículo en el sitio</option>
          <option value="pdf">Enlace a PDF</option>
        </select>

        <button
          v-if="categoryFilter || formatFilter"
          type="button"
          class="a-btn a-btn--subtle a-btn--sm"
          @click="categoryFilter = ''; formatFilter = ''"
        >
          <i class="fas fa-times" /> Limpiar
        </button>
      </template>

      <template #cell-title="{ item }">
        <div class="a-cellstack">
          <img v-if="item.image" :src="item.image" :alt="item.title" class="a-table__thumb">
          <span v-else class="a-table__thumb a-table__thumb--empty"><i class="fas fa-feather-alt" /></span>
          <span class="a-cellstack__text">
            <strong>{{ item.title }}</strong>
            <span class="a-mono">/blog/{{ item.slug }}</span>
          </span>
        </div>
      </template>

      <template #cell-date="{ value }">
        <span class="a-nowrap">{{ formatDate(value) }}</span>
      </template>

      <template #cell-category="{ value }">
        <span class="a-badge a-badge--neutral a-badge--plain">{{ getBlogCategoryLabel(value) }}</span>
      </template>

      <template #cell-pdfUrl="{ item }">
        <span v-if="item.pdfUrl" class="a-badge a-badge--info a-badge--plain">
          <i class="fas fa-file-pdf" /> PDF
        </span>
        <span v-else class="a-muted">Artículo</span>
      </template>

      <template #actions="{ item }">
        <a
          :href="item.pdfUrl || `/blog/${item.slug}`"
          target="_blank"
          rel="noopener"
          class="a-btn a-btn--subtle a-btn--sm"
          :title="item.pdfUrl ? 'Abrir el PDF' : 'Ver en el sitio'"
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
        <NuxtLink :to="`/admin/blog/${item.id}`" class="a-btn a-btn--ghost a-btn--sm">
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
        <NuxtLink to="/admin/blog/new" class="a-btn a-btn--primary">
          <i class="fas fa-plus" /> Nuevo artículo
        </NuxtLink>
      </template>
    </AdminDataTable>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminDataTable from '~/components/Admin/AdminDataTable.vue'
import AdminPageHeader from '~/components/Admin/AdminPageHeader.vue'
import { BLOG_CATEGORIES, getBlogCategoryLabel } from '~/utils/blogCategories'
import { formatDate, toDateInput } from '~/utils/format'
import { slugify } from '~/utils/slugify'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useHead({ title: 'Blog · Panel Magiancestral' })

const api = useAdminApi()
const toast = useAdminToast()
const { confirm } = useAdminConfirm()

const columns = [
  { key: 'title', label: 'Artículo' },
  { key: 'date', label: 'Fecha', width: '120px' },
  { key: 'category', label: 'Categoría', width: '190px' },
  { key: 'author', label: 'Autor', width: '150px' },
  { key: 'pdfUrl', label: 'Formato', width: '110px' }
]

const { data, pending, error, refresh } = await useAsyncData(
  'admin-blog',
  () => api.get('/api/admin/blog'),
  { default: () => [] }
)

const articles = computed(() => data.value || [])
const busyId = ref(null)

const categoryFilter = ref('')
const formatFilter = ref('')

const visible = computed(() => articles.value.filter((item) => {
  if (categoryFilter.value && item.category !== categoryFilter.value) return false
  if (formatFilter.value === 'pdf' && !item.pdfUrl) return false
  if (formatFilter.value === 'article' && item.pdfUrl) return false
  return true
}))

const onDelete = async (item) => {
  const ok = await confirm({
    title: 'Borrar artículo',
    message: `¿Seguro que quieres borrar “${item.title}”?`,
    detail: 'Dejará de estar disponible en el blog. Esta acción no se puede deshacer.',
    confirmLabel: 'Borrar',
    danger: true
  })
  if (!ok) return

  busyId.value = item.id
  try {
    await api.del(`/api/admin/blog/${item.id}`)
    toast.success(`“${item.title}” se borró`)
    await refresh()
  } catch (err) {
    toast.error(adminErrorMessage(err, 'No se pudo borrar el artículo'))
  } finally {
    busyId.value = null
  }
}

const onDuplicate = async (item) => {
  busyId.value = item.id
  try {
    const full = await api.get(`/api/admin/blog/${item.id}`)
    const { id, createdAt, updatedAt, ...rest } = full

    const created = await api.post('/api/admin/blog', {
      ...rest,
      title: `${full.title} (copia)`,
      slug: uniqueSlug(slugify(`${full.slug}-copia`)),
      date: toDateInput()
    })

    toast.success('Artículo duplicado. Revisa la copia antes de publicarla.')
    await navigateTo(`/admin/blog/${created.id}`)
  } catch (err) {
    toast.error(adminErrorMessage(err, 'No se pudo duplicar el artículo'))
  } finally {
    busyId.value = null
  }
}

function uniqueSlug(base) {
  const taken = new Set(articles.value.map(a => a.slug))
  if (!taken.has(base)) return base
  let n = 2
  while (taken.has(`${base}-${n}`)) n++
  return `${base}-${n}`
}
</script>
