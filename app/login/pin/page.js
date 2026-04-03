"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PinLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    if (res.ok) {
      router.push("/dashboard/guests");
    } else {
      setError("Invalid PIN");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔢</div>
          <h1 className="text-xl font-extrabold text-white">Receptionist Login</h1>
          <p className="text-gray-400 text-sm mt-1">Enter your 4-digit PIN</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 flex flex-col gap-4">
          <input type="password" inputMode="numeric" maxLength={4} value={pin}
            onChange={(e) => setPin(e.target.value)} placeholder="••••"
            className="bg-gray-800 text-white text-center text-3xl tracking-widest rounded-xl p-4 border border-gray-700 focus:outline-none focus:border-yellow-500" />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading || pin.length !== 4}
            className="bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50">
            {loading ? "Checking..." : "Login"}
          </button>
          <a href="/login" className="text-center text-gray-400 text-sm hover:text-white">← Back</a>
        </form>
      </div>
    </main>
  );
}