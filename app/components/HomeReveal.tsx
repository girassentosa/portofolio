"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HomeRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

export default function HomeReveal({
  children,
  delay = 0,
  direction = "left",
  className = "",
}: HomeRevealProps) {
  const directions = {
    left: { x: -80, y: 0 },
    right: { x: 80, y: 0 },
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

