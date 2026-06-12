<template>
  <section id="contact" class="bg-[#E8F2FA] py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-10">
        <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-[#C8A84B] mb-2">Get in Touch</p>
        <h2 class="font-display font-semibold text-[#1E3A5F] leading-tight text-2xl sm:text-3xl md:text-4xl">Contact the <em class="italic text-[#4A7FBF]">Parish</em></h2>
        <div class="w-12 h-0.5 bg-gradient-to-r from-[#C8A84B] to-[#E4C876] mt-4 mx-auto"></div>
      </div>

      <!-- CONTACT CARDS -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

        <!-- PHONE -->
        <div class="bg-white rounded-xl p-6 text-center border-t-4 border-[#4A7FBF] hover:-translate-y-1 transition-transform duration-200">
          <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4A7FBF" class="w-10 h-10">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
            </svg>
          </div>
          <h4 class="font-display text-[#1E3A5F] text-sm font-semibold mb-2">Parish Office</h4>
          <p class="text-sm text-[#5A7A9A] leading-relaxed">(075) XXX-XXXX</p>
          <p class="text-xs text-[#5A7A9A] mt-1">Call during office hours</p>
        </div>

        <!-- EMAIL -->
        <div class="bg-white rounded-xl p-6 text-center border-t-4 border-[#EA4335] hover:-translate-y-1 transition-transform duration-200">
          <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 49.4 512 399.42">
            <g fill="none" fill-rule="evenodd">
            <g fill-rule="nonzero">
            <path fill="#4285f4" d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"/>
            <path fill="#34a853" d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"/>
            <path fill="#fbbc04" d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"/>
            </g>
            <path fill="#ea4335" d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"/>
            <path fill="#c5221f" fill-rule="nonzero" d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"/>
            </g>
          </svg>
          </div>
          <h4 class="font-display text-[#1E3A5F] text-sm font-semibold mb-2">Email</h4>
          <p class="text-sm text-[#5A7A9A] leading-relaxed">parish@vdlmm.ph</p>
          <p class="text-xs text-[#5A7A9A] mt-1">We reply promptly</p>
        </div>

        <!-- FACEBOOK -->
        <a href="https://www.facebook.com/VMMParish" target="_blank" rel="noopener noreferrer" class="bg-white rounded-xl p-6 text-center border-t-4 border-[#1877F2] hover:-translate-y-1 transition-transform duration-200">
          <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-10 h-10">
              <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          </div>
          <h4 class="font-display text-[#1E3A5F] text-sm font-semibold mb-2">Facebook</h4>
          <p class="text-sm text-[#5A7A9A] leading-relaxed">Virgen de la Medalla Milagrosa Parish</p>
          <p class="text-xs text-[#5A7A9A] mt-1">Follow for updates & live streams</p>
        </a>

      </div>

      <!-- OFFICE HOURS NOTE -->
      <div class="bg-white rounded-xl p-6 border-l-4 border-[#C8A84B]">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p class="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#C8A84B] mb-2">Parish Office Hours</p>
            <p class="text-sm text-[#5A7A9A] leading-relaxed">Sunday: 8:00 AM – 12:00 PM<br>Tuesday – Saturday: 8:00 AM – 5:00 PM</p>
          </div>
          <div>
            <p class="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#C8A84B] mb-2">Monday</p>
            <p class="text-sm text-red-600 font-bold">CLOSED</p>
          </div>
          <div>
            <p class="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[#C8A84B] mb-2">Sacramental Requests</p>
            <p class="text-sm text-[#5A7A9A] leading-relaxed">For Baptism, Marriage, and Confirmation — please visit or call the Parish Office during office hours.</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
</script>