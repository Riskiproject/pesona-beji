import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getHeroBanners } from "../../services/heroService";
import { getKopiBeji } from "../../services/kopiService";
import { getPelakuKopi, type PelakuKopi } from "../../services/pelakuKopiService";

export default function KopiPage() {
  const [hero, setHero] = useState<any>(null);
  const [kopi, setKopi] = useState<any>(null);
  const [pelaku, setPelaku] = useState<PelakuKopi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [heroData, kopiData, pelakuData] =
        await Promise.all([
          getHeroBanners("kopi"),
          getKopiBeji(),
          getPelakuKopi(),
        ]);

      setHero(heroData?.[0] || null);
      setKopi(kopiData);
      setPelaku(pelakuData || []);
    } catch (error) {
      console.error("Gagal mengambil data Kopi Beji:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7F4ED]">

      {/* ================================================= */}
{/* HERO */}
{/* ================================================= */}

<section className="relative h-[260px] md:h-[340px] lg:h-[380px]">

  <img
    src={
      hero?.image_url ||
      "https://placehold.co/1600x900"
    }
    alt="Hero Kopi Beji"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/50" />

  <div className="relative z-10 flex h-full items-center justify-center">

    <div className="px-5 text-center text-white translate-y-3 md:translate-y-0">

      <span className="relative top-2 rounded-full bg-white/20 px-3 py-1 text-[10px] backdrop-blur md:top-3 md:px-4 md:text-sm">
      Pesona Beji
      </span>

      <h1 className="mt-3 text-2xl font-bold leading-tight md:mt-4 md:text-5xl">
        {hero?.title || "Kopi Beji"}
      </h1>

      <p className="mt-2 max-w-2xl text-[11px] leading-5 md:mt-3 md:text-lg">
        {hero?.description ||
          "Mengenal Kopi Beji sebagai salah satu ikon dan potensi unggulan Desa Beji."}
      </p>

    </div>

  </div>

</section>

      {/* ================================================= */}
      {/* TENTANG KOPI */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-16">
  <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

    {/* FOTO TENTANG KOPI */}
    <div className="overflow-hidden rounded-2xl border bg-gray-100 shadow-sm">
      <div className="aspect-[16/10] w-full">
        <img
          src={
            kopi?.foto_tentang_url ||
            "https://placehold.co/800x500"
          }
          alt="Kopi Beji"
          className="h-full w-full object-cover"
        />
      </div>
    </div>

    {/* DESKRIPSI */}
    <div>
            <h2 className="text-3xl font-bold">
              Tentang Kopi Beji
            </h2>

            <p className="mt-5 whitespace-pre-line leading-8 text-gray-600">
              {kopi?.tentang_deskripsi ||
                "Informasi tentang Kopi Beji belum tersedia."}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* SEJARAH */}
      {/* ================================================= */}

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-3xl font-bold">
            Sejarah Singkat
          </h2>

          <p className="mt-5 whitespace-pre-line leading-8 text-gray-600">
            {kopi?.sejarah ||
              "Sejarah Kopi Beji belum tersedia."}
          </p>
        </div>
      </section>

      {/* ================================================= */}
{/* PELAKU KOPI */}
{/* ================================================= */}

<section className="mx-auto max-w-7xl px-5 py-16">
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-900">
      Pelaku Kopi Beji
    </h2>

    <p className="mx-auto mt-3 max-w-2xl text-gray-600">
      Kenali para pelaku yang terlibat dalam
      pengembangan Kopi Beji.
    </p>
  </div>

  {loading ? (
    <div className="mt-10 text-center text-gray-500">
      Memuat data pelaku kopi...
    </div>
  ) : pelaku.length === 0 ? (
    <div className="mt-10 rounded-2xl border bg-gray-50 p-8 text-center text-gray-500">
      Belum ada data pelaku Kopi Beji.
    </div>
  ) : (
    <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6">

      {pelaku.map((item) => (
        <div
          key={item.id}
          className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >

          {/* FOTO CARD */}
          <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
            <img
              src={
                item.foto_url ||
                "https://placehold.co/600x450"
              }
              alt={item.nama_pelaku}
              className="h-full w-full object-cover"
            />
          </div>

          {/* ISI CARD */}
          <div className="flex flex-1 flex-col p-3 md:p-6">

            <h3 className="text-base font-bold text-gray-900 md:text-2xl">
              {item.nama_pelaku}
            </h3>

            <p className="mt-2 line-clamp-4 text-xs leading-5 text-gray-600 md:text-base md:leading-7">
              {item.deskripsi_singkat ||
                "Informasi pelaku Kopi Beji belum tersedia."}
            </p>

            {item.slug && (
              <Link
                to={`/kopi/pelaku/${item.slug}`}
                className="mt-auto pt-3"
              >
                <span className="inline-flex rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 md:rounded-xl md:px-5 md:py-3 md:text-base"
                >
                  Lihat Detail
                </span>
              </Link>
            )}

          </div>
        </div>
      ))}

    </div>
  )}
</section>

      {/* ================================================= */}
      {/* GALERI */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="mb-8 text-3xl font-bold">
          Galeri Kopi Beji
        </h2>

        {pelaku.some(
          (item) => item.galeri?.length > 0
        ) ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
            {pelaku
              .flatMap((item) => item.galeri || [])
              .map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt="Galeri Kopi Beji"
                  className="h-56 w-full rounded-2xl object-cover"
                />
              ))}
          </div>
        ) : (
          <p className="text-gray-500">
            Belum ada galeri Kopi Beji.
          </p>
        )}
            </section>

    </main>

    <Footer />
  </>
  );
}