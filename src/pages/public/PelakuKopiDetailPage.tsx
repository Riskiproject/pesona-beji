import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  getPelakuKopiBySlug,
  type PelakuKopi,
} from "../../services/pelakuKopiService";

export default function KopiPelakuDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const [pelaku, setPelaku] = useState<PelakuKopi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [slug]);

  async function loadData() {
    try {
      setLoading(true);

      if (!slug) {
        setPelaku(null);
        return;
      }

      const data = await getPelakuKopiBySlug(slug);
      setPelaku(data);
    } catch (error) {
      console.error("Gagal mengambil data pelaku kopi:", error);
      setPelaku(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center">
          <p className="text-gray-500">
            Memuat data pelaku kopi...
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (!pelaku) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center px-5">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Pelaku Kopi Tidak Ditemukan
            </h1>

            <p className="mt-3 text-gray-600">
              Data pelaku kopi yang kamu cari tidak tersedia.
            </p>

            <Link
              to="/kopi"
              className="mt-6 inline-flex rounded-xl bg-green-600 px-6 py-3 font-semibold text-white"
            >
              ← Kembali ke Kopi Beji
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
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

      <main className="min-h-screen bg-[#F7F4ED]">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-25">

          {/* KEMBALI */}
          <Link
            to="/kopi"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700"
          >
            ← Kembali ke Kopi Beji
          </Link>

          {/* ================================================= */}
          {/* INFORMASI PELAKU */}
          {/* ================================================= */}

          <section className="mt-4">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

              {/* FOTO */}
              <div>
                <img
                  src={
                    pelaku.foto_url ||
                    "https://placehold.co/800x600"
                  }
                  alt={pelaku.nama_pelaku}
                  className="h-[320px] w-full rounded-2xl object-cover shadow-sm md:h-[420px]"
                />
              </div>

              {/* INFORMASI */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  Tentang Pelaku
                </h1>

                <h2 className="mt-5 text-2xl font-semibold text-green-700">
                  {pelaku.nama_pelaku}
                </h2>

                <p className="mt-4 whitespace-pre-line leading-8 text-gray-600">
                  {pelaku.deskripsi ||
                    pelaku.deskripsi_singkat ||
                    "Deskripsi pelaku belum tersedia."}
                </p>
              </div>

            </div>
          </section>

          {/* ================================================= */}
          {/* PRODUK */}
          {/* ================================================= */}

          <section className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900">
              Produk yang Dihasilkan
            </h2>

            <div className="mt-6 p-0">
              <p className="whitespace-pre-line leading-8 text-gray-600">
                {pelaku.produk ||
                  "Informasi produk belum tersedia."}
              </p>
            </div>
          </section>

          {/* ================================================= */}
{/* GALERI */}
{/* ================================================= */}

<section className="mt-20">
  <h2 className="text-3xl font-bold text-gray-900">
    Galeri
  </h2>

  <p className="mt-3 text-gray-600">
    Dokumentasi pelaku, produk, proses pengolahan,
    dan aktivitas Kopi Beji.
  </p>

  {pelaku.galeri && pelaku.galeri.length > 0 ? (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
      {pelaku.galeri.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-sm"
        >
          <img
            src={image}
            alt={`Galeri ${pelaku.nama_pelaku} ${index + 1}`}
            className="h-full w-full object-cover transition hover:scale-[1.02]"
          />
        </div>
      ))}
    </div>
  ) : (
    <p className="mt-8 text-gray-500">
      Belum ada galeri untuk pelaku ini.
    </p>
  )}
</section> 

          {/* ================================================= */}
          {/* HUBUNGI */}
          {/* ================================================= */}

          <section className="mt-20">
          <div className="p-0">

              <h2 className="text-3xl font-bold text-gray-900">
                Hubungi Pelaku
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Hubungi pelaku Kopi Beji atau kunjungi
                lokasinya untuk mendapatkan informasi lebih
                lanjut.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">

                {/* WHATSAPP */}
                {pelaku.whatsapp && (
                 <a
                  href={
                  pelaku.whatsapp.startsWith("http")
                  ? pelaku.whatsapp
                  : `https://wa.me/${formatWhatsAppNumber(
                  pelaku.whatsapp
                  )}`
                  }
                  target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                  >
                 💬 WhatsApp
                 </a>
                 )}

                {/* LOKASI */}
                {pelaku.lokasi_url && (
                  <a
                    href={pelaku.lokasi_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                  >
                    📍 Lihat Lokasi
                  </a>
                )}

              </div>

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}