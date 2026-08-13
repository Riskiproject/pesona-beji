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
        overflow-hidden

        /* 📱 MOBILE */
h-[350px]

/* 🖥️ DESKTOP */
md:h-[540px]
      "
    >

      {/* ================================================= */}
      {/* BACKGROUND FOTO — 📱 MOBILE & 🖥️ DESKTOP */}
      {/* ================================================= */}

      <img
        src={banner.image_url}
        alt="Hero"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
        "
      />

      {/* ================================================= */}
      {/* GRADIENT — TETAP */}
      {/* ================================================= */}

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

      {/* ================================================= */}
      {/* ISI HERO */}
      {/* ================================================= */}

      <div
        className="
          absolute
          inset-0
          z-10
          mx-auto
          flex
          w-full
          max-w-[1200px]

          /* 📱 MOBILE */
items-start
px-[24px]
pt-[25px]

/* 🖥️ DESKTOP */
md:items-center
md:px-[70px]
md:pt-[90px]
        "
      >

        <div
          className="
            w-full

            /* 📱 MOBILE */
max-w-[360px]

/* 🖥️ DESKTOP */
md:w-[48%]
md:max-w-none
          "
        >

          {/* ================================================= */}
          {/* BADGE — 📱 MOBILE */}
          {/* ================================================= */}

          <div
            className="
              inline-block
              bg-[#8BC34A]
              text-white
              rounded-full
              font-semibold

              px-[20px]
              py-[10px]
              text-[16px]
              mb-[18px]

              /* 🖥️ DESKTOP */
              md:px-[22px]
              md:py-[10px]
              md:text-[16px]
            "
          >
            Selamat Datang di
          </div>

          {/* ================================================= */}
          {/* TITLE */}
          {/* ================================================= */}

          <h1
            className="
              m-0
              font-extrabold
              text-[#214E28]
              break-words

              /* 📱 MOBILE */
              text-[42px]
leading-[1]

              /* 🖥️ DESKTOP */
              md:text-[78px]
              md:leading-[1]
            "
          >
            {banner.title}
          </h1>

          {/* ================================================= */}
          {/* SUBTITLE */}
          {/* ================================================= */}

          <h2
            className="
              font-bold
              text-[#3D3D3D]
              whitespace-pre-line

              /* 📱 MOBILE */
             mt-[12px]
text-[21px]
leading-[1.25]

              /* 🖥️ DESKTOP */
              md:mt-[22px]
              md:text-[38px]
              md:leading-[1.35]
            "
          >
            {banner.subtitle}
          </h2>

          {/* ================================================= */}
          {/* DESCRIPTION */}
          {/* ================================================= */}

          <p
            className="
              text-[#555]

              /* 📱 MOBILE */
              mt-[12px]
max-w-[340px]
text-[14px]
leading-[1.5]

              /* 🖥️ DESKTOP */
              md:mt-[22px]
              md:max-w-[520px]
              md:text-[18px]
              md:leading-[1.8]
            "
          >
            {banner.description}
          </p>

          {/* ================================================= */}
          {/* BUTTONS */}
          {/* ================================================= */}

          <div
            className="
              flex
flex-nowrap
items-center

/* 📱 MOBILE */
gap-[8px]
mt-[15px]

/* 🖥️ DESKTOP */
md:gap-[18px]
md:mt-[20px]
md:translate-y-[-12px]
            "
          >

            {/* BUTTON 1 */}

            <a
              href={banner.button1_link}
              className="shrink-0"
            >
              <button
                className="
                  bg-[#1B5E20]
                  text-white
                  border-none
                  rounded-[12px]
                  font-bold
                  cursor-pointer
                  whitespace-nowrap

                  /* 📱 MOBILE */
                  px-[16px]
                  py-[11px]
                  text-[14px]

                  /* 🖥️ DESKTOP */
                  md:px-[30px]
                  md:py-[16px]
                "
              >
                {banner.button1_text}
              </button>
            </a>

            {/* BUTTON 2 */}

            <a
              href={banner.button2_link}
              className="shrink-0"
            >
              <button
                className="
                  bg-white
                  text-[#5D4037]
                  border-2
                  border-[#BCAAA4]
                  rounded-[12px]
                  font-bold
                  cursor-pointer
                  whitespace-nowrap

                  /* 📱 MOBILE */
                  px-[16px]
                  py-[11px]
                  text-[14px]

                  /* 🖥️ DESKTOP */
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

      {/* ================================================= */}
      {/* DOT SLIDER */}
      {/* ================================================= */}

      <div
        className="
          absolute
          bottom-[12px]
          left-0
          z-20
          flex
          w-full
          justify-center
          gap-[10px]

          /* 🖥️ DESKTOP */
          md:bottom-[35px]
        "
      >
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className="
              h-[12px]
              w-[12px]
              cursor-pointer
              rounded-full
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