<template>
  <div class="site_header__header_four_wrap">
    <div class="topbar-one topbar_four">
      <div class="container">
        <div class="topbar-one__left">
          <a href="mailto:magiancestralvzla@gmail.com"
            ><span class="icon-message"></span>magiancestralvzla@gmail.com</a
          >
          <a href="tel:666-999-0000"
            ><span class="icon-phone-call"></span>412 XXX-XXXX</a
          >
        </div>
        <div class="topbar-one__middle">
          <a href="/" class="main-nav__logo">
            <img
              src="/assets/images/resources/image.png"
              class="main-logo"
              alt="Awesome Image"
            />
          </a>
        </div>
        <div class="topbar-one__right">
          <div class="topbar-one__social home-four">
            <a href="#"><i class="fab fa-facebook-square"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
            <a href="#"><i class="fab fa-telegram"></i></a>
          </div>
        </div>
      </div>
    </div>

    <header class="main-nav__header-one main-nav__header-four">
      <nav
        :class="`header-navigation stricky ${
          sticky ? 'stricked-menu stricky-fixed' : ''
        }`"
      >
        <div class="container clearfix">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="main-nav__left main_nav__left_four">
            <a href="#" class="side-menu__toggler">
              <i @click="mobileToggle = !mobileToggle" class="fa fa-bars"></i>
            </a>
          </div>
          <!-- Mobile logo - shown only on mobile -->
          <div class="main-nav__mobile-logo">
            <a href="/" class="main-nav__logo">
              <img
                src="/assets/images/resources/image.png"
                class="main-logo"
                alt="Awesome Image"
              />
            </a>
          </div>
          <div class="main-nav__main-navigation four">
            <ul class="main-nav__navigation-box">
              <li class="current">
                <nuxt-link to="/">Inicio</nuxt-link>
              </li>
              <li class="dropdown">
                <nuxt-link to="/service">Servicios</nuxt-link>
                <ul>
                  <li><nuxt-link to="/service">Services</nuxt-link></li>
                  <li>
                    <nuxt-link to="/service-detail">Detalles del Servicio</nuxt-link>
                  </li>
                </ul>
                <!-- /.sub-menu -->
              </li>
              <li class="dropdown">
                <nuxt-link to="/projects">Nuestros Proyectos</nuxt-link>
                <ul>
                  <li><nuxt-link to="/projects">Proyectos</nuxt-link></li>
                  <li>
                    <nuxt-link to="/projects_detail">Detalles del Proyecto</nuxt-link>
                  </li>
                </ul>
                <!-- /.sub-menu -->
              </li>
              <li class="dropdown">
                <nuxt-link to="#">Páginas</nuxt-link>
                <ul>
                  <li><nuxt-link to="/about">Acerca de</nuxt-link></li>
                  <li>
                    <nuxt-link to="/why_choose_us">Por qué Elegirnos</nuxt-link>
                  </li>
                  <li><nuxt-link to="/farmers">Agricultores</nuxt-link></li>
                  <li><nuxt-link to="/gallery">Galería</nuxt-link></li>
                </ul>
                <!-- /.sub-menu -->
              </li>
              <li class="dropdown">
                <nuxt-link to="#">Noticias</nuxt-link>
                <ul>
                  <li><nuxt-link to="/news">Noticias</nuxt-link></li>
                  <li><nuxt-link to="/news_detail">Detalles de Noticia</nuxt-link></li>
                </ul>
                <!-- /.sub-menu -->
              </li>
              <li>
                <nuxt-link to="/contact">Contacto</nuxt-link>
              </li>
            </ul>
          </div>
          <!-- /.navbar-collapse -->

          <div class="main-nav__right four">
            <!-- Cart removed -->
          </div>
        </div>

        <!-- Radio Player integrado dentro del nav sticky -->
        <RadioPlayer />
      </nav>

      <nav
        class="mobile-nav__container"
        :style="`display: ${mobileToggle ? 'block' : 'none'}`"
      >
        <!-- content is loading via js -->

        <ul class="main-nav__navigation-box">
          <li class="current">
            <nuxt-link to="/">Inicio</nuxt-link>
          </li>
          <li class="dropdown">
            <div class="menu-holder">
              Servicios<button class="dropdown-btn">
                <i class="fa fa-angle-right"></i>
              </button>
            </div>
            <ul>
              <li><nuxt-link to="/service">Services</nuxt-link></li>
              <li>
                <nuxt-link to="/service-detail">Detalles del Servicio</nuxt-link>
              </li>
            </ul>
            <!-- /.sub-menu -->
          </li>
          <li class="dropdown">
            <div class="menu-holder">
              Nuestros Proyectos<button class="dropdown-btn">
                <i class="fa fa-angle-right"></i>
              </button>
            </div>
            <ul>
              <li><nuxt-link to="/projects">Proyectos</nuxt-link></li>
              <li>
                <nuxt-link to="/projects_detail">Detalles del Proyecto</nuxt-link>
              </li>
            </ul>
            <!-- /.sub-menu -->
          </li>
          <li class="dropdown">
            <div class="menu-holder">
              Páginas<button class="dropdown-btn">
                <i class="fa fa-angle-right"></i>
              </button>
            </div>
            <ul>
              <li><nuxt-link to="/about">Acerca de</nuxt-link></li>
              <li><nuxt-link to="/why_choose_us">Por qué Elegirnos</nuxt-link></li>
              <li><nuxt-link to="/farmers">Agricultores</nuxt-link></li>
              <li><nuxt-link to="/gallery">Galería</nuxt-link></li>
            </ul>
            <!-- /.sub-menu -->
          </li>
          <li class="dropdown">
            <div class="menu-holder">
              Noticias<button class="dropdown-btn">
                <i class="fa fa-angle-right"></i>
              </button>
            </div>
            <ul>
              <li><nuxt-link to="/news">Noticias</nuxt-link></li>
              <li><nuxt-link to="/news_detail">Detalles de Noticia</nuxt-link></li>
            </ul>
            <!-- /.sub-menu -->
          </li>
          <li>
            <nuxt-link to="/contact">Contacto</nuxt-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMainStore } from '~/store/index.js'

const store = useMainStore()

const sticky = ref(false)
const mobileToggle = ref(false)

const handleScroll = () => {
  if (window.scrollY > 70) {
    sticky.value = true
  } else if (window.scrollY < 70) {
    sticky.value = false
  }
}

const searchPopupStatusChange = () => {
  store.changeSearchPopupStatus()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Hide topbar on mobile */
@media (max-width: 1023px) {
  .topbar-one.topbar_four {
    display: none;
  }

  .container.clearfix {
    position: relative;
  }

  .main-nav__mobile-logo {
    display: block;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }

  .main-nav__mobile-logo .main-logo {
    width: 50px;
    height: 50px;
  }
}

/* Hide mobile logo on desktop */
@media (min-width: 1024px) {
  .main-nav__mobile-logo {
    display: none;
  }
}
</style>
