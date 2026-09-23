"use client";

import React, { useState, useEffect, useCallback } from "react";
import { INTRO_DURATION, TESTIMONIAL_CAROUSEL_ROTATE_MS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Video,
  AlertTriangle,
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
  ClipboardList,
  UserX,
  Phone,
  ChevronLeft,
  ChevronRight,
  Film,
  Clapperboard,
  Palette,
  Sparkles,
  Play,
  RotateCcw,
} from "lucide-react";
import { useLeadForm } from "@/hooks/useLeadForm";
import { PhoneField } from "@/components/shared/PhoneField";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { TrustedByMarquee } from "@/components/shared/TrustedByMarquee";
import { FaqSchema } from "@/components/shared/FaqSchema";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ════════════════════════════════════════════════════════════════════════════
   INLINE: ToolsWeUseSection (Video only)
   ════════════════════════════════════════════════════════════════════════════ */

interface ToolItem {
  src: string;
  alt: string;
}

const videoTools: ToolItem[] = [
  { src: "/logos/applogos/Adobe-Premiere-Pro.webp", alt: "Premiere Pro" },
  { src: "/logos/applogos/Adobe-After-Effects.webp", alt: "After Effects" },
  { src: "/logos/applogos/Adobe-Photoshop.webp", alt: "Photoshop" },
  { src: "/logos/applogos/Adobe-Illustrator.webp", alt: "Illustrator" },
  { src: "/logos/applogos/Adobe-Audition.webp", alt: "Audition" },
  { src: "/logos/applogos/Adobe-Media-Encoder.webp", alt: "Media Encoder" },
  { src: "/logos/applogos/Adobe-Firefly.svg", alt: "Firefly" },
  { src: "/logos/applogos/InDesign.webp", alt: "InDesign" },
  { src: "/logos/applogos/CapCut.webp", alt: "CapCut" },
  { src: "/logos/applogos/Descript.webp", alt: "Descript" },
  { src: "/logos/applogos/Submagic.webp", alt: "Submagic" },
  { src: "/logos/applogos/HeyGen.webp", alt: "HeyGen" },
  { src: "/logos/applogos/ElevenLabs.webp", alt: "ElevenLabs" },
  { src: "/logos/applogos/Leonardo-AI.webp", alt: "Leonardo AI" },
  { src: "/logos/applogos/Ideogram.webp", alt: "Ideogram" },
  { src: "/logos/applogos/ChatGPT.webp", alt: "ChatGPT" },
  { src: "/logos/applogos/Envato.webp", alt: "Envato" },
  { src: "/logos/applogos/Audacity.webp", alt: "Audacity" },
];

