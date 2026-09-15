<template>
  <div class="a-stack" style="gap: 12px;">
    <div v-if="slides.length" class="a-stack" style="gap: 10px;">
      <div
        v-for="(slide, index) in slides"
        :key="`${slide.image}-${index}`"
        class="a-hero-row"
        :class="{ 'a-hero-row--on': activeIndex === index }"
      >
        <button
          type="button"
          class="a-hero-row__thumb"
          :title="`Ver la foto ${index + 1} en la vista previa`"
          @click="emit('preview', index)"
        >
          <img
            :src="slide.image"
            :alt="`Foto ${index + 1}`"
            :style="{ objectPosition: heroFocusStyle(slide) }"
            @load="registrarProporcion(slide.image, $event)"
          >
          <span class="a-hero-row__num">{{ index + 1 }}</span>
        </button>

        <div class="a-hero-row__body">
          <p class="a-hero-row__name" :title="slide.image">{{ fileName(slide.image) }}</p>

          <div class="a-hero-row__focus">
            <label class="a-hero-focus" :class="{ 'a-hero-focus--inerte': ejeInerte(slide) === 'x' }">
              <span class="a-hero-focus__label"><i class="fas fa-arrows-alt-h" /> Horizontal</span>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                class="a-range"
                :value="slide.focusX"
                @input="setFocus(index, 'focusX', $event.target.value)"
              >
              <span class="a-hero-focus__value">{{ slide.focusX }}%</span>
            </label>

            <label class="a-hero-focus" :class="{ 'a-hero-focus--inerte': ejeInerte(slide) === 'y' }">
              <span class="a-hero-focus__label"><i class="fas fa-arrows-alt-v" /> Vertical</span>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                class="a-range"
                :value="slide.focusY"
                @input="setFocus(index, 'focusY', $event.target.value)"
              >
              <span class="a-hero-focus__value">{{ slide.focusY }}%</span>
            </label>
          </div>

          <p class="a-hero-row__hint">
            <template v-if="ejeRecorte(slide) === 'y'">
              Esta foto se recorta <strong>por arriba y por abajo</strong>: manda el deslizador vertical.
            </template>
            <template v-else-if="ejeRecorte(slide) === 'x'">
              Esta foto se recorta <strong>por los lados</strong>: manda el deslizador horizontal.
            </template>
            <template v-else>
              Mueve el encuadre hacia la parte de la foto que no se puede perder (normalmente las caras).
            </template>
            <button
              v-if="slide.focusX !== 50 || slide.focusY !== 50"
              type="button"
              class="a-hero-row__reset"
              @click="resetFocus(index)"
            >
              Centrar
            </button>
          </p>
        </div>

        <div class="a-hero-row__tools">
          <button
            type="button"
            class="a-btn a-btn--subtle a-btn--sm a-btn--icon"
            title="Subir"
            :disabled="index === 0"
            @click="move(index, -1)"
          >
            <i class="fas fa-chevron-up" />
          </button>
          <button
            type="button"
            class="a-btn a-btn--subtle a-btn--sm a-btn--icon"
            title="Bajar"
            :disabled="index === slides.length - 1"
            @click="move(index, 1)"
          >
            <i class="fas fa-chevron-down" />
          </button>
          <button
            type="button"
            class="a-btn a-btn--subtle a-btn--sm a-btn--icon"
            style="color: var(--a-danger);"
            title="Quitar"
            @click="remove(index)"
          >
            <i class="fas fa-trash-alt" />
          </button>
        </div>
      </div>
    </div>

    <div v-else class="a-empty" style="padding: 26px 20px;">
      <div class="a-empty__icon"><i class="fas fa-image" /></div>
      <p class="a-empty__text">{{ emptyText }}</p>
    </div>

    <!-- El uploader escribe en un borrador; al recibir una URL la añadimos y lo vaciamos. -->
    <AdminImageUpload v-if="slides.length < max" v-model="draft" />

    <p v-else class="a-muted" style="font-size: 12px;">
      Has llegado al máximo de {{ max }} fotos. Quita alguna para poder añadir otra.
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import AdminImageUpload from './AdminImageUpload.vue'
import { HERO_MAX_SLIDES, heroCropAxis, heroFocusStyle } from '~/utils/heroSlides'

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  max: { type: Number, default: HERO_MAX_SLIDES },
  emptyText: { type: String, default: 'Todavía no hay fotos.' },
  /** Foto que está mirando la vista previa, para resaltar su fila. */
  activeIndex: { type: Number, default: -1 },
  /** Modo al que pertenece la lista; decide por qué eje recorta cada foto. */
  mode: { type: String, default: 'desktop' }
})

