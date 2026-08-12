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

const [gallery, setGallery] =
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
      await getUmkmBySlug(slug);

    setUmkm(data);

    const galeri =
      await getUmkmGallery(data.id);

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

      <div className="py-32 text-center">

        Memuat...

      </div>

      <Footer />

    </>

  );

}

if (!umkm) {

  return (

    <>
      <Navbar />

      <div className="py-32 text-center">

        UMKM tidak ditemukan.

      </div>

      <Footer />

    </>

  );

}

  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-7xl px-5 pt-22">
  <Link
    to="/umkm"
    className="inline-flex items-center rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
  >
    ← Kembali ke UMKM
  </Link>
</div>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-5 pt-8 pb-12">
        <h1 className="text-4xl font-bold">
  {umkm.title}
</h1>

<p className="mt-3 text-lg text-green-600 font-medium">
  {umkm.owner}
</p>
      </section>

      {/* Detail */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="grid gap-10 lg:grid-cols-2">

          <img
  src={umkm.image_url}
  alt={umkm.title}
  className="w-full rounded-2xl"
/>

          <div>

            <h2 className="text-3xl font-bold">
              Tentang Produk
            </h2>

            <p className="mt-5 leading-8 text-gray-600 whitespace-pre-line">
  {umkm.description}
</p>

            <div className="mt-8 flex gap-4">

             <a
  href={`https://wa.me/${umkm.whatsapp}`}
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-xl bg-green-600 px-5 py-3 text-white"
>
  💬 WhatsApp
</a>

             <a
  href={umkm.maps_url}
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-xl border px-5 py-3"
>
  📍 Lokasi
</a>

            </div>

          </div>

        </div>
      </section>

      {/* Galeri */}
      <section className="mx-auto max-w-7xl px-5 pb-20">

        <h2 className="mb-8 text-3xl font-bold">
          Galeri Produk
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

  {gallery.length === 0 ? (

    <p className="col-span-3 text-center text-gray-500">
      Belum ada galeri.
    </p>

  ) : (

    gallery.map((item) => (

      <img
        key={item.id}
        src={item.image_url}
        alt={umkm.title}
        className="rounded-2xl"
      />

    ))

  )}

</div>

      </section>

      <Footer />
    </>
  );
}