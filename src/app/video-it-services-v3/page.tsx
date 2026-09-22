"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, CalendarDays, Star, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneField } from "@/components/shared/PhoneField";
import { useLeadForm } from "@/hooks/useLeadForm";
import { trustedLogos } from "@/components/shared/TrustedByMarquee";
import { ToolsWeUseSection, ComparisonSection } from "@/components/sections/video";
import {
  ProblemSection,
  SolutionSection,
  SEOSection,
  RoiSection,
  HowItWorksSection,
  TestimonialsSection,
  WhyChooseUsSection,
  FAQSection,
  FinalCTASection,
} from "@/components/sections/video-it-services";

/* ════════════════════════════════════════════════════════════════════════════
   VARIANT 3 — "Split-Screen Sticky"
   No top nav / footer. The left column (logo + pitch + form) is pinned to
   the viewport on desktop while the right column scrolls through the full
   page narrative — proof, comparison, process, testimonials, FAQ, final CTA
   — pulled straight from the main IT Services page. Collapses to a normal
   stacked page on mobile.
   ════════════════════════════════════════════════════════════════════════════ */

function LeftColumn() {
  const {
    register,
    control,
    handleSubmit,
    onValid,
    formState: { errors, isSubmitting },
  } = useLeadForm();

  return (
    <div className="bg-[#061512] lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col">
      <div className="flex-1 lg:overflow-y-auto px-6 sm:px-10 lg:px-8 py-10 sm:py-12 lg:py-6 lg:flex lg:flex-col">
        <div className="w-full max-w-[340px] lg:max-w-none mx-auto lg:my-auto text-center">
          <motion.img
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src="/Light Logo.webp"
            alt="Get Levrg"
            width={120}
            height={32}
            decoding="async"
            className="h-8 w-auto mx-auto mb-5"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 mb-4"
          >
            <Zap className="h-3 w-3 text-spark-300" />
            <span className="text-xs font-medium text-white">
              Video for IT Service Providers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-h2 sm:text-h1 lg:text-h3 text-white mb-5 leading-tight"
          >
            Product And Service Videos
            <br />
            <span className="text-[#51B027]">
              Without An In-House Team
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-left mb-5"
          >
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl p-4">
              <h2 className="text-body font-bold text-gray-900 mb-3 text-center">
                Let&apos;s Start Today
              </h2>
              <form id="video-it-services-v3-hero-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="v3-firstName" className="text-xs text-gray-700 mb-1">First Name</Label>
                    <Input id="v3-firstName" placeholder="" className="h-9 text-sm" {...register("firstname")} />
                    {errors.firstname && <p className="text-sm-body text-error mt-1">{errors.firstname.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="v3-lastName" className="text-xs text-gray-700 mb-1">Last Name</Label>
                    <Input id="v3-lastName" placeholder="" className="h-9 text-sm" {...register("lastname")} />
                    {errors.lastname && <p className="text-sm-body text-error mt-1">{errors.lastname.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="v3-workEmail" className="text-xs text-gray-700 mb-1">Email</Label>
                  <Input id="v3-workEmail" type="email" placeholder="" className="h-9 text-sm" {...register("email")} />
                  {errors.email && <p className="text-sm-body text-error mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="v3-phoneNumber" className="text-xs text-gray-700 mb-1">Phone Number</Label>
                  <PhoneField id="v3-phoneNumber" control={control} />
                  {errors.phone && <p className="text-sm-body text-error mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="v3-company" className="text-xs text-gray-700 mb-1">Company</Label>
                  <Input id="v3-company" placeholder="" className="h-9 text-sm" {...register("company")} />
                  {errors.company && <p className="text-sm-body text-error mt-1">{errors.company.message}</p>}
                </div>
                <Button
                  variant="ghost"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold h-10 rounded-lg text-sm transition-all"
                >
                  Get a Quote
                  <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm-body text-gray-300 mb-5"
          >
            Get a dedicated video team that creates product walkthroughs, service explainers, and client testimonial videos so prospects understand your value before the first call.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-5"
          >
            {[
              { icon: Zap, text: "Launch in 14 Days" },
              { icon: CalendarDays, text: "48-Hour Turnaround" },
              { icon: TrendingUp, text: "80% Cost Savings" },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-200 bg-white/10 border border-white/20 px-2.5 py-1 rounded-lg"
                >
                  <Icon className="h-3 w-3 text-spark-400" />
                  {m.text}
                </span>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="rounded-xl bg-white/10 border border-white/20 p-4"
          >
            <div className="flex items-center justify-center gap-2.5 mb-3">
              <img
                src="/images/client/james-mcgrath.webp"
                alt="James McGrath"
                loading="lazy"
                decoding="async"
                className="w-6 h-6 rounded-full object-cover shrink-0"
              />
              <div className="text-left">
                <p className="text-xs font-semibold text-white leading-tight">James McGrath, Empellor CRM</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-2.5 w-2.5 text-spark-500 fill-spark-500" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-200 italic leading-relaxed">
              &ldquo;Always responsive and reliable, Levrg has been a tremendous partner to our team.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>

      <div className="shrink-0 px-6 sm:px-10 lg:px-8 pb-5 lg:pb-5">
        <LeftColumnTrustMarquee />
      </div>
    </div>
  );
}

function LeftColumnTrustMarquee() {
  const logos = trustedLogos.slice(0, 16);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="pt-3 border-t border-white/10"
    >
      <p className="text-center text-[10px] font-semibold text-gray-400 tracking-wider uppercase mb-2.5">
        Trusted by 40+ B2B companies generating $50M+ in revenue
      </p>
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#061512] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#061512] to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee-left will-change-transform">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="flex-shrink-0 mx-2 flex items-center justify-center h-11 w-[76px] rounded-lg bg-white/95 px-2.5 py-2"
            >
              <img
                src={logo.src}
                alt={`${logo.alt} company logo`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function VideoShowcaseSection() {
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = false;
          setMuted(false);
          video.play().catch(() => {
            video.muted = true;
            setMuted(true);
            video.play().catch(() => {});
          });
        } else {
          video.pause();
          video.muted = true;
          setMuted(true);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
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

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            See The Quality <span className="text-[#51B027]">For Yourself</span>
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto mt-4">
            A sample of the product and service videos our team produces for IT and technical companies.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-black">
            <video
              ref={videoRef}
              muted={muted}
              loop
              playsInline
              preload="none"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            >
              <source src="/video/intro1.mp4" type="video/mp4" />
            </video>

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function RightColumn() {
  return (
    <div className="min-w-0 overflow-x-hidden">
      <VideoShowcaseSection />
      <ProblemSection />
      <SolutionSection />
      <SEOSection />
      <ToolsWeUseSection />
      <RoiSection />
      <ComparisonSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}

export default function Page() {
  return (
    <PageShell
      navItems={[]}
      showHeader={false}
      showFooter={false}
      meta={{
        title: "Video Editing for IT Service Providers | Get Levrg",
        description: "Professional product and service videos for IT companies. Dedicated video team for walkthroughs, explainers, and testimonials — no in-house editors needed.",
        keywords: "video editing for IT services, product walkthrough video, tech service explainer video",
        ogTitle: "Video Editing for IT Service Providers | Get Levrg",
        ogDescription: "Product and service videos for IT companies without an in-house team.",
        ogImage: "/images/hero/video-it-services-hero.webp",
      }}
    >
      <div id="lead-form" className="lg:grid lg:grid-cols-[25%_minmax(0,75%)]">
        <LeftColumn />
        <RightColumn />
      </div>
    </PageShell>
  );
}
