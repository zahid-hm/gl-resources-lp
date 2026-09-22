import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js/min";

// Ported 1:1 from form-field-validator/widget/src/{field,phone}.js — see that
// repo's README for the reasoning behind each rule. These only catch
// obviously-wrong input (digits/symbols, too short, keyboard-mash
// placeholders, structurally-degenerate phone numbers); they never confirm a
// name/company/number is real, which no free check can prove.

const NAME_PATTERN = /^[\p{L}][\p{L}'\-\s]{1,49}$/u; // letters (any script) + ' - space, 2-50 chars
const NAME_DENYLIST = new Set(["test", "asdf", "asdfgh", "qwerty", "n/a", "none", "xxx"]);
const COMPANY_DENYLIST = new Set(["test", "n/a", "none", "asdf", "xxx", "-", ".", "company"]);

// Site-wide default: every lead form is restricted to these countries unless
// a page explicitly opts out (pass `onlyCountries: null`), matching the
// widget's previous default.
export const DEFAULT_ONLY_COUNTRIES = ["US", "CA"];

// Catches input that's the right *shape* for some country (so
// parsePhoneNumberFromString().isValid() would accept it) but is obviously
// not a real subscriber number: all one digit, a straight ascending/
// descending run, or a short block repeated to fill the length. Pattern-only
// and country-agnostic — won't catch every fake number, only structurally
// degenerate ones.
function looksFake(nationalNumber: string): boolean {
  if (/^(\d)\1+$/.test(nationalNumber)) return true;

  let ascending = true;
  let descending = true;
  for (let i = 1; i < nationalNumber.length; i++) {
    const prev = Number(nationalNumber[i - 1]);
    const curr = Number(nationalNumber[i]);
    if ((curr - prev + 10) % 10 !== 1) ascending = false;
    if ((prev - curr + 10) % 10 !== 1) descending = false;
  }
  if (ascending || descending) return true;

  for (let period = 2; period <= 4 && period < nationalNumber.length; period++) {
    const unit = nationalNumber.slice(0, period);
    const repeated = unit.repeat(Math.ceil(nationalNumber.length / period)).slice(0, nationalNumber.length);
    if (repeated === nationalNumber) return true;
  }

  return false;
}

function nameField(label: string) {
  return z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .superRefine((value, ctx) => {
      if (!NAME_PATTERN.test(value) || NAME_DENYLIST.has(value.toLowerCase())) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Enter a real ${label.toLowerCase()}.` });
      }
    });
}

const companyField = z
  .string()
  .trim()
  .optional()
  .superRefine((value, ctx) => {
    if (!value) return; // company is optional
    const hasLetter = /\p{L}/u.test(value);
    if (value.length < 2 || !hasLetter || COMPANY_DENYLIST.has(value.toLowerCase())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Enter your company name." });
    }
  });

const emailField = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.")
  .superRefine(async (value, ctx) => {
    try {
      const res = await fetch(`/api/check-email?email=${encodeURIComponent(value)}`);
      if (!res.ok) return; // never block submission on a failed check
      const check = (await res.json()) as { hasMx: boolean | null; disposable: boolean; suspicious: boolean };
      if (check.disposable) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Please use a permanent email address, not a disposable one." });
      } else if (check.suspicious) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "This looks like a temporary/throwaway email address." });
      } else if (check.hasMx === false) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "This email domain doesn't appear to accept mail — check for a typo." });
      }
    } catch {
      // Offline/network failure: don't block on the check itself failing.
    }
  });

export interface LeadFormSchemaOptions {
  /** Restrict accepted phone numbers to these ISO2 country codes. Pass `null` to accept any country. Defaults to `DEFAULT_ONLY_COUNTRIES`. */
  onlyCountries?: string[] | null;
}

/**
 * `phone` holds whatever the visitor typed (as displayed/formatted by
 * PhoneField); `phoneCountry` holds the currently-selected dropdown country
 * (ISO2) that a domestic (non-"+") number is parsed against — both are kept
 * in the form so the whole-object refine below can validate them together,
 * the same way the widget's `validate()` reads its own `state.country`
 * alongside the raw digits.
 */
export function buildLeadFormSchema(options: LeadFormSchemaOptions = {}) {
  const onlyCountries = options.onlyCountries === undefined ? DEFAULT_ONLY_COUNTRIES : options.onlyCountries;

  return z
    .object({
      firstname: nameField("First name"),
      lastname: nameField("Last name"),
      email: emailField,
      company: companyField,
      phone: z.string().trim().min(1, "Phone number is required."),
      phoneCountry: z.string().min(2),
    })
    .superRefine((data, ctx) => {
      const intl = data.phone.trim().startsWith("+");
      const raw = data.phone.replace(/[^\d+]/g, "");
      if (!raw.replace(/\+/g, "")) return; // empty handled by the min(1) check above

      const phoneNumber = intl
        ? parsePhoneNumberFromString(raw)
        : parsePhoneNumberFromString(raw, data.phoneCountry as never);
      const formatValid = !!phoneNumber && phoneNumber.isValid();
      const blockedCountry = formatValid && !!onlyCountries && !onlyCountries.includes(phoneNumber!.country ?? "");
      const fake = formatValid && !blockedCountry && looksFake(phoneNumber!.nationalNumber);

      if (!formatValid || blockedCountry || fake) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone"],
          message: blockedCountry
            ? `We only accept phone numbers from ${onlyCountries!.join(" or ")}.`
            : fake
              ? "That doesn't look like a real phone number."
              : "Enter a valid phone number.",
        });
      }
    });
}

export const leadFormSchema = buildLeadFormSchema();
export type LeadFormValues = z.infer<typeof leadFormSchema>;
