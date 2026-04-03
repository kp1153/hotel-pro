import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { billing, bookings, guests, rooms } from "@/lib/schema";
import { cookies } from "next/headers";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "owner") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const all = await db
    .select({
      id: billing.id,
      booking_id: billing.booking_id,
      room_charges: billing.room_charges,
      extra_charges: billing.extra_charges,
      extra_details: billing.extra_details,
      gst_rate: billing.gst_rate,
      gst_amount: billing.gst_amount,
      total: billing.total,
      paid: billing.paid,
      due: billing.due,
      payment_mode: billing.payment_mode,
      created_at: billing.created_at,
      booking_number: bookings.booking_number,
      check_in: bookings.check_in,
      check_out: bookings.check_out,
      adults: bookings.adults,
      children: bookings.children,
      advance: bookings.advance,
      guest_name: guests.name,
      guest_mobile: guests.mobile,
      guest_address: guests.address,
      guest_city: guests.city,
      guest_id_proof_type: guests.id_proof_type,
      guest_id_proof_number: guests.id_proof_number,
      room_number: rooms.room_number,
      room_type: rooms.type,
      room_price: rooms.base_price,
    })
    .from(billing)
    .leftJoin(bookings, eq(billing.booking_id, bookings.id))
    .leftJoin(guests, eq(bookings.guest_id, guests.id))
    .leftJoin(rooms, eq(bookings.room_id, rooms.id))
    .orderBy(desc(billing.created_at));
  return NextResponse.json(all);
}

export async function POST(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "owner") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const existing = await db.select().from(billing).where(eq(billing.booking_id, body.booking_id));
  if (existing.length > 0) {
    await db.update(billing).set(body).where(eq(billing.booking_id, body.booking_id));
  } else {
    await db.insert(billing).values(body);
  }
  return NextResponse.json({ success: true });
}