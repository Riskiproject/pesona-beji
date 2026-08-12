import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getBerita,
  deleteBerita,
} from "../../services/beritaService";

import BeritaModal from "../../components/admin/BeritaModal";

export default function BeritaPage() {

  const [berita, setBerita] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedBerita, setSelectedBerita] =
    useState<any>(null);

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    try {

      setLoading(true);

      const data =
        await getBerita();

      setBerita(data || []);

    } catch (error) {

      console.error(error);

      toast.error(
        "Gagal memuat data."
      );

    } finally {

      setLoading(false);

    }

  }

  async function handleDelete(
    id: string
  ) {

    if (
      !confirm("Hapus berita ini?")
    ) return;

    try {

      await deleteBerita(id);

      toast.success(
        "Berita berhasil dihapus."
      );

      loadData();

    } catch (error) {

      console.error(error);

      toast.error(
        "Gagal menghapus."
      );

    }

  }

  return (

    <div className="space-y-6">

  <div className="flex items-center justify-between">

    <div>

      <h1 className="text-3xl font-bold">
        Berita Desa
      </h1>

      <p className="text-gray-500">
        Kelola seluruh berita Desa Beji.
      </p>

    </div>

    <button
      onClick={() => {

        setSelectedBerita(null);

        setOpenModal(true);

      }}
      className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
    >
      + Tambah Berita
    </button>

  </div>

  <div className="overflow-hidden rounded-2xl bg-white shadow">

    <table className="w-full">

      <thead className="bg-gray-100">

        <tr>

          <th className="p-4 text-left">
            Cover
          </th>

          <th className="p-4 text-left">
            Judul
          </th>

          <th className="p-4 text-left">
            Publish
          </th>

          <th className="p-4 text-left">
            Status
          </th>

          <th className="p-4 text-left">
            Aksi
          </th>

        </tr>

      </thead>

      <tbody>

        {loading ? (

          <tr>

            <td
              colSpan={6}
              className="p-10 text-center"
            >
              Memuat...
            </td>

          </tr>

        ) : berita.length === 0 ? (

          <tr>

            <td
              colSpan={6}
              className="p-10 text-center"
            >
              Belum ada data.
            </td>

          </tr>

        ) : (

            berita.map((item) => (

  <tr
    key={item.id}
    className="border-t"
  >

    <td className="p-4">

      <img
        src={item.gambar}
        alt={item.judul}
        className="h-16 w-24 rounded-lg object-cover"
      />

    </td>

    <td className="p-4">

      <p className="font-semibold">
        {item.judul}
      </p>

    </td>

    <td className="p-4">

      {new Date(
        item.tanggal_publish
      ).toLocaleDateString("id-ID")}

    </td>

    <td className="p-4">

      {item.is_active ? (

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

          Aktif

        </span>

      ) : (

        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">

          Nonaktif

        </span>

      )}

    </td>

    <td className="space-x-2 p-4">

      <button
        onClick={() => {

          setSelectedBerita(item);

          setOpenModal(true);

        }}
        className="rounded bg-blue-600 px-3 py-1 text-white"
      >
        Edit
      </button>

      <button
        onClick={() =>
          handleDelete(item.id)
        }
        className="rounded bg-red-600 px-3 py-1 text-white"
      >
        Hapus
      </button>

    </td>

  </tr>

))

        )}

      </tbody>

    </table>

  </div>

  <BeritaModal
    isOpen={openModal}
    onClose={() => {

      setOpenModal(false);

      loadData();

    }}
    berita={selectedBerita}
  />

</div>

);

} 