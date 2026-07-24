<template>
  <form class="admin-form" @submit.prevent="onSubmit">
    <div class="form-row">
      <div class="form-group">
        <label>Fecha</label>
        <input v-model="form.eventDate" type="date" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Tipo</label>
        <select v-model="form.type" class="form-control" required>
          <option value="" disabled>Selecciona un tipo</option>
          <option v-for="t in EVENT_TYPES" :key="t.value" :value="t.value">{{ t.label }}</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label>Ubicación</label>
      <input v-model="form.location" type="text" class="form-control">
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
import { EVENT_TYPES, getEventTypeDescription, getEventTypeLabel, getEventTypeLogo, getEventTypeSubtitle } from '~/utils/eventTypes'
import { slugify } from '~/utils/slugify'

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  submitLabel: { type: String, default: 'Guardar' }
})

const emit = defineEmits(['submit'])

const form = reactive({
  title: '', slug: '', eventDate: '', type: '', subtitle: '', location: '', logo: '', description: ''
})

watch(() => props.initial, (val) => {
  if (!val) return
  form.title = val.title || ''
  form.slug = val.slug || ''
  form.eventDate = val.eventDate || ''
  form.type = val.type || ''
  form.subtitle = val.subtitle || ''
  form.location = val.location || ''
  form.logo = val.logo || ''
  form.description = val.description || ''
}, { immediate: true, deep: true })

watch(() => form.type, (type) => {
  form.title = getEventTypeLabel(type)
  form.logo = getEventTypeLogo(type)
  form.subtitle = getEventTypeSubtitle(type)
  form.description = getEventTypeDescription(type)
})

watch([() => form.type, () => form.eventDate], ([type, eventDate]) => {
  if (!type || !eventDate) return
  form.slug = slugify(`${eventDate}-${type}`)
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
.admin-form-error {
  color: #c0392b;
}
.admin-form-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
