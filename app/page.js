import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import HotelLanding from "@/components/HotelLanding";

export default async function Home() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  if (role) redirect("/dashboard");
  return <HotelLanding />;
}