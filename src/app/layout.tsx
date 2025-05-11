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
    "If you'd like to improve your web development skills with personalized help, I also tutor on Preply. Use my referral link to book a session with me or other tutors 🙌.",
  keywords: [
    "web development tutor",
    "learn web development",
    "HTML CSS JavaScript lessons",
    "JavaScript tutor",
    "web development teacher",
    "beginner web development course",
    "interactive web development projects",
    "front-end development tutoring",
    "Andrew Nessin R"
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
