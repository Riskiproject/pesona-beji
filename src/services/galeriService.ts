import { supabase } from "../lib/supabase";

export async function getGaleri() {

  const hasil: any[] = [];

  // =========================
  // BERITA
  // =========================

  const beritaResult = await supabase
    .from("berita")
    .select("id, judul, gambar, tanggal_publish")
    .eq("is_active", true)
    .not("gambar", "is", null)
    .order("tanggal_publish", {
      ascending: false,
    });

  console.log("BERITA:", beritaResult);

  if (beritaResult.error) {
    console.error(
      "ERROR BERITA:",
      beritaResult.error
    );
  } else {

    hasil.push(
      ...(beritaResult.data || []).map((item) => ({
        id: `berita-${item.id}`,
        category: "Berita",
        image: item.gambar,
        title: item.judul,
        date: item.tanggal_publish,
      }))
    );

  }


  // =========================
  // POTENSI
  // =========================

  const potensiResult = await supabase
    .from("potensi")
    .select(
      "id, title, image_url, sort_order"
    )
    .eq("is_active", true)
    .not("image_url", "is", null)
    .order("sort_order", {
      ascending: true,
    });

  console.log("POTENSI:", potensiResult);

  if (potensiResult.error) {

    console.error(
      "ERROR POTENSI:",
      potensiResult.error
    );

  } else {

    hasil.push(
      ...(potensiResult.data || []).map((item) => ({
        id: `potensi-${item.id}`,
        category: "Potensi",
        image: item.image_url,
        title: item.title,
      }))
    );

  }


  // =========================
  // UMKM
  // =========================

  const umkmResult = await supabase
    .from("umkm")
    .select("id, nama, gambar, created_at")
    .not("gambar", "is", null)
    .order("created_at", {
      ascending: false,
    });

  console.log("UMKM:", umkmResult);

  if (umkmResult.error) {

    console.error(
      "ERROR UMKM:",
      umkmResult.error
    );

  } else {

    hasil.push(
      ...(umkmResult.data || []).map((item) => ({
        id: `umkm-${item.id}`,
        category: "UMKM",
        image: item.gambar,
        title: item.nama,
        date: item.created_at,
      }))
    );

  }


  // =========================
  // GALERI UMKM
  // =========================

  const umkmGalleryResult = await supabase
    .from("umkm_gallery")
    .select(
      "id, umkm_id, image_url, sort_order"
    )
    .order("sort_order", {
      ascending: true,
    });

  console.log(
    "UMKM GALLERY:",
    umkmGalleryResult
  );

  if (umkmGalleryResult.error) {

    console.error(
      "ERROR UMKM GALLERY:",
      umkmGalleryResult.error
    );

  } else {

    hasil.push(
      ...(umkmGalleryResult.data || []).map((item) => ({
        id: `umkm-gallery-${item.id}`,
        category: "UMKM",
        image: item.image_url,
        title: "Galeri UMKM",
      }))
    );

  }


  console.log("HASIL GALERI:", hasil);

  return hasil;
}