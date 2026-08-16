import Hero from "../../components/home/Hero";
import TentangDesa from "../../components/home/TentangDesa";
import PotensiPreview from "../../components/home/PotensiPreview";
import KopiPreview from "../../components/home/KopiPreview";
import UmkmPreview from "../../components/home/UmkmPreview";
import BeritaPreview from "../../components/home/BeritaPreview";
import GaleriPreview from "../../components/home/GaleriPreview";
import KontakPreview from "../../components/home/KontakPreview";
import Footer from "../../components/layout/Footer";

export default function BerandaPage() {
  return (
    <>
      <Hero />

      <TentangDesa />

      <PotensiPreview />

      <KopiPreview />

      <UmkmPreview />

      <BeritaPreview />

      <GaleriPreview />

      <KontakPreview />

      <Footer />
    </>
  );
}