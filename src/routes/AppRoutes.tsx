import { BrowserRouter, Routes, Route } from "react-router-dom";

import BerandaPage from "../pages/public/BerandaPage";
import PotensiPage from "../pages/public/PotensiPage";
import PotensiDetailPage from "../pages/public/PotensiDetailPage";
import KopiPage from "../pages/public/KopiPage";
import UmkmPage from "../pages/public/UmkmPage";
import UmkmDetailPage from "../pages/public/UmkmDetailPage";
import BeritaPage from "../pages/public/BeritaPage";
import BeritaDetailPage from "../pages/public/BeritaDetailPage";
import GaleriPage from "../pages/public/GaleriPage";
import KontakPage from "../pages/public/KontakPage";
import PelakuKopiDetailPage from "../pages/public/PelakuKopiDetailPage";

import LoginPage from "../pages/admin/LoginPage";
import DashboardPage from "../pages/admin/DashboardPage";
import HeroPage from "../pages/admin/hero/HeroPage";
import HeroBerandaPage from "../pages/admin/hero/HeroBerandaPage";
import HeroPotensiPage from "../pages/admin/hero/HeroPotensiPage";
import HeroKopiPage from "../pages/admin/hero/HeroKopiPage";
import TentangDesaPage from "../pages/admin/TentangDesaPage";
import PotensiAdminPage from "../pages/admin/PotensiPage";
import UmkmAdminPage from "../pages/admin/UmkmPage";
import BeritaAdminPage from "../pages/admin/BeritaPage";
import KontakAdminPage from "../pages/admin/KontakPage";
import PengaturanAdminPage from "../pages/admin/PengaturanPage";
import KopiBejiPage from "../pages/admin/KopiBejiPage";
import PelakuKopiFormPage from "../pages/admin/PelakuKopiFromPage";



import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
  <Routes>

    {/* Public */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<BerandaPage />} />
      <Route path="/potensi" element={<PotensiPage />} />
      <Route path="/potensi/:slug" element={<PotensiDetailPage />} />
      <Route path="/kopi" element={<KopiPage />} />
      <Route path="/umkm" element={<UmkmPage />} />
      <Route path="/umkm/:slug" element={<UmkmDetailPage />} />
      <Route path="/berita" element={<BeritaPage />} />
      <Route path="/berita/:slug" element={<BeritaDetailPage />} />
      <Route path="/galeri" element={<GaleriPage />} />
      <Route path="/kontak" element={<KontakPage />} />
      <Route path="/kopi/pelaku/:slug" element={<PelakuKopiDetailPage />} />
    </Route>

    {/* Login (tanpa layout admin) */}
<Route path="/admin/login" element={<LoginPage />} />

{/* Admin (setelah login) */}
<Route element={<AdminLayout />}>
  <Route path="/admin/dashboard" element={<DashboardPage />} />
<Route path="/admin/hero" element={<HeroPage />} />
<Route path="/admin/hero/beranda" element={<HeroBerandaPage />} />
<Route path="/admin/hero/potensi" element={<HeroPotensiPage />} />
<Route path="/admin/hero/kopi" element={<HeroKopiPage />} />
<Route path="/admin/tentang-desa" element={<TentangDesaPage />} />
<Route path="/admin/potensi" element={<PotensiAdminPage />} />
<Route path="/admin/umkm" element={<UmkmAdminPage />} />
<Route path="/admin/berita" element={<BeritaAdminPage />} />
<Route path="/admin/kontak" element={<KontakAdminPage />} />
<Route path="/admin/pengaturan" element={<PengaturanAdminPage />} />
<Route path="/admin/kopi" element={<KopiBejiPage />} />
<Route path="/admin/kopi/tambah" element={<PelakuKopiFormPage />} />
<Route path="/admin/kopi/edit/:id" element={<PelakuKopiFormPage />} />
</Route>

  </Routes>
</BrowserRouter>
  );
}