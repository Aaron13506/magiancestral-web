<template>
  <div class="a-stack" style="gap: 12px;">
    <div v-if="images.length" class="a-gallery">
      <div v-for="(url, index) in images" :key="`${url}-${index}`" class="a-gallery__item">
        <img :src="url" :alt="`Imagen ${index + 1}`">
        <div class="a-gallery__tools">
          <button
            type="button"
            class="a-gallery__tool"
            title="Mover a la izquierda"
            :disabled="index === 0"
            @click="move(index, -1)"
          >
            <i class="fas fa-chevron-left" />
          </button>
          <button
            type="button"
            class="a-gallery__tool"
            title="Mover a la derecha"
            :disabled="index === images.length - 1"
            @click="move(index, 1)"
          >
            <i class="fas fa-chevron-right" />
          </button>
          <button type="button" class="a-gallery__tool a-gallery__tool--danger" title="Quitar" @click="remove(index)">
            <i class="fas fa-times" />
          </button>
        </div>
      </div>
    </div>

    <p v-else class="a-muted" style="font-size: 12.5px;">
      Sin imágenes adicionales. La galería se muestra en la ficha del producto junto a la imagen principal.
    </p>

    <!-- El uploader escribe en un borrador; al recibir una URL la añadimos y lo vaciamos. -->
    <AdminImageUpload v-model="draft" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import AdminImageUpload from './AdminImageUpload.vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const draft = ref('')

const images = computed(() => props.modelValue || [])

watch(draft, (url) => {
  if (!url) return
  if (!images.value.includes(url)) {
    emit('update:modelValue', [...images.value, url])
  }
  draft.value = ''
})

function remove(index) {
  emit('update:modelValue', images.value.filter((_, i) => i !== index))
}

function move(index, delta) {
  const target = index + delta
  if (target < 0 || target >= images.value.length) return
  const next = [...images.value]
  ;[next[index], next[target]] = [next[target], next[index]]
  emit('update:modelValue', next)
}
</script>
