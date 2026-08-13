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
      style={{
        position: "relative",
        width: "100%",
        height: "540px",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <img
        src={banner.image_url}
        alt="Hero"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Gradient kiri */}
      <div
        style={{
          position: "absolute",
          inset: 0,
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
        style={{
          position: "absolute",
          inset: 0,
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          padding: "0 70px",
          paddingTop: "90px",
        }}
      >
        <div
          style={{
            width: "48%",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#8BC34A",
              color: "#fff",
              padding: "10px 22px",
              borderRadius: "50px",
              fontWeight: 600,
              marginBottom: "18px",
            }}
          >
            Selamat Datang di
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "78px",
              color: "#214E28",
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {banner.title}
          </h1>

          <h2
            style={{
              marginTop: "22px",
              fontSize: "38px",
              lineHeight: 1.35,
              fontWeight: 700,
              color: "#3D3D3D",
              whiteSpace: "pre-line",
            }}
          >
            {banner.subtitle}
          </h2>

          <p
            style={{
              marginTop: "22px",
              color: "#555",
              lineHeight: 1.8,
              fontSize: "18px",
              maxWidth: "520px",
            }}
          >
            {banner.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "18px",
              marginTop: "20px",
              transform: "translateY(-12px)",
            }}
          >
            <a href={banner.button1_link}>
              <button
                style={{
                  background: "#1B5E20",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  padding: "16px 30px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {banner.button1_text}
              </button>
            </a>

            <a href={banner.button2_link}>
              <button
                style={{
                  background: "#fff",
                  color: "#5D4037",
                  border: "2px solid #BCAAA4",
                  borderRadius: "12px",
                  padding: "16px 30px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {banner.button2_text}
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Dot Slider */}
      <div
        style={{
          position: "absolute",
          bottom: "35px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {banners.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              cursor: "pointer",
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