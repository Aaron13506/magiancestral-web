<template>
  <section class="banner_four_section" :class="{ 'has-mobile': hasMobileTrack }">
    <!--
      Se imprimen las dos pistas (escritorio y teléfono) y es el CSS quien
      decide cuál se ve. Así el encuadre correcto ya está en el HTML servido,
      sin esperar a JavaScript, y el navegador no descarga las fotos de la
      pista oculta porque no llega a pintar su `background-image`.
    -->
    <div
      v-for="track in tracks"
      :key="track.mode"
      class="banner-carousel-four"
      :class="`hero-track--${track.mode}`"
    >
      <Swiper
        :modules="[SwiperAutoplay, SwiperNavigation]"
        :slides-per-view="1"
        :autoplay="{ delay: 5000, disableOnInteraction: false }"
        :loop="track.slides.length > 2"
        :rewind="track.slides.length === 2"
        :navigation="false"
        :observer="true"
        :observe-parents="true"
        class="swiper-container"
        @swiper="sw => registrarSwiper(track.mode, sw)"
      >
        <SwiperSlide v-for="(slide, index) in track.slides" :key="`${track.mode}-${index}-${slide.image}`">
          <div class="slide-item">
            <div
              class="image-layer"
              :style="{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: heroFocusStyle(slide)
              }"
            />
            <div class="auto-container">
              <div class="content-box">
                <div class="content text-left">
                  <div class="inner">
                    <h1><span>Magia</span><br>Ancestral</h1>
                    <div class="subtitle-box">
                      <p class="subtitle">Te da la bienvenida a <span class="familia-break">nuestra comunidad</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import { DEFAULT_HERO_SETTINGS, HERO_MOBILE_BREAKPOINT, heroFocusStyle, normalizeHeroSettings } from '~/utils/heroSlides'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

// Swiper modules
const SwiperAutoplay = Autoplay
const SwiperNavigation = Navigation

// Las fotos se editan en /admin/portada. El endpoint ya devuelve las de
// fábrica si algo falla, y el `default` cubre además el caso de que la
// petición ni siquiera llegue a resolverse.
const { data: hero } = await useAsyncData(
  'hero-settings',
  () => $fetch('/api/settings/hero'),
  { default: () => DEFAULT_HERO_SETTINGS }
)

const settings = computed(() => normalizeHeroSettings(hero.value))
const hasMobileTrack = computed(() => settings.value.mobile.length > 0)

const tracks = computed(() => {
  const list = [{ mode: 'desktop', slides: settings.value.desktop }]
  // Sin fotos propias de teléfono, la pista de escritorio sirve para todo.
  if (hasMobileTrack.value) list.push({ mode: 'mobile', slides: settings.value.mobile })
  return list
})

/**
 * La pista que nace oculta se inicializa sin medidas (Swiper no ve ningún
 * slide dentro de un `display: none`), así que al cruzar el corte hay que
 * pedirle que se recalcule. Sin esto, quien estrecha la ventana —o rota la
 * tableta— se queda con el carrusel del teléfono parado y en blanco.
 */
const swipers = new Map()
let consulta = null
let resizeFrame = null

function registrarSwiper(mode, instancia) {
  swipers.set(mode, instancia)
}

function refrescarSwipers() {
  swipers.forEach((sw) => {
    if (!sw || sw.destroyed) return
    sw.update()
    sw.autoplay?.start()
  })
}

/**
 * `matchMedia` solo avisa al cruzar el corte, pero un `resize` normal (sin
 * cruzarlo, o disparado a mano para pruebas) puede dejar una pista visible
 * con las medidas viejas. Se revisa cada instancia y solo se llama a
 * `update()` si la pista está visible y su ancho no coincide con el del
 * contenedor —o Swiper la inicializó con 0 slides—, para no forzar recálculos
 * de más en cada frame de un redimensionado normal.
 */
function pistaDesactualizada(sw) {
  if (!sw || sw.destroyed || !sw.el) return false
  if (sw.el.offsetParent === null) return false
  return sw.slides.length === 0 || sw.width !== sw.el.offsetWidth
}

function alRedimensionar() {
  if (resizeFrame) cancelAnimationFrame(resizeFrame)
  resizeFrame = requestAnimationFrame(() => {
    resizeFrame = null
    swipers.forEach((sw) => {
      if (pistaDesactualizada(sw)) sw.update()
    })
  })
}

onMounted(() => {
  consulta = window.matchMedia(`(max-width: ${HERO_MOBILE_BREAKPOINT}px)`)
  consulta.addEventListener('change', refrescarSwipers)
  window.addEventListener('resize', alRedimensionar)
  // Primera pasada: la pista visible puede haberse montado ya con medidas,
  // pero la otra no, y basta un `update()` para dejarlas coherentes.
  refrescarSwipers()
})

onBeforeUnmount(() => {
  consulta?.removeEventListener('change', refrescarSwipers)
  window.removeEventListener('resize', alRedimensionar)
  if (resizeFrame) cancelAnimationFrame(resizeFrame)
})
</script>

<style scoped>
.banner_four_section {
  position: relative;
  background-color: #0e3858;
}

.banner-carousel-four {
  position: relative;
  height: 100vh;
  min-height: 600px;
}

/* La pista de teléfono solo existe si el panel tiene fotos para ella. */
.hero-track--mobile {
  display: none;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.slide-item {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.image-layer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%);
}

.auto-container {
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
}

.content-box {
  position: relative;
  z-index: 15;
}

.content {
  position: relative;
  z-index: 20;
}

.content.text-left {
  text-align: left;
}

.inner {
  position: relative;
  z-index: 25;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 30px !important;
}

