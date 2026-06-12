<template>
  <section id="welcome" class="bg-white py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        <!-- LEFT -->
        <div>
          <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-[#C8A84B] mb-2">
            Welcome to Our Parish
          </p>
          <h2 class="font-display font-semibold text-[#1E3A5F] leading-tight mb-4
                     text-2xl sm:text-3xl md:text-4xl">
            A Home for Every<br>
            <em class="italic text-[#4A7FBF]">Faithful Soul</em>
          </h2>
          <div class="w-12 h-0.5 bg-gradient-to-r from-[#C8A84B] to-[#E4C876] mb-6"></div>

          <!-- VERSE -->
          <blockquote class="border-l-4 border-[#C8A84B] pl-5 mb-6">
            <p class="font-body-serif italic text-[#4A7FBF] text-lg sm:text-xl md:text-2xl leading-relaxed">
              "I am the way, the truth, and the life.<br>
              No one comes to the Father except through me."
            </p>
            <cite class="block mt-3 text-[0.72rem] font-bold tracking-[0.2em] uppercase text-[#C8A84B] not-italic">
              John 14:6
            </cite>
          </blockquote>

          <p class="text-[#5A7A9A] leading-relaxed text-sm sm:text-base mb-4">
            Virgen de la Medalla Milagrosa Parish warmly welcomes all to our community of faith.
            Guided by the intercession of Our Lady of the Miraculous Medal, we are a parish
            family united in prayer, service, and the celebration of the Sacraments.
          </p>
          <p class="text-[#5A7A9A] leading-relaxed text-sm sm:text-base">
            Whether you are a lifelong Catholic, returning to the faith, or simply seeking —
            you will always find an open door, an open heart, and a seat at the Lord's table.
          </p>
        </div>

        <!-- RIGHT -->
        <div class="bg-gradient-to-br from-[#E8F2FA] to-[#D8EAF8] rounded-xl p-6 sm:p-8 md:p-10">

          <!-- LOGO -->
          <div class="w-24 h-24 md:w-28 md:h-28 mx-auto mb-5 rounded-full border-2 border-[#C8A84B]/40 bg-[#4A7FBF]/10 flex items-center justify-center overflow-hidden">
            <img :src="logoSrc" alt="parish logo" class="w-full h-full object-cover" />
          </div>

          <h3 class="font-display text-center text-[#1E3A5F] text-lg md:text-xl mb-6">
            What You'll Find Here
          </h3>

          <!-- CARDS -->
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="item in highlights"
              :key="item.title"
              class="bg-white rounded-lg p-3 sm:p-4 border-t-2 border-[#C8A84B]"
            >
              <div class="text-xl sm:text-2xl mb-2">{{ item.icon }}</div>
              <h4 class="text-xs font-bold text-[#1E3A5F] mb-1 tracking-wide">{{ item.title }}</h4>
              <p class="text-[0.74rem] text-[#5A7A9A] leading-snug">{{ item.desc }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import logoImg from '../assets/Official.jpg'

const highlights = [
  { icon: '✝️', title: 'Daily Mass', desc: 'Mon–Sat 6:15 AM at the Mother Parish, Malabago.' },
  { icon: '📿', title: 'Sacraments', desc: 'Baptism, Confession, Marriage, and more.' },
  { icon: '🙏', title: 'Prayer Groups', desc: 'Rosary, novenas, and Marian devotions.' },
  { icon: '👨‍👩‍👧', title: 'Community', desc: 'Outreach programs and parish organizations.' },
]

const logoSrc = logoImg
</script>