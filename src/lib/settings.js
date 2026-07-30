import { supabase } from './supabase'

export async function getSetting(key) {
  const { data, error } = await supabase
    .from('parish_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle()
  if (error) { console.error(error); return null }
  return data?.value ?? null
}

export async function setSetting(key, value) {
  const { error } = await supabase
    .from('parish_settings')
    .upsert({ key, value }, { onConflict: 'key' })
  if (error) { console.error(error); return false }
  return true
}
