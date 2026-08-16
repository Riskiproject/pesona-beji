import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import {
  getBerita,
  getBeritaBySlug,
} from "../../services/beritaService";

export default function BeritaDetailPage() {
  const { slug } = useParams();

  const [item, setItem] = useState<any>(null);
  const [beritaLainnya, setBeritaLainnya] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [slug]);

  async function loadData() {
    try {
      if (!slug) return;

      const data = await getBeritaBySlug(slug);
      setItem(data);

      const semua = await getBerita();

      setBeritaLainnya(
        semua.filter((b: any) => b.slug !== slug)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link berhasil disalin");
  };

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

  if (!item) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-[#F7F4ED]">
          <section className="mx-auto max-w-4xl px-5 py-32 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">
              Berita Tidak Ditemukan
            </h1>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F4ED]">

        <section className="mx-auto max-w-5xl px-4 pb-16 pt-20 sm:px-5 md:pt-28">

          {/* KEMBALI */}
          <Link
            to="/berita"
            className="inline-flex items-center rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 md:px-6 md:py-3 md:text-base"
          >
            ← Kembali ke Berita
          </Link>

          {/* META */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-gray-500 md:mt-6 md:text-sm">

            <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
              {item.kategori}
            </span>

            <span>•</span>

            <span>
              📅 {formatDate(item.tanggal_publish)}
            </span>

          </div>

          {/* JUDUL */}
          <h1 className="mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:mt-5 md:text-5xl">
            {item.judul}
          </h1>

          {/* PENULIS */}
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 md:mt-4 md:text-base">
            <span>👤</span>

            <span className="font-medium">
              {item.penulis}
            </span>
          </div>

          {/* FOTO UTAMA */}
          <div className="mt-6 overflow-hidden rounded-2xl md:mt-10 md:rounded-3xl">
            <img
              src={item.gambar}
              alt={item.judul}
              className="h-56 w-full object-cover sm:h-72 md:h-[500px]"
            />
          </div>

          {/* ISI BERITA */}
          <article className="prose prose-sm mt-7 max-w-none whitespace-pre-line leading-7 text-gray-700 sm:prose-base md:mt-12 md:prose-lg md:leading-8">
            {item.isi}
          </article>

          {/* BAGIKAN */}
          <div className="mt-10 border-t border-gray-300 pt-6 md:mt-12 md:pt-8">

            <h3 className="mb-3 text-lg font-semibold text-gray-900 md:mb-4 md:text-xl">
              Bagikan Berita
            </h3>

            <div className="flex flex-wrap gap-2 md:gap-3">

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 md:px-5 md:py-2"
              >
                🟢 WhatsApp
              </a>

              <button
                onClick={copyLink}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 md:px-5 md:py-2"
              >
                📋 Salin Link
              </button>

            </div>

          </div>

          {/* BERITA LAINNYA */}
          {beritaLainnya.length > 0 && (
            <div className="mt-12 border-t border-gray-300 pt-10 md:mt-20 md:pt-16">

              {/* HEADER */}
              <div className="mb-5 flex items-center justify-between gap-3 md:mb-8">

                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Berita Lainnya
                </h2>

                <Link
                  to="/berita"
                  className="shrink-0 text-sm font-semibold text-green-600 hover:underline md:text-base"
                >
                  Lihat Semua →
                </Link>

              </div>

              {/* CARD */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">

                {beritaLainnya
                  .slice(0, 3)
                  .map((news) => (
                    <Link
                      key={news.id}
                      to={`/berita/${news.slug}`}
                      className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:rounded-2xl"
                    >

                      {/* FOTO */}
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={news.gambar}
                          alt={news.judul}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* ISI CARD */}
                      <div className="p-3 md:p-5">

                        <span className="inline-block max-w-full truncate rounded-full bg-green-100 px-2 py-1 text-[9px] font-semibold text-green-700 md:px-3 md:text-xs">
                          {news.kategori}
                        </span>

                        <p className="mt-2 text-[10px] text-gray-500 md:mt-3 md:text-sm">
                          📅 {formatDate(news.tanggal_publish)}
                        </p>

                        <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-gray-900 md:mt-3 md:text-xl md:leading-7">
                          {news.judul}
                        </h3>

                        <span className="mt-3 inline-flex text-[10px] font-semibold text-green-600 md:mt-5 md:text-sm">
                          Baca →
                        </span>

                      </div>

                    </Link>
                  ))}

              </div>

            </div>
          )}

        </section>

      </main>

      <Footer />
    </>
  );
}