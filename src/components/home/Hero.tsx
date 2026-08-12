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
    <section
      className="
        relative
        w-full
        h-[560px]
        md:h-[540px]
        overflow-hidden
      "
    >
      {/* Background */}
      <img
        src={banner.image_url}
        alt="Hero"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* Gradient */}
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
      <div
        className="
          absolute
          inset-0
          mx-auto
          flex
          items-center
          max-w-[1200px]
          px-[38px]
          pt-[70px]

          md:px-[70px]
          md:pt-[90px]
        "
      >
        <div
          className="
            w-full

            md:w-[48%]
          "
        >
          {/* Badge */}
          <div
            className="
              inline-block
              bg-[#8BC34A]
              text-white
              px-[18px]
              py-[9px]
              rounded-full
              font-semibold
              text-[16px]
              mb-[18px]

              md:px-[22px]
              md:py-[10px]
              md:text-[16px]
            "
          >
            Selamat Datang di
          </div>

          {/* Title */}
          <h1
            className="
              m-0
              text-[46px]
              leading-[1]
              font-extrabold
              text-[#214E28]
              break-words

              sm:text-[52px]

              md:text-[78px]
            "
          >
            {banner.title}
          </h1>

          {/* Subtitle */}
          <h2
            className="
              mt-[18px]
              text-[27px]
              leading-[1.25]
              font-bold
              text-[#3D3D3D]
              whitespace-pre-line

              sm:text-[30px]

              md:mt-[22px]
              md:text-[38px]
              md:leading-[1.35]
            "
          >
            {banner.subtitle}
          </h2>

          {/* Description */}
          <p
            className="
              mt-[16px]
              max-w-full
              text-[16px]
              leading-[1.65]
              text-[#555]

              sm:text-[17px]

              md:mt-[22px]
              md:max-w-[520px]
              md:text-[18px]
              md:leading-[1.8]
            "
          >
            {banner.description}
          </p>

          {/* Buttons */}
          <div
            className="
              flex
              flex-wrap
              gap-[12px]
              mt-[18px]

              md:gap-[18px]
              md:mt-[20px]
              md:translate-y-[-12px]
            "
          >
            <a href={banner.button1_link}>
              <button
                className="
                  bg-[#1B5E20]
                  text-white
                  border-none
                  rounded-[12px]
                  px-[22px]
                  py-[13px]
                  text-[16px]
                  font-bold
                  cursor-pointer

                  md:px-[30px]
                  md:py-[16px]
                "
              >
                {banner.button1_text}
              </button>
            </a>

            <a href={banner.button2_link}>
              <button
                className="
                  bg-white
                  text-[#5D4037]
                  border-2
                  border-[#BCAAA4]
                  rounded-[12px]
                  px-[22px]
                  py-[13px]
                  text-[16px]
                  font-bold
                  cursor-pointer

                  md:px-[30px]
                  md:py-[16px]
                "
              >
                {banner.button2_text}
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Dot Slider */}
      <div
        className="
          absolute
          bottom-[22px]
          left-0
          w-full
          flex
          justify-center
          gap-[10px]

          md:bottom-[35px]
        "
      >
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className="
              w-[12px]
              h-[12px]
              rounded-full
              cursor-pointer
            "
            style={{
              background:
                current === index
                  ? "#fff"
                  : "rgba(255,255,255,.5)",
            }}
          />
        ))}
      </div>
    </section>
  );
}