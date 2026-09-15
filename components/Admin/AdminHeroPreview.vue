<template>
  <div class="a-heroprev">
    <div class="a-heroprev__bar">
      <div class="a-seg">
        <button
          type="button"
          class="a-seg__btn"
          :class="{ 'a-seg__btn--on': mode === 'desktop' }"
          @click="emit('update:mode', 'desktop')"
        >
          <i class="fas fa-desktop" /> Computadora
        </button>
        <button
          type="button"
          class="a-seg__btn"
          :class="{ 'a-seg__btn--on': mode === 'mobile' }"
          @click="emit('update:mode', 'mobile')"
        >
          <i class="fas fa-mobile-alt" /> Teléfono
        </button>
      </div>
      <span class="a-heroprev__bp">
        <i class="fas fa-arrows-alt-h" />
        {{ mode === 'mobile' ? `Hasta ${breakpoint}px de ancho` : `Desde ${breakpoint + 1}px de ancho` }}
      </span>
    </div>

    <div class="a-heroprev__stage">
      <div class="a-heroprev__frame" :class="`a-heroprev__frame--${mode}`">
        <div
          v-if="current"
          class="a-heroprev__shot"
          :style="{
            backgroundImage: `url(${current.image})`,
            backgroundPosition: heroFocusStyle(current)
          }"
        >
          <span class="a-heroprev__scrim" />
          <!-- Franja que ocupa la cabecera del sitio por encima de la portada.
               Sin ella la previa engaña: una cara colocada ahí arriba sale
               tapada por el menú en la página real. -->
          <span class="a-heroprev__nav"><i>zona del menú</i></span>
          <div class="a-heroprev__content">
            <div class="a-heroprev__title"><span>Magia</span><br>Ancestral</div>
            <div class="a-heroprev__subtitle">Te da la bienvenida a nuestra comunidad</div>
          </div>
        </div>

        <div v-else class="a-heroprev__shot a-heroprev__shot--empty">
          <i class="fas fa-image" />
          <span>Añade una foto para ver la portada</span>
        </div>
      </div>
    </div>

    <div class="a-heroprev__foot">
      <button
        type="button"
        class="a-btn a-btn--subtle a-btn--sm a-btn--icon"
        title="Anterior"
        :disabled="slides.length < 2"
        @click="step(-1)"
      >
        <i class="fas fa-chevron-left" />
      </button>

      <div class="a-heroprev__dots">
        <button
          v-for="(slide, i) in slides"
          :key="`${slide.image}-${i}`"
          type="button"
          class="a-heroprev__dot"
          :class="{ 'a-heroprev__dot--on': i === safeIndex }"
          :title="`Foto ${i + 1}`"
          @click="emit('update:index', i)"
        />
      </div>

      <button
        type="button"
        class="a-btn a-btn--subtle a-btn--sm a-btn--icon"
        title="Siguiente"
        :disabled="slides.length < 2"
        @click="step(1)"
      >
        <i class="fas fa-chevron-right" />
      </button>

      <span class="a-heroprev__count">
        <template v-if="slides.length">Foto {{ safeIndex + 1 }} de {{ slides.length }}</template>
        <template v-else>Sin fotos</template>
      </span>
    </div>

    <p v-if="inherited" class="a-heroprev__note">
      <i class="fas fa-info-circle" />
      No hay fotos propias de teléfono, así que se muestran las de computadora con su mismo encuadre.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { HERO_MOBILE_BREAKPOINT, heroFocusStyle, heroSlidesFor } from '~/utils/heroSlides'

const props = defineProps({
  settings: { type: Object, required: true },
  mode: { type: String, default: 'desktop' },
  index: { type: Number, default: 0 }
})

const emit = defineEmits(['update:mode', 'update:index'])

const breakpoint = HERO_MOBILE_BREAKPOINT

const slides = computed(() => heroSlidesFor(props.settings, props.mode === 'mobile' ? 'mobile' : 'desktop'))

// El índice lo manda la página (también lo mueve el editor de fotos), así que
// puede apuntar a una foto que ya se borró: aquí se ajusta sin tocar el estado.
const safeIndex = computed(() => {
  if (!slides.value.length) return 0
  return Math.min(Math.max(props.index, 0), slides.value.length - 1)
})

const current = computed(() => slides.value[safeIndex.value] || null)

const inherited = computed(() => props.mode === 'mobile' && !props.settings.mobile?.length)

function step(delta) {
  if (!slides.value.length) return
  const total = slides.value.length
  emit('update:index', (safeIndex.value + delta + total) % total)
}
</script>

<style scoped>
.a-heroprev {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.a-heroprev__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.a-seg {
  display: inline-flex;
  padding: 3px;
  border: 1px solid var(--a-border);
  border-radius: 999px;
  background: var(--a-surface-alt);
}

.a-seg__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  border: none;
  border-radius: 999px;
  background: none;
  color: var(--a-text-soft);
  font: inherit;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: background .15s ease, color .15s ease;
}

.a-seg__btn--on {
  background: #fff;
  color: var(--a-text);
  box-shadow: var(--a-shadow);
}

