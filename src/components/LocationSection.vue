<template>
  <section id="location" class="bg-white py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- HEADER -->
      <div class="mb-10">
        <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-[#C8A84B] mb-2">
          Visit Us
        </p>
        <h2 class="font-display font-semibold text-[#1E3A5F] leading-tight text-2xl sm:text-3xl md:text-4xl">
          Find Our <em class="italic text-[#4A7FBF]">Parish</em>
        </h2>
        <div class="w-12 h-0.5 bg-gradient-to-r from-[#C8A84B] to-[#E4C876] mt-4"></div>
      </div>

      <!-- GRID -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        <!-- LEFT INFO -->
        <div class="flex flex-col gap-5">
          <div v-for="item in locationInfo" :key="item.label" class="flex gap-4 items-start">
            <div class="w-11 h-11 rounded-lg bg-[#E8F2FA] flex items-center justify-center flex-shrink-0 text-lg">
              {{ item.icon }}
            </div>
            <div>
              <p class="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#C8A84B] mb-1">
                {{ item.label }}
              </p>
              <p class="text-sm text-[#1A2E45] leading-relaxed" v-html="item.value"></p>
            </div>
          </div>
        </div>

        <!-- RIGHT MAP -->
        <div class="relative rounded-xl overflow-hidden border border-[#E8F2FA] h-[320px] sm:h-[380px] bg-[#E8F2FA]">
          <div
            class="absolute inset-0 opacity-20"
            style="background-image: repeating-linear-gradient(0deg, transparent, transparent 39px, #7FB3E0 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #7FB3E0 40px);"
          ></div>
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
            <span class="text-5xl drop-shadow-lg">📍</span>
            <p class="font-display text-[#1E3A5F] text-sm text-center px-6 leading-snug">
              Virgen de la Medalla Milagrosa Parish
            </p>
            <p class="text-[#5A7A9A] text-xs font-sans">Malabago, Mangaldan, Pangasinan</p>
            <button
              @click="openMap"
              class="px-5 py-2.5 bg-[#4A7FBF] text-white text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-[#2E5F9A] transition-colors duration-200"
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
const locationInfo = [
  {
    icon: '📍',
    label: 'Address',
    value: 'Malabago, Mangaldan<br>Pangasinan, 2432 Philippines'
  },
  {
    icon: '🕊',
    label: 'Daily Mass',
    value: 'Mon–Sat: 6:15 AM · Mother Parish<br>Sunday: 6:30 AM, 7:00 AM (Anolid), 8:00 AM (Maasin)'
  },
  {
    icon: '🏛️',
    label: 'Parish Office',
    value: 'Monday & Wed-Sat: 9:00 AM – 5:00 PM<br>Sunday: 9:00 AM – 12:00 NN<br><span class="text-red-600 font-semibold">Tuesday: Closed</span>'
  },
  {
    icon: '⛪',
    label: 'Chapels',
    value: 'Anolid Chapel · Maasin Chapel'
  },
]

function openMap() {
  window.open(
    'https://maps.google.com/?q=Virgen+de+la+Medalla+Milagrosa+Parish+Mangaldan+Pangasinan',
    '_blank'
  )
}
</script>