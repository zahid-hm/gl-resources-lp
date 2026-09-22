import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Layers, Video, Globe, Megaphone, Target, Rocket, HeartHandshake } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

function MarketingIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-auto" fill="none">
      <motion.path d="M35 90 L80 60 L80 120 Z" fill="#51B027" opacity="0.1" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} />
      <path d="M35 90 L80 60 L80 120 Z" stroke="#51B027" strokeWidth="1.5" opacity="0.3" />
      <motion.path d="M88 65 Q108 90 88 115" stroke="#51B027" strokeWidth="2" fill="none" opacity="0.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
      <motion.path d="M102 52 Q130 90 102 128" stroke="#51B027" strokeWidth="2" fill="none" opacity="0.14" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} />
      <motion.path d="M116 39 Q155 90 116 141" stroke="#51B027" strokeWidth="2" fill="none" opacity="0.08" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }} />
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
        <circle cx="160" cy="50" r="15" fill="#EEF7E9" stroke="#51B027" strokeWidth="1.2" />
        <rect x="153" y="45" width="14" height="8" rx="2" fill="#51B027" opacity="0.4" />
        <circle cx="160" cy="56" r="2.5" fill="#51B027" opacity="0.4" />
        <circle cx="192" cy="70" r="15" fill="#EEF7E9" stroke="#51B027" strokeWidth="1.2" />
        <path d="M186 70 L192 64 L198 70 L192 76 Z" fill="#51B027" opacity="0.35" />
        <circle cx="168" cy="108" r="15" fill="#EEF7E9" stroke="#51B027" strokeWidth="1.2" />
        <rect x="162" y="103" width="14" height="8" rx="2" fill="#51B027" opacity="0.35" />
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 }}>
        <rect x="152" y="128" width="12" height="26" rx="3" fill="#51B027" opacity="0.12" />
        <rect x="168" y="116" width="12" height="38" rx="3" fill="#51B027" opacity="0.22" />
        <rect x="184" y="104" width="12" height="50" rx="3" fill="#51B027" opacity="0.32" />
        <rect x="200" y="92" width="12" height="62" rx="3" fill="#51B027" opacity="0.42" />
      </motion.g>
      <motion.path d="M152 135 L212 88" stroke="#51B027" strokeWidth="2" strokeDasharray="5 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.6 }} />
    </svg>
  );
}

function VideoCapIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-auto" fill="none">
      <motion.g initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}>
        <rect x="20" y="25" width="95" height="68" rx="12" fill="#1A6B5C" fillOpacity="0.06" stroke="#1A6B5C" strokeWidth="1.5" strokeOpacity="0.25" />
        <polygon points="56,42 56,76 80,59" fill="#1A6B5C" opacity="0.3" />
      </motion.g>
      <rect x="20" y="25" width="7" height="11" rx="2" fill="#1A6B5C" opacity="0.15" />
      <rect x="20" y="42" width="7" height="11" rx="2" fill="#1A6B5C" opacity="0.15" />
      <rect x="20" y="62" width="7" height="11" rx="2" fill="#1A6B5C" opacity="0.15" />
      <rect x="20" y="80" width="7" height="11" rx="2" fill="#1A6B5C" opacity="0.15" />
      <motion.g initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
        <rect x="130" y="20" width="85" height="62" rx="10" fill="#E6F5F0" stroke="#1A6B5C" strokeWidth="1" opacity="0.5" />
        <circle cx="150" cy="40" r="7" fill="#1A6B5C" opacity="0.4" />
        <circle cx="170" cy="40" r="7" fill="#0EA5E9" opacity="0.4" />
        <circle cx="190" cy="40" r="7" fill="#E5A800" opacity="0.4" />
        <motion.path d="M140 58 Q162 50 172 62 Q185 68 205 58" stroke="#1A6B5C" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }} />
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 }}>
        <rect x="32" y="112" width="180" height="52" rx="8" fill="#1A6B5C" fillOpacity="0.03" stroke="#1A6B5C" strokeWidth="1" strokeOpacity="0.12" />
        <rect x="42" y="120" width="58" height="7" rx="3" fill="#1A6B5C" opacity="0.15" />
        <rect x="42" y="132" width="40" height="5" rx="2" fill="#1A6B5C" opacity="0.1" />
        <rect x="42" y="142" width="48" height="5" rx="2" fill="#1A6B5C" opacity="0.07" />
        <rect x="120" y="128" width="38" height="14" rx="5" fill="#1A6B5C" opacity="0.22" />
        <rect x="168" y="120" width="30" height="30" rx="5" fill="#1A6B5C" opacity="0.07" />
        <circle cx="183" cy="133" r="5" fill="#1A6B5C" opacity="0.1" />
      </motion.g>
    </svg>
  );
}

function WebsiteIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-auto" fill="none">
      <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <rect x="25" y="18" width="190" height="140" rx="12" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="1.5" strokeOpacity="0.25" />
        <circle cx="42" cy="33" r="4" fill="#0EA5E9" opacity="0.25" />
        <circle cx="54" cy="33" r="4" fill="#0EA5E9" opacity="0.18" />
        <circle cx="66" cy="33" r="4" fill="#0EA5E9" opacity="0.12" />
        <rect x="78" y="30" width="120" height="7" rx="3.5" fill="#0EA5E9" opacity="0.08" />
      </motion.g>
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
        <rect x="38" y="50" width="164" height="22" rx="5" fill="#0EA5E9" opacity="0.06" />
        <rect x="46" y="56" width="55" height="5" rx="2.5" fill="#0EA5E9" opacity="0.18" />
        <rect x="46" y="64" width="38" height="4" rx="2" fill="#0EA5E9" opacity="0.1" />
        <rect x="128" y="56" width="32" height="12" rx="5" fill="#0EA5E9" opacity="0.22" />
        <rect x="38" y="80" width="78" height="38" rx="5" fill="#0EA5E9" opacity="0.05" />
        <rect x="124" y="80" width="78" height="38" rx="5" fill="#0EA5E9" opacity="0.05" />
        <rect x="46" y="88" width="50" height="4" rx="2" fill="#0EA5E9" opacity="0.14" />
        <rect x="46" y="96" width="34" height="3" rx="1.5" fill="#0EA5E9" opacity="0.08" />
        <rect x="132" y="88" width="55" height="4" rx="2" fill="#0EA5E9" opacity="0.14" />
        <rect x="132" y="96" width="38" height="3" rx="1.5" fill="#0EA5E9" opacity="0.08" />
      </motion.g>
      <motion.path d="M42 138 L72 128 L102 132 L132 122 L162 126 L192 116 L212 108" stroke="#0EA5E9" strokeWidth="2.5" fill="none" opacity="0.3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 1 }} />
    </svg>
  );
}

function CRMIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-auto" fill="none">
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <path d="M35 35 L205 35 L155 72 L85 72 Z" fill="#E5A800" opacity="0.06" stroke="#E5A800" strokeWidth="1.2" strokeOpacity="0.2" />
        <path d="M85 72 L155 72 L135 100 L105 100 Z" fill="#E5A800" opacity="0.1" stroke="#E5A800" strokeWidth="1.2" strokeOpacity="0.2" />
        <path d="M105 100 L135 100 L125 128 L115 128 Z" fill="#E5A800" opacity="0.16" stroke="#E5A800" strokeWidth="1.2" strokeOpacity="0.2" />
      </motion.g>
      <motion.g initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
        <rect x="40" y="42" width="32" height="6" rx="3" fill="#E5A800" opacity="0.18" />
        <rect x="82" y="80" width="26" height="6" rx="3" fill="#E5A800" opacity="0.22" />
        <rect x="100" y="108" width="20" height="6" rx="3" fill="#E5A800" opacity="0.28" />
      </motion.g>
      <motion.g animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
        <circle cx="120" cy="50" r="4" fill="#E5A800" opacity="0.3" />
        <circle cx="95" cy="50" r="4" fill="#E5A800" opacity="0.2" />
        <circle cx="145" cy="50" r="4" fill="#E5A800" opacity="0.2" />
        <circle cx="120" cy="86" r="4" fill="#E5A800" opacity="0.3" />
        <circle cx="120" cy="114" r="4" fill="#E5A800" opacity="0.35" />
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
        <rect x="28" y="142" width="52" height="22" rx="6" fill="#FEF9E7" stroke="#E5A800" strokeWidth="0.8" strokeOpacity="0.25" />
        <rect x="36" y="148" width="32" height="5" rx="2" fill="#E5A800" opacity="0.18" />
        <rect x="36" y="156" width="20" height="4" rx="2" fill="#E5A800" opacity="0.1" />
        <rect x="92" y="142" width="52" height="22" rx="6" fill="#FEF9E7" stroke="#E5A800" strokeWidth="0.8" strokeOpacity="0.25" />
        <rect x="100" y="148" width="32" height="5" rx="2" fill="#E5A800" opacity="0.18" />
        <rect x="100" y="156" width="20" height="4" rx="2" fill="#E5A800" opacity="0.1" />
        <rect x="156" y="142" width="52" height="22" rx="6" fill="#FEF9E7" stroke="#E5A800" strokeWidth="0.8" strokeOpacity="0.25" />
        <rect x="164" y="148" width="32" height="5" rx="2" fill="#E5A800" opacity="0.18" />
        <rect x="164" y="156" width="20" height="4" rx="2" fill="#E5A800" opacity="0.1" />
      </motion.g>
    </svg>
  );
}

function OutboundIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-auto" fill="none">
      <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
        <rect x="22" y="35" width="82" height="55" rx="8" fill="#FFF7ED" stroke="#F97316" strokeWidth="1.2" strokeOpacity="0.25" />
        <path d="M22 42 L63 65 L104 42" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.2" fill="none" />
      </motion.g>
      <motion.g initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
        <rect x="130" y="35" width="78" height="55" rx="10" fill="#FFF7ED" stroke="#F97316" strokeWidth="1.2" strokeOpacity="0.25" />
        <text x="157" y="68" fontSize="18" fill="#F97316" opacity="0.25" fontFamily="sans-serif" fontWeight="bold">in</text>
      </motion.g>
      <motion.g initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }}>
        <line x1="63" y1="100" x2="35" y2="130" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="4 3" />
        <line x1="63" y1="100" x2="63" y2="135" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="4 3" />
        <line x1="63" y1="100" x2="91" y2="130" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="4 3" />
        <line x1="168" y1="100" x2="145" y2="130" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="4 3" />
        <line x1="168" y1="100" x2="168" y2="135" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="4 3" />
        <line x1="168" y1="100" x2="191" y2="130" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="4 3" />
      </motion.g>
      <motion.g animate={{ opacity: [0.3, 0.55, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
        <circle cx="35" cy="132" r="5" fill="#F97316" opacity="0.2" />
        <circle cx="63" cy="137" r="5" fill="#F97316" opacity="0.25" />
        <circle cx="91" cy="132" r="5" fill="#F97316" opacity="0.2" />
        <circle cx="145" cy="132" r="5" fill="#F97316" opacity="0.2" />
        <circle cx="168" cy="137" r="5" fill="#F97316" opacity="0.25" />
        <circle cx="191" cy="132" r="5" fill="#F97316" opacity="0.2" />
      </motion.g>
    </svg>
  );
}

function SupportIllustration() {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-auto" fill="none">
      <motion.g initial={{ scale: 0.85, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}>
        <circle cx="120" cy="52" r="28" fill="#0891B2" opacity="0.05" stroke="#0891B2" strokeWidth="1.5" strokeOpacity="0.18" />
        <path d="M92 48 Q92 25 120 25 Q148 25 148 48" stroke="#0891B2" strokeWidth="2.5" fill="none" opacity="0.22" />
        <rect x="85" y="44" width="10" height="16" rx="5" fill="#0891B2" opacity="0.18" />
        <rect x="145" y="44" width="10" height="16" rx="5" fill="#0891B2" opacity="0.18" />
      </motion.g>
      <motion.g initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
        <rect x="18" y="95" width="58" height="42" rx="8" fill="#ECFEFF" stroke="#0891B2" strokeWidth="0.8" strokeOpacity="0.2" />
        <rect x="26" y="103" width="36" height="5" rx="2" fill="#0891B2" opacity="0.18" />
        <rect x="26" y="112" width="26" height="4" rx="2" fill="#0891B2" opacity="0.1" />
        <circle cx="64" cy="128" r="5" fill="#0891B2" opacity="0.18" />
        <path d="M62 128 L64 130 L68 126" stroke="#0891B2" strokeWidth="1" opacity="0.25" />
        <rect x="90" y="95" width="58" height="42" rx="8" fill="#ECFEFF" stroke="#0891B2" strokeWidth="0.8" strokeOpacity="0.2" />
        <rect x="98" y="103" width="36" height="5" rx="2" fill="#0891B2" opacity="0.18" />
        <rect x="98" y="112" width="26" height="4" rx="2" fill="#0891B2" opacity="0.1" />
        <circle cx="136" cy="128" r="5" fill="#0891B2" opacity="0.18" />
        <path d="M134 128 L136 130 L140 126" stroke="#0891B2" strokeWidth="1" opacity="0.25" />
        <rect x="162" y="95" width="58" height="42" rx="8" fill="#ECFEFF" stroke="#0891B2" strokeWidth="0.8" strokeOpacity="0.2" />
        <rect x="170" y="103" width="36" height="5" rx="2" fill="#0891B2" opacity="0.18" />
        <rect x="170" y="112" width="26" height="4" rx="2" fill="#0891B2" opacity="0.1" />
        <circle cx="208" cy="128" r="5" fill="#0891B2" opacity="0.18" />
        <path d="M206 128 L208 130 L212 126" stroke="#0891B2" strokeWidth="1" opacity="0.25" />
      </motion.g>
      <motion.g animate={{ opacity: [0.2, 0.45, 0.2] }} transition={{ duration: 3, repeat: Infinity }}>
        <path d="M168 22 Q168 12 180 12 L200 12 Q212 12 212 22 L212 35 Q212 45 200 45 L188 45 L182 52 L182 45 L180 45 Q168 45 168 35 Z" fill="#0891B2" opacity="0.06" />
        <rect x="176" y="20" width="26" height="4" rx="2" fill="#0891B2" opacity="0.12" />
        <rect x="176" y="28" width="18" height="3" rx="1.5" fill="#0891B2" opacity="0.08" />
      </motion.g>
    </svg>
  );
}

const serviceCapabilitiesCategories = [
  {
    id: 'creative-social',
    title: 'Creative Services',
    subtitle: 'Social Media & Content Marketing',
    icon: Megaphone,
    color: '#51B027',
    textColor: '#3A7D1A',
    bgColor: '#EEF7E9',
    deliverables: ['Branding guidelines design','Content calendar creation & management','Social post templates','Text & copywriting (posts, captions)','Static image & graphic design','eBook & long-form asset design','Blog writing & SEO content','Newsletter creation & management','Case studies & documentation','Web banners & digital assets','Digital advertising creative','Visual playbooks & brand assets','Content publishing & scheduling','Reporting & engagement tracking'],
    illustration: MarketingIllustration,
  },
  {
    id: 'video',
    title: 'Video Creation',
    subtitle: 'Production, editing, and distribution',
    icon: Video,
    color: '#1A6B5C',
    textColor: '#145A4E',
    bgColor: '#E6F5F0',
    deliverables: ['Short-form video editing','Long-form video editing','Podcast editing & production','Sound effects & audio enhancement','Thumbnail design','Subtitle & caption creation','Motion graphics & animation','Promo videos','Voiceover videos','Explainer videos','Product videos','Video formatting & repurposing','Platform optimization (LinkedIn, YouTube, etc.)','Publishing & posting'],
    illustration: VideoCapIllustration,
  },
  {
    id: 'website',
    title: 'Website Development',
    subtitle: 'Build, optimize, and maintain your web presence',
    icon: Globe,
    color: '#0EA5E9',
    textColor: '#076A9A',
    bgColor: '#E0F2FE',
    deliverables: ['Website wireframing & page layout design','Page creation & landing pages','Website content creation & updates','Blog creation & optimization','On-page SEO / AEO / GEO optimization','Technical SEO','CRO setup & optimization','CRM / CMS integrations','Dynamic personalization','Plugin & theme updates','Security monitoring & maintenance','Hosting & performance management','Backup & version control','Custom development & integrations'],
    illustration: WebsiteIllustration,
  },
  {
    id: 'gtm-crm',
    title: 'GTM Engineering',
    subtitle: 'Sales Data & CRM Optimization',
    icon: Target,
    color: '#E5A800',
    textColor: '#8A6500',
    bgColor: '#FEF9E7',
    deliverables: ['CRM setup & structure (pipelines, properties)','CRM layout & customization','Workflow automation','Sales engagement workflows','Lead & contact management','Data enrichment (contacts & accounts)','CRM cleansing & data hygiene','Lead scoring','Email logging & tracking','Reporting & dashboards','Pipeline management','Meeting notes & activity tracking','Integration support (tools, platforms)'],
    illustration: CRMIllustration,
  },
  {
    id: 'gtm-outbound',
    title: 'GTM Orchestration',
    subtitle: 'Email & LinkedIn Outbound',
    icon: Rocket,
    color: '#F97316',
    textColor: '#B85610',
    bgColor: '#FFF7ED',
    deliverables: ['Campaign playbook creation','ICP targeting & TAM mapping','Lead list development','Contact research & enrichment','Messaging & copywriting (outreach)','Connection & outreach execution','Response handling & follow-ups','Content creation for campaigns','Social posting & distribution','White space / account analysis','Database enrichment','CRM uploads & syncing','Campaign tracking & optimization'],
    illustration: OutboundIllustration,
  },
  {
    id: 'customer-support',
    title: 'Customer Support',
    subtitle: 'Operations, support, and execution',
    icon: HeartHandshake,
    color: '#0891B2',
    textColor: '#066D8A',
    bgColor: '#ECFEFF',
    deliverables: ['Customer Support Tickets','Email campaign management','Email automation & sequencing','Newsletter distribution','Prospecting support & list management','CRM logging & data entry','Meeting notes capture & transcription','SOP creation & editing','QA & deliverable reviews','Webinar support & hosting','Event coordination & management','LinkedIn campaign management support','Research (directories, partners, etc.)','HubSpot & tool support','Operational support & execution'],
    illustration: SupportIllustration,
  },
];

export function ServiceCapabilities() {
  // "One Partner Across Content, Growth & Operations" section removed from all pages.
  return null;
}