.a-heroprev__bp {
  font-size: 11.5px;
  color: var(--a-text-mute);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.a-heroprev__stage {
  display: flex;
  justify-content: center;
  padding: 12px;
  border-radius: var(--a-radius);
  background:
    linear-gradient(0deg, rgba(0, 0, 0, .03), rgba(0, 0, 0, .03)),
    repeating-conic-gradient(#f4f6f8 0% 25%, #eceff3 0% 50%) 0 0 / 18px 18px;
}

.a-heroprev__frame {
  position: relative;
  overflow: hidden;
  background: #0e3858;
  box-shadow: var(--a-shadow-lg);
}

/* Proporciones aproximadas de lo que ocupa la portada en cada aparato:
   una pantalla ancha 16:9, y un teléfono con el hero a 85vh. */
.a-heroprev__frame--desktop {
  width: 100%;
  max-width: 620px;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, .18);
}

.a-heroprev__frame--mobile {
  width: 100%;
  max-width: 270px;
  aspect-ratio: 39 / 72;
  border-radius: 26px;
  border: 7px solid #1b212b;
}

.a-heroprev__shot {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  /* Las medidas del texto van en unidades de contenedor, así que el rótulo
     guarda la misma proporción que en la página real aunque el marco sea
     pequeño. */
  container-type: inline-size;
}

.a-heroprev__shot--empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--a-surface-alt);
  color: var(--a-text-mute);
  font-size: 12px;
  text-align: center;
  padding: 16px;
}

.a-heroprev__shot--empty i {
  font-size: 22px;
}

.a-heroprev__scrim {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.a-heroprev__content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.a-heroprev__title {
  font-family: 'Poppins', sans-serif;
  color: #fff;
  text-transform: uppercase;
  line-height: 1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, .8);
}

.a-heroprev__title span {
  color: var(--a-gold);
}

.a-heroprev__subtitle {
  color: var(--a-gold);
  font-family: 'Poppins', sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
  border: 1px solid var(--a-gold);
  display: inline-block;
}

/* Altura real medida sobre el sitio: 264 px de cabecera en una ventana de
   2048 px (12,9 %) y 139 px sobre 414 px en el teléfono (33,6 %). */
.a-heroprev__nav {
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 3;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: repeating-linear-gradient(
    -45deg,
    rgba(255, 255, 255, .10) 0 6px,
    rgba(255, 255, 255, .02) 6px 12px
  );
  border-bottom: 1px dashed rgba(255, 255, 255, .45);
  pointer-events: none;
}

.a-heroprev__nav i {
  font-style: normal;
  font-size: 9px;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, .8);
  background: rgba(0, 0, 0, .35);
  padding: 1px 6px;
  border-radius: 3px;
  margin-bottom: 3px;
}

.a-heroprev__frame--desktop .a-heroprev__nav {
  height: 12.9cqw;
}

.a-heroprev__frame--mobile .a-heroprev__nav {
  height: 33.6cqw;
}

/* --- Encuadre de computadora: rótulo a la izquierda, centrado vertical --- */

.a-heroprev__frame--desktop .a-heroprev__scrim {
  background: linear-gradient(to bottom, rgba(0,0,0,.45) 0%, rgba(0,0,0,.15) 40%, rgba(0,0,0,.55) 100%);
}

.a-heroprev__frame--desktop .a-heroprev__content {
  align-items: flex-start;
  justify-content: center;
  padding: 0 9%;
  gap: 2.1cqw;
}

.a-heroprev__frame--desktop .a-heroprev__title {
  font-size: max(26px, 7.2cqw);
  font-weight: 300;
}

.a-heroprev__frame--desktop .a-heroprev__subtitle {
  font-size: max(8px, 1.5cqw);
  font-weight: 400;
  padding: max(4px, 0.9cqw) max(8px, 1.9cqw);
  border-radius: max(3px, 0.6cqw);
  background: rgba(255, 255, 255, .1);
}

/* --- Encuadre de teléfono: título arriba, caja abajo, centro libre ------- */

.a-heroprev__frame--mobile .a-heroprev__scrim {
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,.75) 0%,
    rgba(0,0,0,.35) 15%,
    rgba(0,0,0,0) 35%,
    rgba(0,0,0,0) 65%,
    rgba(0,0,0,.45) 85%,
    rgba(0,0,0,.8) 100%
  );
}

.a-heroprev__frame--mobile .a-heroprev__content {
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 43cqw 5cqw 9cqw;
}

.a-heroprev__frame--mobile .a-heroprev__title {
  font-size: max(20px, 9.8cqw);
  font-weight: 500;
  letter-spacing: .04em;
}

.a-heroprev__frame--mobile .a-heroprev__subtitle {
  font-size: max(8px, 3.9cqw);
  font-weight: 400;
  padding: max(4px, 2.6cqw) max(9px, 5.6cqw);
  border-radius: 999px;
  background: rgba(0, 0, 0, .35);
  max-width: 92%;
}

/* --- Controles ----------------------------------------------------------- */

.a-heroprev__foot {
  display: flex;
  align-items: center;
  gap: 8px;
}

.a-heroprev__dots {
  display: flex;
  align-items: center;
  gap: 5px;
}

.a-heroprev__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--a-border-strong);
  cursor: pointer;
  transition: background .15s ease, transform .15s ease;
}

.a-heroprev__dot--on {
  background: var(--a-accent);
  transform: scale(1.25);
}

.a-heroprev__count {
  margin-left: auto;
  font-size: 11.5px;
  color: var(--a-text-mute);
  font-variant-numeric: tabular-nums;
}

.a-heroprev__note {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  font-size: 11.5px;
  color: var(--a-text-mute);
  line-height: 1.5;
}
</style>
