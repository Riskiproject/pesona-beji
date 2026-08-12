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
        min-h-[700px]

        /* 🖥️ DESKTOP */
        md:h-[540px]
        md:min-h-0
      "
    >
      {/* ========================= */}
      {/* BACKGROUND */}
      {/* ========================= */}

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

      {/* ========================= */}
      {/* GRADIENT */}
      {/* ========================= */}

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

      {/* ========================= */}
      {/* ISI HERO */}
      {/* ========================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1200px]

          /* 📱 MOBILE */
          flex
          items-start
          px-[38px]
          pt-[75px]
          pb-[100px]

          /* 🖥️ DESKTOP */
          md:absolute
          md:inset-0
          md:flex
          md:items-center
          md:px-[70px]
          md:pt-[90px]
          md:pb-0
        "
      >
        <div
          className="
            w-full
            max-w-[560px]

            /* 🖥️ DESKTOP */
            md:w-[48%]
            md:max-w-none
          "
        >
          {/* ========================= */}
          {/* BADGE */}
          {/* ========================= */}

          <div
            className="
              inline-block
              bg-[#8BC34A]
              text-white
              rounded-full
              font-semibold
              mb-[18px]

              /* 📱 MOBILE */
              px-[18px]
              py-[9px]
              text-[16px]

              /* 🖥️ DESKTOP */
              md:px-[22px]
              md:py-[10px]
              md:text-[16px]
            "
          >
            Selamat Datang di
          </div>

          {/* ========================= */}
          {/* TITLE */}
          {/* ========================= */}

          <h1
            className="
              m-0
              font-extrabold
              text-[#214E28]
              break-words

              /* 📱 MOBILE */
              text-[46px]
              leading-[1]

              /* 📱 HP BESAR */
              sm:text-[52px]

              /* 🖥️ DESKTOP */
              md:text-[78px]
            "
          >
            {banner.title}
          </h1>

          {/* ========================= */}
          {/* SUBTITLE */}
          {/* ========================= */}

          <h2
            className="
              font-bold
              text-[#3D3D3D]
              whitespace-pre-line

              /* 📱 MOBILE */
              mt-[18px]
              text-[27px]
              leading-[1.25]

              /* 📱 HP BESAR */
              sm:text-[30px]

              /* 🖥️ DESKTOP */
              md:mt-[22px]
              md:text-[38px]
              md:leading-[1.35]
            "
          >
            {banner.subtitle}
          </h2>

          {/* ========================= */}
          {/* DESCRIPTION */}
          {/* ========================= */}

          <p
            className="
              text-[#555]

              /* 📱 MOBILE */
              mt-[16px]
              max-w-full
              text-[16px]
              leading-[1.65]

              /* 📱 HP BESAR */
              sm:text-[17px]

              /* 🖥️ DESKTOP */
              md:mt-[22px]
              md:max-w-[520px]
              md:text-[18px]
              md:leading-[1.8]
            "
          >
            {banner.description}
          </p>

          {/* ========================= */}
          {/* BUTTONS */}
          {/* ========================= */}

          <div
            className="
              flex
              flex-wrap

              /* 📱 MOBILE */
              gap-[12px]
              mt-[18px]

              /* 🖥️ DESKTOP */
              md:gap-[18px]
              md:mt-[20px]
              md:translate-y-[-12px]
            "
          >
            {/* BUTTON 1 */}
            <a href={banner.button1_link}>
              <button
                className="
                  bg-[#1B5E20]
                  text-white
                  border-none
                  rounded-[12px]
                  font-bold
                  cursor-pointer

                  /* 📱 MOBILE */
                  px-[22px]
                  py-[13px]
                  text-[16px]

                  /* 🖥️ DESKTOP */
                  md:px-[30px]
                  md:py-[16px]
                "
              >
                {banner.button1_text}
              </button>
            </a>

            {/* BUTTON 2 */}
            <a href={banner.button2_link}>
              <button
                className="
                  bg-white
                  text-[#5D4037]
                  border-2
                  border-[#BCAAA4]
                  rounded-[12px]
                  font-bold
                  cursor-pointer

                  /* 📱 MOBILE */
                  px-[22px]
                  py-[13px]
                  text-[16px]

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

      {/* ========================= */}
      {/* DOT SLIDER */}
      {/* ========================= */}

      <div
        className="
          absolute
          left-0
          w-full
          flex
          justify-center
          gap-[10px]

          /* 📱 MOBILE */
          bottom-[22px]

          /* 🖥️ DESKTOP */
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