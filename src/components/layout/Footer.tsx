import { useEffect, useState } from "react";

import { getPengaturan } from "../../services/pengaturanService";

export default function Footer() {
  const year = new Date().getFullYear();

  const [namaWebsite, setNamaWebsite] =
    useState("Pesona Beji");

  const [deskripsi, setDeskripsi] =
    useState("");

  const [logoUrl, setLogoUrl] =
    useState<string | null>(null);

  useEffect(() => {
    loadPengaturan();
  }, []);

  async function loadPengaturan() {
    try {
      const data = await getPengaturan();

      if (data) {
        setNamaWebsite(
          data.nama_website || "Pesona Beji"
        );

        setDeskripsi(
          data.deskripsi || ""
        );

        setLogoUrl(
          data.logo_url || null
        );
      }
    } catch (error) {
      console.error(
        "Gagal mengambil pengaturan:",
        error
      );
    }
  }

  return (
    <footer className="border-t border-gray-200 py-10">

      <div className="mx-auto max-w-7xl px-5">

        <div className="flex flex-col items-center text-center">

          {/* Logo */}
{logoUrl && (
  <img
    src={logoUrl}
    alt={namaWebsite}
    className="mb-4 h-16 w-16 object-contain"
  />
)}

{/* Deskripsi */}
{deskripsi && (
  <p className="max-w-xl text-sm leading-6 text-gray-500">
    {deskripsi}
  </p>
)}

{/* Copyright */}
<p className="mt-3 text-lg font-medium text-gray-700">
  © {year} {namaWebsite}
</p>

{/* Credit */}
<p className="mt-2 text-sm text-gray-400">
  Powered by TeachLearn Project
</p>

        </div>

      </div>

    </footer>
  );
}