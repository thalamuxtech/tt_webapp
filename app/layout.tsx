import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Script font — stand-in for "Nexa Rust Script R"
// Replace with actual Nexa Rust font file via localFont() when available
const brandScript = Caveat({
  subsets: ["latin"],
  variable: "--font-brand-script",
  weight: ["700"],
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    {
      path: "./fonts/GeistVF.woff",
      weight: "400 900",
      style: "normal",
    },
  ],
  variable: "--font-clash",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://thalamuxtech.com"),
  title: {
    default: "Thalamux Tech — The Intelligent Gateway",
    template: "%s | Thalamux Tech",
  },
  description:
    "Thalamux Tech delivers precision-driven solutions across Data, Analytics, Consultancy, AI, and Automation. Data to Insight. Intelligence to Action.",
  keywords: [
    "data analytics",
    "AI consultancy",
    "business intelligence",
    "automation",
    "data engineering",
    "machine learning",
    "digital transformation",
    "Thalamux Tech",
  ],
  openGraph: {
    type: "website",
    siteName: "Thalamux Tech",
    title: "Thalamux Tech — The Intelligent Gateway",
    description: "Data for insights, Intelligence for your Boldest moves.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@thalamuxtech",
    creator: "@thalamuxtech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${clashDisplay.variable} ${geistMono.variable} ${brandScript.variable} font-inter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
