import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPelakuKopi } from "../../services/pelakuKopiService";
import type { PelakuKopi } from "../../services/pelakuKopiService";

export default function KopiPreview() {
  const [pelaku, setPelaku] = useState<PelakuKopi | null>(null);

  useEffect(() => {
    const loadPelaku = async () => {
      try {
        const data = await getPelakuKopi();

        if (data.length > 0) {
          setPelaku(data[0]);
        }
      } catch (error) {
        console.error("Gagal mengambil data pelaku kopi:", error);
      }
    };

    loadPelaku();
  }, []);

  if (!pelaku) {
    return null;
  }

  return (
    <section className="bg-[#F7F4ED] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 text-center md:mb-10">
          <h2 className="text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
          Pelaku Kopi Desa Beji
          </h2>

          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Mengenal masyarakat yang ikut mengembangkan Kopi Beji.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* GAMBAR */}
          <div className="overflow-hidden rounded-2xl">
            <img
              src={
                pelaku.foto_url ||
                "https://placehold.co/800x600"
              }
              alt={pelaku.nama_pelaku}
              className="h-48 w-full object-cover md:h-[400px]"
            />
          </div>

          {/* INFORMASI */}
          <div className="flex flex-col justify-center">

            <p className="text-xs font-semibold uppercase tracking-wide text-green-600 md:text-sm">
              Pelaku Kopi
            </p>

            <h3 className="mt-2 text-2xl font-bold text-gray-900 md:mt-3 md:text-3xl">
              {pelaku.nama_pelaku}
            </h3>

            <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray-600 md:mt-5 md:text-base md:leading-8">
              {pelaku.deskripsi_singkat ||
                pelaku.deskripsi ||
                "Salah satu pelaku yang ikut mengembangkan Kopi Beji."}
            </p>

            <Link
              to={`/kopi/${pelaku.slug}`}
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