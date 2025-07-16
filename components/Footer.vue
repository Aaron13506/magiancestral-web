<template>
    <div>
      <footer class="site-footer">
        <div class="site-footer_farm_image"><img src="/assets/images/resources/site-footer-farm.png"
                                                 alt="Farm Image"></div>
        <div class="container">
          <div class="row no-gutters">
            <div class="col-xl-4 col-lg-4 col-md-6">
              <div class="footer-widget__column footer-widget__about wow fadeInUp" data-wow-delay="100ms">
                <div class="footer-widget__title">
                  <h3>Acerca de</h3>
                </div>
                <div class="footer-widget_about_text">
                  <p>Lorem ipsum</p>
                </div>
                <form>
                  <div class="footer_input-box">
                    <input type="Email" placeholder="Dirección de Email">
                    <button type="submit" class="button"><i class="fa fa-check"></i></button>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-xl-2 col-lg-2 col-md-6">
              <div class="footer-widget__column footer-widget__link wow fadeInUp" data-wow-delay="200ms">
                <div class="footer-widget__title">
                  <h3>Explorar</h3>
                </div>
                <ul class="footer-widget__links-list list-unstyled">
                  <li><a href="/about">Acerca de</a></li>
                  <li><a href="/service">Servicios</a></li>
                  <li><a href="/projects">Nuestros Proyectos</a></li>
                  <li><a href="/farmers">Agricultores</a></li>
                  <li><a href="/news">Noticias</a></li>
                  <li><a href="/contact">Contacto</a></li>
                </ul>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-6">
              <div class="footer-widget__column footer-widget__news wow fadeInUp" data-wow-delay="300ms">
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
              <div class="footer-widget__column footer-widget__contact wow fadeInUp" data-wow-delay="400ms">
                <div class="footer-widget__title">
                  <h3>Contacto</h3>
                </div>
                <div class="footer-widget_contact">
                  <a href="mailto:magiancestralvzla@gmail.com">magiancestralvzla@gmail.com</a><br>
                  <a href="tel:412-XXX-XXXX">412 XXX-XXXX</a>
                  <div class="site-footer__social">
                    <a href="#"><i class="fab fa-facebook-square"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-youtube"></i></a>
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
