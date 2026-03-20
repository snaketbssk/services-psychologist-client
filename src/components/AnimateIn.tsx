"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type AnimateVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-in";

const HIDDEN: Record<AnimateVariant, string> = {
  "fade-up":    "opacity-0 translate-y-8",
  "fade-down":  "opacity-0 -translate-y-8",
  "fade-left":  "opacity-0 -translate-x-8",
  "fade-right": "opacity-0 translate-x-8",
  "fade-in":    "opacity-0",
};

interface AnimateInProps {
  children: React.ReactNode;
  variant?: AnimateVariant;
  /** Delay in ms before the animation starts (useful for stagger) */
  delay?: number;
  /** Transition duration in ms */
  duration?: number;
  className?: string;
  /** Only animate once (default: true) */
  once?: boolean;
}

export default function AnimateIn({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  className,
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out will-change-transform",
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : HIDDEN[variant],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
