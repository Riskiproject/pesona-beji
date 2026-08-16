
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getHeroBanners } from "../../services/heroService";
import { getPotensi } from "../../services/potensiService"


export default function PotensiPage() {

const [banners, setBanners] = useState<any[]>([]);
const [current, setCurrent] = useState(0);
const [potensi, setPotensi] = useState<any[]>([]);

useEffect(() => {

  loadBanner();
  loadPotensi();

}, []);

const loadBanner = async () => {
  try {
    const data = await getHeroBanners("potensi");

    if (data) {
      setBanners(data);
    }
  } catch (err) {
    console.error(err);
  }
};

const loadPotensi = async () => {
  try {

    const data = await getPotensi();

    if (data) {
      setPotensi(
        data.filter(
          (item: any) => item.is_active
        )
      );
    }

  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  if (banners.length <= 1) return;

  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, 5000);

  return () => clearInterval(interval);
}, [banners]);

const banner = banners[current];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[260px] md:h-[340px] lg:h-[380px]">
  <img
    src={banner?.image_url || "https://placehold.co/1600x900"}
    alt="Hero Potensi"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/50" />

  <div className="relative z-10 flex h-full items-center justify-center">
  <div className="px-5 text-center text-white translate-y-3 md:translate-y-0">

    <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] backdrop-blur md:px-4 md:text-sm">
      Pesona Beji
    </span>

    <h1 className="mt-3 text-2xl font-bold leading-tight md:mt-4 md:text-5xl">
      {banner?.title}
    </h1>

    <p className="mt-2 max-w-2xl text-[11px] leading-5 md:mt-3 md:text-lg">
      {banner?.description}
    </p>

  </div>
</div>
</section>

      {/* Potensi */}
<section className="bg-[#F7F4ED] py-16">
  <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">
            Potensi Desa Beji
          </h2>

          <p className="mt-3 text-gray-600">
            Berbagai potensi unggulan yang dimiliki Desa Beji.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
  {potensi.map((item) => (
    <div
      key={item.id}
      className="flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-lg sm:rounded-2xl"
    >
      <img
        src={item.image_url}
        alt={item.title}
        className="h-28 w-full object-cover sm:h-40 lg:h-56"
      />

      <div className="flex flex-1 flex-col p-3 sm:p-5 lg:p-6">
        <h3 className="text-sm font-semibold sm:text-lg lg:text-xl">
          {item.title}
        </h3>

        <p className="mt-2 text-xs text-gray-600 line-clamp-3 sm:mt-3 sm:text-sm lg:text-base">
          {item.short_description}
        </p>

        <Link
          to={`/potensi/${item.slug}`}
          className="mt-auto pt-3 text-xs font-semibold text-green-600 hover:underline sm:pt-4 sm:text-sm lg:text-base"
        >
          Lihat Detail →
        </Link>
      </div>
    </div>
  ))}
</div>
            </div>
    </section>

    <Footer />
     
    </>
  );
}