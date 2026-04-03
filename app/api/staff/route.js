import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staff } from "@/lib/schema";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export async function GET() {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "owner") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const all = await db.select().from(staff).orderBy(staff.name);
  return NextResponse.json(all);
}

export async function POST(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "owner") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  await db.insert(staff).values(body);
  return NextResponse.json({ success: true });
}

export async function PUT(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "owner") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = await request.json();
  await db.update(staff).set(data).where(eq(staff.id, id));
  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const cookieStore = await cookies();
  if (cookieStore.get("role")?.value !== "owner") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  await db.delete(staff).where(eq(staff.id, id));
  return NextResponse.json({ success: true });
}