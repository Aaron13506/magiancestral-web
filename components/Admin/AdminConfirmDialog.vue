<template>
  <Teleport to="body">
    <div
      v-if="state.open"
      class="admin-shell a-modal-backdrop"
      role="dialog"
      aria-modal="true"
      @click.self="cancel"
    >
      <div class="a-modal">
        <div class="a-modal__head">
          <h3>{{ state.title || 'Confirmar acción' }}</h3>
          <button type="button" class="a-btn a-btn--subtle a-btn--icon" aria-label="Cerrar" @click="cancel">
            <i class="fas fa-times" />
          </button>
        </div>

        <div class="a-modal__body">
          <p>{{ state.message }}</p>
          <p v-if="state.detail" class="a-muted" style="margin-top: 8px !important;">{{ state.detail }}</p>
        </div>

        <div class="a-modal__foot">
          <button type="button" class="a-btn a-btn--ghost" @click="cancel">
            {{ state.cancelLabel }}
          </button>
          <button
            type="button"
            class="a-btn"
            :class="state.danger ? 'a-btn--danger' : 'a-btn--primary'"
            @click="accept"
          >
            {{ state.confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue'

const { state, accept, cancel } = useAdminConfirm()

const onKeydown = (e) => {
  if (!state.value.open) return
  if (e.key === 'Escape') cancel()
  if (e.key === 'Enter') accept()
}

// El diálogo bloquea el scroll del fondo mientras está abierto.
watch(() => state.value.open, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>
