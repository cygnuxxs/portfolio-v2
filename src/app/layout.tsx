import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Dancing_Script, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeDataProvider from "@/components/theme-color-provider";

const dancingSans = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({variable : '--font-roboto', display : 'swap', subsets : ['latin']})

export const metadata: Metadata = {
  title: "Cygnuxxs | Fullstack Developer",
  keywords : ['portfolio', 'full stack developer', 'cygnuxxs', 'sde portfolio', 'nextjs', 'nextjs portfolio'
  ],
  authors : [{name : 'Ashok Atragadda', url : 'https://linkedin.com/in/ashok-atragadda'}],
  description:
    "Creative and results-driven full-stack developer specializing in building scalable web applications with modern technologies like Next.js, Tailwind CSS, and TypeScript. Passionate about clean code, intuitive UI/UX, and delivering impactful digital solutions.",
  icons: {
    icon: "/icon.svg",
  },
  metadataBase: new URL("https://cygnuxxs-portfolio.vercel.app"),
  openGraph: {
    title: "Cygnuxxs | Fullstack Developer",
    description:
      "Full-stack developer crafting scalable web apps with Next.js, Tailwind, and TypeScript.",
    url: "https://cygnuxxs-portfolio.vercel.app",
    siteName: "Cygnuxxs Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cygnuxxs Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cygnuxxs | Fullstack Developer",
    description:
      "Crafting modern, scalable web applications with intuitive UX and clean code.",
    images: ["/og-image.png"],
    creator: "@AshyGany",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dancingSans.variable} ${montserrat.variable} ${roboto.variable} selection:bg-primary/20 antialiased font-montserrat h-dvh`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
        >
          <ThemeDataProvider>
            <Navbar resumeLink={process.env.RESUME as string} />
            {children}
            <Footer resumeLink={process.env.RESUME as string} />
          </ThemeDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
