import { Geist } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata = {
  title: "Hotel Pro",
  description: "Hotel management software — Rooms, Bookings, Billing, Staff",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Hotel Pro" },
  icons: { apple: "/icon-192x192.png" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0f1e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-gray-950 text-white antialiased">
        <PWARegister />
        {children}
      </body>
    </html>
  );
}