.inner h1 {
  font-size: 6.5rem !important;
  color: white !important;
  line-height: 1 !important;
  margin: 0 !important;
  padding: 0 !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  position: relative !important;
  z-index: 35 !important;
  width: 100%;
  transform: none !important;
  -webkit-transform: none !important;
}

.inner h1 span {
  color: #b3a85a !important;
  display: inline !important;
  visibility: visible !important;
  opacity: 1 !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
  background: transparent !important;
  position: relative !important;
  z-index: 999 !important;
}

.inner h1 span::before,
.inner h1 span::after {
  display: none !important;
}

.subtitle-box {
  margin: 0 !important;
  position: relative !important;
  z-index: 30 !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.subtitle {
  font-size: 1.25rem !important;
  color: #b3a85a !important;
  font-weight: 400 !important;
  line-height: 1.4 !important;
  margin: 0 !important;
  padding: 12px 25px !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border: 2px solid #b3a85a !important;
  border-radius: 8px !important;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6) !important;
  display: inline-block !important;
  visibility: visible !important;
  opacity: 1 !important;
  position: relative !important;
  z-index: 30 !important;
  backdrop-filter: blur(10px) !important;
  transition: all 0.3s ease !important;
}

.subtitle:hover {
  background: rgba(179, 168, 90, 0.2) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 5px 15px rgba(179, 168, 90, 0.3) !important;
}

.link-box {
  margin-top: 30px !important;
  position: relative !important;
  z-index: 30 !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.thm-btn {
  display: inline-block !important;
  padding: 15px 30px !important;
  background-color: #b3a85a !important;
  color: white !important;
  text-decoration: none !important;
  font-weight: 600 !important;
  border-radius: 5px !important;
  transition: all 0.3s ease !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  position: relative !important;
  z-index: 30 !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.thm-btn:hover {
  background-color: #7da052 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 5px 15px rgba(179, 168, 90, 0.3) !important;
}

@media (max-width: 768px) {
  .inner h1 {
    font-size: 2.4rem !important;
    line-height: 1.05 !important;
    margin: 0 !important;
    letter-spacing: 0.04em !important;
    font-weight: 500 !important;
    text-align: center !important;
  }

  .inner h1 span {
    letter-spacing: 0.08em !important;
  }

  .subtitle {
    font-size: 0.95rem !important;
    padding: 10px 22px !important;
    border-width: 1px !important;
    border-radius: 999px !important;
    letter-spacing: 0.02em !important;
    background: rgba(0, 0, 0, 0.35) !important;
    backdrop-filter: blur(8px) !important;
    text-align: center !important;
  }

  .familia-break {
    display: inline;
  }

  .slide-item {
    height: 85vh;
    min-height: 520px;
  }

  .banner-carousel-four {
    height: 85vh;
    min-height: 520px;
  }

  /* Debajo del corte manda la pista de teléfono, si la hay. */
  .has-mobile .hero-track--desktop {
    display: none;
  }

  .has-mobile .hero-track--mobile {
    display: block;
  }
}

/* Emergency styles to ensure text visibility */
.banner_four_section h1 {
  color: white !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 999 !important;
  position: relative !important;
}

.banner_four_section .thm-btn {
  display: inline-block !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 999 !important;
  position: relative !important;
  background-color: #b3a85a !important;
  color: white !important;
  padding: 15px 30px !important;
  border-radius: 5px !important;
  text-decoration: none !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
}

.banner_four_section .subtitle {
  display: inline-block !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 999 !important;
  position: relative !important;
  color: #b3a85a !important;
  font-size: 1.25rem !important;
  font-weight: 400 !important;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6) !important;
  border: 2px solid #b3a85a !important;
  border-radius: 8px !important;
  padding: 12px 25px !important;
}

.banner_four_section .subtitle-box {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 999 !important;
  position: relative !important;
  margin: 0 !important;
}

@media (max-width: 768px) {
  .inner {
    gap: 24px !important;
  }

  /* Split layout: título arriba, caja abajo — deja el centro libre para las caras */
  .slide-item {
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    justify-content: flex-start !important;
  }

  .auto-container {
    flex: 1 1 auto !important;
    align-self: stretch !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    align-items: center !important;
    width: 100% !important;
    max-width: 100% !important;
    height: 100% !important;
    padding: 170px 20px 36px !important;
    margin: 0 !important;
  }

  /* Las capas intermedias se aplanan para no romper el flex chain */
  .content-box,
  .content,
  .content.text-left,
  .inner {
    display: contents !important;
  }

  .inner h1 {
    order: 1 !important;
    flex: 0 0 auto !important;
    width: 100% !important;
    text-align: center !important;
    margin: 0 !important;
    align-self: center !important;
  }

  .subtitle-box {
    order: 2 !important;
    flex: 0 0 auto !important;
    width: auto !important;
    max-width: 92% !important;
    margin: 0 auto !important;
    text-align: center !important;
    align-self: center !important;
  }

  .subtitle {
    display: inline-block !important;
  }

  /* Gradiente más fuerte arriba y abajo para legibilidad sin tapar el centro */
  .image-layer::before {
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.75) 0%,
      rgba(0,0,0,0.35) 15%,
      rgba(0,0,0,0) 35%,
      rgba(0,0,0,0) 65%,
      rgba(0,0,0,0.45) 85%,
      rgba(0,0,0,0.8) 100%
    ) !important;
  }
}

@media (max-width: 480px) {
  .inner h1 {
    font-size: 2rem !important;
    line-height: 1.05 !important;
    margin: 0 !important;
  }

  .inner {
    gap: 20px !important;
  }

  .subtitle {
    font-size: 0.85rem !important;
    padding: 9px 18px !important;
  }
}
</style>