export function ToolsWeUseSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-100">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <AnimatedSection>
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            The Tools We Use to Edit Your Videos
          </h2>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.1}>
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee-left-slow will-change-transform">
            {[...videoTools, ...videoTools].map((tool, i) => (
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

/* ════════════════════════════════════════════════════════════════════════════
   INLINE: WorkSampleBentoGrid (Video only)
   ════════════════════════════════════════════════════════════════════════════ */

interface WorkSample {
  src: string;
  alt: string;
  label: string;
}

const videoSamples: WorkSample[] = [
  { src: "/images/work-samples/socialvideo.webp", alt: "Endless stream of published video content — high-volume video editing output for agencies", label: "Editing Portfolio" },
  { src: "/images/work-samples/high-volume-social-video-editing-team.webp", alt: "High-volume social video editing team producing reels, shorts, and social content", label: "Motion Graphics" },
  { src: "/images/work-samples/shots.webp", alt: "Managed video editing team supporting marketing operations and content production", label: "Production Workflow" },
];

const videoSamplesTitle = { before: "See Our Video", accent: "Editing Work", after: "" };

export function WorkSampleBentoGrid() {
  // "Real results" title/subtitle + carousel removed from all pages.
  return null;
}

/* ════════════════════════════════════════════════════════════════════════════
   INLINE: HeroFormIntro (Video only VideoAnimation + Form swap)
   ════════════════════════════════════════════════════════════════════════════ */

export interface VideoAnimationStat {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  delay: number;
  accent: string;
  iconColor: string;
  valueColor: string;
}

export interface VideoAnimationConfig {
  headerIcon?: React.ComponentType<{ className?: string }>;
  headerTitle?: string;
  stats?: VideoAnimationStat[];
}

const defaultStats: VideoAnimationStat[] = [
  { icon: Film, label: "Long-form Edit", value: "4/mo", delay: 0.5, accent: "bg-sky-50 border-sky-200", iconColor: "text-sky-500", valueColor: "text-sky-700" },
  { icon: Video, label: "Shorts / Reels", value: "12/mo", delay: 0.8, accent: "bg-spark-50 border-spark-200", iconColor: "text-spark-600", valueColor: "text-[#51B027]" },
  { icon: Sparkles, label: "Motion Graphics", value: "8/mo", delay: 1.1, accent: "bg-teal-50 border-teal-200", iconColor: "text-teal-500", valueColor: "text-teal-700" },
  { icon: Palette, label: "Thumbnails", value: "6/mo", delay: 1.4, accent: "bg-amber-50 border-amber-200", iconColor: "text-amber-500", valueColor: "text-amber-700" },
];

export function VideoAnimation({ config }: { config?: VideoAnimationConfig } = {}) {
  const HeaderIcon = config?.headerIcon ?? Clapperboard;
  const headerTitle = config?.headerTitle ?? "Video Production";
  const deliverables = config?.stats ?? defaultStats;

  const timelineClips = [
    { label: "Intro", color: "bg-sky-400", width: "15%", delay: 0.2 },
    { label: "A-Roll", color: "bg-spark-400", width: "35%", delay: 0.5 },
    { label: "B-Roll", color: "bg-rose-400", width: "20%", delay: 0.8 },
    { label: "Outro", color: "bg-amber-400", width: "12%", delay: 1.1 },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      {/* Subtle pattern bg */}
      <div className="absolute inset-0 opacity-[0.03] bg-dot-pattern" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative flex items-center gap-2 mb-5"
      >
        <div className="w-7 h-7 rounded-lg bg-spark-100 flex items-center justify-center">
          <HeaderIcon className="h-3.5 w-3.5 text-spark-600" />
        </div>
        <span className="text-sm font-semibold text-gray-900 tracking-wide">{headerTitle}</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] text-red-500 font-medium">REC</span>
        </div>
      </motion.div>

      {/* Video Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative rounded-xl bg-gradient-to-br from-spark-50 to-sky-50 border border-spark-200 mb-4 overflow-hidden"
      >
        <div className="aspect-video flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-spark-100/40 to-sky-100/40" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
            className="w-12 h-12 rounded-full bg-white border-2 border-spark-300 flex items-center justify-center shadow-lg z-10"
          >
            <Play className="h-5 w-5 text-spark-600 ml-0.5" />
          </motion.div>
          {/* Timecode */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-gray-900/70 text-[10px] font-mono text-white/90"
          >
            00:02:34 / 00:08:12
          </motion.div>
        </div>
      </motion.div>

      {/* Editing Timeline */}
      <div className="mb-4">
        <p className="text-[11px] text-gray-500 mb-2 font-medium">Timeline</p>
        <div className="relative">
          <div className="flex items-stretch gap-0.5 h-7 rounded-lg overflow-hidden bg-gray-100">
            {timelineClips.map((clip) => (
              <motion.div
                key={clip.label}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: clip.delay, ease: "easeOut" }}
                style={{ width: clip.width, transformOrigin: "left" }}
                className={`${clip.color} flex items-center justify-center relative`}
              >
                <span className="text-[9px] font-semibold text-white/90 z-10">{clip.label}</span>
              </motion.div>
            ))}
          </div>
          {/* Playhead */}
          <div className="relative h-0">
            <motion.div
              initial={{ left: "0%" }}
              animate={{ left: "82%" }}
              transition={{ duration: 4, delay: 1.5, ease: "linear" }}
              className="absolute -top-[34px] w-0.5 h-[34px] bg-red-500 z-20"
            />
          </div>
        </div>
      </div>

      {/* Deliverable Stats */}
      <div className="grid grid-cols-2 gap-2">
        {deliverables.map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: d.delay + 1.5, type: "spring", stiffness: 200 }}
              className={`p-2.5 rounded-xl border ${d.accent}`}
            >
              <Icon className={`h-3 w-3 ${d.iconColor} mb-1`} />
              <p className={`text-sm font-bold ${d.valueColor} leading-none`}>{d.value}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">{d.label}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function HeroFormIntro({ children, animation }: { children: React.ReactNode; animation?: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [introKey, setIntroKey] = useState(0);

  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, INTRO_DURATION);
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
            {animation ?? <VideoAnimation />}
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

            {/* Floating Replay Button */}
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
    <section
      id="lead-form"
      className="relative overflow-hidden bg-white min-h-[500px] sm:min-h-[680px]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/video-hero.webp"
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8"
            >
              <Zap className="h-3.5 w-3.5 text-spark-300" />
              <span className="text-sm-body font-medium text-white">
                Video Editing Services
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-h1 sm:text-display lg:text-display-sm text-white mb-6"
            >
              Managed Video Editing for Teams That Need More

              <br />
              <span className="text-[#51B027]">
                Content Out the Door
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body sm:text-sub text-gray-300 max-w-2xl mb-8"
            >
              Get a dedicated video editing team that handles the editing, project management, quality checks, and turnaround. You bring the footage and the goals. We keep the content shipping.
            </motion.p>

            {/* Metrics bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10"
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
                    className="inline-flex items-center gap-2 text-sm-body font-medium text-gray-200 bg-white/10 border border-white/20 px-3.5 py-2 rounded-lg"
                  >
                    <Icon className="h-4 w-4 text-spark-400" />
                    {m.text}
                  </span>
                );
              })}
            </motion.div>

            {/*  */}
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
                <span className="ml-2 text-caption text-spark-300">
                  
                </span>
              </div>
              <p className="text-sm-body sm:text-body text-gray-200 italic mb-3">
                &ldquo;Levrg feels like part of our team. Seamless, reliable, and
                essential for scaling.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/images/client/sara-murray.webp"
                  alt="Sara Murray"
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm-body font-semibold text-white">Sara Murray</p>
                  <p className="text-xs text-gray-400">CEO | Sara Murray Inc.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN FORM WITH INTRO ANIMATION */}
          <HeroFormIntro>
            <div className="rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8">

              <div className="mb-6 text-center">
                <h2 className="text-sub font-bold text-gray-900 mb-1.5">
                  Let&apos;s Start Today
                </h2>

              </div>

              <form id="video-hero-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="hero-firstName" className="text-sm-body text-gray-700 mb-1.5">
                      First Name
                    </Label>
                    <Input id="hero-firstName" placeholder="" className="h-10" {...register("firstname")} />
                    {errors.firstname && <p className="text-sm-body text-error mt-1">{errors.firstname.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="hero-lastName" className="text-sm-body text-gray-700 mb-1.5">
                      Last Name
                    </Label>
                    <Input id="hero-lastName" placeholder="" className="h-10" {...register("lastname")} />
                    {errors.lastname && <p className="text-sm-body text-error mt-1">{errors.lastname.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="hero-workEmail" className="text-sm-body text-gray-700 mb-1.5">
                    Email
                  </Label>
                  <Input id="hero-workEmail" type="email" placeholder="" className="h-10" {...register("email")} />
                  {errors.email && <p className="text-sm-body text-error mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <Label htmlFor="hero-phoneNumber" className="text-sm-body text-gray-700 mb-1.5">
                    Phone Number
                  </Label>
                  <PhoneField id="hero-phoneNumber" control={control} />
                  {errors.phone && <p className="text-sm-body text-error mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <Label htmlFor="hero-company" className="text-sm-body text-gray-700 mb-1.5">
                    Company
                  </Label>
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
   2. PROBLEMS SECTION
   ════════════════════════════════════════════════════════════════════════════ */
export function ProblemSection() {
  const problems = [
    {
      icon: Video,
      title: "The Capacity Trap",
      headline: "Your Clients Want More Video",
      body: "Video demand is outpacing your team\u2019s capacity by 3x. Every project you turn down is revenue walking out the door.",
      painPoint: "Every hour spent editing is an hour NOT spent on strategy, client relationships, or growth.",
    },
    {
      icon: UserX,
      title: "The Hiring Nightmare",
      headline: "Hiring a Full-Time Editor Costs More Than You Think",
      body: "A full-time video editor in North America runs $6,500+/month with benefits, taxes, and overhead. Then there\u2019s the 3-month ramp-up before they\u2019re productive.",
      painPoint: "That\u2019s $20K+ spent before your first real deliverable.",
    },
    {
      icon: AlertTriangle,
      title: "The Freelancer Problem",
      headline: "Freelancers Are Unreliable at Scale",
      body: "Ghosting before deadlines. Inconsistent quality. Different styles on every project. You spend 10+ hours per week managing people who should be managing themselves.",
      painPoint: "You didn\u2019t start an agency to become a freelance project manager.",
    },
  ];

  return (
    <section id="problems" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900 max-w-3xl mx-auto">
            You&apos;re Facing the Same Bottleneck That{" "}
            <span className="text-[#51B027]"> <br />35+ Agencies Already Solved</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="space-y-6" staggerDelay={0.1}>
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <StaggerItem key={i}>
                <div className="relative p-6 sm:p-8 rounded-xl bg-white border border-gray-100 border-l-4 border-l-red-400 hover:shadow-lg transition-shadow duration-300 group">
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-500 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-caption text-gray-400 mb-1">
                        {problem.title}
                      </p>
                      <h3 className="text-sub font-bold text-gray-900 mb-3">{problem.headline}</h3>
                      <p className="text-gray-600 mb-4 text-sm-body sm:text-body">
                        {problem.body}
                      </p>
                      <div className="inline-flex items-start gap-2 px-4 py-3 rounded-lg bg-red-50/50 border border-red-100 text-red-700 text-sm-body">
                        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                        <span className="font-medium">{problem.painPoint}</span>
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
   1. PROBLEMS SECTION (General targeting — VideoPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralProblemSection() {
  const problems = [
    {
      icon: Video,
      headline: "Video Demand Is Outpacing Your Team",
      body: "Every channel in your plan now expects video. It’s the most requested, least resourced format on the calendar, so good ideas sit unpublished while the backlog grows.",
    },
    {
      icon: UserX,
      headline: "In-House Hiring Doesn’t Fix It Fast Enough",
      body: "A full-time editor runs $6,500+/month before benefits, plus a 90-day ramp. That’s a budget committed long before you see a single deliverable.",
    },
    {
      icon: AlertTriangle,
      headline: "Freelancers Need More Managing",
      body: "Every new freelancer means re-explaining your brand, chasing revisions, and quality that swings from project to project. You end up managing the manager.",
    },
  ];

  return (
    <section id="problems" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900 max-w-3xl mx-auto">
            You&apos;re Facing the Same Bottleneck{" "}
            <span className="text-[#51B027]"> <br />40+ B2B Companies Already Solved</span>
          </h2>
        </AnimatedSection>

        <StaggerContainer className="space-y-6" staggerDelay={0.1}>
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <StaggerItem key={i}>
                <div className="relative p-6 sm:p-8 rounded-xl bg-white border border-gray-100 border-l-4 border-l-red-400 hover:shadow-lg transition-shadow duration-300 group">
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-500 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sub font-bold text-gray-900 mb-3">{problem.headline}</h3>
                      <p className="text-gray-600 text-sm-body sm:text-body">
                        {problem.body}
                      </p>
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
   3. SOLUTION SECTION
   ════════════════════════════════════════════════════════════════════════════ */
export function SolutionSection() {
  const differentiators = [
    {
      icon: Shield,
      title: "Agency-Grade Output Without Agency-Level Overhead",
      desc: "Dedicated team with proven workflows refined across 35+ agency partnerships. Quality guarantees with built-in revision rounds.",
    },
    {
      icon: Zap,
      title: "Live in 7 Days, Not 7 Months",
      desc: "24-hour talent matching based on your niche. Onboarding call within 48 hours. First deliverables by end of week one.",
    },
    {
      icon: DollarSign,
      title: "Lower Overhead Than Hiring In-House",
      desc: "Get reliable editing capacity without payroll, benefits, recruiting delays, or full-time headcount commitments.",
    },
    {
      icon: UserCheck,
      title: "Managed Team, Zero Management",
      desc: "Your dedicated project manager owns briefs, deadlines, quality checks, and delivery coordination. You stay focused on content strategy and client relationships.",
    },
  ];

  return (
    <section id="solution" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Why Choose Between Speed, Cost and Quality?
            <br />
            <span className="text-[#51B027]">Get All Three</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            We recruit the top 1% of offshore video editors with agency experience, strong portfolios, and clear communication skills. Then we manage the workflow, deadlines, and quality checks, so you get reliable output without managing another team.
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

/* ════════════════════════════════════════════════════════════════════════════
   3. SOLUTION SECTION (General targeting — VideoPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralSolutionSection() {
  const differentiators = [
    {
      icon: Shield,
      title: "Dedicated Team That Learns Your Brand",
      desc: "The same PM and video team own your account, so context doesn’t get re-explained on every request.",
    },
    {
      icon: Zap,
      title: "Launch in 14 Days",
      desc: "Talent onboarded in the first week. Deliverables start flowing from week two.",
    },
    {
      icon: UserCheck,
      title: "One Owner, Full Accountability",
      desc: "A dedicated PM runs briefs, quality, and delivery, so your output never depends on any single person’s calendar.",
    },
    {
      icon: DollarSign,
      title: "Lower Overhead Than In-House",
      desc: "Reliable editing capacity without payroll, benefits, recruiting delays, or a full-time commitment.",
    },
  ];

  return (
    <section id="solution" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Why Choose Between Speed, Cost and Quality?
            <br />
            <span className="text-[#51B027]">Get All Three</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            We recruit the top 1% of video editors with real B2B content experience, then run the workflow, deadlines, and quality checks. <br />You get reliable output without putting one more person on your plate to manage.
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

/* ════════════════════════════════════════════════════════════════════════════
   3b. SEO SECTION  2-col: checklist left + bento image grid right
   ════════════════════════════════════════════════════════════════════════════ */
export function SEOSection() {
  const capabilities = [
    "Short-form video editing for Reels, Shorts, and TikTok",
    "Long-form YouTube and podcast editing",
    "B2B product demo videos",
    "Social media video production",
    "Motion graphics and branded video assets",
    "White label video editing for agencies",
    "Ongoing video editing support for marketing teams",
  ];

  const bentoImages = [
    { src: "/images/work-samples/socialvideo.webp", alt: "Endless stream of published video content from a dedicated editing team", span: "row-span-2" },
    { src: "/images/work-samples/high-volume-social-video-editing-team.webp", alt: "High-volume social video editing team delivering reels and short-form content", span: "" },
    { src: "/images/work-samples/podcast.webp", alt: "Professional video production workflow and editing studio setup", span: "" },
    { src: "/images/work-samples/shots.webp", alt: "Managed video editing team supporting marketing operations and client campaigns", span: "col-span-2" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-5">
            Video Editing Services Built for <br />
            <span className="text-[#51B027]">High-Volume Content Teams</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
             Get Levrg gives you a
            managed video editing team that can support recurring content production across
            social, YouTube, paid media, sales enablement, and client campaigns.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT content + checklist */}
          <div>
            <AnimatedSection className="mb-8" delay={0.2}>
              <p className="text-body text-gray-600">
                Get Levrg gives you a professional video team that can support:
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
                You bring the content goals. We bring the editors, workflow, project management,
                and production rhythm to keep publishing consistent.
              </p>
            </AnimatedSection>
          </div>

          {/* RIGHT bento image grid */}
          <AnimatedSection delay={0.15} direction="left">
            <div className="grid grid-cols-2 grid-rows-3 gap-3 sm:gap-4 h-[480px] sm:h-[560px]">
              {bentoImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 group ${img.span}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* subtle gradient overlay */}
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
   2. CAPABILITIES / SEO SECTION (General targeting — VideoPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralSEOSection() {
  const capabilities = [
    "Short-form video editing for Reels, Shorts, and TikTok",
    "Long-form YouTube and podcast editing",
    "Social media video production",
    "B2B product demo and explainer videos",
    "Motion graphics and branded video assets",
    "White-label video editing for agencies",
  ];

  const bentoImages = [
    { src: "/images/work-samples/socialvideo.webp", alt: "Endless stream of published video content from a dedicated editing team", span: "row-span-2" },
    { src: "/images/work-samples/high-volume-social-video-editing-team.webp", alt: "High-volume social video editing team delivering reels and short-form content", span: "" },
    { src: "/images/work-samples/podcast.webp", alt: "Professional video production workflow and editing studio setup", span: "" },
    { src: "/images/work-samples/shots.webp", alt: "Managed video editing team supporting marketing operations and client campaigns", span: "col-span-2" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="text-center mb-6">
          <h2 className="text-h2 sm:text-h1 text-gray-900 mb-5">
            Video Editing Services Built for <br />
            <span className="text-[#51B027]">High-Volume Content Teams</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Need more video without adding another full-time hire? Get Levrg gives you a
            managed video editing team for recurring production across all your social platforms.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT content + checklist */}
          <div>
            <AnimatedSection className="mb-8" delay={0.2}>
              <p className="text-body text-gray-600">
                Get Levrg gives you a professional video team that can support:
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
                You bring the content goals. We bring the editors, workflow, project management,
                and production rhythm to keep publishing consistent.
              </p>
            </AnimatedSection>
          </div>

          {/* RIGHT bento image grid */}
          <AnimatedSection delay={0.15} direction="left">
            <div className="grid grid-cols-2 grid-rows-3 gap-3 sm:gap-4 h-[480px] sm:h-[560px]">
              {bentoImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 group ${img.span}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* subtle gradient overlay */}
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
   4. ROI / RESULTS SECTION
   ════════════════════════════════════════════════════════════════════════════ */
export function RoiSection() {
  const stats = [
    {
      value: "5x",
      label: "Faster at 1/20th the Cost",
      author: "Brendan Taylor, CEO | Maverick VFX",
    },
    {
      value: "10%",
      label: "Total Employee Costs Cut",
      author: "Steven Riskey, CEO | Strop Insights",
    },
    {
      value: "$500/hr \u2192 $20/hr",
      label: "Scale Your Strategy",
      author: "Miles Kaiburn, CEO | Old Town Media",
    },
  ];

  return (
    <section id="results" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            What <span className="text-[#51B027]">35+ Agencies</span> Have Already Proven
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="h-full p-8 rounded-xl border border-gray-100 bg-white text-center group hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center">
                <div className="text-h1 sm:text-h2 lg:text-display-sm text-[#51B027] mb-4">
                  {stat.value}
                </div>
                <p className="text-gray-900 text-sub font-semibold mb-3">{stat.label}</p>
                <p className="text-gray-500 text-sm-body">&mdash; {stat.author}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   4. WHY OUR CLIENTS WORK WITH US SECTION (General targeting — VideoPage only, hidden)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralROISection() {
  const stats = [
    {
      value: "Up to 80%",
      label: "Lower Cost Than an In-House Hire",
    },
    {
      value: "5x",
      label: "More Videos Per Month, No New Hires",
    },
    {
      value: "40+",
      label: "B2B Partnerships Across North America",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
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

/* ════════════════════════════════════════════════════════════════════════════
   5. COMPARISON SECTION
   ════════════════════════════════════════════════════════════════════════════ */
export function ComparisonSection() {
  const rows = [
    { label: "Monthly Cost", na: "$6,500+", us: "Up to 80% less" },
    { label: "Setup Timeline", na: "3 months", us: "14 days" },
    { label: "Ramp-Up", na: "90 days", us: "Week 1" },
    { label: "Benefits", na: "Included (expensive)", us: "Not included (saves you)" },
    { label: "Management", na: "Full supervision required", us: "Dedicated PM owns it" },
    { label: "Scalability", na: "Fixed headcount", us: "Add roles on demand" },
    { label: "Risk", na: "Single point of failure", us: "Managed team backup" },
    { label: "Contracts", na: "2-year contract", us: "No lock-in" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Hire in North America vs{" "}
            <span className="text-[#51B027]">Partner With Us</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-6 py-4 bg-gray-50 text-gray-600 font-semibold w-1/3 border-b border-gray-200">
                    Factor
                  </th>
                  <th className="text-left px-6 py-4 bg-gray-50 text-gray-600 font-semibold w-1/3 border-b border-gray-200">
                    Hire in North America
                  </th>
                  <th className="text-left px-6 py-4 bg-spark-50 text-sm-body text-[#51B027] font-semibold w-1/3 border-b border-spark-200">
                    Partner With Us
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{row.label}</td>
                    <td className="px-6 py-4 text-left text-gray-500">
                      <div className="flex items-left justify-left gap-2">
                        <X className="h-4 w-4 text-red-400 shrink-0" />
                        <span>{row.na}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-left text-sm-body text-[#51B027] font-medium bg-spark-50/50">
                      <div className="flex items-left justify-left gap-2">
                        <CheckCircle className="h-4 w-4 text-spark-500 shrink-0" />
                        <span>{row.us}</span>
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
   5. THE REAL COST OF HIRING SECTION (General targeting — VideoPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralComparisonSection() {
  const hireInHouse = [
    { title: "$6,500+ per month", desc: "Before benefits and payroll" },
    { title: "3 months to hire", desc: "Plus a 90-day ramp to output" },
    { title: "Full supervision required", desc: "You manage the work daily" },
    { title: "2-year contract, fixed headcount", desc: "One person, single point of failure" },
  ];

  const partnerWithUs = [
    { title: "Up to 80% lower cost", desc: "No benefits, payroll, or overhead" },
    { title: "Live in 14 days", desc: "Full team onboarded in week one" },
    { title: "Dedicated PM owns delivery", desc: "No supervision on your side" },
    { title: "Scale on demand, no lock-in", desc: "Add roles as you grow" },
  ];

  return (
    <section id="results" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            The Real Cost of <span className="text-[#51B027]">Hiring</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection direction="left">
            <div className="p-6 sm:p-8 rounded-xl border border-red-200 bg-white h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-500">
                  <X className="h-5 w-5" />
                </div>
                <h3 className="text-sub font-bold text-red-600">Hire In-House</h3>
              </div>
              <ul className="space-y-4">
                {hireInHouse.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 font-medium">{item.title}</p>
                      <p className="text-sm-body text-gray-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-red-50/50 border border-red-100">
                <p className="text-sm text-red-600 font-medium">High fixed cost, slow to start, hard to scale.</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="p-6 sm:p-8 rounded-xl border border-spark-200 bg-white h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-spark-50 text-spark-600">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="text-sub font-bold text-[#51B027]">Partner With Us</h3>
              </div>
              <ul className="space-y-4">
                {partnerWithUs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-spark-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-900 font-medium">{item.title}</p>
                      <p className="text-sm-body text-gray-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-spark-50/50 border border-spark-100">
                <p className="text-sm-body text-[#51B027] font-medium">One managed team for less than a single hire.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   6. HOW IT WORKS SECTION
   ════════════════════════════════════════════════════════════════════════════ */
export function HowItWorksSection() {
  const steps = [
    {
      title: "Submit Your Brief",
      timeline: "Day 1",
      desc: "10 minutes is all it takes. Share your requirements, brand guidelines, and content goals.",
    },
    {
      title: "Meet Your Team",
      timeline: "Day 2-3",
      desc: "Intro call with your dedicated PM. Workflow setup, tool access, and communication channels configured.",
    },
    {
      title: "First Deliverables",
      timeline: "Day 7",
      desc: "Brand-compliant edits delivered. Revision rounds included. Production-grade quality from day one.",
    },
    {
      title: "Scale On Your Terms",
      timeline: "Week 2+",
      desc: "Monthly flexibility. Scale up for big campaigns or down during slow periods. No penalties.",
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Live in One Week{" "}
            <span className="text-[#51B027]">Not One Quarter</span>
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

/* ════════════════════════════════════════════════════════════════════════════
   7. HOW IT WORKS SECTION (General targeting — VideoPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralHowItWorksSection() {
  const steps = [
    {
      title: "Submit Your Brief",
      timeline: "Day 1",
      desc: "10 minutes is all it takes. Share your requirements, brand guidelines, and content goals.",
    },
    {
      title: "Meet Your PM",
      timeline: "Day 2-3",
      desc: "Intro call with your dedicated PM to set up the workflow, tool access, and communication channels.",
    },
    {
      title: "Processes Go Live",
      timeline: "End of Week 1",
      desc: "Your project and processes are live.",
    },
    {
      title: "First Deliverables",
      timeline: "Week 2",
      desc: "Brand-compliant edits, production at full speed, revisions included.",
    },
    {
      title: "Scale On Your Terms",
      timeline: "Week 2+",
      desc: "Monthly flexibility. Scale up for big campaigns or down during slow periods. No penalties.",
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Two Weeks,{" "}
            <span className="text-[#51B027]">Not Two Quarters</span>
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

/* ════════════════════════════════════════════════════════════════════════════
   7. TESTIMONIALS SECTION
   ════════════════════════════════════════════════════════════════════════════ */
const videoTestimonials = [
  {
    quote: "We added video as a service line without hiring a single editor. Our margins went up 40% on video projects in the first quarter.",
    name: "Miles Kaiburn",
    image: "/images/client/miles-kaiburn.webp",
    title: "CEO",
    company: "Old Town Media",
  },
  {
    quote: "The quality is indistinguishable from our in-house team. Our clients never know the difference, and our margins have never been better.",
    name: "Brendan Taylor",
    image: "/images/client/brendan-taylor.webp",
    title: "CEO",
    company: "Maverick VFX",
  },
  {
    quote: "We went from turning down video projects to fulfilling them all. This team handles everything  we just approve and deliver.",
    name: "Steven Riskey",
    image: "/images/client/steven-riskey.webp",
    title: "CEO",
    company: "Strop Insights",
  },
  {
    quote: "I was skeptical about offshore talent. After week one, I realized these editors are more skilled than most people I interviewed locally at 3x the price.",
    name: "Rachel Chen",
    image: "/images/client/jeff-klaumann.webp",
    title: "Creative Director",
    company: "Prism Agency",
  },
  {
    quote: "Onboarding took 3 days, not 3 months. Our first deliverables were client-ready by the end of week one. I wish we had done this sooner.",
    name: "David Park",
    image: "/images/client/joseph-p-meyer.webp",
    title: "Founder",
    company: "Northstar Digital",
  },
];

// These five clients are all creative/media agencies, so the company name is
// only genuinely representative on the /video-agencies page. Every quote's
// own text is industry-neutral, so on other variants we keep the quote and
// title but drop the specific (mismatched) company name rather than show a
// media company's name on, say, a law firm's video-editing landing page.
export function TestimonialsSection({ industry }: { industry?: string } = {}) {
  const testimonials = videoTestimonials.map((t) => ({
    ...t,
    company: !industry || industry === "agencies" ? t.company : null,
  }));

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, TESTIMONIAL_CAROUSEL_ROTATE_MS);
    return () => clearInterval(timer);
  }, [testimonials.length]);

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
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Agencies Don&apos;t{" "}
            <span className="text-[#51B027]">Look Back</span>
          </h2>
        </AnimatedSection>

        <div className="relative">
          {/* Arrow buttons */}
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

          {/* Testimonial card */}
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
                className="p-8 sm:p-10 rounded-2xl border border-gray-100 bg-white shadow-sm"
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
                      <p className="text-sl text-gray-500">{t.title}{t.company && <> &middot; {t.company}</>}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
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
                  className={`h-2 rounded-full transition-all duration-300 block ${
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
   9. TESTIMONIALS SECTION (General targeting — VideoPage only)
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
      quote: "We started on Wednesday and Get Levrg was delivering real value by Monday. That speed changed everything.",
      name: "Phil Wittmer",
      image: "/images/client/phil-wittmer.webp",
      title: "Director of Marketing",
      company: "Velosio",
    },
    {
      quote: "Flawless teamwork. Get Levrg made everything smooth and effortless.",
      name: "Aizat Paharodzi",
      image: "/images/client/aizat-paharodzi.webp",
      title: "Creative Video Lead",
      company: "2X",
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
  }, [testimonials.length]);

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
          {/* Arrow buttons */}
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

          {/* Testimonial card */}
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
                className="p-8 sm:p-10 rounded-2xl border border-gray-100 bg-white shadow-sm"
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
                      <p className="text-sl text-gray-500">{t.title}{t.company && <> &middot; {t.company}</>}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
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
                  className={`h-2 rounded-full transition-all duration-300 block ${
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
   8. WHY CHOOSE US SECTION
   ════════════════════════════════════════════════════════════════════════════ */
export function WhyChooseUsSection() {
  const items = [
    {
      icon: Trophy,
      title: "Proven Track Record",
      desc: "35+ agencies trust us with their video output. We\u2019ve delivered thousands of edits with a 98% satisfaction rate.",
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      desc: "Your dedicated PM is a Slack message away. No ticket queues, no offshore call centers  real humans, real time.",
    },
    {
      icon: UserCheck,
      title: "Vetted Talent Only",
      desc: "Every editor passes a portfolio review, a skills test, and an English fluency check. We hire under 1% of applicants, so their skill is never something you have to worry about.",
    },
    {
      icon: Rocket,
      title: "Built for Scale",
      desc: "Start with one editor. Scale to a full team. Same workflow, same PM, same quality  just more capacity when you need it.",
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

/* ════════════════════════════════════════════════════════════════════════════
   6. WHY CHOOSE US / DEDICATED TEAM SECTION (General targeting — VideoPage only, hidden)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralWhyChooseUsSection() {
  const items = [
    {
      icon: Trophy,
      title: "Proven Track Record",
      desc: "40+ B2B teams trust us with their video output. We've delivered videos with a 98% satisfaction and 99% on-time publish rate.",
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      desc: "Your dedicated PM is a Slack message away.",
    },
    {
      icon: UserCheck,
      title: "Vetted Talent Only",
      desc: "Every editor passes a rigorous portfolio review, skills test, and English fluency check.",
    },
    {
      icon: Rocket,
      title: "Built for Scale",
      desc: "As your video starts performing, you’ll want more of it. Add editors and expand your team on demand; same PM, same workflow, same quality, just more output.",
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

/* ════════════════════════════════════════════════════════════════════════════
   9. FAQ SECTION
   ════════════════════════════════════════════════════════════════════════════ */
export function FAQSection() {
  const faqs = [
    {
      q: "How fast can my video editing team be up and running?",
      a: "Most teams can start within 7 days. We use the first few days to understand your brand, content goals, editing style, review process, and publishing needs. From there, your project manager sets up the workflow and starts moving the first deliverables through production.",
    },
    {
      q: "What types of videos can your team edit?",
      a: "We support short-form social videos, YouTube videos, podcast clips, product demos, B2B explainers, promotional videos, motion graphics, thumbnails, and recurring social video content. The service is built for teams that need consistent video output, not one-off editing help.",
    },
    {
      q: "Is this the same as hiring a freelance video editor?",
      a: "No. A freelancer usually gives you one person to manage. Get Levrg gives you a managed video editing service with vetted editors, project management, quality checks, and backup capacity. That means fewer missed deadlines and less day-to-day coordination for your team.",
    },
    {
      q: "Can agencies use this as white label video editing?",
      a: "Yes. Agencies can use Get Levrg as a white label video editing partner for client campaigns, social content, YouTube production, podcast clips, and recurring video deliverables.",
    },
    {
      q: "How do you keep videos on-brand?",
      a: "We start with your brand guidelines, examples, editing preferences, and feedback loops. Your dedicated project manager keeps those standards documented, so each new edit becomes easier to brief, review, and approve.",
    },
    {
      q: "Can I scale video output up or down?",
      a: "Yes. The team can scale based on campaign volume, client demand, and monthly production needs. That gives you more flexibility than fixed in-house hiring.",
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

/* ════════════════════════════════════════════════════════════════════════════
   10. FAQ SECTION (General targeting — VideoPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralFAQSection() {
  const faqs = [
    {
      q: "How fast can my video editing team be up and running?",
      a: "Most teams start within 7 days. Full production ramps to a steady weekly rhythm by day 14. We use the first few days to learn your brand, content goals, editing style, and review process.",
    },
    {
      q: "What types of videos can your team edit?",
      a: "Short-form social videos, YouTube videos, podcast clips, product demos, explainers, promotional videos, motion graphics, thumbnails, and recurring social content. The service is built for teams that need consistent output, not one-off help.",
    },
    {
      q: "Is this the same as hiring a freelance video editor?",
      a: "No. A freelancer gives you one person to manage. Get Levrg gives you a managed video editing service with vetted editors, project management, quality checks, and backup capacity, so you’re not the one chasing revisions.",
    },
    {
      q: "Does this replace our in-house team?",
      a: "It extends it. Most teams use us for overflow and recurring production so in-house staff can stay focused on strategy and higher-priority work.",
    },
    {
      q: "Can agencies use this as white-label video editing?",
      a: "Yes. Agencies use Get Levrg as a white-label partner for client campaigns, social content, YouTube, podcast clips, and recurring deliverables. Clients see your brand, not ours.",
    },
    {
      q: "Can I scale video output up or down?",
      a: "Yes. The team scales with your campaign volume and monthly production needs, so you get more flexibility than fixed in-house hiring.",
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

/* ════════════════════════════════════════════════════════════════════════════
   10. FINAL CTA SECTION
   ════════════════════════════════════════════════════════════════════════════ */
export function FinalCTASection() {
  const scrollToHero = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-16 sm:py-24 bg-spark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-h2 sm:text-h1 text-white mb-6">
            Ready to Stop{" "}
            <span>Managing Freelancers?</span>
          </h2>
          <p className="text-body text-spark-200 max-w-2xl mx-auto mb-10">
            Your dedicated video editing team is one form away. Get custom pricing
            and a proposed team structure in 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="ghost"
              onClick={scrollToHero}
              className="bg-white text-spark-800 hover:bg-spark-50 hover:text-spark-800 px-8 py-6 text-base rounded-xl shadow-lg transition-all hover:shadow-xl"
            >
              Get Your Video Editing Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={scrollToHero}
              className="bg-void hover:bg-surface-dark text-white hover:text-white px-8 py-6 text-base rounded-xl border-0 transition-all"
            >
              <Phone className="mr-2 h-4 w-4" />
              Schedule a Call
            </Button>
          </div>
          <p className="text-sm-body text-spark-300 mt-6">
            No contracts. No spam. Cancel anytime.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   8. FINAL CTA SECTION (General targeting — VideoPage only)
   ════════════════════════════════════════════════════════════════════════════ */
function GeneralFinalCTASection() {
  const scrollToHero = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-16 sm:py-24 bg-spark-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-h2 sm:text-h1 text-white mb-6">
            Ready to Get More{" "}
            <span>Content Out the Door?</span>
          </h2>
          <p className="text-body text-spark-200 max-w-2xl mx-auto mb-10">
            Your dedicated video editing team is one form away. Get custom pricing
            and a proposed team structure in 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="ghost"
              onClick={scrollToHero}
              className="bg-white text-spark-800 hover:bg-spark-50 hover:text-spark-800 px-8 py-6 text-base rounded-xl shadow-lg transition-all hover:shadow-xl"
            >
              Get Your Video Editing Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

          </div>
          <p className="text-sm-body text-spark-300 mt-6">
            No contracts. No spam. Cancel anytime.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   EXPORT: VideoPage
   ════════════════════════════════════════════════════════════════════════════ */

export function VideoPage() {
  return (
    <PageShell
      navItems={[
        { label: "Problems", href: "#problems" },
        { label: "Solution", href: "#solution" },
        { label: "Why Us", href: "#results" },
        { label: "Process", href: "#process" },
      ]}
      ctaText="Get Your Video Editing Team"
      ctaTarget="#lead-form"
      dynamicCta
      meta={{
        title: "Managed Video Editing Services | Get Levrg",
        description:
          "A dedicated video editing team that handles the editors, project management, quality checks, and turnaround, so your team publishes more.",
        keywords:
          "video editing services, video editing outsourcing, hire a video editor, social media video editing, managed video editing team",
        ogTitle: "Managed Video Editing Services | Get Levrg",
        ogDescription:
          "A dedicated video editing team that handles the editors, project management, quality checks, and turnaround, so your team publishes more.",
        ogImage: "/images/hero/video-hero.webp",
      }}
    >
      <HeroSection />
      <TrustedByMarquee />
      <GeneralProblemSection />
      <GeneralSEOSection />
      <GeneralSolutionSection />
      <ToolsWeUseSection />
      {/* <GeneralROISection /> */}
      <WorkSampleBentoGrid />
      <GeneralComparisonSection />
      {/* <GeneralWhyChooseUsSection /> */}
      <GeneralHowItWorksSection />
      <GeneralFinalCTASection />
      <GeneralTestimonialsSection />
      <GeneralFAQSection />
    </PageShell>
  );
}

