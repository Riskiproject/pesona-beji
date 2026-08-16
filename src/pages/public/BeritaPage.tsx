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

          <main className="min-h-screen bg-[#F7F4ED]">

      {/* Header */}
      <section className="mx-auto max-w-7xl px-5 pt-28 pb-12">

        <span className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          📰 Berita Desa Beji
        </span>

      <h1 className="mt-4 text-[30px] font-bold leading-tight text-gray-900 md:mt-6 md:text-5xl">
       Berita Desa Beji
      </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
          Informasi terbaru mengenai kegiatan, program,
          serta berbagai aktivitas yang berlangsung
          di Desa Beji.
        </p>

      </section>

      {/* Headline */}
<section className="mx-auto max-w-7xl px-5 pb-12 md:pb-20">

  <div className="grid overflow-hidden rounded-2xl border bg-white shadow-sm lg:grid-cols-2">

    <img
      src={headline.gambar}
      alt={headline.judul}
      className="h-40 w-full object-cover sm:h-52 lg:h-full lg:min-h-[380px]"
    />

    <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-10">

      <span className="inline-flex w-fit rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-700 md:px-4 md:py-2 md:text-sm">
        ⭐ Berita Terbaru
      </span>

      <h2 className="mt-3 line-clamp-2 text-xl font-bold leading-tight md:mt-6 md:text-4xl">
        {headline.judul}
      </h2>

      <p className="mt-2 text-[10px] text-gray-500 md:mt-4 md:text-sm">
        📅 {formatDate(headline.tanggal_publish)}
        <span className="mx-1">•</span>
        📂 {headline.kategori}
      </p>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 md:mt-5 md:text-lg md:leading-8">
        {headline.ringkasan}
      </p>

      <Link
        to={`/berita/${headline.slug}`}
        className="mt-3 w-fit text-xs font-semibold text-green-600 hover:underline md:mt-8 md:text-base"
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

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-8">

          {lainnya.map((item) => (

  <Link
    key={item.id}
    to={`/berita/${item.slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:rounded-2xl"
  >

    {/* FOTO */}
    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200">
      <img
        src={item.gambar}
        alt={item.judul}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
    </div>

    {/* ISI */}
    <div className="flex flex-1 flex-col p-2.5 md:p-5">

      <span className="w-fit rounded-full bg-green-100 px-2 py-1 text-[8px] font-semibold text-green-700 md:px-3 md:text-xs">
        {item.kategori}
      </span>

      <p className="mt-1.5 text-[8px] text-gray-500 md:mt-3 md:text-xs">
        📅 {formatDate(item.tanggal_publish)}
      </p>

      <h3 className="mt-1.5 line-clamp-2 text-xs font-bold leading-tight text-gray-900 md:mt-3 md:text-lg">
        {item.judul}
      </h3>

      <p className="mt-1.5 line-clamp-2 text-[9px] leading-4 text-gray-600 md:mt-3 md:text-sm md:leading-6">
        {item.ringkasan}
      </p>

      <span className="mt-2 text-[9px] font-semibold text-green-600 md:mt-4 md:text-sm">
        Baca Selengkapnya →
      </span>

    </div>

  </Link>

))}

        </div>

      </section>
    </main>
      <Footer />
    </>
  );
} 