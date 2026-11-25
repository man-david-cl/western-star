import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WESTERN STAR | Merchandise Capital Portfolio",
  description: "Private client merchandise capital portfolio dashboard.",
  robots: { index: false, follow: false, nocache: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
