import { supabase } from "../lib/supabase";

const TABLE = "kontak";

// Ambil data kontak aktif
export async function getKontak() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

// Ambil satu data kontak berdasarkan ID
export async function getKontakById(id: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

// Ambil semua data kontak
// Dipakai untuk CMS
export async function getAllKontak() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

// Tambah kontak
export async function createKontak(payload: any) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Update kontak
export async function updateKontak(
  id: string,
  payload: any
) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// Hapus kontak
export async function deleteKontak(id: string) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) throw error;
}