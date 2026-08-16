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
  // GALERI POTENSI
  // =========================

  const potensiGalleryResult = await supabase
    .from("potensi_gallery")
    .select(`
      id,
      potensi_id,
      image_url,
      sort_order,
      created_at,
      potensi (
        title
      )
    `)
    .order("sort_order", {
      ascending: true,
    });

  console.log(
    "POTENSI GALLERY:",
    potensiGalleryResult
  );

  if (potensiGalleryResult.error) {

    console.error(
      "ERROR POTENSI GALLERY:",
      potensiGalleryResult.error
    );

  } else {

    hasil.push(
      ...(potensiGalleryResult.data || []).map((item: any) => ({
        id: `potensi-gallery-${item.id}`,
        category: "Potensi",
        image: item.image_url,
        title:
          item.potensi?.title ||
          "Galeri Potensi",
        date: item.created_at,
      }))
    );

  }

    // =========================
  // KOPI BEJI
  // =========================

  const kopiBejiResult = await supabase
    .from("kopi_beji")
    .select("id, foto_tentang_url, created_at")
    .not("foto_tentang_url", "is", null);

  console.log("KOPI BEJI:", kopiBejiResult);

  if (kopiBejiResult.error) {

    console.error(
      "ERROR KOPI BEJI:",
      kopiBejiResult.error
    );

  } else {

    hasil.push(
      ...(kopiBejiResult.data || []).map((item) => ({
        id: `kopi-beji-${item.id}`,
        category: "Kopi Beji",
        image: item.foto_tentang_url,
        title: "Kopi Beji",
        date: item.created_at,
      }))
    );

  }


  // =========================
  // PELAKU KOPI
  // =========================

  const pelakuKopiResult = await supabase
    .from("pelaku_kopi")
    .select(
      "id, nama_pelaku, foto_url, galeri, created_at"
    )
    .order("created_at", {
      ascending: false,
    });

  console.log(
    "PELAKU KOPI:",
    pelakuKopiResult
  );

  if (pelakuKopiResult.error) {

    console.error(
      "ERROR PELAKU KOPI:",
      pelakuKopiResult.error
    );

  } else {

    for (const item of pelakuKopiResult.data || []) {

      // Foto utama pelaku
      if (item.foto_url) {

        hasil.push({
          id: `pelaku-kopi-${item.id}`,
          category: "Kopi Beji",
          image: item.foto_url,
          title: item.nama_pelaku || "Pelaku Kopi Beji",
          date: item.created_at,
        });

      }

      // Galeri pelaku kopi
      if (Array.isArray(item.galeri)) {

        item.galeri.forEach(
          (foto: any, index: number) => {

            let imageUrl = "";

            if (typeof foto === "string") {
              imageUrl = foto;
            } else if (foto?.image_url) {
              imageUrl = foto.image_url;
            } else if (foto?.foto_url) {
              imageUrl = foto.foto_url;
            } else if (foto?.url) {
              imageUrl = foto.url;
            }

            if (imageUrl) {

              hasil.push({
                id: `pelaku-kopi-gallery-${item.id}-${index}`,
                category: "Kopi Beji",
                image: imageUrl,
                title:
                  item.nama_pelaku ||
                  "Galeri Kopi Beji",
                date: item.created_at,
              });

            }

          }
        );

      }

    }

  }


  // =========================
  // UMKM
  // =========================

  const umkmResult = await supabase
  .from("umkm")
  .select("id, title, image_url, created_at")
  .not("image_url", "is", null)
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
    image: item.image_url,
    title: item.title,
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