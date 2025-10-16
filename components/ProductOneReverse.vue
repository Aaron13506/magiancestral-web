<template>
  <section class="product-one">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-6">
          <div class="growing_product">
            <div class="block-title text-left">
              <h3>FRED MALDONADO</h3>
              <div class="leaf">
                <img src="/assets/images/resources/leaf.png" alt="">
              </div>
            </div>
            <div class="growing_product_text">
              <p>Pedagogo, con formación docente y Locutor (58.840).</p>
              <p>Especialista en dinámica de grupos y orientación de la conducta, trabajando como facilitador de aprendizajes en instituciones escolares y empresariales.</p>
              <p>Estudioso, caminante y servidor de las Medicinas Ancestrales, como instrumento para crecer desde hace 11 años, lo cual le ha permitido conectar con conocimientos relacionados al Tarot, el Taichi y el Reiki, estudiando y trabajando como terapéuta.</p>
              <p>En Magia Ancestral, es nuestro coordinador logístico y guardián del Fuego, uno de nuestros altares principales en el trabajo con las Medicinas.</p>
            </div>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6">
          <div class="product_img">
            <img src="/assets/images/team/frednuevo.jpg" alt="Fred Maldonado">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "ProductOneReverse"
    }
</script>

<style scoped>
.block-title h3 {
  font-size: 64px !important;
}

.growing_product {
  margin-left: 0 !important;
  margin-right: -149px !important;
  z-index: 2 !important;
  position: relative !important;
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

  /* Mantener layout lado a lado con superposición - orden inverso */
  .row {
    position: relative;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
  }

  /* Imagen primero */
  .col-xl-6:last-child {
    order: 1;
    position: relative;
    z-index: 1;
  }

  /* Texto segundo, sobrepuesto */
  .col-xl-6:first-child {
    order: 2;
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
    margin-right: 0 !important;
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

  .col-xl-6:first-child {
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

  .col-xl-6:first-child {
    margin-top: -50px;
  }

  .growing_product {
    padding: 15px 10px !important;
  }
}
</style>