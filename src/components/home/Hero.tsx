import { useEffect, useState } from "react";
import { getHeroBanners } from "../../services/heroService";
import HeroDesktop from "./HeroDesktop"
import HeroMobile from "./HeroMobile";

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
    <>
      {/* 📱 MOBILE */}
      <div className="block md:hidden">
        <HeroMobile
          banner={banner}
          banners={banners}
          current={current}
          setCurrent={setCurrent}
        />
      </div>

      {/* 🖥️ DESKTOP */}
      <div className="hidden md:block">
        <HeroDesktop
          banner={banner}
          banners={banners}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </>
  );
}