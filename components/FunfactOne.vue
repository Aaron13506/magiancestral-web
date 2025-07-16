<template>
  <section class="funfact_one">
    <div class="container">
        <ul class="counter_one_box list-unstyled">
            <li class="funfact_one_single wow fadeInLeft" data-wow-delay="300ms">
                <div class="funfact_one_icon">
                    <i class="icon-watering"></i>
                </div>
                <h3><span class="counter">{{ animatedProjects }}</span></h3>
                <p>Projects</p>
            </li>
            <li class="funfact_one_single wow fadeInLeft" data-wow-delay="600ms">
                <div class="funfact_one_icon">
                    <i class="icon-wheelbarrow"></i>
                </div>
                <h3><span class="counter">{{ animatedProducts }}</span></h3>
                <p>products</p>
            </li>
            <li class="funfact_one_single wow fadeInLeft" data-wow-delay="900ms">
                <div class="funfact_one_icon">
                    <i class="icon-customer-review"></i>
                </div>
                <h3><span class="counter">{{ animatedSatisfied }}</span></h3>
                <p>satisfied</p>
            </li>
            <li class="funfact_one_single wow fadeInLeft" data-wow-delay="1200ms">
                <div class="funfact_one_icon">
                    <i class="icon-meeting"></i>
                </div>
                <h3><span class="counter">{{ animatedCommunity }}</span></h3>
                <p>community</p>
            </li>
        </ul>
    </div>
</section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const animatedProjects = ref(0)
const animatedProducts = ref(0)
const animatedSatisfied = ref(0)
const animatedCommunity = ref(0)

const animateValue = (start, end, duration, callback) => {
  const startTime = performance.now()
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const currentValue = Math.floor(start + (end - start) * progress)
    callback(currentValue)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

const startCounters = () => {
  animateValue(0, 5493, 3000, (value) => {
    animatedProjects.value = value.toLocaleString()
  })
  
  animateValue(0, 1750, 3000, (value) => {
    animatedProducts.value = value.toLocaleString()
  })
  
  animateValue(0, 2458, 3000, (value) => {
    animatedSatisfied.value = value.toLocaleString()
  })
  
  animateValue(0, 1670, 3000, (value) => {
    animatedCommunity.value = value.toLocaleString()
  })
}

const observer = ref(null)

onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters()
        observer.value.disconnect()
      }
    })
  })
  
  const section = document.querySelector('.funfact_one')
  if (section) {
    observer.value.observe(section)
  }
})
</script>

<style scoped>

</style>
