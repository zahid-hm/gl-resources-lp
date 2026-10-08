#!/usr/bin/env node
// npm run html:validate [-- <slug | file.html> ...] [--show-warnings]
//
// The landing-page quality gates, ported from getlevrg-landing-pages
// (hubspot-cms/scripts/validate/validate_pages.py) so this repo does not need
// that checkout. Keep the two in step when a rule changes there.
//
//   form_guid        hsforms.com pages post to 4028bcb8-…, no placeholder
//   required_fields  lead forms carry firstname, lastname, email, phone, company
//   banned_fields    numemployees is not allowed in a form
//   ns_array         every `var ns = [...]` lists the required fields, no banned ones
//   hs_properties    form fields exist as HubSpot contact properties  (HUBSPOT_ACCESS_TOKEN)
//   required_attrs   `required` attributes match the live form definition (HUBSPOT_ACCESS_TOKEN;
//                    blocking on form-validator pages, a warning elsewhere)
//   fv_*             form-validator widget attach contract (ADR-0006)
//   html_structure   no unclosed or stray tags
//   encoding         valid UTF-8, no replacement characters
//   hubfs_host       no raw HubSpot CDN host; use resources.getlevrg.com
//
// Not ported: filename_pattern and id_mapping, which are about HubSpot page
// identity — stems here are route slugs and these pages have no HubSpot ID.
// The HubSpot API is only ever read. No arguments = every page.
// Exit: 0 = pass, 1 = blocking findings.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const HTML_DIR = join(ROOT, "generated-html");
const args = process.argv.slice(2);
const showWarnings = args.includes("--show-warnings");
const targets = args.filter((a) => !a.startsWith("--"));

const EXPECTED_FORM_GUID = "4028bcb8-fe70-4d19-b3c5-e8b7bcd5ca1f";
const REQUIRED_FIELDS = ["company", "email", "firstname", "lastname", "phone"];
const BANNED_FIELDS = ["numemployees"];
// Tracking fields a form may post that are not contact properties.
const TRACKING_FIELDS = new Set([
  "gclid", "fbclid", "msclkid", "ttclid", "li_fat_id", "twclid", "sccid",
  "epik", "rdt_cid", "qclid", "hubspot_utk", "adgroup_id", "adset_id", "ad_id",
]);
// Matched with the /hubfs suffix so a bare preconnect to the host is not a File Manager reference.
const RAW_HUBFS_HOST = "44139081.fs1.hubspotusercontent-na1.net";
const BRANDED_HUBFS_HOST = "resources.getlevrg.com";
const HUBSPOT_API = "https://api.hubapi.com";

// ── HubSpot API (read-only) ──────────────────────────────────────────────────

