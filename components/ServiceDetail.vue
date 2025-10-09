<template>
  <section class="service_detail">
    <div class="container">
      <!-- Tabs horizontales para móvil -->
      <div class="mobile-tabs-container">
        <div class="scroll-arrow scroll-arrow-left" ref="arrowLeft">
          <i class="fa fa-chevron-left"></i>
        </div>
        <div class="mobile-tabs-scroll" ref="tabsScroll" @scroll="handleTabsScroll">
          <button
            v-for="(service, key) in services"
            :key="key"
            :class="['mobile-tab', {active: activeService === key}]"
            @click="setActiveService(key)"
          >
            {{ service.tabName || service.title }}
          </button>
        </div>
        <div class="scroll-arrow scroll-arrow-right" ref="arrowRight">
          <i class="fa fa-chevron-right"></i>
        </div>
      </div>

      <div class="row">
        <div class="col-xl-4 col-lg-4">
          <div class="service_details_left desktop-sidebar">
            <ul class="list-unstyled service_all_list">
              <li :class="{active: activeService === 'general'}"><a href="#" @click.prevent="setActiveService('general')">Encuestros espirituales</a></li>
              <li :class="{active: activeService === 'yage'}"><a href="#" @click.prevent="setActiveService('yage')">Medicina ancestral de la selva</a></li>
              <li :class="{active: activeService === 'fungi'}"><a href="#" @click.prevent="setActiveService('fungi')">Reino Fungi</a></li>
              <li :class="{active: activeService === 'abra'}"><a href="#" @click.prevent="setActiveService('abra')">Abra Cadabra</a></li>
              <li :class="{active: activeService === 'teramai'}"><a href="#" @click.prevent="setActiveService('teramai')">Teramai Seichem</a></li>
              <li :class="{active: activeService === 'sesiones'}"><a href="#" @click.prevent="setActiveService('sesiones')">Sesiones</a></li>
              <li :class="{active: activeService === 'magicsadan'}"><a href="#" @click.prevent="setActiveService('magicsadan')">MagicSaDan</a></li>
            </ul>
            <div class="download_file_box">
              <a href="#"><i class="icon-pdf"></i>Download PDF File</a>
            </div>
          </div>
        </div>
        <div class="col-xl-8 col-lg-8">
          <div class="service_details_right" v-if="services[activeService]">
            <div class="harvest_innovations">
              <h2>{{ services[activeService].title }}</h2>
              <p>{{ services[activeService].description }}</p>
            </div>
            <div class="agriculture_solutions">
              <h3>Beneficios y Efectos</h3>
              <p v-if="activeService !== 'fungi' && activeService !== 'general'">Esta práctica ancestral ofrece múltiples beneficios para el crecimiento espiritual y la sanación integral del ser.</p>
              <p v-else-if="activeService === 'general'">Nuestros encuentros espirituales ofrecen una experiencia transformadora integral:</p>
            </div>
            <ul class="list-unstyled">
              <li v-for="benefit in services[activeService].benefits" :key="benefit">
                <i class="fa fa-check"></i>{{ benefit }}
              </li>
            </ul>
            <div v-if="activeService === 'fungi' && services[activeService].contraindications" class="contraindications-section">
              <div class="agriculture_solutions">
                <h3>Información Adicional</h3>
                <div class="contraindications-content">{{ services[activeService].contraindications }}</div>
              </div>
            </div>
            <p class="service_details_last_text" v-if="(activeService === 'yage' || activeService === 'general') && services[activeService].additionalInfo">
              {{ services[activeService].additionalInfo }}
            </p>
            <p class="service_details_last_text" v-else-if="activeService !== 'fungi' && activeService !== 'yage' && activeService !== 'general'">
              Nuestros encuentros están guiados por facilitadores experimentados que acompañan tu proceso de sanación y transformación personal con respeto, sabiduría y amor incondicional.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    import FaqOne from "./FaqOne";
    export default {
        name: "ServiceDetail",
        components: {FaqOne},
        data() {
            return {
                activeService: 'general',
                services: {
                    general: {
                        title: 'Encuentros Espirituales',
                        tabName: 'Inicio',
                        description: 'Bienvenido a nuestro espacio sagrado de sanación y transformación. Ofrecemos diversos encuentros espirituales y terapéuticos, cada uno diseñado para acompañarte en tu proceso de autoconocimiento y crecimiento personal. Nuestras prácticas combinan la sabiduría ancestral con enfoques modernos de sanación integral, respetando las tradiciones milenarias y adaptándolas a las necesidades contemporáneas.',
                        benefits: [
                            'Sanación integral de cuerpo, mente y espíritu',
                            'Acompañamiento profesional y respetuoso',
                            'Espacios seguros para la exploración interior',
                            'Conexión con la sabiduría ancestral',
                            'Transformación personal profunda',
                            'Comunidad de apoyo y crecimiento mutuo'
                        ],
                        additionalInfo: 'Cada encuentro es facilitado por personas experimentadas que han dedicado su vida al estudio y práctica de estas medicinas sagradas. Nuestro enfoque es holístico, laico y respetuoso, honrando tanto las tradiciones ancestrales como las necesidades individuales de cada participante.'
                    },
                    yage: {
                        title: 'Medicina Ancestral de la Selva',
                        tabName: 'Medicina de la Selva',
                        image: '/assets/images/Servicios/YageAyahuasca.png',
                        description: 'La medicina ancestral de la selva ofrece una sanación integral. Proporciona claridad en los pensamientos, equilibrio emocional, y una limpieza en el cuerpo físico, permitiéndote conectar con tu ser interno. Aunque puede tomarse de día, la práctica ceremonial generalmente se realiza de noche, en un ambiente de meditación individual y en silencio, acompañada de la naturaleza, la música y otros elementos. Se participa en esta ceremonia con respeto a las culturas ancestrales, y la práctica es laica, con un enfoque en la mínima intervención pero siempre manteniendo el cuidado de los participantes.',
                        benefits: [
                            'Sanación integral: claridad mental, equilibrio emocional y limpieza física',
                            'Conexión profunda con tu ser interno',
                            'Autoconocimiento y crecimiento espiritual',
                            'Experiencia transformadora en ambiente natural'
                        ],
                        additionalInfo: 'Quienes asisten a estas ceremonias se eligen a sí mismos para sanar, tanto individual como grupalmente. Aquellos que repiten la experiencia reconocen en la medicina ancestral un camino hacia el autoconocimiento, la conexión y la magia en sus vidas. Si tienes dudas sobre esta medicina, puedes dejar tus comentarios.'
                    },
                    fungi: {
                        title: 'LA MEDICINA DEL REINO FUNGI',
                        tabName: 'Reino Fungi',
                        image: '/assets/images/Servicios/Reino_fungi.png',
                        description: 'Esta medicina te lleva a develar tu psique, revela tu esencia, te permite identificar las creencias que tienes acerca de la vida, las cuales se manifiestan en formas, colores, figuras, seres y múltiples arquetipos. Accedes a estos símbolos visionarios para llenarte de la energía que requieres en el momento de afrontar todas tus circunstancias y llenarlas de luz. Es allí en donde hallarás las respuestas que despliegan la Magia en tu Ser. Magia Ancestral.',
                        benefits: [
                            'Equilibrar el Estado de Ánimo. Por lo que generalmente se suprime el uso de medicamentos farmacéuticos',
                            'Potenciar la concentración y estimular la inteligencia, así como el nivel de aprendizaje',
                            'Desintoxica el organismo de residuos químicos y tóxicos dejados por los fármacos',
                            'Estimula la Neurogénesis cerebral al ser usada en microdosis'
                        ],
                        contraindications: `
CONTRAINDICACIONES Y SUGERENCIAS DEL USO DE LA MEDICINA DEL REINO FUNGI.

La Medicina del Reino Fungi, puede ser consumida en Macrodosis (en un solo momento) o en Microdosis (cápsulas con un gramaje mínimo, consumidas periódicamente durante un tiempo determinado); y en general, podría ser administrada a casi cualquier persona, de cualquier edad, con el seguimiento responsable adecuado. Ahora bien sugerimos tomar en cuenta:

• Esta medicina está contraindicada para personas con desequilibrios en la química cerebral y baja consciencia de su Yo Personal.
• Así mismo, está contraindicada en personas que desconocen o no tengan capacidad de discernimiento sobre la medicina que están consumiendo.
• En cualquier caso se debe evitar el uso abusivo de las microdosis y mucho más de las macrodosis.
• En las Microdosis se deben seguir las pautas y protocolos sugeridos.
• Las Macrodosis es recomendable consumirlas en contexto ceremonial, de armonía o en contexto terapéutico, con el debido acompañamiento.

LAS MICRODOSIS Y SUS USOS

La Microdosis, te cambiará la percepción paulatinamente, ya que a través de ella ocurre la neurogénesis cerebral. Aparentemente es imperceptible, ya que no despliega las facultades psico activas; asún así, la medicina está cumpliendo su propósito en ti y lo podrás sentir al percibir que lo que antes era conflictivo se transforma en material de estudio, encontrando respuestas que te llevarán a tener pensamientos claros y comportamientos armoniosos.
                        `
                    },
                    abra: {
                        title: 'Abra Cadabra',
                        tabName: 'Abra Cadabra',
                        image: '/assets/images/Servicios/Abra_Cadabra.png',
                        description: 'Este círculo espiritual ofrece múltiples beneficios para el crecimiento y la sanación integral del ser, donde combinamos técnicas ancestrales con enfoques modernos de sanación. Este espacio sagrado permite la liberación de energías estancadas y la activación de nuestro poder personal. A través de rituales, meditación y trabajo energético, encontramos el equilibrio entre cuerpo, mente y espíritu.',
                        benefits: [
                            'Limpieza energética profunda',
                            'Activación del poder personal',
                            'Balance emocional y mental',
                            'Desarrollo de habilidades espirituales'
                        ]
                    },
                    teramai: {
                        title: 'Teramai Seichem',
                        tabName: 'Teramai',
                        image: '/assets/images/Servicios/Teramai_Senchen.png',
                        description: 'El Reiki Chamánico Teramai Senchen es una poderosa modalidad de sanación que combina la sabiduría del Reiki tradicional con las prácticas chamánicas ancestrales. Esta técnica permite canalizar energía de alta vibración para sanar no solo el cuerpo físico, sino también los cuerpos emocional, mental y espiritual.',
                        benefits: [
                          'Conexión con los animales de poder personales',
                          'Conexión con la naturaleza, la magia de los colores, el canto curativo, la danza Ancestral y los reinos angelicales.',
                          'Sanación integral de todos los cuerpos',
                          'Liberación de bloqueos energéticos',
                          'Activación de chakras y centros energéticos',
                          'Conexión con guías espirituales',
                          'E instrumentos tradicionales'
                        ]
                    },
                    sesiones: {
                        title: 'Sesiones - Música de Medicina',
                        tabName: 'Sesiones',
                        image: '/assets/images/Servicios/Velada_Musical.png',
                        description: 'Las sesiones de música de medicina utilizan frecuencias sagradas, cantos ancestrales y instrumentos tradicionales para inducir estados de sanación y transformación. La música actúa como un vehículo que transporta nuestra consciencia hacia dimensiones superiores, facilitando procesos de liberación y renovación espiritual.',
                        benefits: [
                            'Sanación a través del sonido',
                            'Relajación profunda y regeneración',
                            'Liberación de tensiones y estrés',
                            'Conexión con estados meditativos profundos'
                        ]
                    },
                    magicsadan: {
                        title: 'MagicSaDan',
                        tabName: 'MagicSaDan',
                        image: '/assets/images/Servicios/MagicSaDan.png',
                        description: 'MagicSaDan es un movimiento auténtico del organismo que combina danza sagrada, respiración consciente y rituales de poder. Esta práctica nos permite reconectar con nuestra fuerza vital primordial y activar nuestro poder creador. A través del movimiento consciente, liberamos energías estancadas y despertamos nuestra naturaleza divina, conectando profundamente con la Magia que portamos nosotros mismos, con sacralidad del otro y con la totalidad del cosmos.',
                        benefits: [
                            'Activación de la energía vital',
                            'Liberación a través del movimiento',
                            'Conexión con el poder femenino/masculino',
                            'Despertar de la creatividad y pasión',
                            'Estimulación de la afectividad',
                            'Conexión con la trascendencia personal'
                        ]
                    }
                }
            }
        },
        mounted() {
            const urlParams = new URLSearchParams(window.location.search);
            const serviceParam = urlParams.get('service');
            if (serviceParam && this.services[serviceParam]) {
                this.activeService = serviceParam;
            }

            // Inicializar flechas de scroll
            this.$nextTick(() => {
                this.updateScrollArrows();
            });
        },
        methods: {
            setActiveService(serviceKey) {
                this.activeService = serviceKey;
                const url = new URL(window.location);
                url.searchParams.set('service', serviceKey);
                window.history.replaceState(null, null, url);
            },
            handleTabsScroll() {
                this.updateScrollArrows();
            },
            updateScrollArrows() {
                if (!this.$refs.tabsScroll || !this.$refs.arrowLeft || !this.$refs.arrowRight) return;

                const scrollContainer = this.$refs.tabsScroll;
                const scrollLeft = scrollContainer.scrollLeft;
                const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

                // Mostrar/ocultar flecha izquierda
                if (scrollLeft > 10) {
                    this.$refs.arrowLeft.classList.add('visible');
                } else {
                    this.$refs.arrowLeft.classList.remove('visible');
                }

                // Mostrar/ocultar flecha derecha
                if (scrollLeft < maxScroll - 10) {
                    this.$refs.arrowRight.classList.add('visible');
                } else {
                    this.$refs.arrowRight.classList.remove('visible');
                }
            }
        }
    }
