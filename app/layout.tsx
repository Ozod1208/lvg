import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SonnerProvider } from "@/provider/sonner";
import Header from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/provider/theme";
import { TopLoaderProvider } from "@/provider/top-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lvg",
  description: "Created by Ozodjon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system" // Kompyuter sozlamasiga qarab avto aniqlaydi
          enableSystem
          disableTransitionOnChange
        >
          <TopLoaderProvider />
          <Header />
          <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
            {children}
          </div>
          <Footer />
          <SonnerProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
