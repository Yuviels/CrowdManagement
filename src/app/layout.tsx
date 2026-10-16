import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GMS Church — Crowd Ministry",
  description: "Portal resmi pelayanan Crowd Ministry Gereja Mawar Sharon (GMS Church) - Data, Crowd, Usher, dan First Aid Ministry",
  icons: {
    icon: "/gms-logo-badge.png",
    apple: "/gms-logo-badge.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}