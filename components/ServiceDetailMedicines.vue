<template>
  <section class="service_detail">
    <div class="container">
      <div class="row">
        <div class="col-xl-4 col-lg-4">
          <div class="service_details_left">
            <ul class="list-unstyled service_all_list">
              <li :class="{active: activeService === 'cacao'}"><a href="#" @click.prevent="setActiveService('cacao')">Cacao</a></li>
              <li :class="{active: activeService === 'temazcal'}"><a href="#" @click.prevent="setActiveService('temazcal')">Temazcal</a></li>
              <li :class="{active: activeService === 'wachuma'}"><a href="#" @click.prevent="setActiveService('wachuma')">Wachuma</a></li>
              <li :class="{active: activeService === 'jurema'}"><a href="#" @click.prevent="setActiveService('jurema')">Jurema</a></li>
              <li :class="{active: activeService === 'yopo'}"><a href="#" @click.prevent="setActiveService('yopo')">Yopo</a></li>
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
              <p>{{ medicines[activeService].description }}</p>
            </div>
            <div class="agriculture_solutions">
              <h3>Beneficios y Efectos</h3>
              <p>Esta medicina ancestral ofrece múltiples beneficios para el crecimiento espiritual y la sanación integral del ser.</p>
            </div>
            <ul class="list-unstyled">
              <li v-for="benefit in medicines[activeService].benefits" :key="benefit">
                <i class="fa fa-check"></i>{{ benefit }}
              </li>
            </ul>
            <div v-if="medicines[activeService].contraindications" class="contraindications-section">
              <div class="agriculture_solutions">
                <h3>Información Adicional</h3>
                <div class="contraindications-content">{{ medicines[activeService].contraindications }}</div>
              </div>
            </div>
            <p class="service_details_last_text" v-if="medicines[activeService].additionalInfo">
              {{ medicines[activeService].additionalInfo }}
            </p>
            <p class="service_details_last_text" v-else>
              Nuestros encuentros están guiados por facilitadores experimentados que acompañan tu proceso de sanación y transformación personal con respeto, sabiduría y amor incondicional.
            </p>
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
                        title: 'Medicina del Cacao',
                        description: 'El cacao sagrado es considerado la medicina del corazón. Esta planta maestra nos conecta con la energía del amor incondicional y la compasión. En ceremonias de cacao, trabajamos con la planta en su forma pura para abrir el corazón, sanar heridas emocionales y despertar nuestra creatividad. El cacao facilita estados meditativos profundos y promueve la conexión auténtica con nosotros mismos y otros.',
                        benefits: [
                            'Apertura del centro del corazón',
                            'Sanación de heridas emocionales',
                            'Despertar de la creatividad y pasión',
                            'Estados meditativos profundos',
                            'Conexión con el amor incondicional',
                            'Liberación de bloqueos emocionales'
                        ]
                    },
                    temazcal: {
                        title: 'Temazcal - Vientre de la Madre Tierra',
                        description: 'El Temazcal es una ceremonia de purificación ancestral mexicana que se realiza en una estructura ceremonial que representa el vientre de la Madre Tierra. A través del vapor de agua con plantas medicinales, el calor y los cantos sagrados, experimentamos un renacimiento espiritual. Esta práctica limpia el cuerpo físico, equilibra las emociones y purifica el espíritu.',
                        benefits: [
                            'Purificación profunda del cuerpo físico',
                            'Liberación de toxinas y energías negativas',
                            'Equilibrio emocional y mental',
                            'Reconexión con los elementos naturales',
                            'Fortalecimiento del sistema inmunológico',
                            'Experiencia de renacimiento espiritual'
                        ]
                    },
                    wachuma: {
                        title: 'Wachuma - San Pedro',
                        description: 'El Wachuma, también conocido como San Pedro, es un cactus sagrado de los Andes que ha sido utilizado por más de 3000 años para ceremonias de sanación y visión. Esta medicina maestro nos conecta con la sabiduría de las montañas y facilita estados expandidos de consciencia. El Wachuma es conocido como la medicina del corazón que abre la percepción y permite experimentar la unidad con toda la creación.',
                        benefits: [
                            'Expansión de la consciencia',
                            'Conexión profunda con la naturaleza',
                            'Sanación del corazón y emociones',
                            'Visiones y comprensiones espirituales',
                            'Liberación de miedos y traumas',
                            'Experiencia de unidad cósmica'
                        ]
                    },
                    jurema: {
                        title: 'Jurema - Medicina Brasileña',
                        description: 'La Jurema es una planta sagrada brasileña utilizada tradicionalmente por pueblos indígenas del nordeste de Brasil. Esta medicina facilita viajes internos profundos y conexiones con dimensiones espirituales. La Jurema es conocida por su capacidad de inducir estados visionarios que permiten la comunicación con ancestros y la obtención de conocimientos espirituales profundos.',
                        benefits: [
                            'Viajes internos y estados visionarios',
                            'Conexión con ancestros y guías espirituales',
                            'Acceso a conocimientos ancestrales',
                            'Sanación de traumas generacionales',
                            'Desarrollo de habilidades chamánicas',
                            'Comprensión de patrones kármicos'
                        ]
                    },
                    yopo: {
                        title: 'Yopo - Medicina de las Semillas',
                        description: 'El Yopo es una medicina ancestral utilizada por pueblos indígenas de Venezuela y Colombia, preparada a partir de las semillas del árbol Anadenanthera peregrina. Esta medicina de acción rápida facilita estados alterados de consciencia que permiten acceder a visiones, limpieza energética y conexión con el mundo espiritual. Se utiliza tradicionalmente en ceremonias de sanación y adivinación.',
                        benefits: [
                            'Estados visionarios intensos y transformadores',
                            'Limpieza energética profunda y rápida',
                            'Conexión con el mundo espiritual',
                            'Acceso a información y guía espiritual',
                            'Liberación de energías estancadas',
                            'Activación de percepciones extrasensoriales'
                        ]
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
        },
        methods: {
            setActiveService(serviceKey) {
                this.activeService = serviceKey;
                const url = new URL(window.location);
                url.searchParams.set('medicine', serviceKey);
                window.history.replaceState(null, null, url);
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
</style>