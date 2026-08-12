import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getPengaturan } from "../../services/pengaturanService";

type Pengaturan = {
  nama_website: string;
  logo_url: string | null;
};

export default function Navbar() {
  const [pengaturan, setPengaturan] =
    useState<Pengaturan | null>(null);

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  useEffect(() => {
    loadPengaturan();
  }, []);

  async function loadPengaturan() {
    try {
      const data = await getPengaturan();

      if (data) {
        setPengaturan({
          nama_website: data.nama_website,
          logo_url: data.logo_url,
        });
      }
    } catch (error) {
      console.error(
        "Gagal mengambil pengaturan:",
        error
      );
    }
  }

  const menus = [
    { label: "Beranda", path: "/" },
    { label: "Potensi", path: "/potensi" },
    { label: "Kopi Beji", path: "/kopi" },
    { label: "UMKM", path: "/umkm" },
    { label: "Berita", path: "/berita" },
    { label: "Galeri", path: "/galeri" },
    { label: "Kontak", path: "/kontak" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6 md:py-4 lg:px-8">

        {/* LOGO + NAMA WEBSITE */}
        <NavLink
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex min-w-0 items-center gap-2 sm:gap-3"
        >
          {pengaturan?.logo_url && (
            <img
              src={pengaturan.logo_url}
              alt={pengaturan.nama_website}
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10 md:h-[42px] md:w-[42px]"
            />
          )}

          <h2 className="truncate text-lg font-bold text-[#2E7D32] sm:text-xl md:text-2xl">
            {pengaturan?.nama_website || "Pesona Beji"}
          </h2>
        </NavLink>

        {/* =========================
            MENU DESKTOP
        ========================== */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-5 lg:gap-7 xl:gap-[30px]">
            {menus.map((menu) => (
              <li key={menu.path}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    `inline-block border-b-[3px] pb-1.5 text-sm transition-all duration-200 lg:text-base ${
                      isActive
                        ? "border-[#2E7D32] font-bold text-[#2E7D32]"
                        : "border-transparent font-normal text-[#333] hover:text-[#2E7D32]"
                    }`
                  }
                >
                  {menu.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* =========================
            TOMBOL MENU MOBILE
        ========================== */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-2xl text-[#2E7D32] transition hover:bg-green-50 md:hidden"
          aria-label={
            isMenuOpen
              ? "Tutup menu"
              : "Buka menu"
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* =========================
          MENU MOBILE
      ========================== */}
      {isMenuOpen && (
        <nav className="border-t border-gray-100 bg-white shadow-md md:hidden">
          <ul className="mx-auto max-w-[1200px] px-4 py-2 sm:px-6">
            {menus.map((menu) => (
              <li key={menu.path}>
                <NavLink
                  to={menu.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-base transition ${
                      isActive
                        ? "bg-green-50 font-bold text-[#2E7D32]"
                        : "text-[#333] hover:bg-gray-50 hover:text-[#2E7D32]"
                    }`
                  }
                >
                  {menu.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}