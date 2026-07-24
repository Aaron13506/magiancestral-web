<template>
  <a :href="url" target="_blank" rel="noopener" class="pdf-btn">
    <i class="icon-pdf"></i>{{ text }}
  </a>
</template>

<script setup>
defineProps({
  url: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: 'Descargar PDF'
  }
})
</script>

<style scoped>
.pdf-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--thm-base, #b3a85a);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid var(--thm-base, #b3a85a);
  border-radius: 4px;
  padding: 8px 18px;
}
</style>
