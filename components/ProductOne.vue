<template>
  <section class="product-one">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-6">
          <div class="product_img">
            <img src="/assets/images/team/ylsenuevo.jpg" alt="Ylse Beatriz Lemus Rodríguez">
          </div>
        </div>
        <div class="col-xl-6 col-lg-6">
          <div class="growing_product">
            <div class="block-title text-left">
              <h3>YLSE BEATRIZ LEMUS RODRÍGUEZ</h3>
              <div class="leaf">
                <img src="/assets/images/resources/leaf.png" alt="">
              </div>
            </div>
            <div class="growing_product_text">
              <p>Caminante en las Medicinas Ancestrales y Plantas de Poder. Terapeuta Holística Espiritual. Maestra Reiki en los siguientes estilos: Japonés Rei-Do, Usui Tibetano, Teramai, Teramai Seichem (estilo Shamánico), Seichim-Sekhen (Sistema Egipcio - All Love) Karuna Reiki (Alta Compasión.</p>
              <p>Es Maestra en la Técnica de Alineación del Campo ElectroMagnérico Humano (HMF), especialista en Regresiones y Lecturas del Alma con Péndulo Universal.</p>
              <p>Numerólogo Pitagórico y en Numerologia Comparada. Meditadora del Tarot Egipcio y Rider White. Bailarina de danzas rituales y músico instrumentista. Profesora de Biodanza certificada por la IBF y Locutora.</p>
              <p>Es directora de la Escuela de Reiki y otras artes sanadoras Manos de Luz y directora de la Fundación Universal de Reiki (FUNREIKI).</p>
              <p>Miembro directivo del equipo de organización de Medicinas indígenas y ancestrales Magia Ancestral. Estudiante eterna del instante y de la magia de vivir.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "ProductOne"
    }
</script>

<style scoped>
.block-title h3 {
  font-size: 64px !important;
}

/* Ajustes responsive para móvil */
@media (max-width: 991px) {
  .block-title h3 {
    font-size: 2.2rem !important;
    line-height: 1.3 !important;
    margin-bottom: 20px !important;
    word-break: break-word;
  }

  .growing_product_text p {
    font-size: 15px !important;
    line-height: 1.7 !important;
    margin-bottom: 15px !important;
    text-align: justify !important;
  }

  /* Mantener layout lado a lado con superposición */
  .row {
    position: relative;
    margin-bottom: 60px;
  }

  .col-xl-6:first-child {
    position: relative;
    z-index: 1;
  }

  .col-xl-6:last-child {
    position: relative;
    z-index: 2;
    margin-top: -80px;
  }

  .product_img img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .growing_product {
    background: white;
    padding: 20px 15px !important;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
}

@media (max-width: 768px) {
  .block-title h3 {
    font-size: 1.75rem !important;
    line-height: 1.3 !important;
    margin-bottom: 18px !important;
  }

  .growing_product_text p {
    font-size: 14px !important;
    line-height: 1.65 !important;
    margin-bottom: 12px !important;
    text-align: justify !important;
    color: #666 !important;
  }

  .col-xl-6:last-child {
    margin-top: -60px;
  }

  .growing_product {
    padding: 18px 12px !important;
  }
}

@media (max-width: 576px) {
  .block-title h3 {
    font-size: 1.5rem !important;
    line-height: 1.25 !important;
    margin-bottom: 15px !important;
  }

  .growing_product_text p {
    font-size: 13px !important;
    line-height: 1.6 !important;
    margin-bottom: 10px !important;
    text-align: justify !important;
  }

  .col-xl-6:last-child {
    margin-top: -50px;
  }

  .growing_product {
    padding: 15px 10px !important;
  }
}
</style>
