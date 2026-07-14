<template>
  <section id="parish-council" class="relative overflow-hidden bg-[#F6F9FC] py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#4A7FBF]/10 blur-3xl"></div>
      <div class="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#C8A84B]/10 blur-3xl"></div>
      <div class="absolute left-0 top-1/3 h-56 w-56 rounded-full bg-[#B8D8F0]/20 blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">

      <!-- HEADER -->
      <div class="text-center mb-10 sm:mb-14 md:mb-16">
        <p class="text-[0.62rem] sm:text-[0.68rem] font-bold tracking-[0.4em] sm:tracking-[0.5em] uppercase text-[#C8A84B] mb-2 sm:mb-3">Leadership</p>
        <h2 class="font-display font-semibold text-[#1E3A5F] leading-tight text-2xl sm:text-4xl md:text-5xl">
          Parish Youth <em class="italic text-[#4A7FBF]">Council</em>
        </h2>
        <p class="mx-auto mt-3 sm:mt-4 max-w-2xl text-[0.82rem] sm:text-base text-[#5A7A9A] leading-relaxed">
          Faithful, service-driven, and united in mission. Tap or hover each card to see the parish youth council come forward with a refined lift effect.
        </p>
        <div class="w-12 sm:w-14 h-0.5 bg-gradient-to-r from-[#C8A84B] to-[#E4C876] mt-4 sm:mt-5 mx-auto"></div>
      </div>

      <!-- YOUTH DIRECTOR — FEATURED -->
      <div class="mb-8 sm:mb-12 flex flex-col items-center">
        <div class="group w-full max-w-52 sm:max-w-64 md:max-w-72 overflow-hidden rounded-[1.5rem] border border-[#D9E6F2] bg-white/95 shadow-[0_14px_35px_rgba(30,58,95,0.06)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.06] hover:border-[#C8A84B]/55 hover:shadow-[0_24px_50px_rgba(30,58,95,0.12)]">
          <div class="relative flex h-64 sm:h-72 md:h-80 items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7FAFD] via-[#E8F2FA] to-[#DDEAF6] transition-transform duration-300 group-hover:scale-105">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(74,127,191,0.12),_transparent_60%)]"></div>
            <div class="absolute top-3 sm:top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#C8A84B]/30 to-transparent"></div>
            <img
              v-if="featuredPhoto"
              :src="featuredPhoto"
              alt="Youth Director"
              class="relative h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div v-else class="relative flex h-12 w-12 sm:h-16 sm:w-16 md:h-18 md:w-18 items-center justify-center rounded-full border border-white bg-white/90 shadow-[0_10px_24px_rgba(30,58,95,0.12)] transition-transform duration-300 group-hover:scale-110">
              <span class="text-xl sm:text-2xl md:text-[2.5rem]">👤</span>
            </div>
          </div>
          <div class="px-4 sm:px-6 py-3 sm:py-5 md:py-6 text-center">
            <p class="text-[0.53rem] sm:text-[0.62rem] font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#C8A84B] mb-1 sm:mb-2 leading-tight">Youth Director</p>
            <p class="font-display text-[#1E3A5F] text-[0.72rem] sm:text-sm font-semibold leading-snug text-pretty">
              Rev. Fr. Jeremias Cera
            </p>
          </div>
        </div>
      </div>

      <!-- COUNCIL GRID -->
      <div class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-8">
        <div v-for="member in council" :key="member.name" class="flex flex-col items-center text-center">
          <div class="group w-full overflow-hidden rounded-[1.5rem] border border-[#D9E6F2] bg-white/95 shadow-[0_14px_35px_rgba(30,58,95,0.06)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.06] hover:border-[#C8A84B]/55 hover:shadow-[0_24px_50px_rgba(30,58,95,0.12)]">
            <div class="relative flex h-96 sm:h-72 lg:h-80 xl:h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7FAFD] via-[#E8F2FA] to-[#DDEAF6] transition-transform duration-300 group-hover:scale-105">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(74,127,191,0.12),_transparent_60%)]"></div>
              <div class="absolute top-3 sm:top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#C8A84B]/30 to-transparent"></div>
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="member.name"
                @error="member.photo = ''"
                class="relative h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div v-else class="relative flex h-12 w-12 sm:h-16 sm:w-16 md:h-18 md:w-18 items-center justify-center rounded-full border border-white bg-white/90 shadow-[0_10px_24px_rgba(30,58,95,0.12)] transition-transform duration-300 group-hover:scale-110">
                <span class="text-xl sm:text-2xl md:text-[2.5rem]">👤</span>
              </div>
            </div>
            <div class="px-4 sm:px-6 py-3 sm:py-5 md:py-6">
              <p class="text-[0.53rem] sm:text-[0.62rem] font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#C8A84B] mb-1 sm:mb-2 leading-tight">
                {{ member.title }}
              </p>
              <p class="font-display text-[#1E3A5F] text-[0.72rem] sm:text-sm font-semibold leading-snug text-pretty">
                {{ member.name }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const featuredPhoto = ref('')

const council = [
  { title: 'Youth Coordinator', name: 'John Louise Gorospe', photo: '/images/john-louise-gorospe.jpg' },
  { title: 'Youth Leader', name: 'Aldem Estor', photo: '/images/aldem.jpg' },
  { title: 'Secretary', name: 'Ferdinand Ola', photo: '/images/ferdinand-ola.jpg' },
  { title: 'Treasurer', name: 'Ysabelle Tandingan', photo: '/images/ysabelle-tandingan.jpg' },
  { title: 'Auditor', name: 'Mico Biasaga', photo: '/images/mico.jpg' },
  { title: 'Faith Formation', name: 'Jerico Prado', photo: '/images/jerico-prado.jpg' },
  { title: 'Divine Worship', name: 'Shaira Quiroz', photo: '/images/shaira-quiroz.jpg' },
  { title: 'Social Communication', name: 'Eline Estor', photo: '/images/eline.png' },
  { title: 'Social Action & Engagement', name: 'Ivan Mostoles', photo: '/images/ivan-mostoles.jpg' },
  { title: 'Fellowship & Animation', name: 'Carlos Calimlim', photo: '/images/carlos-calimlim.jpg' },
]
</script>