<template>
  <section id="about" class="bg-[#0D2340] py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        <!-- LEFT -->
        <div>
          <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-[#E4C876] mb-2">
            Our Parish
          </p>
          <h2 class="font-display font-semibold text-white leading-tight mb-4
                     text-2xl sm:text-3xl md:text-4xl">
            Rooted in <em class="italic text-[#7FB3E0]">Faith</em>,<br>
            Grounded in Mary
          </h2>
          <div class="w-12 h-0.5 bg-gradient-to-r from-[#C8A84B] to-transparent mb-6"></div>

          <p class="text-white/70 leading-relaxed text-sm sm:text-base mb-4">
            Virgen de la Medalla Milagrosa Parish stands as a pillar of faith in Malabago,
            Mangaldan, Pangasinan, under the care of the Archdiocese of Lingayen–Dagupan.
            Our parish community is centered on the Eucharist and devoted to the Blessed
            Virgin Mary under the title of Our Lady of the Miraculous Medal.
          </p>
          <p class="text-white/70 leading-relaxed text-sm sm:text-base mb-8">
            Through the years, our parish has grown as a family of believers — celebrating
            the sacraments, caring for the poor, nurturing youth in faith, and proclaiming
            the Gospel in word and deed throughout Mangaldan and beyond.
          </p>

          <!-- VALUES -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="value in values"
              :key="value.title"
              class="border-l-2 border-[#C8A84B] pl-4"
            >
              <h4 class="font-display text-[#E4C876] text-sm font-semibold mb-1">
                {{ value.title }}
              </h4>
              <p class="text-white/50 text-xs leading-relaxed">
                {{ value.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="flex flex-col gap-5">

                  <!-- LOGO -->
                  <div class="w-44 h-44 md:w-52 md:h-52 mx-auto rounded-full border-2 border-[#C8A84B]/40 bg-[#4A7FBF]/10 flex items-center justify-center overflow-hidden">
                    <img :src="logoSrc" alt="parish logo" class="w-full h-full object-cover drop-shadow-2xl" />
                  </div>

          <!-- PARISH INFO -->
          <div class="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
            <div
              v-for="info in parishInfo"
              :key="info.label"
              class="flex gap-3 text-sm"
            >
              <span class="text-[#E4C876] text-base flex-shrink-0 mt-0.5">{{ info.icon }}</span>
              <div>
                <p class="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#C8A84B] mb-0.5">
                  {{ info.label }}
                </p>
                <p class="text-white/60 leading-relaxed text-sm">{{ info.value }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import logoImg from '../assets/Official.jpg'

const values = [
  { title: 'Eucharist', desc: 'The Holy Mass is the source and summit of our parish life.' },
  { title: 'Mary', desc: 'We seek her intercession and follow her example of faith.' },
  { title: 'Service', desc: 'We care for the poor and serve the needs of our community.' },
  { title: 'Family', desc: 'We journey together as one parish family in Christ.' },
]

const parishInfo = [
  { icon: '⛪', label: 'Mother Parish', value: 'Malabago, Mangaldan, Pangasinan, 2432 Philippines' },
  { icon: '✝', label: 'Diocese', value: 'Archdiocese of Lingayen–Dagupan' },
  { icon: '📿', label: 'Chapels', value: 'Anolid Chapel · Maasin Chapel' },
  { icon: '🕊', label: 'Patron', value: 'Virgen de la Medalla Milagrosa (Our Lady of the Miraculous Medal)' },
]

const logoSrc = logoImg
</script>