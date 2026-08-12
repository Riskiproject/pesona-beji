import { supabase } from "../lib/supabase";

export type PelakuKopi = {
  id: string;
  nama_pelaku: string;
  foto_url: string | null;
  deskripsi_singkat: string | null;
  deskripsi: string | null;
  produk: string | null;
  whatsapp: string | null;
  lokasi_url: string | null;
  slug: string | null;
  galeri: string[];
  created_at: string;
  updated_at: string;
};

/* ================================
   AMBIL SEMUA PELAKU
================================ */

export async function getPelakuKopi() {
  const { data, error } = await supabase
    .from("pelaku_kopi")
    .select("*")
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data || []) as PelakuKopi[];
}

/* ================================
   AMBIL PELAKU BERDASARKAN SLUG
================================ */

export async function getPelakuKopiBySlug(
  slug: string
) {
  const { data, error } = await supabase
    .from("pelaku_kopi")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as PelakuKopi | null;
}

/* ================================
   TAMBAH PELAKU
================================ */

export async function createPelakuKopi(
  data: Omit<
    PelakuKopi,
    "id" | "created_at" | "updated_at"
  >
) {
  const { data: result, error } = await supabase
    .from("pelaku_kopi")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return result as PelakuKopi;
}

/* ================================
   UPDATE PELAKU
================================ */

export async function updatePelakuKopi(
  id: string,
  data: Partial<
    Omit<PelakuKopi, "id" | "created_at" | "updated_at">
  >
) {
  const { data: result, error } = await supabase
    .from("pelaku_kopi")
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

  return result as PelakuKopi;
}

/* ================================
   HAPUS PELAKU
================================ */

export async function deletePelakuKopi(
  id: string
) {
  const { error } = await supabase
    .from("pelaku_kopi")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}

/* ================================
   BUAT SLUG
================================ */

export function generatePelakuKopiSlug(
  nama: string
) {
  return nama
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* ================================
   UPLOAD FOTO PELAKU
================================ */

export async function uploadFotoPelakuKopi(
  file: File
) {
  const extension =
    file.name.split(".").pop()?.toLowerCase() || "jpg";

  const fileName = `pelaku-${Date.now()}.${extension}`;

  const filePath = `pelaku/${fileName}`;

  const { error } = await supabase.storage
    .from("pelaku-kopi")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("pelaku-kopi")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/* ================================
   UPLOAD GALERI
================================ */

export async function uploadGaleriPelakuKopi(
  file: File
) {
  const extension =
    file.name.split(".").pop()?.toLowerCase() || "jpg";

  const fileName = `galeri-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}.${extension}`;

  const filePath = `galeri/${fileName}`;

  const { error } = await supabase.storage
    .from("pelaku-kopi")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("pelaku-kopi")
    .getPublicUrl(filePath);

  return data.publicUrl;
}