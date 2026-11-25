import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WESTERN STAR | Merchandise Capital Portfolio",
  description: "Private client investment portfolio dashboard."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}