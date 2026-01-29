<template>
  <div class="site_header__header_four_wrap">
    <div class="topbar-one topbar_four">
      <div class="container">
        <div class="topbar-one__left">
          <a href="mailto:magiancestralvzla@gmail.com"
            ><span class="icon-message"></span>magiancestralvzla@gmail.com</a
          >
          <a href="https://wa.me/584241600760"
            ><span class="icon-phone-call"></span>0424 160-0760</a
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
          <nuxt-link to="/cart" class="cart-icon-topbar">
            <i class="icon-shopping-cart"></i>
            <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
          </nuxt-link>
          <div class="topbar-one__social home-four">
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
          <!-- Mobile logo - centered on mobile -->
          <div class="main-nav__mobile-logo">
            <a href="/" class="main-nav__logo">
              <img
                src="/assets/images/resources/image.png"
                class="main-logo"
                alt="Awesome Image"
              />
            </a>
          </div>
          <!-- Mobile cart - shown only on mobile -->
          <div class="main-nav__mobile-cart">
            <nuxt-link to="/cart" class="cart-icon-mobile">
              <i class="icon-shopping-cart"></i>
              <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
            </nuxt-link>
          </div>
          <div class="main-nav__main-navigation four">
            <ul class="main-nav__navigation-box">
              <li :class="{ current: $route.path === '/' }">
                <nuxt-link to="/">Inicio</nuxt-link>
              </li>
              <li :class="{ current: $route.path === '/service-detail' }">
                <nuxt-link to="/service-detail">Encuentros</nuxt-link>
              </li>
              <li :class="{ current: $route.path === '/projects' || $route.path.startsWith('/projects_detail') }">
                <nuxt-link to="/projects">Eventos Mágicos</nuxt-link>
              </li>
              <li class="dropdown" :class="{ current: $route.path === '/about' || $route.path === '/farmers' }">
                <nuxt-link to="#">Acerca de</nuxt-link>
                <ul>
                  <li><nuxt-link to="/about">Mas medicinas</nuxt-link></li>
                  <li><nuxt-link to="/farmers">Sobre nosotros</nuxt-link></li>
                </ul>
                <!-- /.sub-menu -->
              </li>
              <li :class="{ current: $route.path === '/gallery' }">
                <nuxt-link to="/gallery">Galería</nuxt-link>
              </li>
              <li :class="{ current: $route.path === '/blog' || $route.path.startsWith('/blog_detail') }">
                <nuxt-link to="/blog">Bitácora</nuxt-link>
              </li>
              <li :class="{ current: $route.path === '/product' || $route.path === '/product-detail' || $route.path === '/cart' || $route.path === '/checkout' }">
                <nuxt-link to="/product">Botica mágica</nuxt-link>
              </li>
            </ul>
          </div>
          <!-- /.navbar-collapse -->

          <div class="main-nav__right four">
            <!-- Cart moved to topbar for desktop and mobile-cart for mobile -->
          </div>
        </div>

        <!-- Radio Player integrado dentro del nav sticky -->
        <RadioPlayer />

        <!-- Mobile Navigation Container moved inside sticky nav -->
        <div
          class="mobile-nav__container"
          :style="`display: ${mobileToggle ? 'block' : 'none'}`"
        >
          <!-- content is loading via js -->

          <ul class="main-nav__navigation-box">
          <li :class="{ current: $route.path === '/' }">
            <nuxt-link to="/">Inicio</nuxt-link>
          </li>
          <li :class="{ current: $route.path === '/service-detail' }">
            <nuxt-link to="/service-detail">Encuentros</nuxt-link>
          </li>
          <li :class="{ current: $route.path === '/projects' || $route.path.startsWith('/projects_detail') }">
            <nuxt-link to="/projects">Eventos Mágicos</nuxt-link>
          </li>
          <li class="dropdown" :class="{ current: $route.path === '/about' || $route.path === '/farmers' }">
            <div class="menu-holder">
              Acerca de<button
                class="dropdown-btn"
                :class="{ open: dropdownStates.nosotros }"
                @click="toggleDropdown('nosotros')"
              >
                <i class="fa fa-angle-right"></i>
              </button>
            </div>
            <ul :style="`display: ${dropdownStates.nosotros ? 'block' : 'none'}`">
              <li><nuxt-link to="/about">Mas medicinas</nuxt-link></li>
              <li><nuxt-link to="/farmers">Sobre nosotros</nuxt-link></li>
            </ul>
            <!-- /.sub-menu -->
          </li>
          <li :class="{ current: $route.path === '/gallery' }">
            <nuxt-link to="/gallery">Galería</nuxt-link>
          </li>
          <li :class="{ current: $route.path === '/blog' || $route.path.startsWith('/blog_detail') }">
            <nuxt-link to="/blog">Bitácora</nuxt-link>
          </li>
          <li :class="{ current: $route.path === '/product' || $route.path === '/product-detail' || $route.path === '/cart' || $route.path === '/checkout' }">
            <nuxt-link to="/product">Botica mágica</nuxt-link>
          </li>
        </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMainStore, useCartStore } from '~/store/index.js'

