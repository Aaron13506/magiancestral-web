<template>
  <section class="service_four">
    <div class="container">
      <div class="service_four_top"></div>
      <div class="block-title text-center">
        <h3>Nuestros encuentros</h3>
        <div class="leaf">
          <img src="/assets/images/resources/leaf.png" alt="">
        </div>
      </div>
      <!-- Servicios principales -->
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-6 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="300ms">
            <div class="service_four_icon">
              <img src="/assets/images/Servicios/YageAyahuasca.png" alt="Yage Ayahuasca" class="service-image">
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">Yage / Ayahuasca</nuxt-link></h3>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="400ms">
            <div class="service_four_icon">
              <img src="/assets/images/Servicios/Reino_fungi.png" alt="Reino Fungi" class="service-image">
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">Reino Fungi</nuxt-link></h3>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Otros servicios -->
      <div class="row secondary-services">
        <div class="col-xl-3 col-lg-3 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="500ms">
            <div class="service_four_icon">
              <img src="/assets/images/Servicios/Abra_Cadabra.png" alt="Abra Cadabra" class="service-image">
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">Abra Cadabra</nuxt-link></h3>
              <p>Circulo espiritual de efectos terapeuticos</p>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="600ms">
            <div class="service_four_icon">
              <img src="/assets/images/Servicios/Teramai_Senchen.png" alt="Teramai Senchen" class="service-image">
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">Teramai Senchen</nuxt-link></h3>
              <p>Reiki <br> chamánico</p>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="700ms">
            <div class="service_four_icon">
              <img src="/assets/images/Servicios/Velada_Musical.png" alt="Velada Musical" class="service-image">
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">Sesiones</nuxt-link></h3>
              <p>Festival de musica medicinal</p>
            </div>
            <div class="service_four_read_more">
              <nuxt-link to="/service-detail"><span class="icon-left-arrow"></span></nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-lg-3 col-md-6">
          <div class="service_four_single wow fadeInLeft" data-wow-delay="800ms">
            <div class="service_four_icon">
              <img src="/assets/images/Servicios/MagicSaDan.png" alt="MagicSaDan" class="service-image">
            </div>
            <div class="service_four_deatils">
              <h3><nuxt-link to="/service-detail" class="service_four_title">MagicSaDan</nuxt-link></h3>
              <p>Movimiento mágico ancestral</p>
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
.service-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 2px;
  filter: invert(1);
}

.secondary-services {
  margin-top: 30px;
}
</style>
