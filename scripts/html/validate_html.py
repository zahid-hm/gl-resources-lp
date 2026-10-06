#!/usr/bin/env python3
"""Run getlevrg-landing-pages' page validator against generated-html/.

The checks are imported from a checkout of that repo, not copied, so these
pages are held to exactly the rules the HubSpot landing pages are:

  form GUID, required/banned lead fields, ns array, widget attach contract,
  HTML well-formedness, UTF-8 / mojibake, raw HubSpot CDN host
  (+ contact properties and required attributes when HUBSPOT_ACCESS_TOKEN is set)

Two checks are about HubSpot page identity and cannot apply to a page that is
not a HubSpot page, so they are skipped by telling the validator each page is
already tracked and not auto-deployed:

  0. filename_pattern — stems here are route slugs (`crm-legal`), not campaign filenames
  8. id_mapping       — there is no HubSpot page ID; this also guarantees the
                        validator never auto-creates a draft page

Usage:
  python scripts/html/validate_html.py [--landing-pages DIR] [file.html ...]
  DIR defaults to $LANDING_PAGES_DIR, then ../getlevrg-landing-pages.
  No files = every page in generated-html/.

Exit: 0 = pass, 1 = blocking findings, 2 = validator not found
"""

import argparse
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
GENERATED = ROOT / "generated-html"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument(
        "--landing-pages",
        default=os.environ.get("LANDING_PAGES_DIR") or str(ROOT.parent / "getlevrg-landing-pages"),
        help="checkout of getlevrg-landing-pages",
    )
    parser.add_argument("--show-warnings", action="store_true")
    parser.add_argument("files", nargs="*")
    args = parser.parse_args()

    validator_dir = Path(args.landing_pages).resolve() / "hubspot-cms" / "scripts" / "validate"
    if not (validator_dir / "validate_pages.py").exists():
        print(f"validate_pages.py not found under {validator_dir} — pass --landing-pages", file=sys.stderr)
        return 2
    sys.path.insert(0, str(validator_dir))
    import validate_pages as vp  # noqa: E402  (imported from the other repo at runtime)

    files = [Path(f).resolve() for f in args.files] if args.files else sorted(GENERATED.glob("*.html"))
    files = [f for f in files if f.suffix == ".html"]
    if not files:
        print("No HTML files to validate.")
        return 0

    api_key = os.environ.get("HUBSPOT_ACCESS_TOKEN", "")
    hs_properties: set[str] = set()
    form_required: dict[str, bool] = {}
    if api_key:
        hs_properties = vp.fetch_contact_properties(api_key)
        form_required = vp.form_required_fields(vp.fetch_form_definition(api_key))

    print(f"Validating {len(files)} file(s) with {validator_dir / 'validate_pages.py'}")
    findings = []
    for f in files:
        stem = f.stem
        findings += vp.validate_file(
            f,
            hs_properties,
            tracked_ids={stem: "not-a-hubspot-page"},
            no_deploy={stem},
            api_key="",  # never let the validator write to HubSpot
            is_pr=True,
            form_required=form_required,
        )

    for finding in findings:
        if finding.severity == "warn" and not args.show_warnings:
            continue
        label = "FAIL" if finding.severity == "fail" else "WARN"
        print(f"  {label}  {finding.file}  [{finding.check}]  {finding.detail}")

    failures = vp.blocking(findings)
    warnings = [f for f in findings if f.severity == "warn"]
    passed = len(files) - len({f.file for f in failures})
    print(f"\n{passed}/{len(files)} passed, {len(failures)} finding(s)")
    if warnings and not args.show_warnings:
        for line in vp.summarize_warnings(warnings):
            print(line)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
