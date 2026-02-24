<template>
  <section class="donation-cta" style="background-image: url(/assets/images/backgrounds/ocaso.jpg);">
    <div class="donation-cta__overlay"></div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-8 col-lg-10">
          <div class="donation-cta__content wow fadeInUp" data-wow-delay="100ms">
            <div class="donation-cta__icon">
              <i class="fa fa-hands-holding-heart"></i>
            </div>
            <h2 class="donation-cta__title">Apoya la Magia Ancestral</h2>
            <p class="donation-cta__text">
              Tu contribución nos permite seguir compartiendo la medicina, la música
              y el conocimiento ancestral con el mundo. Cada aporte fortalece nuestra misión
              de sanar y reconectar con la sabiduría de nuestros ancestros.
            </p>

            <div class="donation-cta__methods">
              <!-- Binance -->
              <div class="donation-cta__method wow fadeInUp" data-wow-delay="200ms">
                <div class="donation-cta__method-header" @click="toggleMethod('binance')">
                  <div class="donation-cta__method-icon">
                    <svg viewBox="0 0 126.61 126.61" width="28" height="28" fill="currentColor">
                      <path d="M38.73 53.2l24.59-24.58 24.6 24.6 14.3-14.31L63.32 0l-38.9 38.9zM0 63.31l14.3-14.31 14.31 14.31-14.31 14.3zm38.73 10.11l24.59 24.59 24.6-24.6 14.31 14.29-38.9 38.91-38.91-38.88-.02.01 14.33-14.32zM98 63.31l14.3-14.31 14.31 14.31-14.31 14.3z"/>
                      <path d="M77.83 63.3l-14.51-14.52-10.73 10.73-1.24 1.23-2.54 2.54 14.51 14.53 14.51-14.51z"/>
                    </svg>
                  </div>
                  <div class="donation-cta__method-info">
                    <h4>Binance</h4>
                    <p>Criptomonedas (USDT, BTC, BNB)</p>
                  </div>
                  <div class="donation-cta__method-toggle">
                    <i :class="activeMethod === 'binance' ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
                  </div>
                </div>
                <transition name="slide">
                  <div v-if="activeMethod === 'binance'" class="donation-cta__method-body">
                    <div class="donation-cta__detail">
                      <span class="donation-cta__label">Binance Pay ID:</span>
                      <div class="donation-cta__value-row">
                        <code class="donation-cta__value">{{ binanceId }}</code>
                        <button class="donation-cta__copy" @click="copyToClipboard(binanceId, 'binance')" :title="copied === 'binance' ? 'Copiado' : 'Copiar'">
                          <i :class="copied === 'binance' ? 'fa fa-check' : 'fa fa-copy'"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>

              <!-- Pago Móvil -->
              <div class="donation-cta__method wow fadeInUp" data-wow-delay="300ms">
                <div class="donation-cta__method-header" @click="toggleMethod('pago')">
                  <div class="donation-cta__method-icon">
                    <i class="fa fa-mobile-alt"></i>
                  </div>
                  <div class="donation-cta__method-info">
                    <h4>Pago Móvil</h4>
                    <p>Transferencia bancaria venezolana</p>
                  </div>
                  <div class="donation-cta__method-toggle">
                    <i :class="activeMethod === 'pago' ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
                  </div>
                </div>
                <transition name="slide">
                  <div v-if="activeMethod === 'pago'" class="donation-cta__method-body">
                    <div class="donation-cta__detail">
                      <span class="donation-cta__label">Banco:</span>
                      <span class="donation-cta__value-text">{{ pagoMovil.banco }}</span>
                    </div>
                    <div class="donation-cta__detail">
                      <span class="donation-cta__label">Teléfono:</span>
                      <div class="donation-cta__value-row">
                        <code class="donation-cta__value">{{ pagoMovil.telefono }}</code>
                        <button class="donation-cta__copy" @click="copyToClipboard(pagoMovil.telefono, 'telefono')" :title="copied === 'telefono' ? 'Copiado' : 'Copiar'">
                          <i :class="copied === 'telefono' ? 'fa fa-check' : 'fa fa-copy'"></i>
                        </button>
                      </div>
                    </div>
                    <div class="donation-cta__detail">
                      <span class="donation-cta__label">Cédula:</span>
                      <div class="donation-cta__value-row">
                        <code class="donation-cta__value">{{ pagoMovil.cedula }}</code>
                        <button class="donation-cta__copy" @click="copyToClipboard(pagoMovil.cedula, 'cedula')" :title="copied === 'cedula' ? 'Copiado' : 'Copiar'">
                          <i :class="copied === 'cedula' ? 'fa fa-check' : 'fa fa-copy'"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeMethod = ref(null)
