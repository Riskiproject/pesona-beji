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

  const menuStyle = ({
    isActive,
  }: {
    isActive: boolean;
  }) => ({
    color: isActive ? "#2E7D32" : "#333",
    fontWeight: isActive ? "700" : "400",
    textDecoration: "none",
    borderBottom: isActive
      ? "3px solid #2E7D32"
      : "3px solid transparent",
    paddingBottom: "6px",
    transition: "all 0.2s ease",
  });

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 20px",
        }}
      >
        {/* LOGO + NAMA WEBSITE */}
        <NavLink
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          {pengaturan?.logo_url && (
            <img
              src={pengaturan.logo_url}
              alt={pengaturan.nama_website}
              style={{
                height: "42px",
                width: "42px",
                objectFit: "contain",
              }}
            />
          )}

          <h2
            style={{
              color: "#2E7D32",
              fontWeight: "bold",
              margin: 0,
              fontSize: "24px",
            }}
          >
            {pengaturan?.nama_website ||
              "Pesona Beji"}
          </h2>
        </NavLink>

        {/* MENU */}
        <nav>
          <ul
            style={{
              display: "flex",
              gap: "30px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <NavLink
                to="/"
                style={menuStyle}
              >
                Beranda
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/potensi"
                style={menuStyle}
              >
                Potensi
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/kopi"
                style={menuStyle}
              >
                Kopi Beji
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/umkm"
                style={menuStyle}
              >
                UMKM
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/berita"
                style={menuStyle}
              >
                Berita
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/galeri"
                style={menuStyle}
              >
                Galeri
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/kontak"
                style={menuStyle}
              >
                Kontak
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}