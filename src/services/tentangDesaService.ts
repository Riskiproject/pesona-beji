import { supabase } from "../lib/supabase";

const TABLE = "tentang_desa";

export async function getTentangDesa() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function createTentangDesa(payload: any) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateTentangDesa(id: string, payload: any) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function uploadTentangDesaImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `tentang-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("tentang")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("tentang")
    .getPublicUrl(fileName);

  return data.publicUrl;
}

