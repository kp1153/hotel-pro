"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    hotel_name: "", owner_name: "", gstin: "",
    address: "", city: "", phone: "", receptionist_pin: "",
  });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">⚙️</div>
          <h1 className="text-xl font-extrabold text-white">Setup Your Hotel</h1>
          <p className="text-gray-400 text-sm">Fill once — appears on every invoice</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col gap-4">
          {[
            { name: "hotel_name", label: "Hotel Name", placeholder: "Hotel Surya" },
            { name: "owner_name", label: "Owner Name", placeholder: "Ramesh Kumar" },
            { name: "gstin", label: "GSTIN (optional)", placeholder: "22AAAAA0000A1Z5" },
            { name: "address", label: "Address", placeholder: "123, Civil Lines" },
            { name: "city", label: "City", placeholder: "Lucknow" },
            { name: "phone", label: "Phone", placeholder: "9999999999" },
            { name: "receptionist_pin", label: "Receptionist PIN", placeholder: "1234" },
          ].map((f) => (
            <div key={f.name}>
              <label className="text-gray-400 text-xs mb-1 block">{f.label}</label>
              <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder}
                className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
            </div>
          ))}
          <button type="submit" disabled={loading || !form.hotel_name || !form.owner_name}
            className="bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50">
            {loading ? "Saving..." : "Save & Continue →"}
          </button>
        </form>
      </div>
    </main>
  );
}