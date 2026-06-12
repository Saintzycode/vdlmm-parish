<script setup>
import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import WelcomeSection from '../components/WelcomeSection.vue'
import MassSchedule from '../components/MassSchedule.vue'
import Announcements from '../components/Announcements.vue'
import AboutSection from '../components/AboutSection.vue'
import ParishCouncil from '../components/ParishCouncil.vue'
import LocationSection from '../components/LocationSection.vue'
import ContactSection from '../components/ContactSection.vue'
import FooterSection from '../components/FooterSection.vue'
</script>

<template>
  <div class="bg-[#FAFBFF]">
    <NavBar />
    <HeroSection />
    <WelcomeSection />
    <AboutSection />
    <ParishCouncil />
    <Announcements />
    <MassSchedule />
    <LocationSection />
    <ContactSection />
    <FooterSection />
  </div>
</template>