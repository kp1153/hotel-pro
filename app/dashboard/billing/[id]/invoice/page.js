import { db } from "@/lib/db";
import { billing, bookings, guests, rooms, settings } from "@/lib/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function InvoicePage({ params }) {
  const { id } = await params;

  const allSettings = await db.select().from(settings);
  const s = allSettings[0] || {};

  const result = await db
    .select({
      room_charges: billing.room_charges,
      extra_charges: billing.extra_charges,
      extra_details: billing.extra_details,
      gst_rate: billing.gst_rate,
      gst_amount: billing.gst_amount,
      total: billing.total,
      paid: billing.paid,
      due: billing.due,
      payment_mode: billing.payment_mode,
      created_at: billing.created_at,
      booking_number: bookings.booking_number,
      check_in: bookings.check_in,
      check_out: bookings.check_out,
      adults: bookings.adults,
      children: bookings.children,
      advance: bookings.advance,
      guest_name: guests.name,
      guest_mobile: guests.mobile,
      guest_address: guests.address,
      guest_city: guests.city,
      guest_id_proof_type: guests.id_proof_type,
      guest_id_proof_number: guests.id_proof_number,
      room_number: rooms.room_number,
      room_type: rooms.type,
      room_price: rooms.base_price,
    })
    .from(billing)
    .leftJoin(bookings, eq(billing.booking_id, bookings.id))
    .leftJoin(guests, eq(bookings.guest_id, guests.id))
    .leftJoin(rooms, eq(bookings.room_id, rooms.id))
    .where(eq(billing.booking_id, Number(id)));

  if (!result.length) return <div className="text-gray-400 p-8">Invoice not found.</div>;
  const b = result[0];

  const nights = Math.max(1, Math.ceil(
    (new Date(b.check_out) - new Date(b.check_in)) / (1000 * 60 * 60 * 24)
  ));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-3 mb-6 print:hidden">
        <button onClick={() => window.print()}
          className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-xl hover:bg-yellow-300 transition">
          🖨️ Print Invoice
        </button>
        <Link href="/dashboard/billing"
          className="bg-gray-800 text-white font-bold px-6 py-2 rounded-xl hover:bg-gray-700 transition">
          ← Back
        </Link>
      </div>

      <div className="bg-white text-gray-900 rounded-2xl p-8 print:rounded-none">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-extrabold">{s.hotel_name || "Hotel Pro"}</h1>
            <p className="text-gray-600 text-sm">{s.address}</p>
            <p className="text-gray-600 text-sm">{s.city}</p>
            <p className="text-gray-600 text-sm">📞 {s.phone}</p>
            {s.gstin && <p className="text-gray-600 text-sm">GSTIN: {s.gstin}</p>}
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">INVOICE</h2>
            <p className="text-gray-500 text-sm">{b.booking_number}</p>
            <p className="text-gray-500 text-sm">{b.created_at?.split("T")[0]}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 rounded-xl p-4">
          <div>
            <p className="text-gray-500 text-xs mb-1">Guest</p>
            <p className="font-bold">{b.guest_name}</p>
            <p className="text-gray-600 text-sm">{b.guest_mobile}</p>
            <p className="text-gray-600 text-sm">{b.guest_address}</p>
            <p className="text-gray-600 text-sm">{b.guest_city}</p>
            {b.guest_id_proof_type && (
              <p className="text-gray-500 text-xs mt-1 uppercase">{b.guest_id_proof_type}: {b.guest_id_proof_number}</p>
            )}
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Stay Details</p>
            <p className="font-bold">Room {b.room_number}</p>
            <p className="text-gray-600 text-sm capitalize">{b.room_type}</p>
            <p className="text-gray-600 text-sm">Check-in: {b.check_in}</p>
            <p className="text-gray-600 text-sm">Check-out: {b.check_out}</p>
            <p className="text-gray-600 text-sm">{nights} night{nights > 1 ? "s" : ""}</p>
            <p className="text-gray-600 text-sm">Adults: {b.adults} | Children: {b.children}</p>
          </div>
        </div>

        <table className="w-full mb-6 text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-2 text-gray-500 font-medium">Description</th>
              <th className="text-right py-2 text-gray-500 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-2">Room charges ({nights} nights × ₹{b.room_price})</td>
              <td className="text-right py-2">₹{b.room_charges}</td>
            </tr>
            {b.extra_charges > 0 && (
              <tr className="border-b border-gray-100">
                <td className="py-2">{b.extra_details || "Extra charges"}</td>
                <td className="text-right py-2">₹{b.extra_charges}</td>
              </tr>
            )}
            {b.advance > 0 && (
              <tr className="border-b border-gray-100">
                <td className="py-2 text-gray-500">Advance received</td>
                <td className="text-right py-2 text-gray-500">-₹{b.advance}</td>
              </tr>
            )}
            {b.gst_rate > 0 && (
              <tr className="border-b border-gray-100">
                <td className="py-2">GST ({b.gst_rate}%)</td>
                <td className="text-right py-2">₹{b.gst_amount}</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-900">
              <td className="py-3 font-extrabold text-lg">Total</td>
              <td className="text-right py-3 font-extrabold text-lg">₹{b.total}</td>
            </tr>
            <tr>
              <td className="py-1 text-green-700">Paid ({b.payment_mode})</td>
              <td className="text-right py-1 text-green-700">₹{b.paid}</td>
            </tr>
            {b.due > 0 && (
              <tr>
                <td className="py-1 text-red-600 font-bold">Due</td>
                <td className="text-right py-1 text-red-600 font-bold">₹{b.due}</td>
              </tr>
            )}
          </tfoot>
        </table>

        <div className="border-t border-gray-200 pt-4 text-center text-gray-400 text-xs">
          Thank you for staying at {s.hotel_name || "Hotel Pro"}. Visit again!
        </div>
      </div>
    </div>
  );
}