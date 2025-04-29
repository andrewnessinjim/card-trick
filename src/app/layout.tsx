import type { Metadata } from "next";
import { Macondo } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import { MotionConfig } from "motion/react";

const macondoSans = Macondo({
  variable: "--font-macondo",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Card Trick",
  description: "Built With Motion",
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
        </body>
      </html>
    </MotionConfig>
  );
}
