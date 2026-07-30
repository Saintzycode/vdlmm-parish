<script setup>
import { ref, onMounted } from 'vue'
import { AddCircle, Edit, Trash } from 'reicon-vue'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'

const { isAdmin } = useAuth()

const announcements = ref([])
const loading = ref(false)
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const deletingId = ref(null)
const editingId = ref(null)

const form = ref({ title: '', content: '', tag: 'blue', date: '' })

const tagMap = {
  blue: { label: 'Parish News', bg: 'bg-parish-blue-bg', text: 'text-parish-blue', bar: 'bg-gradient-to-r from-parish-blue to-parish-blue-soft' },
  gold: { label: 'Event', bg: 'bg-parish-gold-bg', text: 'text-parish-gold', bar: 'bg-gradient-to-r from-parish-gold to-parish-gold-soft' },
  green: { label: 'Outreach', bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-gradient-to-r from-emerald-500 to-emerald-300' },
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
}

function toDateInput(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

async function fetchAnnouncements() {
  loading.value = true
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.error(error); loading.value = false; return }
  announcements.value = data
  loading.value = false
}

function openAddForm() {
  editingId.value = null
  form.value = { title: '', content: '', tag: 'blue', date: '' }
  showFormModal.value = true
}

function openEditForm(a) {
  editingId.value = a.id
  form.value = {
    title: a.title,
    content: a.content,
    tag: a.tag,
    date: toDateInput(a.date)
  }
  showFormModal.value = true
}

async function saveAnnouncement() {
  if (!form.value.title || !form.value.content) {
    alert('Please fill in the title and content.')
    return
  }
  const payload = {
    title: form.value.title,
    content: form.value.content,
    tag: form.value.tag,
    date: form.value.date || null
  }
  if (editingId.value) {
    const { error } = await supabase
      .from('announcements')
      .update(payload)
      .eq('id', editingId.value)
    if (error) { alert('Update error: ' + error.message); return }
  } else {
    const { error } = await supabase
      .from('announcements')
      .insert(payload)
    if (error) { alert('Insert error: ' + error.message); return }
  }
  showFormModal.value = false
  await fetchAnnouncements()
}

function confirmDelete(id) {
  deletingId.value = id
  showDeleteModal.value = true
}

async function deleteAnnouncement() {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', deletingId.value)
  if (error) { alert('Delete error: ' + error.message); return }
  showDeleteModal.value = false
  await fetchAnnouncements()
}

onMounted(fetchAnnouncements)
</script>

<template>
  <section id="announcements" class="bg-white py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- HEADER ROW -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-parish-gold mb-2">Parish Updates</p>
          <h2 class="font-display font-semibold text-parish-navy-soft leading-tight text-2xl sm:text-3xl md:text-4xl">Announcements & <em class="italic text-parish-blue">Parish News</em></h2>
          <div class="w-12 h-0.5 bg-gradient-to-r from-parish-gold to-parish-gold-soft mt-4"></div>
        </div>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="text-center py-16 text-parish-text text-sm">Loading announcements...</div>

      <!-- EMPTY -->
      <div v-else-if="announcements.length === 0" class="text-center py-16 text-parish-text italic text-sm">No announcements at this time. Check back soon.</div>

      <!-- GRID -->
      <div v-else class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div v-for="a in announcements" :key="a.id" class="bg-white border border-parish-blue-bg rounded-[32px] shadow-xl hover:-translate-y-1 transition-transform duration-200 overflow-hidden">
          <div class="relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-2" :class="tagMap[a.tag]?.bar || tagMap.blue.bar"></div>
            <div class="p-8 pt-10">
              <div class="flex items-start justify-between gap-3">
                <span class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.14em]" :class="[tagMap[a.tag]?.bg || tagMap.blue.bg, tagMap[a.tag]?.text || tagMap.blue.text]">
                  <span class="h-2.5 w-2.5 rounded-full" :class="tagMap[a.tag]?.bar || tagMap.blue.bar"></span>
                  {{ tagMap[a.tag]?.label || 'Parish News' }}
                </span>
                <span class="text-[0.74rem] text-parish-text">{{ formatDate(a.date) }}</span>
              </div>
              <h3 class="font-display text-parish-navy-soft text-3xl font-semibold mt-4 mb-4 leading-tight">{{ a.title }}</h3>
              <p class="text-base text-slate-600 leading-7 max-h-[14rem] overflow-hidden">{{ a.content }}</p>
            </div>
          </div>
          <div class="border-t border-parish-blue-bg px-6 py-4">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span class="text-xs uppercase tracking-[0.22em] text-slate-400">Announcement</span>
              <div class="flex flex-wrap gap-2">
                <button v-if="isAdmin" @click="openEditForm(a)" class="text-xs font-semibold px-3 py-2 rounded-full bg-parish-blue-bg text-parish-blue hover:bg-parish-blue hover:text-white transition-colors duration-200 inline-flex items-center gap-1"><Edit :size="14" weight="Outline" /> Edit</button>
                <button v-if="isAdmin" @click="confirmDelete(a.id)" class="text-xs font-semibold px-3 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200 inline-flex items-center gap-1"><Trash :size="14" weight="Outline" /> Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ADD BUTTON -->
      <div v-if="isAdmin" class="mt-8 text-center">
        <button @click="openAddForm" class="px-6 py-3 bg-parish-gold text-parish-navy text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-parish-gold-soft transition-colors duration-200 inline-flex items-center gap-1.5"><AddCircle :size="18" weight="Outline" /> Add Announcement</button>
      </div>

    </div>
  </section>

  <!-- ADD/EDIT MODAL -->
  <teleport to="body">
    <div
      v-if="showFormModal"
      class="fixed inset-0 z-50 bg-parish-navy/70 backdrop-blur-sm flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ann-form-title"
      @click.self="showFormModal = false"
      @keydown.esc="showFormModal = false"
      ref="formModalEl"
      tabindex="-1"
    >
      <div class="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl">
        <h3 id="ann-form-title" class="font-display text-parish-navy-soft text-xl mb-6 inline-flex items-center gap-2">
          <template v-if="editingId"><Edit :size="22" weight="Outline" /> Edit Announcement</template>
          <template v-else><AddCircle :size="22" weight="Outline" /> New Announcement</template>
        </h3>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">Title</label>
            <input v-model="form.title" type="text" placeholder="Announcement title" class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2" />
          </div>
          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">Category</label>
            <select v-model="form.tag" class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2">
              <option value="blue">Parish News</option>
              <option value="gold">Event</option>
              <option value="green">Outreach</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">Date</label>
            <input v-model="form.date" type="date" class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2" />
          </div>
          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-parish-text mb-2">Content</label>
            <textarea v-model="form.content" rows="4" placeholder="Write the announcement here..." class="w-full px-4 py-3 border border-parish-blue-pale rounded-lg text-sm outline-none focus:border-parish-blue bg-parish-blue-bg-2 resize-none"></textarea>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="saveAnnouncement" class="flex-1 py-3 bg-parish-blue text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-parish-navy-soft transition-colors duration-200">Save</button>
          <button @click="showFormModal = false" class="flex-1 py-3 bg-parish-blue-bg text-parish-blue text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-parish-blue-pale transition-colors duration-200">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>

  <!-- DELETE MODAL -->
  <teleport to="body">
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 bg-parish-navy/70 backdrop-blur-sm flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ann-del-title"
      @click.self="showDeleteModal = false"
      @keydown.esc="showDeleteModal = false"
      tabindex="-1"
    >
      <div class="bg-white rounded-xl p-8 w-full max-w-sm shadow-2xl">
        <h3 id="ann-del-title" class="font-display text-parish-navy-soft text-xl mb-3 inline-flex items-center gap-2"><Trash :size="22" weight="Outline" /> Delete Announcement</h3>
        <p class="text-sm text-parish-text leading-relaxed mb-6">Are you sure you want to delete this announcement? This cannot be undone.</p>
        <div class="flex gap-3">
          <button @click="deleteAnnouncement" class="flex-1 py-3 bg-red-600 text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-red-700 transition-colors duration-200">Yes, Delete</button>
          <button @click="showDeleteModal = false" class="flex-1 py-3 bg-parish-blue-bg text-parish-blue text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-parish-blue-pale transition-colors duration-200">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>
</template>