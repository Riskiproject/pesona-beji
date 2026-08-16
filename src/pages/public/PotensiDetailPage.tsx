import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import {
  getPotensiBySlug,
  getPotensiGallery,
  getPotensi,
} from "../../services/potensiService";

export default function PotensiDetailPage() {
  const { slug } = useParams();

  const [potensi, setPotensi] = useState<any>(null);
  const [gallery, setGallery] = useState<any[]>([]);
  const [otherPotensi, setOtherPotensi] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [slug]);

  async function loadData() {
    try {
      const data = await getPotensiBySlug(slug as string);

      setPotensi(data);

      const galeri = await getPotensiGallery(data.id);
      setGallery(galeri);

      const semuaPotensi = await getPotensi();

      setOtherPotensi(
        semuaPotensi
          .filter((item: any) => item.id !== data.id)
          .filter((item: any) => item.is_active)
          .slice(0, 3)
      );
    } catch (err) {
      console.error(err);
    }
  }

  if (!potensi) {
    return (
      <>
        <Navbar />

        <div className="py-40 text-center text-gray-600">
          Memuat...
        </div>

        <Footer />
      </>
    );
  }

  return (
  <>
    <Navbar />

    <main className="min-h-screen bg-[#F7F4ED]">

      {/* =========================
          KEMBALI
      ========================= */}
      <div className="mx-auto max-w-6xl px-4 pt-20 md:px-5 md:pt-25">
        <Link
          to="/potensi"
          className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          ← Kembali ke Potensi
        </Link>
      </div>

      {/* =========================
          JUDUL & DESKRIPSI SINGKAT
      ========================= */}
      <section className="mx-auto max-w-6xl px-4 pb-8 pt-6 md:px-5 md:pb-10 md:pt-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
          {potensi.title}
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 md:text-lg md:leading-8">
          {potensi.short_description}
        </p>
      </section>

      {/* =========================
          FOTO UTAMA
      ========================= */}
      <section className="mx-auto max-w-6xl px-4 md:px-5">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <img
            src={potensi.image_url}
            alt={potensi.title}
            className="h-56 w-full object-cover sm:h-72 md:h-[480px]"
          />
        </div>
      </section>

      {/* =========================
    DESKRIPSI PANJANG
========================= */}
<section className="mx-auto max-w-4xl px-4 py-10 md:px-5 md:py-14">
  <div>
    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
      Tentang Potensi
    </h2>

    <div className="mt-5 h-1 w-16 rounded-full bg-green-600" />

    <div className="mt-7 whitespace-pre-line text-base leading-8 text-gray-600 md:text-lg md:leading-9">
      {potensi.description}
    </div>
  </div>
</section>

      {/* =========================
          GALERI
      ========================= */}
      <section className="mx-auto max-w-6xl px-4 pb-14 md:px-5 md:pb-16">

        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Galeri
          </h2>

          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Dokumentasi dan suasana Potensi Desa Beji.
          </p>
        </div>

        {gallery.length === 0 ? (
          <p className="text-gray-500">
            Belum ada foto galeri.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border bg-white shadow-sm"
              >
                <img
                  src={item.image_url}
                  alt={potensi.title}
                  className="aspect-square w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

      </section>

      {/* =========================
          POTENSI LAINNYA
      ========================= */}
      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-5 md:pb-20">

        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Potensi Lainnya
          </h2>

          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Temukan potensi menarik lainnya di Desa Beji.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6">
          {otherPotensi.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md md:rounded-2xl"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="aspect-[4/3] w-full object-cover"
              />

              <div className="p-3 md:p-5">
                <h3 className="text-sm font-semibold leading-5 text-gray-900 md:text-xl md:leading-7">
                  {item.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-600 md:text-sm md:leading-6">
                  {item.short_description}
                </p>

                <Link
                  to={`/potensi/${item.slug}`}
                  className="mt-3 inline-block text-xs font-semibold text-green-600 hover:underline md:mt-4 md:text-sm"
                >
                  Lihat Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>

    </main>

    <Footer />
  </>
);
}