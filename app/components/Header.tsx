"use client";

import Link from "next/link";
import { useState } from "react";
import GooeyNav from "./GooeyNav";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Project", href: "#project" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-black/10 bg-white/90 text-black shadow-[0_4px_18px_rgba(0,0,0,0.12)] backdrop-blur" suppressHydrationWarning>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="flex h-16 items-center justify-between" suppressHydrationWarning>
          <Link href="#home" className="text-lg font-semibold">
            Portofolio
          </Link>

          <div className="hidden md:flex items-center" suppressHydrationWarning>
            <GooeyNav
              items={navItems}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 4, 1, 2, 3, 4]}
            />
          </div>

          <button
            aria-label="Toggle Menu"
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-black/[.05] dark:hover:bg-white/[.06]"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/[.08] dark:border-white/[.12]" suppressHydrationWarning>
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 text-sm" suppressHydrationWarning>
            <Link onClick={() => setOpen(false)} href="#home">Home</Link>
            <Link onClick={() => setOpen(false)} href="#about">About</Link>
            <Link onClick={() => setOpen(false)} href="#skills">Skills</Link>
            <Link onClick={() => setOpen(false)} href="#project">Project</Link>
            <Link onClick={() => setOpen(false)} href="#contact">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}


