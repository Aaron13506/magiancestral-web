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
              <li :class="{active: activeService === 'general'}"><a href="#" @click.prevent="setActiveService('general')">Encuentros espirituales</a></li>
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
              <p v-if="services[activeService].benefitsIntro">{{ services[activeService].benefitsIntro }}</p>
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
                        description: 'Te damos la bienvenida a este espacio sagrado de sanación y transformación. Magia Ancestral ofrece diversos encuentros espirituales y terapéuticos, cada uno diseñado para acompañar a sus participantes en procesos de autoconocimiento y crecimiento personal. Estas prácticas combinan la sabiduría ancestral con enfoques terapéuticos de sanación integral, respetando las tradiciones milenarias y adaptándolas a las necesidades urbanas.',
                        benefitsIntro: 'Los encuentros espirituales de Magia Ancestral ofrecen una experiencia transformadora integral:',
                        benefits: [
                            'Sanación integral de cuerpo, mente y espíritu.',
                            'Acompañamiento profesional y respetuoso.',
                            'Espacios seguros para la exploración interior.',
                            'Conexión con la sabiduría ancestral.',
                            'Transformación personal profunda.',
                            'Comunidad de apoyo y crecimiento mutuo.'
                        ],
                        additionalInfo: 'Cada encuentro es facilitado por personas experimentadas que han dedicado su vida al estudio y práctica de las medicinas sagradas y al desarrollo de técnicas de integración personal en pro de la vida. El enfoque de estos encuentros es holístico, laico y respetuoso, honrando tanto las tradiciones ancestrales como las necesidades individuales de cada participante.'
                    },
                    yage: {
                        title: 'Medicina Ancestral de la Selva',
                        tabName: 'Medicina de la Selva',
                        image: '/assets/images/Servicios/YageAyahuasca.png',
                        description: 'La Medicina Ancestral de la Selva ofrece sanación integral. Proporciona claridad en los pensamientos, equilibrio emocional, y limpieza en el cuerpo físico, permitiendo conectar con el Ser Interno. Puede tomarse de día, más la práctica ceremonial generalmente se realiza de noche, en un ambiente de meditación individual, en silencio, acompañada de la naturaleza, la música y otros elementos rituales. En Magia Ancestral se participa en esta ceremonia con respeto a las culturas ancestrales; su práctica es laica, con enfoque en la mínima intervención pero siempre manteniendo el cuidado de los participantes.',
                        benefitsIntro: 'Esta práctica ancestral ofrece múltiples beneficios para el crecimiento espiritual y la sanación integral del ser.',
                        benefits: [
                            'Sanación integral: claridad mental, equilibrio emocional y limpieza física.',
                            'Conexión profunda con el Ser Interno.',
                            'Autoconocimiento y ampliación de la consciencia.',
                            'Experiencia transformadora en ambiente natural.'
                        ],
                        additionalInfo: 'Quienes asisten a estas ceremonias se eligen a sí mismos para sanar, tanto individual como grupalmente. Aquellos que repiten la experiencia reconocen en la medicina ancestral un camino hacia el autoconocimiento, la conexión y la magia en sus vidas. Si tienes dudas sobre esta medicina, puedes dejar tus comentarios.'
                    },
                    fungi: {
                        title: 'LA MEDICINA DEL REINO FUNGI',
                        tabName: 'Reino Fungi',
                        image: '/assets/images/Servicios/Reino_fungi.png',
                        description: 'Esta medicina devela la psique, revela la Esencia del Ser, permite identificar las creencias acerca de la vida, las cuales se manifiestan en diversas formas, colores, figuras, seres y múltiples arquetipos. Acceder a estos símbolos visionarios permite llenarse de la energía requerida en los momentos de afrontar todos los desafíos y demás circunstancias de la existencia y llenarlas de luz. Es allí en donde se encuentran las respuestas que despliegan la Magia del Ser, la Magia Ancestral.',
                        benefits: [
                            'Equilibrar el Estado de Ánimo. Por lo que generalmente se suprime el uso de medicamentos farmacéuticos.',
                            'Potenciar la concentración y estimular la inteligencia, así como la velocidad de aprendizaje.',
                            'Desintoxicar el organismo de residuos químicos y tóxicos dejados por los fármacos.',
                            'Estimular la Neurogénesis cerebral al ser usada en microdosis.'
                        ],
                        contraindications: `
CONTRAINDICACIONES Y SUGERENCIAS DEL USO DE LA MEDICINA DEL REINO FUNGI.

La Medicina del Reino Fungi, puede ser consumida en Macrodosis (en un solo momento) o en Microdosis (cápsulas con un gramaje mínimo, ingeridas periódicamente durante un tiempo determinado); y en general, podría ser administrada a casi cualquier persona, de cualquier edad, con el seguimiento responsable adecuado. Ahora bien, sugerimos tomar en cuenta:

• Esta medicina está contraindicada para personas con desequilibrios en la química cerebral, bajo tratamiento y efectos de fármacos alopáticos u otras sustancias químicas.
• Así mismo, está contraindicada en personas que desconocen o no tengan plena consciencia sobre la medicina que están consumiendo. En caso de menores de edad, o adultos con discapacidad de discernimiento, estos deben estar debidamente autorizados por sus padres o tutores.
• En cualquier caso, se debe evitar el uso abusivo o sin propósito, de las microdosis y mucho más de las macrodosis.
• Para ingerir Microdosis, es muy recomendable seguir las pautas y protocolos sugeridos con base a la entrevista previa.
• Se recomienda altamente solo consumir Macrodosis en contexto ceremonial, de armonía, o en contexto terapéutico, siempre con el debido acompañamiento.

LAS MICRODOSIS Y SUS USOS

La Microdosis, suelen cambiar la percepción paulatinamente, ya que a través de ella ocurre la neurogénesis cerebral. Aparentemente, su efecto orgánico es imperceptible, ya que de esta manera, no despliega sus facultades psico activas; aún así, la medicina está cumpliendo su propósito en quien la ingiere y se puede sentir como una percepción de que lo que antes era conflictivo, se transforma en material de estudio, encontrando respuestas que clarifican los pensamientos y armonizan las conductas, permitiendo apreciar la vida que se porta y las posibilidades que esa vida trae.
                        `
                    },
                    abra: {
                        title: 'Abra Cadabra',
                        tabName: 'Abra Cadabra',
                        image: '/assets/images/Servicios/Abra_Cadabra.png',
                        description: 'Es una sesión grupal de palabra profunda libre de credo, con propósito terapéutico, de auto conocimiento y conexión espiritual. Este círculo terapéutico espiritual, ofrece múltiples beneficios para el crecimiento y la sanación integral del ser, donde se combinan técnicas ancestrales, con enfoques terapéuticos de sanación. Este espacio sagrado, permite la liberación de energías estancadas y la activación del poder personal. A través de rituales, el círculo grupal se conecta a la meditación, promoviendo la intuición, la telepatía, el equilibrio energético que lleva a la manifestación, deviniendo en equilibrio entre el cuerpo, la mente y el espíritu.',
                        benefitsIntro: 'Esta práctica circular de palabra profunda, genera múltiples beneficios para la expansión de la consciencia, la conexión espiritual y la sanación integral del ser.',
                        benefits: [
                            'Activación del poder personal.',
                            'Balance emocional y mental.',
                            'Desarrollo de habilidades espirituales.',
                            'Ampliación de la consciencia.',
                            'Estados profundos del Ser.'
                        ]
                    },
                    teramai: {
                        title: 'Teramai Seichem',
                        tabName: 'Teramai',
                        image: '/assets/images/Servicios/Teramai_Senchen.png',
                        description: 'Es una poderosa técnica de sanación a través de la imposición de manos, el uso de símbolos sagrados, la energía de los colores, las energías angélicas, los sonidos y movimientos mágicos, que permiten en conjunto, la integración del ser y la manifestación de la Magia Ancestral. Está basada en el Sistema de Reiki tradicional, que usa la canalización de energías a través de las manos y el uso de símbolos sagrados, fusionado con el manejo de energías circulares extraídas de los elementos de la Naturaleza, combinando de esta forma la sabiduría del Reiki tradicional con las prácticas chamánicas ancestrales. Esta técnica permite canalizar energía de alta vibración para sanar no solo el cuerpo físico, sino también los cuerpos emocional, mental y espiritual. En Magia Ancestral, se ofrece la sesión de Teramai Seichem, como un espacio para equilibrar las energías personales y la formación como terapeuta y facilitador de este Sistema.',
                        benefitsIntro: 'Este sistema ofrece múltiples beneficios para el crecimiento espiritual y la sanación integral del ser.',
                        benefits: [
                          'Sanación integral de todos los cuerpos.',
                          'Liberación de bloqueos energéticos.',
                          'Activación de chakras y centros de energía.',
                          'Conexión con guías espirituales.',
                          'Conexión con los animales de poder personales.',
                          'Conexión con la naturaleza, la magia de los colores, el canto curativo, la danza Ancestral y los reinos angelicales.',
                          'Desarrollo de técnicas mágicas de curación.'
                        ]
                    },
                    sesiones: {
                        title: 'Sesiones - Música de Medicina',
                        tabName: 'Sesiones',
                        image: '/assets/images/Servicios/Velada_Musical.png',
                        description: 'Las sesiones de música de medicina utilizan frecuencias sagradas, cantos ancestrales e instrumentos tradicionales para inducir estados de sanación y transformación. La música actúa como un vehículo que transporta la consciencia hacia dimensiones superiores, facilitando procesos de liberación y renovación espiritual.',
                        benefitsIntro: 'Esta práctica ancestral ofrece múltiples beneficios para el crecimiento espiritual y la sanación integral del ser.',
                        benefits: [
                            'Sanación a través del sonido.',
                            'Relajación profunda y regeneración.',
                            'Liberación de tensiones y estrés.',
                            'Conexión con estados meditativos profundos.',
                            'Liberación orgánica de endorfinas, melatonina, y otras hormonas equilibrantes del organismo.'
                        ]
                    },
                    magicsadan: {
                        title: 'MagicSaDan',
                        tabName: 'MagicSaDan',
                        image: '/assets/images/Servicios/MagicSaDan.png',
                        description: 'MagicSaDan es una Sesión grupal para desplegar el movimiento auténtico del organismo, combinando danza sagrada, respiración consciente y rituales de poder. Esta práctica nos permite reconectar con la fuerza vital primordial y activar el poder creador. A través del movimiento consciente, se liberan energías estancadas y se despierta a la naturaleza Divina, conectando profundamente con la Magia que ya se porta en el sí mismo, revelando la sacralidad del otro y la conexión con la totalidad del Cosmos.',
                        benefitsIntro: 'Esta práctica ofrece múltiples beneficios para el crecimiento espiritual y la sanación integral del Ser.',
                        benefits: [
                            'Activación de la energía vital.',
                            'Liberación a través del movimiento.',
                            'Conexión con el poder femenino/masculino.',
                            'Despertar de la creatividad y pasión.',
                            'Estimulación de la afectividad.',
                            'Conexión con la trascendencia personal y con la vida.'
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
