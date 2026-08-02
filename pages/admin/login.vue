<template>
  <div class="admin-auth">
    <form class="a-authcard" novalidate @submit.prevent="onSubmit">
      <div class="a-authcard__head">
        <div class="a-authcard__mark">M</div>
        <h1>Panel administrativo</h1>
        <p>Magiancestral</p>
      </div>

      <div class="a-authcard__body">
        <div v-if="expired" class="a-alert a-alert--warn">
          <i class="fas fa-exclamation-triangle" />
          <span>Tu sesión expiró. Vuelve a entrar para continuar.</span>
        </div>

        <div class="a-field">
          <label class="a-field__label" for="username">Usuario</label>
          <input
            id="username"
            ref="usernameInput"
            v-model="username"
            type="text"
            class="a-input"
            autocomplete="username"
            autocapitalize="off"
            spellcheck="false"
          >
        </div>

        <div class="a-field">
          <label class="a-field__label" for="password">Contraseña</label>
          <div class="a-passwrap">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="a-input"
              autocomplete="current-password"
            >
            <button
              type="button"
              class="a-passtoggle"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" />
            </button>
          </div>
        </div>

        <div v-if="error" class="a-alert a-alert--error">
          <i class="fas fa-exclamation-triangle" />
          <span>{{ error }}</span>
        </div>

        <button type="submit" class="a-btn a-btn--primary a-btn--block" :disabled="loading">
          <i v-if="loading" class="a-spinner" />
          {{ loading ? 'Entrando…' : 'Entrar' }}
        </button>

        <NuxtLink to="/" class="a-btn a-btn--subtle a-btn--block a-btn--sm">
          <i class="fas fa-arrow-left" /> Volver al sitio
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

definePageMeta({ layout: false })

useHead({ title: 'Entrar · Panel Magiancestral' })

const route = useRoute()
const api = useAdminApi()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const usernameInput = ref(null)

// `useAdminApi` añade `?redirect=` al expulsar por sesión caducada.
const expired = computed(() => Boolean(route.query.redirect))
const redirectTo = computed(() => {
  const target = String(route.query.redirect || '/admin')
  // Solo admitimos rutas internas del panel: evita un redirect abierto.
  return target.startsWith('/admin') ? target : '/admin'
})

onMounted(async () => {
  try {
    await api.raw('/api/admin/auth/me')
    await navigateTo(redirectTo.value)
  } catch {
    usernameInput.value?.focus()
  }
})

const onSubmit = async () => {
  if (!username.value.trim() || !password.value) {
    error.value = 'Escribe tu usuario y contraseña'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await api.post('/api/admin/auth/login', {
      username: username.value.trim(),
      password: password.value
    })
    await navigateTo(redirectTo.value)
  } catch (err) {
    error.value = adminErrorMessage(err, 'Credenciales inválidas')
    password.value = ''
  } finally {
    loading.value = false
  }
}
</script>
