import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { settings, users } from "@/lib/schema";
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
    const existing = await db.select().from(users).where(eq(users.email, user.email));

    if (existing.length === 0) {
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + 7);
      await db.insert(users).values({
        email: user.email,
        name: user.name || "",
        status: "trial",
        expiryDate: expiry.toISOString(),
        reminderSent: 0,
      });
    } else {
      const u = existing[0];
      const now = new Date();
      const expiry = u.expiryDate ? new Date(u.expiryDate) : null;
      const isActive = u.status === "active" && expiry && expiry > now;
      const isTrial = u.status === "trial" && expiry && expiry > now;
      if (!isActive && !isTrial) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/expired`);
      }
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
  response.cookies.set("owner_email", user.email, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });
  return response;
}