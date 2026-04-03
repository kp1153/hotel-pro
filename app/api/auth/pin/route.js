import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { settings } from "@/lib/schema";

export async function POST(request) {
  const { pin } = await request.json();
  const allSettings = await db.select().from(settings);
  if (!allSettings.length || allSettings[0].receptionist_pin !== pin) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set("role", "receptionist", { httpOnly: true, maxAge: 60 * 60 * 12 });
  return response;
}