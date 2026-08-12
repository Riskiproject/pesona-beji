import { Bell, Menu, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-gray-200 bg-white px-8 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden">
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500">
            Selamat datang di Pesona Beji CMS
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="hidden items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 md:flex">

          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Cari..."
            className="ml-2 w-52 bg-transparent text-sm outline-none"
          />

        </div>

        {/* Notification */}
        <button className="relative rounded-xl p-2 transition hover:bg-gray-100">

          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white">
            A
          </div>

          <div className="hidden md:block">

            <h2 className="font-semibold text-gray-800">
              Administrator
            </h2>

            <p className="text-xs text-gray-500">
              admin@pesonabeji.id
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}