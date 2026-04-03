import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { guests } from "@/lib/schema";
import { cookies } from "next/headers";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get("role")?.value) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const all = await db.select().from(guests).orderBy(desc(guests.created_at));
  return NextResponse.json(all);
}

export async function POST(request) {
  const cookieStore = await cookies();
  if (!cookieStore.get("role")?.value) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  await db.insert(guests).values(body);
  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const cookieStore = await cookies();
  if (!cookieStore.get("role")?.value) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await request.json();
  await db.update(guests).set(data).where(eq(guests.id, id));
  return NextResponse.json({ success: true });
}