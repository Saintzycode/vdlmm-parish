<template>
  <footer class="bg-[#0D2340] text-[#EAF6FF] py-12 px-6">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

      <!-- LEFT: Logo & Identity -->
      <div class="flex flex-col items-start">
        <div class="w-16 h-16 rounded-full border-2 border-[#C8A84B]/40 bg-[#4A7FBF]/10 flex items-center justify-center mb-3 overflow-hidden">
          <img :src="logoSrc" alt="Virgen de la Medalla Milagrosa logo" class="w-full h-full object-cover" />
        </div>
        <h3 class="font-display text-white text-lg font-semibold">Virgen de la Medalla Milagrosa Parish</h3>
        <p class="text-xs font-bold tracking-wider uppercase text-[#7FB3E0] mt-1">Malabago, Mangaldan, Pangasinan</p>
        <p class="text-xs text-[#7FB3E0]/60 mt-1">Archdiocese of Lingayen–Dagupan</p>

        <div class="w-16 h-px bg-[#C8A84B] my-4"></div>
        <p class="font-body-serif italic text-[#B8D8F0]/60 text-sm max-w-sm">"O Mary, conceived without sin, pray for us who have recourse to thee."</p>
      </div>

      <!-- MIDDLE: Quick Links -->
      <div>
        <h4 class="font-semibold text-white mb-3">Quick Links</h4>
        <ul class="flex flex-col gap-2">
          <li v-for="link in footerLinks" :key="link.href">
            <a :href="link.href" class="text-sm font-medium uppercase tracking-wider text-[#B8D8F0]/60 hover:text-[#E4C876] transition-colors">{{ link.label }}</a>
          </li>
        </ul>

        <h4 class="font-semibold text-white mt-6 mb-3">Announcements</h4>
        <p class="text-sm text-[#B8D8F0]/60 max-w-sm">Check the announcements section for weekly updates and special liturgies.</p>
      </div>

      <!-- RIGHT: Contact & Social -->
      <div>
        <h4 class="font-semibold text-white mb-3">Contact</h4>
        <address class="not-italic text-sm text-[#B8D8F0]/60 space-y-2">
          <div>Malabago, Mangaldan, Pangasinan, Philippines</div>
          <div>Phone: <a class="text-[#E4C876] hover:underline" href="tel:+63">(local)</a></div>
          <div>Email: <a class="text-[#E4C876] hover:underline" href="mailto:info@example.com">vidmmchurch@gmail.com
</a></div>
        </address>

        <div class="mt-4">
          <h4 class="font-semibold text-white mb-2">Follow Us</h4>
          <div class="flex items-center gap-3">
            <a v-for="s in socialLinks" :key="s.label" :href="s.href" class="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" :aria-label="s.label">
              <span v-if="s.img">
                <img :src="s.img" :alt="s.label" class="w-5 h-5 object-contain" />
              </span>
              <span v-else v-html="s.icon" class="w-5 h-5 fill-current text-[#B8D8F0]/80"></span>
            </a>
          </div>
        </div>
      </div>

    </div>

    <div class="max-w-6xl mx-auto mt-8 border-t border-white/5 pt-6 text-center">
      <p class="text-xs text-white/40">© {{ currentYear }} Virgen de la Medalla Milagrosa Parish · All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import logoImg from '../assets/Official.jpg'
import facebookImg from '../assets/facebook.png'

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

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/VMMParish', img: facebookImg },
]
</script>