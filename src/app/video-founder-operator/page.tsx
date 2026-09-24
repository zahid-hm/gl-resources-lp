"use client";

import React, { useState, useEffect } from "react";
import { workSampleSrcSet, WORK_SAMPLE_SIZES } from "@/lib/responsive-image";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIAL_CAROUSEL_ROTATE_MS } from "@/lib/constants";
import {
  ArrowRight, Zap, TrendingUp, Shield, Star, Lock, Mail,
  User, Film, Video, Sparkles, Palette,
  UserX, Users,
  CheckCircle, Archive,
  Trophy, MessageCircle, UserCheck, Rocket,
  Quote, ChevronLeft, ChevronRight,
  ClipboardList, Clock, Phone,
} from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/shared/AnimatedSection";
import { PageShell } from "@/components/layout/PageShell";
import { TrustedByMarquee } from "@/components/shared/TrustedByMarquee";
import { FaqSchema } from "@/components/shared/FaqSchema";
import { PhoneField } from "@/components/shared/PhoneField";
import { useLeadForm } from "@/hooks/useLeadForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  VideoAnimation,
  HeroFormIntro,
  ToolsWeUseSection,
  WorkSampleBentoGrid,
  ComparisonSection,
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
      <div className="absolute inset-0">
        <img src="/images/hero/video-founder-operator.webp" srcSet="/images/hero/video-founder-operator-sm.webp 800w, /images/hero/video-founder-operator.webp 1440w" sizes="100vw" width="1440" height="804"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#061512]/95 via-[#061512]/70 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">

          <div className="lg:col-span-3">
            <div className="gl-reveal gl-dur5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
              <Zap className="h-3.5 w-3.5 text-spark-300" />
              <span className="text-sm-body font-medium text-white">
                Video Editing for Founder-Led Businesses
              </span>
            </div>

            <h1 className="gl-reveal gl-d1 text-h1 sm:text-display lg:text-display-sm text-white mb-6">
              Record It
              <br />
              <span className="text-[#51B027]">
                We Handle The Rest
              </span>
            </h1>

            <p className="gl-reveal gl-d2 text-body sm:text-sub text-gray-300 max-w-2xl mb-8">
              One recording becomes a week of content, and you don&apos;t touch a step after you hit stop.
            </p>

            <div className="gl-reveal gl-d3 flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              {[
                { icon: Zap, text: "Launch in 14 Days" },
                { icon: UserCheck, text: "Dedicated Editing Team" },
                { icon: TrendingUp, text: "No Full-Time Hire Needed" },
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

            <div className="gl-reveal gl-d4 relative p-5 sm:p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm max-w-2xl">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 text-spark-500 fill-spark-500" />
                ))}
                <span className="ml-2 text-caption text-spark-300"></span>
              </div>
              <p className="text-sm-body sm:text-body text-gray-200 italic mb-3">
                &ldquo;Straightforward, outstanding communication, exactly how I prefer to work.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/images/client/joseph-p-meyer.webp"
                  alt="Joseph P. Meyer"
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm-body font-semibold text-white">Joseph P. Meyer</p>
                  <p className="text-xs text-gray-400">Founder &amp; CEO | DigitalVisor</p>
                </div>
              </div>
            </div>
          </div>

          <HeroFormIntro animation={<VideoAnimation config={{
            headerIcon: User,
            headerTitle: "Founder Content",
            stats: [
              { icon: Film, label: "Reels & Shorts", value: "12/mo", delay: 0.5, accent: "bg-sky-50 border-sky-200", iconColor: "text-sky-500", valueColor: "text-sky-700" },
              { icon: Video, label: "Long-Form", value: "4/mo", delay: 0.8, accent: "bg-spark-50 border-spark-200", iconColor: "text-spark-600", valueColor: "text-[#4A6F27]" },
              { icon: Sparkles, label: "Motion Graphics", value: "4/mo", delay: 1.1, accent: "bg-teal-50 border-teal-200", iconColor: "text-teal-500", valueColor: "text-teal-700" },
              { icon: Palette, label: "Podcast Clips", value: "8/mo", delay: 1.4, accent: "bg-amber-50 border-amber-200", iconColor: "text-amber-500", valueColor: "text-amber-700" },
            ],
          }} />}>
            <div className="rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h2 className="text-sub font-bold text-gray-900 mb-1.5">
                  Let&apos;s Start Today
                </h2>
              </div>
              <form id="video-founder-operator-hero-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
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
   2. PROBLEMS SECTION
   ════════════════════════════════════════════════════════════════════════════ */

