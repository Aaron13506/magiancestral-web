<template>
    <div>
      <section class="product_detail">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-lg-6">
              <div class="product_detail_image">
                <img :src="currentImage" :alt="product?.name" class="main-image">
              </div>
              <!-- Mini galería -->
              <div v-if="galleryImages.length > 1" class="product-gallery">
                <div
                  v-for="(img, index) in galleryImages"
                  :key="index"
                  class="gallery-thumb"
                  :class="{ active: currentImage === img }"
                  @click="currentImage = img"
                >
                  <img :src="img" :alt="`${product?.name} - ${index + 1}`">
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6">
              <div class="product_detail_content">
                <h2>{{ product?.name || 'Producto' }}</h2>
                <div class="product_detail_review_box">
                  <div class="product_detail_price_box">
                    <p>${{ product?.price?.toFixed(2) || '0.00' }} {{ product?.currency || 'MXN' }}</p>
                  </div>
                </div>
                <div class="product_detail_text">
                  <p>{{ product?.description }}</p>
                </div>
                <ul class="list-unstyled product_detail_address">
                  <li v-if="product?.content"><strong>Contenido:</strong> {{ product.content }}</li>
                  <li v-if="product?.inStock" class="in-stock">Disponible</li>
                  <li v-else class="out-stock">Agotado</li>
                </ul>
                <div class="product-quantity-box">
                  <div class="input-box">
                    <input v-model.number="quantity" class="quantity-spinner" type="number" min="1" max="10">
                  </div>
                  <div class="addto-cart-box">
                    <button class="thm-btn" type="button" @click="addToCart">
                      <span v-if="!showAdded">Agregar al Carrito</span>
                      <span v-else><i class="fa fa-check"></i> Agregado!</span>
                    </button>
                  </div>
                </div>
                <ul class="list-unstyled category_tag_list">
                  <li v-if="product?.category">Categoría: {{ getCategoryName(product.category) }}</li>
                  <li v-if="product?.artisanal">Producto Artesanal</li>
                </ul>
                <div class="product_detail_share_box">
                  <div class="share_box_title">
                    <h2>Compartir</h2>
                  </div>
                  <div class="share_box_social">
                    <a href="#"><i class="fab fa-facebook-square"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12">
              <div class="product-tab-box tabs-box">

                <div class="mission-tabs">

                  <!--Tab Uso-->
                  <input type="radio" name="tabs" id="tab-one" checked="checked">
                  <label for="tab-one" class="tab-btn">Uso</label>
                  <div class="tab">
                    <div class="active-tab">
                      <div class="content">
                        <div class="product-details-content">
                          <div class="desc-content-box">
                            <p v-if="product?.usage">{{ product.usage }}</p>
                            <p v-else>Consultar indicaciones de uso.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--Tab Ingredientes-->
                  <input type="radio" name="tabs" id="tab-two">
                  <label for="tab-two" class="tab-btn">Ingredientes</label>
                  <div class="tab">
                    <div class="active-tab">
                      <div class="content">
                        <div class="product-details-content">
                          <div class="desc-content-box">
                            <p v-if="product?.ingredients">{{ product.ingredients }}</p>
                            <p v-else>Ingredientes naturales.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--Tab Precauciones-->
                  <input type="radio" name="tabs" id="tab-three">
                  <label for="tab-three" class="tab-btn">Precauciones</label>
                  <div class="tab">
                    <div class="active-tab">
                      <div class="content">
                        <div class="product-details-content">
                          <div class="desc-content-box">
                            <p v-if="product?.precautions">{{ product.precautions }}</p>
                            <p v-else>Mantener fuera del alcance de los niños.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--Tab Beneficios-->
                  <input type="radio" name="tabs" id="tab-four" v-if="product?.benefits?.length">
                  <label for="tab-four" class="tab-btn" v-if="product?.benefits?.length">Beneficios</label>
                  <div class="tab" v-if="product?.benefits?.length">
                    <div class="active-tab">
                      <div class="content">
                        <ul class="benefits-list">
                          <li v-for="(benefit, index) in product.benefits" :key="index">
                            <i class="fa fa-check"></i> {{ benefit }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from '~/store'

const props = defineProps({
  product: {
    type: Object,
    default: null
  }
})

const cartStore = useCartStore()
const quantity = ref(1)
const showAdded = ref(false)

// Galería de imágenes
const currentImage = ref(props.product?.image || '/assets/images/shop/product-detai_img-1l.jpg')

const galleryImages = computed(() => {
  if (!props.product) return []
  // Si hay galería, usarla; sino, solo la imagen principal
  if (props.product.gallery && props.product.gallery.length > 0) {
    return props.product.gallery
  }
  return [props.product.image]
})

// Actualizar imagen cuando cambie el producto
watch(() => props.product, (newProduct) => {
  if (newProduct) {
    currentImage.value = newProduct.image
  }
}, { immediate: true })

const addToCart = () => {
  if (props.product) {
    cartStore.addItem(props.product, quantity.value)
    showAdded.value = true
    setTimeout(() => {
      showAdded.value = false
    }, 2000)
  }
}

const getCategoryName = (categoryId) => {
  const categories = {
    'consumibles': 'Consumibles',
    'objetos-poder': 'Objetos de Poder'
  }
  return categories[categoryId] || categoryId
}
</script>

<style scoped>

  .mission-tabs {
    display: flex;
    flex-wrap: wrap;
  }
  .mission-tabs label {
    order: 1;
    display: block;
    padding: 17px 50px;
    margin-right: 0.2rem;
    cursor: pointer;
    background: #0c7737;
    font-weight: 500;
    transition: background ease 0.2s;
    font-size: 19px;
    text-transform: uppercase;
    color: #fff;
  }
  .mission-tabs .tab {
    order: 99;
    flex-grow: 1;
    width: 100%;
    display: none;
    padding: 1rem;
    background: #eceeef;
  }
  .default-tabs .mission-tabs .text {
    position: relative;
    font-size: 20px;
    font-weight: 300;
    color: #0c7737;
    line-height: 1.7em;
    letter-spacing: 2px;
  }
  .mission-tabs input[type="radio"] {
    display: none;
  }
  .mission-tabs input[type="radio"]:checked + label {
    background: #eceeef;
    color: #222;
  }
  .mission-tabs input[type="radio"]:checked + label + .tab {
    display: block;
  }

  .benefits-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .benefits-list li {
    padding: 8px 0;
    font-size: 16px;
  }
  .benefits-list li i {
    color: #0c7737;
    margin-right: 10px;
  }

  .in-stock {
    color: #0c7737;
    font-weight: bold;
  }
  .out-stock {
    color: #c00;
    font-weight: bold;
  }

  /* Galería de imágenes */
  .product_detail_image {
    margin-bottom: 15px;
  }

  .main-image {
    width: 100%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 8px;
    background: #f9f9f9;
  }

  .product-gallery {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .gallery-thumb {
    width: 80px;
    height: 80px;
    border: 2px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .gallery-thumb:hover {
    border-color: #0c7737;
  }

  .gallery-thumb.active {
    border-color: #0c7737;
    box-shadow: 0 0 0 2px rgba(12, 119, 55, 0.3);
  }

  .gallery-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 45em) {
    .mission-tabs .tab,
    .mission-tabs label {
      order: initial;
    }
    .mission-tabs label {
      width: 100%;
      margin-right: 0;
      margin-top: 0.2rem;
    }
  }

</style>
