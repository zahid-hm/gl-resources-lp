"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useController, type Control } from "react-hook-form";
import type { CountryCode } from "libphonenumber-js/min";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadPhoneMetadata, peekPhoneMetadata, warmPhoneMetadata } from "@/lib/phone-metadata";
import type { LeadFormValues } from "@/lib/validation/lead-form-schema";
import { DEFAULT_ONLY_COUNTRIES, GEO_TIMEOUT_MS } from "@/lib/constants";

interface Country {
  iso2: string;
  name: string;
  dialCode: string;
  flag: string;
}

let countriesPromise: Promise<Country[]> | null = null;
function loadCountries(): Promise<Country[]> {
  countriesPromise ??= fetch("/data/countries.json").then((r) => r.json());
  return countriesPromise;
}

interface PhoneFieldProps {
  control: Control<LeadFormValues>;
  id?: string;
  placeholder?: string;
  required?: boolean;
  /** Default country before IP geolocation resolves (or if it fails/times out). */
  defaultCountry?: string;
  /** Restrict the dropdown + accepted numbers to these ISO2 codes. Pass `null` to allow any country. Defaults to `["US","CA"]`. */
  onlyCountries?: string[] | null;
  className?: string;
}

/**
 * Native React replacement for form-field-validator's widget/src/phone.js:
 * a flag + dial-code dropdown wired to react-hook-form via useController,
 * with the same IP-geolocation default, "+"-triggered international
 * parsing, and onlyCountries restriction. The actual validity check (via
 * libphonenumber-js + the fake-number-pattern filter) lives in
 * lead-form-schema.ts's superRefine, which reads this field's `phone` +
 * `phoneCountry` values together.
 */
export function PhoneField({
  control,
  id,
  placeholder,
  required = true,
  defaultCountry = "US",
  onlyCountries,
  className,
}: PhoneFieldProps) {
  const resolvedOnlyCountries = onlyCountries === undefined ? DEFAULT_ONLY_COUNTRIES : onlyCountries;
  const onlyCountriesKey = resolvedOnlyCountries ? resolvedOnlyCountries.join(",") : "";

  const {
    field: phoneField,
    fieldState: phoneFieldState,
  } = useController({ control, name: "phone" });
  const { field: countryField } = useController({ control, name: "phoneCountry" });
  // Destructured to plain locals so JSX below reads as ordinary props, not
  // member access on the controller object (which the ref-analysis lint
  // rule misreads as a raw ref read despite `.ref` here being an RHF
  // callback ref, not a useRef().current access).
  const { name: phoneName, ref: phoneRef, value: phoneValue, onBlur: phoneOnBlur } = phoneField;

  const [countries, setCountries] = useState<Country[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadCountries().then((list) => {
      if (cancelled) return;
      setCountries(resolvedOnlyCountries ? list.filter((c) => resolvedOnlyCountries.includes(c.iso2)) : list);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlyCountriesKey]);

  useEffect(() => {
    if (!countryField.value) countryField.onChange(defaultCountry);

    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), GEO_TIMEOUT_MS);
    fetch("/api/geolocate", { cache: "no-store", signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { countryCode?: string | null } | null) => {
        if (cancelled || !data?.countryCode) return;
        const code = data.countryCode;
        if (!resolvedOnlyCountries || resolvedOnlyCountries.includes(code)) {
          countryField.onChange(code);
        }
      })
      .catch(() => {})
      .finally(() => clearTimeout(timeout));
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Warm the phone-metadata chunk once the browser is idle so the first
  // keystroke is already formatted.
  useEffect(() => {
    warmPhoneMetadata();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const selected = countries.find((c) => c.iso2 === countryField.value) ?? null;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(q) || c.dialCode.includes(q));
  }, [countries, search]);

  /**
   * Formats `value` with libphonenumber's AsYouType. The metadata module is
   * code-split, so if it has not arrived yet the raw input is kept as-is and
   * re-formatted once the module resolves — the visitor never loses keystrokes
   * and validation (which awaits the same module) is unaffected.
   */
  function format(value: string) {
    const mod = peekPhoneMetadata();
    if (!mod) {
      phoneField.onChange(value);
      loadPhoneMetadata().then(() => format(value));
      return;
    }

    const intl = value.trim().startsWith("+");
    if (intl) {
      const formatter = new mod.AsYouType();
      const formatted = formatter.input(value);
      const detected = formatter.getCountry();
      if (detected && (!resolvedOnlyCountries || resolvedOnlyCountries.includes(detected))) {
        countryField.onChange(detected);
      }
      phoneField.onChange(formatted);
    } else {
      const formatter = new mod.AsYouType((countryField.value || defaultCountry) as CountryCode);
      phoneField.onChange(formatter.input(value));
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    format(e.target.value);
  }

  function selectCountry(iso2: string) {
    countryField.onChange(iso2);
    setOpen(false);
    setSearch("");
  }

  const invalid = !!phoneFieldState.error;

  return (
    <div ref={containerRef} className={cn("relative flex items-stretch gap-2", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={selected ? `${selected.name} (${selected.dialCode})` : "Select country"}
        className="flex items-center gap-1.5 h-10 px-2.5 rounded-md border border-input bg-transparent shrink-0 hover:bg-accent"
      >
        {selected && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/${selected.flag}`} alt="" aria-hidden className="w-5 h-4 object-cover rounded-sm" />
        )}
        <span className="text-sm-body text-gray-700">{selected?.dialCode ?? ""}</span>
        <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
      </button>

      <input
        id={id}
        name={phoneName}
        ref={phoneRef}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        required={required}
        placeholder={placeholder}
        value={phoneValue ?? ""}
        onChange={handleInput}
        onFocus={() => void loadPhoneMetadata()}
        onBlur={phoneOnBlur}
        aria-invalid={invalid}
        className={cn(
          "flex-1 h-10 rounded-md border bg-transparent px-3 text-base md:text-sm outline-none transition-[color,box-shadow]",
          "focus-visible:ring-[3px]",
          invalid
            ? "border-destructive focus-visible:ring-destructive/20"
            : "border-input focus-visible:border-ring focus-visible:ring-ring/50"
        )}
      />

      {open && (
        <div
          role="listbox"
          className="absolute z-20 top-full left-0 mt-1 w-72 max-h-64 overflow-auto rounded-md border border-input bg-white shadow-md"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search country or code"
            aria-label="Search country"
            className="sticky top-0 w-full h-9 px-3 border-b border-input bg-white text-sm outline-none"
          />
          <ul>
            {filtered.map((c) => (
              <li key={c.iso2}>
                <button
                  type="button"
                  onClick={() => selectCountry(c.iso2)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-spark-50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/${c.flag}`} alt="" aria-hidden className="w-5 h-4 object-cover rounded-sm" />
                  <span className="flex-1">{c.name}</span>
                  <span className="text-gray-400">{c.dialCode}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
