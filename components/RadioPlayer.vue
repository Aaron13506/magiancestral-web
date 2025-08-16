<template>
  <div class="radio-player">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-12 col-md-4">
          <div class="radio-info d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center flex-grow-1">
              <div class="radio-icon me-2">
                <img src="/assets/images/icon/radio.png" alt="Radio" />
              </div>
              <div class="radio-station">
                <div class="infinite-scroll-container d-md-none">
                  <div class="infinite-scroll-text">
                    <span class="scroll-item">Magia Ancestral Radio</span>
                    <span class="scroll-separator"> • </span>
                    <span class="scroll-item mobile-song-title" id="sonic_title_mobile">Cargando...</span>
                    <span class="scroll-separator"> • </span>
                    <span class="scroll-item">Magia Ancestral Radio</span>
                    <span class="scroll-separator"> • </span>
                    <span class="scroll-item mobile-song-title" id="sonic_title_mobile">Cargando...</span>
                    <span class="scroll-separator"> • </span>
                  </div>
                </div>
                <span class="station-name d-none d-md-block">Magia Ancestral Radio</span>
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
            <div id="sonic_title" class="song-title"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRadioStore } from '~/store/index.js'

const radioStore = useRadioStore()

const isPlaying = computed(() => radioStore.isPlaying)
const volume = computed({
  get: () => radioStore.volume,
  set: (value) => radioStore.setVolume(value)
})
const nowPlaying = computed(() => radioStore.nowPlaying)

const togglePlayPause = () => {
  radioStore.togglePlayPause()
}

const changeVolume = () => {
  radioStore.setVolume(volume.value)
}

onMounted(() => {
  // Sync mobile sonic_title with desktop version
  const observer = new MutationObserver(() => {
    const desktopTitle = document.getElementById('sonic_title')?.textContent
    const mobileTitle = document.getElementById('sonic_title_mobile')
    if (mobileTitle && desktopTitle) {
      mobileTitle.textContent = desktopTitle
    }
  })

  const desktopElement = document.getElementById('sonic_title')
  if (desktopElement) {
    observer.observe(desktopElement, { childList: true, characterData: true, subtree: true })
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

.song-title {
  font-size: 12px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  text-align: right;
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


.infinite-scroll-container {
  overflow: hidden;
  margin-left: 10px;
  width: 180px;
  white-space: nowrap;
}

.infinite-scroll-text {
  display: inline-block;
  animation: infinite-scroll 12s linear infinite;
  white-space: nowrap;
}

.scroll-item {
  font-weight: 600;
  font-size: 14px;
}

.mobile-song-title {
  font-weight: 400;
}

.scroll-separator {
  font-weight: 400;
  opacity: 0.7;
}

@keyframes infinite-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
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
