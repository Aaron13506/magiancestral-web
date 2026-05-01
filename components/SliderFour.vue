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
            <div class="image-layer slider-main1" style="background-image: url(/assets/images/main-slider/sliderMain1.jpg);">
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
            <div class="image-layer slider-main2" style="background-image: url(/assets/images/main-slider/sliderMain2-v2.jpg);">
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
            <div class="image-layer slider-main3" style="background-image: url(/assets/images/main-slider/sliderMain3.jpg);">
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
    font-size: 3.2rem !important;
    line-height: 1 !important;
    margin: 0 !important;
  }

  .subtitle {
    font-size: 1rem !important;
    padding: 10px 18px !important;
  }

  .familia-break {
    display: block;
  }

  .slide-item {
    height: 85vh;
    min-height: 520px;
  }

  .banner-carousel-four {
    height: 85vh;
    min-height: 520px;
  }
}

@media (max-width: 480px) {
  .inner h1 {
    font-size: 2.6rem !important;
    line-height: 1 !important;
    margin: 0 !important;
  }

  .subtitle {
    font-size: 0.95rem !important;
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
  margin: 0 !important;
}

@media (max-width: 768px) {
  .inner {
    gap: 24px !important;
  }

  .slider-main1 {
    background-position: center 65% !important;
  }

  .slider-main2 {
    background-position: center 38% !important;
  }

  .slider-main3 {
    background-position: 70% center !important;
  }
}

@media (max-width: 480px) {
  .inner {
    gap: 20px !important;
  }

  .slider-main2 {
    background-position: 50% 40% !important;
  }

  .slider-main3 {
    background-position: 75% 60% !important;
  }
}
</style>
