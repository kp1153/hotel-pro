import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { settings } from "@/lib/schema";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  if (!cookieStore.get("role")?.value) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const all = await db.select().from(settings);
  return NextResponse.json(all[0] || {});
}

export async function POST(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "owner") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const existing = await db.select().from(settings);
  if (existing.length > 0) {
    await db.update(settings).set(body);
  } else {
    await db.insert(settings).values(body);
  }
  return NextResponse.json({ success: true });
}