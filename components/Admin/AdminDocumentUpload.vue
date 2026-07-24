<template>
  <div class="admin-document-upload">
    <div v-if="modelValue" class="admin-document-current">
      <a :href="modelValue" target="_blank" rel="noopener" class="admin-document-link">📄 Ver PDF actual</a>
      <button type="button" class="admin-document-remove" @click="emit('update:modelValue', '')">Quitar</button>
    </div>
    <input type="file" accept="application/pdf" :disabled="uploading" @change="onFileChange">
    <p v-if="uploading" class="admin-document-status">Subiendo documento…</p>
    <p v-if="error" class="admin-document-error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const uploading = ref(false)
const error = ref('')

const onFileChange = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  uploading.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('file', file)
    const result = await $fetch('/api/admin/uploads/document', {
      method: 'POST',
      body: formData
    })
    emit('update:modelValue', result.url)
  } catch (err) {
    error.value = err?.data?.message || 'No se pudo subir el documento'
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}
</script>

<style scoped>
.admin-document-upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
}
.admin-document-current {
  display: flex;
  align-items: center;
  gap: 10px;
}
.admin-document-link {
  align-self: flex-start;
}
.admin-document-remove {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 0.82rem;
  color: #c0392b;
  cursor: pointer;
}
.admin-document-remove:hover {
  border-color: #c0392b;
  background: #fdf1f0;
}
.admin-document-status {
  color: #666;
  margin: 0;
}
.admin-document-error {
  color: #c0392b;
  margin: 0;
}
</style>
