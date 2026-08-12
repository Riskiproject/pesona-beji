import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import {
  createPotensi,
  updatePotensi,
  uploadPotensiImage,
  uploadPotensiGallery,
  createPotensiGallery,
  getPotensiGallery,
  deletePotensiGallery,
} from "../../services/potensiService";

type PotensiModalProps = {
  isOpen: boolean;
  onClose: () => void;
  potensi?: any;
};

export default function PotensiModal({
  isOpen,
  onClose,
  potensi,
}: PotensiModalProps) {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [preview, setPreview] = useState("");
  const galleryInputRef =
  useRef<HTMLInputElement>(null);

const [galleryFiles, setGalleryFiles] =
  useState<File[]>([]);

const [galleryPreview, setGalleryPreview] =
  useState<string[]>([]);

  const [oldGallery, setOldGallery] =
  useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  
  const [shortDescription, setShortDescription] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState(1);

  const [isActive, setIsActive] =
    useState(true);

const [saving, setSaving] =
  useState(false);
    

  useEffect(() => {

  if (!isOpen) return;

  if (potensi) {

    // Mode Edit
    setPreview(potensi.image_url || "");
    setSelectedFile(null);

    setTitle(potensi.title || "");
    setSlug(potensi.slug || "");

    setShortDescription(
      potensi.short_description || ""
    );

    setDescription(
      potensi.description || ""
    );

    setSortOrder(
      potensi.sort_order || 1
    );

    setIsActive(
      potensi.is_active ?? true
    );

    const loadGallery = async () => {

  const data =
    await getPotensiGallery(
      potensi.id
    );

  setOldGallery(data || []);

};

loadGallery();

  } else {

    // Mode Tambah
    setPreview("");
    setSelectedFile(null);

    setTitle("");
    setSlug("");

    setShortDescription("");
    setDescription("");

    setSortOrder(1);
    setIsActive(true);

    setGalleryFiles([]);
    setGalleryPreview([]);

  }

}, [potensi, isOpen]);

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

    setSlug(generateSlug(e.target.value));

  };

  const handleSelectImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {

      toast.error("Ukuran gambar maksimal 5MB");

      return;

    }

    setSelectedFile(file);

    setPreview(URL.createObjectURL(file));

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

      if (!title.trim()) {
  toast.error("Judul wajib diisi");
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

      let imageUrl = preview;

      if (selectedFile) {

        imageUrl =
          await uploadPotensiImage(selectedFile);

      }

      const payload = {

        title,

        slug,

        short_description:
          shortDescription,

        description,

        image_url:
          imageUrl,

        sort_order:
          sortOrder,

        is_active:
          isActive,

      };

      if (potensi) {

  await updatePotensi(
    potensi.id,
    payload
  );

  for (const file of galleryFiles) {

    const url =
      await uploadPotensiGallery(file);

    await createPotensiGallery({
      potensi_id: potensi.id,
      image_url: url,
    });

  }

  toast.success(
    "Potensi berhasil diperbarui."
  );

}
       else {

       const data =
await createPotensi(payload);

for (const file of galleryFiles) {

const url =
await uploadPotensiGallery(file);

await createPotensiGallery({

potensi_id: data.id,

image_url: url,

});

}

toast.success(
"Potensi berhasil ditambahkan."
);

      }

      onClose();

    } catch (error) {

  console.error(error);

  toast.error(
    "Gagal menyimpan data."
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
            {potensi ? "Edit Potensi" : "Tambah Potensi"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Kelola data potensi Desa Beji.
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

          {/* Upload */}
          <div>

            <label className="mb-2 block font-semibold">
              Gambar
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
                JPG, PNG, WEBP (Max 5 MB)
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
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSelectImage}
              />

            </div>

          </div>

          <hr />

          {/* Judul */}

          <div>

            <label className="mb-2 block font-semibold">
              Judul
            </label>

            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="Contoh : Kopi Beji"
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
              onChange={(e)=>
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
              onChange={(e)=>
                setDescription(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

          <hr />

<div>

<label className="mb-2 block font-semibold">
Galeri Foto
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
ref={galleryInputRef}
hidden
multiple
accept="image/*"
type="file"
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

        if (!confirm("Hapus foto ini?")) return;

        try {

          await deletePotensiGallery(item);

          setOldGallery(prev =>
            prev.filter(g => g.id !== item.id)
          );

          toast.success("Foto berhasil dihapus.");

        } catch (error) {

          console.error(error);

          toast.error("Gagal menghapus foto.");

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
            prev.filter((_, i) => i !== index)
          );

          setGalleryFiles(prev =>
            prev.filter((_, i) => i !== index)
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

          {/* Urutan */}

          <div>

            <label className="mb-2 block font-semibold">
              Urutan Tampil
            </label>

            <input
              type="number"
              value={sortOrder}
              onChange={(e)=>
                setSortOrder(Number(e.target.value))
              }
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

          {/* Status */}

          <div>

            <label className="mb-2 block font-semibold">
              Status
            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={isActive}
                onChange={(e)=>
                  setIsActive(e.target.checked)
                }
              />

              <span>
                Tampilkan Potensi
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
  className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
>
  {saving
    ? "Menyimpan..."
    : potensi
      ? "Update"
      : "Simpan"}
</button>

      </div>

    </div>

  </div>
);
}