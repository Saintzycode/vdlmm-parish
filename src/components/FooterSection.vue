<template>
  <footer class="bg-[#0D2340] py-12 px-4">
    <div class="max-w-6xl mx-auto flex flex-col items-center text-center">

      <!-- LOGO -->
      <div class="w-16 h-16 rounded-full border-2 border-[#C8A84B]/40 bg-[#4A7FBF]/10 flex items-center justify-center mb-4 overflow-hidden">
        <img :src="logoSrc" alt="parish logo" class="w-full h-full object-cover" />
      </div>

      <!-- NAME -->
      <h3 class="font-display text-white text-base sm:text-lg font-semibold mb-1">
        Virgen de la Medalla Milagrosa Parish
      </h3>
      <p class="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#7FB3E0] mb-1">
        Malabago, Mangaldan, Pangasinan, Philippines
      </p>
      <p class="text-[0.7rem] tracking-widest uppercase text-[#7FB3E0]/60 mb-6">
        Archdiocese of Lingayen–Dagupan
      </p>

      <!-- GOLD LINE -->
      <div class="w-12 h-px bg-[#C8A84B] mb-6"></div>

      <!-- PRAYER -->
      <p class="font-body-serif italic text-[#B8D8F0]/50 text-sm sm:text-base mb-8 max-w-md">
        "O Mary, conceived without sin, pray for us who have recourse to thee."
      </p>

      <!-- NAV LINKS -->
      <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
        <a
          v-for="link in footerLinks"
          :key="link.href"
          :href="link.href"
          class="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#B8D8F0]/40 hover:text-[#E4C876] transition-colors duration-200"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- COPYRIGHT -->
      <p class="text-[0.7rem] text-white/20">
        © {{ currentYear }} Virgen de la Medalla Milagrosa Parish · All rights reserved.
      </p>

    </div>
  </footer>
</template>

<script setup>
import logoImg from '../assets/Main.jpg'

const logoSrc = logoImg
const currentYear = new Date().getFullYear()

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Mass Schedule', href: '#schedule' },
  { label: 'Announcements', href: '#announcements' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
]
</script>