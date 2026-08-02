<template>
  <form class="a-form" novalidate @submit.prevent="onSubmit">
    <div v-if="error" class="a-alert a-alert--error">
      <i class="fas fa-exclamation-triangle" />
      <span>{{ error }}</span>
    </div>

    <div class="a-form__grid">
      <!-- Columna principal -->
      <div class="a-form__col">
        <AdminFieldset title="Tipo de encuentro" description="Define el logo, el título y la descripción que verá el público.">
          <div class="a-field">
            <label class="a-field__label">Medicina o actividad <span class="a-field__req">*</span></label>
            <div class="a-typegrid">
              <button
                v-for="type in EVENT_TYPES"
                :key="type.value"
                type="button"
                class="a-typecard"
                :class="{ 'a-typecard--on': form.type === type.value }"
                @click="selectType(type.value)"
              >
                <img :src="type.logo" :alt="type.label">
                <span>
                  <strong>{{ type.label }}</strong>
                  <em>{{ type.subtitle }}</em>
                </span>
              </button>
            </div>
            <span v-if="errors.type" class="a-field__error">{{ errors.type }}</span>
          </div>
        </AdminFieldset>

        <AdminFieldset title="Textos" description="Se rellenan solos según el tipo. Edítalos si este encuentro concreto necesita algo distinto.">
          <div class="a-field">
            <label class="a-field__label" for="e-title">
              Título <span class="a-field__req">*</span>
              <span v-if="isCustom('title')" class="a-badge a-badge--info a-badge--plain">personalizado</span>
            </label>
            <div class="a-inline">
              <input
                id="e-title"
                v-model="form.title"
                type="text"
                class="a-input a-grow"
                :class="{ 'a-input--invalid': errors.title }"
              >
              <button
                v-if="isCustom('title')"
                type="button"
                class="a-btn a-btn--subtle a-btn--sm"
                title="Volver al texto por defecto del tipo"
                @click="resetField('title')"
              >
                <i class="fas fa-undo" />
              </button>
            </div>
            <span v-if="errors.title" class="a-field__error">{{ errors.title }}</span>
          </div>

          <div class="a-field">
            <label class="a-field__label" for="e-subtitle">
              Subtítulo
              <span v-if="isCustom('subtitle')" class="a-badge a-badge--info a-badge--plain">personalizado</span>
            </label>
            <div class="a-inline">
              <input id="e-subtitle" v-model="form.subtitle" type="text" class="a-input a-grow">
              <button
                v-if="isCustom('subtitle')"
                type="button"
                class="a-btn a-btn--subtle a-btn--sm"
                title="Volver al texto por defecto del tipo"
                @click="resetField('subtitle')"
              >
                <i class="fas fa-undo" />
              </button>
            </div>
          </div>

          <div class="a-field">
            <label class="a-field__label" for="e-desc">
              Descripción
              <span v-if="isCustom('description')" class="a-badge a-badge--info a-badge--plain">personalizada</span>
            </label>
            <textarea id="e-desc" v-model="form.description" class="a-textarea" rows="6" />
            <button
              v-if="isCustom('description')"
              type="button"
              class="a-btn a-btn--subtle a-btn--sm"
              style="align-self: flex-start;"
              @click="resetField('description')"
            >
              <i class="fas fa-undo" /> Restaurar descripción por defecto
            </button>
          </div>
        </AdminFieldset>
      </div>

      <!-- Columna lateral -->
      <div class="a-form__col">
        <AdminFieldset title="Cuándo y dónde">
          <div class="a-field">
            <label class="a-field__label" for="e-date">Fecha <span class="a-field__req">*</span></label>
            <input
              id="e-date"
              v-model="form.eventDate"
              type="date"
              class="a-input"
              :class="{ 'a-input--invalid': errors.eventDate }"
            >
            <span v-if="errors.eventDate" class="a-field__error">{{ errors.eventDate }}</span>
            <span v-else-if="dateHint" class="a-field__hint">{{ dateHint }}</span>
          </div>

          <div class="a-field">
            <label class="a-field__label" for="e-loc">Ubicación</label>
            <input id="e-loc" v-model="form.location" type="text" class="a-input" placeholder="Ej. Colonia Tovar, Aragua">
          </div>

          <div class="a-field">
            <label class="a-field__label" for="e-slug">
              Identificador
              <button type="button" class="a-btn a-btn--subtle a-btn--sm" @click="slugLocked = !slugLocked">
                <i :class="slugLocked ? 'fas fa-edit' : 'fas fa-check'" />
                {{ slugLocked ? 'Editar' : 'Listo' }}
              </button>
            </label>
            <input
              id="e-slug"
              v-model="form.slug"
              type="text"
              class="a-input a-mono"
              :class="{ 'a-input--invalid': errors.slug }"
              :disabled="slugLocked"
              @blur="form.slug = slugify(form.slug)"
            >
            <span v-if="errors.slug" class="a-field__error">{{ errors.slug }}</span>
            <span v-else class="a-field__hint">
              Se genera con la fecha y el tipo. Edítalo solo si hay dos encuentros del mismo tipo el mismo día.
            </span>
          </div>
        </AdminFieldset>

        <AdminFieldset title="Logo" description="Por defecto usa el del tipo de medicina.">
          <AdminImageUpload v-model="form.logo" />
        </AdminFieldset>
      </div>
    </div>

    <div class="a-formbar">
      <button type="submit" class="a-btn a-btn--primary" :disabled="loading">
        <i v-if="loading" class="a-spinner" />
        {{ loading ? 'Guardando…' : submitLabel }}
      </button>
      <NuxtLink to="/admin/events" class="a-btn a-btn--ghost">Cancelar</NuxtLink>
      <span v-if="dirty" class="a-muted" style="font-size: 12px;">Cambios sin guardar</span>
      <span class="a-formbar__spacer" />
      <slot name="extra-actions" />
    </div>
  </form>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import AdminFieldset from './AdminFieldset.vue'
