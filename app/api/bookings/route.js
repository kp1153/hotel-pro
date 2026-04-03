import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings, rooms, guests } from "@/lib/schema";
import { cookies } from "next/headers";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get("role")?.value) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const all = await db
    .select({
      id: bookings.id,
      booking_number: bookings.booking_number,
      check_in: bookings.check_in,
      check_out: bookings.check_out,
      adults: bookings.adults,
      children: bookings.children,
      status: bookings.status,
      advance: bookings.advance,
      notes: bookings.notes,
      created_at: bookings.created_at,
      guest_name: guests.name,
      guest_mobile: guests.mobile,
      room_number: rooms.room_number,
      room_type: rooms.type,
      room_price: rooms.base_price,
      room_id: bookings.room_id,
    })
    .from(bookings)
    .leftJoin(guests, eq(bookings.guest_id, guests.id))
    .leftJoin(rooms, eq(bookings.room_id, rooms.id))
    .orderBy(desc(bookings.created_at));
  return NextResponse.json(all);
}

export async function POST(request) {
  const cookieStore = await cookies();
  if (!cookieStore.get("role")?.value) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const all = await db.select().from(bookings);
  const num = `B${String(all.length + 1).padStart(4, "0")}`;
  await db.insert(bookings).values({ ...body, booking_number: num });
  await db.update(rooms).set({ status: "occupied" }).where(eq(rooms.id, body.room_id));
  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const cookieStore = await cookies();
  if (!cookieStore.get("role")?.value) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, room_id, status, ...data } = await request.json();
  await db.update(bookings).set({ status, ...data }).where(eq(bookings.id, id));
  if (status === "checked_out" || status === "cancelled") {
    await db.update(rooms).set({ status: "cleaning" }).where(eq(rooms.id, room_id));
  }
  return NextResponse.json({ success: true });
}