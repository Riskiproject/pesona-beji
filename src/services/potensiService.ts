import { supabase } from "../lib/supabase";

const TABLE = "potensi";
const BUCKET = "potensi";
const GALLERY_BUCKET = "potensi-gallery";

export async function getPotensi() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return data;
}

export async function getPotensiById(id: string) {
  const { data, error } = await supabase 
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function getPotensiBySlug(slug: string) {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data;
}

export async function createPotensi(payload: any) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updatePotensi(id: string, payload: any) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deletePotensi(id: string) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function uploadPotensiImage(file: File) {
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

export async function uploadPotensiGallery(file: File) {
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

export async function createPotensiGallery(payload: any) {
  const { error } = await supabase
    .from("potensi_gallery")
    .insert(payload);

  if (error) throw error;
}

export async function getPotensiGallery(potensiId: string) {
  const { data, error } = await supabase
    .from("potensi_gallery")
    .select("*")
    .eq("potensi_id", potensiId)
    .order("sort_order");

  if (error) throw error;

  return data;
}

export async function deletePotensiGallery(item: any) {

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
    .from("potensi_gallery")
    .delete()
    .eq("id", item.id);

  if (error) throw error;

}

