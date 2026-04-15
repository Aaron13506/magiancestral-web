<template>
  <section class="welcome_one">
    <div class="container">
      <Swiper
        :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
        :slides-per-view="1"
        :autoplay="{ delay: 10000 }"
        :loop="true"
        :navigation="{
          nextEl: '.welcome-button-next, .welcome-button-next-mobile',
          prevEl: '.welcome-button-prev, .welcome-button-prev-mobile',
        }"
        :pagination="{ clickable: true }"
        class="welcome-slider"
      >
        <!-- Slide 1 -->
        <SwiperSlide>
          <div class="row">
            <div class="col-xl-6 col-lg-6">
              <div class="block-title text-center">
                <h3>Radio Magia Ancestral</h3>
              </div>
              <img src="/assets/images/icon/radio.png" alt="Radio" class="radio-image">
              <!-- External Navigation Buttons (Mobile) -->
              <div class="welcome-navigation-external-mobile">
                <div class="welcome-button-prev-mobile">
                  <i class="fa fa-angle-left"></i>
                </div>
                <div class="welcome-button-next-mobile">
                  <i class="fa fa-angle-right"></i>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="welcome_text">
                <p>Es una emisora producida por Magia Ancestral que contiene programas de conversaciones
                  y entrevistas sobre diversos temas de medicinas naturales, espiritualidad y elementos de la naturaleza.
                  Además de variedades musicales, estrenos, música del recuerdo, programas de un solo ritmo,
                  programas de un solo intérprete, recitales, festivales.</p>
              </div>
              <div class="welcome_video_box">
                <iframe
                  v-if="videoPlaying[0]"
                  src="https://www.youtube.com/embed/QjhKvZ_yevA?autoplay=1"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                  class="video-iframe"
                ></iframe>
                <template v-else>
                  <img src="https://img.youtube.com/vi/QjhKvZ_yevA/maxresdefault.jpg" alt="Video" class="video-thumbnail" />
                  <button @click="playVideo(0)" class="welcome_video_btn"><i class="fa fa-play"></i></button>
                </template>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide 2 -->
        <SwiperSlide>
          <div class="row">
            <div class="col-xl-6 col-lg-6">
              <div class="block-title text-center">
                <h3>Sesiones</h3>
              </div>
              <img src="/assets/images/icon/sesiones.png" alt="Sesiones" class="sesiones-image">
              <!-- External Navigation Buttons (Mobile) -->
              <div class="welcome-navigation-external-mobile">
                <div class="welcome-button-prev-mobile">
                  <i class="fa fa-angle-left"></i>
                </div>
                <div class="welcome-button-next-mobile">
                  <i class="fa fa-angle-right"></i>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="welcome_text">
                <p>Las sesiones de música de medicina utilizan frecuencias sagradas, cantos ancestrales
                  y instrumentos tradicionales para inducir estados de sanación y transformación.
                  La música actúa como un vehículo que transporta nuestra consciencia hacia dimensiones superiores,
                  facilitando procesos de liberación y renovación espiritual.</p>
              </div>
              <div class="welcome_video_box">
                <iframe
                  v-if="videoPlaying[1]"
                  src="https://www.youtube.com/embed/QjhKvZ_yevA?autoplay=1"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                  class="video-iframe"
                ></iframe>
                <template v-else>
                  <img src="https://img.youtube.com/vi/QjhKvZ_yevA/maxresdefault.jpg" alt="Video" class="video-thumbnail" />
                  <button @click="playVideo(1)" class="welcome_video_btn"><i class="fa fa-play"></i></button>
                </template>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide 3 -->
        <SwiperSlide>
          <div class="row">
            <div class="col-xl-6 col-lg-6">
              <div class="block-title text-center">
                <h3>Rezo de los ancestros</h3>
              </div>
              <img src="/assets/images/icon/ancestros.png" alt="Radio" class="ancestral-image">
              <!-- External Navigation Buttons (Mobile) -->
              <div class="welcome-navigation-external-mobile">
                <div class="welcome-button-prev-mobile">
                  <i class="fa fa-angle-left"></i>
                </div>
                <div class="welcome-button-next-mobile">
                  <i class="fa fa-angle-right"></i>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="welcome_text">
                <p>Es un programa cultural, musical y de entretenimiento
                  donde se establecen diálogos sobre espiritualidad y medicinas naturales.
                  Todos los jueves estaremos contigo y nuestros invitados para levantar el rezo e impartir mensajes
                  e información que embalsamen el alma del escucha a través de la música que eleva la conciencia.</p>
              </div>
              <div class="welcome_video_box">
                <iframe
                  v-if="videoPlaying[2]"
                  src="https://www.youtube.com/embed/QjhKvZ_yevA?autoplay=1"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                  class="video-iframe"
                ></iframe>
                <template v-else>
                  <img src="https://img.youtube.com/vi/QjhKvZ_yevA/maxresdefault.jpg" alt="Video" class="video-thumbnail" />
                  <button @click="playVideo(2)" class="welcome_video_btn"><i class="fa fa-play"></i></button>
                </template>
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
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const SwiperAutoplay = Autoplay
const SwiperNavigation = Navigation
const SwiperPagination = Pagination

const videoPlaying = ref([false, false, false])

function playVideo(index) {
  videoPlaying.value = videoPlaying.value.map((_, i) => i === index)
}
</script>

<style scoped>

.welcome_video_box {
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
}

.video-thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.welcome_video_btn {
  position: relative;
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.radio-image {
  width: 100%;
  max-width: 450px;
  height: auto;
  display: block;
  margin: 0 auto;
  filter: invert(1);
}
.ancestral-image {
  width: 100%;
  max-width: 450px;
  height: auto;
  display: block;
  margin: 0 auto;
}
.sesiones-image {
  width: 100%;
  max-width: 450px;
  height: auto;
  display: block;
  margin: 0 auto;
  filter: invert(1);
}
.welcome_one {
  position: relative;
  padding: 60px 0 120px !important;
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

.welcome-navigation-external-mobile {
  display: none;
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
  .welcome-navigation-external {
    display: none;
  }

  .welcome-navigation-external-mobile {
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
    padding: 0 20px;
  }

  .welcome-button-prev-mobile,
  .welcome-button-next-mobile {
    position: relative;
    width: 50px;
    height: 50px;
    background: var(--thm-primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    font-size: 20px;
  }

  .welcome-button-prev-mobile:hover,
  .welcome-button-next-mobile:hover {
    background: var(--thm-secondary);
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
}

@media (max-width: 480px) {
  .welcome-navigation-external-mobile {
    margin: 30px 0;
  }

  .welcome-button-prev-mobile,
  .welcome-button-next-mobile {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
}

/* Font weight adjustments are now handled globally */
</style>
