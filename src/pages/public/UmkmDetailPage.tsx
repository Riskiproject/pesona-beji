import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  getUmkmBySlug,
  getUmkmGallery,
} from "../../services/umkmService";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function UmkmDetailPage() {
  const { slug } = useParams();

  const [umkm, setUmkm] = useState<any>(null);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [slug]);

  async function loadData() {
    try {
      if (!slug) return;

      const data = await getUmkmBySlug(slug);

      setUmkm(data);

      const galeri = await getUmkmGallery(data.id);
      setGallery(galeri || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#F7F4ED] py-32 text-center text-gray-500">
          Memuat...
        </main>

        <Footer />
      </>
    );
  }

  if (!umkm) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#F7F4ED] py-32 text-center text-gray-600">
          UMKM tidak ditemukan.
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

        {/* =========================
            KEMBALI
        ========================= */}
        <div className="mx-auto max-w-7xl px-5 pt-20 md:pt-24">
          <Link
            to="/umkm"
            className="inline-flex items-center rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 md:px-5 md:py-3 md:text-base"
          >
            ← Kembali ke UMKM
          </Link>
        </div>

        {/* =========================
            HEADER
        ========================= */}
        <section className="mx-auto max-w-7xl px-5 pb-8 pt-6 md:pb-10 md:pt-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {umkm.title}
          </h1>

          <p className="mt-2 text-base font-medium text-green-600 md:text-lg">
            👤 {umkm.owner}
          </p>
        </section>

        {/* =========================
    FOTO + TENTANG PRODUK
========================= */}
<section className="mx-auto max-w-7xl px-5 pb-10 md:pb-12">

  <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">

    {/* FOTO */}
    <div className="w-full lg:sticky lg:top-28">
      <div className="overflow-hidden rounded-2xl bg-gray-200">
        <img
          src={umkm.image_url}
          alt={umkm.title}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
    </div>

    {/* TENTANG PRODUK */}
    <div>
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
        Tentang Produk
      </h2>

      <div className="mt-3 h-1 w-14 rounded-full bg-green-600" />

      <p className="mt-5 whitespace-pre-line text-sm leading-7 text-gray-600 md:text-base md:leading-8">
        {umkm.description}
      </p>
    </div>

  </div>

</section>

        {/* =========================
            KONTAK PEMILIK
        ========================= */}
        <section className="mx-auto max-w-7xl px-5 pb-12 md:pb-14">

          <div>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Hubungi Pemilik
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 md:text-base md:leading-7">
              Tertarik dengan produk ini? Hubungi pemilik UMKM
              untuk mendapatkan informasi lebih lanjut.
            </p>

            <div className="mt-5 flex flex-wrap gap-3 md:mt-6 md:gap-4">

              {/* WHATSAPP */}
              {umkm.whatsapp && (
                <a
                  href={`https://wa.me/${formatWhatsAppNumber(umkm.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 md:px-5 md:py-3 md:text-base"
                >
                  💬 WhatsApp
                </a>
              )}

              {/* LOKASI */}
              {umkm.maps_url && (
                <a
                  href={umkm.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 md:px-5 md:py-3 md:text-base"
                >
                  📍 Lihat Lokasi
                </a>
              )}

            </div>
          </div>

        </section>

        {/* =========================
            GALERI
        ========================= */}
        <section className="mx-auto max-w-7xl px-5 pb-16 md:pb-20">

          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Galeri Produk
            </h2>

            <p className="mt-2 text-sm text-gray-600 md:text-base">
              Dokumentasi produk dan kegiatan UMKM Desa Beji.
            </p>
          </div>

          {gallery.length === 0 ? (
            <p className="text-gray-500">
              Belum ada galeri.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 shadow-sm md:rounded-2xl"
                >
                  <img
                    src={item.image_url}
                    alt={umkm.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}

        </section>

      </main>

      <Footer />
    </>
  );
}