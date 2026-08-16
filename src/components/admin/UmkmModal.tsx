import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import {
  createUmkm,
  updateUmkm,
  uploadUmkmImage,
  uploadUmkmGallery,
  createUmkmGallery,
  getUmkmGallery,
  deleteUmkmGallery,
} from "../../services/umkmService";

type UmkmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  umkm?: any;
};

export default function UmkmModal({
  isOpen,
  onClose,
  umkm,
}: UmkmModalProps) {

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const galleryInputRef =
    useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [galleryFiles, setGalleryFiles] =
    useState<File[]>([]);

  const [galleryPreview, setGalleryPreview] =
    useState<string[]>([]);

  const [oldGallery, setOldGallery] =
    useState<any[]>([]);

  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [owner, setOwner] =
    useState("");

  const [kategori, setKategori] =
    useState("");

  const [alamat, setAlamat] =
    useState("");

  const [whatsapp, setWhatsapp] =
    useState("");

  const [mapsUrl, setMapsUrl] =
    useState("");

  const [shortDescription,
    setShortDescription] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [isActive,
    setIsActive] =
    useState(true);

  const [saving,
    setSaving] =
    useState(false);

  useEffect(() => {

    if (!isOpen) return;

    if (umkm) {

      setPreview(
        umkm.image_url || ""
      );

      setSelectedFile(null);

      setTitle(
        umkm.title || ""
      );

      setSlug(
        umkm.slug || ""
      );

      setOwner(
        umkm.owner || ""
      );

      setKategori(
        umkm.kategori || ""
      );

      setAlamat(
        umkm.alamat || ""
      );

      setWhatsapp(
        umkm.whatsapp || ""
      );

      setMapsUrl(
        umkm.maps_url || ""
      );

      setShortDescription(
        umkm.short_description || ""
      );

      setDescription(
        umkm.description || ""
      );

      setIsActive(
        umkm.is_active ?? true
      );

      const loadGallery =
        async () => {

        const data =
          await getUmkmGallery(
            umkm.id
          );

        setOldGallery(
          data || []
        );

      };

      loadGallery();

    } else {

      setPreview("");

      setSelectedFile(null);

      setTitle("");

      setSlug("");

      setOwner("");

      setKategori("");

      setAlamat("");

      setWhatsapp("");

      setMapsUrl("");

      setShortDescription("");

      setDescription("");

      setIsActive(true);

      setGalleryFiles([]);

      setGalleryPreview([]);

      setOldGallery([]);

    }

  }, [umkm, isOpen]);
  const generateSlug = (value: string) => {

  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

};

const handleTitleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  setTitle(e.target.value);

  setSlug(
    generateSlug(e.target.value)
  );

};

const handleSelectImage = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const file =
    e.target.files?.[0];

  if (!file) return;

  if (
    file.size >
    5 * 1024 * 1024
  ) {

    toast.error(
      "Ukuran gambar maksimal 5MB"
    );

    return;

  }

  setSelectedFile(file);

  setPreview(
    URL.createObjectURL(file)
  );

};

const handleGallery = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const files = Array.from(
    e.target.files || []
  );

  setGalleryFiles(prev => [
    ...prev,
    ...files,
  ]);

  setGalleryPreview(prev => [
    ...prev,
    ...files.map(file =>
      URL.createObjectURL(file)
    ),
  ]);

  e.target.value = "";

};

