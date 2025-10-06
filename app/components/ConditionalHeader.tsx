"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { useEffect, useState } from "react";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Hindari hydration mismatch: render setelah mount saja
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Jangan tampilkan Header jika di halaman admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <Header />;
}

