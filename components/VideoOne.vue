<template>
  <section class="video-one" style="background-image:url(/assets/images/resources/video-bg-1.jpg);">
    <div class="container text-center">
      <a href="https://www.youtube.com/watch?v=i9E_Blai8vk" class="video-one__btn videoOne"><i
        class="fa fa-play"></i></a>
      <p>Modern agriculture types</p>
      <h3>Agriculture matters to the<br>future of development</h3>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRadioStore } from '~/store/index.js'

const radioStore = useRadioStore()
let wasPlayingBeforeVideo = false

onMounted(() => {
  const lightbox = new GLightbox({
    selector: '.videoOne',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
  })

  lightbox.on('open', () => {
    wasPlayingBeforeVideo = radioStore.isPlaying
    if (wasPlayingBeforeVideo) {
      radioStore.pause()
    }
  })

  lightbox.on('close', () => {
    if (wasPlayingBeforeVideo) {
      radioStore.play()
    }
  })
})
</script>

<style scoped>

</style>
