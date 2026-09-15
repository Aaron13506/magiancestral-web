<template>
  <div>
    <AdminPageHeader
      title="Portada"
      subtitle="Las fotos que se ven al entrar a la página"
      :crumbs="[{ label: 'Portada' }]"
    >
      <template #actions>
        <a href="/" target="_blank" rel="noopener" class="a-btn a-btn--ghost">
          <i class="fas fa-external-link-alt" /> Ver el sitio
        </a>
      </template>
    </AdminPageHeader>

    <div v-if="loadError" class="a-alert a-alert--error">
      <i class="fas fa-exclamation-triangle" />
      <span class="a-grow">
        No se pudieron cargar las fotos de la portada.
        <span class="a-mono">{{ adminErrorMessage(loadError) }}</span>
      </span>
      <button type="button" class="a-btn a-btn--ghost a-btn--sm" @click="refresh()">Reintentar</button>
    </div>

    <div v-else-if="pending" class="a-card">
      <div class="a-card__body">
        <div class="a-skeleton" style="height: 420px;" />
      </div>
    </div>

    <form v-else class="a-form" novalidate @submit.prevent="save">
      <div v-if="error" class="a-alert a-alert--error">
        <i class="fas fa-exclamation-triangle" />
        <span>{{ error }}</span>
      </div>

      <div class="a-portada">
        <!-- Editor: una pestaña a la vez, para no tener que bajar por una
             lista mientras se pierde de vista la otra y la vista previa. -->
        <div class="a-portada__col">
          <div class="a-modetabs">
            <button
              type="button"
              class="a-modetabs__btn"
              :class="{ 'a-modetabs__btn--on': mode === 'desktop' }"
              @click="mode = 'desktop'"
            >
              <i class="fas fa-desktop" /> Computadora
              <span class="a-modetabs__count">{{ form.desktop.length }}</span>
            </button>
            <button
              type="button"
              class="a-modetabs__btn"
              :class="{ 'a-modetabs__btn--on': mode === 'mobile' }"
              @click="mode = 'mobile'"
            >
              <i class="fas fa-mobile-alt" /> Teléfono
              <span class="a-modetabs__count">{{ form.mobile.length }}</span>
            </button>
          </div>

          <AdminFieldset
            v-if="mode === 'desktop'"
            title="Fotos para computadora"
            description="Se usan en pantallas anchas. Son obligatorias: si no hay fotos de teléfono, el móvil también las usa."
          >
            <AdminHeroSlides
              v-model="form.desktop"
              :max="max"
              mode="desktop"
              :active-index="index"
              empty-text="Añade al menos una foto horizontal."
              @preview="focusSlide('desktop', $event)"
            />
          </AdminFieldset>

          <AdminFieldset
            v-else
            title="Fotos para teléfono (opcional)"
            :description="`Se usan en pantallas de ${breakpoint}px de ancho o menos. Aquí van las fotos verticales, para que el recorte no se coma a la gente. Si lo dejas vacío, el teléfono muestra las de computadora.`"
          >
            <AdminHeroSlides
              v-model="form.mobile"
              :max="max"
              mode="mobile"
              :active-index="index"
              empty-text="Sin fotos propias de teléfono: se mostrarán las de computadora."
              @preview="focusSlide('mobile', $event)"
            />

            <div v-if="form.mobile.length === 0 && form.desktop.length" class="a-inline">
              <button type="button" class="a-btn a-btn--subtle a-btn--sm" @click="copyFromDesktop">
                <i class="fas fa-copy" /> Copiar las fotos de computadora y reencuadrarlas
              </button>
            </div>
          </AdminFieldset>
        </div>

        <!-- Vista previa -->
        <div class="a-portada__col">
          <div class="a-portada__sticky">
            <AdminFieldset
              title="Vista previa"
              description="Una aproximación del recorte real. Cambia entre computadora y teléfono para comprobar las dos versiones."
            >
              <AdminHeroPreview
                :settings="form"
                :mode="mode"
                :index="index"
                @update:mode="mode = $event"
                @update:index="index = $event"
              />
            </AdminFieldset>
          </div>
        </div>
      </div>

      <div class="a-formbar">
        <button type="submit" class="a-btn a-btn--primary" :disabled="saving">
          <i v-if="saving" class="a-spinner" />
          {{ saving ? 'Guardando…' : 'Guardar portada' }}
        </button>
        <button type="button" class="a-btn a-btn--ghost" :disabled="!dirty || saving" @click="reset">
          Descartar cambios
        </button>
        <span v-if="dirty" class="a-muted" style="font-size: 12px;">Cambios sin guardar</span>
        <span class="a-formbar__spacer" />
        <span class="a-muted" style="font-size: 12px;">
          Los cambios tardan unos minutos en verse en el sitio publicado.
        </span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import AdminFieldset from '~/components/Admin/AdminFieldset.vue'
