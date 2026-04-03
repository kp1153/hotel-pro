import { db } from "@/lib/db";
import { rooms } from "@/lib/schema";
import Link from "next/link";

export const dynamic = "force-dynamic";

const STATUS_COLOR = {
  available: "bg-green-500/20 border-green-500 text-green-400",
  occupied: "bg-red-500/20 border-red-500 text-red-400",
  cleaning: "bg-yellow-500/20 border-yellow-500 text-yellow-400",
  maintenance: "bg-gray-500/20 border-gray-500 text-gray-400",
};

export default async function RoomsPage() {
  const allRooms = await db.select().from(rooms).orderBy(rooms.room_number);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Rooms</h1>
        <Link href="/dashboard/rooms/add"
          className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-yellow-300 transition">
          + Add Room
        </Link>
      </div>
      <div className="flex gap-3 mb-6 flex-wrap">
        {Object.entries(STATUS_COLOR).map(([s, cls]) => (
          <span key={s} className={`text-xs px-3 py-1 rounded-full border font-bold ${cls}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {allRooms.map((r) => (
          <Link key={r.id} href={`/dashboard/rooms/${r.id}`}
            className={`border-2 rounded-2xl p-4 text-center hover:opacity-80 transition ${STATUS_COLOR[r.status]}`}>
            <div className="text-xl font-extrabold">{r.room_number}</div>
            <div className="text-xs mt-1 capitalize">{r.type}</div>
            <div className="text-xs">{r.ac ? "AC" : "Non-AC"}</div>
            <div className="text-xs font-bold mt-1">₹{r.base_price}</div>
            <div className="text-xs mt-1 capitalize">{r.status}</div>
          </Link>
        ))}
        {allRooms.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-12">No rooms yet.</p>
        )}
      </div>
    </div>
  );
}