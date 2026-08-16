import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBerita } from "../../services/beritaService";

export default function BeritaPreview() {
  const [berita, setBerita] = useState<any | null>(null);

  useEffect(() => {
    const loadBerita = async () => {
      try {
        const data = await getBerita();

        console.log("DATA BERITA:", data);

        if (data && data.length > 0) {
          setBerita(data[0]);
        }
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
      }
    };

    loadBerita();
  }, []);

  if (!berita) {
    return null;
  }

  return (
    <section className="bg-[#F7F4ED] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 text-center md:mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-700">
            Berita Desa
          </span>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Kabar Terbaru Desa Beji
          </h2>

          <p className="mt-3 text-sm text-gray-600 md:text-base">
            Informasi dan kegiatan terbaru dari Desa Beji.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* GAMBAR */}
          <div className="overflow-hidden rounded-2xl">
            {berita.gambar ? (
              <img
                src={berita.gambar}
                alt={berita.judul}
                className="h-48 w-full object-cover md:h-[400px]"
              />
            ) : (
              <div className="flex h-48 w-full items-center justify-center rounded-2xl bg-gray-100 text-gray-400 md:h-[400px]">
                Tidak ada gambar
              </div>
            )}
          </div>

          {/* INFORMASI */}
          <div className="flex flex-col justify-center">

            <p className="text-xs font-semibold uppercase tracking-wide text-green-600 md:text-sm">
              ⭐ Berita Terbaru
            </p>

            <h3 className="mt-2 line-clamp-2 text-2xl font-bold text-gray-900 md:mt-3 md:text-3xl">
              {berita.judul}
            </h3>

            {/* TANGGAL */}
            {berita.tanggal_publish && (
              <p className="mt-2 text-xs text-gray-500 md:mt-3 md:text-sm">
                {new Date(
                  berita.tanggal_publish
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}

            {/* RINGKASAN */}
            <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray-600 md:mt-5 md:text-base md:leading-8">
              {berita.ringkasan || ""}
            </p>

            {/* DETAIL */}
            <Link
              to={`/berita/${berita.slug}`}
              className="mt-5 inline-flex w-fit rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 md:mt-6 md:px-6 md:text-base"
            >
              Baca Selengkapnya →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}