// GET a HubSpot API path. Retries on 429; null on any other failure.
async function hubspotGet(path, apiKey, maxRetries = 3) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`${HUBSPOT_API}${path}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        signal: AbortSignal.timeout(30000),
      });
      if (res.ok) return await res.json();
      if (res.status !== 429 || attempt === maxRetries) return null;
      await new Promise((r) => setTimeout(r, Number(res.headers.get("retry-after") ?? 10) * 1000));
    } catch {
      return null;
    }
  }
  return null;
}

async function fetchContactProperties(apiKey) {
  const props = new Set();
  let after;
  do {
    const data = await hubspotGet(`/crm/v3/properties/contacts?limit=500${after ? `&after=${encodeURIComponent(after)}` : ""}`, apiKey);
    if (!data) break;
    for (const p of data.results ?? []) props.add(p.name);
    after = data.paging?.next?.after;
  } while (after);
  return props;
}

// {field name: required} from the live form, or {} if it can't be read — the
// required_attrs check then skips rather than guesses. Unexpected shapes are skipped.
async function fetchFormRequired(apiKey) {
  const form = (await hubspotGet(`/marketing/v3/forms/${EXPECTED_FORM_GUID}`, apiKey)) ?? {};
  const required = {};
  for (const group of Array.isArray(form.fieldGroups) ? form.fieldGroups : []) {
    for (const field of Array.isArray(group?.fields) ? group.fields : []) {
      if (field?.name) required[field.name] = Boolean(field.required);
    }
  }
  return required;
}

// ── HTML tokenizer ───────────────────────────────────────────────────────────
// Just enough of an HTML tokenizer for the two checks that need real tags:
// script/style bodies are raw text, comments and declarations are skipped,
// `<x/>` is a start and an end tag, names are lowercased, and a valueless
// attribute is present with value null (so `aria-required` is never `required`).

const RAW_TEXT = new Set(["script", "style"]);
const ATTR = /([^\s"'>/=][^\s"'>/=]*)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]*))?/g;

function* tags(html) {
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt === -1) return;
    const next = html[lt + 1] ?? "";
    if (html.startsWith("<!--", lt)) {
      const end = html.indexOf("-->", lt + 4);
      if (end === -1) return;
      i = end + 3;
    } else if (next === "!" || next === "?") {
      const end = html.indexOf(">", lt);
      if (end === -1) return;
      i = end + 1;
    } else if (next === "/") {
      const end = html.indexOf(">", lt);
      if (end === -1) return;
      const name = html.slice(lt + 2, end).trim().split(/\s/)[0].toLowerCase();
      if (name) yield { type: "end", name };
      i = end + 1;
    } else if (/[a-zA-Z]/.test(next)) {
      // Find the closing '>' outside quoted attribute values.
      let j = lt + 1;
      let quote = null;
      for (; j < html.length; j++) {
        const c = html[j];
        if (quote) { if (c === quote) quote = null; }
        else if (c === '"' || c === "'") quote = c;
        else if (c === ">") break;
      }
      if (j >= html.length) return;
      const inner = html.slice(lt + 1, j);
      const name = inner.match(/^[^\s/>]+/)[0].toLowerCase();
      const selfClosing = inner.endsWith("/");
      const attrs = {};
      for (const [, key, raw] of inner.slice(name.length).matchAll(ATTR)) {
        const k = key.toLowerCase();
        if (k in attrs) continue;
        attrs[k] = raw === undefined ? null : raw.replace(/^(["'])(.*)\1$/s, "$2");
      }
      yield { type: "start", name, attrs };
      i = j + 1;
      if (selfClosing) yield { type: "end", name };
      else if (RAW_TEXT.has(name)) {
        const close = html.toLowerCase().indexOf(`</${name}`, i);
        if (close === -1) return;
        i = close;
      }
    } else {
      i = lt + 1;
    }
  }
}

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);

function structureErrors(html) {
  const stack = [];
  const errors = [];
  for (const t of tags(html)) {
    if (VOID.has(t.name)) continue;
    if (t.type === "start") { stack.push(t.name); continue; }
    if (stack.at(-1) === t.name) { stack.pop(); continue; }
    // Attempt recovery: look up to 3 ancestors back for a matching open tag.
    const depth = Math.min(3, stack.length);
    const k = stack.slice(-depth).lastIndexOf(t.name);
    if (k !== -1) stack.splice(stack.length - depth + k, 1);
    else errors.push(`unexpected </${t.name}> (open stack: ${JSON.stringify(stack.slice(-3))})`);
  }
  if (stack.length) errors.push(`unclosed tags: ${JSON.stringify(stack.slice(-5))}`);
  return errors;
}

function inputsByName(html) {
  const inputs = {};
  for (const t of tags(html)) {
    if (t.type === "start" && t.name === "input" && t.attrs.name) (inputs[t.attrs.name] ??= []).push(t.attrs);
  }
  return inputs;
}

// ── Checks ───────────────────────────────────────────────────────────────────

const usesFormValidator = (html) => html.includes("form-validator.js") || html.includes("attachFV");

// A field the form requires but the input does not mark required is omitted
// when blank and the submission 400s. `strict` (widget pages) makes that blocking.
function checkRequiredAttributes(html, formRequired, strict) {
  const findings = [];
  if (!Object.keys(formRequired).length) return findings;
  const pageInputs = inputsByName(html);
  for (const field of REQUIRED_FIELDS) {
    const inputs = pageInputs[field];
    if (!inputs) continue; // absence is required_fields' job
    // Every input of that name must be required — a page can carry two lead forms.
    const markedRequired = inputs.every((attrs) => "required" in attrs);
    const formSays = formRequired[field];
    if (formSays === undefined) continue;
    if (formSays && !markedRequired) {
      findings.push(["required_attrs", `form requires '${field}' but the input is not marked required — a blank value is omitted from the payload and the submission 400s, losing the lead`, strict ? "fail" : "warn"]);
    } else if (markedRequired && !formSays) {
      findings.push(["required_attrs", `input marks '${field}' required but the form does not require it — harmless, but the two definitions have drifted`, "warn"]);
    }
  }
  return findings;
}

function checkWidgetContract(html) {
  if (!usesFormValidator(html)) return [];
  const findings = [];
  if (!/<button[^>]*\bdisabled\b/.test(html))
    findings.push(["fv_submit_gate", "submit button missing 'disabled' — an early click bypasses widget validation (#39)"]);
  if (/setTimeout\(\s*attachFV\s*,/.test(html))
    findings.push(["fv_retry_cap", "attachFV rescheduled without an attempt counter — unbounded retry loop (#38)"]);
  if (!html.includes("cp-number"))
    findings.push(["fv_value_carryover", "no .cp-number seeding on attach — phone box blanks mid-typing (#39)"]);
  if (!/:disabled\s*(?:,[^{]*)?\{/.test(html))
    findings.push(["fv_disabled_css", "no ':disabled' rule — a disabled submit button looks identical to an enabled one"]);
  if (/catch\s*\([^)]*\)\s*\{[^}]*__fvController\s*=\s*null/.test(html))
    findings.push(["fv_controller_discard", "catch sets __fvController = null — discards a working controller after attach already stripped 'required' from the phone input, leaving phone unvalidated (#43)"]);
  return findings;
}

function validate(file, hsProperties, formRequired) {
  let html;
  try {
    html = new TextDecoder("utf-8", { fatal: true }).decode(readFileSync(file));
  } catch (err) {
    return [["encoding", err.message]];
  }
  if (process.env.HUBSPOT_PORTAL_ID) html = html.replaceAll("HS_PORTAL_ID", process.env.HUBSPOT_PORTAL_ID);
  const findings = [];

  if (html.includes("FORM_GUID_PLACEHOLDER")) findings.push(["form_guid", "FORM_GUID_PLACEHOLDER not replaced"]);
  else if (!html.includes(EXPECTED_FORM_GUID) && html.includes("hsforms.com"))
    findings.push(["form_guid", `expected ${EXPECTED_FORM_GUID} not found`]);

  if (html.includes("leadForm")) {
    const fieldNames = new Set([
      ...[...html.matchAll(/<input[^>]+name="([^"]+)"/g)].map((m) => m[1]),
      ...[...html.matchAll(/<select[^>]+name="([^"]+)"/g)].map((m) => m[1]),
    ]);
    const missing = REQUIRED_FIELDS.filter((f) => !fieldNames.has(f));
    if (missing.length) findings.push(["required_fields", `missing: ${JSON.stringify(missing)}`]);
    const banned = BANNED_FIELDS.filter((f) => fieldNames.has(f));
    if (banned.length) findings.push(["banned_fields", `found: ${JSON.stringify(banned)}`]);

    // Every ns array on the page — a second lead form carries its own.
    const nsArrays = [...html.matchAll(/var\s+ns\s*=\s*\[([^\]]+)\]/g)];
    if (!nsArrays.length) findings.push(["ns_array", "ns array not found"]);
    nsArrays.forEach((m, idx) => {
      const where = nsArrays.length > 1 ? ` (ns array #${idx + 1} of ${nsArrays.length})` : "";
      const ns = new Set([...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]));
      for (const f of BANNED_FIELDS) if (ns.has(f)) findings.push(["ns_array", `banned field '${f}' in ns array${where}`]);
      for (const f of REQUIRED_FIELDS) if (!ns.has(f)) findings.push(["ns_array", `required field '${f}' missing from ns array${where}`]);
    });

    if (hsProperties.size) {
      const unknown = [...fieldNames].filter((f) => !hsProperties.has(f) && !TRACKING_FIELDS.has(f)).sort();
      if (unknown.length) findings.push(["hs_properties", `unknown contact properties: ${JSON.stringify(unknown)}`]);
    }

    findings.push(...checkRequiredAttributes(html, formRequired, usesFormValidator(html)));
  }

  findings.push(...checkWidgetContract(html));
  findings.push(...structureErrors(html).slice(0, 3).map((e) => ["html_structure", e]));
  if (html.includes("&#65533;") || html.includes("�"))
    findings.push(["encoding", "replacement character (\\ufffd) found — possible mojibake"]);

  const rawHost = html.split(`${RAW_HUBFS_HOST}/hubfs`).length - 1;
  if (rawHost)
    findings.push(["hubfs_host", `${rawHost} reference(s) to the raw HubSpot CDN host (${RAW_HUBFS_HOST}) instead of the branded host (${BRANDED_HUBFS_HOST}) — see #70`]);

  return findings;
}

