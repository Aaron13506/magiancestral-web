<template>
  <section class="product-one" style="margin-bottom: 160px;">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-6">
          <div class="product_img">
            <img src="/assets/images/team/victornuevo.jpg" alt="Victor Manuel Bolivar Pacheco">
          </div>
        </div>
        <div class="col-xl-6 col-lg-6">
          <div class="growing_product">
            <div class="block-title text-left">
              <h3>VICTOR MANUEL BOLIVAR PACHECO</h3>
              <div class="leaf">
                <img src="/assets/images/resources/leaf.png" alt="">
              </div>
            </div>
            <div class="growing_product_text">
              <p>Músico y Artista Visual.</p>
              <p>Se dedica a la composición y a la producción musical bajo el AKA Caribano, una propuesta que abarca géneros como el Rock, el Hip Hop y la Electrónica, la Música para cine y teatro y la Música de Medicina.</p>
              <p>Es caminante de las Medicinas Ancestrales desde hace varios años, lo cual le ha permitido estudiar la música como un elemental para la sanación y para el equilibrio de la energía interna y externa.</p>
              <p>En Magia Ancestral es un servidor, en la organización logística y en el acompañamiento y armonización musical durante los procesos con las Medicinas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "ProductOneThird"
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