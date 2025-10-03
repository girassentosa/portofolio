import localFont from "next/font/local";
import "./globals.css";
import ConditionalHeader from "./components/ConditionalHeader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
        suppressHydrationWarning
      >
        <ConditionalHeader />
        {children}
      </body>
    </html>
  );
}
