import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/react";

const macondoSans = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Card Trick App",
  description:
    "A fun nostalgic app I built to practice animations with the Motion library",
  keywords: [
    "card trick",
    "magic trick app",
    "21 card trick",
    "interactive animation",
    "Framer Motion",
    "Motion library",
    "React animation",
    "web animation demo",
    "JavaScript card trick",
    "nostalgic games",
    "animation practice",
    "Andrew Nessin R",
  ],
  authors: [{ name: "Andrew Nessin R" }],
  creator: "Andrew Nessin R",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MotionConfig reducedMotion="user">
      <html lang="en">
        <body className={`${macondoSans.variable}`}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          <Analytics />
        </body>
      </html>
    </MotionConfig>
  );
}
