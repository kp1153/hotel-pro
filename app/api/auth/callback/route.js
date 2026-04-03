import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { settings, license } from "@/lib/schema";
import { eq } from "drizzle-orm";

const DEVELOPER_EMAIL = "prasad.kamta@gmail.com";

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

  if (!user.email) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);

  if (user.email !== DEVELOPER_EMAIL) {
    const rows = await db.select().from(license).where(eq(license.email, user.email));

    if (!rows.length || !rows[0].active) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/expired`);
    }

    const expiresAt = rows[0].expires_at;
    if (expiresAt && new Date(expiresAt) < new Date()) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/expired`);
    }
  }

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