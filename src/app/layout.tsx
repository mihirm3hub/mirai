import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "MIRAI - Spatial Intelligence Portfolio",
  description: "Immersive portfolio landing page for XR, Computer Vision, AI and Physical AI projects.",
  metadataBase: new URL("https://mirai.studio"),
  icons: {
    icon: "/images/fav.png",
    shortcut: "/images/fav.png",
    apple: "/images/fav.png",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
