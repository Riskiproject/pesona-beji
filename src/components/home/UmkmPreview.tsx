import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUmkm } from "../../services/umkmService";

export default function UmkmPreview() {
  const [umkm, setUmkm] = useState<any | null>(null);

  useEffect(() => {
    const loadUmkm = async () => {
      try {
        const data = await getUmkm();

        if (data && data.length > 0) {
          setUmkm(data[0]);
        }
      } catch (error) {
        console.error("Gagal mengambil data UMKM:", error);
      }
    };

    loadUmkm();
  }, []);

  if (!umkm) {
    return null;
  }

  return (
    <section className="bg-[#F7F4ED] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 text-center md:mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-700">
            UMKM Desa Beji
          </span>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Produk Lokal Desa Beji
          </h2>

          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Mengenal salah satu UMKM yang berkembang di Desa Beji.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* GAMBAR */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={
                umkm.image_url ||
                "https://placehold.co/800x600"
              }
              alt={umkm.title}
              className="h-48 w-full object-cover md:h-[400px]"
            />
          </div>

          {/* INFORMASI */}
          <div className="flex flex-col justify-center">

            <p className="text-xs font-semibold uppercase tracking-wide text-green-600 md:text-sm">
              UMKM Desa Beji
            </p>

            <h3 className="mt-2 text-2xl font-bold text-gray-900 md:mt-3 md:text-3xl">
              {umkm.title}
            </h3>

            <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray-600 md:mt-5 md:text-base md:leading-8">
              {umkm.short_description ||
                umkm.description ||
                "Salah satu UMKM lokal yang berkembang di Desa Beji."}
            </p>

            <Link
              to={`/umkm/${umkm.slug}`}
              className="mt-5 inline-flex w-fit rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 md:mt-6 md:px-6"
            >
              Lihat Selengkapnya →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}