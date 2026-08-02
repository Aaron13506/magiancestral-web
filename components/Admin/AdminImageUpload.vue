<template>
  <div class="a-upload">
    <div v-if="modelValue" class="a-preview">
      <img :src="modelValue" alt="Vista previa">
      <div class="a-preview__bar">
        <span class="a-preview__name">{{ fileName }}</span>
        <a :href="modelValue" target="_blank" rel="noopener" class="a-btn a-btn--subtle a-btn--sm" title="Abrir en una pestaña nueva">
          <i class="fas fa-external-link-alt" />
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
        <i v-else class="fas fa-cloud-upload-alt" />
      </div>
      <p class="a-dropzone__text">
        <template v-if="uploading">Subiendo imagen…</template>
        <template v-else><strong>Haz clic para subir</strong> o arrastra una imagen aquí</template>
      </p>
      <p class="a-dropzone__hint">JPG, PNG, WebP, GIF o SVG · máximo 8 MB</p>
    </div>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      style="display: none;"
      @change="onFileChange"
    >

    <div v-if="!modelValue" class="a-inline">
      <button type="button" class="a-btn a-btn--ghost a-btn--sm" @click="pickerOpen = true">
        <i class="fas fa-images" /> Elegir de la biblioteca
      </button>
      <button type="button" class="a-btn a-btn--subtle a-btn--sm" @click="urlMode = !urlMode">
        <i class="fas fa-link" /> Pegar una URL
      </button>
    </div>

    <div v-if="urlMode && !modelValue" class="a-inline">
      <input
        v-model="urlDraft"
        type="text"
        class="a-input a-grow"
        placeholder="https://…  o  /assets/images/…"
        @keydown.enter.prevent="applyUrl"
      >
      <button type="button" class="a-btn a-btn--ghost a-btn--sm" :disabled="!urlDraft.trim()" @click="applyUrl">
        Usar
      </button>
    </div>

    <p v-if="error" class="a-field__error">{{ error }}</p>

    <AdminMediaPicker
      v-if="pickerOpen"
      kind="image"
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

const MAX_BYTES = 8 * 1024 * 1024

const api = useAdminApi()

const fileInput = ref(null)
const uploading = ref(false)
const dragging = ref(false)
const pickerOpen = ref(false)
const urlMode = ref(false)
const urlDraft = ref('')
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

const applyUrl = () => {
  const value = urlDraft.value.trim()
  if (!value) return
  emit('update:modelValue', value)
  urlDraft.value = ''
  urlMode.value = false
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
  if (!file.type.startsWith('image/')) {
    error.value = 'El archivo debe ser una imagen'
    return
  }
  if (file.size > MAX_BYTES) {
    error.value = 'La imagen supera el tamaño máximo permitido (8 MB)'
    return
  }

  uploading.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('file', file)
    const result = await api.post('/api/admin/uploads/image', formData)
    emit('update:modelValue', result.url)
  } catch (err) {
    error.value = adminErrorMessage(err, 'No se pudo subir la imagen')
  } finally {
    uploading.value = false
  }
}
</script>
