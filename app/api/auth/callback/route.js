import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { settings } from "@/lib/schema";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenRes.json();
  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  const user = await userRes.json();

  const allSettings = await db.select().from(settings);
  const isSetup = allSettings.length > 0 && allSettings[0].hotel_name;

  const response = NextResponse.redirect(
    isSetup
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/setup`
  );

  response.cookies.set("role", "owner", { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
  response.cookies.set("owner_name", user.name || "Owner", { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
  return response;
}