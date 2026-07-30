import { ref } from 'vue'
import { supabase } from './supabase'

const isAdmin = ref(false)
const initialized = ref(false)

async function init() {
  const { data: { session } } = await supabase.auth.getSession()
  isAdmin.value = !!session

  supabase.auth.onAuthStateChange((event, session) => {
    isAdmin.value = !!session
  })

  initialized.value = true
}

async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
}

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error(error)
}

export function useAuth() {
  return { isAdmin, initialized, init, login, logout }
}
