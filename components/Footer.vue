<template>
    <div>
      <footer class="site-footer">
        <div class="site-footer_farm_image"><img src="/assets/images/resources/site-footer-farm.png"
                                                 alt="Farm Image"></div>
        <div class="container">
          <div class="row no-gutters justify-content-center">
            <div class="col-xl-3 col-lg-3 col-md-6">
              <div class="footer-widget__column footer-widget__link wow fadeInUp" data-wow-delay="200ms">
                <div class="footer-widget__title">
                  <h3>Explorar</h3>
                </div>
                <ul class="footer-widget__links-list list-unstyled">
                  <li><nuxt-link to="/">Inicio</nuxt-link></li>
                  <li><nuxt-link to="/service-detail">Encuentros</nuxt-link></li>
                  <li><nuxt-link to="/projects">Nuestros Proyectos</nuxt-link></li>
                  <li><nuxt-link to="/about">Acerca de</nuxt-link></li>
                  <li><nuxt-link to="/farmers">Agricultores</nuxt-link></li>
                  <li><nuxt-link to="/gallery">Galería</nuxt-link></li>
                  <li><nuxt-link to="/news">Noticias</nuxt-link></li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6">
              <div class="footer-widget__column footer-widget__news wow fadeInUp" data-wow-delay="200ms">
                <div class="footer-widget__title">
                  <h3>Noticias</h3>
                </div>
                <ul class="footer-widget__news list-unstyled">
                  <li>
                    <div class="footer-widget__news_image">
                      <img src="/assets/images/resources/footer-1-img-1.jpg" alt="">
                    </div>
                    <div class="footer-widget__news_text">
                      <p><a href="/news_detail">Aprende 10 Mejores Consejos de medicina natural</a></p>
                    </div>
                    <div class="footer-widget__news_date_box">
                      <p>30 Oct, 2020</p>
                    </div>
                  </li>
                  <li>
                    <div class="footer-widget__news_image">
                      <img src="/assets/images/resources/footer-1-img-2.jpg" alt="">
                    </div>
                    <div class="footer-widget__news_text">
                      <p><a href="/news_detail">Perspectivas de la vida</a></p>
                    </div>
                    <div class="footer-widget__news_date_box">
                      <p>30 Oct, 2020</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6">
              <div class="footer-widget__column footer-widget__contact wow fadeInUp" data-wow-delay="300ms">
                <div class="footer-widget__title">
                  <h3>Contacto</h3>
                </div>
                <div class="footer-widget_contact">
                  <a href="mailto:magiancestralvzla@gmail.com">magiancestralvzla@gmail.com</a><br>
                  <a href="tel:412-XXX-XXXX">0424 160-0760</a><br>
                  <a href="tel:412-XXX-XXXX">0412 752-9535</a><br>
                  <a href="tel:412-XXX-XXXX">0414 910-5091</a>
                  <div class="site-footer__social">
                    <a href="https://www.tiktok.com/@magiancestral_ven" target="_blank"><i class="fab fa-tiktok"></i></a>
                    <a href="https://www.instagram.com/magiancestral_ven" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.youtube.com/@magiancestralven" target="_blank"><i class="fab fa-youtube"></i></a>
                    <a href="https://t.me/+5WQULe_zXww4ZDEx" target="_blank"><i class="fab fa-telegram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div class="site-footer_bottom">
        <div class="container">
          <div class="site-footer_bottom_copyright">
            <p>© Todos los derechos reservados 2025, <a href="#">magiancestral</a></p>
          </div>
          <div class="site-footer_bottom_menu">
            <ul class="list-unstyled">
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Términos de Uso</a></li>
            </ul>
          </div>
        </div>
      </div>

      <a @click="scrollTop" href="#" class="scroll-to-target scroll-to-top" :style="`display: ${scrollBtn ? 'block' : 'none'}`"><i class="fa fa-angle-up"></i></a>

    </div>
</template>

<script>
    export default {
      name: "Footer",
      data(){
        return {
          scrollBtn: false
        }
      },
      mounted() {
        window.addEventListener('scroll', this.handleScroll);
      },

      methods: {

        handleScroll () {

          if (window.scrollY > 70) {
            this.scrollBtn = true
          }
          else if (window.scrollY < 70) {
            this.scrollBtn = false
          }
        },

        scrollTop () {
          window.scrollTo(0, 0);
        }

      }
    }
</script>

<style scoped>

</style>