</script>

<style scoped>
.contraindications-content {
  white-space: pre-wrap;
  font-family: inherit;
  font-size: 15px;
  line-height: 1.6;
  color: #666;
  margin-top: 15px;
}

.contraindications-section {
  margin-top: 30px;
}

/* Mobile Tabs - Ocultar en desktop */
.mobile-tabs-container {
  display: none;
  margin-bottom: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: sticky;
  top: 0;
  z-index: 100;
  position: relative;
}

.mobile-tabs-scroll {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  padding: 10px 5px;
  gap: 8px;
}

.mobile-tabs-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.mobile-tab {
  flex: 0 0 auto;
  padding: 12px 20px;
  background: #f8f9fa;
  border: 2px solid transparent;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #495057;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  text-transform: capitalize;
}

.mobile-tab:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.mobile-tab.active {
  background: linear-gradient(135deg, #b3a85a 0%, #7da052 100%);
  color: white;
  border-color: #7da052;
  box-shadow: 0 4px 12px rgba(179, 168, 90, 0.3);
}

/* Flechas de scroll */
.scroll-arrow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.scroll-arrow.visible {
  opacity: 1;
}

.scroll-arrow-left {
  left: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%);
}

.scroll-arrow-right {
  right: 0;
  background: linear-gradient(270deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%);
}

