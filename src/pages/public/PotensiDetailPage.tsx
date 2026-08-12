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

    const data = await getPotensiBySlug(
      slug as string
    );

    setPotensi(data);

    const galeri =
      await getPotensiGallery(data.id);

    setGallery(galeri);

    const semuaPotensi = await getPotensi();

setOtherPotensi(
  semuaPotensi
    .filter((item: any) => item.id !== data.id)
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


      <div className="py-40 text-center">
        Memuat...
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
    to="/potensi"
    className="inline-block rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
  >
    ← Kembali ke Potensi
  </Link>
</div>

      <section className="mx-auto max-w-7xl px-5 py-5">

  <h1 className="text-4xl font-bold text-gray-900">
  {potensi.title}
</h1>

<p className="mt-3 max-w-3xl text-gray-600">
  {potensi.short_description}
</p>
</section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <img
  src={potensi.image_url}
  alt={potensi.title}
  className="w-full h-[350px] rounded-2xl object-cover"
/>

          <div>
            <h2 className="text-3xl font-bold">
  {potensi.title}
</h2>

            <p className="mt-5 leading-8 text-gray-600 whitespace-pre-line">
  {potensi.description}
</p>
          </div>
        </div>
      </section>

      
      {/* Gallery */}
<section className="mx-auto max-w-7xl px-5 pb-16">

  <h2 className="mb-8 text-3xl font-bold">
    Galeri
  </h2>

  {gallery.length === 0 ? (

    <p className="text-gray-500">
      Belum ada foto galeri.
    </p>

  ) : (

    <div className="grid gap-6 md:grid-cols-3">

      {gallery.map((item) => (

        <img
          key={item.id}
          src={item.image_url}
          alt={potensi.title}
          className="rounded-2xl object-cover w-full h-72"
        />

      ))}

    </div>

  )}

</section>

<section className="mx-auto max-w-7xl px-5 pb-20">

  <h2 className="mb-8 text-3xl font-bold">
    Potensi Lainnya
  </h2>

  <div className="grid gap-6 md:grid-cols-3">

    {otherPotensi.map((item) => (

      <div
        key={item.id}
        className="overflow-hidden rounded-2xl border shadow-sm hover:shadow-lg transition"
      >

        <img
          src={item.image_url}
          alt={item.title}
          className="h-52 w-full object-cover"
        />

        <div className="p-5">

          <h3 className="text-xl font-semibold">
            {item.title}
          </h3>

          <p className="mt-2 line-clamp-3 text-gray-600">
            {item.short_description}
          </p>

          <Link
            to={`/potensi/${item.slug}`}
            className="mt-4 inline-block text-green-600 font-semibold hover:underline"
          >
            Lihat Detail →
          </Link>

        </div>

      </div>

    ))}

  </div>

</section>

<Footer />
      
    </>
  );
}