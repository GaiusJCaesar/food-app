import type { Metadata } from "next";
import { Geist, Geist_Mono, Happy_Monkey } from "next/font/google";
import "@/lib/initAmplify";
import "@/styles/globals.css";
import Navbar from "@/components/top-nav";
import ThemeProvider from "@/components/providers/theme-provider";
import AuthProvider from "@/components/providers/auth-provider";

// const { publicRuntimeConfig } = getConfig();
// const version = publicRuntimeConfig?.version;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const happyMonkey = Happy_Monkey({
  variable: "--font-happy-monkey",
  subsets: ["latin"],
  weight: ["400"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Food App",
  description: "By GaiusJCaesar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${happyMonkey.variable} antialiased bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
