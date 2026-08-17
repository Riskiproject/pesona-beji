import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getKontak } from "../../services/kontakService";

type Kontak = {
  id: string;
  nama_instansi: string;
  alamat: string | null;
  whatsapp: string | null;
};

export default function KontakPreview() {
  const [kontak, setKontak] = useState<Kontak | null>(null);

  useEffect(() => {
    const loadKontak = async () => {
      try {
        const data = await getKontak();

        if (data && data.length > 0) {
          setKontak(data[0]);
        }
      } catch (error) {
        console.error("Gagal mengambil data kontak:", error);
      }
    };

    loadKontak();
  }, []);

  if (!kontak) {
    return null;
  }

  const whatsappNumber = kontak.whatsapp
  ? (() => {
      let number = kontak.whatsapp.replace(/\D/g, "");

      if (number.startsWith("0")) {
        number = "62" + number.slice(1);
      }

      return number;
    })()
  : "";

  return (
    <section className="bg-[#F7F4ED] px-5 py-12 md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 text-center md:mb-10">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-700">
            Kontak
          </span>

          <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
          Hubungi Desa Beji
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 md:text-base">
            Silakan hubungi kami untuk mendapatkan informasi tentang Desa Beji.
          </p>
        </div>

        {/* CONTENT */}
        <div className="mx-auto max-w-6xl">

          {/* INSTANSI */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-green-700 md:text-sm">
              Instansi
            </p>

            <h3 className="mt-1 text-xl font-bold leading-tight text-gray-900 md:mt-2 md:text-3xl">
            {kontak.nama_instansi}
            </h3>
          </div>

          {/* INFORMASI */}
          <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">

            {/* ALAMAT */}
            <div className="rounded-2xl bg-white/60 p-5">
              <div className="flex items-start gap-3">

                <span className="text-xl md:text-2xl">
                  📍
                </span>

                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900">
                    Alamat
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-gray-600 md:text-base">
                    {kontak.alamat || "Alamat belum tersedia."}
                  </p>
                </div>

              </div>
            </div>

            {/* WHATSAPP */}
            <div className="rounded-2xl bg-white/60 p-5">
              <div className="flex items-start gap-3">

                <span className="text-xl md:text-2xl">
                  💬
                </span>

                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900">
                    WhatsApp
                  </h4>

                  <p className="mt-1 text-sm text-gray-600 md:text-base">
                    {kontak.whatsapp || "WhatsApp belum tersedia."}
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* BUTTON */}
          <div className="mt-6 flex flex-wrap gap-3">

            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 md:text-base"
              >
                💬 Chat WhatsApp →
              </a>
            )}

            <Link
              to="/kontak"
              className="inline-flex rounded-xl border border-gray-300 bg-transparent px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-white/60 md:text-base"
            >
              Lihat Kontak Lengkap →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}