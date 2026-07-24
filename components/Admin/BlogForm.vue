<template>
  <form class="admin-form" @submit.prevent="onSubmit">
    <div class="form-row">
      <div class="form-group">
        <label>Título</label>
        <input v-model="form.title" type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Slug <span class="admin-form-hint">(automático)</span></label>
        <input :value="form.slug" type="text" class="form-control" disabled>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Fecha</label>
        <input v-model="form.date" type="date" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Categoría</label>
        <select v-model="form.category" class="form-control" required>
          <option value="estudios-cientificos">Estudios científicos</option>
          <option value="reflexiones-del-espiritu">Reflexiones del espíritu</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label>Autor</label>
      <input v-model="form.author" type="text" class="form-control">
    </div>

    <div class="form-group">
      <label>PDF (opcional — si se define, el artículo enlaza directo al PDF en vez de mostrar la página)</label>
      <AdminDocumentUpload v-model="form.pdfUrl" />
    </div>

    <div class="form-group">
      <label>Imagen</label>
      <AdminImageUpload v-model="form.image" />
    </div>

    <div class="form-group">
      <label>Descripción</label>
      <textarea v-model="form.description" class="form-control" rows="3" />
    </div>

    <div class="form-group">
      <label>Contenido</label>
      <RichTextEditor v-model="form.content" />
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
import { reactive, watch } from 'vue'
import AdminImageUpload from './AdminImageUpload.vue'
import AdminDocumentUpload from './AdminDocumentUpload.vue'
import RichTextEditor from './RichTextEditor.client.vue'
import { slugify } from '~/utils/slugify'

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  submitLabel: { type: String, default: 'Guardar' }
})

const emit = defineEmits(['submit'])

const form = reactive({
  title: '', slug: '', date: '', category: 'estudios-cientificos', author: '',
  pdfUrl: '', image: '', description: '', content: ''
})

watch(() => props.initial, (val) => {
  if (!val) return
  form.title = val.title || ''
  form.slug = val.slug || ''
  form.date = val.date || ''
  form.category = val.category || 'estudios-cientificos'
  form.author = val.author || ''
  form.pdfUrl = val.pdfUrl || ''
  form.image = val.image || ''
  form.description = val.description || ''
  form.content = val.content || ''
}, { immediate: true, deep: true })

watch(() => form.title, (val) => {
  if (props.initial?.id) return
  form.slug = slugify(val)
})

const onSubmit = () => {
  emit('submit', { ...form })
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
