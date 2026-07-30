<template>
  <section id="parish-council" class="relative overflow-hidden bg-parish-blue-bg-3 py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-parish-blue/10 blur-3xl"></div>
      <div class="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-parish-gold/10 blur-3xl"></div>
      <div class="absolute left-0 top-1/3 h-56 w-56 rounded-full bg-parish-blue-pale/20 blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">

      <!-- HEADER -->
      <div class="text-center mb-10 sm:mb-14 md:mb-16">
        <p class="text-[0.62rem] sm:text-[0.68rem] font-bold tracking-[0.4em] sm:tracking-[0.5em] uppercase text-parish-gold mb-2 sm:mb-3">Leadership</p>
        <h2 class="font-display font-semibold text-parish-navy-soft leading-tight text-2xl sm:text-4xl md:text-5xl">
          Parish Youth <em class="italic text-parish-blue">Council</em>
        </h2>
        <p class="mx-auto mt-3 sm:mt-4 max-w-2xl text-[0.82rem] sm:text-base text-parish-text leading-relaxed">
          Faithful, service-driven, and united in mission. Tap or hover each card to see the parish youth council come forward with a refined lift effect.
        </p>
        <button v-if="isAdmin" @click="openEditCouncil" class="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-[0.65rem] font-bold tracking-widest uppercase rounded bg-parish-blue-bg text-parish-blue hover:bg-parish-blue hover:text-white transition-colors duration-200"><Edit :size="14" weight="Outline" /> Edit Council</button>
        <div class="w-12 sm:w-14 h-0.5 bg-gradient-to-r from-parish-gold to-parish-gold-soft mt-4 sm:mt-5 mx-auto"></div>
      </div>

      <!-- YOUTH DIRECTOR — FEATURED -->
      <div class="mb-8 sm:mb-12 flex flex-col items-center">
        <div class="group w-full max-w-52 sm:max-w-64 md:max-w-72 overflow-hidden rounded-[1.5rem] border border-[#D9E6F2] bg-white/95 shadow-[0_14px_35px_rgba(30,58,95,0.06)] transition-all duration-300 hover:-translate-y-2 active:scale-[1.03] hover:scale-[1.06] hover:border-parish-gold/55 hover:shadow-[0_24px_50px_rgba(30,58,95,0.12)]">
          <div class="relative flex h-48 sm:h-72 md:h-80 items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7FAFD] via-parish-blue-bg to-[#DDEAF6] transition-transform duration-300 group-hover:scale-105">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(74,127,191,0.12),_transparent_60%)]"></div>
            <div class="absolute top-3 sm:top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-parish-gold/30 to-transparent"></div>
            <img
              v-if="featuredPhoto"
              :src="featuredPhoto"
              alt="Youth Director"
              class="relative h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div v-else class="relative flex h-12 w-12 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem] items-center justify-center rounded-full border border-white bg-white/90 shadow-[0_10px_24px_rgba(30,58,95,0.12)] transition-transform duration-300 group-hover:scale-110">
              <User :size="40" weight="Outline" class="text-parish-blue" />
            </div>
          </div>
          <div class="px-4 sm:px-6 py-3 sm:py-5 md:py-6 text-center">
            <p class="text-[0.53rem] sm:text-[0.62rem] font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-parish-gold mb-1 sm:mb-2 leading-tight">Youth Director</p>
            <p class="font-display text-parish-navy-soft text-[0.72rem] sm:text-sm font-semibold leading-snug text-pretty">
              Rev. Fr. Jeremias Cera
            </p>
          </div>
        </div>
      </div>

      <!-- COUNCIL GRID -->
      <div class="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-8">
        <div v-for="member in council" :key="member.name" class="flex flex-col items-center text-center">
          <div class="group w-full overflow-hidden rounded-[1.5rem] border border-[#D9E6F2] bg-white/95 shadow-[0_14px_35px_rgba(30,58,95,0.06)] transition-all duration-300 hover:-translate-y-2 active:scale-[1.03] hover:scale-[1.06] hover:border-parish-gold/55 hover:shadow-[0_24px_50px_rgba(30,58,95,0.12)]">
            <div class="relative flex h-48 sm:h-72 lg:h-80 xl:h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-[#F7FAFD] via-parish-blue-bg to-[#DDEAF6] transition-transform duration-300 group-hover:scale-105">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(74,127,191,0.12),_transparent_60%)]"></div>
              <div class="absolute top-3 sm:top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-parish-gold/30 to-transparent"></div>
              <img
                v-if="member.photo"
                :src="member.photo"
                :alt="member.name"
                @error="member.photo = ''"
                class="relative h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div v-else class="relative flex h-12 w-12 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem] items-center justify-center rounded-full border border-white bg-white/90 shadow-[0_10px_24px_rgba(30,58,95,0.12)] transition-transform duration-300 group-hover:scale-110">
                <User :size="40" weight="Outline" class="text-parish-blue" />
              </div>
            </div>
            <div class="px-4 sm:px-6 py-3 sm:py-5 md:py-6">
              <p class="text-[0.53rem] sm:text-[0.62rem] font-bold tracking-[0.16em] sm:tracking-[0.18em] uppercase text-parish-gold mb-1 sm:mb-2 leading-tight">
                {{ member.title }}
              </p>
              <p class="font-display text-parish-navy-soft text-[0.72rem] sm:text-sm font-semibold leading-snug text-pretty">
                {{ member.name }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- EDIT COUNCIL MODAL -->
  <teleport to="body">
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 bg-parish-navy/70 backdrop-blur-sm flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="council-edit-title"
      @click.self="showEditModal = false"
      @keydown.esc="showEditModal = false"
      tabindex="-1"
    >
      <div class="bg-white rounded-xl p-8 w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col">
        <h3 id="council-edit-title" class="font-display text-parish-navy-soft text-xl mb-4 inline-flex items-center gap-2"><Edit :size="22" weight="Outline" /> Edit Council Members</h3>
        <p class="text-xs text-parish-text mb-4">Edit the JSON array below. Each member needs <code>title</code>, <code>name</code>, and <code>photo</code> fields.</p>
        <textarea
          v-model="editJson"
          rows="18"
          class="w-full flex-1 px-4 py-3 border border-parish-blue-pale rounded-lg text-xs font-mono outline-none focus:border-parish-blue bg-parish-blue-bg-2 resize-none"
        ></textarea>
        <div class="flex gap-3 mt-4">
          <button @click="saveCouncil" class="flex-1 py-3 bg-parish-blue text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-parish-navy-soft transition-colors duration-200">Save</button>
          <button @click="showEditModal = false" class="flex-1 py-3 bg-parish-blue-bg text-parish-blue text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-parish-blue-pale transition-colors duration-200">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Edit, User } from 'reicon-vue'
import { useAuth } from '../lib/auth'
import { getSetting, setSetting } from '../lib/settings'

const { isAdmin } = useAuth()

const featuredPhoto = ref('')
const council = ref([])
const showEditModal = ref(false)
const editJson = ref('')

const defaultCouncil = [
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

async function fetchCouncil() {
  const stored = await getSetting('council_members')
  if (stored) {
    try {
      council.value = JSON.parse(stored)
    } catch {
      council.value = [...defaultCouncil]
    }
  } else {
    council.value = [...defaultCouncil]
  }
}

function openEditCouncil() {
  editJson.value = JSON.stringify(council.value, null, 2)
  showEditModal.value = true
}

async function saveCouncil() {
  try {
    const parsed = JSON.parse(editJson.value)
    if (!Array.isArray(parsed)) throw new Error('Must be an array')
    const ok = await setSetting('council_members', editJson.value)
    if (!ok) { alert('Failed to save'); return }
    council.value = parsed
    showEditModal.value = false
  } catch (e) {
    alert('Invalid JSON: ' + e.message)
  }
}

onMounted(fetchCouncil)
</script>