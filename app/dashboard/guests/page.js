import { db } from "@/lib/db";
import { guests } from "@/lib/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function GuestsPage() {
  const allGuests = await db.select().from(guests).orderBy(desc(guests.created_at));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold">Guests</h1>
        <Link href="/dashboard/guests/add"
          className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-yellow-300 transition">
          + Add Guest
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {allGuests.map((g) => (
          <div key={g.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">{g.name}</p>
                <p className="text-gray-400 text-sm">{g.mobile}</p>
                {g.city && <p className="text-gray-500 text-xs">{g.city}</p>}
              </div>
              <div className="text-right">
                {g.id_proof_type && <p className="text-xs text-gray-500 uppercase">{g.id_proof_type}</p>}
                {g.id_proof_number && <p className="text-xs text-gray-400">{g.id_proof_number}</p>}
              </div>
            </div>
          </div>
        ))}
        {allGuests.length === 0 && <p className="text-gray-500 text-center py-12">No guests yet.</p>}
      </div>
    </div>
  );
}