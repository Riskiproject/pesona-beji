import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TentangDesaModal from "../../components/admin/TentangDesaModal";

import { getTentangDesa } from "../../services/tentangDesaService";

export default function TentangDesaPage() {
  const [tentang, setTentang] = useState<any>(null);
const [loading, setLoading] = useState(true);

const [openModal, setOpenModal] = useState(false);

const loadData = async () => {
  try {
    const data = await getTentangDesa();
    setTentang(data);
  } catch {
    setTentang(null);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadData();
}, []);

if (loading) {
  return (
    <div className="p-10 text-center">
      Memuat data...
    </div>
  );
}

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>

          <Link
            to="/admin/dashboard"
            className="text-sm text-green-600 hover:underline"
          >
            ← Kembali
          </Link>

          <h1 className="mt-2 text-3xl font-bold text-gray-800">
            Tentang Desa
          </h1>

          <p className="mt-2 text-gray-500">
            Kelola section "Mengenal Desa Beji" yang tampil pada halaman Beranda.
          </p>

        </div>

        {tentang && (
          <button
  onClick={() => setOpenModal(true)}
  className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
>
  Edit Konten
</button>
        )}

      </div>

      {!tentang ? (

        <div className="rounded-2xl border border-dashed bg-white py-20 text-center">

          <div className="text-6xl">
            📄
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">
            Belum Ada Konten
          </h2>

          <p className="mt-3 text-gray-500">
            Silakan tambahkan konten pertama untuk section Mengenal Desa Beji.
          </p>

          <button
  onClick={() => setOpenModal(true)}
  className="mt-8 rounded-xl bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
>
  + Tambah Konten
</button>

        </div>

      ) : (

        <div className="rounded-2xl bg-white p-8 shadow">

         <div className="space-y-4">

  <img
    src={tentang.image_url}
    alt={tentang.title}
    className="h-72 w-full rounded-xl object-cover"
  />

  <h2 className="text-3xl font-bold">
    {tentang.title}
  </h2>

  <p className="text-gray-600">
    {tentang.description}
  </p>

</div>

        </div>

      )}

      <TentangDesaModal
  isOpen={openModal}
  tentang={tentang}
  onClose={() => {
    setOpenModal(false);
    loadData();
  }}
/>

    </div>
  );
}