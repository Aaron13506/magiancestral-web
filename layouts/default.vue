<template>
  <div class="page-wrapper">
    <slot />
    <SearchPopup />
  </div>
</template>

<script setup>
import SearchPopup from "~/components/SearchPopup.vue";

useHead({
  title: "Magiancestral"
});

onMounted(() => {
  // Loading functionality - may need to be adapted for Nuxt 3
  nextTick(() => {
    // Note: $nuxt.$loading is not available in Nuxt 3
    // Consider using a loading state or custom loading component
    setTimeout(() => {
      // Loading complete
    }, 500);
  });
});
</script>

<style></style>
