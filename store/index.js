import { defineStore } from 'pinia'

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
