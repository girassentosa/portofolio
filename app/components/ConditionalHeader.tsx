"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Jangan tampilkan Header jika di halaman admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  
  return <Header />;
}

