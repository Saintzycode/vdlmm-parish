<script setup>
import { ref, computed } from 'vue'
import logoImg from '../assets/Official.jpg'

const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)
const closeMenu = () => (isOpen.value = false)

const isAdmin = computed(() => localStorage.getItem('parish_admin') === 'true')

function logout() {
  localStorage.removeItem('parish_admin')
  window.location.reload()
}

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Council', href: '#council' },
  { label: 'Announcements', href: '#announcements' }, 
  { label: 'Mass Schedule', href: '#schedule' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
]

const logoSrc = ref(logoImg)
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-[#0D2340]/95 backdrop-blur-md border-b-2 border-[#C8A84B]">
    <div class="absolute left-4 top-0 h-16 flex items-center z-50">
      <a href="#home" class="flex items-center gap-3" @click="closeMenu">
        <template v-if="logoSrc">
          <img :src="logoSrc" alt="parish logo" class="w-10 h-10 object-contain rounded-full" />
        </template>
        <template v-else>
          <div class="w-10 h-10 rounded-full bg-[#4A7FBF]/30 border border-[#C8A84B]/40 flex items-center justify-center flex-shrink-0">
            <span class="text-[#C8A84B] text-xs font-bold">✝</span>
          </div>
        </template>
        <div class="leading-tight">
          <span class="block text-[0.6rem] font-bold tracking-[0.18em] uppercase text-[#E4C876]">Roman Catholic Parish</span>
          <span class="block text-[0.78rem] font-semibold text-white font-display tracking-wide leading-tight">Virgen de la Medalla Milagrosa</span>
        </div>
      </a>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-[68px]">

        <!-- RIGHT SIDE NAV (desktop links + mobile hamburger) -->
        <div class="absolute right-4 top-0 h-16 flex items-center z-50">
          <ul class="hidden lg:flex items-center gap-6 mr-4">
            <li v-for="navLink in links" :key="navLink.href">
              <a :href="navLink.href" class="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white/60 hover:text-[#E4C876] transition-colors duration-200">{{ navLink.label }}</a>
            </li>
            <li v-if="isAdmin">
              <button @click="logout" class="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-green-400 border border-green-500/40 px-3 py-1.5 rounded-sm hover:bg-green-500/10 transition-colors duration-200">🔓 Logout</button>
            </li>
            <li>
              <a href="#contact" class="text-[0.72rem] font-bold tracking-[0.12em] uppercase bg-[#C8A84B] text-[#0D2340] px-4 py-2 rounded-sm hover:bg-[#E4C876] transition-colors duration-200">Visit Us</a>
            </li>
          </ul>

          <!-- HAMBURGER -->
          <button class="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none" @click="toggleMenu" aria-label="Toggle menu">
            <span class="block w-6 h-[2px] bg-[#C8A84B] transition-all duration-300" :class="isOpen ? 'rotate-45 translate-y-[7px]' : ''"></span>
            <span class="block w-6 h-[2px] bg-[#C8A84B] transition-all duration-300" :class="isOpen ? 'opacity-0' : ''"></span>
            <span class="block w-6 h-[2px] bg-[#C8A84B] transition-all duration-300" :class="isOpen ? '-rotate-45 -translate-y-[7px]' : ''"></span>
          </button>
        </div>

      </div>
    </div>

    <!-- MOBILE MENU -->
    <transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
      <div v-if="isOpen" class="lg:hidden bg-[#0D2340] border-t border-[#C8A84B]/20">
        <ul class="flex flex-col px-4 py-4 gap-1">
          <li v-for="navLink in links" :key="navLink.href">
            <a :href="navLink.href" class="block py-3 px-3 text-sm font-semibold tracking-widest uppercase text-white/70 hover:text-[#E4C876] hover:bg-white/5 rounded transition-colors duration-200" @click="closeMenu">{{ navLink.label }}</a>
          </li>
          <li v-if="isAdmin">
            <button @click="logout" class="w-full py-3 px-3 text-sm font-bold tracking-widest uppercase text-center text-green-400 border border-green-500/40 rounded hover:bg-green-500/10 transition-colors duration-200">🔓 Admin Logout</button>
          </li>
          <li class="mt-2">
            <a href="#contact" class="block py-3 px-3 text-sm font-bold tracking-widests uppercase text-center bg-[#C8A84B] text-[#0D2340] rounded-sm hover:bg-[#E4C876] transition-colors duration-200" @click="closeMenu">Visit Us</a>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>