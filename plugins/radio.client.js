import { useRadioStore } from '~/store/index.js'

export default defineNuxtPlugin(() => {
  if (process.client) {
    const radioStore = useRadioStore()
    
    // Create global audio element
    const globalAudio = document.createElement('audio')
    globalAudio.preload = 'none'
    globalAudio.crossOrigin = 'anonymous'
    
    // Set up event listeners
    globalAudio.addEventListener('loadstart', () => {
      radioStore.setNowPlaying('Cargando...')
    })
    
    globalAudio.addEventListener('canplay', () => {
      radioStore.setNowPlaying('Listo para reproducir')
    })
    
    globalAudio.addEventListener('playing', () => {
      radioStore.setIsPlaying(true)
      radioStore.setNowPlaying('Reproduciendo: En vivo')
    })
    
    globalAudio.addEventListener('pause', () => {
      radioStore.setIsPlaying(false)
      radioStore.setNowPlaying('Pausado')
    })
    
    globalAudio.addEventListener('error', () => {
      radioStore.setIsPlaying(false)
      radioStore.setNowPlaying('Error al cargar')
    })
    
    // Set initial volume
    globalAudio.volume = radioStore.volume / 100
    
    // Register audio element in store
    radioStore.setAudioElement(globalAudio)
    
    // Append to body (hidden)
    document.body.appendChild(globalAudio)
  }
})