import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { getHeroBanners } from "../../services/heroService";
import { getBerita } from "../../services/beritaService";
import { getPotensi } from "../../services/potensiService";
import { getUmkm } from "../../services/umkmService";
import { getGaleri } from "../../services/galeriService";

export default function DashboardPage() {
  const [banner, setBanner] = useState<any>(null);
  const [stats, setStats] = useState({
  berita: 0,
  potensi: 0,
  umkm: 0,
  galeri: 0,
});

const [loadingStats, setLoadingStats] = useState(true);
const [recentContent, setRecentContent] = useState<any[]>([]);
const [loadingRecent, setLoadingRecent] = useState(true);
const [summary, setSummary] = useState({
  total: 0,
  active: 0,
  draft: 0,
  lastUpdate: null as string | null,
});

const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
  loadBanner();
  loadStats();
  loadRecentContent();
  loadSummary();
}, []);

  async function loadBanner() {
    try {
      const data = await getHeroBanners("beranda");

      if (data && data.length > 0) {
        setBanner(data[0]);
      }
    } catch (error) {
      console.error("Gagal mengambil banner:", error);
    }
  }

  async function loadStats() {
  try {
    setLoadingStats(true);

    const [
      beritaData,
      potensiData,
      umkmData,
      galeriData,
    ] = await Promise.all([
      getBerita(),
      getPotensi(),
      getUmkm(),
      getGaleri(),
    ]);

    setStats({
      berita: beritaData?.length ?? 0,
      potensi: potensiData?.length ?? 0,
      umkm: umkmData?.length ?? 0,
      galeri: galeriData?.length ?? 0,
    });

  } catch (error) {
    console.error(
      "Gagal mengambil statistik dashboard:",
      error
    );
  } finally {
    setLoadingStats(false);
  }
}

  async function loadRecentContent() {
    try {
      setLoadingRecent(true);

      const [
        beritaData,
        potensiData,
        umkmData,
        galeriData,
      ] = await Promise.all([
        getBerita(),
        getPotensi(),
        getUmkm(),
        getGaleri(),
      ]);

      const berita = (beritaData || []).map((item: any) => ({
        id: `berita-${item.id}`,
        title: item.judul,
        category: "Berita",
        date: item.tanggal_publish || item.created_at,
        icon: "📰",
      }));

      const potensi = (potensiData || []).map((item: any) => ({
        id: `potensi-${item.id}`,
        title: item.title,
        category: "Potensi",
        date: item.created_at,
        icon: "🏞️",
      }));

      const umkm = (umkmData || []).map((item: any) => ({
        id: `umkm-${item.id}`,
        title: item.title,
        category: "UMKM",
        date: item.created_at,
        icon: "🏪",
      }));

      const galeri = (galeriData || []).map((item: any) => ({
        id: item.id,
        title: item.title || "Dokumentasi Pesona Beji",
        category: "Galeri",
        date: item.date || item.created_at,
        icon: "🖼️",
      }));

            const semuaKonten = [
        ...berita,
        ...potensi,
        ...umkm,
        ...galeri,
      ];

      // Hilangkan duplikat berdasarkan
      // kategori + judul
      const kontenUnik = Array.from(
  new Map(
    semuaKonten.map((item) => [
      item.title,
      item,
    ])
  ).values()
);

      // Urutkan dari yang terbaru
      kontenUnik.sort((a, b) => {
        const dateA = a.date
          ? new Date(a.date).getTime()
          : 0;

        const dateB = b.date
          ? new Date(b.date).getTime()
          : 0;

        return dateB - dateA;
      });

      // Ambil 4 konten terbaru
      setRecentContent(
        kontenUnik.slice(0, 4)
      );

    } catch (error) {
      console.error(
        "Gagal mengambil konten terbaru:",
        error
      );
    } finally {
      setLoadingRecent(false);
    }
  }

  async function loadSummary() {
  try {
    setLoadingSummary(true);

    const [
      beritaResult,
      potensiResult,
      umkmResult,
      galeriData,
    ] = await Promise.all([
      supabase
        .from("berita")
        .select("id, is_active, created_at, updated_at"),

      supabase
        .from("potensi")
        .select("id, is_active, created_at, updated_at"),

      supabase
        .from("umkm")
        .select("id, is_active, created_at, updated_at"),

      getGaleri(),
    ]);

    if (beritaResult.error) throw beritaResult.error;
    if (potensiResult.error) throw potensiResult.error;
    if (umkmResult.error) throw umkmResult.error;

    const berita = beritaResult.data || [];
    const potensi = potensiResult.data || [];
    const umkm = umkmResult.data || [];

    const activeBerita = berita.filter(
      (item) => item.is_active === true
    ).length;

    const activePotensi = potensi.filter(
      (item) => item.is_active === true
    ).length;

    const activeUmkm = umkm.filter(
      (item) => item.is_active === true
    ).length;

    const draftBerita = berita.filter(
      (item) => item.is_active !== true
    ).length;

    const draftPotensi = potensi.filter(
      (item) => item.is_active !== true
    ).length;

    const draftUmkm = umkm.filter(
      (item) => item.is_active !== true
    ).length;

    const total =
      berita.length +
      potensi.length +
      umkm.length +
      galeriData.length;

    const active =
      activeBerita +
      activePotensi +
      activeUmkm +
      galeriData.length;

    const draft =
      draftBerita +
      draftPotensi +
      draftUmkm;

    const semuaTanggal = [
      ...berita.map((item) => item.updated_at || item.created_at),
      ...potensi.map((item) => item.updated_at || item.created_at),
      ...umkm.map((item) => item.updated_at || item.created_at),
      ...galeriData.map((item: any) => item.date),
    ].filter(Boolean);

    semuaTanggal.sort(
      (a, b) =>
        new Date(b).getTime() -
        new Date(a).getTime()
    );

    setSummary({
      total,
      active,
      draft,
      lastUpdate: semuaTanggal[0] || null,
    });

  } catch (error) {
    console.error(
      "Gagal mengambil ringkasan website:",
      error
    );
  } finally {
    setLoadingSummary(false);
  }
}

  return (
    <div className="space-y-6">

      {/* =========================
    WELCOME BANNER
========================= */}
<section className="relative h-[300px] overflow-hidden rounded-3xl shadow-sm">

  {banner ? (
    <>
      {/* FOTO BANNER BERANDA */}
      <img
        src={banner.image_url}
        alt="Foto Desa Beji"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* GRADIENT */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 15% 35%,
              rgba(255,245,220,0.82) 0%,
              rgba(255,245,220,0.65) 22%,
              rgba(255,245,220,0.40) 42%,
              rgba(255,245,220,0.15) 60%,
              rgba(255,245,220,0) 80%
            ),
            linear-gradient(
              90deg,
              rgba(255,248,235,.70) 0%,
              rgba(255,248,235,.35) 35%,
              rgba(255,248,235,.08) 60%,
              rgba(255,248,235,0) 80%
            )
          `,
        }}
      />

      {/* TEKS CMS */}
      <div className="relative z-10 flex h-full items-center px-12">

        <div className="max-w-xl">

          <span className="inline-block rounded-full bg-[#8BC34A] px-4 py-2 text-sm font-semibold text-white">
            Selamat Datang
          </span>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-[#214E28]">
            di Pesona Beji CMS 🌿
          </h1>

          <p className="mt-4 max-w-lg text-base leading-7 text-gray-600">
            Kelola seluruh konten website Pesona Beji
            dengan mudah dan cepat.
          </p>

        </div>

      </div>
    </>
  ) : (
    <div className="flex h-full items-center justify-center bg-[#F8F3E7]">
      <p className="text-gray-500">
        Memuat banner...
      </p>
    </div>
  )}

</section>


      {/* =========================
          STATISTIK
      ========================= */}
      <section className="grid grid-cols-4 gap-6">

        {/* Berita */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Berita
              </p>

              <h3 className="mt-3 text-4xl font-bold text-gray-900">
                  {loadingStats ? "..." : stats.berita}
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
              📰
            </div>

          </div>

          <p className="mt-5 text-sm text-green-600">
            ↑ Konten berita
          </p>

        </div>


        {/* Potensi */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Potensi
              </p>

              <h3 className="mt-3 text-4xl font-bold text-gray-900">
              {loadingStats ? "..." : stats.potensi}
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
              🏞️
            </div>

          </div>

          <p className="mt-5 text-sm text-green-600">
            ↑ Potensi desa
          </p>

        </div>


        {/* UMKM */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total UMKM
              </p>

              <h3 className="mt-3 text-4xl font-bold text-gray-900">
              {loadingStats ? "..." : stats.umkm}
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
              🏪
            </div>

          </div>

          <p className="mt-5 text-sm text-green-600">
            ↑ UMKM terdaftar
          </p>

        </div>


        {/* Galeri */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Galeri
              </p>

              <h3 className="mt-3 text-4xl font-bold text-gray-900">
              {loadingStats ? "..." : stats.galeri}
              </h3>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
              🖼️
            </div>

          </div>

          <p className="mt-5 text-sm text-green-600">
            ↑ Dokumentasi
          </p>

        </div>

      </section>


      {/* =========================
          BOTTOM
      ========================= */}
      <section className="grid grid-cols-3 gap-6">

        {/* =========================
            KONTEN TERBARU
        ========================= */}
        <div className="col-span-2 rounded-2xl border bg-white p-7 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Konten Terbaru
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Konten yang baru saja ditambahkan
              </p>
            </div>

            <button className="text-sm font-semibold text-green-700 hover:text-green-800">
              Lihat Semua →
            </button>

          </div>


          <div className="mt-6 space-y-3">

  {loadingRecent ? (

    <div className="py-10 text-center text-sm text-gray-400">
      Memuat konten terbaru...
    </div>

  ) : recentContent.length === 0 ? (

    <div className="py-10 text-center text-sm text-gray-400">
      Belum ada konten.
    </div>

  ) : (

    recentContent.map((item) => (

      <div
        key={item.id}
        className="flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition hover:bg-gray-50"
      >

        <div className="flex min-w-0 items-center gap-4">

          {/* ICON */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-lg">
            {item.icon}
          </div>

          {/* INFO */}
          <div className="min-w-0">

            <h3 className="truncate font-semibold text-gray-900">
              {item.title || "Tanpa judul"}
            </h3>

            <p className="text-sm text-gray-500">

              {item.category}

              {item.date && (
                <>
                  {" • "}
                  {new Date(item.date).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </>
              )}

            </p>

          </div>

        </div>

        {/* LABEL */}
        <span className="ml-4 shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {item.category}
        </span>

      </div>

    ))

  )}

</div>

        </div>


        {/* =========================
    RINGKASAN WEBSITE
========================= */}
<div className="rounded-2xl border bg-white p-7 shadow-sm">

  <h2 className="text-xl font-bold text-gray-900">
    Ringkasan Website
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Kondisi konten Pesona Beji
  </p>

  <div className="mt-7 space-y-5">

    {/* Total Konten */}
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
          📚
        </div>

        <span className="text-sm text-gray-600">
          Total Konten
        </span>

      </div>

      <span className="font-bold text-gray-900">
        {loadingSummary ? "..." : summary.total}
      </span>

    </div>


    {/* Konten Aktif */}
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
          ✅
        </div>

        <span className="text-sm text-gray-600">
          Konten Aktif
        </span>

      </div>

      <span className="font-bold text-green-700">
        {loadingSummary ? "..." : summary.active}
      </span>

    </div>


    {/* Draft */}
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100">
          📝
        </div>

        <span className="text-sm text-gray-600">
          Draft
        </span>

      </div>

      <span className="font-bold text-gray-900">
        {loadingSummary ? "..." : summary.draft}
      </span>

    </div>


    {/* Update */}
    <div className="border-t pt-5">

      <p className="text-sm text-gray-500">
        Update terakhir
      </p>

      <p className="mt-1 font-semibold text-gray-900">
        {loadingSummary
          ? "..."
          : summary.lastUpdate
            ? new Date(
                summary.lastUpdate
              ).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )
            : "-"
        }
      </p>

    </div>


    {/* Status */}
    <div className="rounded-2xl bg-green-50 p-4">

      <div className="flex items-center gap-3">

        <span className="h-3 w-3 rounded-full bg-green-500"></span>

        <div>

          <p className="font-semibold text-green-800">
            Website Aktif
          </p>

          <p className="text-xs text-green-700">
            Semua sistem berjalan normal
          </p>

        </div>

      </div>

    </div>

  </div>

</div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}
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