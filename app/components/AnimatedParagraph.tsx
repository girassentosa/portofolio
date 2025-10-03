"use client";

import dynamic from "next/dynamic";
const ShinyText = dynamic(() => import("./ShinyText"), { ssr: false });

type AnimatedParagraphProps = {
  text: string;
  className?: string;
  shinySpeed?: number; // seconds
};

export default function AnimatedParagraph({
  text,
  className = "",
  shinySpeed = 3,
}: AnimatedParagraphProps) {
  return (
    <div className={className} suppressHydrationWarning>
      <ShinyText text={text} disabled={false} speed={shinySpeed} className="" />
    </div>
  );
}


