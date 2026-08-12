import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getHeroBanners } from "../../services/heroService";


export default function KopiPage() {

const [hero, setHero] = useState<any>(null);

useEffect(() => {
  const loadHero = async () => {
    try {
      const data = await getHeroBanners("kopi");
      setHero(data[0] || null);
    } catch (error) {
      console.error(error);
    }
  };

  loadHero();
}, []);

  return (
    <>
      <Navbar />

      {/* Hero */}
<section className="relative h-[320px] md:h-[420px]">

  <img
    src={hero?.image_url || "https://placehold.co/1600x900"}
    alt={hero?.title || "Kopi Beji"}
    className="absolute inset-0 h-full w-full object-cover"
  />

  <div className="absolute inset-0 bg-black/50" />

  <div className="relative z-10 flex h-full items-center">
    <div className="mx-auto w-full max-w-7xl px-5 text-white">

      <span className="rounded-full bg-green-600 px-4 py-2 text-sm">
        {hero?.subtitle || "Ikon Desa Beji"}
      </span>

      <h1 className="mt-4 text-5xl font-bold">
        {hero?.title || "Kopi Beji"}
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-gray-200">
        {hero?.description ||
          "Mengenal Kopi Beji sebagai salah satu ikon dan potensi unggulan Desa Beji."}
      </p>

    </div>
  </div>

</section>

      {/* Tentang */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <img
            src="https://placehold.co/800x600"
            alt="Kopi Beji"
            className="w-full rounded-2xl"
          />

          <div>
            <h2 className="text-3xl font-bold">
              Tentang Kopi Beji
            </h2>

            <p className="mt-5 text-gray-600 leading-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nanti isi
              akan diambil dari database.
            </p>
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-3xl font-bold">
            Sejarah Singkat
          </h2>

          <p className="mt-5 leading-8 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sejarah
            Kopi Beji nantinya dikelola melalui CMS.
          </p>
        </div>
      </section>

{/* Pelaku Kopi Beji */}
<section className="mx-auto max-w-7xl px-5 py-16">

  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-900">
      Pelaku Kopi Beji
    </h2>

    <p className="mx-auto mt-3 max-w-2xl text-gray-600">
      Kenali para pelaku yang terlibat dalam pengembangan Kopi Beji.
    </p>
  </div>

  <div className="mt-10 grid gap-8 md:grid-cols-2">

    {/* Pelaku 1 */}
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <img
        src="https://placehold.co/600x400"
        alt="Nama Pelaku 1"
        className="h-64 w-full object-cover"
      />

      <div className="p-6">

        <h3 className="text-2xl font-bold text-gray-900">
          Nama Pelaku 1
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Deskripsi singkat mengenai pelaku Kopi Beji.
          Informasi ini nantinya akan diambil dari database.
        </p>

        <Link
          to="/kopi/pelaku/1" 
          className="mt-6 inline-flex rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Lihat Detail
        </Link>

      </div>
    </div>


    {/* Pelaku 2 */}
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <img
        src="https://placehold.co/600x400"
        alt="Nama Pelaku 2"
        className="h-64 w-full object-cover"
      />

      <div className="p-6">

        <h3 className="text-2xl font-bold text-gray-900">
          Nama Pelaku 2
        </h3>

        <p className="mt-3 leading-7 text-gray-600">
          Deskripsi singkat mengenai pelaku Kopi Beji.
          Informasi ini nantinya akan diambil dari database.
        </p>

        <Link
          to="/kopi/pelaku/2"
          className="mt-6 inline-flex rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Lihat Detail
        </Link>

      </div>
    </div>

  </div>
</section>

      {/* Galeri */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="mb-8 text-3xl font-bold">
          Galeri Kopi Beji
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <img
            src="https://placehold.co/600x400"
            alt=""
            className="rounded-2xl"
          />
          <img
            src="https://placehold.co/600x400"
            alt=""
            className="rounded-2xl"
          />
          <img
            src="https://placehold.co/600x400"
            alt=""
            className="rounded-2xl"
          />
        </div>
      </section>
<Footer />
      
    </>
  );
}