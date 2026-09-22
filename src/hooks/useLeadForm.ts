"use client";

import { useRouter } from "next/navigation";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildLeadFormSchema, type LeadFormValues, type LeadFormSchemaOptions } from "@/lib/validation/lead-form-schema";

export interface UseLeadFormOptions extends LeadFormSchemaOptions {
  /** Country the phone field starts on before IP geolocation resolves. */
  defaultCountry?: string;
  /** Path to navigate to after a valid submit. Defaults to "/thank-you". */
  redirectTo?: string;
  onSubmitted?: () => void;
}

export interface UseLeadFormReturn extends UseFormReturn<LeadFormValues> {
  onValid: (data: LeadFormValues) => void;
}

/**
 * Replaces the old useFormValidator.ts + form-field-validator widget:
 * react-hook-form wired to the shared Zod schema (lead-form-schema.ts),
 * with a submit handler that redirects to /thank-you on success — the same
 * behavior every page's hero/lead form already has today.
 */
export function useLeadForm(options: UseLeadFormOptions = {}): UseLeadFormReturn {
  const router = useRouter();
  const schema = buildLeadFormSchema({ onlyCountries: options.onlyCountries });

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      company: "",
      phone: "",
      phoneCountry: options.defaultCountry ?? "US",
    },
  });

  const onValid: UseLeadFormReturn["onValid"] = () => {
    options.onSubmitted?.();
    router.push(options.redirectTo ?? "/thank-you");
  };

  return { ...form, onValid };
}
