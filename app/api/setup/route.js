import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { settings } from "@/lib/schema";

export async function POST(request) {
  const body = await request.json();
  const existing = await db.select().from(settings);
  if (existing.length > 0) {
    await db.update(settings).set(body);
  } else {
    await db.insert(settings).values(body);
  }
  return NextResponse.json({ success: true });
}