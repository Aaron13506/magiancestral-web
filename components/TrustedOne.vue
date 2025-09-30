<template>
  <section class="trusted_one" style="background-image: url(/assets/images/resources/trusted_one_bg.jpg)">
    <div class="container">
      <div class="row">
        <div class="col-xl-6 col-lg-6">
          <div class="trusted_one_text">
            <h2>Our magiancestral trusted by<br>more than<span class="counter">{{ animatedClients }}</span> <br>clients</h2>
          </div>
        </div>
        <div class="col-xl-6 col-lg-6">
          <ul class="trusted_one_counter_box list-unstyled wow fadeInRight" data-wow-delay="100ms">
            <li class="trusted_one_couter_single">
              <div class="trusted_one_couter_icon">
                <i class="icon-watering"></i>
              </div>
              <h3><span class="counter">{{ animatedProjects }}</span></h3>
              <p>Projects</p>
            </li>
            <li class="trusted_one_couter_single">
              <div class="trusted_one_couter_icon">
                <i class="icon-wheelbarrow"></i>
              </div>
              <h3><span class="counter">{{ animatedProducts }}</span></h3>
              <p>products</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const animatedClients = ref(0)
const animatedProjects = ref(0)
const animatedProducts = ref(0)

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
  animateValue(0, 98750, 3000, (value) => {
    animatedClients.value = value.toLocaleString()
  })
  
  animateValue(0, 5493, 3000, (value) => {
    animatedProjects.value = value.toLocaleString()
  })
  
  animateValue(0, 1750, 3000, (value) => {
    animatedProducts.value = value.toLocaleString()
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
  
  const section = document.querySelector('.trusted_one')
  if (section) {
    observer.value.observe(section)
  }
})
</script>


<style scoped>

</style>
