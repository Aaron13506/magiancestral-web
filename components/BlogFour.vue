<template>
  <section class="blog_four">
    <div class="container">
      <div class="row">
        <div class="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay="100ms">
          <div class="block-title text-left">
            <p>del blog</p>
            <h3>Artículos sobre<br>medicina natural y<br>magia ancestral</h3>
            <div class="leaf">
              <img src="/assets/images/resources/leaf.png" alt="">
            </div>
          </div>
          <div class="blog-four_btn">
            <a href="" class="thm-btn">Ver Todas las Noticias</a>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4">
          <div class="blog_four_single wow fadeInLeft" data-wow-delay="300ms">
            <div class="blog_four_image">
              <img src="/assets/images/blog/blog-4-img-1.jpg" alt="">
              <div class="blog_four_date_box">
                <p>15 Ene, 2025</p>
              </div>
            </div>
            <div class="blog-four_content">
              <ul class="list-unstyled blog-four_meta">
                <li><nuxt-link to="/news_detail"><i class="far fa-user-circle"></i> Admin</nuxt-link></li>
                <li><nuxt-link to="/news_detail"><i class="far fa-comments"></i> 2 Comentarios</nuxt-link></li>
              </ul>
              <h3><nuxt-link to="/news_detail" class="blog_four_title">Los Milagros de la<br>Medicina Natural<br>que Debes Conocer</nuxt-link></h3>
              <div class="blog_four_read_more_btn">
                <nuxt-link to="/news_detail"><i class="fa fa-angle-right"></i>Leer Más</nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-lg-4">
          <div class="blog_four_single wow fadeInLeft" data-wow-delay="600ms">
            <div class="blog_four_image">
              <img src="/assets/images/blog/blog-4-img-2.jpg" alt="">
              <div class="blog_four_date_box">
                <p>20 Ene, 2025</p>
              </div>
            </div>
            <div class="blog-four_content">
              <ul class="list-unstyled blog-four_meta">
                <li><nuxt-link to="/news_detail"><i class="far fa-user-circle"></i> Admin</nuxt-link></li>
                <li><nuxt-link to="/news_detail"><i class="far fa-comments"></i> 2 Comentarios</nuxt-link></li>
              </ul>
              <h3><nuxt-link to="/news_detail" class="blog_four_title">Plantas Medicinales<br>Ancestrales para la<br>Sanación</nuxt-link></h3>
              <div class="blog_four_read_more_btn">
                <nuxt-link to="/news_detail"><i class="fa fa-angle-right"></i>Leer Más</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
      name: "BlogFour"
    }
</script>

<style scoped>

</style>
