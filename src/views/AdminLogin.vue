<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const error = ref('')

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

function login() {
  if (password.value === ADMIN_PASSWORD) {
    localStorage.setItem('parish_admin', 'true')
    router.push('/')
  } else {
    error.value = 'Incorrect password. Please try again.'
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#0D2340] flex items-center justify-center px-4">
    <div class="bg-white rounded-xl p-8 w-full max-w-sm shadow-2xl">

      <!-- LOGO PLACEHOLDER -->
      <div class="w-16 h-16 rounded-full border-2 border-[#C8A84B]/40 bg-[#4A7FBF]/10 flex items-center justify-center mx-auto mb-6">
        <span class="text-[#C8A84B] text-2xl">✝</span>
      </div>

      <h3 class="font-display text-[#1E3A5F] text-xl text-center mb-1">Admin Login</h3>
      <p class="text-xs text-center text-[#5A7A9A] tracking-widest uppercase mb-6">
        Virgen de la Medalla Milagrosa Parish
      </p>

      <div class="mb-4">
        <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">
          Password
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="Enter admin password"
          class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]"
          @keydown.enter="login"
        />
        <p v-if="error" class="text-red-500 text-xs mt-2">{{ error }}</p>
      </div>

      <button
        @click="login"
        class="w-full py-3 bg-[#4A7FBF] text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-[#2E5F9A] transition-colors duration-200"
      >
        Login
      </button>

      <button
        @click="router.push('/')"
        class="w-full mt-3 py-3 bg-[#E8F2FA] text-[#4A7FBF] text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-[#B8D8F0] transition-colors duration-200"
      >
        Back to Home
      </button>

    </div>
  </div>
</template>