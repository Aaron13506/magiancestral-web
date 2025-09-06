<template>
  <div class="brand-one brand-four">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="block-title text-center" style="margin-bottom: 40px;">
            <h3>Descubre más sobre otras medicinas</h3>
          </div>
          <div class="brand-one-carousel">
            <Swiper
              :modules="[Autoplay]"
              :slides-per-view="1"
              :space-between="30"
              :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
              }"
              :breakpoints="{
                640: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                }
              }"
              :loop="true"
            >
              <SwiperSlide>
                <div class="single_brand_item">
                  <a href="#"><img src="/assets/images/Servicios/Sec/Cacao.png" alt="Cacao"></a>
                  <h4 class="medicine-name">Cacao</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="single_brand_item">
                  <a href="#"><img src="/assets/images/Servicios/Sec/Temazcal.png" alt="Temazcal"></a>
                  <h4 class="medicine-name">Temazcal</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="single_brand_item">
                  <a href="#"><img src="/assets/images/Servicios/Sec/Wachuma-1.png" alt="Wachuma"></a>
                  <h4 class="medicine-name">Wachuma</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="single_brand_item">
                  <a href="#"><img src="/assets/images/Servicios/Sec/Xanga.png" alt="Xanga"></a>
                  <h4 class="medicine-name">Jurema</h4>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="single_brand_item">
                  <a href="#"><img src="/assets/images/Servicios/Sec/Yopo.png" alt="Yopo"></a>
                  <h4 class="medicine-name">Yopo</h4>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
</script>

<style scoped>
.single_brand_item img {
  width: 234px;
  height: 234px;
  object-fit: contain;
  max-width: 100%;
}

.single_brand_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  filter: invert(1);
}

.medicine-name {
  font-size: 40px;
  font-weight: 600;
  text-align: center;
}
</style>
