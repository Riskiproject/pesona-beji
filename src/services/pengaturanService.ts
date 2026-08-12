import { supabase } from "../lib/supabase";

export type Pengaturan = {
  id: string;
  nama_website: string;
  deskripsi: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  copyright: string | null;
  created_at: string;
  updated_at: string;
};

export async function getPengaturan() {
  const { data, error } = await supabase
    .from("pengaturan")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Pengaturan | null;
}

export async function createPengaturan(
  data: Omit<
    Pengaturan,
    "id" | "created_at" | "updated_at"
  >
) {
  const { data: result, error } = await supabase
    .from("pengaturan")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return result as Pengaturan;
}

export async function updatePengaturan(
  id: string,
  data: Partial<
    Omit<Pengaturan, "id" | "created_at" | "updated_at">
  >
) {
  const { data: result, error } = await supabase
    .from("pengaturan")
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

  return result as Pengaturan;
}

/* ================================
   UPLOAD GAMBAR PENGATURAN
================================ */

export async function uploadPengaturanImage(
  file: File,
  type: "logo" | "favicon"
) {
  const extension =
    file.name.split(".").pop()?.toLowerCase() || "png";

  const fileName = `${type}-${Date.now()}.${extension}`;

  const filePath = `${type}/${fileName}`;

  const { error: uploadError } =
    await supabase.storage
      .from("pengaturan")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

  if (uploadError) {
    throw uploadError;
  }

  const { data } =
    supabase.storage
      .from("pengaturan")
      .getPublicUrl(filePath);

  return data.publicUrl;
}

/* ================================
   HAPUS GAMBAR LAMA
================================ */

export async function deletePengaturanImage(
  imageUrl: string | null
) {
  if (!imageUrl) {
    return;
  }

  const marker =
    "/storage/v1/object/public/pengaturan/";

  const index = imageUrl.indexOf(marker);

  if (index === -1) {
    return;
  }

  const filePath = decodeURIComponent(
    imageUrl.substring(index + marker.length)
  );

  const { error } =
    await supabase.storage
      .from("pengaturan")
      .remove([filePath]);

  if (error) {
    throw error;
  }
}