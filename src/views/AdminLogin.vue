<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Shield } from 'reicon-vue'
import { useAuth } from '../lib/auth'

const router = useRouter()
const { login: authLogin } = useAuth()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  if (!email.value || !password.value) {
    error.value = 'Please enter email and password.'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await authLogin(email.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = e.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-parish-navy flex items-center justify-center px-4">
    <div class="bg-white rounded-xl p-8 w-full max-w-sm shadow-2xl">

      <!-- LOGO PLACEHOLDER -->
      <div class="w-16 h-16 rounded-full border-2 border-parish-gold/40 bg-parish-blue/10 flex items-center justify-center mx-auto mb-6">
        <Shield :size="32" weight="Outline" class="text-parish-gold" />
      </div>

      <h3 class="font-display text-parish-navy-soft text-xl text-center mb-1">Admin Login</h3>
      <p class="text-xs text-center text-parish-text tracking-widest uppercase mb-6">
        Virgen de la Medalla Milagrosa Parish
      </p>

      <div class="mb-3">
        <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">
          Email
        </label>
        <input
          v-model="email"
          type="email"
          placeholder="admin@parish.com"
          class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2"
          @keydown.enter="login"
        />
      </div>
      <div class="mb-4">
        <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">
          Password
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter admin password"
          class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2"
          @keydown.enter="login"
        />
        <p v-if="error" class="text-red-500 text-xs mt-2">{{ error }}</p>
      </div>

      <button
        @click="login"
        :disabled="loading"
        class="w-full py-3 bg-parish-blue text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-parish-navy-soft transition-colors duration-200 disabled:opacity-50"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <button
        @click="router.push('/')"
        class="w-full mt-3 py-3 bg-parish-blue-bg text-parish-blue text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-parish-blue-pale transition-colors duration-200"
      >
        Back to Home
      </button>

    </div>
  </div>
</template>