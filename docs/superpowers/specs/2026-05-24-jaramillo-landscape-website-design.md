# Jaramillo Landscape Website — Design Spec
Date: 2026-05-24

## Overview

A 24-page static HTML brochure website for Jaramillo Landscape, a landscaping and hardscaping company in Treasure Valley, Idaho. The client's #1 priority is **trust**. No frameworks, no build step — pure HTML5, one shared `styles.css`, one `main.js`.

---

## Business Info

| Field | Value |
|---|---|
| Company | Jaramillo Landscape |
| Tagline | Expert Landscaping & Hardscaping in the Treasure Valley |
| Phone | 208-863-4371 |
| Email | jaramillolandscaping208@gmail.com |
| Address | 3500 W Pine Ave, Treasure Valley, ID |
| Offer | 10% off all landscape projects |

---

## File Structure

```
c:\jaramillolandscaping\
├── index.html
├── about.html
├── services.html
├── drainage.html
├── cleanup.html
├── irrigation.html
├── pavers.html
├── retaining-walls.html
├── fire-pits.html
├── sprinkler-repairs.html
├── pipe-leak-repairs.html
├── control-valve.html
├── sprinkler-timer.html
├── yard-removals.html
├── trees-plants.html
├── rock-boulder.html
├── concrete-work.html
├── lawn-maintenance.html
├── gallery.html
├── reviews.html
├── faq.html
├── contact.html
├── free-estimate.html
├── thank-you.html
├── styles.css
└── main.js
```

---

## Visual Identity

### Colors

| Token | Hex | Usage |
|---|---|---|
| Primary | `#2D5016` | Nav background, headings, primary buttons |
| Accent | `#8B6914` | Highlights, borders, icon accents |
| CTA | `#E8891A` | All call-to-action buttons |
| Background light | `#F5F0E8` | Alternating page sections |
| Background white | `#FFFFFF` | Default section background |
| Text | `#1A1A1A` | Body copy |
| Text muted | `#6B6B6B` | Secondary text, breadcrumbs |

### Typography

- **Headings:** `Georgia, 'Times New Roman', serif` — warm, trustworthy, classic
- **Body:** `system-ui, -apple-system, sans-serif` — clean, readable

### Design Tokens (CSS custom properties)

```css
--color-primary: #2D5016;
--color-accent: #8B6914;
--color-cta: #E8891A;
--color-bg-light: #F5F0E8;
--color-text: #1A1A1A;
--color-text-muted: #6B6B6B;
--font-heading: Georgia, 'Times New Roman', serif;
--font-body: system-ui, -apple-system, sans-serif;
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--radius: 8px;
--shadow: 0 2px 12px rgba(0,0,0,0.08);
```

---

## Shared Components (Every Page)

### Sticky Navigation
- **Left:** Logo text "Jaramillo Landscape" in white, serif font
- **Center:** Home · About · Services (dropdown) · Gallery · Reviews · Contact
- **Right:** Phone number `208-863-4371` in a green pill button + "Get Free Estimate" orange CTA button
- **Services dropdown:** 2-column grid listing all 15 individual service pages. Opens on hover (desktop) / tap (mobile). Closes on outside click or Escape key.
- **Mobile (≤768px):** Hamburger icon replaces center/right. Nav slides down. Services expands as accordion sub-menu.
- **Sticky behavior:** Nav stays fixed to top on scroll. Slight box-shadow appears after 20px scroll.

### Footer (3-column)
- **Col 1 — Contact:** Phone, email, address, "Licensed & Insured" badge
- **Col 2 — Quick Links:** Home, About, Services, Gallery, Reviews, FAQ, Contact, Free Estimate
- **Col 3 — Services:** All 15 individual service page links
- **Bottom bar:** Copyright + "10% Off All Projects" amber badge

### Breadcrumbs
All inner pages (everything except index.html) show breadcrumb below nav:
`Home > [Section] > [Page Name]`
Small gray text, links back to parent pages.

### Photo Placeholders
Styled gray box (`#D0CFC9` background) with:
- Camera icon (unicode: 📷 or CSS-drawn)
- Label text: `[Photo: description]`
- Suggested dimensions
- Instruction: "Replace with actual project photo"

---

## Page Specifications

### index.html — Home

**SEO:** `Expert Landscaping & Hardscaping in Treasure Valley, ID | Jaramillo Landscape`

**Sections (in order):**

1. **Hero** — Full-width, dark green overlay on placeholder bg. H1: "Expert Landscaping & Hardscaping in the Treasure Valley". Subtext: tagline. Two CTAs: "Work With Us" (primary, orange) + "Get a Free Estimate" (secondary, outline white).

2. **Stats bar** — Dark green band. 4 stats:
   - 15+ Years in the Industry
   - 98% Client Satisfaction
   - 500+ Completed Projects
   - 12 Expert Landscapers

