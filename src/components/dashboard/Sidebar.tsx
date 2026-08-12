import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  BookOpen,
  Leaf,
  Coffee,
  Store,
  Newspaper,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hero",
    path: "/admin/hero",
    icon: Image,
  },
  {
    title: "Tentang Desa",
    path: "/admin/tentang-desa",
    icon: BookOpen,
  },
  {
    title: "Potensi",
    path: "/admin/potensi",
    icon: Leaf,
  },
  {
    title: "Kopi Beji",
    path: "/admin/kopi",
    icon: Coffee,
  },
  {
    title: "UMKM",
    path: "/admin/umkm",
    icon: Store,
  },
  {
    title: "Berita",
    path: "/admin/berita",
    icon: Newspaper,
  },

  {
    title: "Kontak",
    path: "/admin/kontak",
    icon: Mail,
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex min-h-screen w-[260px] flex-col bg-[#0F5D4A] text-white">

      {/* Logo */}
      <div className="px-8 py-8">

        <h1 className="text-3xl font-extrabold tracking-wide">
          PESONA
        </h1>

        <h1 className="text-3xl font-extrabold text-green-300">
          BEJI
        </h1>

        <p className="mt-2 text-sm text-green-100">
          Content Management System
        </p>

      </div>

      {/* Menu */}
      <div className="flex-1 px-4">

        <nav className="space-y-2">

          {menus.map((menu) => {

            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.title}
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "bg-green-500 text-white shadow-lg"
                      : "hover:bg-green-700"
                  }`
                }
              >
                <Icon size={20} />

                <span className="font-medium">
                  {menu.title}
                </span>

              </NavLink>
            );

          })}

        </nav>

      </div>

      {/* Bottom Menu */}
      <div className="mt-8 border-t border-green-700 pt-6">

        <NavLink
          to="/admin/pengaturan"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
              isActive
                ? "bg-green-500 text-white shadow-lg"
                : "hover:bg-green-700"
            }`
          }
        >
          <Settings size={20} />
          <span className="font-medium">Pengaturan</span>
        </NavLink>

      </div>

      {/* Logout */}
      <div className="px-4 pb-6 pt-4">

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold transition hover:bg-red-600">

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
}