import AdminImageUpload from './AdminImageUpload.vue'
import { EVENT_TYPES, getEventType } from '~/utils/eventTypes'
import { daysUntil, toDateInput } from '~/utils/format'
import { slugify } from '~/utils/slugify'

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  submitLabel: { type: String, default: 'Guardar' }
})

const emit = defineEmits(['submit', 'dirty'])

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const blank = () => ({
  title: '', slug: '', eventDate: '', type: '', subtitle: '', location: '', logo: '', description: ''
})

const form = reactive(blank())
const errors = reactive({})
const slugLocked = ref(true)
const baseline = ref(JSON.stringify(blank()))

const isEdit = computed(() => Boolean(props.initial?.id))

/** Textos por defecto de un tipo, ya mapeados a los campos del formulario. */
function typeDefaults(value) {
  const def = getEventType(value)
  if (!def) return null
  return {
    title: def.label || '',
    subtitle: def.subtitle || '',
    description: def.description || '',
    logo: def.logo || ''
  }
}

const defaults = computed(() => typeDefaults(form.type))

watch(() => props.initial, (val) => {
  const next = blank()
  if (val) {
    Object.assign(next, {
      title: val.title || '',
      slug: val.slug || '',
      eventDate: val.eventDate ? String(val.eventDate).slice(0, 10) : (val.eventDate ?? ''),
      type: val.type || '',
      subtitle: val.subtitle || '',
      location: val.location || '',
      logo: val.logo || '',
      description: val.description || ''
    })
  }
  Object.assign(form, next)
  baseline.value = JSON.stringify(next)
}, { immediate: true, deep: true })

/**
 * Cambiar de tipo sustituye los textos por los del tipo nuevo, pero solo si el
 * usuario no los había personalizado. La versión anterior los pisaba siempre,
 * incluso al abrir un evento ya guardado, y se perdían sus textos propios.
 */
function selectType(value) {
  const previous = typeDefaults(form.type)
  const next = typeDefaults(value)
  if (!next) return

  for (const field of ['title', 'subtitle', 'description', 'logo']) {
    const current = form[field] || ''
    const wasDefault = !current || current === (previous?.[field] || '')
    if (wasDefault) form[field] = next[field]
  }

  form.type = value
}

const isCustom = (field) => Boolean(defaults.value) && (form[field] || '') !== defaults.value[field]

const resetField = (field) => {
  if (defaults.value) form[field] = defaults.value[field]
}

// El identificador solo se autogenera para eventos nuevos con el campo bloqueado.
watch([() => form.type, () => form.eventDate], ([type, eventDate]) => {
  if (isEdit.value || !slugLocked.value) return
  if (!type || !eventDate) return
  form.slug = slugify(`${eventDate}-${type}`)
})

const dateHint = computed(() => {
  const days = daysUntil(form.eventDate)
  if (days == null) return ''
  if (days === 0) return 'Es hoy.'
  if (days > 0) return `Faltan ${days} ${days === 1 ? 'día' : 'días'}.`
  return `Ya pasó hace ${Math.abs(days)} ${Math.abs(days) === 1 ? 'día' : 'días'}; no aparecerá entre los próximos encuentros.`
})

const dirty = computed(() => JSON.stringify({ ...form }) !== baseline.value)
watch(dirty, (value) => emit('dirty', value), { immediate: true })

function validate() {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.type) errors.type = 'Elige el tipo de encuentro'
  if (!form.title.trim()) errors.title = 'El título es obligatorio'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.eventDate)) errors.eventDate = 'Indica una fecha válida'
  if (!form.slug) errors.slug = 'El identificador es obligatorio'
  else if (!SLUG_RE.test(form.slug)) errors.slug = 'Solo minúsculas, números y guiones'

  return Object.keys(errors).length === 0
}

const onSubmit = () => {
  // Si el usuario nunca tocó la fecha (evento nuevo abierto sin `?date=`),
  // el slug puede seguir vacío: lo completamos antes de validar.
  if (!form.slug && form.type && form.eventDate) {
    form.slug = slugify(`${form.eventDate}-${form.type}`)
  }
  if (!validate()) {
    document.querySelector('.a-input--invalid')?.focus()
    return
  }
  emit('submit', { ...form, title: form.title.trim() })
}

defineExpose({
  markSaved: () => { baseline.value = JSON.stringify({ ...form }) },
  /** Preselecciona la fecha al crear desde el calendario. */
  presetDate: (value) => { form.eventDate = value || toDateInput() }
})
</script>

<style scoped>
.a-typegrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 10px;
}

.a-typecard {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px;
  border: 1px solid var(--a-border);
  border-radius: var(--a-radius-sm);
  background: #fff;
  cursor: pointer;
  text-align: left;
  transition: border-color .15s ease, background .15s ease;
}

.a-typecard:hover {
  border-color: var(--a-border-strong);
  background: var(--a-surface-alt);
}

.a-typecard--on {
  border-color: var(--a-accent);
  background: var(--a-accent-soft);
  box-shadow: 0 0 0 1px var(--a-accent);
}

.a-typecard img {
  width: 38px;
  height: 38px;
  object-fit: contain;
  flex-shrink: 0;
}

.a-typecard span {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.a-typecard strong {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--a-text);
  line-height: 1.3;
}

.a-typecard em {
  font-size: 11px;
  font-style: normal;
  color: var(--a-text-mute);
}
</style>
