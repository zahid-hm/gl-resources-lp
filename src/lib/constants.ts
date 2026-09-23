// Duration (ms) the intro/loading state shows before switching to the main content, shared by the 
// sample-video style sections (fmt, website-optimization, video, social, linkedin-outbound, crm).
export const INTRO_DURATION = 6000;

// Rotation interval (ms) for the direction-aware TestimonialsSection carousel
// (slide-in/out quote cards), shared across the section components and several page variants.
export const TESTIMONIAL_CAROUSEL_ROTATE_MS = 5000;

// Rotation interval (ms) for the simpler index-only testimonial strip embedded in HeroSection 
// on the sample-video/social/video-it-services page variants.
export const HERO_TESTIMONIAL_ROTATE_MS = 4500;

// Toast limits and delays
export const TOAST_LIMIT = 1;
export const TOAST_REMOVE_DELAY = 800000;

// Name pattern for lead form validation
export const NAME_PATTERN = /^[\p{L}][\p{L}'\-\s]{1,49}$/u; // letters (any script) + ' - space, 2-50 chars
export const NAME_DENYLIST = new Set(["test", "asdf", "asdfgh", "qwerty", "n/a", "none", "xxx"]);
export const COMPANY_DENYLIST = new Set(["test", "n/a", "none", "asdf", "xxx", "-", ".", "company"]);

// Default countries for lead form validation
export const DEFAULT_ONLY_COUNTRIES = ["US", "CA"];

// Geolocation timeout for lead form validation
export const GEO_TIMEOUT_MS = 3000;

// ipgeolocation.io returns these for requests it can't resolve to a real country; neither exists in our dataset, 
// so the caller must fall back.
export const UNRESOLVED_CODES = new Set(["XX", "T1"]);

// The disposable-domains list is a static, exact-match snapshot — it won't
// have a brand-new or mirror temp-mail domain the day it appears. This is a
// pattern-based supplement, same spirit as the phone check's degenerate-
// pattern filter: catches domains that *look* like a throwaway service by
// name or by using a free TLD associated with heavy spam/abuse, even if
// they're not (yet) on the exact-match list.
export const SUSPICIOUS_KEYWORDS = [
    "temp", "trash", "fake", "throwaway", "disposable", "guerrilla", "burner",
    "discard", "spambox", "mailcatch", "tempmail", "trashmail", "10minute",
    "mintemail", "getnada", "mailnesia", "dispostable", "fakeinbox", "sharklasers",
];
export const SUSPICIOUS_TLDS = [".tk", ".ml", ".ga", ".cf", ".gq"];

// matches Tailwind's lg: breakpoint
export const DESKTOP_QUERY = "(min-width: 1024px)";

// thank you page call bullets
export const CALL_BULLETS = [
    "Discuss your current situation and goals",
    "Identify opportunities for improvement and efficiency",
    "Share relevant recommendations and insights",
    "Outline possible next steps based on your needs",
];

// testimonials for thank you page and cta section
export const TESTIMONIALS = [
    {
        quote: "We started on Wednesday and they were delivering by Monday. The speed is unlike anything we've experienced with any other vendor or hire. It just works.",
        name: "Thomas Buchanan",
        image: "/images/client/thomas-buchanan.webp",
        title: "CRO",
        company: "Sales Tempo",
    },
    {
        quote: "Get Levrg is able to get us right in front of our top-tier ICP. The targeting, the content, the outreach — it's all coordinated in a way our internal team couldn't pull off alone.",
        name: "Marché Kaanehe",
        image: "/images/client/marche-kaanehe.webp",
        title: "Manager of Product Marketing",
        company: "Cengage Group",
    },
    {
        quote: "Communication with Get Levrg has been very reliable. They show up every week, hit their deliverables, and flag issues before they become problems. That consistency alone is worth it.",
        name: "Jay Francis",
        image: "/images/client/jay-francis.webp",
        title: "Marketing Coordinator",
        company: "Oxford Medical Simulation Inc.",
    },
];
