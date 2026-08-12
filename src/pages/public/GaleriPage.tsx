import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { getGaleri } from "../../services/galeriService";



const categories = [
  "Semua",
  "Potensi",
  "Kopi Beji",
  "UMKM",
  "Berita",
];

export default function GaleriPage() {

const [photos, setPhotos] = useState<any[]>([]);

const [loading, setLoading] = useState(true);

const [active, setActive] = useState("Semua");

useEffect(() => {

  loadData();

}, []);

async function loadData() {

  try {

    const data = await getGaleri();

    setPhotos(data || []);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

}

const filtered =
  active === "Semua"
    ? photos
    : photos.filter(
        (item) => item.category === active
      );

      if (loading) {

  return (
    <>
      <Navbar />

      <div className="py-32 text-center">
        Memuat galeri...
      </div>

      <Footer />
    </>
  );

}

  return (
    <>
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 pt-28 pb-12">

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
          📸 Galeri Desa Beji
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Galeri Desa Beji
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
          Dokumentasi kegiatan, potensi desa, UMKM,
          Kopi Beji, dan berbagai momen menarik lainnya.
        </p>

      </section>
      {/* Filter */}
      <section className="mx-auto max-w-7xl px-5 pb-10">

        <div className="flex flex-wrap gap-3">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => setActive(category)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                active === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            >
              {category}
            </button>

          ))}
  
        </div>

      </section>

      {/* Grid Galeri */}
      <section className="mx-auto max-w-7xl px-5 pb-20">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filtered.map((photo) => (

            <div
              key={photo.id}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="overflow-hidden">

                <img
                  src={photo.image}
                  alt={photo.title}
                  className="h-64 w-full object-cover transition duration-300 group-hover:scale-110"
                />

              </div>

              <div className="p-5">

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {photo.category}
                </span>

                <h3 className="mt-4 text-lg font-bold">
                  {photo.title}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </section>
      <Footer />
    </>
  );
}