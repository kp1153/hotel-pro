"use client";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({ hotel_name: "", owner_name: "", gstin: "", address: "", city: "", phone: "", receptionist_pin: "" });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((data) => {
      if (data) setForm((f) => ({ ...f, ...data }));
    });
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col gap-4">
        {[
          { name: "hotel_name", label: "Hotel Name" },
          { name: "owner_name", label: "Owner Name" },
          { name: "gstin", label: "GSTIN (optional)" },
          { name: "address", label: "Address" },
          { name: "city", label: "City" },
          { name: "phone", label: "Phone" },
          { name: "receptionist_pin", label: "Receptionist PIN" },
        ].map((f) => (
          <div key={f.name}>
            <label className="text-gray-400 text-xs mb-1 block">{f.label}</label>
            <input name={f.name} value={form[f.name] || ""} onChange={handle}
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
          </div>
        ))}
        <button type="submit" disabled={loading}
          className="bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50">
          {saved ? "Saved ✓" : loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}