function ProblemSection() {
  const problems = [
    {
      icon: Video,
      title: "It All Relies Heavily on You",
      body: "Every piece of content runs through you first, record it, brief it, chase the edit, post it. The business can't produce content unless you're personally in the loop.",
    },
    {
      icon: UserX,
      title: "Freelancers Need More Managing",
      body: "A new freelancer means re-explaining your brand from scratch, chasing revisions, and quality that swings from good to inconsistent. You end up managing the manager.",
    },
    {
      icon: Users,
      title: "A New Full-Time Hire Is Not a Fix",
      body: "Payroll, benefits, and a 90-day ramp, for a backlog problem you need solved this month, not next quarter.",
    },
  ];

  return (
    <section id="problems" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900 max-w-3xl mx-auto">
            You&apos;re Facing the Same Bottleneck That{" "}
            <span className="text-[#51B027]"><br />40+ Founder-Led Businesses Already Solved</span>
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
                      <p className="text-caption text-gray-400 mb-2">{problem.title}</p>
                      <p className="text-gray-600 text-sm-body sm:text-body">{problem.body}</p>
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

function SolutionSection() {
  const differentiators = [
    {
      icon: Film,
      title: "Hand-off the Raw Footage and Walk Away",
      desc: "The same dedicated editor and PM learn your brand once and handle briefing, editing, and delivery from there.",
    },
    {
      icon: Archive,
      title: "Footage Archive Keeps You Covered",
      desc: "Even when you're away, the archive keeps the team producing so your publishing schedule doesn't skip a week.",
    },
    {
      icon: Zap,
      title: "Launch in 14 Days, No Hiring Required",
      desc: "Fast talent onboarding to your brand and content guidelines. No job posts, no interviews, no ramp.",
    },
    {
      icon: CheckCircle,
      title: "You're In Control",
      desc: "Sign off on the final cut. Everything before that happens without you.",
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
            Our team already has the editors: people with real B2B content experience who own the workflow, the deadlines, and the quality checks. <br />You will get reliable output without putting one more person on your plate to manage.
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
   3b. SEO SECTION
   ════════════════════════════════════════════════════════════════════════════ */

function SEOSection() {
  const capabilities = [
    "Short-form video editing for Reels, Shorts, and TikTok",
    "Long-form videos for YouTube and Podcast",
    "B2B product demo videos",
    "Social media video production",
    "Motion graphics and branded video assets",
    "Ongoing video editing support built around your publishing calendar",
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
            <span className="text-[#51B027]">Founder-Led Businesses</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection className="text-center mb-16" delay={0.1}>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Get Levrg gives you a managed video editing team that supports recurring content production across social, YouTube, and paid media, so your business keeps producing content without you in the middle of it.
          </p>
        </AnimatedSection>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
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
          </div>

          <AnimatedSection delay={0.15} direction="left">
            <div className="grid grid-cols-2 grid-rows-3 gap-3 sm:gap-4 h-[480px] sm:h-[560px]">
              {bentoImages.map((img, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 group ${img.span}`}
                >
                  <img
                    src={img.src}
                    srcSet={workSampleSrcSet(img.src)}
                    sizes={WORK_SAMPLE_SIZES}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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

function RoiSection() {
  const stats = [
    { value: "7 Days", label: "Publish-Ready Content" },
    { value: "99%", label: "On-Time Publish Rate" },
    { value: "40+", label: "Trusted by B2Bs Across North America" },
  ];

  return (
    <section id="results" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Why Our <span className="text-[#51B027]">Clients</span> Work With Us
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
   6. HOW IT WORKS SECTION (local — 5 steps, 14-day ramp)
   ════════════════════════════════════════════════════════════════════════════ */

function HowItWorksSection() {
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
    <section id="process" className="py-16 sm:py-24 bg-white">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Two Weeks,{" "}
            <span className="text-[#51B027]">Not Two Quarters</span>
          </h2>
        </AnimatedSection>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:flex items-stretch justify-between gap-0">
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

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Levrg feels like part of our team, seamless, reliable, and essential for scaling.",
      name: "Sara Murray",
      title: "CEO · Sara Murray Inc.",
      image: "/images/client/sara-murray.webp",
    },
    {
      quote: "A wave of sharp, strategic responses, executed flawlessly by Get Levrg.",
      name: "Jennifer King",
      title: "Co-founder & CEO · DeStor RevOps",
      image: "/images/client/shahrokh-sheikh.webp",
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
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-h2 sm:text-h1 text-gray-900">
            Founders That Don&apos;t{" "}
            <span className="text-[#51B027]">Look Back</span>
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
                      <p className="text-sl text-gray-500">{t.title}</p>
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
   8. WHY CHOOSE US SECTION
   ════════════════════════════════════════════════════════════════════════════ */

function WhyChooseUsSection() {
  const items = [
    {
      icon: Trophy,
      title: "Proven Track Record",
      desc: "40+ B2B companies trust us with their video output. We've delivered videos with a 98% satisfaction and 99% on-time publish rate.",
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      desc: "Your dedicated PM is a Slack message away. No ticket queues, no offshore call centers, real humans, real time.",
    },
    {
      icon: UserCheck,
      title: "Vetted Talent Only",
      desc: "Every editor passes a rigorous portfolio review, skills test, and English fluency check.",
    },
    {
      icon: Rocket,
      title: "Built for Scale",
      desc: "As your video starts performing, you'll want more of it. Add editors and expand your team on demand; same PM, same workflow, same quality, just more output.",
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

function FAQSection() {
  const faqs = [
    {
      q: "How fast can my video editing team be up and running?",
      a: "Most founders see their first deliverable within 4 days. Full production ramps to a steady weekly rhythm by day 14.",
    },
    {
      q: "What types of videos can your team edit?",
      a: "Short-form social videos, YouTube videos, podcast clips, product demos, promotional videos, motion graphics, thumbnails.",
    },
    {
      q: "Is this the same as hiring a freelance video editor?",
      a: "No. A freelancer gives you one person to manage. Get Levrg gives you a managed video editing service with vetted editors, project management, and quality checks, so you're not the one chasing revisions.",
    },
    {
      q: "Do I need to manage this day to day?",
      a: "No. You send footage and approve final cuts. A dedicated editor and PM handle briefing, editing, and revisions in between.",
    },
    {
      q: "What if I'm away or heads-down elsewhere?",
      a: "The Footage Archive keeps the team producing so your publishing schedule doesn't skip a week, even when you're not actively feeding it new footage.",
    },
    {
      q: "Do I eventually need to hire a full-time editor?",
      a: "No. Most founders use this specifically to avoid that step. A full-time hire means payroll, ramp time, and management overhead you don't need yet.",
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
   10. FINAL CTA SECTION
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
            Ready to Get Out of the Editing Loop?
          </h2>
          <p className="text-body text-spark-200 max-w-2xl mx-auto mb-10">
            Get custom pricing and see exactly how the handoff works.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="ghost"
              onClick={scrollToHero}
              className="bg-white text-spark-800 hover:bg-spark-50 hover:text-spark-800 px-8 py-6 text-base rounded-xl shadow-lg transition-all hover:shadow-xl"
            >
              Get Your Video Team
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
   EXPORT: VideoFounderOperatorPage
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
      ctaText="Get Your Video Team"
      ctaTarget="#lead-form"
      dynamicCta
      meta={{
        title: "Video Editing for Founder-Led Businesses | Get Levrg",
        description: "Record it and done. A dedicated video team handles your backlog end to end so your content keeps shipping without you in the middle of it. Launch in 14 days.",
        keywords: "video editing for founders, founder content production, dedicated video editor for small business",
        ogTitle: "Video Editing for Founder-Led Businesses | Get Levrg",
        ogDescription: "Record it once. We handle the rest. Dedicated video team for founder-led businesses.",
        ogImage: "/images/hero/video-founder-operator.webp",
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
      <TestimonialsSection />
      <FAQSection />
      <FinalCTASection />
    </PageShell>
  );
}
