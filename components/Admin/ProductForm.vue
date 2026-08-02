<template>
  <form class="a-form" novalidate @submit.prevent="onSubmit">
    <div v-if="error" class="a-alert a-alert--error">
      <i class="fas fa-exclamation-triangle" />
      <span>{{ error }}</span>
    </div>

    <div class="a-form__grid">
      <!-- Columna principal -->
      <div class="a-form__col">
        <AdminFieldset title="Información básica">
          <div class="a-field">
            <label class="a-field__label" for="p-name">Nombre <span class="a-field__req">*</span></label>
            <input
              id="p-name"
              v-model="form.name"
              type="text"
              class="a-input"
              :class="{ 'a-input--invalid': errors.name }"
              placeholder="Ej. Extracto de Reishi"
            >
            <span v-if="errors.name" class="a-field__error">{{ errors.name }}</span>
          </div>

          <div class="a-field">
            <label class="a-field__label" for="p-slug">
              URL del producto <span class="a-field__req">*</span>
              <button type="button" class="a-btn a-btn--subtle a-btn--sm" @click="slugLocked = !slugLocked">
                <i :class="slugLocked ? 'fas fa-edit' : 'fas fa-check'" />
                {{ slugLocked ? 'Editar' : 'Listo' }}
              </button>
            </label>
            <div class="a-input-group">
              <span class="a-input-group__addon">/producto/</span>
              <input
                id="p-slug"
                v-model="form.slug"
                type="text"
                class="a-input a-mono"
                :class="{ 'a-input--invalid': errors.slug }"
                :disabled="slugLocked"
                @blur="form.slug = slugify(form.slug)"
              >
            </div>
            <span v-if="errors.slug" class="a-field__error">{{ errors.slug }}</span>
            <span v-else class="a-field__hint">
              {{ isEdit
                ? 'Cambiar la URL rompe los enlaces que ya se hayan compartido de este producto.'
                : 'Se genera a partir del nombre. Puedes ajustarla antes de crear el producto.' }}
            </span>
          </div>

          <div class="a-row">
            <div class="a-field">
              <label class="a-field__label" for="p-short">Nombre corto</label>
              <input id="p-short" v-model="form.shortName" type="text" class="a-input" placeholder="Para tarjetas y listados">
            </div>
            <div class="a-field">
              <label class="a-field__label" for="p-cat">Categoría <span class="a-field__req">*</span></label>
              <select
                id="p-cat"
                v-model="form.category"
                class="a-select"
                :class="{ 'a-select--invalid': errors.category }"
              >
                <option value="">Selecciona una categoría</option>
                <option v-for="cat in PRODUCT_CATEGORIES" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
              <span v-if="errors.category" class="a-field__error">{{ errors.category }}</span>
              <span v-else class="a-field__hint">Determina en qué filtro de la botica aparece.</span>
            </div>
          </div>

          <div class="a-field">
            <label class="a-field__label" for="p-desc">Descripción</label>
            <textarea id="p-desc" v-model="form.description" class="a-textarea" rows="3" placeholder="Resumen que se muestra en la ficha del producto" />
          </div>

          <div class="a-field">
            <label class="a-field__label" for="p-content">
              Presentación
              <span class="a-field__hint">se muestra tal cual</span>
            </label>
            <input id="p-content" v-model="form.content" type="text" class="a-input" placeholder="Ej. 30 ml · 50 cápsulas">
          </div>
        </AdminFieldset>

        <AdminFieldset title="Detalles" description="Se muestran como secciones en la ficha del producto.">
          <div class="a-field">
            <label class="a-field__label" for="p-usage">Modo de uso</label>
            <textarea id="p-usage" v-model="form.usage" class="a-textarea" rows="3" />
          </div>
          <div class="a-field">
            <label class="a-field__label" for="p-ing">Ingredientes</label>
            <textarea id="p-ing" v-model="form.ingredients" class="a-textarea" rows="3" />
          </div>
          <div class="a-field">
            <label class="a-field__label" for="p-prec">Precauciones</label>
            <textarea id="p-prec" v-model="form.precautions" class="a-textarea" rows="3" />
          </div>
          <div class="a-field">
            <label class="a-field__label">Beneficios</label>
            <AdminTagsInput v-model="form.benefits" placeholder="Ej. Refuerza el sistema inmune" />
            <span class="a-field__hint">Se listan con viñetas en la ficha. Enter o coma para añadir.</span>
          </div>
        </AdminFieldset>

        <AdminFieldset title="Galería" description="Imágenes adicionales que acompañan a la principal.">
          <AdminGalleryEditor v-model="form.gallery" />
        </AdminFieldset>
      </div>

      <!-- Columna lateral -->
      <div class="a-form__col">
        <AdminFieldset title="Precio">
          <div class="a-row">
            <div class="a-field">
              <label class="a-field__label" for="p-price">Precio <span class="a-field__req">*</span></label>
              <input
                id="p-price"
                v-model="priceText"
                type="number"
                step="0.01"
                min="0"
                class="a-input"
                :class="{ 'a-input--invalid': errors.price }"
              >
              <span v-if="errors.price" class="a-field__error">{{ errors.price }}</span>
            </div>
            <div class="a-field">
              <label class="a-field__label" for="p-currency">Moneda</label>
              <select id="p-currency" v-model="form.currency" class="a-select">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="VES">VES</option>
              </select>
            </div>
          </div>
        </AdminFieldset>

        <AdminFieldset title="Imagen principal">
          <AdminImageUpload v-model="form.image" />
        </AdminFieldset>

        <AdminFieldset title="Visibilidad">
          <label class="a-check" :class="{ 'a-check--on': form.inStock }">
            <input v-model="form.inStock" type="checkbox">
            <span class="a-check__text">
              <strong>En stock</strong>
              <span>Si se desmarca, aparece como agotado y no se puede añadir al carrito.</span>
            </span>
          </label>
          <label class="a-check" :class="{ 'a-check--on': form.featured }">
            <input v-model="form.featured" type="checkbox">
            <span class="a-check__text">
              <strong>Destacado</strong>
              <span>Se resalta dentro del listado de la botica.</span>
            </span>
          </label>
          <label class="a-check" :class="{ 'a-check--on': form.topProduct }">
            <input v-model="form.topProduct" type="checkbox">
            <span class="a-check__text">
              <strong>Producto top</strong>
              <span>Aparece en las secciones destacadas de la portada.</span>
            </span>
          </label>
          <label class="a-check" :class="{ 'a-check--on': form.artisanal }">
            <input v-model="form.artisanal" type="checkbox">
            <span class="a-check__text">
              <strong>Artesanal</strong>
              <span>Muestra el distintivo de elaboración artesanal.</span>
            </span>
          </label>
        </AdminFieldset>
      </div>
    </div>

    <!-- Barra de acciones -->
    <div class="a-formbar">
      <button type="submit" class="a-btn a-btn--primary" :disabled="loading">
        <i v-if="loading" class="a-spinner" />
        {{ loading ? 'Guardando…' : submitLabel }}
      </button>
      <NuxtLink to="/admin/products" class="a-btn a-btn--ghost">Cancelar</NuxtLink>
      <span v-if="dirty" class="a-muted" style="font-size: 12px;">Cambios sin guardar</span>
      <span class="a-formbar__spacer" />
      <slot name="extra-actions" />
    </div>
  </form>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import AdminFieldset from './AdminFieldset.vue'
