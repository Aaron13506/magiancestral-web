<template>
  <div class="admin-image-upload">
    <div v-if="modelValue" class="admin-image-preview-wrap">
      <img :src="modelValue" alt="" class="admin-image-preview">
      <button type="button" class="admin-image-remove" @click="$emit('update:modelValue', '')">Quitar</button>
    </div>
    <input type="file" accept="image/*" :disabled="uploading" @change="onFileChange">
    <p v-if="uploading" class="admin-image-status">Subiendo imagen…</p>
    <p v-if="error" class="admin-image-error">{{ error }}</p>
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
    const result = await $fetch('/api/admin/uploads/image', {
      method: 'POST',
      body: formData
    })
    emit('update:modelValue', result.url)
  } catch (err) {
    error.value = err?.data?.message || 'No se pudo subir la imagen'
  } finally {
    uploading.value = false
    event.target.value = ''
  }
}
</script>

<style scoped>
.admin-image-upload {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
}
.admin-image-preview-wrap {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.admin-image-preview {
  max-width: 200px;
  max-height: 150px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ddd;
}
.admin-image-remove {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 10px;
  font-size: 0.82rem;
  color: #c0392b;
  cursor: pointer;
}
.admin-image-remove:hover {
  border-color: #c0392b;
  background: #fdf1f0;
}
.admin-image-status {
  color: #666;
  margin: 0;
}
.admin-image-error {
  color: #c0392b;
  margin: 0;
}
</style>
