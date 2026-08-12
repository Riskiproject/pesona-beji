import { supabase } from "../lib/supabase";

export type KopiBeji = {
  id: string;
  foto_tentang_url: string | null;
  tentang_deskripsi: string | null;
  sejarah: string | null;
  created_at: string;
  updated_at: string;
};

export async function getKopiBeji() {
  const { data, error } = await supabase
    .from("kopi_beji")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as KopiBeji | null;
}

export async function createKopiBeji(
  data: Omit<
    KopiBeji,
    "id" | "created_at" | "updated_at"
  >
) {
  const { data: result, error } = await supabase
    .from("kopi_beji")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return result as KopiBeji;
}

export async function updateKopiBeji(
  id: string,
  data: Partial<
    Omit<KopiBeji, "id" | "created_at" | "updated_at">
  >
) {
  const { data: result, error } = await supabase
    .from("kopi_beji")
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return result as KopiBeji;
}