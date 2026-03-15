import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puente - La Red Profesional para Estudiantes Internacionales",
  description:
    "Conectamos estudiantes internacionales con oportunidades profesionales en España y Europa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
