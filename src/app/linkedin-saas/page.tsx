"use client";

import { ArrowRight, Quote, Lock, Mail, Shield, Check, Code, Target, Calendar, DollarSign } from "lucide-react";
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
  CapabilitiesSection,
  ToolsWeUseSection,
  CampaignFindingsSection,
  WorkSampleBentoGrid,
  RoiSection,
  ComparisonSection,
  HowItWorksSection,
  TestimonialsSection,
  WhyChooseUsSection,
  FAQSection,
  FinalCTASection,
} from "@/components/sections/linkedin-outbound";

/* ════════════════════════════════════════════════════════════════════════════
   HERO SECTION
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
        <img src="/images/hero/linkedin-saas-hero.webp" srcSet="/images/hero/linkedin-saas-hero-sm.webp 800w, /images/hero/linkedin-saas-hero.webp 1440w" sizes="100vw" width="1440" height="804" alt="" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" decoding="async" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#061512]/95 via-[#061512]/70 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-3">
            <div className="gl-reveal gl-dur5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-8">
              <Code className="h-3.5 w-3.5 text-spark-300" />
              <span className="text-sm-body font-medium text-white">LinkedIn Outbound For B2B SaaS Teams</span>
            </div>

            <h1 className="gl-reveal gl-d1 text-h1 sm:text-display lg:text-display-sm text-white mb-6">
              Outbound Pipeline For B2B SaaS Teams
              <br />
              <span className="text-spark-400">Your SDR Team Is Expensive. Your Pipeline Doesn&apos;t Have To Be.</span>
            </h1>

            <p className="gl-reveal gl-d2 text-body sm:text-sub text-gray-300 max-w-2xl mb-6">
              We build a qualified pipeline through managed LinkedIn outreach, so you can grow demand without the Cost delay, and overhead of building internally first.
            </p>

            <ul className="gl-reveal gl-d25 space-y-2 mb-8">
              {[
                "Qualified pipeline, not just activity",
                "Faster launch than internal build-out",
                "Managed execution with clearer economics",
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-spark-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm-body text-gray-300">{b}</span>
                </li>
              ))}
            </ul>

            <div className="gl-reveal gl-d3 flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              {[
                { icon: Target, text: "20–40 Qualified leads/mo" },
                { icon: Calendar, text: "14 Days First outreach sent" },
                { icon: DollarSign, text: "1/5th Cost of internal SDR" },
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

            <div className="gl-reveal gl-d4 relative p-5 sm:p-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm max-w-2xl">
              <Quote className="absolute top-4 left-5 h-5 w-5 text-spark-300" />
              <p className="text-sm-body sm:text-body text-gray-200 italic mb-3 pl-8">
                &ldquo;We replaced two SDR hires with GetLevrg and actually increased our qualified pipeline by 40%.&rdquo;
              </p>
              <div className="flex items-center gap-3 pl-8">
                <img
                  src="/images/client/steven-riskey.webp"
                  alt="VP Sales"
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="text-sm-body font-semibold text-white">VP Sales</p>
                  <p className="text-xs text-gray-400">Series A B2B SaaS</p>
                </div>
              </div>
            </div>
          </div>

          <HeroFormIntro>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h2 className="text-sub font-bold text-gray-900 mb-1.5">Let&apos;s Start Today</h2>
                <p className="text-sm-body text-gray-500">See exactly what pipeline you&apos;re missing. Free audit and campaign strategy in 24 hours.</p>
              </div>
              <form id="linkedin-saas-hero-form" onSubmit={handleSubmit(onValid)} noValidate className="space-y-4">
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
   EXPORT: LinkedInSaaSPage
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
        title: "LinkedIn Outbound for B2B SaaS Teams | Get Levrg",
        description: "Build a qualified SaaS pipeline through managed LinkedIn outreach — at 1/5th the cost of an internal SDR team. First outreach sent within 14 days.",
        keywords: "LinkedIn outbound for SaaS, B2B SaaS lead generation, SaaS pipeline outbound",
        ogTitle: "LinkedIn Outbound for B2B SaaS Teams | Get Levrg",
        ogDescription: "Your SDR team is expensive. Your pipeline doesn't have to be.",
        ogImage: "/images/hero/linkedin-saas-hero.webp",
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
      <TestimonialsSection industry="saas" />
      <FAQSection />
      <FinalCTASection />
    </PageShell>
  );
}
