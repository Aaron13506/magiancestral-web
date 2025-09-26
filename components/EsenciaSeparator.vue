<template>
  <section class="esencia-separator" style="background-image: url(/assets/images/backgrounds/ocaso.jpg)">
  </section>
</template>

<script>
export default {
  name: "EsenciaSeparator"
}
</script>

<style scoped>
.esencia-separator {
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 200px;
}

@media (max-width: 768px) {
  .esencia-separator {
    height: 150px;
  }
}
</style>