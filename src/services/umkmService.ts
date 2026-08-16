import { supabase } from "../lib/supabase";

const TABLE = "umkm";
const BUCKET = "umkm";
const GALLERY_BUCKET = "umkm-gallery";

export async function getUmkm() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getUmkmById(id: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getUmkmBySlug(slug: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}

export async function createUmkm(payload: any) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateUmkm(id: string, payload: any) {
  const { error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq("id", id);

  if (error) {
    console.error("ERROR UPDATE UMKM SERVICE:", error);
    throw error;
  }

  return true;
}

export async function deleteUmkm(id: string) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function uploadUmkmImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function uploadUmkmGallery(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(GALLERY_BUCKET)
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from(GALLERY_BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function createUmkmGallery(payload: any) {
  const { error } = await supabase
    .from("umkm_gallery")
    .insert(payload);

  if (error) throw error;
}

export async function getUmkmGallery(umkmId: string) {
  const { data, error } = await supabase
    .from("umkm_gallery")
    .select("*")
    .eq("umkm_id", umkmId)
    .order("sort_order");

  if (error) throw error;

  return data;
}

export async function deleteUmkmGallery(item: any) {
  const fileName = item.image_url
    .split("/")
    .pop();

  if (fileName) {
    const { error: storageError } =
      await supabase.storage
        .from(GALLERY_BUCKET)
        .remove([fileName]);

    if (storageError) throw storageError;
  }

  const { error } = await supabase
    .from("umkm_gallery")
    .delete()
    .eq("id", item.id);

  if (error) throw error;
}