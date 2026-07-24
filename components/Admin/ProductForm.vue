<template>
  <form class="admin-form" @submit.prevent="onSubmit">
    <div class="form-row">
      <div class="form-group">
        <label>Nombre</label>
        <input v-model="form.name" type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Slug <span class="admin-form-hint">(automático)</span></label>
        <input :value="form.slug" type="text" class="form-control" disabled>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Nombre corto</label>
        <input v-model="form.shortName" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>Categoría</label>
        <input v-model="form.category" type="text" class="form-control">
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Precio</label>
        <input v-model.number="form.price" type="number" step="0.01" min="0" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Moneda</label>
        <input v-model="form.currency" type="text" class="form-control">
      </div>
    </div>

    <div class="form-group">
      <label>Imagen principal</label>
      <AdminImageUpload v-model="form.image" />
    </div>

    <div class="form-group">
      <label>Galería de imágenes adicionales</label>
      <div v-if="galleryUrls.length" class="admin-gallery-list">
        <div v-for="(url, idx) in galleryUrls" :key="url + idx" class="admin-gallery-item">
          <img :src="url" alt="">
          <button type="button" class="admin-gallery-remove" @click="removeGalleryImage(idx)">×</button>
        </div>
      </div>
      <AdminImageUpload v-model="newGalleryImage" />
      <button type="button" class="btn btn-sm btn-outline-secondary" :disabled="!newGalleryImage" @click="addGalleryImage">
        Agregar a la galería
      </button>
    </div>

    <div class="form-group">
      <label>Descripción</label>
      <textarea v-model="form.description" class="form-control" rows="3" />
    </div>

    <div class="form-group">
      <label>Contenido <span class="admin-form-hint">(ej. "30ml", "50 cápsulas" — se muestra tal cual, sin formato)</span></label>
      <input v-model="form.content" type="text" class="form-control">
    </div>

    <div class="form-group">
      <label>Modo de uso</label>
      <textarea v-model="form.usage" class="form-control" rows="3" />
    </div>

    <div class="form-group">
      <label>Ingredientes</label>
      <textarea v-model="form.ingredients" class="form-control" rows="3" />
    </div>

    <div class="form-group">
      <label>Precauciones</label>
      <textarea v-model="form.precautions" class="form-control" rows="3" />
    </div>

    <div class="form-group">
      <label>Beneficios (separados por coma)</label>
      <input v-model="form.benefitsText" type="text" class="form-control">
    </div>

    <div class="form-row admin-form-checks">
      <label><input v-model="form.inStock" type="checkbox"> En stock</label>
      <label><input v-model="form.featured" type="checkbox"> Destacado</label>
      <label><input v-model="form.topProduct" type="checkbox"> Producto top</label>
      <label><input v-model="form.artisanal" type="checkbox"> Artesanal</label>
    </div>

    <p v-if="error" class="admin-form-error">{{ error }}</p>

    <div class="admin-form-actions">
      <button type="submit" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Guardando…' : submitLabel }}
      </button>
      <slot name="extra-actions" />
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import AdminImageUpload from './AdminImageUpload.vue'
import { slugify } from '~/utils/slugify'

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  submitLabel: { type: String, default: 'Guardar' }
})

const emit = defineEmits(['submit'])

const form = reactive({
  name: '', slug: '', shortName: '', price: 0, currency: 'USD', image: '', category: '',
  description: '', content: '', usage: '', ingredients: '', precautions: '', benefitsText: '',
  inStock: true, featured: false, topProduct: false, artisanal: false
})

const galleryUrls = ref([])
const newGalleryImage = ref('')

const addGalleryImage = () => {
  if (newGalleryImage.value && !galleryUrls.value.includes(newGalleryImage.value)) {
    galleryUrls.value.push(newGalleryImage.value)
  }
  newGalleryImage.value = ''
}

const removeGalleryImage = (idx) => {
  galleryUrls.value.splice(idx, 1)
}

watch(() => props.initial, (val) => {
  if (!val) return
  form.name = val.name || ''
  form.slug = val.slug || ''
  form.shortName = val.shortName || ''
  form.price = val.price ?? 0
  form.currency = val.currency || 'USD'
  form.image = val.image || ''
  galleryUrls.value = Array.isArray(val.gallery) ? [...val.gallery] : []
  form.category = val.category || ''
  form.description = val.description || ''
  form.content = val.content || ''
  form.usage = val.usage || ''
  form.ingredients = val.ingredients || ''
  form.precautions = val.precautions || ''
  form.benefitsText = Array.isArray(val.benefits) ? val.benefits.join(', ') : ''
  form.inStock = val.inStock ?? true
  form.featured = val.featured ?? false
  form.topProduct = val.topProduct ?? false
  form.artisanal = val.artisanal ?? false
}, { immediate: true, deep: true })

watch(() => form.name, (val) => {
  if (props.initial?.id) return
  form.slug = slugify(val)
})

const onSubmit = () => {
  const { benefitsText, ...rest } = form
  emit('submit', {
    ...rest,
    benefits: benefitsText.split(',').map(b => b.trim()).filter(Boolean),
    gallery: galleryUrls.value
  })
}
</script>

<style scoped>
.admin-form {
  background: #fff;
  padding: 25px;
  border-radius: 6px;
  max-width: 720px;
}
.form-row {
  display: flex;
  gap: 20px;
}
.form-row .form-group {
  flex: 1;
}
.admin-gallery-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
}
.admin-gallery-item {
  position: relative;
  width: 80px;
  height: 80px;
}
.admin-gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.admin-gallery-remove {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: #c0392b;
  color: #fff;
  line-height: 1;
  cursor: pointer;
}
.admin-form-checks {
  gap: 25px;
  align-items: center;
  margin-bottom: 20px;
}
.admin-form-checks label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: normal;
}
.admin-form-hint {
  font-weight: normal;
  font-size: 0.8em;
  color: #999;
}
.admin-form-error {
  color: #c0392b;
}
.admin-form-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
