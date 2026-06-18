import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paypoint — Get paid with one link",
  description:
    "Turn any product or service into a clean payment page. Share the link, get paid — money settles straight to your bank. No website, no code.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-[#33323F] antialiased overflow-x-hidden selection:bg-[#EEEDFE] selection:text-[#14132B]`}
      >
        {children}
      </body>
    </html>
  );
}
