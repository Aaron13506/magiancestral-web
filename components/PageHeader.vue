<template>

  <section class="page-header" style="background-image: url(/assets/images/backgrounds/page-header-contact.jpg);">
    <div class="container">
      <h2>Titulo</h2>
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
    }

  }
</script>

<style scoped>
h2
{
  opacity: 0;
}
</style>
