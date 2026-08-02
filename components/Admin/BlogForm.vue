<template>
  <form class="a-form" novalidate @submit.prevent="onSubmit">
    <div v-if="error" class="a-alert a-alert--error">
      <i class="fas fa-exclamation-triangle" />
      <span>{{ error }}</span>
    </div>

    <div class="a-form__grid">
      <!-- Columna principal -->
      <div class="a-form__col">
        <AdminFieldset title="Artículo">
          <div class="a-field">
            <label class="a-field__label" for="b-title">Título <span class="a-field__req">*</span></label>
            <input
              id="b-title"
              v-model="form.title"
              type="text"
              class="a-input"
              :class="{ 'a-input--invalid': errors.title }"
              placeholder="Título del artículo"
            >
            <span v-if="errors.title" class="a-field__error">{{ errors.title }}</span>
          </div>

          <div class="a-field">
            <label class="a-field__label" for="b-slug">
              URL del artículo <span class="a-field__req">*</span>
              <button type="button" class="a-btn a-btn--subtle a-btn--sm" @click="slugLocked = !slugLocked">
                <i :class="slugLocked ? 'fas fa-edit' : 'fas fa-check'" />
                {{ slugLocked ? 'Editar' : 'Listo' }}
              </button>
            </label>
            <div class="a-input-group">
              <span class="a-input-group__addon">/blog/</span>
              <input
                id="b-slug"
                v-model="form.slug"
                type="text"
                class="a-input a-mono"
                :class="{ 'a-input--invalid': errors.slug }"
                :disabled="slugLocked"
                @blur="form.slug = slugify(form.slug)"
              >
            </div>
            <span v-if="errors.slug" class="a-field__error">{{ errors.slug }}</span>
          </div>

          <div class="a-field">
            <label class="a-field__label" for="b-desc">
              Descripción
              <span class="a-field__hint">{{ form.description.length }}/200</span>
            </label>
            <textarea
              id="b-desc"
              v-model="form.description"
              class="a-textarea"
              rows="3"
              maxlength="200"
              placeholder="Resumen que se muestra en el listado del blog"
            />
          </div>
        </AdminFieldset>

        <AdminFieldset
          v-if="!isPdfArticle"
          title="Contenido"
          description="Se publica tal cual en la página del artículo."
        >
          <RichTextEditor v-model="form.content" />
        </AdminFieldset>

        <div v-else class="a-alert a-alert--info">
          <i class="fas fa-file-pdf" />
          <span>
            Este artículo enlaza directamente al PDF, así que no se publica una página con contenido.
            Quita el PDF si quieres escribir el artículo dentro del sitio.
          </span>
        </div>
      </div>

      <!-- Columna lateral -->
      <div class="a-form__col">
        <AdminFieldset title="Publicación">
          <div class="a-field">
            <label class="a-field__label" for="b-date">Fecha <span class="a-field__req">*</span></label>
            <input
              id="b-date"
              v-model="form.date"
              type="date"
              class="a-input"
              :class="{ 'a-input--invalid': errors.date }"
            >
            <span v-if="errors.date" class="a-field__error">{{ errors.date }}</span>
            <span v-else class="a-field__hint">Ordena el listado del blog, de más reciente a más antiguo.</span>
          </div>

          <div class="a-field">
            <label class="a-field__label" for="b-cat">Categoría <span class="a-field__req">*</span></label>
            <select id="b-cat" v-model="form.category" class="a-select">
              <option v-for="cat in BLOG_CATEGORIES" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
            </select>
          </div>

          <div class="a-field">
            <label class="a-field__label" for="b-author">Autor</label>
            <input id="b-author" v-model="form.author" type="text" class="a-input" placeholder="Nombre de quien firma">
          </div>
        </AdminFieldset>

        <AdminFieldset title="Imagen de portada">
          <AdminImageUpload v-model="form.image" />
        </AdminFieldset>

        <AdminFieldset
          title="PDF adjunto"
          description="Opcional. Si defines un PDF, el listado enlaza directo al archivo en vez de abrir la página del artículo."
        >
          <AdminDocumentUpload v-model="form.pdfUrl" />
        </AdminFieldset>
      </div>
    </div>

    <div class="a-formbar">
      <button type="submit" class="a-btn a-btn--primary" :disabled="loading">
        <i v-if="loading" class="a-spinner" />
        {{ loading ? 'Guardando…' : submitLabel }}
      </button>
      <NuxtLink to="/admin/blog" class="a-btn a-btn--ghost">Cancelar</NuxtLink>
      <span v-if="dirty" class="a-muted" style="font-size: 12px;">Cambios sin guardar</span>
      <span class="a-formbar__spacer" />
      <slot name="extra-actions" />
    </div>
  </form>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import AdminDocumentUpload from './AdminDocumentUpload.vue'
import AdminFieldset from './AdminFieldset.vue'
import AdminImageUpload from './AdminImageUpload.vue'
import RichTextEditor from './RichTextEditor.client.vue'
import { BLOG_CATEGORIES } from '~/utils/blogCategories'
import { toDateInput } from '~/utils/format'
import { slugify } from '~/utils/slugify'

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  submitLabel: { type: String, default: 'Guardar' }
})

const emit = defineEmits(['submit', 'dirty'])

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const blank = () => ({
  title: '', slug: '', date: toDateInput(), category: 'estudios-cientificos',
  author: '', pdfUrl: '', image: '', description: '', content: ''
})

const form = reactive(blank())
const errors = reactive({})
const slugLocked = ref(true)
const baseline = ref(JSON.stringify(blank()))

const isEdit = computed(() => Boolean(props.initial?.id))
const isPdfArticle = computed(() => Boolean(form.pdfUrl))

watch(() => props.initial, (val) => {
  const next = blank()
  if (val) {
    Object.assign(next, {
      title: val.title || '',
      slug: val.slug || '',
      // La columna es `date`, así que llega como 'YYYY-MM-DD'; recortamos por si
      // algún registro trajera hora.
      date: val.date ? String(val.date).slice(0, 10) : toDateInput(),
      category: val.category || 'estudios-cientificos',
      author: val.author || '',
      pdfUrl: val.pdfUrl || '',
      image: val.image || '',
      description: val.description || '',
      content: val.content || ''
    })
  }
  Object.assign(form, next)
  baseline.value = JSON.stringify(next)
}, { immediate: true, deep: true })

watch(() => form.title, (value) => {
  if (isEdit.value || !slugLocked.value) return
  form.slug = slugify(value)
})

const dirty = computed(() => JSON.stringify({ ...form }) !== baseline.value)
watch(dirty, (value) => emit('dirty', value), { immediate: true })

function validate() {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.title.trim()) errors.title = 'El título es obligatorio'
  if (!form.slug) errors.slug = 'La URL es obligatoria'
  else if (!SLUG_RE.test(form.slug)) errors.slug = 'Solo minúsculas, números y guiones (sin acentos ni espacios)'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date)) errors.date = 'Indica una fecha válida'

  return Object.keys(errors).length === 0
}

const onSubmit = () => {
  if (!validate()) {
    document.querySelector('.a-input--invalid, .a-select--invalid')?.focus()
    return
  }
  emit('submit', { ...form, title: form.title.trim() })
}

defineExpose({
  markSaved: () => { baseline.value = JSON.stringify({ ...form }) }
})
</script>
