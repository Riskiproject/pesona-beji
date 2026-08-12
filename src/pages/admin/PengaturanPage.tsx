import { useEffect, useState } from "react";

import {
  getPengaturan,
  createPengaturan,
  updatePengaturan,
  uploadPengaturanImage,
  deletePengaturanImage,
  type Pengaturan,
} from "../../services/pengaturanService";

const emptyForm = {
  nama_website: "Pesona Beji",
  deskripsi: "",
  logo_url: "",
  favicon_url: "",
  copyright: "© 2026 Pesona Beji",
};

export default function PengaturanPage() {
  const [pengaturan, setPengaturan] =
    useState<Pengaturan | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(emptyForm);

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const data = await getPengaturan();

      setPengaturan(data);

      if (data) {
        setForm({
          nama_website: data.nama_website || "",
          deskripsi: data.deskripsi || "",
          logo_url: data.logo_url || "",
          favicon_url: data.favicon_url || "",
          copyright: data.copyright || "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data pengaturan");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleImageUpload(
  e: React.ChangeEvent<HTMLInputElement>,
  type: "logo" | "favicon"
) {
  const file = e.target.files?.[0];

  if (!file) return;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(file.type)) {
    alert(
      "Format gambar harus JPG, PNG, WEBP, atau SVG."
    );
    e.target.value = "";
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Ukuran gambar maksimal 2 MB.");
    e.target.value = "";
    return;
  }

  try {
    setSaving(true);

    const url = await uploadPengaturanImage(
      file,
      type
    );

    setForm((prev) => ({
      ...prev,
      [type === "logo"
        ? "logo_url"
        : "favicon_url"]: url,
    }));

    showToast(
      type === "logo"
        ? "Logo berhasil diupload"
        : "Favicon berhasil diupload"
    );
  } catch (error) {
    console.error(error);
    alert("Gagal mengupload gambar");
  } finally {
    setSaving(false);
    e.target.value = "";
  }
}

  function showToast(message: string) {
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  }

  async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  if (!form.nama_website.trim()) {
    alert("Nama website wajib diisi");
    return;
  }

  try {
    setSaving(true);

    if (pengaturan) {
      const oldLogoUrl = pengaturan.logo_url;
      const oldFaviconUrl = pengaturan.favicon_url;

      await updatePengaturan(
        pengaturan.id,
        form
      );

      // Hapus logo lama jika diganti
      if (
        oldLogoUrl &&
        oldLogoUrl !== form.logo_url
      ) {
        try {
          await deletePengaturanImage(
            oldLogoUrl
          );
        } catch (error) {
          console.error(
            "Gagal menghapus logo lama:",
            error
          );
        }
      }

      // Hapus favicon lama jika diganti
      if (
        oldFaviconUrl &&
        oldFaviconUrl !== form.favicon_url
      ) {
        try {
          await deletePengaturanImage(
            oldFaviconUrl
          );
        } catch (error) {
          console.error(
            "Gagal menghapus favicon lama:",
            error
          );
        }
      }

      showToast(
        "Pengaturan berhasil diperbarui"
      );
    } else {
      const data =
        await createPengaturan(form);

      setPengaturan(data);

      showToast(
        "Pengaturan berhasil disimpan"
      );
    }

    await loadData();
  } catch (error) {
    console.error(error);
    alert("Gagal menyimpan pengaturan");
  } finally {
    setSaving(false);
  }
}

  if (loading) {
    return (
      <div className="p-6">
        <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
          Memuat pengaturan...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Toast */}
      {toast && (
        <div className="fixed right-6 top-6 z-[100] flex items-center gap-3 rounded-xl bg-green-600 px-5 py-4 text-white shadow-lg">
          <span className="text-xl">
            ✓
          </span>

          <span className="font-semibold">
            {toast}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ⚙️ Pengaturan
        </h1>

        <p className="mt-2 text-gray-500">
          Kelola identitas utama website Pesona Beji.
        </p>
      </div>

      {/* Card */}
      <div className="max-w-4xl rounded-2xl border bg-white shadow-sm">

        {/* Card Header */}
        <div className="border-b px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900">
            Identitas Website
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Informasi ini digunakan pada berbagai bagian
            website Pesona Beji.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {/* Nama Website */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Nama Website
            </label>

            <input
              name="nama_website"
              value={form.nama_website}
              onChange={handleChange}
              placeholder="Pesona Beji"
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-500"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Deskripsi Website
            </label>

            <textarea
              name="deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
              rows={4}
              placeholder="Media promosi digital Desa Beji..."
              className="w-full resize-none rounded-xl border px-4 py-3 outline-none transition focus:border-green-500"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Logo Website
            </label>

            <div className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">

              {form.logo_url ? (
                <img
                  src={form.logo_url}
                  alt="Logo website"
                  className="h-20 w-20 rounded-xl border object-contain"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border bg-gray-50 text-3xl">
                  🖼️
                </div>
              )}

              <div className="flex-1">
                <div className="flex-1">

  <label
    htmlFor="logo-upload"
    className="inline-flex cursor-pointer items-center rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
  >
    📤 Pilih Logo
  </label>

  <input
    id="logo-upload"
    type="file"
    accept="image/png,image/jpeg,image/webp,image/svg+xml"
    onChange={(e) =>
      handleImageUpload(e, "logo")
    }
    className="hidden"
  />

  <p className="mt-2 text-xs text-gray-500">
    JPG, PNG, WEBP, atau SVG. Maksimal 2 MB.
  </p>

</div>

              </div>

            </div>
          </div>
          
          {/* Copyright */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Copyright
            </label>

            <input
              name="copyright"
              value={form.copyright}
              onChange={handleChange}
              placeholder="© 2026 Pesona Beji"
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-500"
            />
          </div>

          {/* Info */}
          <div className="rounded-xl bg-green-50 p-4 text-sm text-green-800">
            <p className="font-semibold">
              ℹ️ Informasi
            </p>

            <p className="mt-1">
              Pengaturan ini hanya memiliki satu data.
              Setelah disimpan, tombol akan berubah menjadi
              mode edit dan tidak tersedia tombol hapus.
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t pt-6">

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Menyimpan..."
                : pengaturan
                ? "Simpan Perubahan"
                : "Simpan Pengaturan"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}