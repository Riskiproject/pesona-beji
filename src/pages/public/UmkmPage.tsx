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

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

      {umkm.map((item) => (

        <div
          key={item.id}
          className="overflow-hidden rounded-2xl border shadow-sm"
        >

          <img
            src={item.image_url}
            alt={item.title}
            className="h-52 w-full object-cover"
          />

          <div className="p-6">

            <h2 className="text-2xl font-semibold">
              {item.title}
            </h2>

            <p className="mt-2 text-sm font-medium text-green-600">
              👤 {item.owner}
            </p>

            <p className="mt-3 text-gray-600 leading-7">
              {item.short_description}
            </p>

            <Link
              to={`/umkm/${item.slug}`}
              className="mt-5 inline-block font-semibold text-green-600 hover:underline"
            >
              Lihat Detail →
            </Link>

          </div>

        </div>

      ))}

    </div>

  )}

</section>

      {/* CTA UMKM */}
<section className="mx-auto max-w-7xl px-5 pb-20">
  <div className="rounded-3xl bg-green-50 border border-green-100 px-8 py-12 text-center">
    <h2 className="text-3xl font-bold text-gray-900">
      Ingin UMKM Anda Ditampilkan?
    </h2>

    <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-600">
      Apakah Anda memiliki UMKM di Desa Beji? Mari bergabung dan
      perkenalkan produk Anda melalui website Pesona Beji agar lebih
      dikenal oleh masyarakat luas.
    </p>

    <a
      href="/kontak"
      className="mt-8 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
    >
      Hubungi Kami
    </a>
  </div>
</section>

      <Footer />
    </>
  );
}