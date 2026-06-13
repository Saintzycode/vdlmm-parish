<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const isAdmin = computed(() => localStorage.getItem('parish_admin') === 'true')
const showEditModal = ref(false)
const massRows = ref([])
const officeRows = ref([])
const fifthSundayNote = ref('One Parish Mass will be celebrated at the Mother Parish, Malabago.')
const editForm = ref({ id: '', day: '', time: '', note: '', type: '' })

async function fetchSchedule() {
  const { data, error } = await supabase.from('mass_schedule').select('*').order('sort_order')
  if (error) { console.error(error); return }
  massRows.value = data.filter(r => r.type === 'mass')
  officeRows.value = data.filter(r => r.type === 'office')
}

function openEditMass(row) {
  editForm.value = { id: row.id, day: row.day, time: row.time, note: row.note, type: 'mass' }
  showEditModal.value = true
}

function openEditOffice(row) {
  editForm.value = { id: row.id, day: row.day, time: row.time, note: '', type: 'office' }
  showEditModal.value = true
}

function openEditNote() {
  editForm.value = { id: 'note', day: '', time: fifthSundayNote.value, note: '', type: 'note' }
  showEditModal.value = true
}

async function saveEdit() {
  if (editForm.value.type === 'note') {
    fifthSundayNote.value = editForm.value.time
    showEditModal.value = false
    return
  }
  const { error } = await supabase
    .from('mass_schedule')
    .update({ day: editForm.value.day, time: editForm.value.time, note: editForm.value.note })
    .eq('id', editForm.value.id)
  if (error) { alert('Error: ' + error.message); return }
  showEditModal.value = false
  await fetchSchedule()
}

onMounted(fetchSchedule)
</script>

<template>
  <section id="schedule" class="bg-[#E8F2FA] py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="mb-10">
        <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-[#C8A84B] mb-2">Holy Mass</p>
        <h2 class="font-display font-semibold text-[#1E3A5F] leading-tight text-2xl sm:text-3xl md:text-4xl">Mass Schedule & <em class="italic text-[#4A7FBF]">Parish Office Hours</em></h2>
        <div class="w-12 h-0.5 bg-gradient-to-r from-[#C8A84B] to-[#E4C876] mt-4"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- MASS PANEL -->
        <div class="bg-white rounded-xl overflow-hidden shadow-sm">
          <div class="bg-[#1E3A5F] px-6 py-4 flex items-center gap-3">
            <span class="text-2xl">⛪</span>
            <h3 class="font-display text-white text-base font-semibold tracking-wide">Mass Schedule</h3>
          </div>
          <div class="px-6 py-4 divide-y divide-[#E8F2FA]">
            <div v-for="row in massRows" :key="row.id" class="py-4 flex items-start justify-between gap-2">
              <div>
                <p class="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#C8A84B] mb-1">{{ row.day }}</p>
                <p class="font-display text-[#1E3A5F] text-lg font-semibold">{{ row.time }}</p>
                <p class="text-xs text-[#5A7A9A] italic">{{ row.note }}</p>
              </div>
              <button v-if="isAdmin" @click="openEditMass(row)" class="text-[0.65rem] font-bold px-2 py-1 rounded bg-[#E8F2FA] text-[#2E5F9A] hover:bg-[#4A7FBF] hover:text-white transition-colors duration-200 flex-shrink-0">✏ Edit</button>
            </div>
          </div>
          <div class="mx-6 mb-6 bg-[#FBF5E0] border-l-4 border-[#C8A84B] rounded-r-lg px-4 py-3 flex items-start justify-between gap-2">
            <p class="text-sm text-[#1E3A5F] leading-relaxed"><strong class="text-[#4A7FBF]">5th Sunday Mass:</strong> {{ fifthSundayNote }}</p>
            <button v-if="isAdmin" @click="openEditNote" class="text-[0.65rem] font-bold px-2 py-1 rounded bg-[#E8F2FA] text-[#2E5F9A] hover:bg-[#4A7FBF] hover:text-white transition-colors duration-200 flex-shrink-0">✏ Edit</button>
          </div>
        </div>

        <!-- OFFICE PANEL -->
        <div class="bg-white rounded-xl overflow-hidden shadow-sm">
          <div class="bg-[#1E3A5F] px-6 py-4 flex items-center gap-3">
            <span class="text-2xl">🏛️</span>
            <h3 class="font-display text-white text-base font-semibold tracking-wide">Parish Office Hours</h3>
          </div>
          <div class="px-6 py-4 divide-y divide-[#E8F2FA]">
            <div v-for="row in officeRows" :key="row.id" class="py-4 flex items-center justify-between gap-2">
              <div class="flex gap-4 items-start flex-1">
                <div class="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#C8A84B] min-w-[80px] pt-1">{{ row.day }}</div>
                <p class="font-display text-lg font-semibold" :class="row.time === 'CLOSED' ? 'text-red-600' : 'text-[#1E3A5F]'">{{ row.time }}</p>
              </div>
              <button v-if="isAdmin" @click="openEditOffice(row)" class="text-[0.65rem] font-bold px-2 py-1 rounded bg-[#E8F2FA] text-[#2E5F9A] hover:bg-[#4A7FBF] hover:text-white transition-colors duration-200 flex-shrink-0">✏ Edit</button>
            </div>
          </div>
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
          <template v-if="editForm.type === 'mass'">
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Day</label>
              <input v-model="editForm.day" type="text" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]" />
            </div>
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Time</label>
              <input v-model="editForm.time" type="text" placeholder="e.g. 6:30 AM" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]" />
            </div>
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Location / Note</label>
              <input v-model="editForm.note" type="text" placeholder="e.g. Mother Parish – Malabago" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]" />
            </div>
          </template>
          <template v-if="editForm.type === 'office'">
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Day</label>
              <input v-model="editForm.day" type="text" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]" />
            </div>
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Hours</label>
              <input v-model="editForm.time" type="text" placeholder="e.g. 8:00 AM – 5:00 PM or CLOSED" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]" />
            </div>
          </template>
          <template v-if="editForm.type === 'note'">
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">5th Sunday Note</label>
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