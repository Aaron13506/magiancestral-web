<template>
  <section class="service_four">
    <div class="container">
      <div class="service_four_top"></div>
      <div class="block-title text-center">
        <p>Lo que hacemos</p>
        <h3>Servicios que Ofrecemos</h3>
        <div class="leaf">
          <img src="/assets/images/resources/leaf.png" alt="">
        </div>
      </div>
      <div class="row">
        <div class="col-xl-3 col-lg-3 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="300ms">
            <div class="service_four_icon">
              <span class="icon-temperature"></span>
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">hierbas medicinales frescas</nuxt-link></h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="400ms">
            <div class="service_four_icon">
              <span class="icon-harvest"></span>
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">productos naturales</nuxt-link>
              </h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="500ms">
            <div class="service_four_icon">
              <span class="icon-growth"></span>
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">remedios orgánicos</nuxt-link></h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="600ms">
            <div class="service_four_icon">
              <span class="icon-wheat"></span>
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">preparación de tinturas</nuxt-link></h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="700ms">
            <div class="service_four_icon">
              <span class="icon-dairy"></span>
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">terapias naturales</nuxt-link></h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="800ms">
            <div class="service_four_icon">
              <span class="icon-livestock"></span>
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">cuidado holístico</nuxt-link></h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="900ms">
            <div class="service_four_icon">
              <span class="icon-farming"></span>
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">consulta de medicina natural</nuxt-link></h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
              </p>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "ServiceFour"
    }
</script>

<style scoped>

</style>
