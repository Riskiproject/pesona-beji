import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { getUmkm } from "../../services/umkmService";


export default function UmkmPage() {

const [umkm, setUmkm] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadData();
}, []);

async function loadData() {
  try {

    const data = await getUmkm();

    setUmkm(
      (data || []).filter(
        (item) => item.is_active
      )
    );

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
}

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F4ED]">

      {/* Header */}
      <section className="mx-auto max-w-7xl px-5 pt-20 pb-12">
        <h1 className="text-4xl font-bold">UMKM Desa Beji</h1>

        <p className="mt-4 max-w-3xl text-gray-600">
          Berbagai produk unggulan UMKM Desa Beji selain Kopi Beji yang
          dikembangkan oleh masyarakat.
        </p>
      </section>

      {/* Grid */}
<section className="mx-auto max-w-7xl px-5 pb-16">

  {loading ? (

    <div className="py-16 text-center text-gray-500">
      Memuat data UMKM...
    </div>

  ) : umkm.length === 0 ? (

    <div className="py-16 text-center text-gray-500">
      Belum ada UMKM.
    </div>

  ) : (

    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">

      {umkm.map((item) => (

        <div
          key={item.id}
          className="flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-lg sm:rounded-2xl"
        >

          {/* FOTO */}
          <img
            src={item.image_url}
            alt={item.title}
            className="h-28 w-full object-cover sm:h-40 lg:h-56"
          />

          {/* ISI CARD */}
          <div className="flex flex-1 flex-col p-3 sm:p-5 lg:p-6">

            <h2 className="text-sm font-semibold leading-5 sm:text-lg sm:leading-6 lg:text-xl lg:leading-7">
              {item.title}
            </h2>

            <p className="mt-2 text-xs font-medium text-green-600 sm:text-sm">
              👤 {item.owner}
            </p>

            <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-600 sm:mt-3 sm:text-sm lg:text-base lg:leading-7">
              {item.short_description}
            </p>

            <Link
              to={`/umkm/${item.slug}`}
              className="mt-auto pt-3 text-xs font-semibold text-green-600 hover:underline sm:pt-4 sm:text-sm lg:text-base"
            >
              Lihat Detail →
            </Link>

          </div>

        </div>

      ))}

    </div>

  )}

</section>

     <section className="mx-auto max-w-7xl px-5 pb-20">
  <div className="rounded-3xl border border-green-100 bg-green-50 px-6 py-10 text-center md:px-8 md:py-12">

    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
      Ingin UMKM Anda Ditampilkan?
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base md:leading-8">
      Apakah Anda memiliki UMKM di Desa Beji? Mari bergabung dan
      perkenalkan produk Anda melalui website Pesona Beji agar lebih
      dikenal oleh masyarakat luas.
    </p>

    <a
      href="/kontak"
      className="mt-7 inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 md:px-6 md:py-3 md:text-base"
    >
      Hubungi Kami
    </a>

  </div>
</section>
</main>
      <Footer />
    </>
  );
}