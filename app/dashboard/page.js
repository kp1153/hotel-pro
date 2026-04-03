import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { rooms, bookings, billing } from "@/lib/schema";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  if (role !== "owner") redirect("/dashboard/guests");

  const allRooms = await db.select().from(rooms);
  const allBookings = await db.select().from(bookings);
  const allBilling = await db.select().from(billing);

  const available = allRooms.filter((r) => r.status === "available").length;
  const occupied = allRooms.filter((r) => r.status === "occupied").length;
  const cleaning = allRooms.filter((r) => r.status === "cleaning").length;
  const today = new Date().toISOString().split("T")[0];
  const todayCheckIns = allBookings.filter((b) => b.check_in === today).length;
  const todayCheckOuts = allBookings.filter((b) => b.check_out === today && b.status === "checked_out").length;
  const totalRevenue = allBilling.reduce((s, b) => s + (b.paid || 0), 0);
  const totalDue = allBilling.reduce((s, b) => s + (b.due || 0), 0);
  const occupancyPct = allRooms.length > 0 ? Math.round((occupied / allRooms.length) * 100) : 0;

  const stats = [
    { label: "Available", value: available, color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
    { label: "Occupied", value: occupied, color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
    { label: "Cleaning", value: cleaning, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30" },
    { label: "Occupancy", value: `${occupancyPct}%`, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
    { label: "Today Check-ins", value: todayCheckIns, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30" },
    { label: "Today Check-outs", value: todayCheckOuts, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/30" },
    { label: "Total Received", value: `₹${totalRevenue.toLocaleString()}`, color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
    { label: "Total Due", value: `₹${totalDue.toLocaleString()}`, color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Dashboard</h1>
        <p className="text-gray-400 text-sm">{new Date().toDateString()}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-2xl border p-4 ${s.bg}`}>
            <p className="text-gray-400 text-xs mb-1">{s.label}</p>
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Link href="/dashboard/rooms/add"
          className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:bg-gray-800 transition">
          <span className="text-2xl">🛏️</span>
          <span className="font-bold text-sm">Add Room</span>
        </Link>
        <Link href="/dashboard/bookings/add"
          className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:bg-gray-800 transition">
          <span className="text-2xl">📋</span>
          <span className="font-bold text-sm">New Booking</span>
        </Link>
        <Link href="/dashboard/guests/add"
          className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:bg-gray-800 transition">
          <span className="text-2xl">👤</span>
          <span className="font-bold text-sm">Register Guest</span>
        </Link>
      </div>
    </div>
  );
}