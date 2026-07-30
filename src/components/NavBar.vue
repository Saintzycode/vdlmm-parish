<script setup>
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { Logout, MedalStar } from 'reicon-vue'
import { useAuth } from '../lib/auth'
import logoImg from '../assets/Official.jpg'

const { isAdmin, logout } = useAuth()

const isOpen = ref(false)
const toggleMenu = () => (isOpen.value = !isOpen.value)
const closeMenu = () => (isOpen.value = false)

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Parish Council', to: '/parish-council' },
  { label: 'Announcements', to: '/announcements' },
  { label: 'Mass Schedule', to: '/schedule' },
  { label: 'Location', to: '/location' },
  { label: 'Contact', to: '/contact' },
]

const logoSrc = logoImg

function itemDelay(i) {
  return { delay: 0.04 * (i + 1), type: 'spring', stiffness: 300, damping: 25 }
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-parish-navy/95 backdrop-blur-md border-b-2 border-parish-gold">
    <div class="absolute left-4 top-0 h-16 flex items-center z-50">
      <router-link to="/" class="flex items-center gap-3" @click="closeMenu">
        <template v-if="logoSrc">
          <img :src="logoSrc" alt="parish logo" class="w-10 h-10 object-contain rounded-full" />
        </template>
        <template v-else>
          <div class="w-10 h-10 rounded-full bg-parish-blue/30 border border-parish-gold/40 flex items-center justify-center flex-shrink-0">
            <MedalStar :size="20" weight="Outline" class="text-parish-gold" />
          </div>
        </template>
        <div class="leading-tight">
          <span class="block text-[0.6rem] font-bold tracking-[0.18em] uppercase text-parish-gold-soft">Roman Catholic Parish</span>
          <span class="block text-[0.78rem] font-semibold text-white font-display tracking-wide leading-tight">Virgen de la Medalla Milagrosa</span>
        </div>
      </router-link>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-[68px]">

        <!-- RIGHT SIDE NAV (desktop links + mobile hamburger) -->
        <div class="absolute right-4 top-0 h-16 flex items-center z-50">
          <ul class="hidden lg:flex items-center gap-6 mr-4">
            <li v-for="navLink in links" :key="navLink.label">
              <router-link :to="navLink.to" class="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white/60 hover:text-parish-gold-soft transition-colors duration-200">{{ navLink.label }}</router-link>
            </li>
            <li v-if="isAdmin">
              <button @click="logout" class="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-green-400 border border-green-500/40 px-3 py-1.5 rounded-sm hover:bg-green-500/10 transition-colors duration-200 flex items-center gap-1.5"><Logout :size="14" weight="Outline" /> Logout</button>
            </li>
            <li>
              <router-link to="/" class="text-[0.72rem] font-bold tracking-[0.12em] uppercase bg-parish-gold text-parish-navy px-4 py-2 rounded-sm hover:bg-parish-gold-soft transition-colors duration-200">Visit Us</router-link>
            </li>
          </ul>

          <!-- HAMBURGER -->
          <button class="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none" @click="toggleMenu" aria-label="Toggle menu" :aria-expanded="isOpen">
            <span class="block w-6 h-[2px] bg-parish-gold transition-all duration-300" :class="isOpen ? 'rotate-45 translate-y-[7px]' : ''"></span>
            <span class="block w-6 h-[2px] bg-parish-gold transition-all duration-300" :class="isOpen ? 'opacity-0' : ''"></span>
            <span class="block w-6 h-[2px] bg-parish-gold transition-all duration-300" :class="isOpen ? '-rotate-45 -translate-y-[7px]' : ''"></span>
          </button>
        </div>

      </div>
    </div>

    <!-- MOBILE OVERLAY -->
    <AnimatePresence>
      <motion.div
        v-if="isOpen"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
        :transition="{ duration: 0.2 }"
        class="fixed inset-0 bg-black/40 z-40 lg:hidden"
        @click="closeMenu"
      />
    </AnimatePresence>

    <!-- MOBILE MENU PANEL -->
    <AnimatePresence>
      <motion.div
        v-if="isOpen"
        :initial="{ opacity: 0, y: -12 }"
        :animate="{ opacity: 1, y: 0 }"
        :exit="{ opacity: 0, y: -12 }"
        :transition="{ duration: 0.25, ease: 'easeOut' }"
        class="lg:hidden bg-parish-navy border-t border-parish-gold/20 relative z-50"
      >
        <ul class="flex flex-col px-4 py-4 gap-1">
          <motion.li
            v-for="(navLink, i) in links"
            :key="navLink.label"
            :initial="{ opacity: 0, x: -16 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="itemDelay(i)"
          >
            <router-link :to="navLink.to" class="block py-3 px-3 text-sm font-semibold tracking-widest uppercase text-white/70 hover:text-parish-gold-soft hover:bg-white/5 rounded transition-colors duration-200" @click="closeMenu">{{ navLink.label }}</router-link>
          </motion.li>
          <motion.li
            v-if="isAdmin"
            :key="'admin'"
            :initial="{ opacity: 0, x: -16 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="itemDelay(links.length)"
          >
            <button @click="logout" class="w-full py-3 px-3 text-sm font-bold tracking-widest uppercase text-center text-green-400 border border-green-500/40 rounded hover:bg-green-500/10 transition-colors duration-200 flex items-center justify-center gap-1.5"><Logout :size="16" weight="Outline" /> Admin Logout</button>
          </motion.li>
          <motion.li
            :key="'visit'"
            class="mt-2"
            :initial="{ opacity: 0, x: -16 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="itemDelay(links.length + (isAdmin ? 1 : 0))"
          >
            <router-link to="/" class="block py-3 px-3 text-sm font-bold tracking-widest uppercase text-center bg-parish-gold text-parish-navy rounded-sm hover:bg-parish-gold-soft transition-colors duration-200" @click="closeMenu">Visit Us</router-link>
          </motion.li>
        </ul>
      </motion.div>
    </AnimatePresence>
  </nav>
</template>