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

  function formatWhatsAppNumber(phone: string) {
  if (!phone) return "";

  let number = phone.replace(/\D/g, "");

  if (number.startsWith("0")) {
    number = "62" + number.slice(1);
  }

  return number;
}

  return (
    <>
      <Navbar />

      <main className="bg-[#F8F3E7]">

        {/* =========================
            HEADER
        ========================= */}
        <section className="mx-auto max-w-7xl px-5 pt-24 pb-10 sm:pt-28 sm:pb-16">

          <span className="inline-block rounded-full bg-[#E5F1D8] px-4 py-2 text-sm font-semibold text-green-700">
            📞 Hubungi Kami
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:mt-6 sm:text-5xl">
            Kontak Pesona Beji
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">
            Hubungi kami untuk memperoleh informasi mengenai Desa Beji,
            potensi desa, UMKM, Kopi Beji, maupun kegiatan yang ada di Desa Beji.
          </p>

        </section>

        {/* =========================
            LOADING
        ========================= */}
        {loading ? (
          <section className="mx-auto max-w-7xl px-5 pb-16 sm:pb-20">
            <div className="rounded-3xl bg-[#FFFDF8] p-8 text-center text-gray-500 shadow-sm ring-1 ring-[#E9E1D2] sm:p-10">
              Memuat informasi kontak...
            </div>
          </section>
        ) : !kontak ? (
          <section className="mx-auto max-w-7xl px-5 pb-16 sm:pb-20">
            <div className="rounded-3xl bg-[#FFFDF8] p-8 text-center text-gray-500 shadow-sm ring-1 ring-[#E9E1D2] sm:p-10">
              Informasi kontak belum tersedia.
            </div>
          </section>
        ) : (

          /* =========================
             INFORMASI KONTAK
          ========================= */
          <section className="mx-auto max-w-7xl px-5 pb-16 sm:pb-20">

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">

              {/* =========================
                  KOLOM KIRI
              ========================= */}
              <div className="space-y-4 sm:space-y-6">

                {/* Alamat */}
                <div className="rounded-3xl bg-[#FFFDF8] p-5 shadow-sm ring-1 ring-[#E9E1D2] transition hover:-translate-y-1 hover:shadow-md sm:p-7">

                  <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    📍 Alamat
                  </h2>

                  <p className="mt-3 leading-7 text-gray-600">
                    {kontak.alamat || "-"}
                  </p>

                </div>

                {/* Telepon */}
                <div className="rounded-3xl bg-[#FFFDF8] p-5 shadow-sm ring-1 ring-[#E9E1D2] transition hover:-translate-y-1 hover:shadow-md sm:p-7">

                  <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    📞 Telepon
                  </h2>

                  {kontak.telepon ? (
                    <a
                      href={`tel:${kontak.telepon}`}
                      className="mt-3 inline-block text-gray-600 transition hover:text-green-600"
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
                <div className="rounded-3xl bg-[#FFFDF8] p-5 shadow-sm ring-1 ring-[#E9E1D2] transition hover:-translate-y-1 hover:shadow-md sm:p-7">

                  <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    💬 WhatsApp
                  </h2>

                  {kontak.whatsapp ? (
                   <a
                   href={`https://wa.me/${formatWhatsAppNumber(kontak.whatsapp)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="mt-3 inline-block text-gray-600 transition hover:text-green-600"
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
                <div className="rounded-3xl bg-[#FFFDF8] p-5 shadow-sm ring-1 ring-[#E9E1D2] transition hover:-translate-y-1 hover:shadow-md sm:p-7">

                  <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    ✉️ Email
                  </h2>

                  {kontak.email ? (
                    <a
                      href={`mailto:${kontak.email}`}
                      className="mt-3 inline-block break-all text-gray-600 transition hover:text-green-600"
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
                  <div className="rounded-3xl bg-[#FFFDF8] p-5 shadow-sm ring-1 ring-[#E9E1D2] transition hover:-translate-y-1 hover:shadow-md sm:p-7">

                    <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                      🕐 Jam Operasional
                    </h2>

                    <p className="mt-3 leading-7 text-gray-600">
                      {kontak.jam_operasional}
                    </p>

                  </div>
                )}

              </div>

              {/* =========================
                  KOLOM KANAN
              ========================= */}
              <div className="space-y-4 sm:space-y-6">

                {/* Google Maps */}
                <div className="overflow-hidden rounded-3xl bg-[#FFFDF8] shadow-sm ring-1 ring-[#E9E1D2]">

                  {kontak.maps_url ? (
                    <iframe
                      title={`Lokasi ${kontak.nama_instansi}`}
                      src={kontak.maps_url}
                      width="100%"
                      height="300"
                      loading="lazy"
                      className="border-0 sm:h-[400px]"
                    />
                  ) : (
                    <div className="flex h-[300px] items-center justify-center text-gray-500 sm:h-[400px]">
                      Lokasi belum tersedia.
                    </div>
                  )}

                </div>

                {/* =========================
                    SOSIAL MEDIA
                ========================= */}
                <div className="rounded-3xl bg-[#FFFDF8] p-5 shadow-sm ring-1 ring-[#E9E1D2] transition hover:-translate-y-1 hover:shadow-md sm:p-7">

                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Ikuti Kami
                  </h2>

                  <p className="mt-3 leading-7 text-gray-600">
                    Dapatkan informasi terbaru melalui media sosial Pesona Beji.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:gap-4">

                    {/* Instagram */}
                    {kontak.instagram && (
                      <a
                        href={kontak.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-[#E9E1D2] px-4 py-3 text-center text-sm text-gray-700 transition hover:bg-green-600 hover:text-white sm:px-5 sm:text-base"
                      >
                        📷 Instagram
                      </a>
                    )}

                    {/* Facebook */}
                    {kontak.facebook && (
                      <a
                        href={kontak.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-[#E9E1D2] px-4 py-3 text-center text-sm text-gray-700 transition hover:bg-green-600 hover:text-white sm:px-5 sm:text-base"
                      >
                        📘 Facebook
                      </a>
                    )}

                    {/* YouTube */}
                    {kontak.youtube && (
                      <a
                        href={kontak.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-[#E9E1D2] px-4 py-3 text-center text-sm text-gray-700 transition hover:bg-green-600 hover:text-white sm:px-5 sm:text-base"
                      >
                        ▶ YouTube
                      </a>
                    )}

                    {/* TikTok */}
                    {kontak.tiktok && (
                      <a
                        href={kontak.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl border border-[#E9E1D2] px-4 py-3 text-center text-sm text-gray-700 transition hover:bg-green-600 hover:text-white sm:px-5 sm:text-base"
                      >
                        🎵 TikTok
                      </a>
                    )}

                    {/* Jika tidak ada sosial media */}
                    {!kontak.instagram &&
                      !kontak.facebook &&
                      !kontak.youtube &&
                      !kontak.tiktok && (
                        <p className="col-span-2 text-sm text-gray-500">
                          Media sosial belum tersedia.
                        </p>
                      )}

                  </div>

                </div>

              </div>

            </div>

          </section>
        )}

      </main>

      <Footer />
    </>
  );
}