<template>
  <div class="radio-player">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-12 col-md-4">
          <div class="radio-info d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="radio-icon me-2">
                <img src="/assets/images/icon/radio.png" alt="Radio" />
              </div>
              <div class="radio-station">
                <span class="station-name">Magia Ancestral Radio</span>
              </div>
            </div>
            <button
              class="btn-play-pause d-md-none"
              @click="togglePlayPause"
            >
              <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
            </button>
          </div>
        </div>

        <div class="col-md-4 d-none d-md-block">
          <div class="radio-controls d-flex align-items-center justify-content-center">
            <button
              class="btn-play-pause me-3"
              @click="togglePlayPause"
            >
              <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
            </button>

            <div class="volume-control d-flex align-items-center ms-3">
              <i class="fas fa-volume-down me-2"></i>
              <input
                type="range"
                class="volume-slider"
                min="0"
                max="100"
                v-model="volume"
                @input="changeVolume"
              >
              <i class="fas fa-volume-up ms-2"></i>
            </div>
          </div>
        </div>

        <div class="col-md-4 d-none d-md-block">
          <div class="radio-extra d-flex align-items-center justify-content-end">
            <div class="now-playing" v-if="nowPlaying">
              <span class="status-text">{{ nowPlaying }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <audio
      ref="audioPlayer"
      preload="none"
      @loadstart="onLoadStart"
      @canplay="onCanPlay"
      @playing="onPlaying"
      @pause="onPause"
      @error="onError"
    ></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const audioPlayer = ref(null)
const isPlaying = ref(false)
const volume = ref(70)
const nowPlaying = ref('')

const radioUrl = 'https://radio.cimaspeed.com/8202/stream'

const togglePlayPause = () => {
  if (isPlaying.value) {
    pause()
  } else {
    play()
  }
}

const play = () => {
  if (audioPlayer.value) {
    audioPlayer.value.src = radioUrl
    audioPlayer.value.play()
  }
}

const pause = () => {
  if (audioPlayer.value) {
    audioPlayer.value.pause()
  }
}

const changeVolume = () => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value / 100
  }
}


const onLoadStart = () => {
  nowPlaying.value = 'Cargando...'
}

const onCanPlay = () => {
  nowPlaying.value = 'Listo para reproducir'
}

const onPlaying = () => {
  isPlaying.value = true
  nowPlaying.value = 'Reproduciendo: En vivo'
}

const onPause = () => {
  isPlaying.value = false
  nowPlaying.value = 'Pausado'
}

const onError = () => {
  isPlaying.value = false
  nowPlaying.value = 'Error al cargar'
}

watch(volume, () => {
  changeVolume()
})

onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value / 100
  }
})
</script>

<style scoped>
.radio-player {
  background: linear-gradient(135deg, #114736 0%, #0c7737 100%);
  border-bottom: 2px solid #7da052;
  padding: 8px 0;
  transition: all 0.3s ease;
}

.radio-info {
  color: white;
}

.radio-icon {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.radio-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.station-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 0;
  margin-left: 10px;
}

.radio-controls {
  gap: 10px;
}

.btn-control, .btn-play-pause {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-play-pause {
  background: #0c7737;
  width: 40px;
  height: 40px;
}

.btn-control:hover, .btn-play-pause:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.btn-play-pause:hover {
  background: #7da052;
}

.btn-control:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.volume-control {
  color: white;
  font-size: 12px;
}

.volume-slider {
  width: 80px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.radio-extra {
  color: white;
}

.now-playing {
  text-align: right;
  max-width: 200px;
}

.status-text {
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}


@media (max-width: 768px) {
  .radio-player {
    padding: 5px 0;
  }

  .btn-control, .btn-play-pause {
    width: 30px;
    height: 30px;
  }

  .btn-play-pause {
    width: 35px;
    height: 35px;
  }
}
</style>
