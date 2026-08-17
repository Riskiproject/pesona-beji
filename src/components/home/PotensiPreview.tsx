import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPotensi } from "../../services/potensiService";

export default function PotensiPreview() {
  const [potensi, setPotensi] = useState<any>(null);

  useEffect(() => {
    const loadPotensi = async () => {
      try {
        const data = await getPotensi();

        const item = (data || [])
          .filter((item) => item.is_active)
          .sort((a, b) => a.sort_order - b.sort_order)[0];

        setPotensi(item || null);
      } catch (error) {
        console.error("Gagal mengambil cuplikan potensi:", error);
      }
    };

    loadPotensi();
  }, []);

  if (!potensi) {
    return null;
  }

  return (
    <section className="bg-[#F7F4ED] px-5 py-12 md:py-16">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 text-center md:mb-10">
         <h2 className="text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
         Potensi Desa Beji
         </h2>

          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Salah satu potensi unggulan Desa Beji.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">

          {/* GAMBAR */}
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <img
              src={potensi.image_url}
              alt={potensi.title}
              className="
                h-48 w-full object-cover
                md:h-[400px]
              "
            />
          </div>

          {/* INFORMASI */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {potensi.title}
            </h3>

            <p className="mt-4 line-clamp-4 text-sm leading-6 text-gray-600 md:line-clamp-none md:text-base md:leading-8">
              {potensi.short_description}
            </p>

            <Link
              to={`/potensi/${potensi.slug}`}
              className="mt-5 inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 md:mt-6 md:px-6 md:py-3 md:text-base"
            >
              Lihat Detail →
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}