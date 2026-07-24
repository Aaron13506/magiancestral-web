<template>
  <div class="admin-login-page">
    <form class="admin-login-card" @submit.prevent="onSubmit">
      <h1>Panel Admin</h1>
      <p class="admin-login-subtitle">Magiancestral</p>

      <div class="form-group">
        <label for="username">Usuario</label>
        <input id="username" v-model="username" type="text" class="form-control" autocomplete="username" required>
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input id="password" v-model="password" type="password" class="form-control" autocomplete="current-password" required>
      </div>

      <p v-if="error" class="admin-login-error">{{ error }}</p>

      <button type="submit" class="btn btn-primary admin-login-btn" :disabled="loading">
        {{ loading ? 'Ingresando…' : 'Ingresar' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({ layout: false })

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    await $fetch('/api/admin/auth/me')
    await navigateTo('/admin')
  } catch {
    // not authenticated, stay on login page
  }
})

const onSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/admin/auth/login', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })
    await navigateTo('/admin')
  } catch (err) {
    error.value = err?.data?.message || 'Credenciales inválidas'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
.admin-login-card {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
}
.admin-login-card h1 {
  font-size: 22px;
  margin-bottom: 4px;
}
.admin-login-subtitle {
  color: #888;
  margin-bottom: 25px;
}
.admin-login-error {
  color: #c0392b;
  margin: 10px 0 0;
}
.admin-login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
