import { supabase } from "../lib/supabase";

// =========================
// PUBLIC
// =========================

export async function getHeroBanners(page: string) {
  const { data, error } = await supabase
    .from("hero_banners")
    .select("*")
    .eq("page", page)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return data;
}

// =========================
// ADMIN
// =========================

export async function getAllHero(page: string) {
  const { data, error } = await supabase
    .from("hero_banners")
    .select("*")
    .eq("page", page)
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return data;
}

export async function createHero(hero: any) {
  const { data, error } = await supabase
    .from("hero_banners")
    .insert(hero)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateHero(id: string, hero: any) {
  const { data, error } = await supabase
    .from("hero_banners")
    .update(hero)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteHero(id: string) {
  const { error } = await supabase
    .from("hero_banners")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function uploadHeroImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("hero")
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("hero")
    .getPublicUrl(fileName);

  return data.publicUrl;
}