// Collapse advisory findings into a few counted lines, grouped by message shape.
function summarizeWarnings(warnings) {
  const shapes = new Map();
  for (const w of warnings) {
    const key = `${w.check}\0${w.detail.split(" — ")[0].split(" but ")[0].trim()}`;
    shapes.set(key, (shapes.get(key) ?? 0) + 1);
  }
  const top = [...shapes].sort((a, b) => b[1] - a[1]).slice(0, 2);
  return [
    `\n${warnings.length} advisory warning(s), not blocking:`,
    ...top.map(([key, n]) => { const [check, shape] = key.split("\0"); return `  ${String(n).padStart(4)}  [${check}]  ${shape} ...`; }),
    "  run with --show-warnings for the full list",
  ];
}

// ── Run ──────────────────────────────────────────────────────────────────────

const files = (targets.length
  ? targets.map((t) => (t.endsWith(".html") ? resolve(t) : join(HTML_DIR, `${t}.html`)))
  : readdirSync(HTML_DIR).filter((f) => f.endsWith(".html")).sort().map((f) => join(HTML_DIR, f)));
const absent = files.filter((f) => !existsSync(f));
if (absent.length) {
  console.error(`✗ not found: ${absent.join(", ")}`);
  process.exit(1);
}
if (!files.length) {
  console.log("No HTML files to validate.");
  process.exit(0);
}

