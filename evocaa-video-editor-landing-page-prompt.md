# PROMPT / BUILD BRIEF
## Evocaa — "Video Editor (Full-Time)" Hiring Landing Page

> Structured **design + build prompt**, not code. Hand this to a developer or an AI page-builder (v0, Framer AI, Claude Code, etc.) and it contains everything needed to produce the actual responsive site — copy, visual system, quiz/assessment logic, and scoring.

> **Note:** This brief supersedes the earlier Educate.io draft. The role, company, location, and full assessment content below come from the client-provided document (`Video_Editor_Hiring_Landing_Page_content_Evocaa.docx`) and are reproduced exactly. The dark editorial visual system and the numbered-pill quiz UI from the earlier draft are carried over and refined here, and a full responsive design spec has been added.

---

## 1. THE CONCEPT — What This Page Is

A **single-role hiring landing page** for Evocaa's Video Editor position, built as a three-act funnel:

1. **Hook** — cinematic dark hero establishing the role as premium and selective.
2. **Convince** — role, requirements, growth story ("What You'll Learn"), and a hard filtering section ("You Shouldn't Apply If") that repels casual applicants.
3. **Convert & Screen** — one **"Apply Now"** CTA opens a full **6-step, multi-part hiring assessment** (not a simple form). Candidates never see whether an answer was correct or their score. Evocaa's hiring team instead receives a complete, scored application record.

**Tone:** confident, selective, "we hire mindset over resume" energy. Dark, editorial, high-craft — matches a company that talks about marketing psychology and performance, not a generic corporate careers page.

---

## 2. VISUAL DIRECTION — Dark Theme

**Mood:** an editing suite after hours — moody screen-glow lighting, timeline UI energy, premium streaming-service job-post feel rather than SaaS-corporate.

**Palette**
- Background: near-black `#0A0A0B` / `#0D0D10`
- Secondary surface (cards/panels): charcoal `#151518` / `#1B1B1F`
- Text: off-white `#F5F5F3`; secondary/muted `#9A9AA2`
- Accent: pick ONE and use consistently — electric violet-blue gradient (`#7C5CFF` → `#4C8DFF`) to match the quiz reference style, or an editorial lime `#D4FF3F` / signal red `#FF3B30` if a punchier brand feel is wanted. **Default recommendation: violet→blue gradient**, since it also drives the quiz screens.
- Borders/dividers: hairline `#2A2A2E` at low opacity; glowing borders use accent at ~30–40% opacity with a soft outer blur.

**Typography**
- Display/headings: tight, bold, slightly condensed sans (Neue Montreal / General Sans / Inter tight-tracked). Uppercase for small labels ("LOCATION", "FULL-TIME").
- Body: clean readable sans, generous line-height, muted gray for secondary copy.
- Numbered content (assessment steps, "What You'll Do" bullets) styled with a monospace/timecode feel in the accent color for numerals.

**Motion / atmosphere**
- Scroll-reveal: content rises ~12px + fades in as it enters viewport.
- Hero image: slow Ken Burns zoom (scale 1.0 → 1.05 over ~20s).
- Soft accent-color glow behind primary CTA buttons and behind the quiz card.
- Low-opacity film-grain/noise overlay (2–4%) across dark sections for texture.
- All motion must respect `prefers-reduced-motion` — disable parallax/zoom/glow-pulse for users who request it.

**Layout language**
- Alternate section background shades (`#0A0A0B` / `#151518`) to create scroll rhythm.
- Centered content column, ~720–900px max-width on desktop for readability; images/banners can go full-bleed.

---

## 3. RESPONSIVE DESIGN SYSTEM — Mandatory, Not Optional

The page **must render correctly and feel intentional at every size**, from small phones to large desktop monitors — not just "not broken," but properly re-composed at each breakpoint.

### 3.1 Breakpoints (mobile-first)