3. **Services grid** — H2: "Our Services". 15 cards in responsive grid (one per individual service page). Each card: icon, title, 1-sentence description, "Learn More →" link to service page.

4. **About teaser** — 2-column. Left: photo placeholder. Right: heading "Expert Landscaping, Personalized for You", paragraph about creating beautiful functional outdoor spaces from small repairs to full-scale construction, "About Us →" link.

5. **Why Trust Us** — H2: "Why Homeowners Trust Jaramillo Landscape". 6-item grid:
   - Experienced Team — skilled designers and horticulturists
   - Tailored Solutions — customized to your home, style, and budget
   - Sustainable Practices — eco-friendly techniques
   - Affordable Pricing — solutions tailored to your budget
   - Reliable Service — on-time delivery, attention to detail
   - Customer Satisfaction — every project exceeds expectations

6. **FAQ accordion** — 5 questions:
   - How much does a landscaping project cost?
   - Do you offer maintenance services?
   - Can you design a garden for small spaces?
   - What kind of materials do you use?
   - How do I get a quote for my project?

7. **Contact strip** — Warm off-white background. Phone · Email · Address in 3 columns with icons.

8. **10% Off banner** — Full-width amber strip. "Get 10% Off Your Next Landscape Project — Call 208-863-4371 or Request a Free Estimate Today."

---

### about.html — About Us

**SEO:** `About Jaramillo Landscape | Treasure Valley's Trusted Landscapers`

- Breadcrumb: Home > About
- Hero: "About Jaramillo Landscape" + subheading
- Our Story section: who we are, local to Treasure Valley, years of experience, passion for outdoor spaces
- Our Values: mirrors "Why Trust Us" from home page with more detail
- Meet the Team: placeholder section for team photos + bios
- Service area: Treasure Valley, ID and surrounding areas
- CTA: Get a Free Estimate

---

### services.html — All Services Overview

**SEO:** `Landscaping Services in Treasure Valley, ID | Jaramillo Landscape`

- Breadcrumb: Home > Services
- Hero: "Our Landscaping Services"
- Full grid of all 15 individual service cards (larger than home page cards, with more description)
- Each card links to its dedicated service page
- CTA at bottom

---

### Service Pages (15 pages — shared template)

Each service page follows this exact structure:

1. **Hero** — Service name as H1. "Get a Free Estimate" CTA button. Timeframe badge (e.g., "Typical project: 1–3 days").
2. **What's Included** — Bulleted list of what the service covers.
3. **Why You Need It** — 2–3 paragraphs on the problem this solves.
4. **Our Process** — Numbered steps (4–6 steps).
5. **Project Timeframe** — Highlighted box with timeframe and what affects duration.
6. **What Affects the Cost** — Bulleted list of cost factors.
7. **Photo placeholders** — 3 labeled placeholder boxes in a grid.
8. **Related Services** — Links to 2–3 other service pages.
9. **FAQ accordion** — 3–4 questions specific to this service.
10. **Bottom CTA** — "Ready to Get Started? Get a Free Estimate" → `free-estimate.html`

**Service pages and their timeframes:**

| Page | Service | Timeframe |
|---|---|---|
| drainage.html | Drainage Solutions | 1–3 days |
| cleanup.html | Yard Cleanups & Grading | 1–2 days |
| irrigation.html | Irrigation Systems | 1–3 days |
| pavers.html | Paver & Flagstone Walkways | 1–3 days |
| retaining-walls.html | Retaining Walls | 2–4 days |
| fire-pits.html | Fire Pits & Patios | 2–5 days |
| sprinkler-repairs.html | Sprinkler Repairs | 1 day |
| pipe-leak-repairs.html | Pipe Leak Repairs (PVC & Poly) | 1 day |
| control-valve.html | Control Valve Installation & Repair | 1 day |
| sprinkler-timer.html | Sprinkler Timer Installation | 1 day |
| yard-removals.html | Yard Removals | 1–2 days |
| trees-plants.html | Trees & Plants Installation | 1–2 days |
| rock-boulder.html | Rock & Boulder Installation | 1–2 days |
| concrete-work.html | Concrete Work | 1–3 days |
| lawn-maintenance.html | Lawn Maintenance (Limited) | 1 day / Ongoing |

---

### gallery.html — Gallery

**SEO:** `Project Gallery | Jaramillo Landscape — Treasure Valley`

- Breadcrumb: Home > Gallery
- Note at top: "More photos coming soon — ask us about recent projects"
- Filter buttons: All · Drainage · Pavers · Retaining Walls · Fire Pits · Irrigation · Sprinkler & Pipe · Cleanup & Removals · Trees & Plants · Rock & Boulder · Concrete · Lawn Maintenance
- Masonry CSS grid of photo placeholders. Each has `data-category` attribute for JS filtering.
- Each placeholder labeled with project type and "Replace with actual project photo"
- CTA: "Interested in a similar project? Contact us"

