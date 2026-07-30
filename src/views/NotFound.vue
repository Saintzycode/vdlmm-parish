<template>
  <div class="min-h-screen bg-parish-navy flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-parish-gold-soft mb-3">Error 404</p>
      <h1 class="font-display font-semibold text-white text-4xl sm:text-5xl mb-3">
        Page Not <em class="italic text-parish-blue-soft">Found</em>
      </h1>
      <div class="w-12 h-0.5 bg-gradient-to-r from-parish-gold to-parish-gold-soft mx-auto mb-6"></div>
      <p class="text-parish-blue-pale/75 leading-relaxed mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <router-link
        to="/"
        class="inline-block px-6 py-3 bg-parish-gold text-parish-navy text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-parish-gold-soft transition-colors duration-200"
      >
        Return Home
      </router-link>
    </div>
  </div>
</template>
