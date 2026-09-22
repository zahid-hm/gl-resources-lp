"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLeadForm } from "@/hooks/useLeadForm";
import { PhoneField } from "@/components/shared/PhoneField";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Clock,
  TrendingUp,
  Shield,
  Users,
  CheckCircle,
  X,
  Trophy,
  MessageCircle,
  UserCheck,
  Rocket,
  Star,
  DollarSign,
  CalendarDays,
  Quote,
  Phone,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertTriangle,
  RotateCcw,
  Layers,
  Globe,
  Send,
  Database,
  Share2,
  BarChart3,
  Activity,
  Briefcase,
  Target,
  Building2,
  LineChart,
  PenSquare,
  FlameIcon,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem, CountUp } from "@/components/shared/AnimatedSection";
import { TrustedByMarquee } from "@/components/shared/TrustedByMarquee";
import { FaqSchema } from "@/components/shared/FaqSchema";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ServiceCapabilities } from "@/components/shared/ServiceCapabilities";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ════════════════════════════════════════════════════════════════════════════
   INLINE: Hero Intro Animation (FMT Execution Team Dashboard)
   ════════════════════════════════════════════════════════════════════════════ */

const INTRO_DURATION = 6000;

function FmtAnimation() {
  const workstreams = [
    { icon: Share2, label: "Content & Social", status: "Active", tasks: "12 posts queued", accent: "bg-sky-50 border-sky-200", iconColor: "text-sky-500", statusColor: "text-sky-600" },
    { icon: Send, label: "GTM Outbound", status: "Active", tasks: "340 sequences live", accent: "bg-spark-50 border-spark-200", iconColor: "text-spark-600", statusColor: "text-[#51B027]" },
    { icon: Database, label: "CRM & RevOps", status: "Active", tasks: "87% pipeline clean", accent: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-500", statusColor: "text-emerald-700" },
    { icon: Globe, label: "Web & CRO", status: "Active", tasks: "3 pages live", accent: "bg-amber-50 border-amber-200", iconColor: "text-amber-500", statusColor: "text-amber-700" },
  ];

  const metrics = [
    { label: "Team Size", value: "6 specialists", delay: 0.4 },
    { label: "Deploy Time", value: "7 days", delay: 0.6 },
    { label: "Cost Savings", value: "~65%", delay: 0.8 },
    { label: "Weekly Output", value: "40+ tasks", delay: 1.0 },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <div className="absolute inset-0 opacity-[0.03] bg-dot-pattern" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative flex items-center gap-2 mb-5"
      >
        <div className="w-7 h-7 rounded-lg bg-spark-100 flex items-center justify-center">
          <Users className="h-3.5 w-3.5 text-spark-600" />
        </div>
        <span className="text-sm font-semibold text-gray-900 tracking-wide">Execution Team Dashboard</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-spark-500 animate-pulse" />
          <span className="text-[11px] text-spark-600 font-medium">Live</span>
        </div>
      </motion.div>

      <div className="space-y-2.5 mb-4">
        {workstreams.map((ws, i) => {
          const Icon = ws.icon;
          return (
            <motion.div
              key={ws.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.25 }}
              className={`flex items-center gap-3 p-2.5 rounded-xl border ${ws.accent}`}
            >
              <div className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0">
                <Icon className={`h-3.5 w-3.5 ${ws.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-gray-800 leading-none mb-0.5">{ws.label}</p>
                <p className="text-[10px] text-gray-500 leading-none">{ws.tasks}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-spark-500" />
                <span className={`text-[10px] font-semibold ${ws.statusColor}`}>{ws.status}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 2.5, delay: 1.2, repeat: 1, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-spark-400 to-transparent"
        style={{ top: "50%" }}
      />

      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: m.delay + 1.2, type: "spring", stiffness: 200 }}
            className="p-2.5 rounded-xl bg-gray-50 border border-gray-100"
          >
            <p className="text-sm font-bold text-gray-900 leading-none mb-0.5">{m.value}</p>
            <p className="text-[10px] text-gray-500">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HeroFormIntro({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [introKey, setIntroKey] = useState(0);

  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => { setShowIntro(false); }, INTRO_DURATION);
    return () => clearTimeout(timer);
  }, [showIntro, introKey]);

  const replayIntro = useCallback(() => {
    setShowIntro(true);
    setIntroKey((k) => k + 1);
  }, []);

  return (
    <div className="lg:col-span-2">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key={`intro-${introKey}`}
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative min-h-[480px] sm:min-h-[520px]"
          >
            <FmtAnimation />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {children}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              onClick={replayIntro}
              className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-white border border-spark-300 flex items-center justify-center hover:bg-spark-600 hover:border-spark-500 transition-all duration-300 group shadow-md"
              title="Replay intro animation"
              aria-label="Replay intro animation"
            >
              <RotateCcw className="h-3.5 w-3.5 text-spark-600 group-hover:text-white transition-colors" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
    <section id="lead-form" className="relative overflow-hidden bg-white min-h-[500px] sm:min-h-[680px]">
      <div className="absolute inset-0">
        <img src="/images/hero/fmt-hero.webp" alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#061512]/95 via-[#061512]/70 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8"
            >
              <Zap className="h-3.5 w-3.5 text-spark-300" />
              <span className="text-sm-body font-medium text-white">
                Fractional Marketing &amp; Sales Execution Team
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-h1 sm:text-display lg:text-display-sm text-white mb-6"
            >
              Stop Paying Senior Talent
              <br />
              <span className="text-[#51B027]">To Do Execution Work</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body sm:text-sub text-gray-300 max-w-2xl mb-8"
            >
              A fully managed execution team handling content, campaigns, CRM, outbound, video, and operations so your internal team focuses on growth, leadership, and revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10"
            >
              {[
                { icon: Zap, text: "Deploy in 7 Days" },
                { icon: CalendarDays, text: "Predictable Weekly Output" },
                { icon: TrendingUp, text: "40–70% Cost Savings" },
              ].map((m, i) => {
                const Icon = m.icon;
                return (
                  <span key={i} className="inline-flex items-center gap-2 text-sm-body font-medium text-gray-200 bg-white/10 border border-white/20 px-3.5 py-2 rounded-lg">
                    <Icon className="h-4 w-4 text-spark-400" />
                    {m.text}
                  </span>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative p-5 sm:p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm max-w-2xl"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-spark-500 fill-spark-500" />
                ))}
                <span className="ml-2 text-caption text-spark-300"></span>
              </div>
              <p className="text-sm-body sm:text-body text-gray-200 italic mb-3">
                &ldquo;We got our Sundays back. Get Levrg took everything off our plate LinkedIn, content, CRM so our team could focus entirely on closing. We doubled output and{" "}
                <span className="text-spark-400 font-semibold not-italic">cut our operational cost by 60%</span>.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/images/client/thomas-buchanan.webp"
                  alt="Thomas Buchanan"
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm-body font-semibold text-white">Thomas Buchanan</p>
                  <p className="text-xs text-gray-400">CRO | Sales Tempo</p>
                </div>
              </div>
            </motion.div>
          </div>

          <HeroFormIntro>
            <div className="rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h2 className="text-sub font-bold text-gray-900 mb-1.5">Let&apos;s Start Today</h2>
              </div>
              <form id="fmt-hero-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="fmt-firstName" className="text-sm-body text-gray-700 mb-1.5">First Name</Label>
                    <Input id="fmt-firstName" placeholder="" className="h-10" {...register("firstname")} />
                    {errors.firstname && <p className="text-sm-body text-error mt-1">{errors.firstname.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="fmt-lastName" className="text-sm-body text-gray-700 mb-1.5">Last Name</Label>
                    <Input id="fmt-lastName" placeholder="" className="h-10" {...register("lastname")} />
                    {errors.lastname && <p className="text-sm-body text-error mt-1">{errors.lastname.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="fmt-workEmail" className="text-sm-body text-gray-700 mb-1.5">Email</Label>
                  <Input id="fmt-workEmail" type="email" placeholder="" className="h-10" {...register("email")} />
                  {errors.email && <p className="text-sm-body text-error mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="fmt-phoneNumber" className="text-sm-body text-gray-700 mb-1.5">Phone Number</Label>
                  <PhoneField id="fmt-phoneNumber" control={control} />
                  {errors.phone && <p className="text-sm-body text-error mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="fmt-company" className="text-sm-body text-gray-700 mb-1.5">Company</Label>
                  <Input id="fmt-company" placeholder="" className="h-10" {...register("company")} />
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
   2. STATS BENTO SECTION Asymmetric impact grid
   ════════════════════════════════════════════════════════════════════════════ */

function StatsBentoSection() {
  const barData = [40, 55, 65, 72, 80, 88, 95];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            The Numbers Behind{" "}
            <span className="text-[#51B027]">Every Partnership</span>
          </h2>
          <p className="text-body text-gray-500 max-w-xl mx-auto mt-3">
            Real outcomes across 72+ partnerships from day one to long-term scale.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          {/* Bento grid 12-col base */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-auto">

            {/* Tile A Large: Companies served */}
            <div className="lg:col-span-4 sm:col-span-1 rounded-2xl bg-[#061512] p-7 flex flex-col justify-between min-h-[220px] group">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-spark-600/30 flex items-center justify-center">
                  <Users className="h-4 w-4 text-spark-400" />
                </div>
                <span className="text-caption text-spark-400 uppercase tracking-widest">Companies Served</span>
              </div>
              <div>
                <p className="text-[64px] font-black text-white leading-none mb-2">
                  <CountUp target={72} className="tabular-nums" /><span className="text-spark-400">+</span>
                </p>
                <p className="text-sm-body text-gray-400">B2B SaaS, agencies, professional services, and enterprise teams all running on Get Levrg.</p>
              </div>
            </div>

            {/* Tile B Large: Annual savings */}
            <div className="lg:col-span-5 sm:col-span-1 rounded-2xl bg-spark-600 p-7 flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <span className="text-caption text-spark-100 uppercase tracking-widest">Avg. Annual Savings</span>
              </div>
              <div>
                <p className="text-[56px] font-black text-white leading-none mb-1">
                  $<CountUp target={129} className="tabular-nums" /><span className="text-spark-200">K</span>
                </p>
                <p className="text-sm-body text-spark-100">Per partner vs. equivalent in-house hiring costs. The math always wins.</p>
              </div>
              {/* Mini bar chart */}
              <div className="flex items-end gap-1 mt-4 h-10">
                {barData.map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-white/30" style={{ height: `${h}%` }} />
                ))}
                <div className="flex-1 rounded-sm bg-white" style={{ height: "100%" }} />
              </div>
            </div>

            {/* Tile C Small: Deploy time */}
            <div className="lg:col-span-3 sm:col-span-2 rounded-2xl bg-gray-50 border border-gray-200 p-7 flex flex-col justify-between min-h-[220px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-spark-50 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-spark-600" />
                </div>
                <span className="text-caption text-gray-500 uppercase tracking-widest">Deploy Time</span>
              </div>
              <div>
                <p className="text-[56px] font-black text-gray-900 leading-none mb-1">
                  <CountUp target={7} className="tabular-nums" /><span className="text-spark-600 text-[36px]"> days</span>
                </p>
                <p className="text-sm-body text-gray-500">From first call to first deliverables no ramp-up, no delays.</p>
              </div>
            </div>

            {/* Tile D Wide: The Math tile */}
            <div className="lg:col-span-7 sm:col-span-2 rounded-2xl border-2 border-spark-200 bg-spark-50 p-7 flex flex-col justify-between min-h-[200px]">
              <p className="text-caption text-spark-600 uppercase tracking-widest mb-4">The Levrg Equation</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="text-center">
                  <p className="text-[28px] sm:text-[36px] font-black text-red-500 leading-none">
                    $<CountUp target={13760} className="tabular-nums" />
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">1 hire / month</p>
                </div>
                <div className="text-h2 font-black text-gray-300">−</div>
                <div className="text-center">
                  <p className="text-[28px] sm:text-[36px] font-black text-[#51B027] leading-none">
                    $<CountUp target={2997} className="tabular-nums" />
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">Full team / month</p>
                </div>
                <div className="text-h2 font-black text-gray-300">=</div>
                <div className="text-center">
                  <p className="text-[28px] sm:text-[36px] font-black text-[#51B027] leading-none">
                    $<CountUp target={10763} className="tabular-nums" />
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">saved / month</p>
                </div>
                <div className="ml-auto hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-spark-600 text-white text-sm font-bold">
                  <TrendingUp className="h-4 w-4" />
                  ~$129K/yr
                </div>
              </div>
              <p className="text-sm-body text-gray-500 mt-4">Based on the 1.72× fully-burdened cost multiplier for a US mid-level marketer at $96K/yr base.</p>
            </div>

            {/* Tile E Small: Output multiplier */}
            <div className="lg:col-span-2 sm:col-span-1 rounded-2xl bg-[#061512] p-6 flex flex-col justify-between min-h-[200px]">
              <div className="w-8 h-8 rounded-lg bg-spark-600/30 flex items-center justify-center mb-4">
                <TrendingUp className="h-4 w-4 text-spark-400" />
              </div>
              <div>
                <p className="text-[52px] font-black text-white leading-none">
                  <CountUp target={3} className="tabular-nums" /><span className="text-spark-400">×</span>
                </p>
                <p className="text-[11px] text-gray-400 mt-1">More execution output</p>
              </div>
            </div>

            {/* Tile F Small: Deliverables */}
            <div className="lg:col-span-3 sm:col-span-1 rounded-2xl bg-white border border-gray-200 p-6 flex flex-col justify-between min-h-[200px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                </div>
                <span className="text-caption text-gray-400 uppercase tracking-widest">Deliverables</span>
              </div>
              <div>
                <p className="text-[52px] font-black text-gray-900 leading-none">
                  <CountUp target={82} className="tabular-nums" /><span className="text-emerald-500">+</span>
                </p>
                <p className="text-sm-body text-gray-500 mt-1">Across 6 service categories all available in one plan.</p>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   3. PROBLEM SECTION Three Resource Constraints
   ════════════════════════════════════════════════════════════════════════════ */

function ProblemSection() {
  const constraints = [
    {
      icon: Clock,
      title: "The Time Trap",
      headline: "Your Best People Are Doing $5/hr Work",
      body: "There are only so many hours in a day. Your top talent the ones who should be driving strategy spend the majority of their time on repetitive, low-value execution tasks.",
      painPoint: "Every hour your leader spends on execution is an hour not spent on $500/hr value creation.",
      stat: "67% of leaders say time is their #1 growth constraint.",
    },
    {
      icon: DollarSign,
      title: "The Money Problem",
      headline: "Hiring Locally Is Breaking Your Unit Economics",
      body: "A single mid-level marketer in the US costs $80–120K fully loaded with benefits, taxes, and overhead. The same caliber talent on a fractional model costs a fraction of that with multiples in ROI.",
      painPoint: "You're getting one skill set when you need six. You're paying full price for partial output.",
      stat: "3–5× cost advantage with a properly structured fractional execution model.",
    },
    {
      icon: Activity,
      title: "The Energy Drain",
      headline: "Your Team Is Burning Out Wearing Too Many Hats",
      body: "When your team is stretched thin, quality drops, morale suffers, and your best people start looking elsewhere. Burnout isn't just a wellness issue it's a revenue issue.",
      painPoint: "Burned-out teams don't grow companies. They maintain them badly.",
      stat: "72% of marketing and sales leaders report burnout from wearing too many hats.",
    },
  ];

  return (
    <section id="problems" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900 max-w-3xl mx-auto">
            Growth Slows When{" "}
            <span className="text-[#51B027]"><br />Leaders Become Operators</span>
          </h2>
          <p className="text-body text-gray-500 max-w-2xl mx-auto mt-4">
            Your company doesn&apos;t have an idea problem. It has an execution bottleneck. Three resource constraints are holding you back.
          </p>
        </AnimatedSection>

        <StaggerContainer className="space-y-6" staggerDelay={0.1}>
          {constraints.map((item, i) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={i}>
                <div className="relative p-6 sm:p-8 rounded-xl bg-white border border-gray-100 border-l-4 border-l-red-400 hover:shadow-lg transition-shadow duration-300 group">
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-500 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-caption text-gray-400 mb-1">{item.title}</p>
                      <h3 className="text-sub font-bold text-gray-900 mb-3">{item.headline}</h3>
                      <p className="text-gray-600 mb-4 text-sm-body sm:text-body">{item.body}</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="inline-flex items-start gap-2 px-4 py-3 rounded-lg bg-red-50/50 border border-red-100 text-red-700 text-sm-body flex-1">
                          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                          <span className="font-medium">{item.painPoint}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-600 text-sm-body shrink-0">
                          <BarChart3 className="h-4 w-4 text-spark-500 shrink-0" />
                          <span className="font-medium">{item.stat}</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
   4. WHO WE SERVE ICP Section
   ════════════════════════════════════════════════════════════════════════════ */

function WhoWeServeSection() {
  const profiles = [
    {
      icon: Briefcase,
      role: "Founders & CEOs",
      tag: "Executive",
      problem: "Need execution without building a massive internal team.",
      details: "You're a visionary spending most of your day fighting operational fires. Every hour on admin is an hour stolen from building the business.",
      image: "/images/fmt/executive.webp",
      overlayColor: "from-[#061512]/80 via-[#061512]/40",
    },
    {
      icon: Target,
      role: "Marketing Leaders",
      tag: "Marketing",
      problem: "Need more output without increasing payroll.",
      details: "You have brilliant campaign ideas but only execute a fraction. You need more hands to create content, manage channels, and scale your marketing engine.",
      image: "/images/fmt/marketing.webp",
      overlayColor: "from-spark-900/80 via-spark-700/40",
    },
    {
      icon: LineChart,
      role: "Sales Teams",
      tag: "Revenue",
      problem: "Need operational support to keep pipeline moving.",
      details: "You should be closing deals, not qualifying leads, updating CRM, and chasing inbound inquiries. You need an execution layer so you can focus on revenue.",
      image: "/images/fmt/revenue.webp",
      overlayColor: "from-amber-900/80 via-amber-700/40",
    },
    {
      icon: Building2,
      role: "Agencies",
      tag: "White-Label",
      problem: "Need backend fulfillment and scalable production capacity.",
      details: "Your clients demand more, but hiring full-time headcount for every service line kills your margins. A white-label execution team solves that permanently.",
      image: "/images/fmt/white-label.webp",
      overlayColor: "from-violet-900/80 via-violet-700/40",
    },
    {
      icon: Rocket,
      role: "B2B SaaS Companies",
      tag: "GTM",
      problem: "Need coordinated GTM execution across channels.",
      details: "Growth requires more than a great product. Outbound, content, CRM, and campaigns all need dedicated execution without doubling your headcount.",
      image: "/images/fmt/gtm.webp",
      overlayColor: "from-sky-900/80 via-sky-700/40",
    },
    {
      icon: TrendingUp,
      role: "Growth Teams",
      tag: "Scale",
      problem: "Need predictable weekly momentum.",
      details: "Inconsistent output kills compounding. You need a team that shows up every week, hits deliverables, and keeps your pipeline and content engine moving.",
      image: "/images/fmt/scale.webp",
      overlayColor: "from-emerald-900/80 via-emerald-700/40",
    },
  ];

  return (
    <section id="who-we-serve" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Built for Teams That Need{" "}
            <span className="text-[#51B027]"><br />More Execution Capacity</span>
          </h2>
          <p className="text-body text-gray-500 max-w-2xl mx-auto mt-4">
            Three profiles, one common problem: resource constraints holding back growth. Which one are you?
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
          {profiles.map((p, i) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={i}>
                <div className="h-full rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-100/80 hover:border-spark-200 hover:-translate-y-1 transition-all duration-300 group">
                  {/* Image header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={p.image}
                      srcSet={`${p.image} 662w, ${p.image.replace(".webp", "@2x.webp")} 1324w`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      alt={p.role}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      width={662}
                      height={369}
                    />
                    {/* Dark gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${p.overlayColor} to-transparent`} />
                    {/* Tag top left */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-white/30 text-white">
                        {p.tag}
                      </span>
                    </div>
                    {/* Icon bottom left over image */}
                    <div className="absolute bottom-3 left-4 z-10">
                      <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-sub font-bold text-gray-900 mb-2">{p.role}</h3>
                    <p className="text-sm-body font-semibold text-spark-700 mb-3 leading-snug">{p.problem}</p>
                    <p className="text-sm-body text-gray-600 leading-relaxed">{p.details}</p>
                  </div>
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
   5. BEFORE / AFTER SHIFT SECTION
   ════════════════════════════════════════════════════════════════════════════ */

function BeforeAfterSection() {
  const rows = [
    { label: "Team Structure", before: "1 person wearing 6 hats", after: "Dedicated specialists per function" },
    { label: "Leadership Focus", before: "Buried in execution tasks", after: "Focused on strategy & growth" },
    { label: "Output Consistency", before: "Inconsistent, reactive output", after: "Predictable weekly execution" },
    { label: "Time to Deploy", before: "3–6 month hiring cycle", after: "Full team live in 7 days" },
    { label: "Team Energy", before: "Burnout from too many hats", after: "Focused energy, high morale" },
    { label: "Work Rhythm", before: "Work stalls between meetings", after: "Daily momentum, zero gaps" },
    { label: "Cost Structure", before: "$80–120K per hire, fully loaded", after: "Starting at $2,997/mo all-in" },
    { label: "Scalability", before: "Fixed headcount, hard to scale", after: "Scale up or down in days" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            What Changes When Execution Stops{" "}
            <span className="text-[#51B027]"><br />Being Your Bottleneck</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-6 py-4 bg-gray-50 text-gray-600 font-semibold w-1/3 border-b border-gray-200">Area</th>
                  <th className="text-left px-6 py-4 bg-red-50 text-red-700 font-semibold w-1/3 border-b border-red-200">Before Get Levrg</th>
                  <th className="text-left px-6 py-4 bg-spark-50 text-[#51B027] font-semibold w-1/3 border-b border-spark-200">After Get Levrg</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.label}</td>
                    <td className="px-6 py-4 text-left text-red-600 bg-red-50/30">
                      <div className="flex items-left justify-left gap-2">
                        <X className="h-4 w-4 text-red-400 shrink-0" /><span>{row.before}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-left text-sm-body text-[#51B027] font-medium bg-spark-50/30">
                      <div className="flex items-left justify-left gap-2">
                        <CheckCircle className="h-4 w-4 text-spark-500 shrink-0" /><span>{row.after}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   7. OPERATING SYSTEM SECTION People, Process, Technology
   ════════════════════════════════════════════════════════════════════════════ */

function OperatingSystemSection() {
  const pillars = [
    {
      icon: Users,
      title: "People",
      subtitle: "Expert Talent Trained to Your Standards",
      items: [
        "Strategic lead with US market experience",
        "Project manager as single point of contact",
        "Specialists matched to your tech stack",
        "Execution team trained on your SOPs",
        "Cultural alignment training included",
      ],
    },
    {
      icon: Layers,
      title: "Process",
      subtitle: "Battle-Tested Workflows That Eliminate Guesswork",
      items: [
        "5-stage onboarding methodology",
        "Monday.com project management",
        "SOP-driven execution no guesswork",
        "Weekly async standups + monthly syncs",
        "Quality assurance checkpoints",
      ],
    },
    {
      icon: Zap,
      title: "Technology",
      subtitle: "Modern Tech Stack Integrated With Your Tools",
      items: [
        "HubSpot, Salesforce, Apollo integrations",
        "Canva, Adobe Creative Suite for content",
        "Webflow, WordPress for web management",
        "Slack, Teams for real-time communication",
        "Custom automation via Zapier/Make",
      ],
    },
  ];

  return (
    <section id="operating-system" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            We Don&apos;t Just Provide Talent{" "}
            <span className="text-[#51B027]"><br />We Provide the System</span>
          </h2>
        </AnimatedSection>
        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Most external teams fail because there is no operating system behind the people. Get Levrg combines people, process, and technology into one coordinated execution framework.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={i}>
                <div className="h-full p-6 sm:p-8 rounded-xl bg-white border border-gray-100 border-l-4 border-l-spark-400 hover:shadow-lg transition-shadow duration-300 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-spark-50 text-spark-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sub font-bold text-gray-900 mb-1">{p.title}</h3>
                  <p className="text-sm-body text-spark-700 font-medium mb-4">{p.subtitle}</p>
                  <ul className="space-y-2.5">
                    {p.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm-body text-gray-600">
                        <Check className="h-4 w-4 text-spark-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
   8. HOW IT WORKS 5-Step Process
   ════════════════════════════════════════════════════════════════════════════ */

function HowItWorksSection() {
  const steps = [
    {
      icon: MessageCircle,
      title: "Discovery",
      timeline: "Day 1",
      desc: "Understand your goals, bottlenecks, workflows, and priorities. We align on what success looks like.",
    },
    {
      icon: PenSquare,
      title: "Strategy",
      timeline: "Day 2–3",
      desc: "Build the execution roadmap, define responsibilities, and match specialists to your growth priorities.",
    },
    {
      icon: UserCheck,
      title: "Team Assembly",
      timeline: "Day 3–5",
      desc: "Match specialists to your workflows and tech stack. Each specialist is vetted and briefed before day one.",
    },
    {
      icon: Shield,
      title: "Onboarding",
      timeline: "Day 5–7",
      desc: "Integrate tools, SOPs, communication channels, and approval workflows. Zero-guesswork setup.",
    },
    {
      icon: TrendingUp,
      title: "Execute",
      timeline: "Week 1+",
      desc: "Weekly production cycles begin immediately. Consistent output, clear reporting, full momentum.",
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            From Strategy Call to Execution{" "}
            <span className="text-[#51B027]">in 7 Days</span>
          </h2>
        </AnimatedSection>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:flex items-start justify-between gap-0 items-stretch">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={i}>
                <div className="flex-1 min-w-0">
                  <div className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300 group h-full">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-full bg-spark-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                      <div className="w-8 h-8 rounded-lg bg-spark-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-4 w-4 text-spark-600" />
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-spark-100 text-spark-700 text-[11px] font-semibold">
                        <Clock className="h-2.5 w-2.5" />{step.timeline}
                      </span>
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

        {/* Mobile: vertical stack */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={i}>
                <AnimatedSection direction="up" delay={i * 0.08}>
                  <div className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300 group">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-full bg-spark-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                      <div className="w-8 h-8 rounded-lg bg-spark-50 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-spark-600" />
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-spark-100 text-spark-700 text-[11px] font-semibold">
                        <Clock className="h-2.5 w-2.5" />{step.timeline}
                      </span>
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
   9. ROI / COST COMPARISON SECTION
   ════════════════════════════════════════════════════════════════════════════ */

function RoiSection() {
  return (
    <section id="results" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            The Economics of{" "}
            <span className="text-[#51B027]">Modern Marketing Operations</span>
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto mt-4">
            Numbers don&apos;t lie. Here&apos;s what a properly structured execution team delivers vs. building in-house.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 sm:px-8 py-5 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sub font-bold text-gray-900">Molly the Marketer vs. Get Levrg</h3>
              <p className="text-sm-body text-gray-500 mt-1">The real cost comparison leaders are having with their finance teams right now.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <X className="h-5 w-5 text-red-500" />
                  </div>
                  <h4 className="text-sub font-bold text-red-700">1 Person, Stretched Thin</h4>
                </div>
                <div className="space-y-3 mb-5">
                  {["Base salary: $8,000/mo", "× 1.72 fully-burdened multiplier", "= $13,760/mo total cost", "Benefits, vacation pay, stock options", "Hardware, software, office space", "Insurance and overhead"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm-body text-gray-600">
                      <X className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />{item}
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-center">
                  <p className="text-h3 font-bold text-red-700">$13,760/mo</p>
                  <p className="text-sm-body text-red-600">One person. One skill set.</p>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-spark-50 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-spark-600" />
                  </div>
                  <h4 className="text-sub font-bold text-[#51B027]">1 Team. All Capabilities.</h4>
                </div>
                <div className="space-y-3 mb-5">
                  {["Starting at $2,997/mo, all-in", "Full team across 6 service categories", "Tools, software & infrastructure included", "No benefits, no overhead, no office space", "Dedicated PM as single point of contact", "Scale up or down anytime"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm-body text-gray-600">
                      <Check className="h-3.5 w-3.5 text-spark-500 mt-0.5 shrink-0" />{item}
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-spark-50 border border-spark-200 p-4 text-center">
                  <p className="text-h3 font-bold text-[#51B027]">$2,997/mo</p>
                  <p className="text-sm-body text-spark-700">One team. Every capability.</p>
                </div>
              </div>
            </div>
            <div className="px-6 sm:px-8 py-5 bg-spark-50 border-t border-spark-200 text-center">
              <p className="text-h3 font-bold text-[#51B027]">Get Levrg typically saves you +$100,000 annually</p>
              <p className="text-sm-display text-gray-600 mt-1">$13,760/mo − $2,997/mo = $10,763/mo saved × 12 months = ~$129,000/year</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   10. TESTIMONIALS SECTION
   ════════════════════════════════════════════════════════════════════════════ */

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "We started on Wednesday and they were delivering by Monday. The speed is unlike anything we've experienced with any other vendor or hire. It just works.",
      name: "Thomas Buchanan",
      image: "/images/client/thomas-buchanan.webp",
      title: "CRO",
      company: "Sales Tempo",
      metric: "Full team live in 4 days",
    },
    {
      quote: "Get Levrg is able to get us right in front of our top-tier ICP. The targeting, the content, the outreach it's all coordinated in a way our internal team couldn't pull off alone.",
      name: "Marché Kaanehe",
      image: "/images/client/marche-kaanehe.webp",
      title: "Manager of Product Marketing",
      company: "Cengage Group",
      metric: "Pipeline quality improved significantly",
    },
    {
      quote: "Communication with Get Levrg has been very reliable. They show up every week, hit their deliverables, and flag issues before they become problems. That consistency alone is worth it.",
      name: "Jay Francis",
      image: "/images/client/jay-francis.webp",
      title: "Marketing Coordinator",
      company: "Oxford Medical Simulation Inc.",
      metric: "Zero missed deliverables",
    },
    {
      quote: "We were paying one senior person to do the work of six. With Get Levrg, we have six specialists doing six jobs for less than we were paying that one person. The math is undeniable.",
      name: "Sarah Mitchell",
      image: "/images/client/phil-wittmer.webp",
      title: "VP of Marketing",
      company: "B2B SaaS, $12M ARR",
      metric: "60% cost reduction",
    },
    {
      quote: "I was skeptical at first. Six months in, I can honestly say these are some of the most professional, responsive, and skilled operators I've ever worked with. They feel internal.",
      name: "Derek Okafor",
      image: "/images/client/sean-kelly.webp",
      title: "Founder",
      company: "Growth Stage Agency",
      metric: "6 months, zero turnover",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

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
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            The Difference Is{" "}
            <span className="text-[#51B027]">Felt Fast</span>
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
                <p className="text-sub sm:text-h3 text-gray-700 italic mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex flex-wrap items-center gap-4 mb-5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (<Star key={j} className="h-4 w-4 text-spark-500 fill-spark-500" />))}
                  </div>
                  {t.metric && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-spark-50 border border-spark-200">
                      <TrendingUp className="h-3.5 w-3.5 text-spark-600" />
                      <span className="text-sl font-semibold text-spark-700">{t.metric}</span>
                    </div>
                  )}
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
   11. MID-PAGE FULL-BLEED CTA Interrupt section
   ════════════════════════════════════════════════════════════════════════════ */

function MidPageCTASection() {
  const {
    register,
    control,
    handleSubmit,
    onValid,
    formState: { errors, isSubmitting },
  } = useLeadForm();

  return (
    <section id="mid-cta" className="relative overflow-hidden bg-[#061512] py-20 sm:py-28">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[700px] rounded-full bg-spark-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Bold copy */}
          <AnimatedSection direction="right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-spark-600/20 border border-spark-500/30 mb-6">
              <FlameIcon className="h-3.5 w-3.5 text-spark-400" />
              <span className="text-caption text-spark-300 uppercase tracking-widest">Every Week Counts</span>
            </div>
            <h2 className="text-h1 sm:text-display-sm text-white mb-6 leading-tight">
              Every Week You Wait is a Week Your Competitors{" "}
              <span className="text-spark-400">Execute</span>
            </h2>
            <p className="text-body text-gray-400 mb-8 max-w-lg">
              Consistent execution compounds. A team that ships content, runs outbound, and maintains your CRM every single week builds a lead that is nearly impossible to overcome at month three.
            </p>

            {/* Stat row */}
            <div className="flex flex-wrap gap-6">
              {[
                { value: "7", label: "days to deploy" },
                { value: "24hr", label: "to get your plan" },
                { value: "$0", label: "upfront cost" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-h2 font-black text-spark-400">{s.value}</span>
                  <span className="text-sm-body text-gray-500">{s.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Full form (same structure as hero) */}
          <AnimatedSection direction="left" delay={0.1}>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h2 className="text-sub font-bold text-gray-900 mb-1.5">Let&apos;s Start Today</h2>
              </div>
              <form id="fmt-midcta-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="midcta-firstName" className="text-sm-body text-gray-700 mb-1.5">First Name</Label>
                    <Input id="midcta-firstName" placeholder="" className="h-10" {...register("firstname")} />
                    {errors.firstname && <p className="text-sm-body text-error mt-1">{errors.firstname.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="midcta-lastName" className="text-sm-body text-gray-700 mb-1.5">Last Name</Label>
                    <Input id="midcta-lastName" placeholder="" className="h-10" {...register("lastname")} />
                    {errors.lastname && <p className="text-sm-body text-error mt-1">{errors.lastname.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="midcta-workEmail" className="text-sm-body text-gray-700 mb-1.5">Email</Label>
                  <Input id="midcta-workEmail" type="email" placeholder="" className="h-10" {...register("email")} />
                  {errors.email && <p className="text-sm-body text-error mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="midcta-phoneNumber" className="text-sm-body text-gray-700 mb-1.5">Phone Number</Label>
                  <PhoneField id="midcta-phoneNumber" control={control} />
                  {errors.phone && <p className="text-sm-body text-error mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <Label htmlFor="midcta-company" className="text-sm-body text-gray-700 mb-1.5">Company</Label>
                  <Input id="midcta-company" placeholder="" className="h-10" {...register("company")} />
                  {errors.company && <p className="text-sm-body text-error mt-1">{errors.company.message}</p>}
                </div>
                <Button variant="ghost" type="submit" disabled={isSubmitting} className="w-full bg-spark-600 hover:bg-spark-800 text-white hover:text-white font-semibold h-11 rounded-lg text-base transition-all">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   12. WHY CHOOSE US SECTION
   ════════════════════════════════════════════════════════════════════════════ */

function WhyChooseUsSection() {
  const items = [
    {
      icon: Trophy,
      title: "Proven at Scale",
      desc: "72+ companies across B2B SaaS, agencies, and enterprise firms trust Get Levrg to run their execution. We've delivered millions of tasks with a 98% client retention rate.",
    },
    {
      icon: MessageCircle,
      title: "Feels Like an Internal Team",
      desc: "Your dedicated PM is a Slack message away. Weekly standups, async reporting, and full transparency it doesn't feel like a vendor. It feels like having a team.",
    },
    {
      icon: UserCheck,
      title: "Top 1% Vetted Specialists",
      desc: "Every specialist passes a rigorous portfolio review, skills assessment, and English fluency check. We hire less than 2% of applicants and match talent to your exact tech stack.",
    },
    {
      icon: Rocket,
      title: "Built for Long-Term Momentum",
      desc: "Start with one capability. Scale to a full execution team. Same PM, same workflow, same quality just more capacity as your business grows. No ramp-up needed.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Not Another Agency or Vendor{" "}
            <span className="text-[#51B027]"><br />Your Execution Partner</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.08}>
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={i}>
                <div className="p-6 rounded-xl border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-300 group h-full border-l-4 border-l-spark-400 bg-spark-50/30">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-spark-50 text-spark-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sub font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm-body text-gray-600">{item.desc}</p>
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
   13. FAQ SECTION
   ════════════════════════════════════════════════════════════════════════════ */

function FAQSection() {
  const faqs = [
    {
      q: "How is this different from hiring a freelancer or agency?",
      a: "A freelancer gives you one person with one skill set. A traditional agency adds overhead, account management layers, and retainer fees. Get Levrg gives you a coordinated execution team multiple specialists, a dedicated PM, proven workflows, and direct accountability at a fraction of the cost of either.",
    },
    {
      q: "What does 'fractional' mean in practice?",
      a: "Fractional means you get a full-capability team without the full-time overhead. Instead of hiring six specialists at $80–120K each, you access dedicated specialists across content, CRM, outbound, video, web, and operations all managed under one coordinated execution framework.",
    },
    {
      q: "How fast can the team be deployed?",
      a: "Most teams are fully operational within 7 days. We use the first few days to understand your goals, workflows, and tech stack. From there, your PM sets up the system and the team begins delivering by end of week one.",
    },
    {
      q: "Do we need to have SOPs and processes ready?",
      a: "No. We help you structure your workflows during onboarding. Our team comes with battle-tested SOPs for every service category that we customize to your brand and preferences. You don't need to have everything figured out before we start.",
    },
    {
      q: "What does ongoing engagement look like?",
      a: "Weekly async standups, monthly strategy calls, and a dedicated PM as your single point of contact. You receive weekly output reports, task completion metrics, and proactive flag reports. It operates like an internal team with external efficiency.",
    },
    {
      q: "Can we scale up or down based on our needs?",
      a: "Yes. You can increase capacity for campaign-heavy periods, product launches, or revenue pushes and scale back during slower cycles. No penalties, no long-term contracts. We flex with your business.",
    },
  ];

  const leftFaqs = faqs.slice(0, 3);
  const rightFaqs = faqs.slice(3, 6);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <FaqSchema faqs={faqs} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Frequently Asked <span className="text-[#51B027]">Questions</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {leftFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-left-${i}`}>
                    <AccordionTrigger className="px-6 text-left text-gray-900 font-medium hover:no-underline hover:text-spark-600 transition-colors">{faq.q}</AccordionTrigger>
                    <AccordionContent className="px-6 text-gray-600 leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {rightFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-right-${i}`}>
                    <AccordionTrigger className="px-6 text-left text-gray-900 font-medium hover:no-underline hover:text-spark-600 transition-colors">{faq.q}</AccordionTrigger>
                    <AccordionContent className="px-6 text-gray-600 leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   14. FINAL CTA SECTION
   ════════════════════════════════════════════════════════════════════════════ */

function FinalCTASection() {
  const scrollToHero = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-16 sm:py-24 bg-spark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-h2 sm:text-h1 text-white mb-6">
            Your Internal Team Should Lead Growth {" "}
            <span><br />Not Chase Tasks</span>
          </h2>
          <p className="text-body text-spark-200 max-w-2xl mx-auto mb-10">
            Your business doesn&apos;t need more scattered freelancers or another strategy deck. It needs a reliable execution engine. A team that shows up every week. A system that keeps projects moving. That&apos;s what Get Levrg was built to provide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="ghost"
              onClick={scrollToHero}
              className="bg-white text-spark-800 hover:bg-spark-50 hover:text-spark-800 px-8 py-6 text-base rounded-xl shadow-lg transition-all hover:shadow-xl"
            >
              Build Your Execution Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={scrollToHero}
              className="bg-void hover:bg-surface-dark text-white hover:text-white px-8 py-6 text-base rounded-xl border-0 transition-all"
            >
              <Phone className="mr-2 h-4 w-4" />
              Schedule a Discovery Call
            </Button>
          </div>
          <p className="text-sm-body text-spark-300 mt-6">No contracts. No spam. Cancel anytime. First conversation is free.</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   EXPORT: FmtPage
   ════════════════════════════════════════════════════════════════════════════ */

export default function Page() {
  return (
    <PageShell
      navItems={[
        { label: "Problems", href: "#problems" },
        { label: "Who We Serve", href: "#who-we-serve" },
        { label: "Process", href: "#process" },
        { label: "Results", href: "#results" },
      ]}
      ctaText="Build Your Team"
      ctaTarget="#lead-form"
      meta={{
        title: "Fractional Marketing & Sales Execution Team | Get Levrg",
        description:
          "A fully managed execution team for content, campaigns, CRM, outbound, video, and operations. Deploy in 7 days. 40–70% cost savings vs. hiring in-house.",
        keywords:
          "fractional marketing team, fractional sales team, marketing execution team, outsourced marketing team, marketing operations, fractional CMO team",
        ogTitle: "Fractional Marketing & Sales Execution Team | Get Levrg",
        ogDescription:
          "Stop paying senior talent to do execution work. Get a dedicated team across content, CRM, outbound, and operations live in 7 days.",
        ogImage: "/images/hero/fmt-hero.webp",
      }}
    >
      <HeroSection />
      <TrustedByMarquee />
      <ServiceCapabilities />
      <ProblemSection />
      <WhoWeServeSection />
      <BeforeAfterSection />
      <StatsBentoSection />
      {/* <ServiceEcosystemSection /> */}
      <OperatingSystemSection />
      <HowItWorksSection />
      <RoiSection />
      <TestimonialsSection />
      <MidPageCTASection />
      <WhyChooseUsSection />
      <FAQSection />
      <FinalCTASection />
    </PageShell>
  );
}
