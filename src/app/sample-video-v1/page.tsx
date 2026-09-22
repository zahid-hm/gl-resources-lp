"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Clock, Star, Play, Pause, Zap, CalendarDays, TrendingUp, VolumeX,
  ListChecks, CheckCircle2, Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/shared/LeadForm";
import { MobileAppNav } from "@/components/sample/MobileAppNav";
import { MobileAppTopBar } from "@/components/sample/MobileAppTopBar";
import { MobileInfoSheet } from "@/components/sample/MobileInfoSheet";

/* ════════════════════════════════════════════════════════════════════════════
   SAMPLE — VARIANT 1, "mobile app" iteration
   Same "Watch, Then Convert" copy as VideoPageV1, but on mobile:
   - No raised FAB, no Home/Watch scroll tabs — the nav is three flat, equal
     tabs, in order: Process / Decide / Get Quote, each opening a bottom
     sheet rather than scrolling (there's nothing left on the page to scroll
     to for any of them).
   - Reading order after the video is: subheading -> stats -> testimonial.
   - Neither the form nor the process steps sit inline on the mobile page —
     both live in sheets, alongside a "why us" facts sheet. Desktop keeps the
     original layout entirely as-is; none of this mobile chrome applies there.
   ════════════════════════════════════════════════════════════════════════════ */

const testimonials = [
  {
    quote: "The team elevated our content game and streamlined publishing across platforms.",
    name: "Leslie Heller",
    title: "Director of Marketing | Factor AE",
    image: "/images/client/leslie-heller.webp",
  },
  {
    quote: "We started on Wednesday and Get Levrg was delivering real value by Monday. That speed changed everything.",
    name: "Phil Wittmer",
    title: "Director of Marketing | Velosio",
    image: "/images/client/phil-wittmer.webp",
  },
  {
    quote: "Flawless teamwork. Get Levrg made everything smooth and effortless.",
    name: "Aizat Paharodzi",
    title: "Creative Video Lead | 2X",
    image: "/images/client/aizat-paharodzi.webp",
  },
];

const metrics = [
  { icon: Zap, text: "Launch in 14 Days" },
  { icon: CalendarDays, text: "48-Hour Turnaround" },
  { icon: TrendingUp, text: "80% Cost Savings" },
];

const processSteps = [
  { title: "Submit Your Brief", timeline: "Day 1" },
  { title: "Meet Your PM", timeline: "Day 2-3" },
  { title: "Processes Go Live", timeline: "End of Week 1" },
  { title: "First Deliverables", timeline: "Week 2" },
  { title: "Scale On Your Terms", timeline: "Week 2+" },
];

const subheading =
  "Get a dedicated video editing team that handles the editing, project management, quality checks, and turnaround. You bring the footage and the goals, we keep it shipping.";

function StatsRow({ className = "" }: { className?: string }) {
  return (
    <div className={`grid grid-cols-3 gap-2.5 ${className}`}>
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <div key={i} className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-center flex flex-col items-center justify-center gap-1.5">
            <Icon className="h-5 w-5 text-spark-400" />
            <p className="text-xs text-gray-300 leading-snug font-medium">{m.text}</p>
          </div>
        );
      })}
    </div>
  );
}

