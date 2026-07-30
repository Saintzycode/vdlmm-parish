<script setup>
import { ref, onMounted } from 'vue'
import { Calendar, Building, Edit } from 'reicon-vue'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'

const { isAdmin } = useAuth()
const showEditModal = ref(false)
const massRows = ref([])
const officeRows = ref([])
const fifthSundayNote = ref('One Parish Mass will be celebrated at the Mother Parish, Malabago.')
const editForm = ref({ id: '', day: '', time: '', note: '', type: '' })
const noteRowId = ref(null)

async function fetchSchedule() {
  const { data, error } = await supabase.from('mass_schedule').select('*').order('sort_order')
  if (error) { console.error(error); return }
  massRows.value = data.filter(r => r.type === 'mass')
  officeRows.value = data.filter(r => r.type === 'office')
  const noteRow = data.find(r => r.type === 'note')
  if (noteRow) {
    noteRowId.value = noteRow.id
    fifthSundayNote.value = noteRow.time || fifthSundayNote.value
  }
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
  editForm.value = { id: noteRowId.value, day: '', time: fifthSundayNote.value, note: '', type: 'note' }
  showEditModal.value = true
}

async function saveEdit() {
  if (editForm.value.type === 'note') {
    if (noteRowId.value) {
      const { error } = await supabase
        .from('mass_schedule')
        .update({ time: editForm.value.time })
        .eq('id', noteRowId.value)
      if (error) { alert('Error: ' + error.message); return }
    } else {
      const { data, error } = await supabase
        .from('mass_schedule')
        .insert({ type: 'note', time: editForm.value.time, day: '', note: '', sort_order: 9999 })
        .select()
        .single()
      if (error) { alert('Error: ' + error.message); return }
      noteRowId.value = data.id
    }
    fifthSundayNote.value = editForm.value.time
    showEditModal.value = false
    return
  }
  if (!editForm.value.day || !editForm.value.time) {
    alert('Please fill in day and time.')
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
  <section id="schedule" class="bg-parish-blue-bg py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="mb-10">
        <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-parish-gold mb-2">Holy Mass</p>
        <h2 class="font-display font-semibold text-parish-navy-soft leading-tight text-2xl sm:text-3xl md:text-4xl">Mass Schedule & <em class="italic text-parish-blue">Parish Office Hours</em></h2>
        <div class="w-12 h-0.5 bg-gradient-to-r from-parish-gold to-parish-gold-soft mt-4"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- MASS PANEL -->
        <div class="bg-white rounded-xl overflow-hidden shadow-sm">
          <div class="bg-parish-navy-soft px-6 py-4 flex items-center gap-3">
            <Calendar :size="24" weight="Outline" class="text-white" />
            <h3 class="font-display text-white text-base font-semibold tracking-wide">Mass Schedule</h3>
          </div>
          <div class="px-6 py-4 divide-y divide-parish-blue-bg">
            <div v-for="row in massRows" :key="row.id" class="py-4 flex items-start justify-between gap-2">
              <div>
                <p class="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-parish-gold mb-1">{{ row.day }}</p>
                <p class="font-display text-parish-navy-soft text-lg font-semibold">{{ row.time }}</p>
                <p class="text-xs text-parish-text italic">{{ row.note }}</p>
              </div>
              <button v-if="isAdmin" @click="openEditMass(row)" class="text-[0.65rem] font-bold px-2 py-1 rounded bg-parish-blue-bg text-parish-blue hover:bg-parish-blue hover:text-white transition-colors duration-200 flex-shrink-0 inline-flex items-center gap-1"><Edit :size="12" weight="Outline" /> Edit</button>
            </div>
          </div>
          <div class="mx-6 mb-6 bg-parish-gold-bg border-l-4 border-parish-gold rounded-r-lg px-4 py-3 flex items-start justify-between gap-2">
            <p class="text-sm text-parish-navy-soft leading-relaxed"><strong class="text-parish-blue">5th Sunday Mass:</strong> {{ fifthSundayNote }}</p>
            <button v-if="isAdmin" @click="openEditNote" class="text-[0.65rem] font-bold px-2 py-1 rounded bg-parish-blue-bg text-parish-blue hover:bg-parish-blue hover:text-white transition-colors duration-200 flex-shrink-0"><Edit :size="12" weight="Outline" /> Edit</button>
          </div>
        </div>

        <!-- OFFICE PANEL -->
        <div class="bg-white rounded-xl overflow-hidden shadow-sm">
          <div class="bg-parish-navy-soft px-6 py-4 flex items-center gap-3">
            <Building :size="24" weight="Outline" class="text-white" />
            <h3 class="font-display text-white text-base font-semibold tracking-wide">Parish Office Hours</h3>
          </div>
          <div class="px-6 py-4 divide-y divide-parish-blue-bg">
            <div v-for="row in officeRows" :key="row.id" class="py-4 flex items-center justify-between gap-2">
              <div class="flex gap-4 items-start flex-1">
                <div class="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-parish-gold min-w-[80px] pt-1">{{ row.day }}</div>
                <p class="font-display text-lg font-semibold" :class="row.time === 'CLOSED' ? 'text-red-600' : 'text-parish-navy-soft'">{{ row.time }}</p>
              </div>
              <button v-if="isAdmin" @click="openEditOffice(row)" class="text-[0.65rem] font-bold px-2 py-1 rounded bg-parish-blue-bg text-parish-blue hover:bg-parish-blue hover:text-white transition-colors duration-200 flex-shrink-0"><Edit :size="12" weight="Outline" /> Edit</button>
            </div>
          </div>
          <div class="mx-6 mb-6 bg-parish-blue-bg rounded-lg px-4 py-3">
            <p class="text-sm text-parish-text leading-relaxed">For Sacramental requests (Baptism, Marriage, Confirmation), please visit or call the Parish Office during office hours.</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- EDIT MODAL -->
  <teleport to="body">
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 bg-parish-navy/70 backdrop-blur-sm flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sched-edit-title"
      @click.self="showEditModal = false"
      @keydown.esc="showEditModal = false"
      tabindex="-1"
    >
      <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <h3 id="sched-edit-title" class="font-display text-parish-navy-soft text-xl mb-6 inline-flex items-center gap-2"><Edit :size="22" weight="Outline" /> Edit Schedule</h3>
        <div class="flex flex-col gap-4">
          <template v-if="editForm.type === 'mass'">
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">Day</label>
              <input v-model="editForm.day" type="text" class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2" />
            </div>
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">Time</label>
              <input v-model="editForm.time" type="text" placeholder="e.g. 6:30 AM" class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2" />
            </div>
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">Location / Note</label>
              <input v-model="editForm.note" type="text" placeholder="e.g. Mother Parish – Malabago" class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2" />
            </div>
          </template>
          <template v-if="editForm.type === 'office'">
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">Day</label>
              <input v-model="editForm.day" type="text" class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2" />
            </div>
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">Hours</label>
              <input v-model="editForm.time" type="text" placeholder="e.g. 8:00 AM – 5:00 PM or CLOSED" class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2" />
            </div>
          </template>
          <template v-if="editForm.type === 'note'">
            <div>
              <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">5th Sunday Note</label>
              <textarea v-model="editForm.time" rows="3" class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2 resize-none"></textarea>
            </div>
          </template>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="saveEdit" class="flex-1 py-3 bg-parish-blue text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-parish-navy-soft transition-colors duration-200">Save</button>
          <button @click="showEditModal = false" class="flex-1 py-3 bg-parish-blue-bg text-parish-blue text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-parish-blue-pale transition-colors duration-200">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>
</template>