"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLeadForm } from "@/hooks/useLeadForm";
import { PhoneField } from "@/components/shared/PhoneField";
import { INTRO_DURATION, TESTIMONIAL_CAROUSEL_ROTATE_MS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  UserPlus,
  MessageSquare,
  Calendar,
  TrendingUp,
  Target,
  ArrowRight,
  Activity,
  CheckCircle,
  XCircle,
  Check,
  X,
  Clock,
  Phone,
  Shield,
  Quote,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  AlertTriangle,
  AlertOctagon,
  Layers,
  DollarSign,
  Zap,
  BarChart3,
  Users,
  Search,
  Database,
  RefreshCw,
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


// ─── Inline ToolsWeUseSection (LinkedIn & Outbound) ───
export function ToolsWeUseSection() {
  const tools = [
    { src: "/logos/applogos/Sales-Navigator.webp", alt: "Sales Navigator" }, { src: "/logos/applogos/Apollo.webp", alt: "Apollo" },
    { src: "/logos/applogos/Clay.webp", alt: "Clay" }, { src: "/logos/applogos/Expandi.webp", alt: "Expandi" },
    { src: "/logos/applogos/Heyreach.webp", alt: "HeyReach" }, { src: "/logos/applogos/Instantly.webp", alt: "Instantly" },
    { src: "/logos/applogos/ZoomInfo.webp", alt: "ZoomInfo" }, { src: "/logos/applogos/6sense.webp", alt: "6sense" },
    { src: "/logos/applogos/Hubspot.webp", alt: "HubSpot" }, { src: "/logos/applogos/Zapier.webp", alt: "Zapier" },
    { src: "/logos/applogos/Calendly.webp", alt: "Calendly" }, { src: "/logos/applogos/Slack.webp", alt: "Slack" },
    { src: "/logos/applogos/ChatGPT.webp", alt: "ChatGPT" }, { src: "/logos/applogos/Voila-Norbert.webp", alt: "Voila Norbert" },
    { src: "/logos/applogos/Monday.webp", alt: "Monday" },
  ];
  const content = {
    title: "The Tools Behind Your Outbound Machine",
    description: "From prospect research and LinkedIn automation to cold email sequencing and CRM sync we use the best-in-class stack to build pipeline that actually converts.",
    bullets: [
      "Sales Navigator + Apollo for precision ICP targeting",
      "Expandi & HeyReach for safe LinkedIn automation",
      "Instantly for high-deliverability cold email outbound",
      "Full CRM pipeline sync and meeting attribution",
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

// ─── Inline WorkSampleBentoGrid (LinkedIn & Outbound) ───
export function WorkSampleBentoGrid() {
  // "Real results" title/subtitle + carousel removed from all pages.
  return null;
}

// ─── Inline HeroFormIntro (LinkedIn & Outbound) ───
function LinkedInAnimation() {
  const pipeline = [
    { label: "Prospects Targeted", count: 480, color: "bg-blue-400", pct: 100, delay: 0.2 },
    { label: "Connected", count: 226, color: "bg-spark-400", pct: 47, delay: 0.5 },
    { label: "Replied", count: 91, color: "bg-emerald-400", pct: 19, delay: 0.8 },
    { label: "Meetings Booked", count: 23, color: "bg-spark-600", pct: 5, delay: 1.1 },
  ];
  const metrics = [
    { icon: UserPlus, label: "Acceptance Rate", value: "47%", delay: 0.3, accent: "bg-blue-50 border-blue-200", iconColor: "text-blue-500", valueColor: "text-blue-700" },
    { icon: TrendingUp, label: "Pipeline Generated", value: "$1.2M", delay: 0.6, accent: "bg-spark-50 border-spark-200", iconColor: "text-spark-600", valueColor: "text-[#51B027]" },
    { icon: Calendar, label: "Meetings / Month", value: "23", delay: 0.9, accent: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-500", valueColor: "text-emerald-700" },
    { icon: MessageSquare, label: "Response Rate", value: "19%", delay: 1.2, accent: "bg-amber-50 border-amber-200", iconColor: "text-amber-500", valueColor: "text-amber-700" },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <div className="absolute inset-0 opacity-[0.03] bg-dot-pattern" />
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-spark-100 flex items-center justify-center"><Send className="h-3.5 w-3.5 text-spark-600" /></div>
        <span className="text-sm font-semibold text-gray-900 tracking-wide">LinkedIn Outreach Campaign</span>
        <div className="ml-auto flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-spark-500 animate-pulse" /><span className="text-[11px] text-spark-600 font-medium">Live</span></div>
      </motion.div>
      <div className="relative space-y-2 mb-5">
        {pipeline.map((stage, i) => (
          <motion.div key={stage.label} initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 1 }} transition={{ duration: 0.8, delay: stage.delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 h-8 rounded-lg bg-gray-100 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${stage.pct}%` }} transition={{ duration: 1.2, delay: stage.delay + 0.1, ease: "easeOut" }} className={`absolute inset-y-0 left-0 ${stage.color} rounded-lg opacity-70`} />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-700 z-10">{stage.label}</span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: stage.delay + 0.8 }} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 z-10">{stage.count}</motion.span>
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
            <LinkedInAnimation />
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

/* ────────────────────────────────────────────
   SECTION 1  HERO (2-column layout with form)
   ──────────────────────────────────────────── */
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
        <img src="/images/hero/linkedin-hero.webp" alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#061512]/95 via-[#061512]/70 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
              <Activity className="h-3.5 w-3.5 text-spark-300" />
              <span className="text-sm-body font-medium text-white">LinkedIn &amp; Outbound Pipeline Generation</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-h1 sm:text-display lg:text-display-sm text-white mb-6">
              Your Best Clients Are <br />
              on LinkedIn But
              <br />
              <span className="text-spark-400">Are You in Their Inbox?</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-body sm:text-sub text-gray-300 max-w-2xl mb-8">
              Most firms wait for referrals or spend a fortune on ads. We build a done-for-you LinkedIn and cold email outbound system that puts your firm in front of your exact ideal clients and fills your calendar with qualified meetings every month.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              {[
                { icon: Calendar, text: "Meetings Live in 14 Days" },
                { icon: Users, text: "100% Done-For-You" },
                { icon: TrendingUp, text: "Avg. 20+ Meetings / Month" },
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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="relative p-5 sm:p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm max-w-2xl">
              <Quote className="absolute top-4 left-5 h-5 w-5 text-spark-300" />
              <p className="text-sm-body sm:text-body text-gray-200 italic mb-3 pl-8">
                &ldquo;We had zero outbound motion. Within 60 days of launching with Get Levrg we had 23 qualified meetings booked and $1.2M in new pipeline opportunities. This is the most predictable pipeline we&apos;ve ever had.&rdquo;
              </p>
              <div className="flex items-center gap-3 pl-8">
                <img
                  src="/images/client/shaina-cahill-phd.webp"
                  alt="VP of Sales"
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm-body font-semibold text-white">VP of Sales</p>
                  <p className="text-xs text-gray-400">B2B SaaS Company ($4M ARR)</p>
                </div>
              </div>
            </motion.div>
          </div>

          <HeroFormIntro>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h2 className="text-sub font-bold text-gray-900 mb-1.5">Let&apos;s Start Today</h2>
                <p className="text-sm-body text-gray-500">See exactly what pipeline you&apos;re missing. Free audit and campaign strategy in 24 hours.</p>
              </div>
              <form id="linkedin-outbound-hero-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
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

/* ────────────────────────────────────────────
   SECTION 2  PROBLEMS
   ──────────────────────────────────────────── */
export function ProblemSection() {
  const problems = [
    {
      icon: AlertOctagon,
      title: "The Generic Outreach Trap",
      body: "Copy-paste connection requests. Templated InMails. Spammy follow-ups that get ignored or worse, reported. LinkedIn's algorithm flags mass activity and restricts accounts. Most outbound fails before it starts because it sounds like every other message in the inbox.",
      pain: "Bad outreach doesn't just fail it actively damages your brand and can get your LinkedIn account restricted or banned.",
    },
    {
      icon: RefreshCw,
      title: "The Manual Time Sink",
      body: "Founders, partners, and BDRs spending 15-25 hours a week on LinkedIn searching, connecting, following up, managing replies. It's unsustainable, inconsistent, and keeps your best people away from the work that actually grows the business.",
      pain: "Your highest-cost people are doing the lowest-value prospecting work. Every hour on LinkedIn is an hour not serving clients.",
    },
    {
      icon: Users,
      title: "The Invisible Profile Problem",
      body: "You're messaging prospects but your LinkedIn profile looks like a resume no value proposition, no social proof, no reason for a stranger to accept your connection. A weak profile kills conversion before the conversation even starts.",
      pain: "You could send perfect messages to perfect prospects and still fail if your profile doesn't back up the ask.",
    },
    {
      icon: Database,
      title: "The No-System Problem",
      body: "No ICP definition. No prospect list. No sequence. No follow-up cadence. No way to measure what's working. Pipeline generation is reactive you chase whoever refers someone or responds to an ad. There's no engine, just hope.",
      pain: "Without a system, pipeline is unpredictable. Revenue has peaks and valleys. You can't scale what you can't repeat.",
    },
  ];

  return (
    <section id="problems" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Your Pipeline Problem Isn&apos;t Effort <span className="text-[#51B027]"><br />It&apos;s the Lack of a System</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-14">
          <p className="text-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Here&apos;s what we see in almost every firm we audit across accounting, legal, consulting, SaaS, IT services, and financial advisory.
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

/* ────────────────────────────────────────────
   SECTION 3  SOLUTION
   ──────────────────────────────────────────── */
export function SolutionSection() {
  const differentiators = [
    {
      icon: Target,
      title: "Precision ICP Targeting",
      desc: "We define your exact ideal client profile industry, title, company size, geography, signals and build verified prospect lists of decision-makers who match. No spray and pray. Every message goes to someone who should be a client.",
    },
    {
      icon: Send,
      title: "Done-For-You LinkedIn + Email",
      desc: "We write every message, run every campaign, handle every reply, and book every meeting. You review the strategy and show up to the calls. No tools to learn, no sequences to manage, no inbox to babysit.",
    },
    {
      icon: MessageSquare,
      title: "Profile & Content for Warm Outbound",
      desc: "A prospect who's seen your LinkedIn content before your outreach message is 3-5x more likely to respond. We optimize your profile and publish content that warms prospects before the first message lands.",
    },
    {
      icon: Calendar,
      title: "Qualified Meetings in Your Calendar",
      desc: "We don't just send messages we own the outcome. Reply handling, objection responses, scheduling, and CRM sync. You open your calendar on Monday morning and see discovery calls, not connection requests to manage.",
    },
  ];

  return (
    <section id="solution" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            A Predictable Outbound Engine<span className="text-[#51B027]"><br />Fully Managed</span> Live in 14 Days
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-14">
          <p className="text-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We don&apos;t sell you a LinkedIn automation tool or a cold email course.{" "}
            <span className="font-semibold text-gray-900">We run your outbound for you.</span>{" "}
            ICP research, list building, sequence copywriting, campaign management, reply handling, and meeting booking all done by our team, delivered to your calendar.
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
            <p className="text-body font-semibold text-[#51B027]">Clients average 20–35 qualified meetings per month within 90 days of launch.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   3b. CAPABILITIES SECTION  2-col: checklist left + bento image grid right
   ════════════════════════════════════════════════════════════════════════════ */
export function CapabilitiesSection() {
  const capabilities = [
    "ICP definition & buyer persona development",
    "LinkedIn profile optimization for conversion",
    "Prospect list research & segmentation",
    "Connection request campaign copywriting",
    "Multi-touch InMail & message sequences",
    "Cold email outbound (integrated multi-channel)",
    "Reply handling & inbox management",
    "Meeting booking & calendar management",
    "A/B testing & sequence optimization",
    "LinkedIn content for warm outbound",
    "CRM integration & pipeline tracking",
    "Weekly reporting & campaign analytics",
  ];

  const bentoImages = [
    { src: "/images/work-samples/outbound-machine.webp", alt: "LinkedIn campaign dashboard", span: "row-span-2" },
    { src: "/images/work-samples/pipeline-management.webp", alt: "Outbound sequence analytics", span: "" },
    { src: "/images/work-samples/outreach-operations.webp", alt: "Pipeline reporting", span: "" },
    { src: "/images/work-samples/prospect-intelligence.webp", alt: "Lead list and ICP targeting", span: "col-span-2" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-5">
            LinkedIn &amp; Outbound Services Built for <br />
            <span className="text-[#51B027]">B2B Pipeline Generation</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-4xl mx-auto">
            From ICP research and profile optimization to reply handling and meeting booking every step of your outbound motion is covered, managed, and optimized by our team. For accounting firms, law firms, consultants, SaaS companies, IT services, financial advisors, staffing firms, and commercial real estate teams.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <AnimatedSection className="mb-8" delay={0.2}>
              <p className="text-body text-gray-600">Get Levrg gives you a dedicated outbound team that handles:</p>
            </AnimatedSection>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3" staggerDelay={0.03}>
              {capabilities.map((cap, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-spark-50 border border-spark-100 hover:border-spark-300 hover:shadow-sm transition-all duration-200 h-full">
                    <CheckCircle className="h-5 w-5 text-spark-500 mt-0.5 shrink-0" />
                    <span className="text-sm-body text-gray-700">{cap}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimatedSection className="mt-8" delay={0.2}>
              <p className="text-body text-gray-600">
                Your team brings the expertise and closes the deals. We handle everything in between finding the right prospects, getting in front of them, sparking the conversation, and putting a qualified meeting on your calendar.
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.15} direction="left">
            <div className="grid grid-cols-2 grid-rows-3 gap-3 sm:gap-4 h-[480px] sm:h-[560px]">
              {bentoImages.map((img, i) => (
                <div key={i} className={`relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 group ${img.span}`}>
                  <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

/* ────────────────────────────────────────────
   SECTION 4  CAMPAIGN FINDINGS / CASE STUDY
   ──────────────────────────────────────────── */
export function CampaignFindingsSection() {
  return (
    <section id="results" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Zero Outbound to <span className="text-[#51B027]">23 Qualified Meetings in 60 Days</span>
          </h2>
          <p className="text-body text-gray-500 max-w-xl mx-auto">A real before-and-after from one of our LinkedIn &amp; outbound engagements.</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 sm:px-8 py-5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center gap-3">
              <Send className="h-5 w-5 text-spark-600" />
              <span className="font-bold text-gray-900">B2B SaaS Company</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm-body text-gray-600">$4M ARR</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm-body text-gray-600">12-person team</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm-body text-gray-600">No prior outbound motion</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="flex items-center gap-2 mb-5">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <h3 className="text-sub font-bold text-red-700">Before Get Levrg</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-caption text-red-500 mb-2">Pipeline Problems</p>
                    <ul className="space-y-1.5 text-sm-body text-gray-600">
                      {["100% reliant on inbound and referrals", "Founder spending 20+ hrs/week on LinkedIn", "No ICP definition messaging everyone", "0 structured outbound sequences", "3 months of pipeline drought"].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><X className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-caption text-red-500 mb-2">LinkedIn Profile Issues</p>
                    <ul className="space-y-1.5 text-sm-body text-gray-600">
                      {["Profile looked like a résumé, not a value prop", "No content invisible between outreach", "Generic connection requests 11% acceptance", "No reply framework or objection handling", "CRM had zero outbound attribution"].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><X className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle className="h-5 w-5 text-spark-500" />
                  <h3 className="text-sub font-bold text-[#51B027]">After 60 Days</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-caption text-[#51B027] mb-2">Outbound System Built</p>
                    <ul className="space-y-1.5 text-sm-body text-gray-600">
                      {["ICP defined: VP Sales + RevOps, 50-500 employees", "480 verified prospects targeted in 60 days", "47% connection acceptance rate", "Multi-touch LinkedIn + email sequences live", "Full CRM pipeline sync with meeting attribution"].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-spark-500 mt-0.5 shrink-0" />{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-caption text-[#51B027] mb-2">Results Generated</p>
                    <ul className="space-y-1.5 text-sm-body text-gray-600">
                      {["23 qualified discovery meetings booked", "$1.2M in new pipeline opportunities", "Founder freed from manual prospecting entirely", "4 deals closed from first 60-day cohort", "Outbound now accounts for 40% of new ARR"].map((t, i) => (
                        <li key={i} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-spark-500 mt-0.5 shrink-0" />{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-6 bg-spark-50 border-t border-spark-200">
              <p className="text-caption text-[#51B027] mb-4">Results at 60 Days</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { value: "23", label: "Qualified Meetings", prev: "from 0" },
                  { value: "$1.2M", label: "Pipeline Generated", prev: "in 60 days" },
                  { value: "47%", label: "Acceptance Rate", prev: "was 11%" },
                  { value: "40%", label: "New ARR from Outbound", prev: "was 0%" },
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

/* ────────────────────────────────────────────
   SECTION 5  ROI STATS
   ──────────────────────────────────────────── */
export function RoiSection() {
  const stats = [
    { target: 14, prefix: "", suffix: " days", label: "From Kickoff to First Outreach Live", icon: Zap },
    { target: 47, prefix: "", suffix: "%", label: "Average Connection Acceptance Rate", icon: UserPlus },
    { target: 20, prefix: "", suffix: "+ meetings/mo", label: "Qualified Meetings at Full Capacity", icon: Calendar },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            What a Managed Outbound System Actually <span className="text-[#51B027]">Delivers</span>
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
                  <p className="text-h2 sm:text-h2 text-[#51B027] mb-2">
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

/* ────────────────────────────────────────────
   SECTION 6  COMPARISON TABLE
   ──────────────────────────────────────────── */
export function ComparisonSection() {
  const rows = [
    { category: "Prospect Research", broken: "Manual hours per week", optimized: "Automated + verified lists" },
    { category: "Message Quality", broken: "Generic templates", optimized: "Personalized, industry-specific" },
    { category: "Acceptance Rate", broken: "10–15% (industry avg)", optimized: "40–55% (with optimization)" },
    { category: "Reply Rate", broken: "2–5%", optimized: "15–22%" },
    { category: "Meetings per Month", broken: "0–3 (inconsistent)", optimized: "20–35 (systematic)" },
    { category: "Time Investment", broken: "20+ hrs/week founder time", optimized: "< 2 hrs/week (review only)" },
    { category: "Pipeline Visibility", broken: "None no tracking", optimized: "Full CRM attribution" },
    { category: "Account Safety", broken: "Risk of LinkedIn ban", optimized: "Compliance-safe automation" },
    { category: "Scalability", broken: "Capped at one person's capacity", optimized: "Scales with dedicated team" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Manual Outbound vs <span className="text-[#51B027]">Managed Outbound System</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 text-left border-b border-gray-200">
              <div className="py-4 px-4 bg-gray-50"><p className="text-sm-body font-bold text-gray-900">Category</p></div>
              <div className="py-4 px-4 bg-red-50"><p className="text-sm font-bold text-red-700 flex items-left justify-left gap-1.5"><XCircle className="h-4 w-4" />Manual Outbound</p></div>
              <div className="py-4 px-4 bg-spark-50"><p className="text-sm-body font-bold text-[#51B027] flex items-left justify-left gap-1.5"><CheckCircle className="h-4 w-4" />Managed System</p></div>
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

/* ────────────────────────────────────────────
   SECTION 7  HOW IT WORKS
   ──────────────────────────────────────────── */
export function HowItWorksSection() {
  const steps = [
    { icon: Search, title: "ICP Workshop & Audit (Days 1–5)", desc: "We define your ideal client profile, audit your LinkedIn presence, and build the foundational targeting strategy industry, title, company size, signals, and messaging angles." },
    { icon: BarChart3, title: "Sequence & List Build (Days 6–10)", desc: "We build verified prospect lists, write all connection requests, InMail sequences, email cadences, and objection responses personalized for your ICP and tested before launch." },
    { icon: Send, title: "Campaign Launch (Days 11–14)", desc: "Campaigns go live across LinkedIn and email. We manage the inbox, handle all replies, route hot leads, and start booking qualified meetings directly into your calendar." },
    { icon: TrendingUp, title: "Optimize & Scale (Month 2+)", desc: "Weekly reporting, A/B testing of subject lines and messaging angles, ICP expansion, and ongoing list refreshing. We compound what works and cut what doesn't." },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            From Zero to Meetings in <span className="text-[#51B027]">14 Days</span>
          </h2>
          <p className="text-body text-gray-500 max-w-xl mx-auto">A four-phase process that launches your outbound engine fast then keeps it compounding every month.</p>
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

/* ────────────────────────────────────────────
   SECTION 8  TESTIMONIALS
   ──────────────────────────────────────────── */
const outboundTestimonials = [
  {
    quote: "We were purely referral-dependent for 11 years. In 90 days with Get Levrg we had a systematic outbound motion generating 18 qualified meetings a month. We've added four new clients directly from outbound something we never thought possible as a CPA firm.",
    name: "David Kowalski",
    image: "/images/client/sean-kelly.webp",
    title: "Managing Partner",
    firm: "Accounting Firm, 14 partners",
    metric: "18 meetings/month from zero",
    // Quote text explicitly says "CPA firm" — only true for the accounting page.
    industries: ["accounting"],
  },
  {
    quote: "LinkedIn outreach for a law firm felt impossible compliance, reputation, all of it. Get Levrg built us a sequence that's professional, compliant, and actually gets responses. We booked 11 discovery calls in the first 30 days without a single partner writing a message.",
    name: "Priya Nair",
    image: "/images/client/shahrokh-sheikh.webp",
    title: "Partner",
    firm: "Commercial Litigation Practice",
    metric: "11 discovery calls, month one",
    industries: ["legal"],
  },
  {
    quote: "As a staffing firm, sourcing candidates and reaching clients at the same time was always a bandwidth problem. Get Levrg runs two separate outbound tracks one for client acquisition, one for candidate pipeline. Both running simultaneously, zero extra headcount.",
    name: "James Whitfield",
    image: "/images/client/shaina-cahill-phd.webp",
    title: "CEO",
    firm: "B2B Staffing & Talent Agency",
    metric: "Dual-track campaigns, 2x output",
    industries: ["staffing"],
  },
  {
    quote: "Our VP of Sales was spending 25 hours a week on LinkedIn. That stopped in week two. Now Get Levrg runs the entire outbound operation, she reviews the report on Fridays, and meetings appear in the calendar. It's the best leverage we've ever had.",
    name: "Natalie Cruz",
    image: "/images/client/ivan-ong.webp",
    title: "COO",
    firm: "B2B SaaS, $8M ARR",
    genericFirm: "B2B Company, $8M ARR",
    metric: "25 hrs/week saved for VP Sales",
    // No industry named in the quote itself — safe to show everywhere, with
    // the company label genericized unless the page actually is SaaS.
    industries: null,
    matchesIndustries: ["saas"],
  },
  {
    quote: "We're an IT managed services firm competing against 30 other providers in our region. Outbound is the only way to break through the noise before RFP season. Get Levrg targeted the exact personas we wanted, and we went from 3 new opportunities a quarter to 14.",
    name: "Carlos Mendez",
    image: "/images/client/jeff-klaumann.webp",
    title: "Director of Business Development",
    firm: "Managed IT Services, Regional",
    metric: "3 → 14 new opportunities/quarter",
    industries: ["it-services"],
  },
];

// Variant pages pass their own `industry` slug. Most of these quotes name a
// specific industry in the text itself ("as a CPA firm", "As a staffing
// firm") so they only show on that one page; the one industry-neutral quote
// shows everywhere, with its company label genericized unless the page's
// industry actually matches. The flagship /linkedin-outbound page (no
// industry passed) shows all five with their real labels.
export function TestimonialsSection({ industry }: { industry?: string } = {}) {
  const testimonials = (industry ? outboundTestimonials.filter((t) => !t.industries || t.industries.includes(industry)) : outboundTestimonials)
    .map((t) => ({
      ...t,
      firm: industry && t.matchesIndustries && !t.matchesIndustries.includes(industry) && t.genericFirm ? t.genericFirm : t.firm,
    }));

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, TESTIMONIAL_CAROUSEL_ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

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
            Firms That Stopped Waiting <span className="text-[#51B027]"><br />and Started Winning</span>
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

/* ────────────────────────────────────────────
   SECTION 9  WHY CHOOSE US
   ──────────────────────────────────────────── */
export function WhyChooseUsSection() {
  const items = [
    { icon: Layers, title: "Done-For-You, Not a Tool or Training", desc: "We don't hand you a playbook and wish you luck. We build your sequences, run your campaigns, handle your inbox, and book your meetings. You show up to calls. That's it." },
    { icon: Send, title: "Multi-Channel From Day One", desc: "LinkedIn alone misses 40% of your prospects. We run LinkedIn connection requests, InMail, and cold email simultaneously coordinated sequences that hit prospects across channels without being spammy." },
    { icon: Shield, title: "Compliance-Safe Automation", desc: "LinkedIn bans accounts that violate activity limits. We operate within safe thresholds using enterprise-grade tools, human oversight, and account warming protocols that protect your profile." },
    { icon: DollarSign, title: "Fraction of Hiring a BDR", desc: "A full-time BDR costs $60-90K/year plus benefits, tools, and management overhead. We deliver a full outbound team and stack at a fraction of the cost no ramp time, no turnover risk." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Not a LinkedIn Tool. Not a Course<span className="text-[#51B027]"><br />Your Outbound Team</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-14">
          <p className="text-body text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Every client gets a dedicated outbound strategist, copywriter, and campaign manager. We specialize exclusively in B2B pipeline generation for professional services, SaaS, and high-value service businesses.
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

/* ────────────────────────────────────────────
   SECTION 10  FAQ
   ──────────────────────────────────────────── */
export function FAQSection() {
  const faqs = [
    { q: "Is this done-for-us or do we manage the campaigns ourselves?", a: "100% done-for-you. We build the ICP, write every message, run every campaign, manage the inbox, handle replies, and book meetings directly into your calendar. You review a weekly report and show up to discovery calls. No tools to learn, no sequences to manage." },
    { q: "Will this get our LinkedIn account banned or restricted?", a: "No provided we're the ones running it. We use enterprise-grade automation tools with safe daily activity limits, account warming protocols, and human oversight on every account. We've never had a client account banned. Going above LinkedIn's limits without these safeguards is what gets accounts flagged." },
    { q: "How many qualified meetings should we expect?", a: "Most clients reach 20–35 qualified meetings per month within 60–90 days of launch. The first 14 days is campaign ramp you'll typically see 8–12 meetings in month one, increasing as we A/B test and optimize. Results vary by ICP, offer strength, and geography." },
    { q: "What industries do you work with?", a: "Accounting firms, law firms, consulting firms, SaaS companies, staffing agencies, financial advisory, architecture & engineering practices, IT managed services, commercial real estate, and VP Marketing teams running outsourced outbound. If you sell B2B with a high average contract value, we can generate pipeline." },
    { q: "How is this different from hiring a BDR or SDR?", a: "A BDR costs $60–90K/year plus tools, management, and 3–6 months ramp time. You get one person. With us, you get a full outbound team (strategist, copywriter, campaign manager) available day one, at a fraction of the Cost with no turnover risk, no benefits overhead, and results in 14 days." },
    { q: "Do you handle the replies or do we respond to prospects ourselves?", a: "We handle all replies. Our team manages the conversation until a prospect is qualified and ready to book, then we hand off warm or schedule directly. You never need to monitor the LinkedIn inbox we own it." },
    { q: "What do we need to provide to get started?", a: "We need access to one or more LinkedIn accounts, a brief on your ideal client profile and offer, and your calendar tool for meeting booking. The ICP workshop on day one captures everything else. Most clients are fully onboarded in under 3 hours." },
    { q: "Can we cancel anytime?", a: "Yes. Month-to-month, no long-term contracts. Most clients stay because a consistent outbound engine becomes a core part of their pipeline strategy. But you're never locked in 30 days notice to cancel at any time." },
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

/* ────────────────────────────────────────────
   SECTION 11  FINAL CTA
   ──────────────────────────────────────────── */
export function FinalCTASection() {
  return (
    <section className="py-16 sm:py-24 bg-spark-800">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 sm:text-h1 text-white mb-4">
              Ready to Stop Waiting for Referrals<span><br />and Start Owning Your Pipeline?</span>
            </h2>
            <p className="text-body text-spark-200 leading-relaxed mb-8 max-w-xl mx-auto">
              Get a free outbound audit and see exactly which prospects you&apos;re missing, what your pipeline opportunity looks like, and how fast we can launch your first campaigns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="ghost" size="lg" className="bg-white text-spark-800 hover:bg-spark-50 hover:text-spark-800 px-8 py-6 text-base font-semibold rounded-xl shadow-lg transition-all" onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}>
                Get My Free Outbound Audit
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

/* ────────────────────────────────────────────
   MAIN EXPORT
   ──────────────────────────────────────────── */
export function LinkedInOutboundPage() {
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
        title: "LinkedIn & Outbound Pipeline Generation | Get Levrg",
        description: "Done-for-you LinkedIn outreach and cold email outbound for B2B firms. ICP targeting, sequencing, reply handling, and qualified meetings booked in 14 days.",
        keywords: "LinkedIn outbound, B2B lead generation, cold email outreach, LinkedIn automation, pipeline generation, outbound sales, done-for-you outbound, LinkedIn prospecting",
        ogTitle: "LinkedIn & Outbound Pipeline Generation | Get Levrg",
        ogDescription: "Stop waiting for referrals. Get a managed outbound system that books 20+ qualified meetings per month live in 14 days.",
        ogImage: "/images/hero/linkedin-hero.webp",
      }}
    >
      <HeroSection />
      <TrustedByMarquee />
      <ProblemSection />
      <SolutionSection />
      <CapabilitiesSection />
      <ToolsWeUseSection />
      <CampaignFindingsSection />
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
