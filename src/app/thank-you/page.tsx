"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Mail,
  CalendarDays,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Shield,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageShell } from "@/components/layout/PageShell";
import { ServiceCapabilities } from "@/components/shared/ServiceCapabilities";

declare global {
  interface Window {
    hsMeetingsEmbed?: () => void;
  }
}

/* ════════════════════════════════════════════════════════════════════════════
   HUBSPOT CALENDAR EMBED
   ════════════════════════════════════════════════════════════════════════════ */

function HubSpotCalendar() {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      if (typeof window !== "undefined" && window.hsMeetingsEmbed) {
        try {
          window.hsMeetingsEmbed();
        } catch {
          // silently fail
        }
      }
    }
  }, []);

  return (
    <div
      className="meetings-iframe-container w-full min-h-[600px] sm:min-h-[650px]"
      data-src="https://meetings.hubspot.com/jamie-shanks/book-a-discovery-call-with-get-levrg?embed=true"
    />
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   1. THANK YOU BANNER
   ════════════════════════════════════════════════════════════════════════════ */

function ThankYouBanner() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-gray-100">
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-spark-50/50 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-spark-50/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-spark-50 border border-spark-200 mb-6"
          >
            <CheckCircle className="h-4 w-4 text-spark-600" />
            <span className="text-sm-body font-medium text-spark-700">
              Request Received
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-h1 sm:text-display text-gray-900 mb-4"
          >
            Thanks! We&apos;ll Be{" "}<span className="text-[#51B027]">In Touch Shortly</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body sm:text-sub text-gray-500 leading-relaxed"
          >
            We received your inquiry and will get back to you soon. If you&apos;d like to move things forward faster, book a convenient time below to connect with our team.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   2. CALENDAR + VIDEO  Two-column layout
   ════════════════════════════════════════════════════════════════════════════ */

const CALL_BULLETS = [
  "Discuss your current situation and goals",
  "Identify opportunities for improvement and efficiency",
  "Share relevant recommendations and insights",
  "Outline possible next steps based on your needs",
];

function VideoEmbed() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "jj7srGIWk08";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      <div className="relative aspect-video bg-black">
        <iframe
          key={isPlaying ? "playing" : "preview"}
          src={
            isPlaying
              ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
              : `https://www.youtube.com/embed/${videoId}?start=33&autoplay=0&rel=0&modestbranding=1`
          }
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Get Levrg Overview"
        />
        {!isPlaying && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 cursor-pointer bg-black"
            onClick={() => setIsPlaying(true)}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-spark-600 flex items-center justify-center shadow-lg shadow-spark-600/30 hover:bg-spark-800 transition-colors group">
              <Play className="h-6 w-6 sm:h-7 sm:w-7 text-white ml-0.5 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-center">
              <p className="text-body font-bold text-white drop-shadow mb-0.5">
                Watch the 90-Second Overview
              </p>
              <p className="text-sm-body text-white/80 drop-shadow">
                What Happens Next
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarAndVideoSection() {
  return (
    <section className="relative bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN  60%  HUBSPOT CALENDAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div id="calendar" className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-spark-50 flex items-center justify-center shrink-0">
                    <CalendarDays className="h-4 w-4 text-spark-600" />
                  </div>
                  <div>
                    <h3 className="text-sub font-bold text-gray-900">
                      Book a Discovery Call
                    </h3>
                    <p className="text-sm-body text-gray-500">
                      Pick a time that works for you
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-3">
                    <span className="hidden sm:flex items-center gap-1.5 text-sl text-gray-400">
                      <Clock className="h-3 w-3" />
                      15 min
                    </span>
                    <span className="hidden sm:flex items-center gap-1.5 text-sl text-gray-400">
                      <Shield className="h-3 w-3" />
                      No commitment
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-white">
                <HubSpotCalendar />
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN  40%  VIDEO + EXPLANATION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <VideoEmbed />

            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
              <h3 className="text-sub font-bold text-gray-900 mb-3">
                What Happens on the Call
              </h3>
              <p className="text-sm-body text-gray-600 mb-5 leading-relaxed">
                We&apos;ll spend a few minutes learning about your business, understanding your objectives, and exploring the best way to support your growth.
              </p>
              <ul className="space-y-3">
                {CALL_BULLETS.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-spark-100 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-3 w-3 text-spark-600" />
                    </div>
                    <span className="text-sm-body text-gray-600">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 pt-5 mt-5 border-t border-gray-100">
                <span className="flex flex-col items-center gap-1 text-sl text-gray-400">
                  <Clock className="h-3 w-3" />
                  15 min call
                </span>
                <span className="flex flex-col items-center gap-1 text-sl text-gray-400">
                  <Mail className="h-3 w-3" />
                  Breakdown in 24 hrs
                </span>
                <span className="flex flex-col items-center gap-1 text-sl text-gray-400">
                  <Shield className="h-3 w-3" />
                  No commitment
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   3. TESTIMONIALS (carousel)
   ════════════════════════════════════════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    quote: "We started on Wednesday and they were delivering by Monday. The speed is unlike anything we've experienced with any other vendor or hire. It just works.",
    name: "Thomas Buchanan",
    image: "/images/client/thomas-buchanan.webp",
    title: "CRO",
    company: "Sales Tempo",
  },
  {
    quote: "Get Levrg is able to get us right in front of our top-tier ICP. The targeting, the content, the outreach — it's all coordinated in a way our internal team couldn't pull off alone.",
    name: "Marché Kaanehe",
    image: "/images/client/marche-kaanehe.webp",
    title: "Manager of Product Marketing",
    company: "Cengage Group",
  },
  {
    quote: "Communication with Get Levrg has been very reliable. They show up every week, hit their deliverables, and flag issues before they become problems. That consistency alone is worth it.",
    name: "Jay Francis",
    image: "/images/client/jay-francis.webp",
    title: "Marketing Coordinator",
    company: "Oxford Medical Simulation Inc.",
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[current];

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-4">
          <p className="text-caption text-spark-600 mb-3">Why operators trust us</p>
        </AnimatedSection>
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            What Our <span className="text-[#51B027]">Partners</span> Say
          </h2>
        </AnimatedSection>

        <div className="relative">
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-spark-50 hover:border-spark-200 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-spark-50 hover:border-spark-200 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="p-8 sm:p-10 rounded-2xl border border-gray-100 bg-gray-50 shadow-sm"
              >
                <Quote className="h-10 w-10 text-spark-300 mb-5" />
                <p className="text-sub sm:text-h3 text-gray-700 italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-spark-500 fill-spark-500" />
                  ))}
                </div>
                <div className="pt-5 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <p className="text-sm-body font-semibold text-gray-900">{t.name}</p>
                      <p className="text-sl text-gray-500">{t.title} &middot; {t.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className="p-2.5 flex items-center justify-center"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-spark-500" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   4. FINAL CTA
   ════════════════════════════════════════════════════════════════════════════ */

function FinalCTASection() {
  const scrollToCalendar = () => {
    const el = document.querySelector(".meetings-iframe-container");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="py-14 sm:py-20 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-2xl border border-spark-200 bg-white shadow-sm overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-spark-400 via-spark-500 to-spark-600" />
            <div className="px-6 sm:px-10 py-10 sm:py-14 text-center">
              <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
                Ready to <span className="text-[#51B027]">Get Started?</span>
              </h2>
              <p className="text-body text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
                Book a 15-minute discovery call and we&apos;ll put together a custom plan tailored to your business — not a template.
              </p>
              <Button
                variant="ghost"
                onClick={scrollToCalendar}
                className="bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold h-12 px-8 rounded-lg text-base transition-all hover:shadow-md hover:shadow-spark-600/20"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                Book Your Call Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm-body text-gray-400 mt-4">
                15 minutes &middot; No pitch deck &middot; No commitment
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   EXPORT
   ════════════════════════════════════════════════════════════════════════════ */

export default function ThankYouPage() {
  return (
    <PageShell
      ctaText="Book My Call"
      ctaTarget="#calendar"
      meta={{
        title: "Thank You — Book Your Discovery Call | Get Levrg",
        description:
          "Book your free 15-minute discovery call. We'll learn about your business and outline the best way to support your growth. No pitch deck, no commitment.",
        noindex: true,
        ogTitle: "Book Your Discovery Call | Get Levrg",
        ogDescription:
          "15 minutes. Custom plan. No pitch deck. No commitment.",
        ogImage: "/images/hero/video-hero.webp",
      }}
    >
      <ThankYouBanner />
      <CalendarAndVideoSection />
      <ServiceCapabilities />
      <TestimonialsSection />
      <FinalCTASection />
    </PageShell>
  );
}
