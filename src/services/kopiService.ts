import { supabase } from "../lib/supabase";

export type KopiBeji = {
  id: string;
  foto_tentang_url: string | null;
  tentang_deskripsi: string | null;
  sejarah: string | null;
  created_at: string;
  updated_at: string;
};

/* ================================
   AMBIL DATA KOPI BEJI
================================ */

export async function getKopiBeji() {
  const { data, error } = await supabase
    .from("kopi_beji")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as KopiBeji | null;
}

/* ================================
   BUAT DATA KOPI BEJI
================================ */

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

/* ================================
   UPDATE DATA KOPI BEJI
================================ */

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

/* ================================
   UPLOAD FOTO TENTANG KOPI BEJI
================================ */

export async function uploadFotoTentangKopiBeji(
  file: File
) {
  const extension =
    file.name.split(".").pop()?.toLowerCase() || "jpg";

  const fileName = `tentang-${Date.now()}.${extension}`;

  const filePath = `tentang/${fileName}`;

  const { error } = await supabase.storage
    .from("kopi")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("kopi")
    .getPublicUrl(filePath);

  return data.publicUrl;
}