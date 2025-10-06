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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* Preload critical image for LCP optimization */}
        <link rel="preload" as="image" href="/images/profile.jpg" fetchPriority="high" />
        
        {/* DNS prefetch & preconnect for API */}
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL || ''} />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL || ''} crossOrigin="anonymous" />
        
        {/* Preconnect to API endpoint for faster data fetching */}
        <link rel="preconnect" href="/api/portfolio" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black`}
      >
        <ConditionalHeader />
        {children}
      </body>
    </html>
  );
}
