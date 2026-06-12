<script setup>
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

const isAdmin = computed(() => localStorage.getItem('parish_admin') === 'true')
const showEditModal = ref(false)
const editingSchedule = ref(null)

const massSchedule = ref([
  {
    id: 1,
    day: 'Sunday',
    times: [
      { time: '6:30 AM', note: 'Mother Parish – Malabago' },
      { time: '7:00 AM', note: 'Anolid Chapel' },
      { time: '8:00 AM', note: 'Maasin Chapel' },
    ]
  },
  {
    id: 2,
    day: 'Monday – Saturday',
    times: [
      { time: '6:15 AM', note: 'Mother Parish – Malabago' },
    ]
  },
])

const officeHours = ref([
  { id: 1, day: 'Sunday', time: '8:00 AM – 12:00 PM', closed: false },
  { id: 2, day: 'Monday', time: 'CLOSED', closed: true },
  { id: 3, day: 'Tuesday – Saturday', time: '8:00 AM – 5:00 PM', closed: false },
])

const fifthSundayNote = ref('One Parish Mass will be celebrated at the Mother Parish, Malabago.')

// EDIT FORM
const editForm = ref({
  type: '',
  dayIndex: null,
  timeIndex: null,
  day: '',
  time: '',
  note: '',
  closed: false,
})

function openEditMass(dayIndex, timeIndex) {
  const schedule = massSchedule.value[dayIndex]
  const timeEntry = schedule.times[timeIndex]
  editForm.value = {
    type: 'mass',
    dayIndex,
    timeIndex,
    day: schedule.day,
    time: timeEntry.time,
    note: timeEntry.note,
    closed: false,
  }
  showEditModal.value = true
}

function openEditOffice(index) {
  const entry = officeHours.value[index]
  editForm.value = {
    type: 'office',
    dayIndex: index,
    timeIndex: null,
    day: entry.day,
    time: entry.time,
    note: '',
    closed: entry.closed,
  }
  showEditModal.value = true
}

function openEditNote() {
  editForm.value = {
    type: 'note',
    dayIndex: null,
    timeIndex: null,
    day: '',
    time: fifthSundayNote.value,
    note: '',
    closed: false,
  }
  showEditModal.value = true
}

function saveEdit() {
  if (editForm.value.type === 'mass') {
    massSchedule.value[editForm.value.dayIndex].times[editForm.value.timeIndex].time = editForm.value.time
    massSchedule.value[editForm.value.dayIndex].times[editForm.value.timeIndex].note = editForm.value.note
  } else if (editForm.value.type === 'office') {
    officeHours.value[editForm.value.dayIndex].time = editForm.value.time
    officeHours.value[editForm.value.dayIndex].closed = editForm.value.closed
  } else if (editForm.value.type === 'note') {
    fifthSundayNote.value = editForm.value.time
  }
  showEditModal.value = false
}
</script>

