"use client";
import { useState, useEffect } from "react";

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({ name: "", role: "receptionist", pin: "" });
  const [loading, setLoading] = useState(false);

  const load = () => fetch("/api/staff").then((r) => r.json()).then(setStaff);
  useEffect(() => { load(); }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", role: "receptionist", pin: "" });
    load();
    setLoading(false);
  };

  const handleToggle = async (s) => {
    await fetch("/api/staff", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: s.id, active: s.active ? 0 : 1 }),
    });
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete?")) return;
    await fetch("/api/staff", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-extrabold mb-6">Staff</h1>
      <form onSubmit={handleAdd} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-6 flex flex-col gap-3">
        <h2 className="font-bold text-white text-sm">Add Staff</h2>
        <input name="name" value={form.name} onChange={handle} placeholder="Staff Name" required
          className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
        <select name="role" value={form.role} onChange={handle}
          className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm">
          <option value="receptionist">Receptionist</option>
          <option value="manager">Manager</option>
          <option value="housekeeping">Housekeeping</option>
        </select>
        <input name="pin" value={form.pin} onChange={handle} placeholder="4-digit PIN" maxLength={4} required
          className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
        <button type="submit" disabled={loading}
          className="bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50">
          {loading ? "Adding..." : "Add Staff"}
        </button>
      </form>
      <div className="flex flex-col gap-3">
        {staff.map((s) => (
          <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="font-bold text-white">{s.name}</p>
              <p className="text-gray-400 text-xs capitalize">{s.role}</p>
              <p className="text-gray-500 text-xs">PIN: {s.pin}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleToggle(s)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold ${s.active ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-400"}`}>
                {s.active ? "Active" : "Inactive"}
              </button>
              <button onClick={() => handleDelete(s.id)}
                className="text-xs px-3 py-1.5 rounded-lg font-bold bg-red-500/20 text-red-400">
                Delete
              </button>
            </div>
          </div>
        ))}
        {staff.length === 0 && <p className="text-gray-500 text-center py-8">No staff yet.</p>}
      </div>
    </div>
  );
}