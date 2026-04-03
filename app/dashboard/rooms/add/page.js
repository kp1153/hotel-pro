"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRoomPage() {
  const router = useRouter();
  const [form, setForm] = useState({ room_number: "", type: "double", floor: "0", ac: "0", base_price: "", status: "available" });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, floor: Number(form.floor), ac: Number(form.ac), base_price: Number(form.base_price) }),
    });
    router.push("/dashboard/rooms");
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold mb-6">Add Room</h1>
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col gap-4">
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Room Number</label>
          <input name="room_number" value={form.room_number} onChange={handle} placeholder="101" required
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Type</label>
          <select name="type" value={form.type} onChange={handle}
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm">
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
            <option value="dormitory">Dormitory</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Floor</label>
          <input name="floor" type="number" value={form.floor} onChange={handle} min="0"
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">AC / Non-AC</label>
          <select name="ac" value={form.ac} onChange={handle}
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm">
            <option value="0">Non-AC</option>
            <option value="1">AC</option>
          </select>
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Base Price per Night (₹)</label>
          <input name="base_price" type="number" value={form.base_price} onChange={handle} placeholder="1500" required
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex-1 bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50">
            {loading ? "Saving..." : "Save Room"}
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