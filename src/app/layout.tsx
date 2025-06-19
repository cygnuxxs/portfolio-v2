import type React from "react";
import type { Metadata } from "next/types";
import { Montserrat, Dancing_Script, Roboto } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeDataProvider from "@/components/theme-color-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/CustomCursor";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cygnuxxs Portfolio",
  description: "Full Stack Developer Portfolio of Ashok Atragadda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={`${dancingScript.variable} ${montserrat.variable} ${roboto.variable} selection:bg-primary/20! antialiased font-montserrat h-dvh`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeDataProvider>
            <CursorProvider>
              <CustomCursor />
            <Navbar resumeLink={process.env.RESUME as string} />
            {children}
            <Footer resumeLink={process.env.RESUME as string} />
            </CursorProvider>
          </ThemeDataProvider>
        </ThemeProvider>
        <Script
          id="schema-person"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://cygnuxxs-portfolio.vercel.app/#person",
            "name": "Ashok Atragadda",
            "alternateName": "Cygnuxxs",
            "description": "Full Stack Developer specializing in Next.js, React, TypeScript, and MERN stack",
            "image": "https://cygnuxxs-portfolio.vercel.app/hero1.jpg",
            "url": "https://cygnuxxs-portfolio.vercel.app",
            "sameAs": [
              "https://github.com/cygnuxxs",
              "https://www.linkedin.com/in/ashok-atragadda/",
              "https://x.com/AshyGany",
              "https://www.instagram.com/cygnuxxs/"
            ],
            "jobTitle": "Full Stack Developer",
            "knowsAbout": ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "TailwindCSS"]
          }
        `}
        </Script>

        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://cygnuxxs-portfolio.vercel.app/#website",
            "url": "https://cygnuxxs-portfolio.vercel.app",
            "name": "Cygnuxxs Portfolio",
            "description": "Full Stack Developer Portfolio of Ashok Atragadda",
            "publisher": {
              "@id": "https://cygnuxxs-portfolio.vercel.app/#person"
            }
          }
        `}
        </Script>
      </body>
    </html>
  );
}
