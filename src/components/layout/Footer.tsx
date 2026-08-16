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
    <footer className="border-t border-gray-200 py-7 md:py-10">

      <div className="mx-auto max-w-7xl px-4 md:px-5">

        <div className="flex flex-col items-center text-center">

          {/* LOGO */}
          {logoUrl && (
            <img
              src={logoUrl}
              alt={namaWebsite}
              className="mb-2 h-11 w-11 object-contain md:mb-4 md:h-16 md:w-16"
            />
          )}

          {/* DESKRIPSI */}
          {deskripsi && (
            <p className="max-w-md text-xs leading-5 text-gray-500 md:max-w-xl md:text-sm md:leading-6">
              {deskripsi}
            </p>
          )}

          {/* COPYRIGHT */}
          <p className="mt-2 text-sm font-medium text-gray-700 md:mt-3 md:text-lg">
            © {year} {namaWebsite}
          </p>

          {/* CREDIT */}
          <p className="mt-1 text-[11px] text-gray-400 md:mt-2 md:text-sm">
            Powered by TeachLearn Project
          </p>

        </div>

      </div>

    </footer>
  );
}