const copied = ref(null)

// Datos de pago - actualizar con los datos reales
const binanceId = '871807268'
const pagoMovil = {
  banco: 'Banesco (0134)',
  telefono: '04241600760',
  cedula: '9925424'
}

const toggleMethod = (method) => {
  activeMethod.value = activeMethod.value === method ? null : method
}

const copyToClipboard = async (text, id) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = id
    setTimeout(() => {
      copied.value = null
    }, 2000)
  } catch {
    // Fallback para navegadores sin soporte de clipboard
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = id
    setTimeout(() => {
      copied.value = null
    }, 2000)
  }
}
</script>

<style scoped>
.donation-cta {
  position: relative;
  padding: 100px 0;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: hidden;
}

.donation-cta__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(14, 56, 88, 0.92) 0%, rgba(17, 71, 54, 0.88) 100%);
  z-index: 1;
}

.donation-cta .container {
  position: relative;
  z-index: 2;
}

.donation-cta__content {
  text-align: center;
}

.donation-cta__icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 25px;
  background: rgba(179, 168, 90, 0.15);
  border: 2px solid var(--thm-base);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donation-cta__icon i {
  font-size: 32px;
  color: var(--thm-base);
}

.donation-cta__title {
  font-size: 42px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: 700;
}

.donation-cta__text {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 45px;
}

/* Métodos de pago */
.donation-cta__methods {
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.donation-cta__method {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.donation-cta__method:hover {
  border-color: var(--thm-base);
  background: rgba(255, 255, 255, 0.12);
}

.donation-cta__method-header {
  display: flex;
  align-items: center;
  padding: 18px 22px;
  cursor: pointer;
  gap: 16px;
  user-select: none;
}

.donation-cta__method-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  background: rgba(179, 168, 90, 0.15);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--thm-base);
}

.donation-cta__method-icon i {
  font-size: 22px;
}

.donation-cta__method-info {
  flex: 1;
  text-align: left;
}

.donation-cta__method-info h4 {
  color: #fff;
  font-size: 18px;
  margin: 0 0 2px;
  font-weight: 600;
}

.donation-cta__method-info p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin: 0;
}

.donation-cta__method-toggle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  flex-shrink: 0;
}

/* Cuerpo expandible */
.donation-cta__method-body {
  padding: 0 22px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 18px;
}

.donation-cta__detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.donation-cta__label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
  flex-shrink: 0;
}

.donation-cta__value-text {
  color: #fff;
  font-size: 15px;
  font-weight: 500;
}

.donation-cta__value-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.donation-cta__value {
  color: var(--thm-base);
  font-size: 15px;
  background: rgba(0, 0, 0, 0.25);
  padding: 5px 12px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.donation-cta__copy {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  flex-shrink: 0;
}

.donation-cta__copy:hover {
  background: var(--thm-base);
  border-color: var(--thm-base);
  color: #fff;
}

.donation-cta__copy .fa-check {
  color: #4ade80;
}

.donation-cta__hint {
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  margin: 14px 0 0;
  font-style: italic;
  text-align: left;
}

/* Animación de expansión */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .donation-cta {
    padding: 70px 0;
    background-attachment: scroll;
  }

  .donation-cta__title {
    font-size: 30px;
  }

  .donation-cta__text {
    font-size: 16px;
    margin-bottom: 35px;
  }

  .donation-cta__method-header {
    padding: 14px 16px;
  }

  .donation-cta__method-body {
    padding: 0 16px 16px;
    padding-top: 14px;
  }

  .donation-cta__detail {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .donation-cta__title {
    font-size: 26px;
  }

  .donation-cta__icon {
    width: 65px;
    height: 65px;
  }

  .donation-cta__icon i {
    font-size: 26px;
  }

  .donation-cta__method-icon {
    width: 40px;
    height: 40px;
  }

  .donation-cta__method-info h4 {
    font-size: 16px;
  }
}
</style>
