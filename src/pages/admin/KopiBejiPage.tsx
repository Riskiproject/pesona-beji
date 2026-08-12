import { useEffect, useState } from "react";
import {
  getKopiBeji,
  updateKopiBeji,
  type KopiBeji,
} from "../../services/kopiService";

import {
  getPelakuKopi,
  deletePelakuKopi,
  type PelakuKopi,
} from "../../services/pelakuKopiService";

export default function KopiBejiPage() {
  const [kopi, setKopi] = useState<KopiBeji | null>(null);
  const [pelaku, setPelaku] = useState<PelakuKopi[]>([]);

  const [tentang, setTentang] = useState("");
  const [sejarah, setSejarah] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const [kopiData, pelakuData] = await Promise.all([
        getKopiBeji(),
        getPelakuKopi(),
      ]);

      setKopi(kopiData);
      setPelaku(pelakuData);

      if (kopiData) {
        setTentang(kopiData.tentang_deskripsi || "");
        setSejarah(kopiData.sejarah || "");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data Kopi Beji.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    if (!kopi) {
      alert("Data Kopi Beji belum tersedia.");
      return;
    }

    try {
      setSaving(true);

      await updateKopiBeji(kopi.id, {
        tentang_deskripsi: tentang,
        sejarah: sejarah,
      });

      alert("Informasi Kopi Beji berhasil disimpan.");

      await loadData();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, nama: string) => {
    const yakin = window.confirm(
      `Yakin ingin menghapus pelaku "${nama}"?`
    );

    if (!yakin) return;

    try {
      await deletePelakuKopi(id);

      alert("Pelaku berhasil dihapus.");

      await loadData();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus pelaku.");
    } 
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">
          Memuat data Kopi Beji...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Kopi Beji
        </h1>

        <p className="mt-2 text-gray-600">
          Kelola informasi Kopi Beji dan pelaku Kopi Beji.
        </p>
      </div>


      {/* INFORMASI KOPI BEJI */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Informasi Kopi Beji
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Informasi ini akan ditampilkan pada halaman Kopi Beji.
          </p>
        </div>


        {/* Tentang */}
        <div>
          <label className="mb-2 block font-semibold text-gray-800">
            Tentang Kopi Beji
          </label>

          <textarea
            value={tentang}
            onChange={(e) => setTentang(e.target.value)}
            rows={6}
            placeholder="Tuliskan informasi mengenai Kopi Beji..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>


        {/* Sejarah */}
        <div className="mt-6">
          <label className="mb-2 block font-semibold text-gray-800">
            Sejarah Singkat
          </label>

          <textarea
            value={sejarah}
            onChange={(e) => setSejarah(e.target.value)}
            rows={6}
            placeholder="Tuliskan sejarah singkat Kopi Beji..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>


        {/* Simpan */}
        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={saving || !kopi}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>

      </section>


      {/* PELAKU KOPI */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Pelaku Kopi Beji
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Kelola data pelaku yang terlibat dalam pengembangan Kopi Beji.
            </p>
          </div>

          <a
  href="/admin/kopi/tambah"
  className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
>
  + Tambah Pelaku
</a>

        </div>


        {/* Tabel */}
        <div className="mt-6 overflow-x-auto">

          <table className="w-full min-w-[700px] border-collapse">

            <thead>
              <tr className="border-b bg-gray-50 text-left">

                <th className="px-4 py-4 font-semibold text-gray-700">
                  Foto
                </th>

                <th className="px-4 py-4 font-semibold text-gray-700">
                  Nama Pelaku
                </th>

                <th className="px-4 py-4 font-semibold text-gray-700">
                  Produk
                </th>

                <th className="px-4 py-4 font-semibold text-gray-700">
                  Aksi
                </th>

              </tr>
            </thead>


            <tbody>

              {pelaku.length === 0 ? (

                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    Belum ada data pelaku Kopi Beji.
                  </td>
                </tr>

              ) : (

                pelaku.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b last:border-b-0"
                  >

                    {/* Foto */}
                    <td className="px-4 py-4">

                      {item.foto_url ? (
                        <img
                          src={item.foto_url}
                          alt={item.nama_pelaku}
                          className="h-16 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                          No Foto
                        </div>
                      )}

                    </td>


                    {/* Nama */}
                    <td className="px-4 py-4">

                      <p className="font-semibold text-gray-900">
                        {item.nama_pelaku}
                      </p>

                    </td>


                    {/* Produk */}
                    <td className="px-4 py-4">

                      <p className="max-w-xs text-sm leading-6 text-gray-600">
                        {item.produk || "-"}
                      </p>

                    </td>


                    {/* Aksi */}
                    <td className="px-4 py-4">

                      <div className="flex flex-wrap gap-2">

                        <a
                          href={`/admin/kopi-beji/edit/${item.id}`}
                          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                          Edit
                        </a>

                        <button
                          onClick={() =>
                            handleDelete(
                              item.id,
                              item.nama_pelaku
                            )
                          }
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                          Hapus
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}