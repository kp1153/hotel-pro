import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rooms } from "@/lib/schema";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get("role")?.value) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const all = await db.select().from(rooms).orderBy(rooms.room_number);
  return NextResponse.json(all);
}

export async function POST(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "owner") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  await db.insert(rooms).values(body);
  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "owner") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await request.json();
  await db.update(rooms).set(data).where(eq(rooms.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "owner") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  await db.delete(rooms).where(eq(rooms.id, id));
  return NextResponse.json({ success: true });
}