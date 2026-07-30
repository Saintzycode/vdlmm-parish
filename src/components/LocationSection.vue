<template>
  <section id="location" class="bg-white py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- HEADER -->
      <div class="mb-10">
        <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-parish-gold mb-2">
          Visit Us
        </p>
        <h2 class="font-display font-semibold text-parish-navy-soft leading-tight text-2xl sm:text-3xl md:text-4xl">
          Find Our <em class="italic text-parish-blue">Parish</em>
        </h2>
        <div class="w-12 h-0.5 bg-gradient-to-r from-parish-gold to-parish-gold-soft mt-4"></div>
      </div>

      <!-- GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        <!-- LEFT INFO -->
        <div class="flex flex-col gap-5">
          <div v-for="item in locationInfo" :key="item.label" class="flex gap-4 items-start">
            <div class="w-11 h-11 rounded-lg bg-parish-blue-bg flex items-center justify-center flex-shrink-0">
              <component :is="item.icon" :size="22" weight="Outline" class="text-parish-blue" />
            </div>
            <div>
              <p class="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-parish-gold mb-1">
                {{ item.label }}
              </p>
              <div class="text-sm text-parish-text-strong leading-relaxed">
                <p v-for="(line, i) in item.lines" :key="i" :class="line.class">{{ line.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT MAP -->
        <div class="relative rounded-xl overflow-hidden border border-parish-blue-bg h-[320px] sm:h-[380px] bg-parish-blue-bg">
          <div
            class="absolute inset-0 opacity-20"
            style="background-image: repeating-linear-gradient(0deg, transparent, transparent 39px, #7FB3E0 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #7FB3E0 40px);"
          ></div>
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
            <Pin :size="48" weight="Outline" class="text-parish-blue drop-shadow-lg" />
            <p class="font-display text-parish-navy-soft text-sm text-center px-6 leading-snug">
              Virgen de la Medalla Milagrosa Parish
            </p>
            <p class="text-parish-text text-xs font-sans">Malabago, Mangaldan, Pangasinan</p>
            <button
              @click="openMap"
              class="px-5 py-2.5 bg-parish-blue text-white text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-parish-navy-soft transition-colors duration-200"
            >
              Open in Google Maps
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { Pin, Calendar, Building, Map } from 'reicon-vue'

const locationInfo = [
  {
    icon: Pin,
    label: 'Address',
    lines: [
      { text: 'Malabago, Mangaldan' },
      { text: 'Pangasinan, 2432 Philippines' },
    ],
  },
  {
    icon: Calendar,
    label: 'Daily Mass',
    lines: [
      { text: 'Mon–Sat: 6:15 AM · Mother Parish' },
      { text: 'Sunday: 6:30 AM, 7:00 AM (Anolid), 8:00 AM (Maasin)' },
    ],
  },
  {
    icon: Building,
    label: 'Parish Office',
    lines: [
      { text: 'Monday & Wed-Sat: 9:00 AM – 5:00 PM' },
      { text: 'Sunday: 9:00 AM – 12:00 NN' },
      { text: 'Tuesday: Closed', class: 'text-red-600 font-semibold' },
    ],
  },
  {
    icon: Map,
    label: 'Chapels',
    lines: [
      { text: 'Anolid Chapel · Maasin Chapel' },
    ],
  },
]

function openMap() {
  window.open(
    'https://maps.google.com/?q=Virgen+de+la+Medalla+Milagrosa+Parish+Mangaldan+Pangasinan',
    '_blank'
  )
}
</script>