"use client";

import { motion } from "framer-motion";
import { ReactNode, Children, isValidElement, cloneElement } from "react";

interface StaggeredRevealProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  staggerDelay?: number;
  initialDelay?: number;
}

export default function StaggeredReveal({
  children,
  direction = "left",
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggeredRevealProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.4, 0.25, 1] as any,
      },
    },
  };

  // Function to wrap grid children
  const wrapChildren = (child: ReactNode): ReactNode => {
    if (isValidElement(child) && child.type === 'div' && child.props.className?.includes('grid')) {
      // This is the grid container, wrap its children
      const gridChildren = Children.toArray(child.props.children);
      const wrappedGridChildren = gridChildren.map((gridChild, index) => (
        <motion.div key={index} variants={itemVariants}>
          {gridChild}
        </motion.div>
      ));
      
      return cloneElement(child, {}, wrappedGridChildren);
    }
    return child;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {wrapChildren(children)}
    </motion.div>
  );
}
