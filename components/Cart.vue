<template>
  <section class="cart">
    <div class="container">
      <!-- Carrito vacío -->
      <div v-if="cartStore.cartIsEmpty" class="empty-cart text-center">
        <i class="icon-shopping-cart empty-cart-icon"></i>
        <h3>Tu carrito está vacío</h3>
        <p>Explora nuestra Botica Mágica y encuentra productos ancestrales.</p>
        <nuxt-link to="/product" class="thm-btn">Ver productos</nuxt-link>
      </div>

      <!-- Carrito con productos -->
      <template v-else>
        <div class="row">
          <div class="col-xl-12">
            <div class="cart_table_box">
              <table class="cart_table">
                <thead class="cart_table_head">
                <tr>
                  <th>Producto</th>
                  <th></th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Quitar</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in cartStore.items" :key="item.id">
                  <td colspan="2">
                    <div class="colum_box">
                      <div class="prod_thum">
                        <nuxt-link :to="`/producto/${item.slug}`">
                          <img :src="item.image" :alt="item.name">
                        </nuxt-link>
                      </div>
                      <div class="title">
                        <h3 class="prod-title">{{ item.shortName || item.name }}</h3>
                      </div>
                    </div>
                  </td>
                  <td class="pro_price">${{ item.price.toFixed(2) }}</td>
                  <td class="pro_qty">
                    <div class="product-quantity-box">
                      <div class="input-box">
                        <input
                          class="quantity-spinner"
                          type="number"
                          :value="item.quantity"
                          min="1"
                          max="10"
                          @change="updateQuantity(item.id, $event.target.value)">
                      </div>
                    </div>
                  </td>
                  <td class="pro_sub_total">${{ (item.price * item.quantity).toFixed(2) }}</td>
                  <td>
                    <div class="pro_remove" @click="removeItem(item.id)">
                      <i class="fas fa-times"></i>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="row cart_apply_coupon_box">
          <div class="col-xl-6">
            <div class="customer-info">
              <h4>Datos para tu pedido (opcional)</h4>
              <div class="customer-input">
                <input v-model="customerName" type="text" placeholder="Tu nombre">
              </div>
              <div class="customer-input">
                <input v-model="customerAddress" type="text" placeholder="Ciudad / Dirección de envío">
              </div>
            </div>
          </div>
          <div class="col-xl-6">
            <ul class="total_box list-unstyled">
              <li><span>Subtotal</span>${{ cartStore.totalPrice.toFixed(2) }} USD</li>
              <li><span>Envío</span>Por coordinar</li>
              <li class="total"><span>Total</span>${{ cartStore.totalPrice.toFixed(2) }} USD</li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-12">
            <div class="button_box">
              <button class="thm-btn clear_btn" type="button" @click="clearCart">
                <i class="fas fa-trash"></i> Vaciar carrito
              </button>
              <button class="thm-btn whatsapp_btn" type="button" @click="checkout">
                <i class="fab fa-whatsapp"></i> Finalizar pedido por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '~/store'

const cartStore = useCartStore()
const customerName = ref('')
const customerAddress = ref('')

onMounted(() => {
  cartStore.loadCart()
})

const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, parseInt(quantity))
}

const removeItem = (productId) => {
  cartStore.removeItem(productId)
}

const clearCart = () => {
  if (confirm('¿Estás seguro de vaciar el carrito?')) {
    cartStore.clearCart()
  }
}

const checkout = () => {
  cartStore.openWhatsApp(customerName.value, customerAddress.value)
}
</script>

<style scoped>
/* Tabla del carrito */
.cart_table {
  width: 100%;
}

.cart_table th {
  font-size: 12px;
  padding: 15px 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cart_table td {
  padding: 20px 10px;
  vertical-align: middle;
  font-size: 13px;
}

.cart_table tbody tr {
  border-bottom: 1px solid #eee;
}

/* Tamaño de imágenes en el carrito */
.prod_thum {
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 8px;
  flex-shrink: 0;
}

.prod_thum img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.colum_box {
  display: flex;
  align-items: center;
  gap: 15px;
}

.colum_box .title {
  flex: 1;
}

.prod-title {
  font-size: 13px;
  margin: 0;
  text-transform: none;
}

.pro_price,
.pro_sub_total {
  font-size: 14px;
}

.quantity-spinner {
  width: 60px;
  padding: 8px;
  font-size: 13px;
}

.empty-cart {
  padding: 80px 20px;
}

.empty-cart-icon {
  font-size: 80px;
  color: #ccc;
  margin-bottom: 20px;
}

.empty-cart h3 {
  margin-bottom: 10px;
  color: #333;
}

.empty-cart p {
  color: #666;
  margin-bottom: 30px;
}

.pro_remove {
  cursor: pointer;
  transition: color 0.3s ease;
}

.pro_remove:hover {
  color: #c00;
}

.customer-info {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.customer-info h4 {
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
}

.customer-input {
  margin-bottom: 10px;
}

.customer-input input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.customer-input input:focus {
  outline: none;
  border-color: #0c7737;
}

.total_box .total {
  font-size: 20px;
  font-weight: bold;
  border-top: 2px solid #0c7737;
  padding-top: 15px;
  margin-top: 10px;
}

.button_box {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.clear_btn {
  background: #666;
}

.clear_btn:hover {
  background: #444;
}

.whatsapp_btn {
  background: #25D366;
  font-size: 18px;
  padding: 15px 30px;
}

.whatsapp_btn:hover {
  background: #128C7E;
}

.whatsapp_btn i {
  margin-right: 8px;
}

@media (max-width: 768px) {
  .button_box {
    flex-direction: column;
  }

  .button_box button {
    width: 100%;
  }
}
</style>
