import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHero } from "../../../services/heroService";

export default function HeroPage() {
  const [berandaCount, setBerandaCount] = useState(0);
  const [potensiCount, setPotensiCount] = useState(0);
  const [kopiCount, setKopiCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const [beranda, potensi, kopi] = await Promise.all([
          getAllHero("beranda"),
          getAllHero("potensi"),
          getAllHero("kopi"),
        ]);

        setBerandaCount(beranda.length);
        setPotensiCount(potensi.length);
        setKopiCount(kopi.length);
      } catch (error) {
        console.error("Gagal mengambil data hero:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHero();
  }, []);

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Hero
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola hero yang tampil pada halaman publik Pesona Beji.
        </p>
      </div>


      {/* ========================= */}
      {/* HERO BERANDA */}
      {/* ========================= */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              🏠 Hero Beranda
            </h2>

            <p className="mt-2 text-gray-500">
              Slider utama yang tampil pada halaman Beranda.
            </p>

            <div className="mt-4 space-y-1 text-sm">

              <p>
                Banner :
                <span className="font-semibold">
                  {" "}
                  {loading ? "..." : `${berandaCount} / 3`}
                </span>
              </p>

              <p>
                Status :
                <span
                  className={`font-semibold ${
                    berandaCount > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {" "}
                  {loading
                    ? "Memuat..."
                    : berandaCount > 0
                    ? "Sudah dibuat"
                    : "Belum dibuat"}
                </span>
              </p>

            </div>

          </div>

          <Link
            to="/admin/hero/beranda"
            className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
          >
            Kelola Hero Beranda
          </Link>

        </div>

      </div>


      {/* ========================= */}
      {/* HERO POTENSI */}
      {/* ========================= */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              🌿 Hero Potensi
            </h2>

            <p className="mt-2 text-gray-500">
              Hero pembuka halaman Potensi.
            </p>

            <div className="mt-4 text-sm">

              <p>
                Status :
                <span
                  className={`font-semibold ${
                    potensiCount > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {" "}
                  {loading
                    ? "Memuat..."
                    : potensiCount > 0
                    ? "Sudah dibuat"
                    : "Belum dibuat"}
                </span>
              </p>

            </div>

          </div>

          <Link
            to="/admin/hero/potensi"
            className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
          >
            Kelola Hero Potensi
          </Link>

        </div>

      </div>


      {/* ========================= */}
      {/* HERO KOPI */}
      {/* ========================= */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              ☕ Hero Kopi
            </h2>

            <p className="mt-2 text-gray-500">
              Hero pembuka halaman Kopi Beji.
            </p>

            <div className="mt-4 text-sm">

              <p>
                Status :
                <span
                  className={`font-semibold ${
                    kopiCount > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {" "}
                  {loading
                    ? "Memuat..."
                    : kopiCount > 0
                    ? "Sudah dibuat"
                    : "Belum dibuat"}
                </span>
              </p>

            </div>

          </div>

          <Link
            to="/admin/hero/kopi"
            className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
          >
            Kelola Hero Kopi
          </Link>

        </div>

      </div>

    </div>
  );
}