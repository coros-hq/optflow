---
name: Optflow
description: A sunlit, warm-paper studio site with one confident orange signal, pill-shaped controls and soft rounded cards.
colors:
  signal-orange: "#e8480c"
  signal-orange-bright: "#ff5a1f"
  flow-blue: "#2f6fd6"
  warm-paper: "#f4f4f1"
  card-paper: "#fbfbf9"
  cta-paper: "#ebebe7"
  graphite-ink: "#454542"
  quiet-stone: "#7d7d78"
  logo-stone: "#a5a5a0"
  sky-top: "#5f93e3"
  sky-bottom: "#b4cdf4"
typography:
  display:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(52px, 5vw, 132px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "clamp(32px, 4.6vw, 58px)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  tag: "999px"
  button: "999px"
  art: "20px"
  step: "24px"
  card: "28px"
  cta: "40px"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  grid-gap: "24px"
  section-top: "clamp(70px, 10vw, 140px)"
  card-pad: "12px"
  panel-pad: "32px"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  button-primary-lg:
    backgroundColor: "{colors.signal-orange}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "18px 34px"
  button-light:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  button-light-hover:
    textColor: "{colors.flow-blue}"
  tag:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.tag}"
    padding: "5px 12px"
  card:
    backgroundColor: "{colors.card-paper}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.card}"
    padding: "12px"
  plan-featured:
    backgroundColor: "{colors.flow-blue}"
    textColor: "#ffffff"
    rounded: "{rounded.card}"
    padding: "32px"
  nav:
    backgroundColor: "{colors.warm-paper}"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.button}"
    padding: "10px 12px 10px 20px"
---

# Design System: Optflow

## Overview

**Creative North Star: "The Daylight Studio"**

Optflow reads as a sunlit room: warm paper surfaces, graphite type, a pixel-cloud sky in the hero, and a single confident orange signal that says "act here." Blue is its cool counterpart, used for hover, the featured plan and ambient glow. Everything is soft and rounded (pills, 28px cards) so the studio feels friendly and approachable to a business owner, while small uppercase mono labels keep a layer of engineering precision underneath.

The system is calm and spacious. Sections breathe with large top padding, content sits on hairline borders instead of heavy boxes, and depth is flat at rest with a gentle lift on hover. Motion is slow and light: scroll reveals, a drifting mesh, a marquee, Lenis smooth scroll.

**Key Characteristics:**
- Warm off-white paper, never pure white or black.
- One orange accent for actions and emphasis; blue as the secondary voice.
- Pill buttons, tags and nav; large-radius cards.
- Tight negative-tracked Outfit headlines paired with Geist Mono micro-labels.
- Flat at rest, lift on hover; hairline borders over shadows.

## Colors

A warm paper neutral base with an orange signal and a blue counter-accent, set against a daytime sky gradient in the hero.