function TestimonialCard({ index, className = "" }: { index: number; className?: string }) {
  const t = testimonials[index];
  return (
    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 overflow-hidden min-h-[104px] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-xs sm:text-sm-body text-gray-300 italic mb-2.5">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="flex items-center gap-2.5">
            <img
              src={t.image}
              alt={t.name}
              loading="lazy"
              decoding="async"
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="text-xs font-semibold text-white leading-tight">{t.name}</p>
              <p className="text-[10px] text-gray-400 leading-tight">{t.title}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Desktop keeps the original animated, horizontal, arrow-connected row.
 *  The sheet variant is a plain vertical list — it doesn't need any of the
 *  desktop-specific layout since the sheet itself is mobile-only. */
function ProcessSteps({ variant }: { variant: "desktop" | "sheet" }) {
  if (variant === "sheet") {
    return (
      <ul className="space-y-4">
        {processSteps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-spark-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-gray-900">{step.title}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <Clock className="h-3 w-3" />
                {step.timeline}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 lg:justify-center">
      {processSteps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-2 shrink-0">
            <motion.div
              animate={{ opacity: [1, 0.35, 1], scale: [1, 1.15, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              className="w-6 h-6 rounded-full bg-spark-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0"
            >
              {i + 1}
            </motion.div>
            <div>
              <p className="text-xs sm:text-sm-body font-semibold text-white leading-tight">{step.title}</p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                {step.timeline}
              </p>
            </div>
          </div>
          {i < processSteps.length - 1 && (
            <ArrowRight className="hidden lg:block h-3.5 w-3.5 text-spark-300/50 shrink-0" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function HeroSection() {
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play()
      .then(() => setMuted(false))
      .catch(() => {
        video.muted = true;
        setMuted(true);
      });
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const unmute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    setMuted(false);
    v.play().catch(() => {});
  };

  return (
    <section
      id="lead-form"
      className="relative min-h-screen lg:flex lg:items-center lg:justify-center bg-[#061512] pb-24 lg:pb-0"
    >
      <div className="absolute inset-0 opacity-40">
        <img
          src="/images/hero/video-hero.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061512]/90 via-[#061512]/70 to-[#061512]" />
      </div>

      {/* One block, centered as a unit on desktop (min-h-screen + items-center
          vertically, mx-auto/max-w-container horizontally per row). Text sizes
          are fixed at every breakpoint, not viewport-height-scaled — if the
          content is taller than the screen, the section simply grows past
          100vh and the page scrolls normally, same as everywhere else on the
          site, instead of trying to force everything into exactly one
          viewport. */}
      <div className="relative z-10 w-full">
        {/* Top: logo + centered headline. Desktop-only logo — mobile gets its
            branding from MobileAppTopBar instead, so it isn't duplicated.
            Same max-width + padding scale as the content below, so the whole
            hero reads as one centered column instead of the headline having
            its own, narrower margins at sm/lg. */}
        <div className="px-6 sm:px-10 lg:px-16 max-w-container mx-auto w-full">
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src="/Light Logo.webp"
            alt="Get Levrg"
            width={120}
            height={32}
            decoding="async"
            className="hidden lg:block h-7 w-auto mx-auto mt-6 sm:mt-8"
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-center leading-tight pt-16 lg:pt-6 sm:pt-8 pb-3 sm:pb-4"
          >
            Managed Video Editing for Teams
            <br />
            <span className="text-[#51B027]">That Need More Content Out the Door</span>
          </motion.h1>
        </div>

        {/* Video (both breakpoints) + form (desktop only, beside the video) */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-center gap-6 lg:gap-10 px-6 sm:px-10 lg:px-16 max-w-container mx-auto w-full">
          <div className="flex flex-col w-full">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <video
                ref={videoRef}
                muted={muted}
                loop
                playsInline
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              >
                <source src="/video/video-general-targeting.webm" type="video/webm" />
              </video>

              {muted && (
                <button
                  onClick={unmute}
                  aria-label="Unmute video"
                  className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors group"
                >
                  <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white shadow-2xl group-hover:bg-black/70 group-hover:scale-110 transition-all duration-300">
                    <VolumeX className="h-7 w-7 sm:h-8 sm:w-8" />
                  </span>
                </button>
              )}

              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Desktop only — testimonial sits right under the video, unchanged position */}
            <TestimonialCard index={testimonialIndex} className="hidden lg:block mt-2.5" />

            {/* Mobile only — subheading, then stats, then the testimonial */}
            <div className="lg:hidden mt-5">
              <p className="text-center text-base text-gray-300 mb-4">{subheading}</p>
              <StatsRow />
              <TestimonialCard index={testimonialIndex} className="mt-4" />
            </div>
          </div>

          {/* Desktop only — form card sits beside the video, unchanged from the original layout */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:block w-full"
          >
            <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-2xl p-4 sm:p-5">
              <div className="mb-6 text-center">
                <h2 className="text-sub font-bold text-gray-900 mb-1.5">
                  Let&apos;s Start Today
                </h2>
              </div>
              <LeadForm idPrefix="v1-desktop" />
            </div>

            <StatsRow className="mt-2.5" />
          </motion.div>
        </div>

        {/* Desktop only — subheading below the grid, unchanged position */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="hidden lg:block text-center text-lg text-gray-300 px-6 sm:px-10 lg:px-16 max-w-container mx-auto w-full pt-2 pb-3 sm:pb-4"
        >
          {subheading}
        </motion.p>

        {/* Desktop only — the process row; on mobile it lives in the Process
            sheet instead. Just a normal block at the end of the centered
            content now, not pinned to the viewport edge. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:block mt-2 pt-2 border-t border-white/10 px-6 sm:px-10 lg:px-16 pb-3 sm:pb-4"
        >
          <div className="max-w-container mx-auto">
            <ProcessSteps variant="desktop" />
          </div>
        </motion.div>
      </div>

      <MobileAppTopBar />
    </section>
  );
}

export default function Page() {
  const [infoOpen, setInfoOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [processOpen, setProcessOpen] = useState(false);

  return (
    <PageShell
      navItems={[]}
      showHeader={false}
      showFooter={false}
      meta={{
        title: "Managed Video Editing Services | Get Levrg (Sample)",
        description: "A dedicated video editing team that handles the editors, project management, quality checks, and turnaround, so your team publishes more.",
        noindex: true,
        ogImage: "/images/hero/video-hero.webp",
      }}
    >
      <HeroSection />

      <MobileAppNav
        tabs={[
          { label: "Process", icon: ListChecks, active: processOpen, onClick: () => setProcessOpen(true) },
          { label: "Decide", icon: Sparkles, active: infoOpen, onClick: () => setInfoOpen(true) },
          { label: "Get Quote", icon: ArrowRight, emphasized: true, active: formOpen, onClick: () => setFormOpen(true) },
        ]}
      />

      <MobileInfoSheet open={infoOpen} onClose={() => setInfoOpen(false)} title="Take Your Decision">
        <ul className="space-y-3">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <li key={i} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-spark-50 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-spark-600" />
                </span>
                <span className="text-sm-body font-medium text-gray-800">{m.text}</span>
              </li>
            );
          })}
          <li className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-spark-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4 w-4 text-spark-600" />
            </span>
            <span className="text-sm-body font-medium text-gray-800">No long-term contracts</span>
          </li>
        </ul>
        <Button
          variant="ghost"
          onClick={() => {
            setInfoOpen(false);
            setFormOpen(true);
          }}
          className="w-full mt-6 bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold h-11 rounded-lg"
        >
          Get a Quote
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </MobileInfoSheet>

      <MobileInfoSheet open={formOpen} onClose={() => setFormOpen(false)} title="Let&apos;s Start Today">
        <LeadForm idPrefix="v1-mobile" onSubmitted={() => setFormOpen(false)} />
      </MobileInfoSheet>

      <MobileInfoSheet open={processOpen} onClose={() => setProcessOpen(false)} title="How It Works">
        <ProcessSteps variant="sheet" />
        <Button
          variant="ghost"
          onClick={() => {
            setProcessOpen(false);
            setFormOpen(true);
          }}
          className="w-full mt-6 bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold h-11 rounded-lg"
        >
          Get a Quote
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </MobileInfoSheet>
    </PageShell>
  );
}
