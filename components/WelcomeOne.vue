<template>
  <section class="welcome_one">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-6">
          <div class="block-title text-left">
            <p>Welcome to agrikol</p>
            <h3>We’re leading organic & agriculture company in Canada</h3>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6">
          <div class="welcome_text">
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have
              suffered alteration in some form, by injected humour, or randomised words which don't
              look even slightly believable.</p>
          </div>
          <div class="welcome_video_box"
               style="background-image:url(/assets/images/resources/welcome_video_bg.jpg)">
            <a href="https://www.youtube.com/watch?v=VGM-FuP0T9k"
               class="welcome_video_btn videoTwo"><i class="fa fa-play"></i></a>
          </div>
        </div>
      </div>
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
    selector: '.videoTwo',
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
