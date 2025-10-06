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

  // TRIPLE CHECK - jangan render apapun sampai mounted DAN pathname ready DAN bukan admin
  if (!mounted) return null;
  if (!pathname) return null;
  if (pathname.startsWith("/admin")) return null;

  return <Header />;
}

