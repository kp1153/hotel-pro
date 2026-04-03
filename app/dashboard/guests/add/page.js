"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddGuestPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", mobile: "", id_proof_type: "aadhar", id_proof_number: "", address: "", city: "" });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/dashboard/guests");
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-extrabold mb-6">Register Guest</h1>
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col gap-4">
        {[
          { name: "name", label: "Full Name", placeholder: "Ramesh Kumar", type: "text", required: true },
          { name: "mobile", label: "Mobile", placeholder: "9999999999", type: "tel", required: true },
          { name: "id_proof_number", label: "ID Proof Number", placeholder: "1234 5678 9012", type: "text", required: false },
          { name: "address", label: "Address", placeholder: "123, MG Road", type: "text", required: false },
          { name: "city", label: "City", placeholder: "Lucknow", type: "text", required: false },
        ].map((f) => (
          <div key={f.name}>
            <label className="text-gray-400 text-xs mb-1 block">{f.label}</label>
            <input name={f.name} type={f.type} value={form[f.name]} onChange={handle}
              placeholder={f.placeholder} required={f.required}
              className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm" />
          </div>
        ))}
        <div>
          <label className="text-gray-400 text-xs mb-1 block">ID Proof Type</label>
          <select name="id_proof_type" value={form.id_proof_type} onChange={handle}
            className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-yellow-500 text-sm">
            <option value="aadhar">Aadhar Card</option>
            <option value="pan">PAN Card</option>
            <option value="passport">Passport</option>
            <option value="dl">Driving License</option>
            <option value="voter">Voter ID</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex-1 bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50">
            {loading ? "Saving..." : "Register Guest"}
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