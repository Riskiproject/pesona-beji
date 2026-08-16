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

      {/* Konten Galeri */}
      <div className="min-h-screen bg-[#F8F5EC]">

        {/* Header */}
        <section className="mx-auto max-w-7xl px-5 pt-28 pb-12">

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            📸 Galeri Desa Beji
          </span>

          <h1 className="mt-4 text-3xl font-bold sm:mt-6 sm:text-5xl">
            Galeri Desa Beji
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Dokumentasi kegiatan, potensi desa, UMKM,
            Kopi Beji, dan berbagai momen menarik lainnya.
          </p>

        </section>

        {/* Filter */}
        <section className="mx-auto max-w-7xl px-5 pb-10">

          <div className="flex flex-nowrap gap-1.5">

            {categories.map((category) => (

              <button
                key={category}
                onClick={() => setActive(category)}
                className={`shrink-0 rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition sm:px-5 sm:py-2 sm:text-sm ${
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

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

            {filtered.map((photo) => (

              <div
                key={photo.id}
                className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:rounded-2xl"
              >

                <div className="aspect-[4/3] overflow-hidden">

                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />

                </div>

                <div className="p-3 md:p-5">

                  <span className="inline-block max-w-full truncate rounded-full bg-green-100 px-2 py-1 text-[9px] font-semibold text-green-700 md:px-3 md:text-xs">
                    {photo.category}
                  </span>

                  <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-gray-900 md:mt-4 md:text-lg md:leading-6">
                    {photo.title}
                  </h3>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

      {/* Footer tetap putih */}
      <Footer />
    </>
  );
}