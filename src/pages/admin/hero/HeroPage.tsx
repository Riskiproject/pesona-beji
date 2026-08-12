import { Link } from "react-router-dom";

export default function HeroPage() {
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

      {/* Hero Beranda */}
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
                <span className="font-semibold"> 0 / 3</span>
              </p>

              <p>
                Status :
                <span className="font-semibold text-red-600">
                  {" "}Belum dibuat
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

      {/* Hero Potensi */}
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
                <span className="font-semibold text-red-600">
                  {" "}Belum dibuat
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

      {/* Hero Kopi */}
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
                <span className="font-semibold text-red-600">
                  {" "}Belum dibuat
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