import AdminGalleryEditor from './AdminGalleryEditor.vue'
import AdminImageUpload from './AdminImageUpload.vue'
import AdminTagsInput from './AdminTagsInput.vue'
import { PRODUCT_CATEGORIES } from '~/utils/productCategories'
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
  name: '', slug: '', shortName: '', price: 0, currency: 'USD', image: '', gallery: [],
  category: '', description: '', content: '', usage: '', ingredients: '', precautions: '',
  benefits: [], inStock: true, featured: false, topProduct: false, artisanal: false
})

const form = reactive(blank())
const errors = reactive({})
const slugLocked = ref(true)
const baseline = ref(JSON.stringify(blank()))

const isEdit = computed(() => Boolean(props.initial?.id))

// `<input type="number">` devuelve cadena; la normalizamos en un solo sitio.
const priceText = computed({
  get: () => form.price,
  set: (value) => { form.price = value === '' || value == null ? '' : Number(value) }
})

watch(() => props.initial, (val) => {
  const next = blank()
  if (val) {
    Object.assign(next, {
      name: val.name || '',
      slug: val.slug || '',
      shortName: val.shortName || '',
      price: val.price ?? 0,
      currency: val.currency || 'USD',
      image: val.image || '',
      gallery: Array.isArray(val.gallery) ? [...val.gallery] : [],
      category: val.category || '',
      description: val.description || '',
      content: val.content || '',
      usage: val.usage || '',
      ingredients: val.ingredients || '',
      precautions: val.precautions || '',
      benefits: Array.isArray(val.benefits) ? [...val.benefits] : [],
      inStock: val.inStock ?? true,
      featured: val.featured ?? false,
      topProduct: val.topProduct ?? false,
      artisanal: val.artisanal ?? false
    })
  }
  Object.assign(form, next)
  baseline.value = JSON.stringify(next)
}, { immediate: true, deep: true })

// El slug sigue al nombre solo mientras esté bloqueado y el producto sea nuevo;
// así una URL ya publicada nunca cambia sola.
watch(() => form.name, (value) => {
  if (isEdit.value || !slugLocked.value) return
  form.slug = slugify(value)
})

const dirty = computed(() => JSON.stringify({ ...form }) !== baseline.value)
watch(dirty, (value) => emit('dirty', value), { immediate: true })

function validate() {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.name.trim()) errors.name = 'El nombre es obligatorio'
  if (!form.slug) errors.slug = 'La URL es obligatoria'
  else if (!SLUG_RE.test(form.slug)) errors.slug = 'Solo minúsculas, números y guiones (sin acentos ni espacios)'
  if (!form.category) errors.category = 'Elige una categoría para que el producto aparezca en los filtros'
  if (form.price === '' || form.price == null || Number.isNaN(Number(form.price))) errors.price = 'Indica un precio'
  else if (Number(form.price) < 0) errors.price = 'El precio no puede ser negativo'

  return Object.keys(errors).length === 0
}

const onSubmit = () => {
  if (!validate()) {
    document.querySelector('.a-input--invalid, .a-select--invalid')?.focus()
    return
  }
  emit('submit', {
    ...form,
    name: form.name.trim(),
    price: Number(form.price),
    benefits: [...form.benefits],
    gallery: [...form.gallery]
  })
}

defineExpose({
  /** Fija el estado actual como "guardado" para que el guardián deje de avisar. */
  markSaved: () => { baseline.value = JSON.stringify({ ...form }) }
})
</script>
