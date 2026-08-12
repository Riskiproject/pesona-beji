import { useEffect, useState } from "react";

import {
  getAllKontak,
  createKontak,
  updateKontak,
} from "../../services/kontakService";

type Kontak = {
  id: string;
  nama_instansi: string;
  alamat: string | null;
  email: string | null;
  telepon: string | null;
  whatsapp: string | null;
  maps_url: string | null;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
  tiktok: string | null;
  jam_operasional: string | null;
  is_active: boolean;
};

const emptyForm = {
  nama_instansi: "",
  alamat: "",
  email: "",
  telepon: "",
  whatsapp: "",
  maps_url: "",
  facebook: "",
  instagram: "",
  youtube: "",
  tiktok: "",
  jam_operasional: "",
  is_active: true,
};

export default function KontakPage() {
  const [kontak, setKontak] = useState<Kontak[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
const [editingId, setEditingId] = useState<string | null>(null);

const [form, setForm] = useState(emptyForm);

const [toast, setToast] = useState<string | null>(null);

  

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const data = await getAllKontak();

      setKontak(data || []);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data kontak");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function showToast(message: string) {
  setToast(message);

  setTimeout(() => {
    setToast(null);
  }, 3000);
}

  function openTambah() {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEdit(item: Kontak) {
    setEditingId(item.id);

    setForm({
      nama_instansi: item.nama_instansi || "",
      alamat: item.alamat || "",
      email: item.email || "",
      telepon: item.telepon || "",
      whatsapp: item.whatsapp || "",
      maps_url: item.maps_url || "",
      facebook: item.facebook || "",
      instagram: item.instagram || "",
      youtube: item.youtube || "",
      tiktok: item.tiktok || "",
      jam_operasional: item.jam_operasional || "",
      is_active: item.is_active ?? true,
    });

    setShowModal(true);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      if (!form.nama_instansi.trim()) {
        alert("Nama instansi wajib diisi");
        return;
      }

      if (editingId) {
        await updateKontak(editingId, form);
      } else {
        await createKontak(form);
      }

      const isEditing = !!editingId;

setShowModal(false);
setEditingId(null);
setForm(emptyForm);

await loadData();

showToast(
  isEditing
    ? "Kontak berhasil diperbarui"
    : "Kontak berhasil ditambahkan"
);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan kontak");
    }
  }

  async function toggleStatus(item: Kontak) {
    try {
      await updateKontak(item.id, {
        is_active: !item.is_active,
      });

      await loadData();
    } catch (error) {
      console.error(error);
      alert("Gagal mengubah status");
    }
  }

  return (
    <div className="p-6">

        {toast && (
  <div className="fixed right-6 top-6 z-[100] flex items-center gap-3 rounded-xl bg-green-600 px-5 py-4 text-white shadow-lg">
    <span className="text-xl">✓</span>

    <span className="font-semibold">
      {toast}
    </span>
  </div>
)}

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Kontak
          </h1>

          <p className="mt-2 text-gray-500">
            Kelola informasi kontak dan media sosial Pesona Beji.
          </p>
        </div>

        {kontak.length === 0 ? (
  <button
    onClick={openTambah}
    className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
  >
    + Tambah Kontak
  </button>
) : (
  <button
    onClick={() => openEdit(kontak[0])}
    className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
  >
    ✏️ Edit Kontak
  </button>
)}

      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border bg-white p-10 text-center">
          Memuat data...
        </div>
      )}

      {/* Empty */}
      {!loading && kontak.length === 0 && (
        <div className="rounded-2xl border bg-white p-12 text-center">

          <div className="text-5xl">
            📞
          </div>

          <h2 className="mt-4 text-xl font-bold">
            Belum ada data kontak
          </h2>

          <p className="mt-2 text-gray-500">
            Tambahkan informasi kontak Pesona Beji.
          </p>

          <button
            onClick={openTambah}
            className="mt-6 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white"
          >
            + Tambah Kontak
          </button>

        </div>
      )}

      {/* Detail Kontak */}
{!loading && kontak.length > 0 && (
  <div className="space-y-6">

    {kontak.map((item) => (
      <div
        key={item.id}
        className="rounded-2xl border bg-white shadow-sm"
      >

        {/* Header Card */}
        <div className="flex flex-col gap-4 border-b px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {item.nama_instansi}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Informasi kontak Pesona Beji
            </p>
          </div>

          <button
            onClick={() => openEdit(item)}
            className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 sm:w-auto"
          >
            ✏️ Edit Kontak
          </button>

        </div>

        {/* Informasi */}
        <div className="divide-y">

          {/* Alamat */}
          <div className="px-6 py-5">
            <p className="text-sm font-semibold text-gray-500">
              📍 Alamat
            </p>

            <p className="mt-2 leading-7 text-gray-900">
              {item.alamat || "-"}
            </p>
          </div>

          {/* Telepon */}
          <div className="px-6 py-5">
            <p className="text-sm font-semibold text-gray-500">
              📞 Telepon
            </p>

            <p className="mt-2 text-gray-900">
              {item.telepon || "-"}
            </p>
          </div>

          {/* WhatsApp */}
          <div className="px-6 py-5">
            <p className="text-sm font-semibold text-gray-500">
              💬 WhatsApp
            </p>

            <p className="mt-2 text-gray-900">
              {item.whatsapp || "-"}
            </p>
          </div>

          {/* Email */}
          <div className="px-6 py-5">
            <p className="text-sm font-semibold text-gray-500">
              ✉️ Email
            </p>

            <p className="mt-2 break-all text-gray-900">
              {item.email || "-"}
            </p>
          </div>

          {/* Jam Operasional */}
          <div className="px-6 py-5">
            <p className="text-sm font-semibold text-gray-500">
              🕐 Jam Operasional
            </p>

            <p className="mt-2 text-gray-900">
              {item.jam_operasional || "-"}
            </p>
          </div>

          {/* Google Maps */}
          <div className="px-6 py-5">
            <p className="text-sm font-semibold text-gray-500">
              🗺️ Google Maps
            </p>

            {item.maps_url ? (
              <a
                href={item.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-medium text-green-600 hover:underline"
              >
                Lihat lokasi di Google Maps →
              </a>
            ) : (
              <p className="mt-2 text-gray-900">
                -
              </p>
            )}
          </div>

          {/* Media Sosial */}
          <div className="px-6 py-5">

            <p className="text-sm font-semibold text-gray-500">
              📱 Media Sosial
            </p>

            <div className="mt-3 flex flex-wrap gap-3">

              {item.instagram && (
                <a
                  href={item.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-green-50"
                >
                  Instagram
                </a>
              )}

              {item.facebook && (
                <a
                  href={item.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-green-50"
                >
                  Facebook
                </a>
              )}

              {item.youtube && (
                <a
                  href={item.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-green-50"
                >
                  YouTube
                </a>
              )}

              {item.tiktok && (
                <a
                  href={item.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-green-50"
                >
                  TikTok
                </a>
              )}

              {!item.instagram &&
                !item.facebook &&
                !item.youtube &&
                !item.tiktok && (
                  <span className="text-gray-500">
                    Belum ada media sosial
                  </span>
                )}

            </div>

          </div>

          {/* Status */}
          <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold text-gray-500">
                Status Publik
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Tentukan apakah kontak ditampilkan di halaman publik.
              </p>
            </div>

            <button
              onClick={() => toggleStatus(item)}
              className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                item.is_active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {item.is_active ? "● Aktif" : "● Nonaktif"}
            </button>

          </div>

        </div>

      </div>
    ))}

  </div>
)}

      {/* Modal */}
      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-5">

              <div>
                <h2 className="text-2xl font-bold">
                  {editingId
                    ? "Edit Kontak"
                    : "Tambah Kontak"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Informasi yang ditampilkan pada halaman Kontak.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >

              {/* Informasi Utama */}
              <div>

                <h3 className="mb-4 text-lg font-bold">
                  Informasi Utama
                </h3>

                <div className="grid gap-5 md:grid-cols-2">

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold">
                      Nama Instansi
                    </label>

                    <input
                      name="nama_instansi"
                      value={form.nama_instansi}
                      onChange={handleChange}
                      placeholder="Contoh: Pesona Beji"
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold">
                      Alamat
                    </label>

                    <textarea
                      name="alamat"
                      value={form.alamat}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Alamat lengkap"
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Telepon
                    </label>

                    <input
                      name="telepon"
                      value={form.telepon}
                      onChange={handleChange}
                      placeholder="+62..."
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      WhatsApp
                    </label>

                    <input
                      name="whatsapp"
                      value={form.whatsapp}
                      onChange={handleChange}
                      placeholder="+62..."
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Jam Operasional
                    </label>

                    <input
                      name="jam_operasional"
                      value={form.jam_operasional}
                      onChange={handleChange}
                      placeholder="Senin - Jumat, 08.00 - 15.00"
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                </div>

              </div>

              {/* Maps */}
              <div className="border-t pt-6">

                <h3 className="mb-4 text-lg font-bold">
                  Lokasi
                </h3>

                <label className="mb-2 block text-sm font-semibold">
                  Google Maps URL
                </label>

                <input
                  name="maps_url"
                  value={form.maps_url}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                />

              </div>

              {/* Sosial Media */}
              <div className="border-t pt-6">

                <h3 className="mb-4 text-lg font-bold">
                  Media Sosial
                </h3>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Instagram
                    </label>

                    <input
                      name="instagram"
                      value={form.instagram}
                      onChange={handleChange}
                      placeholder="https://instagram.com/..."
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Facebook
                    </label>

                    <input
                      name="facebook"
                      value={form.facebook}
                      onChange={handleChange}
                      placeholder="https://facebook.com/..."
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      YouTube
                    </label>

                    <input
                      name="youtube"
                      value={form.youtube}
                      onChange={handleChange}
                      placeholder="https://youtube.com/..."
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      TikTok
                    </label>

                    <input
                      name="tiktok"
                      value={form.tiktok}
                      onChange={handleChange}
                      placeholder="https://tiktok.com/@..."
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
                    />
                  </div>

                </div>

              </div>

              {/* Status */}
              <div className="border-t pt-6">

                <label className="flex cursor-pointer items-center gap-3">

                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }))
                    }
                    className="h-5 w-5"
                  />

                  <span className="font-semibold">
                    Tampilkan kontak di halaman publik
                  </span>

                </label>

              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t pt-6">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border px-5 py-3 font-semibold"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                >
                  {editingId
                    ? "Simpan Perubahan"
                    : "Simpan Kontak"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}