async function handleSave() {
  setSaving(true);

  try {
    // =========================
    // VALIDASI
    // =========================

    if (!title.trim()) {
      toast.error("Nama UMKM wajib diisi");
      return;
    }

    if (!owner.trim()) {
      toast.error("Nama pemilik wajib diisi");
      return;
    }

    if (!shortDescription.trim()) {
      toast.error("Deskripsi singkat wajib diisi");
      return;
    }

    if (!description.trim()) {
      toast.error("Deskripsi lengkap wajib diisi");
      return;
    }

    if (!preview && !selectedFile) {
      toast.error("Cover wajib dipilih");
      return;
    }

    // =========================
    // UPLOAD COVER
    // =========================

    let imageUrl = preview;

    if (selectedFile) {
      try {
        imageUrl = await uploadUmkmImage(selectedFile);
      } catch (error) {
        console.error("ERROR UPLOAD COVER:", error);
        toast.error("Gagal upload gambar cover.");
        return;
      }
    }

    // =========================
    // PAYLOAD UMKM
    // =========================

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      owner: owner.trim(),
      kategori: kategori.trim(),
      alamat: alamat.trim(),
      whatsapp: whatsapp.trim(),
      maps_url: mapsUrl.trim(),
      short_description: shortDescription.trim(),
      description: description.trim(),
      image_url: imageUrl,
      is_active: isActive,
    };

    console.log("PAYLOAD UMKM:", payload);

    // =========================
    // UPDATE
    // =========================

    if (umkm) {
      try {
        await updateUmkm(umkm.id, payload);
      } catch (error) {
        console.error("ERROR UPDATE UMKM:", error);
        toast.error("Gagal update data UMKM.");
        return;
      }

      // =========================
      // GALERI BARU
      // =========================

      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];

        let url: string;

        try {
          url = await uploadUmkmGallery(file);
        } catch (error) {
          console.error(
            "ERROR UPLOAD GALERI:",
            file.name,
            error
          );

          toast.error(
            `Gagal upload galeri: ${file.name}`
          );

          return;
        }

        try {
          await createUmkmGallery({
            umkm_id: umkm.id,
            image_url: url,
            sort_order:
              oldGallery.length + i + 1,
          });
        } catch (error) {
          console.error(
            "ERROR SIMPAN GALERI:",
            error
          );

          toast.error(
            `Gagal menyimpan galeri: ${file.name}`
          );

          return;
        }
      }

      toast.success(
        "UMKM berhasil diperbarui."
      );

    } else {

      // =========================
      // CREATE UMKM
      // =========================

      let data;

      try {
        data = await createUmkm(payload);
      } catch (error) {
        console.error(
          "ERROR CREATE UMKM:",
          error
        );

        toast.error(
          "Gagal menambahkan data UMKM."
        );

        return;
      }

      // =========================
      // GALERI SAAT TAMBAH
      // =========================

      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];

        let url: string;

        try {
          url = await uploadUmkmGallery(file);
        } catch (error) {
          console.error(
            "ERROR UPLOAD GALERI:",
            file.name,
            error
          );

          toast.error(
            `Gagal upload galeri: ${file.name}`
          );

          return;
        }

        try {
          await createUmkmGallery({
            umkm_id: data.id,
            image_url: url,
            sort_order: i + 1,
          });
        } catch (error) {
          console.error(
            "ERROR SIMPAN GALERI:",
            error
          );

          toast.error(
            `Gagal menyimpan galeri: ${file.name}`
          );

          return;
        }
      }

      toast.success(
        "UMKM berhasil ditambahkan."
      );
    }

    onClose();

  } catch (error) {
    console.error(
      "ERROR UMUM SIMPAN UMKM:",
      error
    );

    toast.error(
      "Terjadi kesalahan saat menyimpan."
    );

  } finally {
    setSaving(false);
  }
}

if (!isOpen) return null;

