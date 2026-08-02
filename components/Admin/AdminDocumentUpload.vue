<template>
  <div class="a-upload">
    <div v-if="modelValue" class="a-preview">
      <div class="a-preview__bar" style="border-top: none;">
        <i class="fas fa-file-pdf" style="color: var(--a-danger); font-size: 17px;" />
        <span class="a-preview__name">{{ fileName }}</span>
        <a :href="modelValue" target="_blank" rel="noopener" class="a-btn a-btn--subtle a-btn--sm">
          <i class="fas fa-eye" /> Ver
        </a>
        <button type="button" class="a-btn a-btn--subtle a-btn--sm" @click="pickerOpen = true">
          <i class="fas fa-images" /> Cambiar
        </button>
        <button type="button" class="a-btn a-btn--subtle a-btn--sm" style="color: var(--a-danger);" title="Quitar" @click="clear">
          <i class="fas fa-trash-alt" />
        </button>
      </div>
    </div>

    <div
      v-else
      class="a-dropzone"
      :class="{ 'a-dropzone--over': dragging }"
      role="button"
      tabindex="0"
      @click="fileInput?.click()"
      @keydown.enter.prevent="fileInput?.click()"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop.prevent="onDrop"
    >
      <div class="a-dropzone__icon">
        <i v-if="uploading" class="a-spinner" />
        <i v-else class="fas fa-file-pdf" />
      </div>
      <p class="a-dropzone__text">
        <template v-if="uploading">Subiendo documento…</template>
        <template v-else><strong>Haz clic para subir</strong> o arrastra un PDF aquí</template>
      </p>
      <p class="a-dropzone__hint">Solo PDF · máximo 20 MB</p>
    </div>

    <input ref="fileInput" type="file" accept="application/pdf" style="display: none;" @change="onFileChange">

    <div v-if="!modelValue" class="a-inline">
      <button type="button" class="a-btn a-btn--ghost a-btn--sm" @click="pickerOpen = true">
        <i class="fas fa-folder-open" /> Elegir de la biblioteca
      </button>
    </div>

    <p v-if="error" class="a-field__error">{{ error }}</p>

    <AdminMediaPicker
      v-if="pickerOpen"
      kind="document"
      @close="pickerOpen = false"
      @select="onPick"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AdminMediaPicker from './AdminMediaPicker.vue'

const props = defineProps({
  modelValue: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const MAX_BYTES = 20 * 1024 * 1024

const api = useAdminApi()

const fileInput = ref(null)
const uploading = ref(false)
const dragging = ref(false)
const pickerOpen = ref(false)
const error = ref('')

const fileName = computed(() => {
  try {
    return decodeURIComponent(props.modelValue.split('/').pop()?.split('?')[0] || props.modelValue)
  } catch {
    return props.modelValue
  }
})

const clear = () => {
  emit('update:modelValue', '')
  error.value = ''
}

const onPick = (url) => {
  emit('update:modelValue', url)
  error.value = ''
}

const onFileChange = (event) => {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (file) upload(file)
}

const onDrop = (event) => {
  dragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) upload(file)
}

async function upload(file) {
  if (file.type !== 'application/pdf') {
    error.value = 'Solo se permiten archivos PDF'
    return
  }
  if (file.size > MAX_BYTES) {
    error.value = 'El documento supera el tamaño máximo permitido (20 MB)'
    return
  }

  uploading.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('file', file)
    const result = await api.post('/api/admin/uploads/document', formData)
    emit('update:modelValue', result.url)
  } catch (err) {
    error.value = adminErrorMessage(err, 'No se pudo subir el documento')
  } finally {
    uploading.value = false
  }
}
</script>