.scroll-arrow i {
  font-size: 1.2rem;
  color: #b3a85a;
  opacity: 0.7;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Desktop Sidebar - Mostrar solo en desktop */
.desktop-sidebar {
  display: block;
}

/* Ajuste de títulos para móvil */
.harvest_innovations h2 {
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* Responsive */
@media (max-width: 991px) {
  /* Eliminar padding superior de la sección */
  .service_detail {
    padding-top: 30px !important;
  }

  /* Mostrar tabs en móvil */
  .mobile-tabs-container {
    display: block;
    margin-top: 0;
  }

  /* Ocultar sidebar en móvil */
  .desktop-sidebar {
    display: none;
  }

  /* Ajustar columna para que ocupe todo el ancho */
  .col-xl-8.col-lg-8 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  /* Eliminar espacios en blanco en móvil */
  .row {
    margin-top: 0 !important;
  }

  .service_details_right {
    padding-top: 0;
  }

  /* Reducir padding del container principal */
  .service_detail .container {
    padding-top: 0;
  }
}

@media (max-width: 768px) {
  .harvest_innovations h2 {
    font-size: 1.8rem;
    line-height: 1.3;
    padding: 0 10px;
  }

  .agriculture_solutions h3 {
    font-size: 1.4rem;
    line-height: 1.3;
  }

  .mobile-tab {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .harvest_innovations h2 {
    font-size: 1.5rem;
    line-height: 1.2;
  }

  .agriculture_solutions h3 {
    font-size: 1.2rem;
  }

  .mobile-tab {
    padding: 8px 14px;
    font-size: 0.85rem;
  }

  .mobile-tabs-scroll {
    padding: 8px 5px;
    gap: 6px;
  }
}
</style>
