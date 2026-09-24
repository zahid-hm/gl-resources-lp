"use client";

import { ArrowRight, Zap, BarChart3, TrendingUp, Quote, Code } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { TrustedByMarquee } from "@/components/shared/TrustedByMarquee";
import { PhoneField } from "@/components/shared/PhoneField";
import { useLeadForm } from "@/hooks/useLeadForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  HeroFormIntro,
  ProblemSection,
  SolutionSection,
  DeliverablesSection,
  ToolsWeUseSection,
  AuditFindingsSection,
  WorkSampleBentoGrid,
  RoiSection,
  ComparisonSection,
  HowItWorksSection,
  TestimonialsSection,
  WhyChooseUsSection,
  FAQSection,
  FinalCTASection,
} from "@/components/sections/website-optimization";

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
    <section id="lead-form" className="relative overflow-hidden min-h-[500px] sm:min-h-[600px]">
      <div className="absolute inset-0">
        <img src="/images/hero/website-optimization-saas-hero.webp" srcSet="/images/hero/website-optimization-saas-hero-sm.webp 800w, /images/hero/website-optimization-saas-hero.webp 1440w" sizes="100vw" width="1440" height="786" alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#061512]/95 via-[#061512]/70 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <div className="gl-reveal gl-dur5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
              <Code className="h-3.5 w-3.5 text-spark-300" />
              <span className="text-sm-body font-medium text-white">Website Optimization for B2B SaaS</span>
            </div>

            <h1 className="gl-reveal gl-d1 text-h1 sm:text-display lg:text-display-sm text-white mb-6">
              Turn More SaaS Visitors Into Trials And Demos
              <br />
              <span className="text-spark-400">You&apos;re Driving Traffic. You&apos;re Not Converting It.</span>
            </h1>

            <p className="gl-reveal gl-d2 text-body sm:text-sub text-gray-300 max-w-4xl mb-8">
              Get a dedicated CRO team that optimizes your landing pages, pricing page, and signup flow turning more of your existing traffic into trials, demos, and paying customers.
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
                  src="/images/client/ivan-ong.webp"
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
              <form id="website-optimization-saas-hero-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
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
   EXPORT
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
      ctaText="Get Free Audit"
      ctaTarget="#lead-form"
      meta={{
        title: "Website Optimization for B2B SaaS | Get Levrg",
        description: "Turn more SaaS visitors into trials and demos. CRO team that optimizes landing pages, pricing page, and signup flow turning traffic into paying customers.",
        keywords: "website optimization for SaaS, B2B SaaS CRO, SaaS landing page optimization, conversion rate optimization",
        ogTitle: "Website Optimization for B2B SaaS | Get Levrg",
        ogDescription: "You're driving traffic. You're not converting it. Fix that.",
        ogImage: "/images/hero/website-optimization-saas-hero.webp",
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
      <TestimonialsSection industry="saas" />
      <FAQSection />
      <FinalCTASection />
    </PageShell>
  );
}
