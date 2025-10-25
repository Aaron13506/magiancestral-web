<template>
    <div>
      <footer class="site-footer">
        <div class="site-footer_farm_image"></div>
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
                  <li><nuxt-link to="/farmers">Sobre nosotros</nuxt-link></li>
                  <li><nuxt-link to="/gallery">Galería</nuxt-link></li>
                  <li><nuxt-link to="/blog">Bitácora</nuxt-link></li>
                </ul>
              </div>
            </div>
            <!-- TODO: News section not implemented yet
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
                      <p><a href="/blog_detail">Aprende 10 Mejores Consejos de medicina natural</a></p>
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
                      <p><a href="/blog_detail">Perspectivas de la vida</a></p>
                    </div>
                    <div class="footer-widget__news_date_box">
                      <p>30 Oct, 2020</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            -->
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
                    <a href="https://www.tiktok.com/@magiancestral_ven" target="_blank">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                      </svg>
                    </a>
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
.site-footer_farm_image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/assets/images/icon/fractal.svg');
  background-repeat: repeat;
  background-size: 170px 170px;
  opacity: 0.1;
  z-index: 1;
}

.site-footer_farm_image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, #0e3858 100%);
  z-index: 2;
}

.site-footer {
  position: relative;
}

.container {
  position: relative;
  z-index: 3;
}
</style>
