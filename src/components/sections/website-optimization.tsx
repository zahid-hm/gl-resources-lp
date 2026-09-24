"use client";

import React, { useState, useEffect, useCallback } from "react";
import { workSampleSrcSet, WORK_SAMPLE_SIZES } from "@/lib/responsive-image";
import { useLeadForm } from "@/hooks/useLeadForm";
import { PhoneField } from "@/components/shared/PhoneField";
import { INTRO_DURATION, TESTIMONIAL_CAROUSEL_ROTATE_MS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Zap,
  TrendingUp,
  Search,
  Shield,
  BarChart3,
  AlertTriangle,
  Layers,
  DollarSign,
  Check,
  X,
  ArrowRight,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Quote,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Monitor,
  Target,
  AlertOctagon,
  MousePointer,
  Code2,
  Brush,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { AnimatedSection, StaggerContainer, StaggerItem, CountUp } from "@/components/shared/AnimatedSection";
import { TrustedByMarquee } from "@/components/shared/TrustedByMarquee";
import { FaqSchema } from "@/components/shared/FaqSchema";
import { PageShell } from "@/components/layout/PageShell";


// ─── Inline ToolsWeUseSection (Website Optimization) ───
export function ToolsWeUseSection() {
  const tools = [
    { src: "/logos/applogos/Webflow.webp", alt: "Webflow" }, { src: "/logos/applogos/Wix.webp", alt: "Wix" },
    { src: "/logos/applogos/Hubspot-CMS.webp", alt: "HubSpot CMS" }, { src: "/logos/applogos/High-Level.webp", alt: "GoHighLevel" },
    { src: "/logos/applogos/Figma.webp", alt: "Figma" }, { src: "/logos/applogos/Ahrefs.webp", alt: "Ahrefs" },
    { src: "/logos/applogos/Semrush.webp", alt: "SEMrush" }, { src: "/logos/applogos/Google-Ads.webp", alt: "Google Ads" },
    { src: "/logos/applogos/Canva.webp", alt: "Canva" }, { src: "/logos/applogos/Zapier.webp", alt: "Zapier" },
    { src: "/logos/applogos/ChatGPT.webp", alt: "ChatGPT" }, { src: "/logos/applogos/Adobe-Photoshop.webp", alt: "Adobe Photoshop" },
    { src: "/logos/applogos/Adobe-Illustrator.webp", alt: "Adobe Illustrator" }, { src: "/logos/applogos/Hubspot.webp", alt: "HubSpot" },
    { src: "/logos/applogos/InDesign.webp", alt: "Adobe InDesign" },
  ];
  const content = {
    title: "The Tools We Use to Build & Optimize Your Website",
    description: "We use industry-leading platforms for design, development, SEO, and performance so your site ranks, loads fast, and converts visitors into leads.",
    bullets: [
      "Webflow & HubSpot CMS certified optimization team",
      "Ahrefs + SEMrush for keyword research & technical SEO",
      "Figma-designed for conversion from the first pixel",
      "Full performance monitoring, uptime alerts & security patches",
    ],
  };
  return (
    <section className="py-16 sm:py-24 bg-spark-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-2">
            <AnimatedSection>
              <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">{content.title}</h2>
              <p className="text-body text-gray-600 mb-6">{content.description}</p>
              <ul className="space-y-3">
                {content.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#51B027] mt-0.5 shrink-0" />
                    <span className="text-sm-body text-gray-700">{bullet}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
          <div className="lg:col-span-3">
            <div className="relative h-[420px] sm:h-[500px] overflow-hidden rounded-2xl bg-white border border-gray-200 p-6">
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-spark-50 to-transparent z-10 pointer-events-none rounded-t-2xl" />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-spark-50 to-transparent z-10 pointer-events-none rounded-b-2xl" />
              <div className="animate-marquee-up will-change-transform">
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[...tools, ...tools, ...tools, ...tools].map((tool, i) => (
                    <div key={i} className="flex items-center justify-center rounded-xl bg-white border border-gray-100 p-3 sm:p-4 lg:p-5 hover:bg-gray-50 hover:border-gray-200 transition-all duration-300 group">
                      <img src={tool.src} alt={tool.alt} width={140} height={56} loading="lazy" decoding="async" className="h-10 sm:h-14 lg:h-16 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Inline WorkSampleBentoGrid (Website Optimization) ───
export function WorkSampleBentoGrid() {
  // "Real results" title/subtitle + carousel removed from all pages.
  return null;
}

// ─── Inline HeroFormIntro (Website Optimization) ───

function WebsiteAnimation() {
  const scores = [
    { label: "Performance", value: 96, color: "bg-emerald-400", pct: 96, delay: 0.2 },
    { label: "SEO Score", value: 94, color: "bg-spark-400", pct: 94, delay: 0.5 },
    { label: "Accessibility", value: 98, color: "bg-blue-400", pct: 98, delay: 0.8 },
    { label: "Best Practices", value: 100, color: "bg-violet-400", pct: 100, delay: 1.1 },
  ];
  const metrics = [
    { icon: Zap, label: "Page Load", value: "1.6s", delay: 0.3, accent: "bg-amber-50 border-amber-200", iconColor: "text-amber-500", valueColor: "text-amber-700" },
    { icon: TrendingUp, label: "Monthly Leads", value: "+312%", delay: 0.6, accent: "bg-spark-50 border-spark-200", iconColor: "text-spark-600", valueColor: "text-[#4A6F27]" },
    { icon: Target, label: "Conv. Rate", value: "4.8%", delay: 0.9, accent: "bg-violet-50 border-violet-200", iconColor: "text-violet-500", valueColor: "text-violet-700" },
    { icon: Search, label: "Google Rank", value: "#1–3", delay: 1.2, accent: "bg-blue-50 border-blue-200", iconColor: "text-blue-500", valueColor: "text-blue-700" },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <div className="absolute inset-0 opacity-[0.03] bg-dot-pattern" />
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-spark-100 flex items-center justify-center"><Globe className="h-3.5 w-3.5 text-spark-600" /></div>
        <span className="text-sm font-semibold text-gray-900 tracking-wide">Website Performance Audit</span>
        <div className="ml-auto flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-spark-500 animate-pulse" /><span className="text-[11px] text-spark-600 font-medium">Optimized</span></div>
      </motion.div>
      <div className="relative space-y-2 mb-5">
        {scores.map((score) => (
          <motion.div key={score.label} initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 1 }} transition={{ duration: 0.8, delay: score.delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 h-8 rounded-lg bg-gray-100 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${score.pct}%` }} transition={{ duration: 1.2, delay: score.delay + 0.1, ease: "easeOut" }} className={`absolute inset-y-0 left-0 ${score.color} rounded-lg opacity-70`} />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-700 z-10">{score.label}</span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: score.delay + 0.8 }} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-700 z-10">{score.value}</motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <motion.div key={m.label} initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.5, delay: m.delay + 1.2, type: "spring", stiffness: 200 }} className={`p-3 rounded-xl border ${m.accent}`}>
              <Icon className={`h-3.5 w-3.5 ${m.iconColor} mb-1.5`} />
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: m.delay + 1.6 }} className={`text-h3 font-bold ${m.valueColor} leading-none mb-0.5`}>{m.value}</motion.p>
              <p className="text-[11px] text-gray-500">{m.label}</p>
            </motion.div>
          );
        })}
      </div>
      <motion.div initial={{ x: "-100%" }} animate={{ x: "200%" }} transition={{ duration: 3, delay: 1, repeat: 1, ease: "linear" }} className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-spark-400 to-transparent" />
    </div>
  );
}

export function HeroFormIntro({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [introKey, setIntroKey] = useState(0);
  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => { setShowIntro(false); }, INTRO_DURATION);
    return () => clearTimeout(timer);
  }, [showIntro, introKey]);
  const replayIntro = useCallback(() => { setShowIntro(true); setIntroKey((k) => k + 1); }, []);
  return (
    <div className="lg:col-span-2">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div key={`intro-${introKey}`} initial={{ opacity: 0, x: 40, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -30, scale: 0.97 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative min-h-[480px] sm:min-h-[520px]">
            <WebsiteAnimation />
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0, x: 30, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative">
            {children}
            <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring", stiffness: 300 }} onClick={replayIntro} className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-white border border-spark-300 flex items-center justify-center hover:bg-spark-600 hover:border-spark-500 transition-all duration-300 group shadow-md" title="Replay intro animation" aria-label="Replay intro animation">
              <RotateCcw className="h-3.5 w-3.5 text-spark-600 group-hover:text-white transition-colors" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 1  HERO (2-column layout with form)
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
    <section id="lead-form" className="relative overflow-hidden min-h-[500px] sm:min-h-[600px]">
      <div className="absolute inset-0">
        <img src="/images/hero/website-optimization-hero.webp" srcSet="/images/hero/website-optimization-hero-sm.webp 800w, /images/hero/website-optimization-hero.webp 1440w" sizes="100vw" width="1440" height="786" alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#061512]/95 via-[#061512]/70 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <div className="gl-reveal gl-dur5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
              <Activity className="h-3.5 w-3.5 text-spark-300" />
              <span className="text-sm-body font-medium text-white">Website Development &amp; Optimization</span>
            </div>

            <h1 className="gl-reveal gl-d1 text-h1 sm:text-display lg:text-display-sm text-white mb-6">
              Your Website Should Work
              <br />
              <span className="text-spark-400">While You Sleep. Is It?</span>
            </h1>

            <p className="gl-reveal gl-d2 text-body sm:text-sub text-gray-300 max-w-4xl mb-8">
              A slow, outdated or under-optimized website costs you leads every day. Get a dedicated team that builds, optimizes, and maintains your web presence so your site ranks, loads fast, and converts visitors into paying clients.
            </p>

            <div className="gl-reveal gl-d3 flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              {[
                { icon: Zap, text: "30-Day Launch" },
                { icon: BarChart3, text: "14 Deliverables Included" },
                { icon: TrendingUp, text: "3x More Leads on Average" },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <span key={i} className="inline-flex items-center gap-2 text-sm-body font-medium text-gray-200 bg-white/10 border border-white/20 px-3.5 py-2 rounded-lg">
                    <Icon className="h-4 w-4 text-spark-400" />
                    {m.text}
                  </span>
                );
              })}
            </div>

            <div className="gl-reveal gl-d4 relative p-5 sm:p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm max-w-4xl">
              <Quote className="absolute top-4 left-5 h-5 w-5 text-spark-300" />
              <p className="text-sm-body sm:text-body text-gray-200 italic mb-3 pl-8">
                &ldquo;We went from page 5 on Google to position 2 for our main keyword in 8 weeks. Inbound leads tripled without spending an extra dollar on ads.&rdquo;
              </p>
              <div className="flex items-center gap-3 pl-8">
                <img
                  src="/images/client/grace-feeney.webp"
                  alt="Chief Marketing Officer"
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm-body font-semibold text-white">Chief Marketing Officer</p>
                  <p className="text-xs text-gray-400">B2B SaaS Platform ($12M ARR)</p>
                </div>
              </div>
            </div>
          </div>

          <HeroFormIntro>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h2 className="text-sub font-bold text-gray-900 mb-1.5">Let&apos;s Start Today</h2>
                <p className="text-sm-body text-gray-500">See what&apos;s holding your site back. Free audit with actionable findings in 24 hours.</p>
              </div>
              <form id="website-optimization-hero-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
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
                <Button variant="ghost" type="submit" disabled={isSubmitting} className="w-full bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold h-11 rounded-lg text-base transition-all">
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
   SECTION 2  PROBLEMS
   ════════════════════════════════════════════════════════════════════════════ */
export function ProblemSection() {
  const problems = [
    {
      icon: Zap,
      title: "The Speed Problem",
      body: "Average B2B sites load in 8+ seconds. Google's threshold is 2.5s. 53% of mobile visitors leave after 3 seconds and every 1-second delay reduces conversions by 7%. Core Web Vitals failures tank your rankings without any warning.",
      pain: "You're paying for traffic that bounces before your page even loads. Every slow page is a lost lead.",
    },
    {
      icon: Search,
      title: "The Invisibility Problem",
      body: "75% of users never scroll past the first page of Google. Your competitors rank for terms your buyers search daily. On-page SEO, AEO, and GEO are an afterthought no structured data, poor meta tags, broken internal links.",
      pain: "If you're not on page one, you don't exist. Buyers choose your competitors before they ever find you.",
    },
    {
      icon: MousePointer,
      title: "The Conversion Leak",
      body: "Average B2B websites convert less than 2% of visitors. No clear calls-to-action, confusing user journeys, forms too long or broken on mobile and zero A/B testing means you're guessing what works.",
      pain: "You could double leads from existing traffic without spending more on ads. Instead, visitors leave without a trace.",
    },
    {
      icon: AlertOctagon,
      title: "The Technical Debt Trap",
      body: "Outdated plugins with known exploits, no backups, hosting that throttles during peak traffic and no developer to fix what breaks. One bad update away from losing everything.",
      pain: "A single breach or site outage during a sales cycle can cost six figures in lost business and destroyed trust.",
    },
  ];

  return (
    <section id="problems" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Your Website is Leaking Leads <span className="text-[#51B027]"><br />Every Single Day</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-14">
          <p className="text-body text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Here&apos;s what we find in almost every website audit we run across industries, budgets, and platforms.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="h-full rounded-xl border border-gray-100 bg-white p-6 border-l-4 border-l-red-400">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-500">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sub font-bold text-gray-900">{problem.title}</h3>
                  </div>
                  <p className="text-sm-body text-gray-600 mb-4">{problem.body}</p>
                  <div className="p-3 rounded-lg border border-red-200 bg-red-50/50">
                    <p className="text-sm-body font-medium text-red-700">
                      <AlertTriangle className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5" />
                      Impact: {problem.pain}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 3  SOLUTION
   ════════════════════════════════════════════════════════════════════════════ */
export function SolutionSection() {
  const differentiators = [
    {
      icon: Monitor,
      title: "Full Website Build & Redesign",
      desc: "Wireframing, design, copywriting, development, and launch. We don't just build beautiful sites we build ones engineered to convert from the first pixel.",
    },
    {
      icon: Search,
      title: "SEO, AEO & GEO Built In",
      desc: "On-page SEO, technical SEO, AI engine optimization, and geo-targeted content all baked in from day one, not bolted on after launch.",
    },
    {
      icon: Target,
      title: "CRO from Day One",
      desc: "Conversion rate optimization isn't an add-on. Every page, form, and CTA is built with your buyer journey in mind. We test what works and keep improving.",
    },
    {
      icon: Shield,
      title: "Ongoing Maintenance & Growth",
      desc: "Plugin updates, security monitoring, performance management, backups, and monthly content. Your website stays fast, secure, and generating leads forever.",
    },
  ];

  return (
    <section id="solution" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            A Website <span className="text-[#51B027]">That Ranks, Loads Fast  </span>and<span className="text-[#51B027]"> Converts</span><br />Built in 30 Days
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-14">
          <p className="text-body text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We don&apos;t just build websites. <span className="font-semibold text-gray-900">We build revenue-generating web assets.</span> Strategy, design, development, SEO, and CRO delivered by one dedicated team, without the agency overhead.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="h-full p-6 rounded-xl border border-gray-100 bg-white border-l-4 border-l-spark-400 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-spark-50 text-spark-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sub font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-sm-body text-gray-600">{item.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-12 text-center" delay={0.3}>
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-spark-50 border border-spark-200">
            <TrendingUp className="h-5 w-5 text-spark-600 shrink-0" />
            <p className="text-body font-semibold text-[#51B027]">Clients see an average 312% increase in leads within 90 days of launch.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   3b. DELIVERABLES SECTION  2-col: checklist left + bento image grid right
   ════════════════════════════════════════════════════════════════════════════ */
export function DeliverablesSection() {
  const deliverables = [
    "Website wireframing & page layout design",
    "Page creation & landing pages",
    "Website content creation & updates",
    "Blog creation & optimization",
    "On-page SEO / AEO / GEO optimization",
    "Technical SEO",
    "CRO setup & optimization",
    "CRM / CMS integrations",
    "Dynamic personalization",
    "Plugin & theme updates",
    "Security monitoring & maintenance",
    "Hosting & performance management",
    "Backup & version control",
    "Custom development & integrations",
  ];

  const bentoImages = [
    { src: "/images/work-samples/website-operations.webp", alt: "Website wireframing and page design", span: "row-span-2" },
    { src: "/images/work-samples/design-development.webp", alt: "Landing page and CRO optimization", span: "" },
    { src: "/images/work-samples/website-strategy.webp", alt: "SEO and content strategy", span: "" },
    { src: "/images/work-samples/personalization-optimization.webp", alt: "CRM integrations and analytics", span: "col-span-2" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-5">
            14 Deliverables, One Dedicated Team <br />
            <span className="text-[#51B027]">Everything Your Web Presence Needs</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-4xl mx-auto">
            Most agencies build your site and disappear. We cover every layer of your web presence from wireframe to weekly maintenance under one monthly retainer. For SaaS, consulting, legal, accounting, financial advisory, IT services, agencies, and commercial real estate.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <AnimatedSection className="mb-8" delay={0.2}>
              <p className="text-body text-gray-600">Get Levrg gives you a dedicated web team that handles:</p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3" staggerDelay={0.03}>
              {deliverables.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-spark-50 border border-spark-100 hover:border-spark-300 hover:shadow-sm transition-all duration-200 h-full">
                    <CheckCircle className="h-5 w-5 text-spark-500 mt-0.5 shrink-0" />
                    <span className="text-sm-body text-gray-700">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimatedSection className="mt-8" delay={0.2}>
              <p className="text-body text-gray-600">
                Whether you need a full rebuild or ongoing optimization, our team becomes your dedicated web department without the overhead of hiring in-house developers, designers, and SEO specialists separately.
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.15} direction="left">
            <div className="grid grid-cols-2 grid-rows-3 gap-3 sm:gap-4 h-[480px] sm:h-[560px]">
              {bentoImages.map((img, i) => (
                <div key={i} className={`relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 group ${img.span}`}>
                  <img src={img.src} srcSet={workSampleSrcSet(img.src)} sizes={WORK_SAMPLE_SIZES} alt={img.alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 4  AUDIT FINDINGS / CASE STUDY
   ════════════════════════════════════════════════════════════════════════════ */
export function AuditFindingsSection() {
  return (
    <section id="results" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            From Invisible to Page One<span className="text-[#51B027]"> <br />From 12 to 51 Leads a Month</span>
          </h2>
          <p className="text-body text-gray-500 max-w-xl mx-auto">A real before-and-after from one of our website optimization engagements.</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 sm:px-8 py-5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center gap-3">
              <Globe className="h-5 w-5 text-spark-600" />
              <span className="font-bold text-gray-900">B2B Legal Firm</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm-body text-gray-600">Commercial Litigation</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm-body text-gray-600">12-attorney team</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm-body text-gray-600">8-year-old website</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="flex items-center gap-2 mb-5">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <h3 className="text-sub font-bold text-red-700">What Was Broken</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-caption text-red-500 mb-2">Performance Issues</p>
                    <ul className="space-y-1.5 text-sm-body text-gray-600">
                      {["11.2-second page load time", "Mobile score: 23/100 (Google Lighthouse)", "No SSL on 4 subpages", "14 outdated plugins 3 with known exploits", "No backups in 18 months"].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><X className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-caption text-red-500 mb-2">SEO &amp; Conversion Issues</p>
                    <ul className="space-y-1.5 text-sm-body text-gray-600">
                      {["Ranking on page 6 for primary keywords", "No Google Business Profile optimization", "Contact form broken on iOS Safari", "No blog zero organic content", "0.8% conversion rate"].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><X className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle className="h-5 w-5 text-spark-500" />
                  <h3 className="text-sub font-bold text-[#51B027]">What We Fixed</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-caption text-[#51B027] mb-2">Performance &amp; Security</p>
                    <ul className="space-y-1.5 text-sm-body text-gray-600">
                      {["Page load: 11.2s → 1.9s", "Mobile score: 23 → 97", "SSL across all pages + security hardening", "All plugins updated, vulnerabilities patched", "Automated daily backups configured"].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-spark-500 mt-0.5 shrink-0" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-caption text-[#51B027] mb-2">SEO, Content &amp; CRO</p>
                    <ul className="space-y-1.5 text-sm-body text-gray-600">
                      {["Ranked page 1, position 2 for top 3 keywords", "Built 12 SEO-optimized practice area pages", "Fixed contact form + added chat widget", "Launched blog: 8 articles in 60 days", "Conversion rate: 0.8% → 5.2%"].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-spark-500 mt-0.5 shrink-0" />{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 bg-spark-50 border-t border-spark-200">
              <p className="text-caption text-[#51B027] mb-4">Results at 90 Days</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { value: "325%", label: "More Inbound Leads", prev: "12 → 51 leads/mo" },
                  { value: "5.2%", label: "Conversion Rate", prev: "was 0.8%" },
                  { value: "83%", label: "Faster Page Load", prev: "11.2s → 1.9s" },
                  { value: "#2", label: "Google Ranking", prev: "was page 6" },
                ].map((r, i) => (
                  <div key={i} className="text-center">
                    <p className="text-h3 sm:text-h2 text-[#51B027]">{r.value}</p>
                    <p className="text-sl text-gray-600 mt-0.5">{r.label}</p>
                    {r.prev && <p className="text-sl text-gray-400">{r.prev}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 5  ROI STATS
   ════════════════════════════════════════════════════════════════════════════ */
export function RoiSection() {
  const stats = [
    { target: 30, prefix: "", suffix: " days", label: "From Kickoff to Live Site", icon: Clock },
    { target: 312, prefix: "", suffix: "%", label: "Average Lead Increase", icon: TrendingUp },
    { target: 83, prefix: "", suffix: "%", label: "Avg. Page Load Improvement", icon: Zap },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            What a Great Website Actually <span className="text-[#51B027]">Returns</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={i}>
                <div className="text-center p-8 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-spark-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-5 w-5 text-spark-600" />
                  </div>
                  <p className="text-h2 sm:text-h1 text-[#51B027] mb-2">
                    <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="text-sm-body text-gray-500">{s.label}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 6  COMPARISON TABLE
   ════════════════════════════════════════════════════════════════════════════ */
export function ComparisonSection() {
  const rows = [
    { category: "Page Load Time", broken: "8–12 seconds", optimized: "< 2 seconds" },
    { category: "Google Ranking", broken: "Page 3–6 (invisible)", optimized: "Page 1, position 1–5" },
    { category: "Mobile Experience", broken: "Broken, hard to read", optimized: "Responsive & fast" },
    { category: "Conversion Rate", broken: "< 2% (industry avg)", optimized: "4–8% (optimized)" },
    { category: "SEO Score", broken: "20–40 / 100", optimized: "90–100 / 100" },
    { category: "Content Freshness", broken: "2+ years old, stale", optimized: "Updated monthly" },
    { category: "Security Status", broken: "Vulnerable plugins", optimized: "Monitored & patched" },
    { category: "Lead Attribution", broken: "None guessing", optimized: "Full analytics & CRM sync" },
    { category: "Cost per Lead", broken: "$300–500+", optimized: "$40–120" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Broken Website vs. <span className="text-[#51B027]">Optimized Website</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 text-left border-b border-gray-200">
              <div className="py-4 px-4 bg-gray-50"><p className="text-sm-body font-bold text-gray-900">Category</p></div>
              <div className="py-4 px-4 bg-red-50"><p className="text-sm font-bold text-red-700 flex items-left justify-left gap-1.5"><XCircle className="h-4 w-4" />Broken Website</p></div>
              <div className="py-4 px-4 bg-spark-50"><p className="text-sm-body font-bold text-[#51B027] flex items-left justify-left gap-1.5"><CheckCircle className="h-4 w-4" />Optimized Website</p></div>
            </div>
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-gray-100 last:border-0">
                <div className="py-3.5 px-4 text-sm-body font-medium text-gray-900">{row.category}</div>
                <div className="py-3.5 px-4 text-sm text-red-600 text-left bg-red-50/30">{row.broken}</div>
                <div className="py-3.5 px-4 text-sm-body text-[#51B027] font-medium text-left bg-spark-50/30">{row.optimized}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 7  HOW IT WORKS
   ════════════════════════════════════════════════════════════════════════════ */
export function HowItWorksSection() {
  const steps = [
    { icon: Search, title: "Discovery & Audit (Days 1–5)", desc: "Full website audit covering SEO, performance, security, and conversion gaps plus a strategy brief aligned to your goals and audience." },
    { icon: Brush, title: "Design & Build (Days 6–21)", desc: "Wireframing, copy, design, and development pages built for conversion, SEO-optimized from the ground up, and integrated with your CRM." },
    { icon: Code2, title: "Launch & Optimize (Days 22–30)", desc: "QA testing, performance tuning, technical SEO, CRO setup, analytics configuration, and go-live. Your site ships fast and converts from day one." },
    { icon: Shield, title: "Maintain & Grow (Month 2+)", desc: "Monthly content updates, plugin maintenance, security monitoring, performance reviews, and ongoing CRO improvements your site never stagnates." },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            From Audit to Live Site in <span className="text-[#51B027]">30 Days</span>
          </h2>
          <p className="text-body text-gray-500 max-w-xl mx-auto">A four-phase process that launches your optimized website fast then keeps it working harder every month.</p>
        </AnimatedSection>

        <div className="hidden lg:flex items-start justify-between gap-0 items-stretch">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={i}>
                <div className="flex-1 min-w-0">
                  <div className="p-5 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow duration-300 group h-full">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-full bg-spark-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                      <div className="w-8 h-8 rounded-lg bg-spark-50 flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-spark-600" /></div>
                    </div>
                    <h3 className="text-body font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sl text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex items-center px-1 pt-8">
                    <ArrowRight className="h-5 w-5 text-spark-300 shrink-0" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={i}>
                <AnimatedSection direction="up" delay={i * 0.08}>
                  <div className="p-5 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow duration-300 group">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-full bg-spark-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                      <div className="w-8 h-8 rounded-lg bg-spark-50 flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-spark-600" /></div>
                    </div>
                    <h3 className="text-body font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sl text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimatedSection>
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowRight className="h-5 w-5 text-spark-300 rotate-90" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 8  TESTIMONIALS
   ════════════════════════════════════════════════════════════════════════════ */
interface WebsiteOptTestimonial {
  quote: string;
  name: string;
  image: string;
  title: string;
  genericTitle?: string;
  firm: string;
  genericFirm?: string;
  metric: string;
  industries?: string[];
  matchesIndustries?: string[];
}

const websiteOptTestimonials: WebsiteOptTestimonial[] = [
  {
    quote: "We'd been 'meaning to update the website' for three years. Within 30 days we had a completely new site and within 90 days we had more inbound leads than the entire previous year combined. It's not just a website, it's our best salesperson.",
    name: "Marcus Chen",
    image: "/images/client/joseph-p-meyer.webp",
    title: "Managing Partner",
    firm: "Consulting Firm, B2B Strategy",
    genericFirm: "B2B Company",
    metric: "4x inbound leads in 90 days",
    // Quote text is industry-neutral — only the firm label needs swapping.
    matchesIndustries: ["consulting"],
  },
  {
    quote: "We were on page 7 for 'commercial real estate attorney [city]' the term our clients actually search. Eight weeks later we're position 3 on page 1. The ROI on the SEO work alone paid for a year of service.",
    name: "Diana Weller",
    image: "/images/client/kim-hubbs.webp",
    title: "Partner",
    firm: "Commercial Real Estate Law Firm",
    metric: "Page 7 → Position 3 in 8 weeks",
    // Quote text names the exact search term — genuinely only true here.
    industries: ["commercial-real-estate", "legal"],
  },
  {
    quote: "Our contact form had been broken for 14 months. Get Levrg fixed that on day one, rebuilt our service pages, and we doubled our consultation requests within 60 days. Embarrassing it took us that long to fix it.",
    name: "Sandra Park",
    image: "/images/client/leslie-heller.webp",
    title: "CPA, Managing Director",
    genericTitle: "Managing Director",
    firm: "Regional Accounting Firm",
    genericFirm: "Professional Services Firm",
    metric: "2x consultation requests in 60 days",
    matchesIndustries: ["accounting"],
  },
  {
    quote: "We're a financial advisory firm trust is everything. The new site with updated security, fast load times, and clear credibility signals made a visible difference. Prospects comment on our website in sales calls now. That never happened before.",
    name: "Robert Flanagan",
    image: "/images/client/madalina-zaharia.webp",
    title: "Chief Growth Officer",
    firm: "Independent Financial Advisory, RIA",
    metric: "Website cited in 60% of sales calls",
    industries: ["financial-advisory"],
  },
  {
    quote: "We rebuilt on Webflow, integrated HubSpot, launched a blog, and went from zero organic traffic to 4,200 monthly visits in 5 months. Lead quality improved because the right people are finding us now.",
    name: "Tony Reyes",
    image: "/images/client/paul-de-la-garza.webp",
    title: "CEO",
    firm: "Managed IT Services Provider",
    genericFirm: "B2B Company",
    metric: "0 → 4,200 organic visits in 5 months",
    matchesIndustries: ["it-services"],
  },
];

// Variant pages pass their own `industry` slug. Two of these quotes name
// their industry directly in the text (the exact search term, "we're a
// financial advisory firm") and only show on a genuine match; the other
// three are industry-neutral text with just a firm/title label swapped when
// it doesn't match. The flagship page (no industry passed) shows all five
// with real labels.
export function TestimonialsSection({ industry }: { industry?: string } = {}) {
  const testimonials = (industry
    ? websiteOptTestimonials.filter((t) => !t.industries || t.industries.includes(industry))
    : websiteOptTestimonials
  ).map((t) => {
    if (!industry || !t.matchesIndustries || t.matchesIndustries.includes(industry)) return t;
    return { ...t, firm: t.genericFirm ?? t.firm, title: t.genericTitle ?? t.title };
  });

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, TESTIMONIAL_CAROUSEL_ROTATE_MS);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const goNext = () => { setDirection(1); setCurrent((prev) => (prev + 1) % testimonials.length); };
  const goPrev = () => { setDirection(-1); setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length); };
  const t = testimonials[current];
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Websites That Went From <span className="text-[#51B027]">Invisible to Unstoppable</span>
          </h2>
        </AnimatedSection>

        <div className="relative">
          <button onClick={goPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-spark-50 hover:border-spark-200 transition-colors" aria-label="Previous testimonial">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button onClick={goNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-spark-50 hover:border-spark-200 transition-colors" aria-label="Next testimonial">
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={current} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }} className="p-8 sm:p-10 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <Quote className="h-10 w-10 text-spark-300 mb-5" />
                <p className="text-sub sm:text-h3 text-gray-700 italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                {t.metric && (
                  <div className="flex flex-wrap items-center gap-4 mb-5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-spark-50 border border-spark-200">
                      <TrendingUp className="h-3.5 w-3.5 text-spark-600" />
                      <span className="text-sl font-semibold text-spark-700">{t.metric}</span>
                    </div>
                  </div>
                )}
                <div className="pt-5 border-t border-gray-100">
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
                      <p className="text-sl text-gray-500">{t.title} &middot; {t.firm}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className="p-2.5 flex items-center justify-center"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-spark-500" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
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
   SECTION 9  WHY CHOOSE US
   ════════════════════════════════════════════════════════════════════════════ */
export function WhyChooseUsSection() {
  const items = [
    { icon: Layers, title: "Full-Stack Web Team", desc: "Designer, developer, SEO strategist, and content writer all under one retainer. No juggling contractors. One team, one point of contact, full ownership." },
    { icon: Zap, title: "30-Day Launch Guarantee", desc: "No 6-month timelines. No endless revision cycles. We go from kickoff to live site in 30 days with a process built for speed without cutting corners on quality." },
    { icon: Target, title: "Revenue-First, Not Design-First", desc: "Beautiful doesn't mean converting. Every layout, CTA, and content block is built to move your buyer toward action. We measure success in leads, not Dribbble likes." },
    { icon: DollarSign, title: "Ongoing Partner, Not One-Off Build", desc: "Most agencies build and disappear. We stay. Monthly content, plugin maintenance, security monitoring, and CRO improvements your site never stagnates." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Not Just a Web Agency. Your <span className="text-[#51B027]">Dedicated Web Department.</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-14">
          <p className="text-body text-gray-600 max-w-4xl mx-auto leading-relaxed">
            This isn&apos;t a side service. It&apos;s our only focus for each client we take on strategy, design, development, SEO, and ongoing growth all under one roof.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="h-full p-6 rounded-xl border border-gray-100 bg-white">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-spark-50 text-spark-600 mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sub font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm-body text-gray-600">{item.desc}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 10  FAQ
   ════════════════════════════════════════════════════════════════════════════ */
export function FAQSection() {
  const faqs = [
    { q: "What's included in the 14 deliverables?", a: "Website wireframing & page layout design, page creation & landing pages, website content creation & updates, blog creation & optimization, on-page SEO / AEO / GEO optimization, technical SEO, CRO setup & optimization, CRM/CMS integrations, dynamic personalization, plugin & theme updates, security monitoring & maintenance, hosting & performance management, backup & version control, and custom development & integrations. All included in your monthly retainer." },
    { q: "How long does a full website build take?", a: "We go from kickoff to live site in 30 days for most projects. Day 1–5 is discovery and audit, days 6–21 is design and build on a staging environment, and days 22–30 is QA, optimization, and launch. Complex custom builds may take slightly longer, but we set timelines in writing before we start." },
    { q: "Do you work with our existing website or rebuild from scratch?", a: "Both. We can optimize and improve what you have cleaning up code, fixing performance issues, improving SEO structure, and refreshing design or we can rebuild completely from scratch on a modern platform. We'll recommend the best approach after your audit." },
    { q: "How is this different from hiring a web agency?", a: "Traditional agencies build your site and move on. We're an ongoing partner monthly content updates, plugin maintenance, security monitoring, performance reviews, and CRO improvements are all included. You get a dedicated web team at a fraction of the cost of in-house staff or a traditional agency retainer." },
    { q: "What platforms do you build on?", a: "We work primarily with Webflow, WordPress, HubSpot CMS, Wix, and GoHighLevel. We recommend the platform that best fits your goals, technical requirements, and CRM integration needs. We don't push one platform for everyone." },
    { q: "How do you handle SEO and ongoing content?", a: "SEO is built into every page from the start not added after. On-page SEO, technical SEO, schema markup, AEO (AI engine optimization), and GEO (geo-targeted content) are all part of the build. Ongoing, we publish monthly blog posts and update service pages to maintain and improve rankings." },
    { q: "What happens after the site launches?", a: "Ongoing maintenance is included from month 2 onward monthly plugin and theme updates, security monitoring, daily automated backups, performance checks, content updates, and quarterly CRO reviews. Your site never becomes the stale, broken thing it was before." },
    { q: "Can we cancel the ongoing maintenance anytime?", a: "Yes. No long-term contracts. We earn your business every month. Most clients stay because consistent optimization keeps improving results, but you're never locked in. Month-to-month, with 30 days notice to cancel." },
  ];

  const col1 = faqs.slice(0, 4);
  const col2 = faqs.slice(4, 8);

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <FaqSchema faqs={faqs} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Frequently Asked <span className="text-[#51B027]">Questions</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection direction="left">
            <div className="rounded-xl border border-gray-100 bg-white p-6 sm:p-8">
              <Accordion type="single" collapsible className="w-full">
                {col1.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-body font-semibold text-gray-900 hover:text-spark-600 hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-body text-gray-600 leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="rounded-xl border border-gray-100 bg-white p-6 sm:p-8">
              <Accordion type="single" collapsible className="w-full">
                {col2.map((faq, i) => (
                  <AccordionItem key={i + 4} value={`item-${i + 4}`}>
                    <AccordionTrigger className="text-left text-body font-semibold text-gray-900 hover:text-spark-600 hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-body text-gray-600 leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTION 11  FINAL CTA
   ════════════════════════════════════════════════════════════════════════════ */
export function FinalCTASection() {
  return (
    <section className="py-16 sm:py-24 bg-spark-800">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 sm:text-h1 text-white mb-4">
              Ready to Turn Your Website Into a <span><br />Lead-Generating Machine?</span>
            </h2>
            <p className="text-body text-spark-200 leading-relaxed mb-8 max-w-xl mx-auto">
              Stop leaving leads on the table. Get a free website audit and see exactly what&apos;s holding your site back and how fast we can fix it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="ghost" size="lg" className="bg-white text-spark-800 hover:bg-spark-50 hover:text-spark-800 px-8 py-6 text-base font-semibold rounded-xl shadow-lg transition-all" onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}>
                Get My Free Website Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="ghost" size="lg" className="bg-void hover:bg-surface-dark text-white hover:text-white px-8 py-6 text-base font-semibold rounded-xl border-0 transition-all" onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}>
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Strategy Call
              </Button>
            </div>
            <p className="mt-6 text-sm-body text-spark-300">No contracts. No spam. Cancel anytime.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ════════════════════════════════════════════════════════════════════════════ */
export function WebsiteOptimizationPage() {
  return (
    <PageShell
      navItems={[
        { label: "Problems", href: "#problems" },
        { label: "Solution", href: "#solution" },
        { label: "Results", href: "#results" },
        { label: "Process", href: "#process" },
      ]}
      ctaText="Get Free Audit"
      ctaTarget="#lead-form"
      meta={{
        title: "Website Development & Optimization | Get Levrg",
        description: "Full-service website development, SEO, and CRO for B2B companies. Build, optimize, and maintain your web presence with 14 deliverables launch in 30 days.",
        keywords: "website optimization, website development, SEO optimization, CRO, landing page design, technical SEO, website maintenance, B2B website, web presence",
        ogTitle: "Website Development & Optimization | Get Levrg",
        ogDescription: "Turn your website into a lead-generating machine. Full build, SEO, CRO, and ongoing maintenance all under one monthly retainer. Launch in 30 days.",
        ogImage: "/images/hero/website-optimization-hero.webp",
      }}
    >
      <HeroSection />
      <TrustedByMarquee />
      <ProblemSection />
      <SolutionSection />
      <DeliverablesSection />
      <ToolsWeUseSection />
      <AuditFindingsSection />
      <WorkSampleBentoGrid />
      <RoiSection />
      <ComparisonSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </PageShell>
  );
}
