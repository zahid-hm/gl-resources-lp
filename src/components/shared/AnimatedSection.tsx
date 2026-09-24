"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * Scroll-reveal primitives.
 *
 * These used to be Framer Motion components. Each instance mounted a
 * MotionValue graph and its own `useInView` observer, and — because Framer
 * renders its `initial` state during SSR — shipped `style="opacity:0"` in the
 * HTML for every revealed block on the page. Landing pages here render
 * hundreds of them, so that was a large slice of hydration time and main-thread
 * work for animations the compositor can run on its own.
 *
 * The behaviour is identical, but the animation itself is now plain CSS
 * (see `.gl-scroll-reveal` / `.gl-stagger` in globals.css) and visibility is
 * driven by a single shared IntersectionObserver per root-margin instead of one
 * per element.
 */

type Observed = (isIntersecting: boolean) => void;

const observers = new Map<string, IntersectionObserver>();
const callbacks = new WeakMap<Element, Observed>();

function getObserver(margin: string): IntersectionObserver {
  let observer = observers.get(margin);
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          callbacks.get(entry.target)?.(entry.isIntersecting);
        }
      },
      { rootMargin: margin, threshold: 0 }
    );
    observers.set(margin, observer);
  }
  return observer;
}

/** Adds `gl-in` to the element once it scrolls into view. */
function useInViewClass(
  ref: React.RefObject<HTMLElement | null>,
  { once = true, margin = "-80px" }: { once?: boolean; margin?: string } = {}
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Older browsers (and anything where the observer fails to construct) get
    // the content immediately rather than a permanently invisible page.
    // Deferred to the next frame so the reveal never lands in the same commit
    // as the effect that scheduled it.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = getObserver(margin);
    callbacks.set(el, (isIntersecting) => {
      if (isIntersecting) {
        setInView(true);
        if (once) {
          observer.unobserve(el);
          callbacks.delete(el);
        }
      } else if (!once) {
        setInView(false);
      }
    });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
    };
  }, [ref, once, margin]);

  return inView;
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
  stagger?: number;
}

const OFFSETS: Record<string, { x: string; y: string }> = {
  up: { x: "0", y: "40px" },
  down: { x: "0", y: "-40px" },
  left: { x: "40px", y: "0" },
  right: { x: "-40px", y: "0" },
  none: { x: "0", y: "0" },
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
  stagger = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewClass(ref, { once });
  const offset = OFFSETS[direction] ?? OFFSETS.up;

  return (
    <div
      ref={ref}
      className={`gl-scroll-reveal${inView ? " gl-in" : ""} ${className}`}
      style={
        {
          "--gl-x": offset.x,
          "--gl-y": offset.y,
          "--gl-delay": `${delay + stagger}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewClass(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={`gl-stagger${inView ? " gl-in" : ""} ${className}`}
      style={{ "--gl-stagger": `${staggerDelay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`gl-stagger-item ${className}`}>{children}</div>;
}

export function FloatingElement({
  children,
  className = "",
  amplitude = 8,
  duration = 4,
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <div
      className={`gl-float ${className}`}
      style={
        {
          "--gl-amp": `${amplitude}px`,
          "--gl-float-dur": `${duration}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function CountUp({
  target,
  prefix = "",
  suffix = "",
  className = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInViewClass(ref, { once: true, margin: "0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // rAF instead of a 20ms interval: the old timer fired ~100 React renders
    // per counter regardless of whether the browser was ready to paint.
    // 1ms rather than 0 so the progress ratio can never be 0/0.
    const duration = reduceMotion ? 1 : 2000;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
