<template>
  <section id="council" class="bg-white py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- HEADER -->
      <div class="text-center mb-12">
        <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-[#C8A84B] mb-2">Leadership</p>
        <h2 class="font-display font-semibold text-[#1E3A5F] leading-tight text-2xl sm:text-3xl md:text-4xl">Parish Youth <em class="italic text-[#4A7FBF]">Council</em></h2>
        <div class="w-12 h-0.5 bg-gradient-to-r from-[#C8A84B] to-[#E4C876] mt-4 mx-auto"></div>
      </div>

      <!-- YOUTH DIRECTOR — FEATURED -->
      <div class="flex flex-col items-center mb-12">
        <div class="w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#E8F2FA] border-4 border-[#C8A84B] overflow-hidden flex items-center justify-center mb-4">
          <!-- Replace with: <img src="photo.jpg" class="w-full h-full object-cover" /> -->
          <span class="text-5xl">👤</span>
        </div>
        <p class="text-[0.65rem] font-bold tracking-[0.3em] uppercase text-[#C8A84B] mb-1">Youth Director</p>
        <h3 class="font-display text-[#1E3A5F] text-xl font-semibold">Rev. Fr. Jeremias Cera</h3>
      </div>

      <!-- COUNCIL GRID -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <div v-for="member in council" :key="member.name" class="flex flex-col items-center text-center">
          <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#E8F2FA] border-2 border-[#4A7FBF]/30 overflow-hidden flex items-center justify-center mb-3 hover:border-[#C8A84B] transition-colors duration-200">
            <!-- Replace with: <img :src="member.photo" class="w-full h-full object-cover" /> -->
            <span class="text-3xl">👤</span>
          </div>
          <p class="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-[#C8A84B] mb-1 leading-tight">{{ member.title }}</p>
          <p class="font-display text-[#1E3A5F] text-xs font-semibold leading-snug">{{ member.name }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const council = [
  { title: 'Youth Coordinator', name: 'John Louise Gorospe' },
  { title: 'Youth Leader', name: 'Aldem Estor' },
  { title: 'Secretary', name: 'Ferdinand Ola' },
  { title: 'Treasurer', name: 'Ysabelle Tandingan' },
  { title: 'Auditor', name: 'Mico Biasaga' },
  { title: 'Faith Formation', name: 'Jerico Prado' },
  { title: 'Divine Worship', name: 'Shaira Quiroz' },
  { title: 'Social Communication', name: 'Eline Estor' },
  { title: 'Social Action & Engagement', name: 'Ivan Mostoles' },
  { title: 'Fellowship & Animation', name: 'Carlos Calimlim' },
]
</script>