const apiKey = process.env.HUBSPOT_ACCESS_TOKEN ?? "";
let hsProperties = new Set();
let formRequired = {};
if (apiKey) {
  [hsProperties, formRequired] = await Promise.all([fetchContactProperties(apiKey), fetchFormRequired(apiKey)]);
  console.log(`HubSpot: ${hsProperties.size} contact properties, ${Object.keys(formRequired).length} form fields`);
} else {
  console.log("HUBSPOT_ACCESS_TOKEN not set — hs_properties and required_attrs skipped");
}

console.log(`Validating ${files.length} file(s)`);
const findings = files.flatMap((f) =>
  validate(f, hsProperties, formRequired).map(([check, detail, severity = "fail"]) => ({ file: basename(f), check, detail, severity }))
);
for (const f of findings) {
  if (f.severity === "warn" && !showWarnings) continue;
  console.log(`  ${f.severity === "fail" ? "FAIL" : "WARN"}  ${f.file}  [${f.check}]  ${f.detail}`);
}

const failures = findings.filter((f) => f.severity === "fail");
const warnings = findings.filter((f) => f.severity === "warn");
console.log(`\n${files.length - new Set(failures.map((f) => f.file)).size}/${files.length} passed, ${failures.length} finding(s)`);
if (warnings.length && !showWarnings) console.log(summarizeWarnings(warnings).join("\n"));
process.exit(failures.length ? 1 : 0);
