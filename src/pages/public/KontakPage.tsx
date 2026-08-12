import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getAllKontak } from "../../services/kontakService";

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

export default function KontakPage() {
  const [kontak, setKontak] = useState<Kontak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadKontak();
  }, []);

  async function loadKontak() {
    try {
      const data = await getAllKontak();

      const activeKontak = data?.find(
        (item: Kontak) => item.is_active
      );

      setKontak(activeKontak || null);
    } catch (error) {
      console.error("Gagal mengambil data kontak:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-7xl px-5 pt-28 pb-16">

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          📞 Hubungi Kami
        </span>

        <h1 className="mt-6 text-5xl font-bold text-gray-900">
          Kontak Pesona Beji
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
          Hubungi kami untuk memperoleh informasi mengenai Desa Beji,
          potensi desa, UMKM, Kopi Beji, maupun kegiatan yang ada di Desa Beji.
        </p>

      </section>

      {/* Loading */}
      {loading ? (
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <div className="rounded-2xl border p-10 text-center text-gray-500">
            Memuat informasi kontak...
          </div>
        </section>
      ) : !kontak ? (
        <section className="mx-auto max-w-7xl px-5 pb-20">
          <div className="rounded-2xl border p-10 text-center text-gray-500">
            Informasi kontak belum tersedia.
          </div>
        </section>
      ) : (

        /* Informasi Kontak */
        <section className="mx-auto max-w-7xl px-5 pb-20">

          <div className="grid gap-10 lg:grid-cols-2">

            {/* Informasi */}
            <div className="space-y-6">

              {/* Alamat */}
              <div className="rounded-2xl border p-6 shadow-sm">

                <h2 className="text-xl font-bold">
                  📍 Alamat
                </h2>

                <p className="mt-3 text-gray-600 leading-7">
                  {kontak.alamat || "-"}
                </p>

              </div>

              {/* Telepon */}
              <div className="rounded-2xl border p-6 shadow-sm">

                <h2 className="text-xl font-bold">
                  📞 Telepon
                </h2>

                {kontak.telepon ? (
                  <a
                    href={`tel:${kontak.telepon}`}
                    className="mt-3 inline-block text-gray-600 hover:text-green-600"
                  >
                    {kontak.telepon}
                  </a>
                ) : (
                  <p className="mt-3 text-gray-600">
                    -
                  </p>
                )}

              </div>

              {/* WhatsApp */}
              <div className="rounded-2xl border p-6 shadow-sm">

                <h2 className="text-xl font-bold">
                  💬 WhatsApp
                </h2>

                {kontak.whatsapp ? (
                  <a
                    href={`https://wa.me/${kontak.whatsapp.replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-gray-600 hover:text-green-600"
                  >
                    {kontak.whatsapp}
                  </a>
                ) : (
                  <p className="mt-3 text-gray-600">
                    -
                  </p>
                )}

              </div>

              {/* Email */}
              <div className="rounded-2xl border p-6 shadow-sm">

                <h2 className="text-xl font-bold">
                  ✉ Email
                </h2>

                {kontak.email ? (
                  <a
                    href={`mailto:${kontak.email}`}
                    className="mt-3 inline-block break-all text-gray-600 hover:text-green-600"
                  >
                    {kontak.email}
                  </a>
                ) : (
                  <p className="mt-3 text-gray-600">
                    -
                  </p>
                )}

              </div>

              {/* Jam Operasional */}
              {kontak.jam_operasional && (
                <div className="rounded-2xl border p-6 shadow-sm">

                  <h2 className="text-xl font-bold">
                    🕐 Jam Operasional
                  </h2>

                  <p className="mt-3 text-gray-600">
                    {kontak.jam_operasional}
                  </p>

                </div>
              )}

            </div>

            {/* Google Maps & Sosial Media */}
            <div className="space-y-6">

              {/* Google Maps */}
              <div className="overflow-hidden rounded-2xl border shadow-sm">

                {kontak.maps_url ? (
  <iframe
    title={`Lokasi ${kontak.nama_instansi}`}
    src={kontak.maps_url}
    width="100%"
    height="400"
    loading="lazy"
    className="border-0"
  />
) : (
                  <div className="flex h-[400px] items-center justify-center text-gray-500">
                    Lokasi belum tersedia.
                  </div>
                )}

              </div>

              {/* Sosial Media */}
              <div className="rounded-2xl border p-6 shadow-sm">

                <h2 className="text-2xl font-bold">
                  Ikuti Kami
                </h2>

                <p className="mt-3 text-gray-600">
                  Dapatkan informasi terbaru melalui media sosial Pesona Beji.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">

                  {kontak.instagram && (
                    <a
                      href={kontak.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border px-5 py-3 transition hover:bg-green-600 hover:text-white"
                    >
                      📷 Instagram
                    </a>
                  )}

                  {kontak.facebook && (
                    <a
                      href={kontak.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border px-5 py-3 transition hover:bg-green-600 hover:text-white"
                    >
                      📘 Facebook
                    </a>
                  )}

                  {kontak.youtube && (
                    <a
                      href={kontak.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border px-5 py-3 transition hover:bg-green-600 hover:text-white"
                    >
                      ▶ YouTube
                    </a>
                  )}

                  {kontak.tiktok && (
                    <a
                      href={kontak.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border px-5 py-3 transition hover:bg-green-600 hover:text-white"
                    >
                      🎵 TikTok
                    </a>
                  )}

                  {!kontak.instagram &&
                    !kontak.facebook &&
                    !kontak.youtube &&
                    !kontak.tiktok && (
                      <p className="text-gray-500">
                        Media sosial belum tersedia.
                      </p>
                    )}

                </div>

              </div>

            </div>

          </div>

        </section>
      )}

      <Footer />
    </>
  );
}