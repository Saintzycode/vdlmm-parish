<script setup>
import { Calendar } from 'reicon-vue'
import logoImg from '../assets/Official.jpg'
</script>

<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-parish-navy px-4 pt-24 pb-16 text-center"
  >
    <!-- BG GRADIENT -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-parish-blue/20 blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-parish-gold/10 blur-3xl"></div>
    </div>

    <!-- CONTENT -->
    <div class="relative z-10 max-w-3xl mx-auto flex flex-col items-center">

      <!-- LOGO -->
      <div class="w-32 h-32 md:w-44 md:h-44 rounded-full border-2 border-parish-gold/40 bg-parish-blue/10 flex items-center justify-center mb-6 flex-shrink-0 overflow-hidden">
        <img :src="logoImg" alt="parish logo" class="w-full h-full object-cover" />
      </div>

      <!-- EYEBROW -->
      <p class="text-[0.65rem] sm:text-[0.72rem] font-bold tracking-[0.4em] uppercase text-parish-gold-soft mb-3">
        Archdiocese of Lingayen–Dagupan
      </p>

      <!-- TITLE -->
      <h1 class="font-display font-semibold text-white leading-tight mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        Virgen de la Medalla<br>
        <em class="italic text-parish-blue-soft">Milagrosa Parish</em>
      </h1>

      <!-- LOCATION -->
      <p class="text-[0.72rem] sm:text-sm font-semibold tracking-[0.15em] uppercase text-parish-blue-pale/70 mb-4">
        Malabago, Mangaldan, Pangasinan · 2432 Philippines
      </p>

      <!-- PRAYER -->
      <p class="font-body-serif italic text-parish-blue-pale/75 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mb-8">
        "O Mary, conceived without sin,<br class="hidden sm:block">
        pray for us who have recourse to thee."
      </p>

      <!-- CTA BUTTONS -->
      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
        <a href="#schedule" class="px-6 py-3 bg-parish-gold text-parish-navy text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-parish-gold-soft transition-all duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2">
          <Calendar :size="18" weight="Outline" /> Mass Schedule
        </a>
        <a href="#announcements" class="px-6 py-3 border border-white/25 text-white/80 text-sm font-bold tracking-widest uppercase rounded-sm hover:border-parish-gold-soft hover:text-parish-gold-soft transition-all duration-200">
          Parish Announcements
        </a>
      </div>

    </div>

    <!-- BOTTOM WAVE -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full block">
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-parish-blue-bg-2)"/>
      </svg>
    </div>
  </section>
</template>