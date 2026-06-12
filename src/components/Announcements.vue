<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from '../lib/supabase'

const announcements = ref([])
const loading = ref(false)
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const deletingId = ref(null)
const editingId = ref(null)

const isAdmin = computed(() => localStorage.getItem('parish_admin') === 'true')

const form = ref({ title: '', content: '', tag: 'blue', date: '' })

const tagMap = {
  blue: { label: 'Parish News', bg: 'bg-[#E8F2FA]', text: 'text-[#2E5F9A]', bar: 'bg-gradient-to-r from-[#4A7FBF] to-[#7FB3E0]' },
  gold: { label: 'Event', bg: 'bg-[#FBF5E0]', text: 'text-[#8A6B10]', bar: 'bg-gradient-to-r from-[#C8A84B] to-[#E4C876]' },
  green: { label: 'Outreach', bg: 'bg-[#E8F5F2]', text: 'text-[#2A7A6A]', bar: 'bg-gradient-to-r from-[#3A9B8A] to-[#5DC4AF]' },
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })
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
  form.value = { title: a.title, content: a.content, tag: a.tag, date: a.date }
  showFormModal.value = true
}

async function saveAnnouncement() {
  if (!form.value.title || !form.value.content) {
    alert('Please fill in the title and content.')
    return
  }
  if (editingId.value) {
    const { error } = await supabase
      .from('announcements')
      .update({
        title: form.value.title,
        content: form.value.content,
        tag: form.value.tag,
        date: formatDate(form.value.date)
      })
      .eq('id', editingId.value)
    if (error) { alert('Update error: ' + error.message); return }
  } else {
    const { error } = await supabase
      .from('announcements')
      .insert({
        title: form.value.title,
        content: form.value.content,
        tag: form.value.tag,
        date: formatDate(form.value.date)
      })
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

function logout() {
  localStorage.removeItem('parish_admin')
  window.location.reload()
}

onMounted(fetchAnnouncements)
</script>

<template>
  <section id="announcements" class="bg-white py-16 md:py-24 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- HEADER ROW -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <p class="text-[0.68rem] font-bold tracking-[0.4em] uppercase text-[#C8A84B] mb-2">Parish Updates</p>
          <h2 class="font-display font-semibold text-[#1E3A5F] leading-tight text-2xl sm:text-3xl md:text-4xl">Announcements & <em class="italic text-[#4A7FBF]">Parish News</em></h2>
          <div class="w-12 h-0.5 bg-gradient-to-r from-[#C8A84B] to-[#E4C876] mt-4"></div>
        </div>
        <button v-if="isAdmin" @click="logout" class="flex items-center gap-2 px-4 py-2 border border-green-500 text-green-600 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-green-50 transition-colors duration-200">🔓 Admin ON — Logout</button>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="text-center py-16 text-[#5A7A9A] text-sm">Loading announcements...</div>

      <!-- EMPTY -->
      <div v-else-if="announcements.length === 0" class="text-center py-16 text-[#5A7A9A] italic text-sm">No announcements at this time. Check back soon.</div>

      <!-- GRID -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="a in announcements" :key="a.id" class="bg-[#FAFBFF] border border-[#E8F2FA] rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-200">
          <div class="h-1.5 w-full" :class="tagMap[a.tag]?.bar || tagMap.blue.bar"></div>
          <div class="p-5">
            <div class="flex items-center gap-2 mb-3 flex-wrap">
              <span class="text-[0.62rem] font-bold tracking-[0.15em] uppercase px-2 py-1 rounded" :class="[tagMap[a.tag]?.bg || tagMap.blue.bg, tagMap[a.tag]?.text || tagMap.blue.text]">{{ tagMap[a.tag]?.label || 'Parish News' }}</span>
              <span class="text-[0.72rem] text-[#5A7A9A] ml-auto">{{ a.date }}</span>
            </div>
            <h3 class="font-display text-[#1E3A5F] text-base font-semibold mb-2 leading-snug">{{ a.title }}</h3>
            <p class="text-sm text-[#5A7A9A] leading-relaxed">{{ a.content }}</p>
          </div>
          <div v-if="isAdmin" class="px-5 pb-4 flex gap-2">
            <button @click="openEditForm(a)" class="text-xs font-bold px-3 py-1.5 rounded bg-[#E8F2FA] text-[#2E5F9A] hover:bg-[#4A7FBF] hover:text-white transition-colors duration-200">✏ Edit</button>
            <button @click="confirmDelete(a.id)" class="text-xs font-bold px-3 py-1.5 rounded bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200">🗑 Delete</button>
          </div>
        </div>
      </div>

      <!-- ADD BUTTON -->
      <div v-if="isAdmin" class="mt-8 text-center">
        <button @click="openAddForm" class="px-6 py-3 bg-[#C8A84B] text-[#0D2340] text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[#E4C876] transition-colors duration-200">+ Add Announcement</button>
      </div>

    </div>
  </section>

  <!-- ADD/EDIT MODAL -->
  <teleport to="body">
    <div v-if="showFormModal" class="fixed inset-0 z-50 bg-[#0D2340]/70 backdrop-blur-sm flex items-center justify-center px-4" @click.self="showFormModal = false">
      <div class="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl">
        <h3 class="font-display text-[#1E3A5F] text-xl mb-6">{{ editingId ? '✏ Edit Announcement' : '📢 New Announcement' }}</h3>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Title</label>
            <input v-model="form.title" type="text" placeholder="Announcement title" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]" />
          </div>
          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Category</label>
            <select v-model="form.tag" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]">
              <option value="blue">Parish News</option>
              <option value="gold">Event</option>
              <option value="green">Outreach</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Date</label>
            <input v-model="form.date" type="date" class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF]" />
          </div>
          <div>
            <label class="block text-xs font-bold tracking-widest uppercase text-[#5A7A9A] mb-2">Content</label>
            <textarea v-model="form.content" rows="4" placeholder="Write the announcement here..." class="w-full px-4 py-3 border border-[#B8D8F0] rounded-lg text-sm outline-none focus:border-[#4A7FBF] bg-[#FAFBFF] resize-none"></textarea>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="saveAnnouncement" class="flex-1 py-3 bg-[#4A7FBF] text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-[#2E5F9A] transition-colors duration-200">Save</button>
          <button @click="showFormModal = false" class="flex-1 py-3 bg-[#E8F2FA] text-[#4A7FBF] text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-[#B8D8F0] transition-colors duration-200">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>

  <!-- DELETE MODAL -->
  <teleport to="body">
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 bg-[#0D2340]/70 backdrop-blur-sm flex items-center justify-center px-4" @click.self="showDeleteModal = false">
      <div class="bg-white rounded-xl p-8 w-full max-w-sm shadow-2xl">
        <h3 class="font-display text-[#1E3A5F] text-xl mb-3">🗑 Delete Announcement</h3>
        <p class="text-sm text-[#5A7A9A] leading-relaxed mb-6">Are you sure you want to delete this announcement? This cannot be undone.</p>
        <div class="flex gap-3">
          <button @click="deleteAnnouncement" class="flex-1 py-3 bg-red-600 text-white text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-red-700 transition-colors duration-200">Yes, Delete</button>
          <button @click="showDeleteModal = false" class="flex-1 py-3 bg-[#E8F2FA] text-[#4A7FBF] text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-[#B8D8F0] transition-colors duration-200">Cancel</button>
        </div>
      </div>
    </div>
  </teleport>
</template>