import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllHero,deleteHero } from "../../../services/heroService";
import HeroBannerModal from "../../../components/admin/HeroBannerModal";
import toast from "react-hot-toast";

export default function HeroPotensiPage() {

  const [openModal, setOpenModal] = useState(false);
  const [selectedHero, setSelectedHero] = useState<any>(null);
  const [banners, setBanners] = useState<any[]>([]);

const loadBanners = async () => {
  try {
    const data = await getAllHero("potensi");
    setBanners(data || []);
  } catch (err) {
    console.error(err);
  }
};

const handleDelete = async (id: string) => {
  const yakin = window.confirm(
    "Yakin ingin menghapus banner ini?"
  );

  if (!yakin) return;

  try {
    await deleteHero(id);

    toast.success("Banner berhasil dihapus.");

    loadBanners();
  } catch (err) {
    console.error(err);

    toast.error("Gagal menghapus banner.");
  }
};

useEffect(() => {
  loadBanners();
}, []);
  
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <Link
            to="/admin/hero"
            className="text-sm text-green-600 hover:underline"
          >
            ← Kembali
          </Link>

          <h1 className="mt-2 text-3xl font-bold text-gray-800">
            Hero Potensi
          </h1>

          <p className="mt-2 text-gray-500">
            Kelola banner yang tampil pada halaman Potensi.
          </p>

        </div>

        {banners.length === 0 && (
  <button
    onClick={() => setOpenModal(true)}
    className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
  >
    + Tambah Banner
  </button>
)}

      </div>

      {banners.length === 0 ? (

  <div className="rounded-2xl border border-dashed bg-white py-20 text-center">

    <div className="text-6xl">
      🖼️
    </div>

    <h2 className="mt-6 text-2xl font-semibold text-gray-800">
      Belum Ada Banner
    </h2>

    <p className="mt-3 text-gray-500">
      Silakan tambahkan banner pertama untuk Hero Potensi.
    </p>

    <button
      onClick={() => {
  setSelectedHero(null);
  setOpenModal(true);
}}
      className="mt-8 rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
    >
      + Tambah Banner
    </button>

  </div>

) : (

  <div className="overflow-hidden rounded-2xl bg-white shadow">

    <table className="min-w-full">

      <thead className="bg-gray-100">

        <tr>

          <th className="px-6 py-4 text-left">
            Banner
          </th>

          <th className="px-6 py-4 text-left">
            Judul
          </th>

          <th className="px-6 py-4 text-left">
            Status
          </th>

          <th className="px-6 py-4 text-center">
            Aksi
          </th>

        </tr>

      </thead>

      <tbody>

        {banners.map((banner) => (

          <tr
            key={banner.id}
            className="border-t"
          >

            <td className="px-6 py-4">

              <img
                src={banner.image_url}
                alt={banner.title}
                className="h-16 w-32 rounded-lg object-cover"
              />

            </td>

            <td className="px-6 py-4 font-medium">
              {banner.title}
            </td>

            <td className="px-6 py-4">

              {banner.is_active ? (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Aktif
                </span>
              ) : (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                  Nonaktif
                </span>
              )}

            </td>

            <td className="px-6 py-4 text-center">

              <button
  onClick={() => {
    setSelectedHero(banner);
    setOpenModal(true);
  }}
  className="mr-2 rounded-lg bg-yellow-500 px-3 py-2 text-white"
>
  Edit
</button>

              <button
  onClick={() => handleDelete(banner.id)}
  className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
>
  Hapus
</button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

)}
<HeroBannerModal
  isOpen={openModal}
  hero={selectedHero}
  page= "potensi"
  onClose={() => {
    setOpenModal(false);
    setSelectedHero(null);
    loadBanners();
  }}
/>
    </div>
  );
}