---

### reviews.html — Reviews

**SEO:** `Customer Reviews | Jaramillo Landscape — Treasure Valley`

- Breadcrumb: Home > Reviews
- Overall rating display: ⭐⭐⭐⭐⭐ 4.9/5 · 50+ Reviews
- Google Reviews badge placeholder
- Grid of ~9 review cards. Each card: star rating, review text, first name + neighborhood + date
- Reviews written to emphasize: trust, quality, reliability, local business
- CTA: "Happy with our work? Leave us a review" (placeholder link for Google review)

---

### faq.html — FAQ

**SEO:** `Frequently Asked Questions | Jaramillo Landscape`

- Breadcrumb: Home > FAQ
- Accordion organized by 5 categories: Pricing · Process · Materials · Timing · Maintenance
- ~4–5 questions per category
- Only one answer open at a time within a category
- CTA at bottom → contact.html

---

### contact.html — Contact

**SEO:** `Contact Jaramillo Landscape | Treasure Valley, ID`

- Breadcrumb: Home > Contact
- 2-column layout: form left, contact info right
- Form fields: Name, Phone, Email, Service Needed (dropdown of all 15 services), Message
- Form action: `mailto:jaramillolandscaping208@gmail.com`
- Contact info: phone, email, address
- "We respond within 24 hours" promise
- Google Maps embed placeholder
- "Licensed & Insured" trust badge

---

### free-estimate.html — Free Estimate

**SEO:** `Get a Free Estimate | Jaramillo Landscape — Treasure Valley`

- Breadcrumb: Home > Free Estimate
- Form fields: Name, Phone, Email, Property Address, Service Needed (dropdown), Project Description (textarea), Best Time to Call (dropdown: Morning/Afternoon/Evening), Photo Upload (input type=file, labeled as placeholder)
- Form action: `mailto:jaramillolandscaping208@gmail.com`
- "What happens next" section: 3-step process (We review your request → We call to schedule → We provide your free estimate)
- "We respond within 24 hours" promise
- Phone as alternative: "Prefer to call? 208-863-4371"

---

### thank-you.html — Thank You

**SEO:** `Thank You | Jaramillo Landscape`

- No breadcrumb (terminal page)
- Centered layout
- Large checkmark icon
- H1: "Thank You! We'll Be in Touch Soon."
- Body: "We've received your request and will contact you within 24 hours. If you need immediate assistance, call us at 208-863-4371."
- CTA: "Back to Home"

---

## JavaScript (main.js)

Five behaviors:

1. **Sticky nav shadow** — adds `.scrolled` class to `<header>` after 20px scroll. CSS transitions box-shadow.

2. **Services dropdown** — desktop hover + keyboard, mobile tap toggle. Closes on outside click and Escape.

3. **Accordion** — handles both FAQ page (categorized) and FAQ sections on home/service pages. Click toggles `aria-expanded`. Height animates via `max-height` transition (200ms ease-out). Only one item open at a time per accordion group.

4. **Gallery filter** — buttons set `data-active` on themselves. JS loops all gallery cards, shows/hides by matching `data-category` to active filter. "All" shows everything.

5. **Scroll fade-in** — `IntersectionObserver` adds `.visible` class to elements with `data-animate` attribute. CSS: `opacity: 0; transform: translateY(16px)` → `opacity: 1; transform: translateY(0)` (300ms ease-out). Respects `prefers-reduced-motion`.

### Form submission (mailto redirect)

Both forms use `action="mailto:jaramillolandscaping208@gmail.com"` with `method="post" enctype="text/plain"`. Since `mailto:` opens the OS email client but doesn't navigate away, the form's `onsubmit` handler uses `setTimeout(() => { window.location = 'thank-you.html'; }, 800)` to redirect after a brief delay — giving the email client time to open before navigating.

---

## Accessibility & SEO

- Every page has unique `<title>` and `<meta name="description">`
- Semantic HTML5: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`
- All images have `alt` text (including placeholders)
- Accordion uses `aria-expanded` and `aria-controls`
- Nav dropdown uses `aria-haspopup` and `aria-expanded`
- Color contrast meets WCAG AA for all text on backgrounds
- `prefers-reduced-motion` respected for all animations
- Phone number in `<a href="tel:2088634371">` on every page

---

## Trust Signals Checklist

Every page must have:
- [ ] Phone number in nav (clickable)
- [ ] Phone number in footer (clickable)
- [ ] "10% Off All Projects" badge in footer
- [ ] "Licensed & Insured" in footer
- [ ] Real email and address in footer

Service pages additionally:
- [ ] "Get a Free Estimate" CTA in hero
- [ ] "Get a Free Estimate" CTA at bottom

---

## Out of Scope

- Backend / server-side code
- CMS or admin interface
- Real photos (all placeholders)
- Google Analytics / tracking
- Live chat widget
- Blog
