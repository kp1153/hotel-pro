"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddBookingPage() {
  const router = useRouter();
  const [guestList, setGuestList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [form, setForm] = useState({ guest_id: "", room_id: "", check_in: "", check_out: "", adults: "1", children: "0", advance: "0", notes: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/guests").then((r) => r.json()).then(setGuestList);
    fetch("/api/rooms").then((r) => r.json()).then((data) => setRoomList(data.filter((r) => r.status === "available")));
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        guest_id: Number(form.guest_id),
        room_id: Number(form.room_id),
        adults: Number(form.adults),
        children: Number(form.children),
        advance: Number(form.advance),
      }),
    });
    router.push("/dashboard/bookings");
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold mb-6">New Booking</h1>
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col gap-4">
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Guest</label>
          <select name="guest_id" value={form.guest_id} onChange={handle} required
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm">
            <option value="">Select Guest</option>
            {guestList.map((g) => <option key={g.id} value={g.id}>{g.name} — {g.mobile}</option>)}
          </select>
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Room (Available Only)</label>
          <select name="room_id" value={form.room_id} onChange={handle} required
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm">
            <option value="">Select Room</option>
            {roomList.map((r) => <option key={r.id} value={r.id}>Room {r.room_number} — {r.type} {r.ac ? "AC" : "Non-AC"} — ₹{r.base_price}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Check-in</label>
            <input name="check_in" type="date" value={form.check_in} onChange={handle} required
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Check-out</label>
            <input name="check_out" type="date" value={form.check_out} onChange={handle} required
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Adults</label>
            <input name="adults" type="number" value={form.adults} onChange={handle} min="1"
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
          </div>
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Children</label>
            <input name="children" type="number" value={form.children} onChange={handle} min="0"
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
          </div>
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Advance (₹)</label>
          <input name="advance" type="number" value={form.advance} onChange={handle} min="0"
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Notes (optional)</label>
          <input name="notes" value={form.notes} onChange={handle} placeholder="Any special request..."
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex-1 bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50">
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
          <button type="button" onClick={() => router.back()}
            className="flex-1 bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-700 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}