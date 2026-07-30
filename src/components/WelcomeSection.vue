<template>
  <section id="welcome" class="bg-white py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

        <!-- LEFT -->
        <div>
          <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-parish-gold mb-2">
            Welcome to Our Parish
          </p>
          <h2 class="font-display font-semibold text-parish-navy-soft leading-tight mb-4
                     text-2xl sm:text-3xl md:text-4xl">
            A Home for Every<br>
            <em class="italic text-parish-blue">Faithful Soul</em>
          </h2>
          <div class="w-12 h-0.5 bg-gradient-to-r from-parish-gold to-parish-gold-soft mb-6"></div>

          <!-- VERSE -->
          <blockquote class="border-l-4 border-parish-gold pl-5 mb-6">
            <p class="font-body-serif italic text-parish-blue text-lg sm:text-xl md:text-2xl leading-relaxed">
              "I am the way, the truth, and the life.<br>
              No one comes to the Father except through me."
            </p>
            <cite class="block mt-3 text-[0.72rem] font-bold tracking-[0.2em] uppercase text-parish-gold not-italic">
              John 14:6
            </cite>
          </blockquote>

          <p class="text-parish-text leading-relaxed text-sm sm:text-base mb-4">
            Virgen de la Medalla Milagrosa Parish warmly welcomes all to our community of faith.
            Guided by the intercession of Our Lady of the Miraculous Medal, we are a parish
            family united in prayer, service, and the celebration of the Sacraments.
          </p>
          <p class="text-parish-text leading-relaxed text-sm sm:text-base">
            Whether you are a lifelong Catholic, returning to the faith, or simply seeking —
            you will always find an open door, an open heart, and a seat at the Lord's table.
          </p>
        </div>

        <!-- RIGHT -->
        <div class="bg-gradient-to-br from-parish-blue-bg to-sky-100 rounded-xl p-6 sm:p-8 md:p-10">

          <!-- LOGO -->
          <div class="w-24 h-24 md:w-28 md:h-28 mx-auto mb-5 rounded-full border-2 border-parish-gold/40 bg-parish-blue/10 flex items-center justify-center overflow-hidden">
            <img :src="logoSrc" alt="parish logo" class="w-full h-full object-cover" />
          </div>

          <h3 class="font-display text-center text-parish-navy-soft text-lg md:text-xl mb-6">
            What You'll Find Here
          </h3>

          <!-- CARDS -->
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="item in highlights"
              :key="item.title"
              class="bg-white rounded-lg p-3 sm:p-4 border-t-2 border-parish-gold"
            >
              <div class="text-parish-blue mb-2">
                <component :is="item.icon" :size="28" weight="Outline" />
              </div>
              <h4 class="text-xs font-bold text-parish-navy-soft mb-1 tracking-wide">{{ item.title }}</h4>
              <p class="text-[0.74rem] text-parish-text leading-snug">{{ item.desc }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Calendar, Heart, Star, Users } from 'reicon-vue'
import logoImg from '../assets/Official.jpg'

const highlights = [
  { icon: Calendar, title: 'Daily Mass', desc: 'Mon–Sat 6:15 AM at the Mother Parish, Malabago.' },
  { icon: Heart, title: 'Sacraments', desc: 'Baptism, Confession, Marriage, and more.' },
  { icon: Star, title: 'Prayer Groups', desc: 'Rosary, novenas, and Marian devotions.' },
  { icon: Users, title: 'Community', desc: 'Outreach programs and parish organizations.' },
]

const logoSrc = logoImg

</script>