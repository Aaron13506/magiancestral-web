<template>
  <section class="welcome_one">
    <div class="container">
      <Swiper
        :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
        :slides-per-view="1"
        :autoplay="{ delay: 6000 }"
        :loop="true"
        :navigation="{
          nextEl: '.welcome-button-next',
          prevEl: '.welcome-button-prev',
        }"
        :pagination="{ clickable: true }"
        class="welcome-slider"
      >
        <!-- Slide 1 -->
        <SwiperSlide>
          <div class="row">
            <div class="col-xl-6 col-lg-6">
              <div class="block-title text-left">
                <p>Bienvenido a Magia Ancestral</p>
                <h3>Radio Magia Ancestral</h3>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="welcome_text">
                <p>Es una emisora producida por Magia Ancestral que contiene programas de conversaciones
                  y entrevistas sobre diversos temas de medicinas naturales, espiritualidad y elementos de la naturaleza.
                  Además de variedades musicales, estrenos, música del recuerdo, programas de un solo ritmo,
                  programas de un solo intérprete, recitales, festivales.</p>
              </div>
              <div class="welcome_video_box"
                   style="background-image:url(/assets/images/resources/welcome_video_bg.jpg)">
                <a href="https://www.youtube.com/watch?v=VGM-FuP0T9k"
                   class="welcome_video_btn videoTwo"><i class="fa fa-play"></i></a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide 2 -->
        <SwiperSlide>
          <div class="row">
            <div class="col-xl-6 col-lg-6">
              <div class="block-title text-left">
                <p>Tradición y Calidad</p>
                <h3>Sesiones</h3>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="welcome_text">
                <p>Las sesiones de música de medicina utilizan frecuencias sagradas, cantos ancestrales
                  y instrumentos tradicionales para inducir estados de sanación y transformación.
                  La música actúa como un vehículo que transporta nuestra consciencia hacia dimensiones superiores,
                  facilitando procesos de liberación y renovación espiritual.</p>
              </div>
              <div class="welcome_video_box"
                   style="background-image:url(/assets/images/resources/welcome_video_bg.jpg)">
                <a href="https://www.youtube.com/watch?v=VGM-FuP0T9k"
                   class="welcome_video_btn videoTwo"><i class="fa fa-play"></i></a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide 3 -->
        <SwiperSlide>
          <div class="row">
            <div class="col-xl-6 col-lg-6">
              <div class="block-title text-left">
                <p>Salud Natural</p>
                <h3>Rezo de los ancestros</h3>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="welcome_text">
                <p>Es un programa cultural, musical y de entretenimiento
                  donde se establecen diálogos sobre espiritualidad y medicinas naturales.
                  Todos los jueves estaremos contigo y nuestros invitados para levantar el rezo e impartir mensajes
                  e información que embalsamen el alma del escucha a través de la música que eleva la conciencia.</p>
              </div>
              <div class="welcome_video_box"
                   style="background-image:url(/assets/images/resources/welcome_video_bg.jpg)">
                <a href="https://www.youtube.com/watch?v=VGM-FuP0T9k"
                   class="welcome_video_btn videoTwo"><i class="fa fa-play"></i></a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- External Navigation Buttons -->
      <div class="welcome-navigation-external">
        <div class="welcome-button-prev">
          <i class="fa fa-angle-left"></i>
        </div>
        <div class="welcome-button-next">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRadioStore } from '~/store/index.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const SwiperAutoplay = Autoplay
const SwiperNavigation = Navigation
const SwiperPagination = Pagination

const radioStore = useRadioStore()
let wasPlayingBeforeVideo = false

onMounted(() => {
  const lightbox = new GLightbox({
    selector: '.videoTwo',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
  })

  lightbox.on('open', () => {
    wasPlayingBeforeVideo = radioStore.isPlaying
    if (wasPlayingBeforeVideo) {
      radioStore.pause()
    }
  })

  lightbox.on('close', () => {
    if (wasPlayingBeforeVideo) {
      radioStore.play()
    }
  })
})
</script>

<style scoped>
.welcome_one {
  position: relative;
}

.welcome-slider {
  position: relative;
}

/* External Navigation Buttons */
.welcome-navigation-external {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 10;
  height: 0;
}

.welcome-button-prev,
.welcome-button-next {
  position: absolute;
  width: 60px;
  height: 60px;
  background: var(--thm-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-size: 24px;
}

.welcome-button-prev:hover,
.welcome-button-next:hover {
  background: var(--thm-secondary);
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.welcome-button-prev {
  left: 50px;
}

.welcome-button-next {
  right: 50px;
}

/* Hide default swiper buttons */
.welcome-slider :deep(.swiper-button-next),
.welcome-slider :deep(.swiper-button-prev) {
  display: none;
}

/* Pagination styling */
.welcome-slider :deep(.swiper-pagination-bullet) {
  background: var(--thm-primary);
  opacity: 0.3;
  width: 12px;
  height: 12px;
}

.welcome-slider :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: var(--thm-primary);
}

.welcome-slider :deep(.swiper-pagination) {
  bottom: 20px;
}

/* Ensure each slide has proper spacing */
.welcome-slider .swiper-slide {
  padding: 20px 0;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .welcome-button-prev {
    left: 30px;
  }

  .welcome-button-next {
    right: 30px;
  }
}

@media (max-width: 768px) {
  .welcome-button-prev,
  .welcome-button-next {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .welcome-button-prev {
    left: 20px;
  }

  .welcome-button-next {
    right: 20px;
  }
}

@media (max-width: 480px) {
  .welcome-button-prev,
  .welcome-button-next {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
}

/* Font weight adjustments are now handled globally */
</style>
