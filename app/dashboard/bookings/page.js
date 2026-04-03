import { db } from "@/lib/db";
import { bookings, guests, rooms } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

const STATUS_STYLE = {
  booked: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  checked_in: "bg-green-500/20 text-green-400 border-green-500/30",
  checked_out: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default async function BookingsPage() {
  const all = await db
    .select({
      id: bookings.id,
      booking_number: bookings.booking_number,
      check_in: bookings.check_in,
      check_out: bookings.check_out,
      status: bookings.status,
      advance: bookings.advance,
      guest_name: guests.name,
      guest_mobile: guests.mobile,
      room_number: rooms.room_number,
      room_type: rooms.type,
    })
    .from(bookings)
    .leftJoin(guests, eq(bookings.guest_id, guests.id))
    .leftJoin(rooms, eq(bookings.room_id, rooms.id))
    .orderBy(desc(bookings.created_at));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Bookings</h1>
        <Link href="/dashboard/bookings/add"
          className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-yellow-300 transition">
          + New Booking
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {all.map((b) => (
          <Link key={b.id} href={`/dashboard/bookings/${b.id}`}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:bg-gray-800 transition block">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500 font-mono">{b.booking_number}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${STATUS_STYLE[b.status]}`}>
                    {b.status.replace("_", " ")}
                  </span>
                </div>
                <p className="font-bold text-white">{b.guest_name}</p>
                <p className="text-gray-400 text-sm">{b.guest_mobile}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-yellow-400 font-bold text-sm">Room {b.room_number}</p>
                <p className="text-gray-400 text-xs capitalize">{b.room_type}</p>
                <p className="text-gray-500 text-xs">{b.check_in} → {b.check_out}</p>
                {b.advance > 0 && <p className="text-green-400 text-xs">Advance: ₹{b.advance}</p>}
              </div>
            </div>
          </Link>
        ))}
        {all.length === 0 && <p className="text-gray-500 text-center py-12">No bookings yet.</p>}
      </div>
    </div>
  );
}