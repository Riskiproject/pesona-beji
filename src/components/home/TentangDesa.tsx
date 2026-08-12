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

const content = tentang.content ? JSON.parse(tentang.content) : {};


  return (
    <section className="bg-[#FFF8EF] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
            {tentang.badge}
          </span>

          <h2 className="mt-5 text-4xl font-extrabold text-gray-900">
            {tentang.title}
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {tentang.description}
          </p>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Gambar */}
          <div>
            <img
              src={tentang.image_url}
              alt="Desa Beji"
              className="h-[430px] w-full rounded-3xl object-cover shadow-xl"
            />
          </div>

          {/* Konten */}
          <div>
            <h3 className="text-3xl font-bold text-green-800">
              {content.contentTitle}
            </h3>

            <p className="mt-6 leading-8 text-gray-600">
              {content.contentDescription}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-5">
  

  <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
    <div className="text-3xl">🌿</div>
    <h4 className="mt-3 font-bold">
      Keindahan Alam
    </h4>
    <p className="mt-2 text-sm text-gray-500">
      Menyajikan panorama alam yang asri dan lingkungan Desa Beji yang menjadi daya tarik tersendiri.
    </p>
  </div>

  <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
    <div className="text-3xl">☕</div>
    <h4 className="mt-3 font-bold">
      Kopi Beji
    </h4>
    <p className="mt-2 text-sm text-gray-500">
      Kopi khas Desa Beji yang menjadi ikon utama dengan cita rasa autentik dan berkualitas.
    </p>
  </div>

  <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
    <div className="text-3xl">🛍️</div>
    <h4 className="mt-3 font-bold">
      UMKM Lokal
    </h4>
    <p className="mt-2 text-sm text-gray-500">
      Beragam produk unggulan hasil kreativitas masyarakat yang mendukung perekonomian desa.
    </p>
  </div>

  <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
    <div className="text-3xl">🤝</div>
    <h4 className="mt-3 font-bold">
      Masyarakat & Budaya
    </h4>
    <p className="mt-2 text-sm text-gray-500">
      Semangat gotong royong dan budaya lokal yang menjadi identitas serta kebanggaan Desa Beji.
    </p>
  </div>

</div> 

            <button className="mt-10 rounded-xl bg-green-700 px-8 py-4 font-semibold text-white transition hover:bg-green-800">
              {tentang.button_text}  →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}