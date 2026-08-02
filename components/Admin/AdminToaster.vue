<template>
  <div class="a-toaster" aria-live="polite">
    <TransitionGroup name="a-toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="a-toast"
        :class="`a-toast--${t.kind}`"
      >
        <i :class="iconFor(t.kind)" />
        <span>{{ t.message }}</span>
        <button type="button" class="a-toast__close" aria-label="Cerrar" @click="dismiss(t.id)">×</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const { toasts, dismiss } = useAdminToast()

const iconFor = (kind) => ({
  success: 'fas fa-check',
  error: 'fas fa-exclamation-triangle',
  warn: 'fas fa-exclamation-triangle'
}[kind] || 'fas fa-check')
</script>
