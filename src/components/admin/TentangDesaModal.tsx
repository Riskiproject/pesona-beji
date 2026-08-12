import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  createTentangDesa,
  updateTentangDesa,
  uploadTentangDesaImage,
} from "../../services/tentangDesaService";

type TentangDesaModalProps = { 
  isOpen: boolean;
  onClose: () => void;
  tentang?: any;
};

export default function TentangDesaModal({
  isOpen,
  onClose,
  tentang, 
}: TentangDesaModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [preview, setPreview] = useState("");
  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [buttonText, setButtonText] = useState("");
  

  useEffect(() => {
  if (!tentang) return;

  setPreview(tentang.image_url || "");
  setTitle(tentang.title || "");
  setDescription(tentang.description || "");
  setButtonText(tentang.button_text || ""); 

  const content = tentang.content
    ? JSON.parse(tentang.content)
    : {};

  setBadge(content.badge || "");
  setContentTitle(content.contentTitle || "");
  setContentDescription(content.contentDescription || "");
}, [tentang, isOpen]);

  const handleSelectImage = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Ukuran gambar maksimal 5 MB");
    return;
  }

  setSelectedFile(file);
  setPreview(URL.createObjectURL(file));
};

  const handleSave = async () => {
  try {
    let imageUrl = preview;

if (selectedFile) {
  imageUrl = await uploadTentangDesaImage(selectedFile);
}

    const payload = {
  title,
  description,
  image_url: imageUrl,
  badge,

  content: JSON.stringify({
  contentTitle,
  contentDescription,
}),

  button_text: buttonText,
  button_link: "/potensi",
};

    if (tentang) {
  await updateTentangDesa(tentang.id, payload);
  toast.success("Konten berhasil diperbarui.");
} else {
  await createTentangDesa(payload);
  toast.success("Konten berhasil ditambahkan.");
}

    onClose();

 } catch (error) {
  console.error(error);
  toast.error("Gagal menyimpan konten.");
}
};
if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="flex w-full max-w-5xl max-h-[90vh] flex-col rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
  {tentang ? "Edit Konten Tentang Desa" : "Tambah Konten Tentang Desa"}
</h2>

            <p className="mt-1 text-sm text-gray-500">
              Kelola section Mengenal Desa Beji.
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>

        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          <div className="space-y-6">

            {/* Upload */}
            <div>

              <label className="mb-2 block text-sm font-semibold">
                Gambar
              </label>

              <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center">

                {preview ? (
                  <img
                    src={preview}
                    alt=""
                    className="mx-auto h-56 rounded-xl object-cover"
                  />
                ) : (
                  <div className="text-5xl">🖼️</div>
                )}   
                 <p className="mt-4 text-gray-600">
      Upload gambar
    </p>

                <p className="mt-1 text-sm text-gray-400">
  JPG, PNG, WEBP (Maks. 5 MB)
</p>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
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

            <hr className="border-gray-200" />

            {/* Badge */}
            <div>

              <label className="mb-2 block font-semibold">
                Badge
              </label>

              <input
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Tentang Pesona Beji"
                className="w-full rounded-xl border px-4 py-3"
              />

            </div>

            {/* Judul */}
            <div>

              <label className="mb-2 block font-semibold">
                Judul
              </label>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Mengenal Desa Beji"
                className="w-full rounded-xl border px-4 py-3"
              />

            </div>

            {/* Deskripsi */}
            <div>

              <label className="mb-2 block font-semibold">
                Deskripsi Utama
              </label>

              <textarea
  rows={4}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Masukkan deskripsi utama..."
  className="w-full rounded-xl border px-4 py-3"
/>

            </div>

            <hr />

            <hr className="border-gray-200" />

            {/* Judul Kedua */}
            <div>

              <label className="mb-2 block font-semibold">
                Judul Kedua
              </label>

              <input
                value={contentTitle}
                onChange={(e) => setContentTitle(e.target.value)}
                placeholder="Desa yang Kaya Potensi"
                className="w-full rounded-xl border px-4 py-3"
              />

            </div>

            {/* Deskripsi Kedua */}
            <div>

              <label className="mb-2 block font-semibold">
                Deskripsi Kedua
              </label>

              <textarea
  rows={5}
  value={contentDescription}
  onChange={(e) => setContentDescription(e.target.value)}
  placeholder="Masukkan deskripsi kedua..."
  className="w-full rounded-xl border px-4 py-3"
/>

            </div>
<hr className="border-gray-200" />

            {/* Tombol */}
            <div>

              <label className="mb-2 block font-semibold">
                Teks Tombol
              </label>

              <input
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                placeholder="Jelajahi Potensi"
                className="w-full rounded-xl border px-4 py-3"
              />

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
  className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700"
>
  {tentang ? "Update" : "Simpan"}
</button>

        </div>

      </div>

    </div>
  );
}