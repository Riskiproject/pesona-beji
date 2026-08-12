import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  createPelakuKopi,
  generatePelakuKopiSlug,
  getPelakuKopi,
  updatePelakuKopi,
  uploadFotoPelakuKopi,
  uploadGaleriPelakuKopi,
} from "../../services/pelakuKopiService";

export default function PelakuKopiFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [nama, setNama] = useState("");
  const [deskripsiSingkat, setDeskripsiSingkat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [produk, setProduk] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [lokasiUrl, setLokasiUrl] = useState("");

  const [fotoUrl, setFotoUrl] = useState<string | null>(null);
  const [galeri, setGaleri] = useState<string[]>([]);

  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [galeriFiles, setGaleriFiles] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEdit);

  useEffect(() => {
    if (!id) {
      setLoadingData(false);
      return;
    }

    const loadPelaku = async () => {
      try {
        const data = await getPelakuKopi();

        const item = data.find((pelaku) => pelaku.id === id);

        if (!item) {
          alert("Data pelaku tidak ditemukan.");
          navigate("/admin/kopi");
          return;
        }

        setNama(item.nama_pelaku);
        setDeskripsiSingkat(item.deskripsi_singkat || "");
        setDeskripsi(item.deskripsi || "");
        setProduk(item.produk || "");
        setWhatsapp(item.whatsapp || "");
        setLokasiUrl(item.lokasi_url || "");

        setFotoUrl(item.foto_url);
        setGaleri(item.galeri || []);
      } catch (error) {
        console.error(error);
        alert("Gagal mengambil data pelaku.");
      } finally {
        setLoadingData(false);
      }
    };

    loadPelaku();
  }, [id, navigate]);

  const handleFotoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFotoFile(file);
  };

  const handleGaleriChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    setGaleriFiles(files);
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!nama.trim()) {
      alert("Nama pelaku wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      let finalFotoUrl = fotoUrl;

      // Upload foto utama jika ada foto baru
      if (fotoFile) {
        finalFotoUrl = await uploadFotoPelakuKopi(
          fotoFile
        );
      }

      // Upload foto galeri baru
      let finalGaleri = [...galeri];

      if (galeriFiles.length > 0) {
        const uploadedGaleri = await Promise.all(
          galeriFiles.map((file) =>
            uploadGaleriPelakuKopi(file)
          )
        );

        finalGaleri = [
          ...finalGaleri,
          ...uploadedGaleri,
        ];
      }

      const slug = generatePelakuKopiSlug(nama);

      const data = {
        nama_pelaku: nama,
        foto_url: finalFotoUrl,
        deskripsi_singkat: deskripsiSingkat,
        deskripsi,
        produk,
        whatsapp,
        lokasi_url: lokasiUrl,
        slug,
        galeri: finalGaleri,
      };

      if (isEdit && id) {
        await updatePelakuKopi(id, data);

        alert("Data pelaku berhasil diperbarui.");
      } else {
        await createPelakuKopi(data);

        alert("Pelaku Kopi berhasil ditambahkan.");
      }

      navigate("/admin/kopi");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data pelaku.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="p-6">
        <p className="text-gray-600">
          Memuat data pelaku...
        </p>
      </div>
    );
  }

  return (
  <div className="space-y-8 px-6 pb-6 pt-0">

      {/* Header */}
      <div>
      <Link
  to="/admin/kopi"
  className="inline-flex items-center text-sm font-medium text-green-700 hover:text-green-800"
>
  ← Kembali
</Link>

        <h1 className="mt-5 text-3xl font-bold text-gray-900">
          {isEdit
            ? "Edit Pelaku Kopi"
            : "Tambah Pelaku Kopi"}
        </h1>

        <p className="mt-2 text-gray-600">
          Kelola informasi pelaku Kopi Beji.
        </p>
      </div>


      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Informasi Pelaku */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-2xl font-bold text-gray-900">
            Informasi Pelaku
          </h2>

          <div className="mt-6 space-y-6">

            {/* Foto */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Foto Pelaku
              </label>

              {fotoUrl && (
                <img
                  src={fotoUrl}
                  alt={nama || "Foto pelaku"}
                  className="mb-4 h-48 w-64 rounded-xl object-cover"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="block w-full rounded-xl border border-gray-300 p-3"
              />

              {fotoFile && (
                <p className="mt-2 text-sm text-gray-500">
                  Foto baru: {fotoFile.name}
                </p>
              )}
            </div>


            {/* Nama */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Nama Pelaku
              </label>

              <input
                type="text"
                value={nama}
                onChange={(e) =>
                  setNama(e.target.value)
                }
                placeholder="Contoh: Pak Suroto"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>


            {/* Deskripsi Singkat */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Deskripsi Singkat
              </label>

              <textarea
                value={deskripsiSingkat}
                onChange={(e) =>
                  setDeskripsiSingkat(e.target.value)
                }
                rows={4}
                placeholder="Deskripsi singkat yang tampil pada kartu pelaku."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>


            {/* Deskripsi Lengkap */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Deskripsi Lengkap
              </label>

              <textarea
                value={deskripsi}
                onChange={(e) =>
                  setDeskripsi(e.target.value)
                }
                rows={7}
                placeholder="Ceritakan perjalanan, aktivitas, dan peran pelaku dalam pengembangan Kopi Beji."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>


            {/* Produk */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Produk yang Dihasilkan
              </label>

              <textarea
                value={produk}
                onChange={(e) =>
                  setProduk(e.target.value)
                }
                rows={5}
                placeholder="Contoh: Kopi Beji yang dihasilkan berupa bubuk kopi yang telah dikemas menggunakan brand sendiri dan siap dipasarkan kepada konsumen."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />

              <p className="mt-2 text-sm text-gray-500">
                Isi dengan keterangan/penjelasan produk,
                bukan daftar produk.
              </p>
            </div>

          </div>
        </section>


        {/* Kontak */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-2xl font-bold text-gray-900">
            Kontak Pelaku
          </h2>

          <div className="mt-6 space-y-6">

            {/* WhatsApp */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Nomor WhatsApp
              </label>

              <input
                type="text"
                value={whatsapp}
                onChange={(e) =>
                  setWhatsapp(e.target.value)
                }
                placeholder="Contoh: 628123456789"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>


            {/* Lokasi */}
            <div>
              <label className="mb-2 block font-semibold text-gray-800">
                Link Lokasi
              </label>

              <input
                type="url"
                value={lokasiUrl}
                onChange={(e) =>
                  setLokasiUrl(e.target.value)
                }
                placeholder="https://maps.google.com/..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

          </div>
        </section>


        {/* Galeri */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-2xl font-bold text-gray-900">
            Galeri
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Foto produk, proses pengolahan, pelaku,
            dan aktivitas Kopi Beji dapat dimasukkan di sini.
          </p>


          {/* Galeri lama */}
          {galeri.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">

              {galeri.map((foto, index) => (
                <div
                  key={`${foto}-${index}`}
                  className="overflow-hidden rounded-xl border"
                >
                  <img
                    src={foto}
                    alt={`Galeri ${index + 1}`}
                    className="h-40 w-full object-cover"
                  />
                </div>
              ))}

            </div>
          )}


          {/* Upload */}
          <div className="mt-6">

            <label className="mb-2 block font-semibold text-gray-800">
              Tambah Foto Galeri
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGaleriChange}
              className="block w-full rounded-xl border border-gray-300 p-3"
            />

            {galeriFiles.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {galeriFiles.length} foto dipilih.
              </p>
            )}

          </div>

        </section>


        {/* Tombol */}
        <div className="flex flex-wrap justify-end gap-3">

          <Link
            to="/admin/kopi"
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Batal
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Menyimpan..."
              : isEdit
              ? "Simpan Perubahan"
              : "Simpan Pelaku"}
          </button>

        </div>

      </form>
    </div>
  );
}