| Name | Width range | Layout behavior |
|---|---|---|
| `xs` (small phone) | ≤ 380px | Single column, tightest padding (16px side gutters), smallest type scale |
| `sm` (phone) | 381–599px | Single column, 20–24px gutters |
| `md` (tablet portrait) | 600–899px | Single column content, 2-col grids allowed for short lists (e.g. Ideal Candidate) |
| `lg` (tablet landscape / small laptop) | 900–1199px | 2-column layout starts for requirement cards, nav goes horizontal |
| `xl` (desktop) | 1200–1599px | Full desktop layout, max-width content column, multi-column grids |
| `xxl` (large desktop) | ≥ 1600px | Same as `xl` but content column stays capped (don't stretch text edge-to-edge); background/imagery can extend full-bleed |

### 3.2 Fluid rules (use throughout, don't hard-jump only at breakpoints)

- **Typography:** use `clamp()` for all headings and hero title, e.g. `font-size: clamp(2rem, 5vw + 1rem, 4.5rem)` for the H1, so text scales smoothly between breakpoints instead of jumping.
- **Spacing:** section vertical padding scales with viewport (`clamp(48px, 8vw, 120px)`), not a fixed pixel value.
- **Images:** all hero/section images use `object-fit: cover` with defined aspect-ratio boxes so they never distort or overflow on narrow screens.
- **Grid → stack:** every multi-column grid (Ideal Candidate checklist, Requirements cards, meta row) must degrade to a single column below `md`. No horizontal scrolling of content, ever (quiz option lists, cards, etc.) — only intentional carousels, if used, should scroll horizontally.

### 3.3 Component-specific responsive behavior

- **Nav:** horizontal menu on `lg`+; collapses to a hamburger/slide-in menu on `md` and below. Logo/back-link always visible.
- **Hero meta row** (Location / Type): 2-column grid on mobile, single row of pills/columns on tablet+.
- **Job Summary / Your Role / What You'll Learn text blocks:** full-width single column at all sizes, max-width capped (~65ch) for readability even on large screens.
- **Ideal Candidate checklist:** 1 column on `xs/sm`, 2 columns on `md+`.
- **Requirements cards:** stacked full-width cards on mobile/tablet; can sit side-by-side (2-up) from `lg` up if content length allows, otherwise stay stacked for readability — prioritize legibility over forcing a grid.
- **"What You'll Do" / "What You'll Learn" numbered lists:** stacked full-width rows on mobile; can become a 2-column grid on `lg+`.
- **"You Shouldn't Apply If" block:** stays single column always (high-contrast filtering block reads better as a vertical list at any size).
- **CTA banners:** button and heading stack vertically centered on mobile; sit side-by-side or centered stacked with larger type on desktop.
- **Assessment/quiz card (all 6 steps):**
  - Mobile: full-viewport-width card (with side gutters), pill options stack full-width, numbered badge stays visible, text wraps to 2 lines max before truncation is avoided by shrinking font slightly via `clamp()`.
  - Tablet/Desktop: card caps at ~560–640px width, centered, with generous margin around it so it reads as a focused "console," matching the reference design.
  - Multi-select and text-area inputs must be full-width and thumb-friendly (min 44px touch target height) on mobile.
- **Progress indicator:** condensed to a simple "Step 3 of 6 · Question 4/10" text + slim bar on mobile; can show a fuller segmented step tracker (labelled: Basic Info → Professional → Technical → Work Style → Portfolio → Final) on tablet/desktop.
- **Footer:** links stack vertically on mobile, inline with separators on tablet+.

### 3.4 Testing checklist for responsiveness

- [ ] 360px width (small Android) — no horizontal scroll, no overlapping text
- [ ] 390–430px (modern iPhones) — hero title readable in 2–3 lines, CTA thumb-reachable
- [ ] 768px (iPad portrait) — 2-column shifts trigger correctly
- [ ] 1024–1280px (iPad landscape / small laptop) — nav horizontal, cards start pairing
- [ ] 1440px+ (standard desktop) — content column doesn't over-stretch; line length stays readable
- [ ] 1920px+ (large monitor) — background/imagery fills width, text column stays capped and centered

---

## 4. IMAGERY — Unsplash Concept

Use real Unsplash photography (via `https://source.unsplash.com/1600x900/?query` or the Unsplash API) for every visual slot instead of custom photography. Every image gets a dark gradient overlay (`linear-gradient(rgba(10,10,11,.55), rgba(10,10,11,.88))`) so it sits inside the dark theme rather than looking like a bright stock photo dropped in. Slightly desaturate all images for consistency.

| Section | Purpose | Suggested Unsplash query |
|---|---|---|
| Hero background | Cinematic opener behind "VIDEO EDITOR" title | `video editing dark studio` / `film editor monitor night` |
| Job Summary divider | Break after summary | `smartphone reels filming` / `content creator phone dark` |
| Your Role section | Supports role narrative | `video editor timeline screen` |
| Requirements card visual | Software/tools imagery | `davinci resolve editing desk` / `adobe premiere dark screen` |
| What You'll Learn section | Growth / learning energy | `creative team laptop night` / `marketing analytics screen dark` |
| Assessment intro screen | Sets serious, focused tone before Step 1 | `camera lens macro dark` / `film clapperboard dark` |
| CTA banners (mid + pre-footer) | High-contrast push to apply | `neon sign dark` / `studio light bokeh dark` |
| Footer | Faint texture only | `dark abstract gradient texture` |

---

## 5. PAGE COPY — Reproduced Exactly From Client Content

### 5.1 Hero
- Small back link: `← Back to Careers`
- Title: **VIDEO EDITOR (FULL-TIME)**
- Meta row:
  - `Location` → Coimbatore (Work from Office)
  - `Type` → Full-Time

### 5.2 Job Summary
> We're looking for a creative Video Editor who understands storytelling, marketing psychology, and short-form content — not just editing software.

### 5.3 Your Role — "What success looks like."
- Edit high-performing Instagram Reels & YouTube Shorts
- Create engaging marketing videos
- Work closely with the content and marketing team
- Improve videos based on performance data and feedback
- Deliver projects on time

### 5.4 Ideal Candidate — "You are someone who:"
- Loves storytelling
- Learns quickly
- Accepts feedback positively
- Has strong attention to detail
- Enjoys solving creative problems
- Wants long-term career growth

### 5.5 Our Hiring Philosophy (standalone callout block — visually distinct, e.g. bordered quote card)
> We don't hire based only on certificates or years of experience. We hire people with the right mindset, a willingness to learn, and the ability to solve real problems. If you can prove your skills through our assessment, we care more about your potential than your resume.

### 5.6 Requirements — "Minimum qualifications."
- Experience with DaVinci Resolve & Adobe Premiere Pro
- Basic knowledge of After Effects
- Understanding of short-form content
- Basic color correction and audio editing
- Portfolio with previous work
- Ability to meet deadlines

### 5.7 What You'll Do — "Day-to-day responsibilities."
- Edit 3–5 short-form videos daily
- Add captions, sound effects, and motion graphics
- Follow brand guidelines
- Organize project files
- Collaborate with designers and marketers
- Continuously improve editing quality

### 5.8 What You'll Learn — "This section attracts ambitious candidates." (At Evocaa, you'll learn:)
- Marketing psychology
- Storytelling for conversions
- Performance-focused editing
- AI tools for content creation
- Personal branding content
- High-retention video strategies

### 5.9 You Shouldn't Apply If — "This is an excellent filtering section." (Don't apply if you:)
- Can't accept constructive feedback
- Frequently miss deadlines
- Prefer working without accountability
- Only know basic template editing
- Are looking for a temporary job
- Aren't willing to learn and improve

### 5.10 Pre-Apply Callout — "Think You're a Fit? Apply Today."
> Before applying, remember:
> - Complete the assessment honestly.
> - Only candidates who meet our benchmark will move to the next stage.
> - Shortlisted candidates will be contacted within **3 business days**.

**CTA Button:** `Apply Now`

### 5.11 Footer
Standard: nav links (Privacy Policy / Terms & Conditions / Contact Us), company legal line, © year — reuse dark footer pattern from Section 2.

---

## 6. THE ASSESSMENT FLOW — "Video Editor Hiring Assessment"

Clicking **Apply Now** opens a dedicated multi-step assessment experience (in-page flow, not a plain external link-out). It is explicitly branded as an **assessment**, not just a form, matching the client's copy: candidates are told upfront that only those meeting the benchmark advance, which sets the tone for a serious, focused flow.

**Global assessment UX rules:**
- Never show correctness, running score, or pass/fail state to the candidate at any point.
- Persist progress locally (localStorage/session) so refreshing mid-assessment doesn't lose answers.
- Step tracker always visible: `Step X of 6` with step names (Basic Info · Professional Info · Technical Assessment · Work Style & Problem Solving · Portfolio Evaluation · Final Questions).
- Final screen is a neutral, warm confirmation only — never reveals score:
  > "Thanks, [Name] — your assessment has been submitted. Shortlisted candidates will be contacted within 3 business days."

### STEP 1 — Basic Information (Personal Details)
1. Full Name *
2. Mobile Number *
3. Email Address *
4. Current City *
5. Portfolio Link (Google Drive, Behance, YouTube, Instagram, or Personal Website) *
6. Resume (Optional, file upload)

*(Not scored — identity/contact fields, always sent to HR in full.)*

### STEP 2 — Professional Information (Experience)
1. How many years of professional video editing experience do you have? — *Fresher / Less than 1 year / 1–2 years / 2–4 years / 4+ years*
2. What editing software do you use regularly? *(select all that apply)* — Adobe Premiere Pro, After Effects, DaVinci Resolve, Final Cut Pro, CapCut, Photoshop, Illustrator, Other
3. Which type of content have you edited the most? — Instagram Reels, YouTube Shorts, YouTube Long-form Videos, Corporate Videos, Commercial Ads, Podcasts, Wedding Videos, Other
4. What is your current monthly salary? *(open text/number)*
5. What is your expected monthly salary? *(open text/number)*
6. What is your notice period? — Immediate / Within 7 Days / Within 15 Days / Within 30 Days / More than 30 Days

*(Not auto-scored — context for HR fit/budget/logistics review; sent verbatim.)*

### STEP 3 — Technical Assessment (40 Marks — auto-scored, 4 marks each, single correct answer per question)

> ⚠️ Correct answers below are for the internal scoring engine only. **Never render the ✅ marker, correctness, or point values in the candidate-facing UI.** Options display in the given order with no visual distinction for the correct one.

1. Which software is primarily used for motion graphics? — Adobe Premiere Pro / **Adobe After Effects ✅** / Adobe Photoshop / Canva
2. Which aspect ratio is best for Instagram Reels? — 16:9 / **9:16 ✅** / 1:1 / 4:3
3. What is the main purpose of B-roll footage? — Increase video length / **Support the main story visually ✅** / Add background music / Reduce file size
4. Which export format is most commonly used for social media? — **MP4 (H.264) ✅** / MOV / AVI / GIF
5. What is the most important goal of the first 3 seconds of a short-form video? — Display the logo / Introduce the editor / **Grab the viewer's attention ✅** / Show credits
6. Why are captions important in short-form content? — They reduce file size / **They improve viewer retention and accessibility ✅** / They improve camera quality / They make exporting faster
7. Which editing technique removes awkward pauses while keeping the video engaging? — Color grading / **Jump cuts ✅** / Masking / Tracking
8. Which audio issue should always be fixed before exporting? — Low saturation / **Background noise ✅** / Frame rate / White balance
9. What is the purpose of keyframes? — Export videos faster / **Animate properties over time ✅** / Compress videos / Improve internet speed
10. What is more important in a marketing video? — Fancy transitions / **Storytelling and audience retention ✅** / Expensive camera footage / Slow-motion effects

**Scoring:** 10 questions × 4 marks = **40 marks**, auto-calculated, stored, never shown to candidate.

### STEP 4 — Work Style & Problem Solving (20 Marks — auto-scored, 4 marks each)

1. A client requests multiple revisions. What would you do? — Refuse the request / **Understand the feedback and improve the edit ✅** / Ignore the request / Deliver the same version again
2. You realize you cannot meet today's deadline. What should you do first? — Wait and hope for more time / **Inform the team immediately and suggest a solution ✅** / Ignore the deadline / Submit unfinished work
3. You receive constructive feedback on your edit. How do you respond? — Defend every decision / **Review the feedback and improve the video ✅** / Ignore the feedback / Leave the project
4. Your teammate is struggling with a project and asks for help. What do you do? — Ignore the request / **Help if you're available and communicate with the team ✅** / Tell them to figure it out themselves / Report them to the manager
5. Which statement best describes your editing approach? — I edit to impress other editors. / **I edit to help the audience understand and take action. ✅** / I only focus on visual effects. / I only follow trends.

**Scoring:** 5 questions × 4 marks = **20 marks**, auto-calculated, never shown to candidate.

### STEP 5 — Portfolio Evaluation (qualitative — manually reviewed by HR)
1. Share your best editing project. *(Link required)*
2. Which project are you most proud of, and why? *(short answer)*
3. If we contact one of your previous clients or employers, what would they say is your biggest strength? *(short answer)*

*(Not auto-scored — flagged for human reviewer; allocate up to a portion of the qualitative score band, see Section 7.)*

### STEP 6 — Final Questions (qualitative — manually reviewed by HR)
1. Why do you want to join Evocaa? *(long answer)*
2. Why should we hire you instead of other candidates? *(long answer)*
3. What editing skill are you currently learning or improving? *(long answer)*
4. Is there anything else you'd like us to know? *(optional)*

*(Not auto-scored — human reviewed.)*

---

## 7. SCORING MODEL & HR HANDOFF

**Composition of the 100-point total:**

| Component | Points | Scoring method |
|---|---|---|
| Step 3 — Technical Assessment | 40 | Auto (exact-match correct answer) |
| Step 4 — Work Style & Problem Solving | 20 | Auto (exact-match "best" answer) |
| Step 5 — Portfolio Evaluation | up to 25 | Manual — HR reviewer scores link quality/relevance + short answers |
| Step 6 — Final Questions | up to 15 | Manual — HR reviewer scores motivation/fit from long answers |
| **Total** | **100** | Auto (60) + Manual (40), combined only in the HR dashboard |

- Auto-scored portion (60 pts) is calculated instantly on submission.
- Manual portion (40 pts) starts as "Pending Review" until an HR reviewer scores Steps 5–6 in the internal dashboard/CRM; final combined score then finalizes.
- **At no point does the candidate see any score, band, correctness, or "pending review" language that implies grading** — their experience ends at the neutral thank-you screen from Section 6.

**HR notification payload** (sent via email/Slack/webhook/CRM on submission; auto-score portion included immediately, manual portion added when reviewed):

```
NEW APPLICATION — Video Editor (Full-Time) — Evocaa

Candidate: [Full Name]
Mobile: [Mobile Number]
Email: [Email Address]
City: [Current City]
Portfolio: [Portfolio Link]
Resume: [attached / not provided]

Experience: [years]
Software: [selected tools]
Content type: [selected]
Current salary: [value]
Expected salary: [value]
Notice period: [value]

Auto Score — Technical (Step 3): [x]/40
Auto Score — Work Style (Step 4): [x]/20
Auto Subtotal: [x]/60

Portfolio Evaluation (Step 5 answers): [full text/links — for manual scoring]
Final Questions (Step 6 answers): [full text — for manual scoring]

Manual Score: Pending Review
Combined Score: [Auto]/60 + Manual (pending)

Submitted: [timestamp]
```

- Optional: auto sort/tag by auto-score band for triage priority (e.g., 50+/60 auto = "Priority Review"), internal-only, never candidate-facing.

---

## 8. QUIZ / ASSESSMENT VISUAL DESIGN (reference-image style)

Applies to every multiple-choice / multi-select screen across all 6 steps:

- **Background:** deep near-black with a soft violet-to-blue radial glow behind the card.
- **Question heading:** centered, 2–3 lines max, mixed-weight text — base copy in soft off-white, one key phrase bolded pure white, one key phrase in the accent gradient color — mirrors the reference sample's "bold white phrase + colored phrase" pattern.
- **Options panel:** single rounded card (~24px radius) with a thin glowing accent border (soft outer blur), background slightly lighter than page (`#111118`).
- **Option rows:** full-width rounded pills, gradient fill (violet → blue) identical across all options (no option should look "more correct"), left-aligned white label text, small circular numbered badge overlapping the pill's left edge.
- **Interaction:** hover/tap = slight scale-up (1.02) + glow increase, brief highlight pulse on selection, then auto-advance. No color-coded correctness feedback ever.
- **Progress:** minimal segmented bar or "Step 3 of 6 · Q4/10" label — position only, never a score.
- **Multi-select variant** (e.g. Step 2 Q2 "select all that apply"): same pill style but with a checkbox-style indicator inside the numbered badge slot instead of single-select radio behavior; requires an explicit "Continue" button rather than auto-advance.
- **Open-text / long-answer steps** (Step 2 salary fields, Step 5, Step 6): same glowing-bordered card, but content area is a large rounded textarea/input instead of a pill list, keeping heading treatment identical for visual continuity.
- **File upload (Resume, Step 1):** styled as a dashed-border glowing dropzone consistent with the dark theme, optional, clearly labeled.
- Fully responsive per Section 3.3 — card width caps on desktop, goes full-width-with-gutters on mobile, all touch targets ≥44px.

---

## 9. FUNCTIONAL / TECH NOTES

- Single accent gradient used consistently across CTAs, quiz pills, progress bar, links, and glowing borders — everything else stays grayscale/dark.
- Sticky compact "Apply Now" pill in nav appears once user scrolls past hero.
- Form/assessment state persists across accidental refresh (localStorage/session) per step.
- All required fields validated inline (email format, phone format) with neutral, non-judgmental error styling (still dark-themed, not harsh red-on-white).
- Accessibility: sufficient contrast for text on dark backgrounds (WCAG AA minimum), focus states visible on all interactive elements, respects `prefers-reduced-motion`.
- No placeholder/lorem ipsum — all copy sourced from Sections 5 and 6 verbatim.

---

## 10. VOICE & TONE FOR ANY NEW MICRO-COPY

Confident, direct, selective — matches Evocaa's "we care about potential, not resumes" philosophy. Short sentences, active voice, no emoji, no hype exclamation marks; let the visual design carry energy.

Acceptable examples: `"Let's see what you've got."` · `"Step 3 of 6 — Technical Assessment."` · `"Submitted. We'll be in touch within 3 business days."`

---

## 11. DELIVERABLE CHECKLIST

- [ ] Fully responsive from 360px to 1920px+ per Section 3 (fluid type/spacing, no horizontal scroll, breakpoint-correct grid→stack behavior)
- [ ] Dark-theme hero with Unsplash cinematic background + overlay
- [ ] All Evocaa job-post copy reproduced faithfully (Section 5)
- [ ] "Our Hiring Philosophy" styled as a distinct callout/quote block
- [ ] Ideal Candidate, Requirements, What You'll Do, What You'll Learn, You Shouldn't Apply If — all sections present and responsive
- [ ] Repeated CTA pattern (pre-apply callout + sticky nav CTA)
- [ ] Full 6-step assessment flow implemented exactly per Section 6 (fields, options, order)
- [ ] Step 3 (40 marks) and Step 4 (20 marks) auto-scored server-side using the answer key in Section 6 — never exposed client-side
- [ ] Steps 5–6 flagged for manual HR scoring per Section 7's 25/15-point allocation
- [ ] Quiz visual system per Section 8 (glowing card, numbered gradient pills, mixed-weight heading, neutral feedback)
- [ ] HR payload matches format in Section 7 (identity + logistics + auto score + full qualitative answers)
- [ ] Candidate-facing UI never reveals correctness, score, or pass/fail at any step
- [ ] Accessibility and reduced-motion support