import AdminHeroPreview from '~/components/Admin/AdminHeroPreview.vue'
import AdminHeroSlides from '~/components/Admin/AdminHeroSlides.vue'
import AdminPageHeader from '~/components/Admin/AdminPageHeader.vue'
import { HERO_MAX_SLIDES, HERO_MOBILE_BREAKPOINT, normalizeHeroSettings } from '~/utils/heroSlides'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useHead({ title: 'Portada · Panel Magiancestral' })

const api = useAdminApi()
const toast = useAdminToast()

const max = HERO_MAX_SLIDES
const breakpoint = HERO_MOBILE_BREAKPOINT

const form = reactive({ desktop: [], mobile: [] })
const baseline = ref('')
const saving = ref(false)
const error = ref('')
const mode = ref('desktop')
const index = ref(0)

const { data: stored, pending, error: loadError, refresh } = await useAsyncData(
  'admin-hero',
  () => api.get('/api/admin/settings/hero')
)

const apply = (value) => {
  const next = normalizeHeroSettings(value)
  form.desktop = next.desktop
  form.mobile = next.mobile
  baseline.value = JSON.stringify(next)
}

watch(stored, value => { if (value) apply(value) }, { immediate: true })

const dirty = computed(() => JSON.stringify({ desktop: form.desktop, mobile: form.mobile }) !== baseline.value)

const { release } = useUnsavedGuard(dirty)

/** Al tocar una foto, la vista previa salta a ella en su propio modo. */
function focusSlide(target, position) {
  mode.value = target
  index.value = position
}

function copyFromDesktop() {
  form.mobile = form.desktop.map(slide => ({ ...slide }))
  focusSlide('mobile', 0)
}

function reset() {
  apply(stored.value)
  index.value = 0
}

async function save() {
  if (!form.desktop.length) {
    error.value = 'Añade al menos una foto para computadora.'
    return
  }

  saving.value = true
  error.value = ''
  try {
    const saved = await api.put('/api/admin/settings/hero', {
      desktop: form.desktop,
      mobile: form.mobile
    })
    stored.value = saved
    apply(saved)
    release()
    toast.success('Portada actualizada')
  } catch (err) {
    error.value = adminErrorMessage(err, 'No se pudo guardar la portada')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.a-modetabs {
  display: inline-flex;
  align-self: flex-start;
  padding: 3px;
  border: 1px solid var(--a-border);
  border-radius: 999px;
  background: var(--a-surface-alt);
}

.a-modetabs__btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border: none;
  border-radius: 999px;
  background: none;
  color: var(--a-text-soft);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}

.a-modetabs__btn--on {
  background: #fff;
  color: var(--a-text);
  box-shadow: var(--a-shadow);
}

.a-modetabs__count {
  min-width: 18px;
  padding: 1px 5px;
  border-radius: 999px;
  background: var(--a-border);
  color: var(--a-text-mute);
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.a-modetabs__btn--on .a-modetabs__count {
  background: var(--a-accent);
  color: #fff;
}

.a-portada {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 520px);
  gap: 18px;
  align-items: start;
}

.a-portada__col {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}

/* La vista previa acompaña al scroll: al reencuadrar una foto de la lista se
   ve el efecto sin tener que subir. */
.a-portada__sticky {
  position: sticky;
  top: calc(var(--a-topbar-h) + 16px);
}

@media (max-width: 1080px) {
  .a-portada {
    grid-template-columns: minmax(0, 1fr);
  }

  /* En una sola columna la previa iría al final; mejor arriba, que es lo que
     se está mirando mientras se edita. */
  .a-portada__col:last-child {
    order: -1;
  }

  .a-portada__sticky {
    position: static;
  }
}
</style>
