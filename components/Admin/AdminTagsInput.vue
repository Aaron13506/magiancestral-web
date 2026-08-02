<template>
  <div>
    <div v-if="tags.length" class="a-inline" style="margin-bottom: 8px;">
      <span v-for="(tag, index) in tags" :key="`${tag}-${index}`" class="a-badge a-badge--gold a-badge--plain">
        {{ tag }}
        <button
          type="button"
          style="background: none; border: none; padding: 0 0 0 4px; color: inherit; cursor: pointer; font-size: 13px; line-height: 1;"
          :aria-label="`Quitar ${tag}`"
          @click="remove(index)"
        >×</button>
      </span>
    </div>

    <div class="a-inline">
      <input
        v-model="draft"
        type="text"
        class="a-input a-grow"
        :placeholder="placeholder"
        @keydown.enter.prevent="add"
        @keydown="onSeparator"
        @blur="add"
      >
      <button type="button" class="a-btn a-btn--ghost a-btn--sm" :disabled="!draft.trim()" @click="add">
        <i class="fas fa-plus" /> Añadir
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Escribe y pulsa Enter…' }
})

const emit = defineEmits(['update:modelValue'])

const draft = ref('')
const tags = computed(() => props.modelValue || [])

// La coma también cierra la etiqueta: es como se pegan listas desde otro sitio.
const onSeparator = (event) => {
  if (event.key === ',') {
    event.preventDefault()
    add()
  }
}

function add() {
  const value = draft.value.trim().replace(/,$/, '').trim()
  draft.value = ''
  if (!value || tags.value.includes(value)) return
  emit('update:modelValue', [...tags.value, value])
}

function remove(index) {
  emit('update:modelValue', tags.value.filter((_, i) => i !== index))
}
</script>
