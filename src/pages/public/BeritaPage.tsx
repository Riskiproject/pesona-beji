import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { getBerita } from "../../services/beritaService";



export default function BeritaPage() {
  
  const [berita, setBerita] =
  useState<any[]>([]);

const [loading, setLoading] =
  useState(true);

useEffect(() => {

  loadData();

}, []);

async function loadData() {

  try {

    const data =
      await getBerita();

    setBerita(data || []);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

}

const headline = berita[0];

const lainnya = berita.slice(1);

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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

if (!headline) {

  return (

    <>
      <Navbar />

      <div className="py-32 text-center">

        Belum ada berita.

      </div>

      <Footer />

    </>

  );

}

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="mx-auto max-w-7xl px-5 pt-28 pb-12">

        <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          📰 Berita Desa Beji
        </span>

        <h1 className="mt-6 text-5xl font-bold text-gray-900">
          Berita Desa Beji
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
          Informasi terbaru mengenai kegiatan, program,
          serta berbagai aktivitas yang berlangsung
          di Desa Beji.
        </p>

      </section>

      {/* Headline */}
      <section className="mx-auto max-w-7xl px-5 pb-20">

        <div className="grid overflow-hidden rounded-3xl border bg-white shadow-sm lg:grid-cols-2">

          <img
            src={headline.gambar}
            alt={headline.judul}
            className="h-full min-h-[380px] w-full object-cover"
          />

          <div className="flex flex-col justify-center p-10">

            <span className="inline-flex w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              ⭐ Berita Terbaru
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight">
              {headline.judul}
            </h2>

            <p className="mt-4 text-sm text-gray-500">
              📅 {formatDate(headline.tanggal_publish)}
              <span className="mx-2">•</span>
              📂 {headline.kategori}
            </p>

            <p className="mt-6 leading-8 text-gray-600">
              {headline.ringkasan}
            </p>

            <Link
              to={`/berita/${headline.slug}`}
              className="mt-8 w-fit font-semibold text-green-600 hover:underline"
            >
              Baca Selengkapnya →
            </Link>

          </div>

        </div>

      </section>

      {/* Berita Lainnya */}
      <section className="mx-auto max-w-7xl px-5 pb-20">

        <div className="mb-10 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              Berita Lainnya
            </h2>

            <p className="mt-2 text-gray-600">
              Ikuti informasi terbaru mengenai kegiatan dan perkembangan Desa Beji.
            </p>
          </div>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {lainnya.map((item) => (

            <Link
              key={item.id}
              to={`/berita/${item.slug}`}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="overflow-hidden">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {item.kategori}
                </span>

                <p className="mt-4 text-sm text-gray-500">
                  📅 {formatDate(item.tanggal_publish)}
                </p>

                <h3 className="mt-3 line-clamp-2 text-2xl font-bold">
                  {item.judul}
                </h3>

                <p className="mt-4 line-clamp-3 leading-7 text-gray-600">
                  {item.ringkasan}
                </p>

                <span className="mt-6 inline-flex items-center font-semibold text-green-600">
                  Baca Selengkapnya →
                </span>

              </div>

            </Link>

          ))}

        </div>

      </section>
      <Footer />
    </>
  );
} 