const emit = defineEmits(['update:modelValue', 'preview'])

const draft = ref('')

/** Proporción real de cada imagen, en cuanto el navegador la carga. */
const proporciones = ref({})

const slides = computed(() => props.modelValue || [])

function registrarProporcion(url, event) {
  const { naturalWidth: w, naturalHeight: h } = event.target
  if (w && h) proporciones.value = { ...proporciones.value, [url]: w / h }
}

/** Eje por el que esta foto se recorta en este modo ('x', 'y' o null). */
function ejeRecorte(slide) {
  const ratio = proporciones.value[slide.image]
  return ratio ? heroCropAxis(ratio, props.mode === 'mobile' ? 'mobile' : 'desktop') : null
}

/** El eje contrario al recorte no mueve nada: se muestra apagado. */
function ejeInerte(slide) {
  const eje = ejeRecorte(slide)
  if (!eje) return null
  return eje === 'x' ? 'y' : 'x'
}

watch(draft, (url) => {
  if (!url) return
  if (slides.value.length < props.max) {
    const next = [...slides.value, { image: url, focusX: 50, focusY: 50 }]
    emit('update:modelValue', next)
    // La foto recién añadida es la que interesa revisar en la vista previa.
    emit('preview', next.length - 1)
  }
  draft.value = ''
})

const fileName = (url) => {
  try {
    return decodeURIComponent(url.split('/').pop()?.split('?')[0] || url)
  } catch {
    return url
  }
}

function update(index, patch) {
  emit('update:modelValue', slides.value.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)))
}

function setFocus(index, axis, value) {
  update(index, { [axis]: Number(value) })
  emit('preview', index)
}

function resetFocus(index) {
  update(index, { focusX: 50, focusY: 50 })
  emit('preview', index)
}

function remove(index) {
  emit('update:modelValue', slides.value.filter((_, i) => i !== index))
  emit('preview', Math.max(0, index - 1))
}

function move(index, delta) {
  const target = index + delta
  if (target < 0 || target >= slides.value.length) return
  const next = [...slides.value]
  ;[next[index], next[target]] = [next[target], next[index]]
  emit('update:modelValue', next)
  emit('preview', target)
}
</script>

<style scoped>
.a-hero-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px;
  border: 1px solid var(--a-border);
  border-radius: var(--a-radius-sm);
  background: #fff;
  transition: border-color .15s ease, box-shadow .15s ease;
}

.a-hero-row--on {
  border-color: var(--a-accent);
  box-shadow: 0 0 0 1px var(--a-accent);
}

.a-hero-row__thumb {
  position: relative;
  flex: 0 0 auto;
  width: 96px;
  height: 64px;
  padding: 0;
  border: 1px solid var(--a-border);
  border-radius: 6px;
  overflow: hidden;
  background: var(--a-surface-alt);
  cursor: pointer;
}

.a-hero-row__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.a-hero-row__num {
  position: absolute;
  top: 3px;
  left: 3px;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 4px;
  background: rgba(0, 0, 0, .62);
  color: #fff;
  font-size: 10.5px;
  font-weight: 600;
  line-height: 17px;
  text-align: center;
}

.a-hero-row__body {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.a-hero-row__name {
  font-size: 12.5px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.a-hero-row__focus {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 4px 14px;
}

.a-hero-focus {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: var(--a-text-soft);
}

.a-hero-focus__label {
  flex: 0 0 auto;
  width: 74px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.a-hero-focus__value {
  flex: 0 0 auto;
  width: 34px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--a-text-mute);
}

.a-range {
  flex: 1 1 auto;
  min-width: 60px;
  height: 18px;
  padding: 0;
  margin: 0;
  accent-color: var(--a-accent);
  cursor: pointer;
}

.a-hero-focus--inerte {
  opacity: .45;
}

.a-hero-focus--inerte .a-range {
  cursor: default;
}

.a-hero-row__hint {
  font-size: 11px;
  color: var(--a-text-mute);
}

.a-hero-row__reset {
  border: none;
  background: none;
  padding: 0;
  margin-left: 4px;
  color: var(--a-accent);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

.a-hero-row__tools {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 560px) {
  .a-hero-row {
    flex-wrap: wrap;
  }

  .a-hero-row__tools {
    flex-direction: row;
  }
}
</style>
