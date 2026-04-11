import { google } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEVELOPER_EMAIL = "prasad.kamta@gmail.com";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("oauth_state")?.value;
  const codeVerifier = cookieStore.get("code_verifier")?.value;

  if (!code || state !== storedState) {
    return new Response("Invalid state", { status: 400 });
  }

  const tokens = await google.validateAuthorizationCode(code, codeVerifier);
  const accessToken = tokens.accessToken();

  const googleRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const googleUser = await googleRes.json();

  if (!googleUser.email) return NextResponse.redirect(new URL("/login", request.url));

  const existing = await db.select().from(users).where(eq(users.email, googleUser.email));
  let user;

  if (existing.length === 0) {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    const inserted = await db.insert(users).values({
      email: googleUser.email,
      name: googleUser.name || "",
      status: googleUser.email === DEVELOPER_EMAIL ? "active" : "trial",
      expiryDate: expiry.toISOString(),
      reminderSent: 0,
    }).returning();
    user = inserted[0];
  } else {
    user = existing[0];
    if (googleUser.email !== DEVELOPER_EMAIL) {
      const expiry = user.expiryDate ? new Date(user.expiryDate) : null;
      const isActive = user.status === "active" && expiry && expiry > new Date();
      const isTrial = user.status === "trial" && expiry && expiry > new Date();
      if (!isActive && !isTrial) {
        return NextResponse.redirect(new URL("/expired", request.url));
      }
    }
  }

  const token = await createSession(user.id, user.email, user.name, user.status, user.expiryDate);

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set("session", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
  response.cookies.set("role", "owner", { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: "/" });
  response.cookies.set("owner_email", googleUser.email, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: "/" });
  response.cookies.set("owner_name", googleUser.name || "", { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: "/" });

  return response;
}