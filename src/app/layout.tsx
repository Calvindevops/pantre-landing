import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const instrumentSerif = localFont({
  src: "./fonts/InstrumentSerif-Italic.ttf",
  variable: "--font-instrument-serif",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Pantrẽ — Cook like someone you love",
  description:
    "AI-powered cooking that knows your fridge, your taste, and your skill level. Join the beta waitlist.",
  openGraph: {
    title: "Pantrẽ — Cook like someone you love",
    description:
      "AI-powered cooking that knows your fridge, your taste, and your skill level. Join the beta waitlist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
