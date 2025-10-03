import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "./components/ConditionalHeader";

const inter = Inter({
  subsets: ['latin'],
  variable: "--font-geist-sans",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: "--font-geist-mono",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Portofolio - Taji Jadda Giras Sentosa",
  description: "Portofolio pribadi - Web Developer & IoT Specialist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Preload critical resources for better LCP */}
        <link rel="preload" as="image" href="/images/profile.jpg" fetchPriority="high" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black`}
        suppressHydrationWarning
      >
        <ConditionalHeader />
        {children}
      </body>
    </html>
  );
}