<template>
  <section id="schedule" class="bg-[#E8F2FA] py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- HEADER -->
      <div class="mb-10">
        <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-[#C8A84B] mb-2">Holy Mass</p>
        <h2 class="font-display font-semibold text-[#1E3A5F] leading-tight text-2xl sm:text-3xl md:text-4xl">Mass Schedule & <em class="italic text-[#4A7FBF]">Parish Office Hours</em></h2>
        <div class="w-12 h-0.5 bg-gradient-to-r from-[#C8A84B] to-[#E4C876] mt-4"></div>
      </div>

      <!-- TWO PANELS -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- MASS SCHEDULE PANEL -->
        <div class="bg-white rounded-xl overflow-hidden shadow-sm">
          <div class="bg-[#1E3A5F] px-6 py-4 flex items-center gap-3">
            <span class="text-2xl">⛪</span>
            <h3 class="font-display text-white text-base font-semibold tracking-wide">Mass Schedule</h3>
          </div>
          <div class="px-6 py-4 divide-y divide-[#E8F2FA]">
            <div v-for="(schedule, dayIndex) in massSchedule" :key="schedule.id" class="py-4 flex gap-4">
              <div class="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#C8A84B] min-w-[80px] pt-1">{{ schedule.day }}</div>
              <div class="flex flex-col gap-2 flex-1">
                <div v-for="(entry, timeIndex) in schedule.times" :key="timeIndex" class="flex items-start justify-between gap-2">
                  <div>
                    <p class="font-display text-[#1E3A5F] text-lg font-semibold">{{ entry.time }}</p>
                    <p class="text-xs text-[#5A7A9A] italic">{{ entry.note }}</p>
                  </div>
                  <button v-if="isAdmin" @click="openEditMass(dayIndex, timeIndex)" class="text-[0.65rem] font-bold px-2 py-1 rounded bg-[#E8F2FA] text-[#2E5F9A] hover:bg-[#4A7FBF] hover:text-white transition-colors duration-200 flex-shrink-0">✏ Edit</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 5TH SUNDAY NOTE -->
          <div class="mx-6 mb-6 bg-[#FBF5E0] border-l-4 border-[#C8A84B] rounded-r-lg px-4 py-3 flex items-start justify-between gap-2">
            <p class="text-sm text-[#1E3A5F] leading-relaxed"><strong class="text-[#4A7FBF]">5th Sunday Mass:</strong> {{ fifthSundayNote }}</p>
            <button v-if="isAdmin" @click="openEditNote" class="text-[0.65rem] font-bold px-2 py-1 rounded bg-[#E8F2FA] text-[#2E5F9A] hover:bg-[#4A7FBF] hover:text-white transition-colors duration-200 flex-shrink-0">✏ Edit</button>
          </div>
        </div>

        <!-- PARISH OFFICE PANEL -->
        <div class="bg-white rounded-xl overflow-hidden shadow-sm">
          <div class="bg-[#1E3A5F] px-6 py-4 flex items-center gap-3">
            <span class="text-2xl">🏛️</span>
            <h3 class="font-display text-white text-base font-semibold tracking-wide">Parish Office Hours</h3>
          </div>
          <div class="px-6 py-4 divide-y divide-[#E8F2FA]">
            <div v-for="(entry, index) in officeHours" :key="entry.id" class="py-4 flex gap-4 items-center justify-between">
              <div class="flex gap-4 items-start flex-1">
                <div class="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#C8A84B] min-w-[80px] pt-1">{{ entry.day }}</div>
                <p class="font-display text-lg font-semibold" :class="entry.closed ? 'text-red-600' : 'text-[#1E3A5F]'">{{ entry.time }}</p>
              </div>
              <button v-if="isAdmin" @click="openEditOffice(index)" class="text-[0.65rem] font-bold px-2 py-1 rounded bg-[#E8F2FA] text-[#2E5F9A] hover:bg-[#4A7FBF] hover:text-white transition-colors duration-200 flex-shrink-0">✏ Edit</button>
            </div>
          </div>

          <!-- OFFICE NOTE -->
          <div class="mx-6 mb-6 bg-[#E8F2FA] rounded-lg px-4 py-3">
            <p class="text-sm text-[#5A7A9A] leading-relaxed">For Sacramental requests (Baptism, Marriage, Confirmation), please visit or call the Parish Office during office hours.</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- EDIT MODAL -->
  <teleport to="body">
    <div v-if="showEditModal" class="fixed inset-0 z-50 bg-[#0D2340]/70 backdrop-blur-sm flex items-center justify-center px-4" @click.self="showEditModal = false">
      <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <h3 class="font-display text-[#1E3A5F] text-xl mb-6">✏ Edit Schedule</h3>
        <div class="flex flex-col gap-4">

          <!-- MASS TIME EDIT -->
          <template v-if="editForm.type === 'mass'">
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Time</label>
              <input v-model="editForm.time" type="text" placeholder="e.g. 6:30 AM" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]" />
            </div>
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Location / Note</label>
              <input v-model="editForm.note" type="text" placeholder="e.g. Mother Parish – Malabago" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]" />
            </div>
          </template>

          <!-- OFFICE HOURS EDIT -->
          <template v-if="editForm.type === 'office'">
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Hours</label>
              <input v-model="editForm.time" type="text" placeholder="e.g. 8:00 AM – 5:00 PM or CLOSED" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]" />
            </div>
            <div class="flex items-center gap-3">
              <input v-model="editForm.closed" type="checkbox" id="closedCheck" class="w-4 h-4 accent-[#4A7FBF]" />
              <label for="closedCheck" class="text-sm text-[#5A7A9A] font-semibold">Mark as Closed</label>
            </div>
          </template>

          <!-- NOTE EDIT -->
          <template v-if="editForm.type === 'note'">
            <div>
              <label class="block text-xs font-bold tracking-widets uppercase text-[#5A7A9A] mb-2">5th Sunday Note</label>
              <textarea v-model="editForm.time" rows="3" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF] resize-none"></textarea>
            </div>
          </template>

        </div>
        <div class="flex gap-3 mt-6">
          <button @click="saveEdit" class="flex-1 py-3 bg-[#4A7FBF] text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-[#2E5F9A] transition-colors duration-200">Save</button>
          <button @click="showEditModal = false" class="flex-1 py-3 bg-[#E8F2FA] text-[#4A7FBF] text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-[#B8D8F0] transition-colors duration-200">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>
</template>