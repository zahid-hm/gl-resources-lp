"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLeadForm } from "@/hooks/useLeadForm";
import { PhoneField } from "@/components/shared/PhoneField";
import { INTRO_DURATION, TESTIMONIAL_CAROUSEL_ROTATE_MS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  UserX,
  BookOpen,
  Phone,
  Calendar,
  CheckCircle2,
  BarChart3,
  Scale,
  Lightbulb,
  Users,
  Target,
  ArrowRight,
  ThumbsUp,
  LayoutGrid,
  PiggyBank,
  Quote,
  Briefcase,
  Building2,
  XCircle,
  Clock,
  Smartphone,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Check,
  MessageCircle,
  Heart,
  Share2,
  TrendingUp,
  RotateCcw,
  Zap,
  Shield,
  Trophy,
  Rocket,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection, StaggerContainer, StaggerItem, CountUp } from "@/components/shared/AnimatedSection";
import { TrustedByMarquee } from "@/components/shared/TrustedByMarquee";
import { FaqSchema } from "@/components/shared/FaqSchema";
import { PageShell } from "@/components/layout/PageShell";


// â”€â”€â”€ Inline ToolsWeUseSection (Social Only) â”€â”€â”€
export function ToolsWeUseSection() {
  const tools = [
    { src: "/logos/applogos/Canva.webp", alt: "Canva" }, { src: "/logos/applogos/Figma.webp", alt: "Figma" },
    { src: "/logos/applogos/ChatGPT.webp", alt: "ChatGPT" }, { src: "/logos/applogos/Gemini-Pro.webp", alt: "Gemini Pro" },
    { src: "/logos/applogos/Taplio.webp", alt: "Taplio" }, { src: "/logos/applogos/High-Level.webp", alt: "GoHighLevel" },
    { src: "/logos/applogos/Hubspot.webp", alt: "HubSpot" }, { src: "/logos/applogos/Ahrefs.webp", alt: "Ahrefs" },
    { src: "/logos/applogos/Semrush.webp", alt: "Semrush" }, { src: "/logos/applogos/Slack.webp", alt: "Slack" },
    { src: "/logos/applogos/Calendly.webp", alt: "Calendly" }, { src: "/logos/applogos/Zapier.webp", alt: "Zapier" },
    { src: "/logos/applogos/Klaviyo.webp", alt: "Klaviyo" }, { src: "/logos/applogos/Livestorm.webp", alt: "Livestorm" },
    { src: "/logos/applogos/Google-Chat.webp", alt: "Google Chat" }, { src: "/logos/applogos/Google-Meet.webp", alt: "Google Meet" },
    { src: "/logos/applogos/Email.webp", alt: "Email" }, { src: "/logos/applogos/Freepik.webp", alt: "Freepik" },
  ];
  const content = {
    title: "The Tools Behind the Workflow",
    description: "From content planning and design to scheduling, analytics, and reporting, we use proven tools to keep your social media workflow organized, visible, and easy to manage.",
    bullets: [
      "AI-powered content creation suite",
      "Multi-platform scheduling & publishing",
      "Advanced engagement analytics",
      "Compliance-aware content review tools",
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

// â”€â”€â”€ Inline WorkSampleBentoGrid (Social Only) â”€â”€â”€
export function WorkSampleBentoGrid() {
  // "Real results" title/subtitle + carousel removed from all pages.
  return null;
}

// â”€â”€â”€ Inline HeroFormIntro (Social Only) â”€â”€â”€
export function SocialAnimation() {
  const posts = [
    { platform: "LinkedIn", icon: MessageCircle, color: "text-blue-600", bg: "bg-blue-50 border-blue-200", iconBg: "bg-blue-100", content: "5 Tax Strategies Your CPA Isn't Telling You About", likes: 142, shares: 38, views: "2.4K", checkColor: "text-blue-500" },
    { platform: "Instagram", icon: Heart, color: "text-pink-600", bg: "bg-pink-50 border-pink-200", iconBg: "bg-pink-100", content: "Behind the Scenes: How We Helped a Law Firm 3x Their Inbound", likes: 89, shares: 24, views: "1.8K", checkColor: "text-pink-500" },
    { platform: "Facebook", icon: Share2, color: "text-teal-600", bg: "bg-teal-50 border-teal-200", iconBg: "bg-teal-100", content: "The Real Cost of Being Invisible Online  A CPA Firm Case Study", likes: 203, shares: 56, views: "4.1K", checkColor: "text-teal-500" },
  ];
  const platformStats = [
    { icon: Eye, label: "Monthly Impressions", value: "45K+", delay: 0.4, accent: "bg-teal-50 border-teal-200", iconColor: "text-teal-500", valueColor: "text-teal-700" },
    { icon: TrendingUp, label: "Engagement Rate", value: "4.2%", delay: 0.7, accent: "bg-spark-50 border-spark-200", iconColor: "text-spark-600", valueColor: "text-[#51B027]" },
    { icon: Users, label: "Inbound Inquiries", value: "12/mo", delay: 1.0, accent: "bg-sky-50 border-sky-200", iconColor: "text-sky-500", valueColor: "text-sky-700" },
    { icon: LayoutGrid, label: "Posts Published", value: "18/mo", delay: 1.3, accent: "bg-amber-50 border-amber-200", iconColor: "text-amber-500", valueColor: "text-amber-700" },
  ];
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <div className="absolute inset-0 opacity-[0.03] bg-dot-pattern" />
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-spark-100 flex items-center justify-center"><LayoutGrid className="h-3.5 w-3.5 text-spark-600" /></div>
        <span className="text-sm font-semibold text-gray-900 tracking-wide">Content Calendar</span>
        <div className="ml-auto flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-spark-500 animate-pulse" /><span className="text-[11px] text-spark-600 font-medium">Publishing</span></div>
      </motion.div>
      <div className="space-y-2 mb-4">
        {posts.map((post, i) => {
          const Icon = post.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, x: 60, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.5, type: "spring", stiffness: 180, damping: 20 }} className={`p-3 rounded-xl border ${post.bg}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-5 h-5 rounded-md ${post.iconBg} flex items-center justify-center`}><Icon className={`h-3 w-3 ${post.color}`} /></div>
                <span className={`text-[11px] font-semibold ${post.color}`}>{post.platform}</span>
                <CheckCircle className={`h-3.5 w-3.5 ${post.checkColor} ml-auto`} />
              </div>
              <p className="text-xs text-gray-700 leading-relaxed mb-2">{post.content}</p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px] text-gray-400"><Heart className="h-2.5 w-2.5" /> {post.likes}</span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400"><Share2 className="h-2.5 w-2.5" /> {post.shares}</span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400"><Eye className="h-2.5 w-2.5" /> {post.views}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {platformStats.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.5, delay: s.delay + 1.5, type: "spring", stiffness: 200 }} className={`p-2.5 rounded-xl border ${s.accent}`}>
              <Icon className={`h-3 w-3 ${s.iconColor} mb-1`} />
              <p className={`text-sm font-bold ${s.valueColor} leading-none`}>{s.value}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{s.label}</p>
            </motion.div>
          );
        })}
      </div>
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
            <SocialAnimation />
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 1  HERO (2-column layout with form)
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
        <img src="/images/hero/social-hero.webp" alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#061512]/95 via-[#061512]/70 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
              <Briefcase className="h-3.5 w-3.5 text-spark-300" />
              <span className="text-sm-body font-medium text-white">Social Media Management</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-h1 sm:text-display lg:text-display-sm text-white mb-6">
              Stay Consistent on Social Platforms Without
              <br />
              <span className="text-spark-400">Hiring a Team</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-body sm:text-sub text-gray-300 max-w-2xl mb-8">
              Get a dedicated social media team to handle strategy, copy, design, scheduling, and reporting across LinkedIn, Instagram, and Facebook. You focus on the business. We keep your presence consistent.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              {[
                { icon: Smartphone, text: "12-20 Posts Monthly" },
                { icon: Clock, text: "Live in 14 Days" },
                { icon: Briefcase, text: "Strategy & Creative Managed" },
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
                &ldquo;Get Levrg handled our marketing so we could focus on growth.&rdquo;
              </p>
              <div className="flex items-center gap-3 pl-8">
                <img
                  src="/images/client/james-mcgrath.webp"
                  alt="James McGrath"
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm-body font-semibold text-white">James McGrath</p>
                  <p className="text-xs text-gray-400">Brand & Social Media Manager | Empellor CRM</p>
                </div>
              </div>
            </motion.div>
          </div>

          <HeroFormIntro>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h2 className="text-sub font-bold text-gray-900 mb-1.5">Let&apos;s Start Today</h2>
                <p className="text-sm-body text-gray-500"></p>
              </div>
              <form id="social-hero-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 2  PROBLEMS
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export function ProblemSection() {
  const problems = [
    {
      icon: Eye,
      title: "Ideal Clients Are Researching Before They Reach Out",
      body: "Your competitors are publishing consistently, showing up in feeds, and building familiarity before the first sales conversation. If your firm is not visible, buyers may assume you are inactive, unavailable, or not the obvious choice.",
      pain: "Every day you're invisible online, you're losing clients to firms that show up consistently.",
    },
    {
      icon: UserX,
      title: "Your Experts Shouldn\u2019t Have to Become Content Managers",
      body: "Partners, advisors, lawyers, accountants, and consultants should not have to chase post ideas, write captions, format graphics, or manage publishing calendars. Their expertise should guide the content. Your social media team should turn that expertise into consistent output.",
      pain: "You can't force partners to post. And one in-house hire can't replicate a team's output.",
    },
    {
      icon: BookOpen,
      title: "Your Expertise Needs a System to Reach the Market",
      body: "Your team has strong ideas, client experience, and real points of view. The problem is that most of it stays inside meetings, proposals, and client work. A managed social media system turns that expertise into visible, repeatable content.",
      pain: "Expertise that isn't visible doesn't exist in the buyer's mind.",
    },
  ];

  return (
    <section id="problems" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Professional Firms Have a Visibility Problem <span className="text-[#51B027]"><br />Not an Expertise Problem </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-14">
          <p className="text-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <span className="font-semibold text-gray-900">57% of professional services buyers research providers online</span> before reaching out. If you&apos;re not visible, you&apos;re not in the conversation.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="h-full rounded-xl border border-gray-100 bg-white p-6 border-l-4 border-l-red-400">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-500 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sub font-bold text-gray-900 mb-3">{problem.title}</h3>
                  <p className="text-sm-body text-gray-600 mb-4">{problem.body}</p>
                  <div className="p-3 rounded-lg bg-red-50/50">
                    <p className="text-sm-body font-medium text-red-600">{problem.pain}</p>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 3  SOLUTION
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* ════════════════════════════════════════════════════════════════════════════
   1. VISIBILITY PROBLEM SECTION (General targeting — SocialPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralProblemSection() {
  const problems = [
    {
      icon: Eye,
      headline: "Buyers Research You Online Before They Contact You",
      body: "Your competitors post every week and build familiarity long before the first call. Stay quiet, and buyers assume you are small, inactive, or not worth the risk.",
    },
    {
      icon: UserX,
      headline: "Your Best People Shouldn’t Become Content Managers",
      body: "Your experts should shape the content, not chase post ideas, write captions, and babysit a calendar. Give them a team that turns their knowledge into steady output.",
    },
    {
      icon: BookOpen,
      headline: "Your Expertise Needs a System to Reach the Market",
      body: "Your best thinking sits trapped in meetings, proposals, and client work. A managed system pulls it out and turns it into content buyers see.",
    },
  ];

  return (
    <section id="problems" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 max-w-4xl mx-auto">
            Most Companies Nowadays Deal With <br /><span className="text-[#51B027]">A Visibility Problem</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-14">
          <p className="text-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <span className="font-semibold text-gray-900">57% of B2B buyers research providers online</span> before they ever reach out. If you are not visible, you are not on their list. (Emarketer)
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="h-full rounded-xl border border-gray-100 bg-white p-6 border-l-4 border-l-red-400">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-500 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sub font-bold text-gray-900 mb-3">{problem.headline}</h3>
                  <p className="text-sm-body text-gray-600">{problem.body}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SolutionSection() {
  const differentiators = [
    {
      icon: Target,
      title: "Industry-Specific Content Strategy",
      desc: "Compliance-aware, positioned around your specialties. We know what professional services firms can and can't say\u2014and how to make expertise visible within those boundaries.",
    },
    {
      icon: ThumbsUp,
      title: "Your Experts Provide the Insight. We Handle the Execution",
      desc: "Your partners or subject-matter experts review the direction and approve content. We handle the writing, formatting, design, scheduling, and workflow, so the content reflects their expertise without pulling them into day-to-day production.",
    },
    {
      icon: LayoutGrid,
      title: "Consistent Monthly Content Across Key Social Channels",
      desc: "Get 12-20 posts per month across LinkedIn, Facebook, and Instagram, planned around your firm\u2019s services, audience, and business goals.",
    },
    {
      icon: PiggyBank,
      title: "Managed Social Media Capacity Without Adding Headcount",
      desc: "Get strategy, writing, design, publishing, and reporting support without recruiting, training, or managing a full-time internal hire. You get the output of a social media team with a simpler operating model.",
    },
  ];

  return (
    <section id="solution" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            You Need a Social Media Team That Understands<span className="text-[#51B027]"><br /> Professional Services </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-14">
          <p className="text-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We work with professional services firms across law, accounting, consulting, financial advisory, architecture, and B2B services. Every strategy, post, and content calendar is built around expertise, trust and long sales cycles, not generic social media activity.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <div className="h-full p-6 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow duration-300">
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
   3b. SEO SECTION  2-col: checklist left + bento image grid right
   ════════════════════════════════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════════════════════════════════
   3. STRATEGY & QUALITY SOLUTION SECTION (General targeting — SocialPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralSolutionSection() {
  const differentiators = [
    {
      icon: Shield,
      title: "A Team That Learns Your Brand",
      desc: "The same strategist, writer, designer, and account manager own your account, so your voice stays consistent across every post.",
    },
    {
      icon: Zap,
      title: "Live in 14 Days",
      desc: "Strategy and calendar built in the first week. First posts published within two weeks..",
    },
    {
      icon: LayoutGrid,
      title: "Strategy and Creative, Handled",
      desc: "Planning, copy, design, scheduling, and reporting run on one workflow. You review and approve; we do the rest.",
    },
    {
      icon: PiggyBank,
      title: "Lower Overhead Than In-House",
      desc: "A full social team for less than the cost and commitment of a single full-time hire. No recruiting, no ramp, no payroll.",
    },
  ];

  return (
    <section id="solution" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Why Choose Between Strategy, Consistency and Quality?
            <br />
            <span className="text-[#51B027]">Get All Three</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-3xl mx-auto">
            We build the strategy, produce the content, and run the calendar, so your brand stays visible without one more person to manage. You bring the direction. We handle the output.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.08}>
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={i}>
                <div className="p-6 rounded-xl border border-gray-100 bg-white hover:shadow-lg hover:shadow-gray-100/80 transition-all duration-300 group h-full border-l-4 border-l-spark-400">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-spark-50 text-spark-600 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sub font-bold text-gray-900">{item.title}</h3>
                  </div>
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

export function SEOSection() {
  const capabilities = [
    "LinkedIn content strategy and posting",
    "Facebook and Instagram content management",
    "Thought leadership content for partners and subject-matter experts",
    "Social media content calendars",
    "Post copywriting and creative design",
    "Content scheduling and publishing",
    "Monthly reporting and optimization",
  ];

  const bentoImages = [
    { src: "/images/work-samples/multi-channel-social-media-operations-hub.webp", alt: "Multi-channel social media operations hub for professional firms", span: "row-span-2" },
    { src: "/images/work-samples/social-media-production-pipeline.webp", alt: "Social media production pipeline and content calendar workflow", span: "" },
    { src: "/images/work-samples/extension-of-the-client's-team.webp", alt: "Extension of the client's team — dedicated social media management support", span: "" },
    { src: "/images/work-samples/your-dedicated-social-media-department.webp", alt: "Your dedicated social media department for B2B and professional firms", span: "col-span-2" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-5">
            Social Media Management Services Built for <br />
            <span className="text-[#51B027]">Professional and B2B Firms</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Professional firms do not need generic posting. They need social media content that builds trust, explains expertise, and keeps the firm visible before buyers are ready to reach out.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <AnimatedSection className="mb-8" delay={0.2}>
              <p className="text-body text-gray-600">
                Get Levrg gives you a managed social media team that can support:
              </p>
            </AnimatedSection>

            <StaggerContainer className="space-y-3" staggerDelay={0.06}>
              {capabilities.map((cap, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-spark-50 border border-spark-100 hover:border-spark-300 hover:shadow-sm transition-all duration-200">
                    <CheckCircle className="h-5 w-5 text-spark-500 mt-0.5 shrink-0" />
                    <span className="text-sm-body text-gray-700">{cap}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimatedSection className="mt-8" delay={0.2}>
              <p className="text-body text-gray-600">
                Social media management for law firms, accounting firms, consulting firms, SaaS companies, and B2B service providers. Your team brings the expertise. We turn it into a consistent social media presence that helps buyers understand what you do, why it matters, and when to start a conversation.
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 4  CLIENT IMPACT
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* ════════════════════════════════════════════════════════════════════════════
   2. CAPABILITIES / BUILT FOR VISIBILITY SECTION (General targeting — SocialPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralSEOSection() {
  const capabilities = [
    "LinkedIn content strategy and posting",
    "Instagram and Facebook content management",
    "Content calendars planned around your goals",
    "Post copywriting and creative design",
    "Thought leadership and founder or personal-brand content",
    "Short-form and social video editing",
    "Monthly reporting and optimization",
    "Social media management for SaaS, B2B services, agencies, and professional firms",
  ];

  const bentoImages = [
    { src: "/images/work-samples/socialvideo.webp", alt: "Endless stream of published social content across LinkedIn, Instagram, YouTube, and Facebook", span: "row-span-2" },
    { src: "/images/work-samples/shots.webp", alt: "Short-form social video and platform-specific creative for LinkedIn and Instagram", span: "" },
    { src: "/images/work-samples/linkedincontent.webp", alt: "Founder and thought leadership content built for social distribution", span: "" },
    { src: "/images/work-samples/linkedinreport.webp", alt: "Monthly reporting and content calendar planning for B2B social media teams", span: "col-span-2" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-5">
            Social Media Management Built for <br />
            <span className="text-[#51B027]">Teams That Need to Stay Visible</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Whether you&apos;re a SaaS company, a B2B service business, an agency, or a professional firm, staying consistent on social is a full-time job. Get Levrg gives you a managed social media team that turns your ideas and expertise into a steady, on-brand presence.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <AnimatedSection className="mb-8" delay={0.2}>
              <p className="text-body text-gray-600">
                Get Levrg gives you a professional social media team that can support:
              </p>
            </AnimatedSection>

            <StaggerContainer className="space-y-3" staggerDelay={0.06}>
              {capabilities.map((cap, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-spark-50 border border-spark-100 hover:border-spark-300 hover:shadow-sm transition-all duration-200">
                    <CheckCircle className="h-5 w-5 text-spark-500 mt-0.5 shrink-0" />
                    <span className="text-sm-body text-gray-700">{cap}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <AnimatedSection className="mt-8" delay={0.2}>
              <p className="text-body text-gray-600">
                You bring the goals and the point of view. We bring the strategy, content, design, and publishing rhythm to keep your brand showing up.
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

/* ════════════════════════════════════════════════════════════════════════════
   7. TOOLS BEHIND THE WORKFLOW SECTION (General targeting — SocialPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralToolsWeUseSection() {
  const tools = [
    { src: "/logos/applogos/Canva.webp", alt: "Canva" },
    { src: "/logos/applogos/Figma.webp", alt: "Figma" },
    { src: "/logos/applogos/ChatGPT.webp", alt: "ChatGPT" },
    { src: "/logos/applogos/Gemini-Pro.webp", alt: "Gemini Pro" },
    { src: "/logos/applogos/Taplio.webp", alt: "Taplio" },
    { src: "/logos/applogos/High-Level.webp", alt: "GoHighLevel" },
    { src: "/logos/applogos/Hubspot.webp", alt: "HubSpot" },
    { src: "/logos/applogos/Ahrefs.webp", alt: "Ahrefs" },
    { src: "/logos/applogos/Semrush.webp", alt: "Semrush" },
    { src: "/logos/applogos/Slack.webp", alt: "Slack" },
    { src: "/logos/applogos/Calendly.webp", alt: "Calendly" },
    { src: "/logos/applogos/Zapier.webp", alt: "Zapier" },
    { src: "/logos/applogos/Klaviyo.webp", alt: "Klaviyo" },
    { src: "/logos/applogos/Livestorm.webp", alt: "Livestorm" },
    { src: "/logos/applogos/Google-Chat.webp", alt: "Google Chat" },
    { src: "/logos/applogos/Google-Meet.webp", alt: "Google Meet" },
    { src: "/logos/applogos/Email.webp", alt: "Email" },
    { src: "/logos/applogos/Freepik.webp", alt: "Freepik" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <AnimatedSection>
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            The Tools Behind the Workflow
          </h2>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.1}>
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee-left-slow will-change-transform">
            {[...tools, ...tools].map((tool, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center mx-3 px-6 rounded-xl bg-white border border-gray-200 shadow-sm"
                style={{ width: 160, height: 80 }}
              >
                <img
                  src={tool.src}
                  alt={tool.alt}
                  width={140}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

export function ClientImpactSection() {
  const stats = [
    {
      value: 57,
      prefix: "",
      suffix: "%",
      label: "of Buyers Research Online First",
      source: "Hinge Research Institute, 2025",
    },
    {
      value: 0,
      displayText: "4-6 months",
      prefix: "",
      suffix: "",
      label: "Average Revenue Impact Timeline",
      source: "CPA firm added 8 advisory clients within 6 months",
    },
    {
      value: 0,
      displayText: "3-5x",
      prefix: "",
      suffix: "",
      label: "Engagement on Educational Content",
      source: "Educational posts convert better than promotional ones",
    },
  ];

  return (
    <section id="results" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Visibility That Turns Into <br /> <span className="text-[#51B027]">Inquiries, Trust and Revenue</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="p-8 rounded-xl border border-gray-100 bg-white text-center hover:shadow-md transition-shadow">
                <div className="text-h1 sm:text-display text-gray-900 mb-2">
                  {stat.displayText ? (
                    stat.displayText
                  ) : (
                    <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  )}
                </div>
                <h3 className="text-sub font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-sm-body text-gray-500">{stat.source}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 5  CASE EXAMPLES
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const socialCaseExamples = [
  {
    firm: "CPA Firm",
    detail: "12 partners, $6M revenue",
    story: "By month 3, we had business owners reaching out because they'd been seeing our content on LinkedIn for weeks. They already trusted us before the first call. Added 6 advisory clients in the first 6 months\u2014revenue we would never have seen otherwise.",
    learning: "Consistent visibility creates warm inbound that outbound can't replicate.",
    industries: ["accounting"],
  },
  {
    firm: "Law Firm",
    detail: "8-person, employment law",
    story: "Within 5 months, LinkedIn had become our #2 lead source. Not from ads\u2014from organic content that positioned us as the go-to employment law authority in our region. Partners are now recognized at industry events from their posts.",
    learning: "Authority positioning compounds. Each post builds on the last, creating momentum that accelerates over time.",
    industries: ["legal"],
  },
  {
    firm: "Consulting Firm",
    detail: "5 consultants",
    story: "Inbound inquiries tripled within 6 months. We went from chasing every opportunity to choosing the ones that fit. Our content does the qualifying for us\u2014by the time someone reaches out, they already understand our approach.",
    learning: "Educational content pre-qualifies leads. Inquiries from content readers convert at 2-3x the rate of cold leads.",
    industries: ["consulting"],
  },
];

// Variant pages pass their own `industry` slug \u2014 each case study names its
// own firm type directly, so it only shows on a genuine match. The flagship
// /social page (no industry passed) shows all three; a variant with no
// genuine match renders nothing rather than borrowing another industry's
// case study.
export function CaseExamplesSection({ industry }: { industry?: string } = {}) {
  const cases = industry
    ? socialCaseExamples.filter((c) => c.industries.includes(industry))
    : socialCaseExamples;

  if (cases.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            How Professional Firms Are <span className="text-[#51B027]">Using This</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <AnimatedSection key={i} direction="up" delay={i * 0.1}>
              <div className="h-full flex flex-col">
                <div className="flex-1 p-6 rounded-xl border border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-spark-50 text-spark-600">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{c.firm}</h3>
                      <p className="text-sm-body text-gray-500">{c.detail}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-sm-body">&ldquo;{c.story}&rdquo;</p>
                </div>
                <div className="mt-3 p-4 rounded-xl bg-spark-50/50 border border-spark-100 border-l-4 border-l-spark-500">
                  <p className="text-sm-body font-medium text-[#51B027]">
                    <span className="font-bold">Key Learning:</span> {c.learning}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 6  COST COMPARISON
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export function CostComparisonSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            The Cost of Staying  <span className="text-red-500">Invisible</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection direction="left">
            <div className="p-6 sm:p-8 rounded-xl border border-spark-200 bg-white h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-spark-50 text-spark-600">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="text-sub font-bold text-[#51B027]">The Visible Firm</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-spark-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">$2,500/month</p>
                    <p className="text-sm-body text-gray-500">Dedicated social media team</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-spark-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">10 hrs partner time</p>
                    <p className="text-sm-body text-gray-500">Monthly review and approval only</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-spark-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">ROI 10-20x</p>
                    <p className="text-sm-body text-gray-500">Warm inbound leads, authority positioning</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-spark-50/50 border border-spark-100">
                <p className="text-sm-body text-[#51B027] font-medium">Total cost: ~$2,500/mo with compounding returns</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="p-6 sm:p-8 rounded-xl border border-red-200 bg-white h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-500">
                  <XCircle className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-red-600">The Invisible Firm</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">$0 social cost</p>
                    <p className="text-sm-body text-gray-500">But 5x more spent on outbound + ads</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Endless partner hours</p>
                    <p className="text-sm-body text-gray-500">Writing posts that never get published</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Declining market share</p>
                    <p className="text-sm-body text-gray-500">Competitors visible, you&apos;re not</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-red-50/50 border border-red-100">
                <p className="text-sm text-red-600 font-medium">Hidden cost: $10K-$25K/mo in lost opportunities + wasted ad spend</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 7  HOW IT WORKS
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* ════════════════════════════════════════════════════════════════════════════
   9. WHY OUR CLIENTS WORK WITH US SECTION (General targeting — SocialPage only, hidden)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralROISection() {
  const stats = [
    {
      value: "12-20",
      label: "Posts Published Every Month",
    },
    {
      value: "1",
      label: "POC Oversees the Entire Workflow",
    },
    {
      value: "40+",
      label: "B2B Partnerships Across North America",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Why <span className="text-[#51B027]">Our Clients</span> Work With Us
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="h-full p-8 rounded-xl border border-gray-100 bg-white text-center group hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center">
                <div className="text-h1 sm:text-h2 lg:text-display-sm text-[#51B027] mb-4">
                  {stat.value}
                </div>
                <p className="text-gray-900 text-sub font-semibold">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ── Visual: radial ring meter (share of buyers researching online) ── */
function RadialMeter({ percent }: { percent: number }) {
  const size = 112;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E2F5DC" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#51B027"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * (1 - percent / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-h2 font-bold text-gray-900">
          <CountUp target={percent} suffix="%" />
        </span>
      </div>
    </div>
  );
}

/* ── Visual: range timeline (month window where revenue impact shows up) ── */
function TimelineMeter({ startMonth, endMonth, totalMonths }: { startMonth: number; endMonth: number; totalMonths: number }) {
  const startPct = (startMonth / totalMonths) * 100;
  const widthPct = ((endMonth - startMonth) / totalMonths) * 100;

  return (
    <div className="w-full max-w-[220px]">
      <div className="flex justify-center mb-2">
        <span className="text-h3 font-bold text-gray-900">
          Month {startMonth}&ndash;{endMonth}
        </span>
      </div>
      <div className="relative h-2.5 rounded-full bg-spark-100">
        <motion.div
          className="absolute top-0 h-2.5 rounded-full bg-spark-600"
          style={{ left: `${startPct}%` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${widthPct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-caption text-gray-400 normal-case tracking-normal">Month 0</span>
        <span className="text-caption text-gray-400 normal-case tracking-normal">Month {totalMonths}</span>
      </div>
    </div>
  );
}

/* ── Visual: comparison bars (educational vs promotional engagement) ── */
function ComparisonBars() {
  const bars = [
    { label: "Promotional", value: "1x", heightPct: 22, color: "bg-gray-300" },
    { label: "Educational", value: "3-5x", heightPct: 100, color: "bg-spark-600" },
  ];

  return (
    <div className="flex items-end justify-center gap-6 h-24 w-full">
      {bars.map((bar) => (
        <div key={bar.label} className="flex flex-col items-center justify-end h-full">
          <span className={`text-sm-body font-bold mb-1.5 ${bar.color === "bg-spark-600" ? "text-gray-900" : "text-gray-500"}`}>
            {bar.value}
          </span>
          <motion.div
            className={`w-9 rounded-t-md ${bar.color}`}
            initial={{ height: 0 }}
            whileInView={{ height: `${bar.heightPct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ maxHeight: "72px" }}
          />
          <span className="text-caption text-gray-400 normal-case tracking-normal mt-2">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   4. VISIBILITY IMPACT / RESULTS SECTION (General targeting — SocialPage only, hidden)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralClientImpactSection() {
  const stats = [
    {
      visual: <RadialMeter percent={57} />,
      label: "of Buyers Research Online First",
      source: "Hinge Research Institute, 2025",
    },
    {
      visual: <TimelineMeter startMonth={4} endMonth={6} totalMonths={6} />,
      label: "Average Revenue Impact Timeline",
      source: "One client added 8 new accounts within 6 months",
    },
    {
      visual: <ComparisonBars />,
      label: "Engagement on Educational Content",
      source: "Educational posts outperform promotional ones",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            Visibility That Turns Into <br /> <span className="text-[#51B027]">Inquiries, Trust and Revenue</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch" staggerDelay={0.12}>
          {stats.map((stat, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="h-full p-8 rounded-xl border border-gray-100 bg-white text-center hover:shadow-md transition-shadow flex flex-col items-center">
                <div className="flex items-center justify-center flex-1 mb-4">{stat.visual}</div>
                <h3 className="text-sub font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-sm-body text-gray-500">{stat.source}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   5. COST OF STAYING INVISIBLE SECTION (General targeting — SocialPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralCostComparisonSection() {
  return (
    <section id="results" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            The Cost of Staying <span className="text-red-500">Invisible</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection direction="left">
            <div className="p-6 sm:p-8 rounded-xl border border-spark-200 bg-white h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-spark-50 text-spark-600">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="text-sub font-bold text-[#51B027]">The Visible Company</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-spark-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">$2,500/month</p>
                    <p className="text-sm-body text-gray-500">A dedicated social media team</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-spark-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">10 hours a month</p>
                    <p className="text-sm-body text-gray-500">Review and approval only</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-spark-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">10-20x ROI</p>
                    <p className="text-sm-body text-gray-500">Warm inbound leads and stronger positioning</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-spark-50/50 border border-spark-100">
                <p className="text-sm-body text-[#51B027] font-medium">Total: about $2,500/mo, with returns that compound.</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="p-6 sm:p-8 rounded-xl border border-red-200 bg-white h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-500">
                  <XCircle className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-red-600">The Invisible Company</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">$0 social spend</p>
                    <p className="text-sm-body text-gray-500">But 5x more going to outbound and ads</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Endless internal hours</p>
                    <p className="text-sm-body text-gray-500">Posts drafted, never shipped</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-900 font-medium">Shrinking market share</p>
                    <p className="text-sm-body text-gray-500">Competitors show up, you don&apos;t</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-red-50/50 border border-red-100">
                <p className="text-sm text-red-600 font-medium">Hidden cost: $10K to $25K a month in lost deals and wasted ad spend.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    { icon: Phone, title: "Kickoff Interview (Day 1-2)", desc: "30-min call with partners to understand your firm's expertise, ideal clients, voice, and positioning." },
    { icon: Calendar, title: "Content Strategy + Calendar (Day 3-7)", desc: "We build a 90-day content plan aligned to your specialties, compliance requirements, and growth goals." },
    { icon: CheckCircle2, title: "First Content Live (Day 8-14)", desc: "4-6 posts scheduled and published across your platforms. Your firm starts building visibility immediately." },
    { icon: BarChart3, title: "Ongoing + Monthly Optimization (Week 3+)", desc: "12-20 posts monthly. Monthly performance reviews, strategy adjustments, and continuous improvement." },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            From Idea to <span className="text-[#51B027]">Authority</span> in 14 Days
          </h2>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 9  TESTIMONIALS
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* ════════════════════════════════════════════════════════════════════════════
   6. IDEA TO IDENTITY / HOW IT WORKS SECTION (General targeting — SocialPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralHowItWorksSection() {
  const steps = [
    {
      title: "Kickoff",
      timeline: "Day 1-2",
      desc: "A short call to capture your brand, voice, audience, and goals. No lengthy setup required.",
    },
    {
      title: "Strategy + Calendar",
      timeline: "Day 3-7",
      desc: "We build a 90-day content plan aligned to your positioning, channels, and growth goals.",
    },
    {
      title: "First Posts Live",
      timeline: "Day 8-14",
      desc: "Your first posts are scheduled and published. Your brand starts building visibility immediately.",
    },
    {
      title: "Ongoing + Optimization",
      timeline: "Week 3+",
      desc: "12-20 posts monthly, plus monthly performance reviews and continuous improvement.",
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            From Idea to{" "}
            <span className="text-[#51B027]">Identity in 14 Days</span>
          </h2>
        </AnimatedSection>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:flex items-start justify-between gap-0 items-stretch">
          {steps.map((step, i) => {
            return (
              <React.Fragment key={i}>
                <div className="flex-1 min-w-0">
                  <div className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300 group h-full">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-full bg-spark-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {i + 1}
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-spark-100 text-spark-700 text-[11px] font-semibold">
                        <Clock className="h-2.5 w-2.5" />
                        {step.timeline}
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

        {/* Mobile/Tablet: vertical stack */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => {
            return (
              <React.Fragment key={i}>
                <AnimatedSection direction="up" delay={i * 0.08}>
                  <div className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300 group">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-full bg-spark-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                        {i + 1}
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-spark-100 text-spark-700 text-[11px] font-semibold">
                        <Clock className="h-2.5 w-2.5" />
                        {step.timeline}
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

const socialTestimonials = [
  {
    quote: "Our LinkedIn presence went from nonexistent to the most visible firm in our market. Not one partner had to write a post. We're getting inquiries from businesses who've been following our content for months.",
    name: "Sarah Thompson",
    image: "/images/client/kim-hubbs.webp",
    title: "Partner",
    firm: "Thompson & Associates CPAs",
    size: "6 partners",
    // "Partner"-structured professional-services firms only — the quote and
    // title/size read naturally there, but not for a SaaS or engineering firm.
    industries: ["accounting", "legal", "consulting", "financial-advisory"],
  },
  {
    quote: "We tried having one partner post occasionally. Never happened. Now we have consistent content that actually sounds like us. Our employment law expertise is finally visible to the people who need it.",
    name: "Michael Chen",
    image: "/images/client/leslie-heller.webp",
    title: "Managing Partner",
    firm: "Chen Employment Law",
    size: "8-person firm",
    industries: ["legal"],
  },
  {
    quote: "We were too busy doing client work to build our own brand. That changed completely. Our consultants are now recognized as thought leaders in organizational development, and the inbound speaks for itself.",
    name: "Patricia Martinez",
    image: "/images/client/madalina-zaharia.webp",
    title: "Founder",
    firm: "Martinez Organizational Development",
    size: "5 consultants",
    industries: ["consulting"],
  },
  {
    quote: "Financial advisory is relationship-driven. But how do you start relationships before the first meeting? Content. Their team understands our compliance requirements and creates posts that build trust without crossing lines.",
    name: "David Rodriguez",
    image: "/images/client/paul-de-la-garza.webp",
    title: "Wealth Advisor",
    firm: "Rodriguez Financial Group",
    size: "4 advisors",
    industries: ["financial-advisory"],
  },
  {
    quote: "I was skeptical that anyone could capture our firm's voice. After reviewing the first batch of posts, I was convinced. Our authority positioning on LinkedIn has directly led to new client engagements.",
    name: "Jennifer Walsh",
    image: "/images/client/phil-wittmer.webp",
    title: "Senior Partner",
    firm: "Walsh & Associates Law",
    size: "12 attorneys",
    industries: ["legal"],
  },
];

// Variant pages pass their own `industry` slug so this only shows quotes that
// are actually true for that industry (the quote text and title/size below
// name a specific firm type — a law firm's testimonial doesn't fit a SaaS
// company's page). The flagship /social page (no industry passed) shows all
// five. If a variant's industry has no genuine match among these, the section
// renders nothing rather than borrowing another industry's proof.
export function TestimonialsSection({ industry }: { industry?: string } = {}) {
  const testimonials = industry
    ? socialTestimonials.filter((t) => t.industries.includes(industry))
    : socialTestimonials;

  // Hooks must run unconditionally on every render, so the empty-list bail
  // happens below, after they're all declared — not before.
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

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
            Firms That Don&apos;t <span className="text-[#51B027]">Look Back</span>
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
                      <p className="text-sl text-gray-500">{t.title} &middot; {t.size}</p>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 10  WHY CHOOSE US
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* ════════════════════════════════════════════════════════════════════════════
   11. TESTIMONIALS SECTION (General targeting — SocialPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralTestimonialsSection() {
  const testimonials = [
    {
      quote: "The team elevated our content game and streamlined publishing across platforms.",
      name: "Leslie Heller",
      image: "/images/client/leslie-heller.webp",
      title: "Director of Marketing",
      company: "Factor AE",
    },
    {
      quote: "We got our Sundays back. Levrg took LinkedIn tasks completely off our plate.",
      name: "Thomas Buchanan",
      image: "/images/client/thomas-buchanan.webp",
      title: "CRO",
      company: "Sales Tempo",
    },
    {
      quote: "A responsive and insightful team that meaningfully elevated our brand strategy.",
      name: "Shahrokh Sheikh",
      image: "/images/client/shahrokh-sheikh.webp",
      title: "Partner & Litigation Attorney",
      company: "Wgcounsel",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, TESTIMONIAL_CAROUSEL_ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
            Companies That Don&apos;t{" "}
            <span className="text-[#51B027]">Look Back</span>
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

export function WhyChooseUsSection() {
  const items = [
    { icon: Scale, title: "Built for Professional Services", desc: "We don't work with restaurants, e-commerce, or lifestyle brands. Every strategy, post, and calendar is designed for firms like yours." },
    { icon: Lightbulb, title: "Content That Demonstrates Expertise", desc: "Not generic motivational quotes. Real thought leadership that positions your partners as the authorities they are." },
    { icon: Users, title: "Full Team, Not a Single Hire", desc: "Strategist, writer, designer, and account manager. A complete social media department for less than one in-house hire." },
    { icon: Target, title: "Compliance-Aware From Day One", desc: "We understand the rules professional services firms operate under. Every post is reviewed for compliance before publication." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-4">
            We Specialize in <span className="text-[#51B027]">Professional Services</span><br />We Understand Your World
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-14">
          <p className="text-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
            This isn&apos;t a side service. It&apos;s our only focus. Every member of our team is trained on the nuances of professional services marketing.
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 11  FAQ
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* ════════════════════════════════════════════════════════════════════════════
   8. WHY CHOOSE US / DEDICATED TEAM SECTION (General targeting — SocialPage only, hidden)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralWhyChooseUsSection() {
  const items = [
    {
      icon: Trophy,
      title: "Proven Track Record",
      desc: "40+ B2B teams trust us with their social presence. We’ve delivered content with a 98% satisfaction and 99% on-time publish rate.",
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      desc: "Your dedicated account manager is a Slack message away. No ticket queues, no call centers, real humans in real time.",
    },
    {
      icon: UserCheck,
      title: "Vetted Talent Only",
      desc: "Every strategist, writer, and designer passes a rigorous portfolio review, skills test, and English fluency check. We hire less than 1% of applicants.",
    },
    {
      icon: Rocket,
      title: "Built for Scale",
      desc: "As your content starts performing, you’ll want more of it. Add channels and output on demand; same team, same workflow, same voice.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Not Another Freelancer Marketplace{" "}
            <span className="text-[#51B027]"><br />This Is Your Dedicated Team</span>
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

export function FAQSection() {
  const faqs = [
    { q: "How much partner time is required?", a: "Your partners do not need to write posts or manage the content process. We usually need a short kickoff conversation, occasional input on key topics, and quick approval on planned content. The goal is to capture your firm\u2019s expertise without turning your experts into content managers." },
    { q: "What platforms do you post on?", a: "We typically support LinkedIn, Facebook, and Instagram. For many professional services and B2B firms, LinkedIn is the primary channel because it is where decision-makers, referral partners, and industry peers are most active." },
    { q: "How quickly will we see results?", a: "Your first content can usually go live within 14 days. Visibility, engagement, and inbound interest usually build over time as your firm publishes consistently and your audience becomes more familiar with your expertise." },
    { q: "How is this different from hiring an in-house social media manager?", a: "An in-house hire gives you one person to recruit, train, manage, and retain. Get Levrg gives you a managed team across strategy, copy, design, publishing, and reporting, with workflow support already built in." },
    { q: "What does the content look like?", a: "The content is designed to feel professional, useful, and aligned with your firm\u2019s voice. It can include thought leadership posts, educational carousels, service-focused posts, team credibility content, client problem breakdowns, and platform-specific social graphics." },
    { q: "Is the content compliant with professional services regulations?", a: "We build the content workflow around your approval process and industry requirements. Every post can be reviewed before publishing, and we avoid unsupported claims, risky language, or content that does not fit your professional standards." },
    { q: "What if we want to cancel?", a: "You are not locked into a long-term internal hire or a complex agency retainer. The service is designed to give your firm flexible social media capacity without adding permanent headcount." },
    { q: "Do you create content for different practice areas within one firm?", a: "Yes. We can build content around different service lines, practice areas, partner specialties, or audience segments, while keeping the firm\u2019s overall voice and positioning consistent." },
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   SECTION 12  FINAL CTA
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* ════════════════════════════════════════════════════════════════════════════
   12. FAQ SECTION (General targeting — SocialPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralFAQSection() {
  const faqs = [
    {
      q: "How much of my team’s time is required?",
      a: "Very little. We usually need a short kickoff call, occasional input on key topics, and quick approval on planned content. We handle the strategy, writing, design, scheduling, and reporting.",
    },
    {
      q: "What platforms do you post on?",
      a: "We typically support LinkedIn, Instagram, and Facebook. For most B2B teams, LinkedIn is the primary channel because that’s where buyers, partners, and peers are most active.",
    },
    {
      q: "How quickly will we see results?",
      a: "Your first posts usually go live within 14 days. Visibility, engagement, and inbound interest build over time as you publish consistently and your audience gets familiar with your brand.",
    },
    {
      q: "Is this the same as hiring a freelancer or one in-house manager?",
      a: "No. A freelancer or single hire gives you one person and one skill set to manage. Get Levrg gives you a managed team across strategy, copy, design, publishing, and reporting, with the workflow already built in.",
    },
    {
      q: "What kind of content do you create?",
      a: "Thought leadership posts, educational carousels, founder and team content, product and service posts, client-problem breakdowns, platform-specific graphics, and short-form social video.",
    },
    {
      q: "Can I scale posting up or down?",
      a: "Yes. Output scales with your goals and calendar, so you get more flexibility than a fixed in-house hire.",
    },
  ];

  const leftFaqs = faqs.slice(0, 3);
  const rightFaqs = faqs.slice(3, 6);

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
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
                    <AccordionTrigger className="px-6 text-left text-gray-900 font-medium hover:no-underline hover:text-spark-600 transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 text-gray-600 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <Accordion type="single" collapsible className="w-full">
                {rightFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-right-${i}`}>
                    <AccordionTrigger className="px-6 text-left text-gray-900 font-medium hover:no-underline hover:text-spark-600 transition-colors">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 text-gray-600 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
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

export function FinalCTASection() {
  return (
    <section className="py-16 sm:py-24 bg-spark-800">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 sm:text-h1 text-white mb-4">
              Ready to Build a Social Presence <span><br />Your Firm Can Be Proud Of?</span>
            </h2>
            <p className="text-body text-spark-200 leading-relaxed mb-8 max-w-xl mx-auto">
              Turn your firm&apos;s expertise into consistent content, stronger visibility, and more informed inbound conversations. It starts with a focused strategy call.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="ghost" size="lg" className="bg-white text-spark-800 hover:bg-spark-50 hover:text-spark-800 px-8 py-6 text-base font-semibold rounded-xl shadow-lg transition-all" onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}>
                Get Your Social Media Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="ghost" size="lg" className="bg-void hover:bg-surface-dark text-white hover:text-white px-8 py-6 text-base font-semibold rounded-xl border-0 transition-all" onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}>
                <CalendarCheck className="mr-2 h-5 w-5" />
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   MAIN EXPORT
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* ════════════════════════════════════════════════════════════════════════════
   10. FINAL CTA SECTION (General targeting — SocialPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralFinalCTASection() {
  return (
    <section className="py-16 sm:py-24 bg-spark-800">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 sm:text-h1 text-white mb-4">
              Ready to Show Up <span><br />Consistently on Social?</span>
            </h2>
            <p className="text-body text-spark-200 leading-relaxed mb-8 max-w-xl mx-auto">
              Turn your ideas and expertise into consistent content, stronger visibility, and more informed inbound conversations. It starts with a focused strategy call.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="ghost" size="lg" className="bg-white text-spark-800 hover:bg-spark-50 hover:text-spark-800 px-8 py-6 text-base font-semibold rounded-xl shadow-lg transition-all" onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}>
                Get Your Social Media Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="mt-6 text-sm-body text-spark-300">No contracts. No spam. Cancel anytime.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export function SocialPage() {
  return (
    <PageShell
      navItems={[
        { label: "Problems", href: "#problems" },
        { label: "Solution", href: "#solution" },
        { label: "Results", href: "#results" },
        { label: "Process", href: "#process" },
      ]}
      ctaText="Get Your Social Media Team"
      ctaTarget="#lead-form"
      dynamicCta
      meta={{
        title: "Social Media Management | Get Levrg",
        description:
          "A dedicated social media team to handle strategy, copy, design, scheduling, and reporting across LinkedIn, Instagram, and Facebook.",
        keywords:
          "social media management, social media management services, outsource social media, B2B social media management, managed social media team, LinkedIn management",
        ogTitle: "Social Media Management | Get Levrg",
        ogDescription:
          "A dedicated social media team to handle strategy, copy, design, scheduling, and reporting across LinkedIn, Instagram, and Facebook.",
        ogImage: "/images/hero/social-hero.webp",
      }}
    >
      <HeroSection />
      <TrustedByMarquee />
      <GeneralProblemSection />
      <GeneralSEOSection />
      <GeneralSolutionSection />
      {/* <GeneralClientImpactSection /> */}
      <GeneralCostComparisonSection />
      <GeneralHowItWorksSection />
      <GeneralToolsWeUseSection />
      {/* <GeneralWhyChooseUsSection /> */}
      {/* <GeneralROISection /> */}
      <GeneralFinalCTASection />
      <GeneralTestimonialsSection />
      <GeneralFAQSection />
    </PageShell>
  );
}

