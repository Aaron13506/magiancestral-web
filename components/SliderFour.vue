<template>
  <section class="banner_four_section">
    <div class="banner-carousel-four">
      <Swiper
        :modules="[SwiperAutoplay, SwiperNavigation]"
        :slides-per-view="1"
        :autoplay="{ delay: 5000 }"
        :loop="true"
        :navigation="false"
        class="swiper-container"
      >
        <!-- Slide Item -->
        <SwiperSlide>
          <div class="slide-item">
            <div class="image-layer" style="background-image: url(/assets/images/main-slider/paisaje4.jpg);">
            </div>
            <div class="auto-container">
              <div class="content-box">
                <div class="content text-left">
                  <div class="inner">
                    <h1><span>Magia</span><br>Ancestral</h1>
                    <div class="subtitle-box">
                      <p class="subtitle">Te da la bienvenida a <span class="familia-break">nuestra familia</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide Item -->
        <SwiperSlide>
          <div class="slide-item">
            <div class="image-layer" style="background-image: url(/assets/images/main-slider/IMG_20250604_180630_493-4.jpg);">
            </div>
            <div class="auto-container">
              <div class="content-box">
                <div class="content text-left">
                  <div class="inner">
                    <h1><span>Magia</span><br> Ancestral</h1>
                    <div class="subtitle-box">
                      <p class="subtitle">Te da la bienvenida a <span class="familia-break">nuestra familia</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <!-- Slide Item -->
        <SwiperSlide>
          <div class="slide-item">
            <div class="image-layer" style="background-image: url(/assets/images/main-slider/slider_3.jpg);">
            </div>
            <div class="auto-container">
              <div class="content-box">
                <div class="content text-left">
                  <div class="inner">
                    <h1><span>Magia</span><br> Ancestral</h1>
                    <div class="subtitle-box">
                      <p class="subtitle">Te da la bienvenida<span class="familia-break"> a nuestra familia</span></p>
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
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

// Swiper modules
const SwiperAutoplay = Autoplay
const SwiperNavigation = Navigation
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
}

.inner h1 {
  font-size: 6.5rem !important;
  color: white !important;
  line-height: 0.9 !important;
  margin-bottom: 20px !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
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
  margin-top: 30px !important;
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
    font-size: 4rem !important;
  }

  .subtitle {
    font-size: 1.1rem !important;
    padding: 10px 20px !important;
  }

  .familia-break {
    display: block;
  }

  .content.text-left {
    text-align: center;
  }

  .slide-item {
    height: 70vh;
    min-height: 500px;
  }

  .banner-carousel-four {
    height: 70vh;
    min-height: 500px;
  }
}

@media (max-width: 480px) {
  .inner h1 {
    font-size: 4rem !important;
  }

  .subtitle {
    font-size: 0.9rem !important;
    padding: 8px 16px !important;
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
  margin-top: 90px !important;
}
</style>
