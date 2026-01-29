import { defineStore } from 'pinia'

// Store del carrito
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    whatsappNumber: '584241600760'
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    cartIsEmpty: (state) => {
      return state.items.length === 0
    }
  },

  actions: {
    // Cargar carrito desde localStorage
    loadCart() {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('magiancestral-cart')
        if (savedCart) {
          this.items = JSON.parse(savedCart)
        }
      }
    },

    // Guardar carrito en localStorage
    saveCart() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('magiancestral-cart', JSON.stringify(this.items))
      }
    },

    // Agregar producto al carrito
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          shortName: product.shortName,
          price: product.price,
          currency: product.currency,
          image: product.image,
          slug: product.slug,
          quantity: quantity
        })
      }

      this.saveCart()
    },

    // Remover producto del carrito
    removeItem(productId) {
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveCart()
      }
    },

    // Actualizar cantidad
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
          this.saveCart()
        }
      }
    },

    // Limpiar carrito
    clearCart() {
      this.items = []
      this.saveCart()
    },

    // Generar mensaje de WhatsApp
    generateWhatsAppMessage(customerName = '', customerAddress = '') {
      let message = '¡Hola! Quiero hacer un pedido:\n\n'

      this.items.forEach(item => {
        const subtotal = (item.price * item.quantity).toFixed(2)
        message += `• ${item.shortName || item.name} x${item.quantity} = $${subtotal} USD\n`
      })

      message += `\n*Total: $${this.totalPrice.toFixed(2)} USD*\n`

      if (customerName) {
        message += `\nNombre: ${customerName}`
      }
      if (customerAddress) {
        message += `\nEnviar a: ${customerAddress}`
      }

      return encodeURIComponent(message)
    },

    // Abrir WhatsApp con el pedido
    openWhatsApp(customerName = '', customerAddress = '') {
      const message = this.generateWhatsAppMessage(customerName, customerAddress)
      const url = `https://wa.me/${this.whatsappNumber}?text=${message}`
      window.open(url, '_blank')
    }
  }
})

export const useMainStore = defineStore('main', {
  state: () => ({
    searchPopupStatus: false
  }),
  
  actions: {
    changeSearchPopupStatus() {
      this.searchPopupStatus = !this.searchPopupStatus
    }
  }
})

export const useRadioStore = defineStore('radio', {
  state: () => ({
    isPlaying: false,
    volume: 70,
    nowPlaying: '',
    audioElement: null,
    radioUrl: 'https://radio.cimaspeed.com/8202/stream',
    isInitialized: false
  }),
  
  actions: {
    setAudioElement(element) {
      this.audioElement = element
      this.isInitialized = true
    },
    
    play() {
      if (this.audioElement && this.isInitialized) {
        if (!this.audioElement.src || this.audioElement.src !== this.radioUrl) {
          this.audioElement.src = this.radioUrl
        }
        this.audioElement.play().catch(e => {
          console.error('Error playing radio:', e)
          this.setNowPlaying('Error al reproducir')
        })
      }
    },
    
    pause() {
      if (this.audioElement && this.isInitialized) {
        this.audioElement.pause()
      }
    },
    
    togglePlayPause() {
      if (this.isPlaying) {
        this.pause()
      } else {
        this.play()
      }
    },
    
    setVolume(newVolume) {
      this.volume = newVolume
      if (this.audioElement && this.isInitialized) {
        this.audioElement.volume = newVolume / 100
      }
    },
    
    setIsPlaying(playing) {
      this.isPlaying = playing
    },
    
    setNowPlaying(text) {
      this.nowPlaying = text
    }
  }
})