### Primary
- **Signal Orange** (#e8480c): primary buttons, the `em` emphasis color, service-title hover and the orange glow in the CTA and mesh background.
- **Signal Orange Bright** (#ff5a1f): the highlighted line of the hero headline only, where it sits on the sky and needs more punch.

### Secondary
- **Flow Blue** (#2f6fd6): hover state for light buttons, the featured pricing plan, the blue half of the logo mark, the CTA's lower-right glow.

### Neutral
- **Warm Paper** (#f4f4f1): page background and the base of the frosted nav (80% opacity).
- **Card Paper** (#fbfbf9): cards, plans, steps, quotes and tags; one step lighter than the page.
- **CTA Paper** (#ebebe7): base of the closing call-to-action panel, one step darker than the page.
- **Graphite Ink** (#454542): all body and heading text; warm, not black.
- **Quiet Stone** (#7d7d78): secondary copy, eyebrows, numerals, footer links.
- **Logo Stone** (#a5a5a0): client name wordmarks in the marquee.
- **Hairline** (rgba(69,69,66,0.14)): every border and divider.
- **Sky Top / Sky Bottom** (#5f93e3 / #b4cdf4): the hero's cloud-sky gradient.

### Named Rules
**The One Signal Rule.** Orange marks the action or the emphasis, nothing else. If two orange things compete in a viewport, one of them should not be orange.
**The Warm Neutral Rule.** No pure white page or pure black text. Neutrals lean warm (paper and graphite); white appears only as text on orange or blue fills.

## Typography

**Display Font:** Outfit (with system-ui, sans-serif)
**Body Font:** Outfit (with system-ui, sans-serif)
**Label/Mono Font:** Geist Mono (with ui-monospace, monospace)

**Character:** One friendly geometric sans does all the talking, set tight and large for headlines, while a small uppercase mono voice adds timestamps, numbering and eyebrow labels.

### Hierarchy
- **Display** (500, clamp(52px, 5vw, 132px), 1.2): hero headline only; centered, tracking -0.045em.
- **Headline** (500, clamp(32px, 4.6vw, 58px), 1.05): section titles (h2), max 16ch; the CTA headline scales up to 84px.
- **Title** (500, 32px, 1.05): card, post and plan headings; services scale 26-40px, process steps 36px.
- **Body** (400, 16px, 1.55): paragraphs, capped around 44-70ch; secondary text uses Quiet Stone.
- **Label** (500, 12px, 0.08em tracking, uppercase, Geist Mono): eyebrows, numerals, clock, email chip.

### Named Rules
**The Tight Headline Rule.** Headlines always carry negative letter-spacing (-0.035em to -0.045em) and a line-height near 1.05; loosening them breaks the voice.
**The Mono Whisper Rule.** Mono is for 12px uppercase labels only. It never carries sentences.

## Layout

Single-page vertical flow of full-width sections inside a fluid gutter (clamp(20px, 5vw, 72px)). Each section opens with a large top pad (clamp(70px, 10vw, 140px)) and a header row (eyebrow, h2, optional tag list) that wraps on narrow screens. Grids use a consistent 24px gap: two columns for work and posts, three for process steps, plans and quotes. Services and FAQ are ruled lists with a hairline top border and numbered rows (60px numeral column, then title and detail).

At 900px and below, nav links hide, all multi-column grids collapse to one column, and the hero footer stacks and centers.

## Elevation & Depth

Flat at rest. Surfaces are separated by tone (card paper on warm paper) and 1px hairline borders, not shadows. Depth appears as a response: cards lift 6px with a long soft shadow on hover, buttons lift 2px. The only persistent depth effects are the frosted, blurred floating nav and the soft blurred color blobs in the mesh and CTA backgrounds.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 30px 60px -30px rgba(69, 69, 66, 0.35)`): card hover only.
- **Signal glow** (`box-shadow: 0 8px 20px -8px rgba(232, 72, 12, 0.6)`): resting shadow under the orange primary button.

### Named Rules
**The Flat-By-Default Rule.** Nothing carries a shadow at rest except the orange primary button's glow. Shadows are a hover response.

## Shapes

Pills for everything interactive or label-like (buttons, tags, nav, 999px). Radii scale with container size and nest cleanly: 28px cards hold 20px art tiles inside 12px padding; 24px for steps and quotes; 40px for the closing CTA panel. The logo mark is a 22px square with 6px corners, rotated 12deg and filled with an orange-blue conic gradient. Chevrons and checks are drawn with borders, not icon files.

## Components

### Buttons
- **Shape:** full pill (999px).
- **Primary:** Signal Orange fill, white text, 12px 22px padding (large: 18px 34px, 17px type), orange glow shadow.
- **Hover / Focus:** lifts 2px over 0.25s.
- **Light:** Card Paper fill, hairline border; on hover border and text turn Flow Blue.

### Tags
- **Style:** pill, 13px text, hairline border, translucent Card Paper fill, 5px 12px padding.

### Cards / Containers
- **Corner Style:** 28px (steps and quotes 24px).
- **Background:** Card Paper with a hairline border.
- **Shadow Strategy:** none at rest; Card lift on hover (see Elevation).
- **Internal Padding:** work cards 12px outer around a 20px-radius art tile and a 22px 14px 14px body; steps, quotes and plans 32px.

### Navigation
- Floating, fixed 16px from the top, pill-shaped, frosted (warm paper at 80% with 14px blur) and hairline-bordered. Logo mark plus lowercase wordmark at left, 15px links at 75% opacity rising to 100% on hover, orange "Book a call" pill at right. Links hide on mobile.

### Pricing Plans
- Three cards at 32px padding. The featured plan inverts to Flow Blue with white text and a white-on-blue light button.

### FAQ
- Native `details` rows with a hairline divider, a mono numeral, a 22px question and a border-drawn chevron that rotates open.

### Hero Sky (signature)
- Full-viewport hero with a canvas pixel-cloud on a blue sky gradient, centered display headline with an orange highlighted second line, and a three-part footer: live clock, tagline, copyable email.

## Do's and Don'ts

### Do:
- **Do** keep orange (#e8480c) to actions and a single emphasis per view.
- **Do** use pill radii (999px) for anything clickable or label-like and 24-28px for containers.
- **Do** separate surfaces with a tone step and the 14% hairline, and reserve shadows for hover.
- **Do** set headlines in Outfit 500 with negative tracking and use Geist Mono only for 12px uppercase labels.
- **Do** honor `prefers-reduced-motion`; reveals, marquee and lifts must switch off.

### Don't:
- **Don't** use pure white backgrounds or pure black text.
- **Don't** introduce a third accent hue beyond orange and blue.
- **Don't** add resting drop shadows to cards or tags.
- **Don't** set sentences or body copy in the mono face.
- **Don't** swap the pill buttons for square or lightly rounded ones.
