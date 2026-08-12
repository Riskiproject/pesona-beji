import { useEffect, useState } from "react";
import { getHeroBanners } from "../../services/heroService";

export default function Hero() {
  const [banners, setBanners] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    loadBanner();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  const loadBanner = async () => {
    try {
      const data = await getHeroBanners("beranda");

      if (data) {
        setBanners(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const banner = banners[current];

  if (!banner) return null;

  return (
    <section className="relative w-full h-[600px] md:h-[540px] overflow-hidden">

      {/* Background */}
      <img
        src={banner.image_url}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient kiri */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 15% 35%,
              rgba(255,245,220,0.82) 0%,
              rgba(255,245,220,0.65) 22%,
              rgba(255,245,220,0.40) 42%,
              rgba(255,245,220,0.15) 60%,
              rgba(255,245,220,0) 80%
            ),
            linear-gradient(
              90deg,
              rgba(255,248,235,.60) 0%,
              rgba(255,248,235,.30) 30%,
              rgba(255,248,235,.08) 50%,
              rgba(255,248,235,0) 72%
            )
          `,
        }}
      />

      {/* Isi */}
      <div className="
        absolute inset-0
        max-w-[1200px]
        mx-auto
        flex items-start md:items-center
        px-5 md:px-10 lg:px-[70px]
        pt-[55px] md:pt-[90px]
      ">
        <div className="w-full md:w-[60%] lg:w-[48%]">

          {/* Badge */}
          <div className="
            inline-block
            bg-[#8BC34A]
            text-white
            px-4 py-2 md:px-[22px] md:py-[10px]
            rounded-full
            font-semibold
            text-sm md:text-base
            mb-3 md:mb-[18px]
          ">
            Selamat Datang di
          </div>

          {/* Judul */}
          <h1 className="
            m-0
            text-[46px]
            sm:text-[52px]
            md:text-[58px]
            lg:text-[78px]
            text-[#214E28]
            font-extrabold
            leading-[1.05]
            md:leading-none
          ">
            {banner.title}
          </h1>

          {/* Subtitle */}
          <h2 className="
            mt-4 md:mt-[22px]
            text-[25px]
            sm:text-[28px]
            md:text-[30px]
            lg:text-[38px]
            leading-[1.3] md:leading-[1.35]
            font-bold
            text-[#3D3D3D]
            whitespace-pre-line
          ">
            {banner.subtitle}
          </h2>

          {/* Deskripsi */}
          <p className="
            mt-4 md:mt-[22px]
            text-[15px]
            md:text-[18px]
            text-[#555]
            leading-[1.6] md:leading-[1.8]
            max-w-full md:max-w-[520px]
          ">
            {banner.description}
          </p>

          {/* Tombol */}
          <div className="
            flex flex-wrap
            gap-2.5 md:gap-[18px]
            mt-[18px] md:mt-5
          ">

            <a href={banner.button1_link}>
              <button className="
                bg-[#1B5E20]
                text-white
                border-none
                rounded-xl
                px-[18px] py-3
                md:px-[30px] md:py-4
                text-sm md:text-base
                font-bold
                cursor-pointer
              ">
                {banner.button1_text}
              </button>
            </a>

            <a href={banner.button2_link}>
              <button className="
                bg-white
                text-[#5D4037]
                border-2 border-[#BCAAA4]
                rounded-xl
                px-[18px] py-[11px]
                md:px-[30px] md:py-[14px]
                text-sm md:text-base
                font-bold
                cursor-pointer
              ">
                {banner.button2_text}
              </button>
            </a>

          </div>
        </div>
      </div>

      {/* Dot Slider */}
      <div className="
        absolute
        bottom-5 md:bottom-[35px]
        w-full
        flex
        justify-center
        gap-2.5
      ">
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              w-2.5 h-2.5 md:w-3 md:h-3
              rounded-full
              cursor-pointer
              ${
                current === index
                  ? "bg-white"
                  : "bg-white/50"
              }
            `}
          />
        ))}
      </div>

    </section>
  );
}