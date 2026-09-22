import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  navItems?: NavItem[];
  ctaText?: string;
  ctaTarget?: string;
  centerLogo?: boolean;
  hideCta?: boolean;
  /** When true, the CTA button hides while ctaTarget is in view and reappears once it scrolls off-screen (in either direction). */
  dynamicCta?: boolean;
}

export function Header({
  navItems = [],
  ctaText = "Book My Call",
  ctaTarget = "#lead-form",
  centerLogo = false,
  hideCta = false,
  dynamicCta = false,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTargetVisible, setIsTargetVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!dynamicCta || !ctaTarget.startsWith("#")) return;
    const el = document.getElementById(ctaTarget.slice(1));
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsTargetVisible(entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [dynamicCta, ctaTarget]);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  const showNav = navItems.length > 0;
  const showCta = !hideCta && (!dynamicCta || !isTargetVisible);
  const showMobileToggle = showNav || !hideCta;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative flex items-center h-16 ${centerLogo ? "justify-center" : "justify-between"}`}>
          <img src="/logo.webp" alt="Get Levrg" width={120} height={32} decoding="async" />

          {showNav && (
            <motion.nav
              layout
              transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
              className={`hidden md:flex items-center gap-0.5 ${
                centerLogo ? "absolute left-4 sm:left-6 lg:left-8" : ""
              }`}
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-3 py-1.5 text-sm-body font-medium text-gray-500 hover:text-spark-800 rounded-md hover:bg-spark-50/60 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </motion.nav>
          )}

          <AnimatePresence>
            {showCta && (
              <motion.div
                key="nav-cta"
                layout
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25, layout: { duration: 0.3, ease: "easeInOut" } }}
                className={`hidden md:flex items-center ${
                  centerLogo ? "absolute right-4 sm:right-6 lg:right-8" : ""
                }`}
              >
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection(ctaTarget)}
                  className="bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold h-9 px-5 rounded-lg transition-all hover:shadow-md hover:shadow-spark-600/20"
                >
                  {ctaText}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {showMobileToggle && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 text-gray-600 hover:text-gray-900 ${centerLogo ? "absolute right-4" : ""}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showMobileToggle && mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100"
          >
            <div className="px-4 py-3 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2.5 text-sm-body font-medium text-gray-600 hover:text-spark-800 hover:bg-spark-50/60 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
              {showCta && (
                <div className="pt-2 px-3">
                  <Button
                    variant="ghost"
                    onClick={() => scrollToSection(ctaTarget)}
                    className="w-full bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold py-2.5 rounded-lg"
                  >
                    {ctaText}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
