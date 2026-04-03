"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function calcNights(checkIn, checkOut) {
  return Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)));
}

function calcGSTRate(roomPrice) {
  if (roomPrice < 1000) return 0;
  if (roomPrice <= 7500) return 12;
  return 18;
}

export default function BookingDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [booking, setBooking] = useState(null);
  const [bill, setBill] = useState(null);
  const [extraCharges, setExtraCharges] = useState("0");
  const [extraDetails, setExtraDetails] = useState("");
  const [paid, setPaid] = useState("0");
  const [paymentMode, setPaymentMode] = useState("cash");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/bookings").then((r) => r.json()).then((data) => {
      const b = data.find((b) => b.id === Number(id));
      setBooking(b);
      if (b) setPaid(String(b.advance || 0));
    });
    fetch("/api/billing").then((r) => r.json()).then((data) => {
      const b = data.find((b) => b.booking_id === Number(id));
      if (b) setBill(b);
    });
  }, [id]);

  if (!booking) return <div className="text-gray-400 p-8">Loading...</div>;

  const nights = calcNights(booking.check_in, booking.check_out);
  const roomCharges = (booking.room_price || 0) * nights;
  const extra = Number(extraCharges) || 0;
  const subtotal = roomCharges + extra;
  const gstRate = calcGSTRate(booking.room_price || 0);
  const gstAmount = Math.round((subtotal * gstRate) / 100);
  const total = subtotal + gstAmount;
  const paidAmount = Number(paid) || 0;
  const due = Math.max(0, total - paidAmount);

  const handleCheckIn = async () => {
    setLoading(true);
    await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(id), room_id: booking.room_id, status: "checked_in" }),
    });
    window.location.reload();
  };

  const handleCheckOut = async () => {
    setLoading(true);
    await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(id), room_id: booking.room_id, status: "checked_out" }),
    });
    await fetch("/api/billing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        booking_id: Number(id),
        room_charges: roomCharges,
        extra_charges: extra,
        extra_details: extraDetails,
        gst_rate: gstRate,
        gst_amount: gstAmount,
        total,
        paid: paidAmount,
        due,
        payment_mode: paymentMode,
      }),
    });
    router.push(`/dashboard/billing/${id}/invoice`);
  };

  const handleCancel = async () => {
    if (!confirm("Cancel this booking?")) return;
    setLoading(true);
    await fetch("/api/bookings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(id), room_id: booking.room_id, status: "cancelled" }),
    });
    router.push("/dashboard/bookings");
  };

  const STATUS_COLOR = {
    booked: "text-blue-400",
    checked_in: "text-green-400",
    checked_out: "text-gray-400",
    cancelled: "text-red-400",
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Booking {booking.booking_number}</h1>
        <span className={`text-sm font-bold ${STATUS_COLOR[booking.status]}`}>
          {booking.status.replace("_", " ").toUpperCase()}
        </span>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-4 flex flex-col gap-2">
        {[
          { label: "Guest", value: booking.guest_name },
          { label: "Mobile", value: booking.guest_mobile },
          { label: "Room", value: `Room ${booking.room_number} (${booking.room_type})`, color: "text-yellow-400" },
          { label: "Check-in", value: booking.check_in },
          { label: "Check-out", value: booking.check_out },
          { label: "Nights", value: nights },
          { label: "Adults / Children", value: `${booking.adults} / ${booking.children}` },
        ].map((r) => (
          <div key={r.label} className="flex justify-between">
            <span className="text-gray-400 text-sm">{r.label}</span>
            <span className={`font-bold ${r.color || "text-white"}`}>{r.value}</span>
          </div>
        ))}
        {booking.advance > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Advance</span>
            <span className="text-green-400 font-bold">₹{booking.advance}</span>
          </div>
        )}
        {booking.notes && (
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Notes</span>
            <span className="text-white text-sm">{booking.notes}</span>
          </div>
        )}
      </div>

      {booking.status !== "checked_out" && booking.status !== "cancelled" && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-4 flex flex-col gap-3">
          <h2 className="font-bold text-white">Billing</h2>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Room ({nights}n × ₹{booking.room_price})</span>
            <span className="text-white">₹{roomCharges}</span>
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Extra Charges (₹)</label>
            <input type="number" value={extraCharges} onChange={(e) => setExtraCharges(e.target.value)} min="0"
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-2 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Extra Details</label>
            <input value={extraDetails} onChange={(e) => setExtraDetails(e.target.value)} placeholder="Food, laundry..."
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-2 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
          </div>
          {gstRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">GST ({gstRate}%)</span>
              <span className="text-white">₹{gstAmount}</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span className="text-white">Total</span>
            <span className="text-yellow-400 text-lg">₹{total}</span>
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Amount Paid (₹)</label>
            <input type="number" value={paid} onChange={(e) => setPaid(e.target.value)} min="0"
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-2 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Payment Mode</label>
            <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-2 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm">
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-white">Due</span>
            <span className={`text-lg ${due > 0 ? "text-red-400" : "text-green-400"}`}>₹{due}</span>
          </div>
        </div>
      )}

      {bill && booking.status === "checked_out" && (
        <div className="mb-4">
          <Link href={`/dashboard/billing/${id}/invoice`}
            className="block w-full bg-blue-600 text-white font-bold py-3 rounded-xl text-center hover:bg-blue-500 transition">
            🖨️ View Invoice
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {booking.status === "booked" && (
          <button onClick={handleCheckIn} disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-500 transition disabled:opacity-50">
            ✅ Check In
          </button>
        )}
        {booking.status === "checked_in" && (
          <button onClick={handleCheckOut} disabled={loading}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50">
            🚪 Check Out & Generate Invoice
          </button>
        )}
        {(booking.status === "booked" || booking.status === "checked_in") && (
          <button onClick={handleCancel} disabled={loading}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-500 transition disabled:opacity-50">
            ❌ Cancel Booking
          </button>
        )}
        <button onClick={() => router.back()}
          className="w-full bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-700 transition">
          ← Back
        </button>
      </div>
    </div>
  );
}