const store = useMainStore()
const cartStore = useCartStore()

// Cargar carrito desde localStorage al montar
onMounted(() => {
  cartStore.loadCart()
})

const sticky = ref(false)
const mobileToggle = ref(false)
const dropdownStates = ref({
  services: false,
  nosotros: false
})

const handleScroll = () => {
  let trigger = 70
  if (window.innerWidth < 768) {
    trigger = 30
  } else if (window.innerWidth < 1024) {
    trigger = 40
  } else if (window.innerWidth < 1200) {
    trigger = 50
  }

  if (window.scrollY > trigger) {
    sticky.value = true
  } else if (window.scrollY < trigger) {
    sticky.value = false
  }
}

const searchPopupStatusChange = () => {
  store.changeSearchPopupStatus()
}

const toggleDropdown = (dropdownName) => {
  dropdownStates.value[dropdownName] = !dropdownStates.value[dropdownName]
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

  /* Hide desktop navigation on mobile */
  .main-nav__main-navigation.four {
    display: none !important;
  }

  .container.clearfix {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Mobile logo - centered */
  .main-nav__mobile-logo {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .main-nav__mobile-logo .main-logo {
    width: 50px;
    height: 50px;
    filter: invert(1);
  }

  .stricky-fixed .main-nav__mobile-logo .main-logo {
    filter: invert(1);
  }

  /* Mobile cart - right side */
  .main-nav__mobile-cart {
    display: block;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }

  .side-menu__toggler i {
    color: white;
  }

  .stricky-fixed .side-menu__toggler i {
    color: black;
  }
}

/* Center navigation automatically - perfect centering with absolute positioning */
.main-nav__header-four .container.clearfix {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 100px; /* Maintain container height */
}

.main-nav__left.main_nav__left_four {
  flex: 0 0 auto;
  z-index: 2;
}

.main-nav__main-navigation.four {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 1;
}

.main-nav__right.four {
  flex: 0 0 auto;
  z-index: 2;
}

/* Remove container max-width on mobile to prevent shrinking */
@media (max-width: 767px) {
  .container.clearfix {
    max-width: 85%;
  }
}

/* Cart icon styles - Topbar (desktop) */
.cart-icon-topbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 22px;
  margin-right: 20px;
  transition: color 0.3s ease;
}

.cart-icon-topbar:hover {
  color: #0c7737;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #0c7737;
  color: white;
  font-size: 11px;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
}

/* Mobile cart icon */
.main-nav__mobile-cart {
  display: none;
}

.cart-icon-mobile {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  transition: color 0.3s ease;
}

.stricky-fixed .cart-icon-mobile {
  color: #333;
}

/* Topbar right flex layout */
.topbar-one__right {
  display: flex;
  align-items: center;
}

/* Hide mobile cart on desktop */
@media (min-width: 1024px) {
  .main-nav__mobile-cart {
    display: none !important;
  }
}

/* Hide mobile logo on desktop */
@media (min-width: 1024px) {
  .main-nav__mobile-logo {
    display: none;
  }

  /* Expand desktop menu spacing */
  .main-nav__main-navigation.four .main-nav__navigation-box > li + li {
    margin-left: 100px; /* Increased spacing between menu items */
  }

  .main-nav__main-navigation.four .main-nav__navigation-box > li > a {
    padding: 0px 15px; /* Increased padding for wider menu items */
    white-space: nowrap; /* Keep menu items in a single line */
  }
}
</style>
