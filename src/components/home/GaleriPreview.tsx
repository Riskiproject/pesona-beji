import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGaleri } from "../../services/galeriService";

export default function GaleriPreview() {
  const [galeri, setGaleri] = useState<any[]>([]);

  useEffect(() => {
    const loadGaleri = async () => {
      try {
        const data = await getGaleri();

        console.log("DATA GALERI:", data);

        if (data && data.length > 0) {
          // Ambil maksimal 3 data
          setGaleri(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Gagal mengambil data galeri:", error);
      }
    };

    loadGaleri();
  }, []);

  if (galeri.length === 0) {
    return null;
  }

  return (
   <section className="bg-[#F7F4ED] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-700">
            Galeri Desa
          </span>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Dokumentasi Desa Beji
          </h2>

          <p className="mt-3 text-gray-600">
            Lihat berbagai dokumentasi dan aktivitas Desa Beji.
          </p>
        </div>

{/* CARD GALERI */}
<div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible">

  {galeri.map((item) => (
    <div
      key={item.id}
      className="
        w-[230px]
        flex-shrink-0
        overflow-hidden
        rounded-2xl
        border border-gray-200
        bg-white
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        sm:w-auto
      "
    >

      {/* GAMBAR */}
      <div className="h-40 w-full overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title || "Galeri Desa Beji"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
            Tidak ada gambar
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">

        <span className="text-xs font-medium text-green-700">
          📸 {item.category}
        </span>

        <h3 className="mt-2 line-clamp-2 text-sm font-bold text-gray-900">
          {item.title}
        </h3>

        {item.date && (
          <p className="mt-2 text-xs text-gray-500">
            {new Date(item.date).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
        )}

      </div>
    </div>
  ))}

</div>

        {/* TOMBOL */}
        <div className="mt-10 text-center">
          <Link
            to="/galeri"
            className="inline-flex rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Lihat Semua Galeri →
          </Link>
        </div>

      </div>
    </section>
  );
}