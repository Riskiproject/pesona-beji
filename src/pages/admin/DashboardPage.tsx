export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Welcome Banner */}
<section className="overflow-hidden rounded-3xl bg-white shadow-sm border">

  <div className="grid h-[280px] grid-cols-2">

    {/* Kiri */}
    <div className="flex flex-col justify-center px-12">

      <h1 className="text-5xl font-bold leading-tight">
        Selamat Datang,
      </h1>

      <h2 className="mt-2 text-5xl font-bold text-green-700">
        di Pesona Beji CMS 🌿
      </h2>

      <p className="mt-6 max-w-md text-lg text-gray-500">
        Kelola seluruh konten website Pesona Beji
        dengan mudah dan cepat.
      </p>

    </div>

    {/* Kanan */}
    <div className="relative">

      <div className="absolute inset-0 bg-gradient-to-l from-green-100 to-white"></div>

      <div className="flex h-full items-center justify-center">

        <div className="flex h-52 w-80 items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-100 text-gray-400">

          FOTO DESA BEJI

        </div>

      </div>

    </div>

  </div>

</section>

      {/* Statistik */}
      <section className="grid grid-cols-4 gap-6">

        <div className="h-44 rounded-2xl border bg-white shadow-sm"></div>

        <div className="h-44 rounded-2xl border bg-white shadow-sm"></div>

        <div className="h-44 rounded-2xl border bg-white shadow-sm"></div>

        <div className="h-44 rounded-2xl border bg-white shadow-sm"></div>

      </section>

      {/* Bottom */}
      <section className="grid grid-cols-3 gap-6">

        <div className="col-span-2 h-[430px] rounded-2xl border bg-white shadow-sm"></div>

        <div className="h-[430px] rounded-2xl border bg-white shadow-sm"></div>

      </section>

      {/* Footer */}
<footer className="mt-8 border-t border-gray-200 pt-5 pb-2 text-center">
  <p className="text-sm font-medium text-gray-600">
    © 2026 Pesona Beji CMS
  </p>

  <p className="mt-1 text-xs text-gray-400">
    Powered by TechLearn Project
  </p>
</footer>

    </div>
  );
}