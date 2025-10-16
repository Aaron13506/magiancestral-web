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
            v-for="(medicine, key) in medicines"
            :key="key"
            :class="['mobile-tab', {active: activeService === key}]"
            @click="setActiveService(key)"
          >
            {{ medicine.title }}
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
              <li :class="{active: activeService === 'cacao'}"><a href="#" @click.prevent="setActiveService('cacao')">Cacao</a></li>
              <li :class="{active: activeService === 'yopo'}"><a href="#" @click.prevent="setActiveService('yopo')">Yopo</a></li>
              <li :class="{active: activeService === 'jurema'}"><a href="#" @click.prevent="setActiveService('jurema')">Jurema</a></li>
              <li :class="{active: activeService === 'peyote'}"><a href="#" @click.prevent="setActiveService('peyote')">Peyote</a></li>
              <li :class="{active: activeService === 'wachuma'}"><a href="#" @click.prevent="setActiveService('wachuma')">Wachuma</a></li>
              <li :class="{active: activeService === 'temazcal'}"><a href="#" @click.prevent="setActiveService('temazcal')">Temazcal</a></li>
            </ul>
            <div class="download_file_box">
              <a href="#"><i class="icon-pdf"></i>Download PDF File</a>
            </div>
          </div>
        </div>
        <div class="col-xl-8 col-lg-8">
          <div class="service_details_right" v-if="medicines[activeService]">
            <div class="harvest_innovations">
              <h2>{{ medicines[activeService].title }}</h2>
              <p style="white-space: pre-wrap;">{{ medicines[activeService].description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "ServiceDetailMedicines",
        data() {
            return {
                activeService: 'cacao',
                medicines: {
                    cacao: {
                        title: 'CACAO',
                        description: 'Medicina Ancestral que despierta la Memoria Antigua; fue usada en la antigüedad como moneda y ofrenda, como una llave sagrada para el corazón. En las selvas de Mesoamérica, los Mayas y Mexicas, veían al Cacao como un regalo Divino. Muchos siglos después, algunos botánicos lo denominaron Teobroma Cacao, que significa "alimento de los Dioses". Los antiguos decían que fue Quetzalcoatl quien trajo el árbol de Cacao del cielo; que de sus vainas, nacían los Dioses y que beberlo en rituales, abría el corazón, por ser cuerpo y sangre de la Divinidad. Fue usado como dote matrimonial, moneda sagrada que sellaba acuerdos y también era la medicina que fortalecía a los guerreros antes de la batalla.\n\nCientíficamente se ha comprobado, que el cacao, contiene moléculas que se liberan ante la sensación de dicha, como la Anandamida, que proviene del sánscrito Ananda, que significa "felicidad suprema". Esta molécula se une a los receptores del placer, calma el sistema nervioso y genera un efecto de bienestar profundo. También en este fruto, se encuentra la Feniletilamina, molécula conocida como la química del amor, pues junto con otras moléculas como la dopamina, las endorfinas, la serotonina, la teobromina y los flavonoides, limpian la sangre y protegen al corazón. Así, el cacao es una medicina que eleva el alma. Se trata de un fruto amargo, fermentado por la tierra, transformado por el fuego, que se convierte en dulzura para el corazón, siendo una metáfora viva del proceso humano, que pasa por la oscuridad, hasta volverse luz.',
                        benefits: []
                    },
                    yopo: {
                        title: 'YOPO',
                        description: 'El Yopo o Ñuá, cuyo nombre científico es Anadenanthera peregrina, es un árbol grande de la familia de las leguminosas, nativo de las regiones tropicales de América del Sur y el Caribe. Es una de las medicinas ancestrales más importantes de la cuenca del Orinoco, con una historia de uso que se remonta a miles de años en diversas culturas indígenas, como los Yanomami, los Piaroa (que lo llaman Ñuá), los Guahibo, los Piapoco y los Cubeo en Venezuela, Colombia y Brasil, entre otros. Su preparación es un proceso ritual que requiere un conocimiento ancestral y una gran precisión. Las semillas de la vaina del árbol son recolectadas, tostadas y molidas hasta convertirlas en polvo fino, a menudo mezclado con ceniza de otras plantas. Tradicionalmente es consumida inhalando el polvo.\n\nEsta potente medicina ancestral contiene varios alcaloides triptamínicos como la Bufotenina y el DMT, entre otros. Sus efectos son muy potentes, produciendo purificación del organismo, visiones, transformación de la consciencia y conexión espiritual. Su ingesta es un acto sagrado con profundos propósitos de sanación, equilibrio, autocontrol, formación del carácter. En el caso del pueblo Piaroa, el uso de la Ñuá es guiado por el meñeruá, el maestro del canto ceremonial y su práctica es considerada una medicina del silencio, que fomenta la contención y la integración no discursiva de la experiencia.',
                        benefits: []
                    },
                    jurema: {
                        title: 'JUREMA',
                        description: 'Es un árbol espinoso que puede crecer de 4 a 6 metros de altura, cuya corteza es de color marrón rojizo y sus flores son en forma de espigas blancas amarillentas. Este árbol es nativo de América, encontrándose frecuentemente en zonas semiáridas, concretamente en la región de la caatinga en el noreste de Brasil, pero también se encuentra en Venezuela, en México (donde es conocida como tepezcohuite), también en otros países de América Central y del Sur. Denominado científicamente como Mimosa tenuiflora o Mimosa hostilis, también es llamado "Jurema Preta", ha constituido parte fundamental de las prácticas espirituales, de curación y religiosas de varias comunidades indígenas y afro brasileña en el noreste de Brasil, a donde es considerada como un ser sagrado que conecta a los humanos con el mundo espiritual y los ancestros. Su uso no es meramente medicinal, sino que está ligado a rituales de sanación espiritual, adivinación y resolución de conflictos comunitarios. También es usada en las iniciaciones y en los ritos de paso. Estas prácticas están profundamente arraigadas en la historia y la cosmología de estas culturas. Su principal componente es el DMT (Dimetiltriptamina).',
                        benefits: []
                    },
                    peyote: {
                        title: 'PEYOTE',
                        description: 'Es un pequeño cactus sin espinas, originario de México y del Sur de Estados Unidos, que ha sido utilizado por siglos como medicina ancestral en rituales, por diversas culturas indígenas, especialmente los wixárikas (huicholes), tarahumaras, coras y tepehuanes. Fue usado tradicionalmente como planta sagrada con poderosas capacidades curativas para el cuerpo y el espíritu. Se trata de un cactus cuyo nombre científico es Lophora williamsii. Es usada por los chamanes para generar experiencias espirituales. Contiene el alcaloide mescalina, que es el encargado de producir efectos psicoactivos. Su uso se remonta a miles de años, con evidencia de su consumo en rituales muy antiguos. Es considerado un "sacramento", para conectar con lo Divino, obtener sabiduría, sanar el cuerpo y el espíritu, al tiempo de obtener una guía de vida. Se consume en ceremonias nocturnas, llamadas "ceremonias de media luna", guiadas por un chamán o líder espiritual, en las que se canta, se reza y se medita, mientras se mastican los "botones" de la planta o se beben en una infusión. También es usado para tratar diversas afecciones como dolores, fiebres, reumatismo, picaduras de insectos. Se encuentra en la lista de especies vulnerables de la UICN y está protegido en México.',
                        benefits: []
                    },
                    wachuma: {
                        title: 'WACHUMA',
                        description: 'Conocida científicamente como Echimopsis Pachanoi y popularmente como el Cactus de San Pedro, es una planta sagrada y una medicina ancestral, con una historia milenaria en la cosmovisión andina especialmente en Perú y Ecuador. Su uso se remonta a épocas preincas, con evidencia arqueológica que data de hace más de 3000 años, en culturas como la Chavín. Es una planta, de espíritu masculino, usada fundamentalmente en los rituales religiosos y curativos por chamanes y curanderos para conectar con el mundo espiritual y con la naturaleza.\n\nContiene varios alcaloides, siendo el más conocido, la mescalina, también encontrada en el Peyote. Se emplea ceremonialmente en la medicina tradicional andina, cuyas ceremonias tienen propósitos de sanación, purificación, conexión espiritual, autoconocimiento, transformación, equilibrio y armonía. Los chamanes también la usaron para diagnosticar enfermedades del cuerpo y el alma y para encontrar respuestas existenciales, por lo que también la han usado como una forma de oráculo.',
                        benefits: []
                    },
                    temazcal: {
                        title: 'TEMAZCAL',
                        description: 'Es una práctica ancestral de origen mesoamericano que ha sido utilizada por diversas culturas indígenas, como los nahuas, mayas, toltecas, zapotecos y mixtecos, con fines medicinales y rituales. La palabra temazcal proviene del náhuatl temazcalli, que se traduce, como "la casa donde se suda" o "casa de vapor". Sus orígenes se remontan a tiempos prehispánicos y su uso está documentado en códices y crónicas del siglo XVI. Se han encontrado estructuras de temazcal con más de 1500 años de antigüedad, lo que demuestra su arraigo en la historia.\n\nEs más allá de un simple baño de vapor. Su estructura con forma de cúpula o iglú, representa el vientre de la Madre Tierra y su ceremonia es un ritual de renacimiento. Al entrar en el temazcal, se "muere" para volver a nacer purificado y renovado. Es un ritual que integra los 4 elementos de la naturaleza: La Tierra, en la estructura misma del temazcal; el fuego, representado por el calor de las piedras volcánicas (las abuelas); el agua, en el vapor que se produce al verter agua con hierbas medicinales sobre las piedras calientes; Aire, que es el aire que se respira dentro del espacio, mezclado con el vapor de la hierbas medicinales.\n\nLa Ceremonia, es conducida por un guía, o "temazcacalero", quien dirige con cantos, oraciones y acompaña el proceso de purificaciones. Es una medicina con muchísimos beneficios para el cuerpo físico (desintoxica, mejora la circulación y la salud respiratoria, alivia dolores, recupera a las mujeres post parto, entre otras); beneficia la mente, reduciendo el estrés, libera emociones discordantes hasta encontrar la calma y el bienestar y fomenta la conexión con la naturaleza, las raíces culturales y espirituales.',
                        benefits: []
                    }
                }
            }
        },
        mounted() {
            const urlParams = new URLSearchParams(window.location.search);
            const serviceParam = urlParams.get('medicine');
            if (serviceParam && this.medicines[serviceParam]) {
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
                url.searchParams.set('medicine', serviceKey);
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
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 10px 5px;
  gap: 8px;
}

.mobile-tabs-scroll::-webkit-scrollbar {
  display: none;
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

/* Desktop Sidebar */
.desktop-sidebar {
  display: block;
}

/* Ajuste de títulos */
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
    padding-left: 15px;
    padding-right: 15px;
  }

  /* Reducir padding del container principal */
  .service_detail .container {
    padding-top: 0;
  }

  /* Ajustar títulos y textos para tablet */
  .harvest_innovations h2 {
    font-size: 2.2rem !important;
    line-height: 1.3 !important;
    margin-bottom: 20px !important;
    padding: 0 !important;
    text-align: left !important;
  }

  .harvest_innovations p {
    font-size: 15px !important;
    line-height: 1.7 !important;
    margin-bottom: 15px !important;
    text-align: justify !important;
  }

  .harvest_innovations {
    margin-bottom: 30px !important;
  }
}

@media (max-width: 768px) {
  /* Títulos más pequeños para móvil */
  .harvest_innovations h2 {
    font-size: 1.75rem !important;
    line-height: 1.3 !important;
    margin-bottom: 18px !important;
    padding: 0 !important;
    word-break: break-word;
  }

  /* Párrafos optimizados para móvil */
  .harvest_innovations p {
    font-size: 14px !important;
    line-height: 1.65 !important;
    margin-bottom: 12px !important;
    text-align: justify !important;
    color: #666 !important;
  }

  /* Tabs más compactos */
  .mobile-tab {
    padding: 10px 16px;
    font-size: 0.9rem;
  }

  /* Reducir espaciado general */
  .service_details_right {
    padding-left: 12px;
    padding-right: 12px;
  }
}

@media (max-width: 576px) {
  /* Títulos aún más pequeños para móviles pequeños */
  .harvest_innovations h2 {
    font-size: 1.5rem !important;
    line-height: 1.25 !important;
    margin-bottom: 15px !important;
    padding: 0 !important;
  }

  /* Párrafos para pantallas pequeñas */
  .harvest_innovations p {
    font-size: 13px !important;
    line-height: 1.6 !important;
    margin-bottom: 10px !important;
    text-align: justify !important;
  }

  /* Tabs más pequeños */
  .mobile-tab {
    padding: 8px 14px;
    font-size: 0.85rem;
  }

  .mobile-tabs-scroll {
    padding: 8px 5px;
    gap: 6px;
  }

  /* Reducir padding adicional */
  .service_details_right {
    padding-left: 10px;
    padding-right: 10px;
  }

  .harvest_innovations {
    margin-bottom: 25px !important;
  }
}

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
</style>