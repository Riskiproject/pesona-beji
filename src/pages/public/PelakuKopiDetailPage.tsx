import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function KopiPelakuDetailPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* Konten utama */}
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-25">

          <Link
  to="/kopi"
  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700"
>
  ← Kembali ke Kopi Beji
</Link>

          {/* Tentang Pelaku */}
<section className="mt-4">
 <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

              {/* Foto Pelaku */}
              <div>
                <img
                  src="https://placehold.co/800x600"
                  alt="Nama Pelaku"
                  className="h-[320px] w-full rounded-2xl object-cover shadow-sm md:h-[420px]"
                />
              </div>

              {/* Informasi Pelaku */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  Tentang Pelaku
                </h1>

                <h2 className="mt-5 text-2xl font-semibold text-green-700">
                  Nama Pelaku
                </h2>

                <p className="mt-4 leading-8 text-gray-600">
                  Nama Pelaku merupakan salah satu pelaku yang
                  terlibat dalam pengembangan Kopi Beji. Informasi
                  mengenai perjalanan, aktivitas, dan peran pelaku
                  dalam mengembangkan Kopi Beji nantinya akan
                  dikelola melalui CMS.
                </p>

                <p className="mt-4 leading-8 text-gray-600">
                  Deskripsi lengkap mengenai pelaku akan ditampilkan
                  pada bagian ini.
                </p>
              </div>

            </div>
          </section>

          {/* Produk yang Dihasilkan */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900">
              Produk yang Dihasilkan
            </h2>

            <div className="mt-6 rounded-2xl border bg-gray-50 p-6 md:p-8">
              <p className="leading-8 text-gray-600">
                Kopi Beji yang dihasilkan berupa bubuk kopi yang
                telah dikemas menggunakan brand sendiri dan siap
                dipasarkan kepada konsumen.
              </p>
            </div>
          </section>

          {/* Galeri */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900">
              Galeri
            </h2>

            <p className="mt-3 text-gray-600">
              Dokumentasi pelaku, produk, proses pengolahan,
              dan aktivitas Kopi Beji.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">

              <img
                src="https://placehold.co/600x400"
                alt="Galeri Kopi Beji"
                className="h-56 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
              />

              <img
                src="https://placehold.co/600x400"
                alt="Galeri Kopi Beji"
                className="h-56 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
              />

              <img
                src="https://placehold.co/600x400"
                alt="Galeri Kopi Beji"
                className="h-56 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
              />

              <img
                src="https://placehold.co/600x400"
                alt="Galeri Kopi Beji"
                className="h-56 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
              />

              <img
                src="https://placehold.co/600x400"
                alt="Galeri Kopi Beji"
                className="h-56 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
              />

              <img
                src="https://placehold.co/600x400"
                alt="Galeri Kopi Beji"
                className="h-56 w-full rounded-2xl object-cover shadow-sm transition hover:scale-[1.02]"
              />

            </div>
          </section>

          {/* Hubungi Pelaku */}
          <section className="mt-20">
            <div className="rounded-2xl bg-gray-50 p-8 md:p-10">

              <h2 className="text-3xl font-bold text-gray-900">
                Hubungi Pelaku
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Hubungi pelaku Kopi Beji atau kunjungi lokasinya
                untuk mendapatkan informasi lebih lanjut.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">

                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  💬 WhatsApp
                </a>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  📍 Lihat Lokasi
                </a>

              </div>

            </div>
          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}