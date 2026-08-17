import { useEffect, useState } from "react";
import { getTentangDesa } from "../../services/tentangDesaService";

export default function TentangDesa() {
  const [tentang, setTentang] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data = await getTentangDesa();
      setTentang(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (!tentang) return null;

  const content = tentang.content
    ? JSON.parse(tentang.content)
    : {};

  return (
    <section className="bg-[#FFF8EF] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-6 lg:px-8">

        {/* =========================
            HEADING
        ========================= */}
        <div className="mb-9 text-center md:mb-16">

          <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold text-green-700 md:px-5 md:py-2 md:text-sm">
            {tentang.badge}
          </span>

          <h2 className="mt-3 text-2xl font-extrabold leading-tight text-gray-900 md:mt-5 md:text-4xl">
          {tentang.title}
          </h2>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-gray-600 md:mt-5 md:text-lg md:leading-8">
            {tentang.description}
          </p>

        </div>

        {/* =========================
            FOTO + KONTEN
        ========================= */}
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">

          {/* =========================
              GAMBAR
          ========================= */}
          <div className="w-full overflow-hidden rounded-2xl bg-white shadow-lg md:rounded-3xl">

            <div className="aspect-[16/9] w-full lg:aspect-auto lg:h-[430px]">

              <img
                src={tentang.image_url}
                alt="Desa Beji"
                className="h-full w-full object-cover"
              />

            </div>

          </div>

          {/* =========================
              KONTEN
          ========================= */}
          <div>

            <h3 className="text-2xl font-bold text-green-800 md:text-3xl">
              {content.contentTitle}
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600 md:mt-6 md:text-base md:leading-8">
              {content.contentDescription}
            </p>

            {/* =========================
                4 CARD
            ========================= */}
            <div className="mt-6 grid grid-cols-2 gap-3 md:mt-10 md:gap-5">

              {/* CARD 1 */}
              <div className="rounded-xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:rounded-2xl md:p-6 md:shadow-md">

                <div className="text-2xl md:text-3xl">
                  🌿
                </div>

                <h4 className="mt-2 text-sm font-bold text-gray-900 md:mt-3 md:text-base">
                  Keindahan Alam
                </h4>

                <p className="mt-1.5 text-[11px] leading-4 text-gray-500 md:mt-2 md:text-sm md:leading-5">
                  Menyajikan panorama alam yang asri dan lingkungan Desa Beji yang menjadi daya tarik tersendiri.
                </p>

              </div>

              {/* CARD 2 */}
              <div className="rounded-xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:rounded-2xl md:p-6 md:shadow-md">

                <div className="text-2xl md:text-3xl">
                  ☕
                </div>

                <h4 className="mt-2 text-sm font-bold text-gray-900 md:mt-3 md:text-base">
                  Kopi Beji
                </h4>

                <p className="mt-1.5 text-[11px] leading-4 text-gray-500 md:mt-2 md:text-sm md:leading-5">
                  Kopi khas Desa Beji yang menjadi ikon utama dengan cita rasa autentik dan berkualitas.
                </p>

              </div>

              {/* CARD 3 */}
              <div className="rounded-xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:rounded-2xl md:p-6 md:shadow-md">

                <div className="text-2xl md:text-3xl">
                  🛍️
                </div>

                <h4 className="mt-2 text-sm font-bold text-gray-900 md:mt-3 md:text-base">
                  UMKM Lokal
                </h4>

                <p className="mt-1.5 text-[11px] leading-4 text-gray-500 md:mt-2 md:text-sm md:leading-5">
                  Beragam produk unggulan hasil kreativitas masyarakat yang mendukung perekonomian desa.
                </p>

              </div>

              {/* CARD 4 */}
              <div className="rounded-xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:rounded-2xl md:p-6 md:shadow-md">

                <div className="text-2xl md:text-3xl">
                  🤝
                </div>

                <h4 className="mt-2 text-sm font-bold text-gray-900 md:mt-3 md:text-base">
                  Masyarakat & Budaya
                </h4>

                <p className="mt-1.5 text-[11px] leading-4 text-gray-500 md:mt-2 md:text-sm md:leading-5">
                  Semangat gotong royong dan budaya lokal yang menjadi identitas serta kebanggaan Desa Beji.
                </p>

              </div>

            </div>

            {/* =========================
                BUTTON
            ========================= */}
            <button className="mt-6 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 md:mt-10 md:px-8 md:py-4 md:text-base">
              {tentang.button_text} →
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}