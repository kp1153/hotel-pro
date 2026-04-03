import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
  response.cookies.delete("role");
  response.cookies.delete("owner_name");
  return response;
}