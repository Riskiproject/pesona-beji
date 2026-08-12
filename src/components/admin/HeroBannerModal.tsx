import { useRef, useState, useEffect } from "react";
import { uploadHeroImage, createHero,updateHero } from "../../services/heroService";
import toast from "react-hot-toast";

type HeroBannerModalProps = {
  isOpen: boolean;
  hero?: any;
  page: string;
  onClose: () => void;
};
export default function HeroBannerModal({
  isOpen,
  hero,
  page,
  onClose,
}: HeroBannerModalProps) {

const fileInputRef = useRef<HTMLInputElement>(null);
const [selectedFile, setSelectedFile] = useState<File | null>(null);

const [preview, setPreview] = useState("");
const [title, setTitle] = useState("");

const [subtitle, setSubtitle] = useState("");

const [description, setDescription] = useState("");

const [button1Text, setButton1Text] = useState("");

const [button1Link, setButton1Link] = useState("");

const [button2Text, setButton2Text] = useState("");

const [button2Link, setButton2Link] = useState("");

const [isActive, setIsActive] = useState(true);

useEffect(() => {
  if (hero) {
    setTitle(hero.title || "");
    setSubtitle(hero.subtitle || "");
    setDescription(hero.description || "");
    setButton1Text(hero.button1_text || "");
    setButton1Link(hero.button1_link || "");
    setButton2Text(hero.button2_text || "");
    setButton2Link(hero.button2_link || "");
    setPreview(hero.image_url || "");
    setSelectedFile(null);
    setIsActive(hero.is_active);
  } else {
    setTitle("");
    setSubtitle("");
    setDescription("");
    setButton1Text("");
    setButton1Link("");
    setButton2Text("");
    setButton2Link("");
    setPreview("");
    setSelectedFile(null);
    setIsActive(true);
  }
}, [hero, isOpen]);


const handleSelectImage = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setSelectedFile(file);

  setPreview(URL.createObjectURL(file));
};

const handleSave = async () => {
  try {
    let imageUrl = preview;

    // upload gambar baru jika dipilih
    if (selectedFile) {
      imageUrl = await uploadHeroImage(selectedFile);
    }

    if (!imageUrl) {
      toast.error("Pilih gambar terlebih dahulu."); 
      return;
    }

    const payload = {
      page,
      title,
      subtitle,
      description,
      image_url: imageUrl,
      button1_text: button1Text,
      button1_link: button1Link,
      button2_text: button2Text,
      button2_link: button2Link,
      sort_order: hero?.sort_order ?? 1,
      is_active: isActive,
    };

    if (hero) {
      await updateHero(hero.id, payload);
      toast.success("Banner berhasil diperbarui.");
    } else {
      await createHero(payload);
      toast.success("Banner berhasil ditambahkan.");
    }

    onClose();

  } catch (error) {
    console.error(error);
    toast.error("Gagal menyimpan banner.");
  }
};




  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      {/* Modal */}
      <div className="flex w-full max-w-5xl max-h-[90vh] flex-col rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
  {hero ? "Edit Banner Hero" : "Tambah Banner Hero"}
</h2>

            <p className="mt-1 text-sm text-gray-500">
  Kelola banner Hero {page.charAt(0).toUpperCase() + page.slice(1)}.
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

            {/* Upload Banner */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Banner Hero
              </label>

              <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center">

                {preview ? (
  <img
    src={preview}
    alt="Preview"
    className="mx-auto h-56 rounded-xl object-cover"
  />
) : (
  <div className="text-5xl">🖼️</div>
)}

                <p className="mt-4 text-gray-600">
                  Upload gambar banner
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  JPG, PNG, WEBP (Maks. 5 MB)
                </p>

                <button
  type="button"
  onClick={() => fileInputRef.current?.click()}
  className="mt-6 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
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

            {/* Judul */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Judul
              </label>

              <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="Masukkan judul banner..."
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
/>
            </div>

            {/* Subjudul */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Subjudul
              </label>

              <input
  type="text"
  value={subtitle}
  onChange={(e) => setSubtitle(e.target.value)}
  placeholder="Masukkan subjudul..."
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
/>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Deskripsi
              </label>

              <textarea
  rows={4}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Masukkan deskripsi..."
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
/>
            </div>

            {page === "beranda" && ( <>
            {/* Garis Pemisah */}
<hr className="border-gray-200" />

{/* Tombol 1 */}
<div className="space-y-4">

  <h3 className="text-lg font-semibold text-gray-800">
    Tombol 1
  </h3>

  {/* Teks Tombol */}
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      Teks Tombol
    </label>

    <input
  type="text"
  value={button1Text}
  onChange={(e) => setButton1Text(e.target.value)}
  placeholder="Contoh: Jelajahi Desa"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
/>
  </div>

  {/* Tujuan */}
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      Tujuan Halaman
    </label>

    <select
  value={button1Link}
  onChange={(e) => setButton1Link(e.target.value)}
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
>
      <option value="">Pilih Halaman</option>
      <option value="/">Beranda</option>
      <option value="/potensi">Potensi</option>
      <option value="/kopi">Kopi Beji</option>
      <option value="/umkm">UMKM</option>
      <option value="/berita">Berita</option>
      <option value="/galeri">Galeri</option>
      <option value="/kontak">Kontak</option>
    </select>
  </div>

</div>

<hr className="border-gray-200" />

{/* Tombol 2 */}
<div className="space-y-4">

  <h3 className="text-lg font-semibold text-gray-800">
    Tombol 2
  </h3>

  {/* Teks Tombol */}
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      Teks Tombol
    </label>

    <input
  type="text"
  value={button2Text}
  onChange={(e) => setButton2Text(e.target.value)}
  placeholder="Contoh: Lihat UMKM"
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
/>
  </div>

  {/* Tujuan Halaman */}
  <div>
    <label className="mb-2 block text-sm font-semibold text-gray-700">
      Tujuan Halaman
    </label>

    <select
  value={button2Link}
  onChange={(e) => setButton2Link(e.target.value)}
  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
>
      <option value="">Pilih Halaman</option>
      <option value="/">Beranda</option>
      <option value="/potensi">Potensi</option>
      <option value="/kopi">Kopi Beji</option>
      <option value="/umkm">UMKM</option>
      <option value="/berita">Berita</option>
      <option value="/galeri">Galeri</option>
      <option value="/kontak">Kontak</option>
    </select>
  </div>

</div>
<hr className="border-gray-200" />
 </>
)}

{/* Status */}
<div className="space-y-4">

  <h3 className="text-lg font-semibold text-gray-800">
    Status Banner
  </h3>

  <div className="flex gap-8">

    <label className="flex items-center gap-2 cursor-pointer">
       <input
  type="radio"
  name="status"
  checked={isActive}
  onChange={() => setIsActive(true)}
/>
      <span>Aktif</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
    <input
  type="radio"
  name="status"
  checked={!isActive}
  onChange={() => setIsActive(false)}
/>
      <span>Nonaktif</span>
    </label>

  </div>

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
  {hero ? "Update" : "Simpan"}
</button>

        </div>

      </div>

    </div>
  );
}