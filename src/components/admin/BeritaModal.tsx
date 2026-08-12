import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import {
  createBerita,
  updateBerita,
  uploadBeritaImage,
} from "../../services/beritaService";

type BeritaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  berita?: any;
};

export default function BeritaModal({
  isOpen,
  onClose,
  berita,
}: BeritaModalProps) {

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");

  const [excerpt, setExcerpt] = useState("");

  const [content, setContent] = useState("");

  const [author, setAuthor] = useState("Admin Desa Beji");

  const [publishDate, setPublishDate] = useState("");

  const [isActive, setIsActive] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {

  if (!isOpen) return;

  if (berita) {

    // Mode Edit
    setPreview(
      berita.gambar || ""
    );

    setSelectedFile(null);

    setTitle(
      berita.judul || ""
    );

    setCategory(
      berita.kategori || ""
    );

    setExcerpt(
      berita.ringkasan || ""
    );

    setContent(
      berita.isi || ""
    );

    setAuthor(
      berita.penulis || ""
    );

    setPublishDate(
      berita.tanggal_publish || ""
    );

    setIsActive(
      berita.is_active ?? true
    );

  } else {

    // Mode Tambah
    setPreview("");
    setSelectedFile(null);

    setTitle("");

    setCategory("");
    setExcerpt("");

    setContent("");
    setAuthor("Admin Desa Beji");

    setPublishDate("");

setIsActive(true);

  }

}, [berita, isOpen]);

const generateSlug = (
  value: string
) => {

  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

};

const handleTitleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  setTitle(
    e.target.value
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

async function handleSave() {

  setSaving(true);

  try {

    if (!title.trim()) {
      toast.error("Judul wajib diisi");
      return;
    }

    if (!category.trim()) {
      toast.error("Kategori wajib diisi");
      return;
    }

    if (!excerpt.trim()) {
      toast.error("Ringkasan wajib diisi");
      return;
    }

    if (!content.trim()) {
      toast.error("Isi berita wajib diisi");
      return;
    }

    if (!author.trim()) {
      toast.error("Penulis wajib diisi");
      return;
    }

    if (!publishDate) {
      toast.error("Tanggal publish wajib diisi");
      return;
    }

    if (!preview && !selectedFile) {
      toast.error("Cover berita wajib dipilih");
      return;
    }

    let imageUrl = preview;

    if (selectedFile) {

      imageUrl =
        await uploadBeritaImage(selectedFile);

    }

    const payload = {

  judul: title,

  slug: generateSlug(title),

  kategori: category,

  ringkasan: excerpt,

  isi: content,

  penulis: author,

  tanggal_publish: publishDate,

  gambar: imageUrl,

  is_active: isActive,

};

    if (berita) {

      await updateBerita(
        berita.id,
        payload
      );

      toast.success(
        "Berita berhasil diperbarui."
      );

    } else {

      await createBerita(
        payload
      );

      toast.success(
        "Berita berhasil ditambahkan."
      );

    }

    onClose();

  } catch (error) {

    console.error(error);

    toast.error(
      "Gagal menyimpan berita."
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
            {berita ? "Edit Berita" : "Tambah Berita"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Kelola berita Desa Beji.
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
              Cover Berita
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
                Pilih Cover
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
    placeholder="Masukkan judul berita"
    className="w-full rounded-xl border px-4 py-3"
  />

</div>

{/* Kategori */}

<div>

  <label className="mb-2 block font-semibold">
    Kategori
  </label>

 <input
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
  placeholder="Contoh : Kegiatan Desa"
  className="w-full rounded-xl border px-4 py-3"
/>

</div>

{/* Ringkasan */}

<div>

  <label className="mb-2 block font-semibold">
    Ringkasan
  </label>

  <textarea
  rows={4}
  maxLength={200}
  value={excerpt}
  onChange={(e) =>
    setExcerpt(e.target.value)
  }
  className="w-full rounded-xl border px-4 py-3"
/>

<p className="mt-1 text-xs text-gray-500">
  {excerpt.length}/200 karakter
</p>

</div>

{/* Isi Berita */}

<div>

  <label className="mb-2 block font-semibold">
    Isi Berita
  </label>

  <textarea
    rows={12}
    value={content}
    onChange={(e) =>
      setContent(e.target.value)
    }
    className="w-full rounded-xl border px-4 py-3 resize-y"
  />

</div>

{/* Penulis */}

<div>

  <label className="mb-2 block font-semibold">
    Penulis
  </label>

  <input
    value={author}
    onChange={(e) =>
      setAuthor(e.target.value)
    }
    placeholder="Contoh : Admin Desa Beji"
    className="w-full rounded-xl border px-4 py-3"
  />

</div>

{/* Tanggal Publish */}

<div>

  <label className="mb-2 block font-semibold">
    Tanggal Publish
  </label>

  <input
    type="date"
    value={publishDate}
    onChange={(e) =>
      setPublishDate(e.target.value)
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
      onChange={(e) =>
        setIsActive(e.target.checked)
      }
    />

    <span>
      Tampilkan Berita
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
            : berita
              ? "Update"
              : "Simpan"}
        </button>

      </div>

    </div>

  </div>

);

}
