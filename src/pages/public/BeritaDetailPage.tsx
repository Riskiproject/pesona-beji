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

const [item, setItem] =
  useState<any>(null);

const [beritaLainnya, setBeritaLainnya] =
  useState<any[]>([]);

const [loading, setLoading] =
  useState(true);

useEffect(() => {

  loadData();

}, [slug]);

async function loadData() {

  try {

    if (!slug) return;

    const data =
      await getBeritaBySlug(slug);

    setItem(data);

    const semua =
      await getBerita();

    setBeritaLainnya(

      semua.filter(
        (b: any) =>
          b.slug !== slug
      )

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

  await navigator.clipboard.writeText(
    window.location.href
  );

  alert("Link berhasil disalin");

};

if (loading) {

  return (

    <>
      <Navbar />

      <div className="py-32 text-center">
        Memuat...
      </div>

      <Footer />

    </>

  );

}

  if (!item) {

    return (
      <>
        <Navbar />

        <section className="mx-auto max-w-4xl px-5 py-40 text-center">
          <h1 className="text-4xl font-bold">
            Berita Tidak Ditemukan
          </h1>
        </section>
 
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-5xl px-5 pt-28 pb-16">

        <Link
            to="/berita"
            className="mt-8 inline-block rounded-xl bg-green-600 px-6 py-3 text-white"
          >
            Kembali ke Berita
          </Link>

       <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">

  <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
    {item.kategori}
  </span>

  <span>•</span>

  <span>
    📅 {formatDate(item.tanggal_publish)}
  </span>

</div>

        <h1 className="mt-5 text-5xl font-bold leading-tight">
  {item.judul}
</h1>

<div className="mt-4 flex items-center gap-2 text-gray-600">

  <span>👤</span>

  <span className="font-medium">
    {item.penulis}
  </span>

</div>

<img
          src={item.gambar}
          alt={item.judul}
          className="mt-10 h-[500px] w-full rounded-3xl object-cover"
        />

        <article className="prose prose-lg mt-12 max-w-none whitespace-pre-line">
          {item.isi}
        </article>

      <div className="mt-12 border-t pt-8">

  <h3 className="mb-4 text-xl font-semibold">
    Bagikan Berita
  </h3>

  <div className="flex gap-3">

    <a
      href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg bg-green-600 px-5 py-2 text-white"
    >
      🟢 WhatsApp
    </a>

    <button
      onClick={copyLink}
      className="rounded-lg border px-5 py-2"
    >
      📋 Salin Link
    </button>

  </div>

</div>

        {/* Berita Lainnya */}
        {beritaLainnya.length > 0 && (

<div className="mt-20 border-t pt-16">

          <div className="mb-8 flex items-center justify-between">

            <h2 className="text-3xl font-bold">
              Berita Lainnya
            </h2>

            <Link
              to="/berita"
              className="font-semibold text-green-600 hover:underline"
            >
              Lihat Semua →
            </Link>

          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {beritaLainnya
  .slice(0, 3)
  .map((news) => (

                <Link
                  key={news.id}
                  to={`/berita/${news.slug}`}
                  className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <img
                    src={news.gambar}
                    alt={news.judul}
                    className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="p-6">

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {news.kategori}
                    </span>

                    <p className="mt-4 text-sm text-gray-500">
  📅 {formatDate(news.tanggal_publish)}
</p>

                    <h3 className="mt-3 text-xl font-bold line-clamp-2">
                      {news.judul}
                    </h3>

                    <span className="mt-5 inline-flex font-semibold text-green-600">
                      Baca Selengkapnya →
                    </span>

                  </div>

                </Link>

            ))}

          </div>

        </div>
        )}

      </section>

      <Footer />

    </>
  );
}