"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function RoomDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/rooms").then((r) => r.json()).then((data) => {
      const room = data.find((r) => r.id === Number(id));
      if (room) setForm(room);
    });
  }, [id]);

  if (!form) return <div className="text-gray-400 p-8">Loading...</div>;

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/rooms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, floor: Number(form.floor), ac: Number(form.ac), base_price: Number(form.base_price) }),
    });
    router.push("/dashboard/rooms");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this room?")) return;
    await fetch("/api/rooms", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(id) }),
    });
    router.push("/dashboard/rooms");
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold mb-6">Room {form.room_number}</h1>
      <form onSubmit={handleUpdate} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col gap-4">
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Room Number</label>
          <input name="room_number" value={form.room_number} onChange={handle} required
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
          <label className="text-gray-400 text-xs mb-1 block">Base Price (₹)</label>
          <input name="base_price" type="number" value={form.base_price} onChange={handle} required
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
        </div>
        <div>
          <label className="text-gray-400 text-xs mb-1 block">Status</label>
          <select name="status" value={form.status} onChange={handle}
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm">
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex-1 bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50">
            {loading ? "Saving..." : "Update"}
          </button>
          <button type="button" onClick={handleDelete}
            className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-500 transition">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}