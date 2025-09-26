<template>

  <section class="page-header" :style="`background-image: url(${backgroundImage});`">
    <div class="container">
      <h2>{{ title }}</h2>
    </div>
  </section>

</template>

<script>
  export default {
    name: "PageHeader",
    props: {
      title: {
        type: String
      }
    },
    computed: {
      backgroundImage() {
        // Generate random number between 1 and 5
        const randomNum = Math.floor(Math.random() * 5) + 1;
        return `/assets/images/main-slider/mainslidernew${randomNum}.jpg`;
      }
    }

  }
</script>

<style scoped>
h2 {
  color: white;
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  margin: 0;
  padding: 80px 0;
}

@media (max-width: 768px) {
  h2 {
    font-size: 2rem;
    padding: 60px 0;
  }
}
</style>
