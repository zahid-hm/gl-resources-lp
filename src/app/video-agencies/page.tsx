"use client";

import { ArrowRight, Zap, TrendingUp, Shield, Star, CalendarDays, Lock, Mail, Users, Film, Video, Sparkles, Palette } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { TrustedByMarquee } from "@/components/shared/TrustedByMarquee";
import { PhoneField } from "@/components/shared/PhoneField";
import { useLeadForm } from "@/hooks/useLeadForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  VideoAnimation,
  HeroFormIntro,
  ProblemSection,
  SolutionSection,
  SEOSection,
  ToolsWeUseSection,
  RoiSection,
  WorkSampleBentoGrid,
  ComparisonSection,
  HowItWorksSection,
  TestimonialsSection,
  WhyChooseUsSection,
  FAQSection,
  FinalCTASection,
} from "@/components/sections/video";

/* ════════════════════════════════════════════════════════════════════════════
   1. HERO SECTION
   ════════════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const {
    register,
    control,
    handleSubmit,
    onValid,
    formState: { errors, isSubmitting },
  } = useLeadForm();

  return (
    <section
      id="lead-form"
      className="relative overflow-hidden bg-white min-h-[500px] sm:min-h-[680px]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src="/images/hero/video-agencies-hero.webp" srcSet="/images/hero/video-agencies-hero-sm.webp 800w, /images/hero/video-agencies-hero.webp 1440w" sizes="100vw" width="1440" height="804"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061512]/95 via-[#061512]/70 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-3">

            {/* Badge */}
            <div className="gl-reveal gl-dur5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
              <Zap className="h-3.5 w-3.5 text-spark-300" />
              <span className="text-sm-body font-medium text-white">
                White-Label Video for Agencies
              </span>
            </div>

            {/* Headline */}
            <h1 className="gl-reveal gl-d1 text-h1 sm:text-display lg:text-display-sm text-white mb-6">
              White-Label Video Editing
              <br />
              <span className="text-[#51B027]">
                For Agencies
              </span>
            </h1>

            {/* Subheadline */}
            <p className="gl-reveal gl-d2 text-body sm:text-sub text-gray-300 max-w-2xl mb-8">
              Get a white-label video editing team that handles short-form, long-form, motion graphics, and multi-platform formatting branded as your agency&apos;s work, delivered on your timeline.
            </p>

            {/* Metrics bar */}
            <div className="gl-reveal gl-d3 flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              {[
                { icon: Zap, text: "Launch in 7 Days" },
                { icon: CalendarDays, text: "48-Hour Standard Turnaround" },
                { icon: TrendingUp, text: "80% Cost Savings" },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 text-sm-body font-medium text-gray-200 bg-white/10 border border-white/20 px-3.5 py-2 rounded-lg"
                  >
                    <Icon className="h-4 w-4 text-spark-400" />
                    {m.text}
                  </span>
                );
              })}
            </div>

            {/*  */}
            <div className="gl-reveal gl-d4 relative p-5 sm:p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm max-w-2xl">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-spark-500 fill-spark-500" />
                ))}
                <span className="ml-2 text-caption text-spark-300"></span>
              </div>
              <p className="text-sm-body sm:text-body text-gray-200 italic mb-3">
                &ldquo;We went from publishing one product video a quarter to four per month. Clients have no idea the editing isn&apos;t in-house. This single service line generates{" "}
                <span className="text-spark-400 font-semibold not-italic">$12K monthly recurring</span>.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/images/client/miles-kaiburn.webp"
                  alt="Miles Kaiburn"
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm-body font-semibold text-white">Miles Kaiburn</p>
                  <p className="text-xs text-gray-400">CEO | Old Town Media</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN FORM WITH INTRO ANIMATION */}
          <HeroFormIntro animation={<VideoAnimation config={{
            headerIcon: Users,
            headerTitle: "White-Label Production",
            stats: [
              { icon: Film, label: "Client Projects", value: "8/mo", delay: 0.5, accent: "bg-sky-50 border-sky-200", iconColor: "text-sky-500", valueColor: "text-sky-700" },
              { icon: Video, label: "Branded Reels", value: "16/mo", delay: 0.8, accent: "bg-spark-50 border-spark-200", iconColor: "text-spark-600", valueColor: "text-[#4A6F27]" },
              { icon: Sparkles, label: "Motion Assets", value: "6/mo", delay: 1.1, accent: "bg-teal-50 border-teal-200", iconColor: "text-teal-500", valueColor: "text-teal-700" },
              { icon: Palette, label: "Client Thumbnails", value: "8/mo", delay: 1.4, accent: "bg-amber-50 border-amber-200", iconColor: "text-amber-500", valueColor: "text-amber-700" },
            ],
          }} />}>
            <div className="rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h2 className="text-sub font-bold text-gray-900 mb-1.5">
                  Let&apos;s Start Today
                </h2>
              </div>
              <form id="video-agencies-hero-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="hero-firstName" className="text-sm-body text-gray-700 mb-1.5">First Name</Label>
                    <Input id="hero-firstName" placeholder="" className="h-10" {...register("firstname")} />
                    {errors.firstname && <p className="text-sm-body text-error mt-1">{errors.firstname.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="hero-lastName" className="text-sm-body text-gray-700 mb-1.5">Last Name</Label>
                    <Input id="hero-lastName" placeholder="" className="h-10" {...register("lastname")} />
                    {errors.lastname && <p className="text-sm-body text-error mt-1">{errors.lastname.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="hero-workEmail" className="text-sm-body text-gray-700 mb-1.5">Email</Label>
                  <Input id="hero-workEmail" type="email" placeholder="" className="h-10" {...register("email")} />
                  {errors.email && <p className="text-sm-body text-error mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="hero-phoneNumber" className="text-sm-body text-gray-700 mb-1.5">Phone Number</Label>
                  <PhoneField id="hero-phoneNumber" control={control} />
                  {errors.phone && <p className="text-sm-body text-error mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="hero-company" className="text-sm-body text-gray-700 mb-1.5">Company</Label>
                  <Input id="hero-company" placeholder="" className="h-10" {...register("company")} />
                  {errors.company && <p className="text-sm-body text-error mt-1">{errors.company.message}</p>}
                </div>
                <Button
                  variant="ghost"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold h-11 rounded-lg text-base transition-all"
                >
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </HeroFormIntro>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   EXPORT: VideoAgenciesPage
   ════════════════════════════════════════════════════════════════════════════ */

export default function Page() {
  return (
    <PageShell
      navItems={[
        { label: "Problems", href: "#problems" },
        { label: "Solution", href: "#solution" },
        { label: "Results", href: "#results" },
        { label: "Process", href: "#process" },
      ]}
      ctaText="See How It Works"
      ctaTarget="#lead-form"
      meta={{
        title: "White-Label Video Editing for Agencies | Get Levrg",
        description: "White-label video editing teams for agencies. Short-form, long-form, motion graphics, multi-platform delivered under your brand on your timeline.",
        keywords: "white label video editing for agencies, agency video editing, outsourced video production",
        ogTitle: "White-Label Video Editing for Agencies | Get Levrg",
        ogDescription: "White-label video editing teams for agencies. Delivered under your brand on your timeline.",
        ogImage: "/images/hero/video-agencies-hero.webp",
      }}
    >
      <HeroSection />
      <TrustedByMarquee />
      <ProblemSection />
      <SolutionSection />
      <SEOSection />
      <ToolsWeUseSection />
      <RoiSection />
      <WorkSampleBentoGrid />
      <ComparisonSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <TestimonialsSection industry="agencies" />
      <FAQSection />
      <FinalCTASection />
    </PageShell>
  );
}
