import type { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js/min";

type PhoneModule = {
  AsYouType: typeof AsYouType;
  parsePhoneNumberFromString: typeof parsePhoneNumberFromString;
};

let pending: Promise<PhoneModule> | null = null;
let loaded: PhoneModule | null = null;

/**
 * `libphonenumber-js/min` carries ~84 KB of country metadata. It was imported
 * at the top of both the phone input and the Zod schema, so every landing page
 * paid for it in its initial bundle even though nothing needs it until someone
 * touches the form.
 *
 * Loading it on demand keeps it off the critical path. Callers that can wait
 * (validation, which is already async) await `loadPhoneMetadata()`; the input
 * warms the module on mount and on focus so formatting is ready by the time the
 * first keystroke lands.
 */
export function loadPhoneMetadata(): Promise<PhoneModule> {
  pending ??= import("libphonenumber-js/min").then((mod) => {
    loaded = { AsYouType: mod.AsYouType, parsePhoneNumberFromString: mod.parsePhoneNumberFromString };
    return loaded;
  });
  return pending;
}

/** The module if it is already in memory, otherwise null — never triggers a load. */
export function peekPhoneMetadata(): PhoneModule | null {
  return loaded;
}

/** Kicks off the download without blocking, once the browser is idle. */
export function warmPhoneMetadata(): void {
  if (loaded || pending) return;
  const start = () => void loadPhoneMetadata();
  if (typeof requestIdleCallback === "function") {
    requestIdleCallback(start, { timeout: 2000 });
  } else {
    setTimeout(start, 500);
  }
}