return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className="flex w-full max-w-5xl max-h-[90vh] flex-col rounded-2xl bg-white shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-6">

        <div>

          <h2 className="text-2xl font-bold">
            {umkm ? "Edit UMKM" : "Tambah UMKM"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Kelola data UMKM Desa Beji.
          </p>

        </div>

        <button
          onClick={onClose}
          className="text-2xl text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

      </div>

      {/* Body */}

      <div className="flex-1 overflow-y-auto p-6">

        <div className="space-y-6">

          {/* Cover */}

          <div>

            <label className="mb-2 block font-semibold">
              Cover UMKM
            </label>

            <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">

              {preview ? (

                <img
                  src={preview}
                  alt=""
                  className="mx-auto h-56 rounded-xl object-cover"
                />

              ) : (

                <div className="text-5xl">
                  🖼️
                </div>

              )}

              <p className="mt-4 text-gray-500">
                JPG, PNG, WEBP (Max 5MB)
              </p>

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="mt-5 rounded-lg bg-green-600 px-5 py-2 text-white"
              >
                Pilih Gambar
              </button>

              <input
                hidden
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleSelectImage}
              />

            </div>

          </div>

          <hr />

          {/* Nama UMKM */}

          <div>

            <label className="mb-2 block font-semibold">
              Nama UMKM
            </label>

            <input
              value={title}
              onChange={handleTitleChange}
              className="w-full rounded-xl border px-4 py-3"
              placeholder="Contoh : Keripik Singkong"
            />

          </div>

          {/* Pemilik */}

          <div>

            <label className="mb-2 block font-semibold">
              Nama Pemilik
            </label>

            <input
              value={owner}
              onChange={(e) =>
                setOwner(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

          {/* Kategori */}

          <div>

            <label className="mb-2 block font-semibold">
              Kategori
            </label>

            <input
              value={kategori}
              onChange={(e) =>
                setKategori(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

          {/* Alamat */}

          <div>

            <label className="mb-2 block font-semibold">
              Alamat
            </label>

            <textarea
              rows={3}
              value={alamat}
              onChange={(e) =>
                setAlamat(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

          {/* WhatsApp */}

          <div>

            <label className="mb-2 block font-semibold">
              WhatsApp
            </label>

            <input
              value={whatsapp}
              onChange={(e) =>
                setWhatsapp(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
              placeholder="628xxxxxxxxxx"
            />

          </div>

          {/* Maps */}

          <div>

            <label className="mb-2 block font-semibold">
              Google Maps
            </label>

            <input
              value={mapsUrl}
              onChange={(e) =>
                setMapsUrl(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

          {/* Deskripsi Singkat */}

          <div>

            <label className="mb-2 block font-semibold">
              Deskripsi Singkat
            </label>

            <textarea
              rows={3}
              value={shortDescription}
              onChange={(e) =>
                setShortDescription(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

          {/* Deskripsi */}

          <div>

            <label className="mb-2 block font-semibold">
              Deskripsi Lengkap
            </label>

            <textarea
              rows={8}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

          <hr />
          {/* Galeri */}

<div>

  <label className="mb-2 block font-semibold">
    Galeri Produk
  </label>

  <button
    type="button"
    onClick={() =>
      galleryInputRef.current?.click()
    }
    className="rounded-lg bg-blue-600 px-5 py-2 text-white"
  >
    Tambah Foto Galeri
  </button>

  <input
    hidden
    multiple
    accept="image/*"
    type="file"
    ref={galleryInputRef}
    onChange={handleGallery}
  />

  <div className="mt-4 grid grid-cols-3 gap-3">

    {oldGallery.map((item) => (

      <div
        key={item.id}
        className="relative"
      >

        <img
          src={item.image_url}
          className="h-28 w-full rounded-xl object-cover"
        />

        <button
          type="button"
          onClick={async () => {

            if (!confirm("Hapus foto ini?"))
              return;

            try {

              await deleteUmkmGallery(item);

              setOldGallery(prev =>
                prev.filter(
                  g => g.id !== item.id
                )
              );

              toast.success(
                "Foto berhasil dihapus."
              );

            } catch (error) {

              console.error(error);

              toast.error(
                "Gagal menghapus foto."
              );

            }

          }}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
        >
          ✕
        </button>

      </div>

    ))}

    {galleryPreview.map((img, index) => (

      <div
        key={index}
        className="relative"
      >

        <img
          src={img}
          className="h-28 w-full rounded-xl object-cover"
        />

        <button
          type="button"
          onClick={() => {

            setGalleryPreview(prev =>
              prev.filter(
                (_, i) => i !== index
              )
            );

            setGalleryFiles(prev =>
              prev.filter(
                (_, i) => i !== index
              )
            );

          }}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white"
        >
          ✕
        </button>

      </div>

    ))}

  </div>

</div>

<hr />

{/* Status */}

<div>

  <label className="mb-2 block font-semibold">
    Status
  </label>

  <label className="flex items-center gap-3">

    <input
      type="checkbox"
      checked={isActive}
      onChange={(e) =>
        setIsActive(
          e.target.checked
        )
      }
    />

    <span>
      Tampilkan UMKM
    </span>

  </label>

</div>

</div>

</div>

{/* Footer */}

<div className="flex justify-end gap-3 border-t p-6">

  <button
    onClick={onClose}
    className="rounded-xl border px-5 py-2"
  >
    Batal
  </button>

  <button
    onClick={handleSave}
    disabled={saving}
    className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {saving
      ? "Menyimpan..."
      : umkm
      ? "Update"
      : "Simpan"}
  </button>

</div>

</div>

</div>

);
}