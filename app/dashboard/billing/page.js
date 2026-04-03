import { db } from "@/lib/db";
import { billing, bookings, guests, rooms } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const all = await db
    .select({
      id: billing.id,
      booking_id: billing.booking_id,
      total: billing.total,
      paid: billing.paid,
      due: billing.due,
      payment_mode: billing.payment_mode,
      created_at: billing.created_at,
      booking_number: bookings.booking_number,
      guest_name: guests.name,
      room_number: rooms.room_number,
    })
    .from(billing)
    .leftJoin(bookings, eq(billing.booking_id, bookings.id))
    .leftJoin(guests, eq(bookings.guest_id, guests.id))
    .leftJoin(rooms, eq(bookings.room_id, rooms.id))
    .orderBy(desc(billing.created_at));

  const totalRevenue = all.reduce((s, b) => s + (b.paid || 0), 0);
  const totalDue = all.reduce((s, b) => s + (b.due || 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-4">Billing</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
          <p className="text-gray-400 text-xs mb-1">Total Received</p>
          <p className="text-green-400 text-2xl font-extrabold">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
          <p className="text-gray-400 text-xs mb-1">Total Due</p>
          <p className="text-red-400 text-2xl font-extrabold">₹{totalDue.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {all.map((b) => (
          <Link key={b.id} href={`/dashboard/billing/${b.booking_id}/invoice`}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:bg-gray-800 transition block">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">{b.guest_name}</p>
                <p className="text-gray-400 text-xs">{b.booking_number} · Room {b.room_number}</p>
                <p className="text-gray-500 text-xs capitalize">{b.payment_mode}</p>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-bold">₹{b.total}</p>
                <p className="text-green-400 text-xs">Paid: ₹{b.paid}</p>
                {b.due > 0 && <p className="text-red-400 text-xs">Due: ₹{b.due}</p>}
              </div>
            </div>
          </Link>
        ))}
        {all.length === 0 && <p className="text-gray-500 text-center py-12">No bills yet.</p>}
      </div>
    </div>
  );
}