import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  const name = cookieStore.get("owner_name")?.value || "Staff";

  if (!role) redirect("/login");

  const navLinks = role === "owner"
    ? [
        { href: "/dashboard", label: "🏠", full: "Dashboard" },
        { href: "/dashboard/rooms", label: "🛏️", full: "Rooms" },
        { href: "/dashboard/guests", label: "👤", full: "Guests" },
        { href: "/dashboard/bookings", label: "📋", full: "Bookings" },
        { href: "/dashboard/billing", label: "💰", full: "Billing" },
        { href: "/dashboard/staff", label: "👥", full: "Staff" },
        { href: "/dashboard/settings", label: "⚙️", full: "Settings" },
      ]
    : [
        { href: "/dashboard/guests", label: "👤", full: "Guests" },
        { href: "/dashboard/guests/add", label: "➕", full: "New Guest" },
        { href: "/dashboard/bookings", label: "📋", full: "Bookings" },
        { href: "/dashboard/bookings/add", label: "🛏️", full: "New Booking" },
      ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="hidden md:flex min-h-screen">
        <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col py-6 px-4 gap-1">
          <div className="text-yellow-400 font-extrabold text-lg mb-6 px-2">🏨 Hotel Pro</div>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition">
              {l.label} {l.full}
            </Link>
          ))}
          <div className="mt-auto pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 px-2 mb-2">{name}</p>
            <a href="/api/logout"
              className="block px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-gray-800 transition">
              🚪 Logout
            </a>
          </div>
        </aside>
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
      <div className="md:hidden flex flex-col min-h-screen">
        <main className="flex-1 p-4 pb-24 overflow-auto">{children}</main>
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around items-center py-2 z-50">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-white transition">
              <span className="text-xl">{l.label}</span>
              <span className="text-[10px]">{l.full}</span>
            </Link>
          ))}
          <a href="/api/logout" className="flex flex-col items-center gap-0.5 text-red-400">
            <span className="text-xl">🚪</span>
            <span className="text-[10px]">Logout</span>
          </a>
        </nav>
      </div>
    </div>
  );
}