import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getUmkm,
  deleteUmkm,
} from "../../services/umkmService";

import UmkmModal from "../../components/admin/UmkmModal";

export default function UmkmPage() {
  const [umkm, setUmkm] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedUmkm, setSelectedUmkm] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const data = await getUmkm();

      setUmkm(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus UMKM ini?")) return;

    try {
      await deleteUmkm(id);

      toast.success("UMKM berhasil dihapus.");

      loadData();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus.");
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            UMKM Desa
          </h1>

          <p className="text-gray-500">
            Kelola seluruh UMKM Desa Beji.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedUmkm(null);
            setOpenModal(true);
          }}
          className="rounded-xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          + Tambah UMKM
        </button>

      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Gambar
              </th>

              <th className="p-4 text-left">
                Nama UMKM
              </th>

              <th className="p-4 text-left">
                Pemilik
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
                  colSpan={5}
                  className="p-10 text-center"
                >
                  Memuat...
                </td>
 
              </tr>

            ) : umkm.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="p-10 text-center"
                >
                  Belum ada data.
                </td>

              </tr>

            ) : (

              umkm.map((item) => (

                <tr
                  key={item.id}
                  className="border-t"
                >

                  <td className="p-4">

                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-16 w-24 rounded-lg object-cover"
                    />

                  </td>

                  <td className="p-4 font-semibold">
                    {item.title}
                  </td>

                  <td className="p-4">
                    {item.owner}
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
    setSelectedUmkm(item);
    setOpenModal(true);
  }}
  className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
>
  Edit
</button>

<button
  onClick={() => handleDelete(item.id)}
  className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
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

<UmkmModal
  isOpen={openModal}
  onClose={() => {
    setOpenModal(false);
    loadData();
  }}
  umkm={selectedUmkm}
/>

</div>

);
}