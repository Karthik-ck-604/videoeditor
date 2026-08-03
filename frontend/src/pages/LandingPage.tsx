import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { getLenis } from '@/lib/lenis';

interface LandingPageProps {
  onApply: () => void;
}

const UNSPLASH = {
  hero: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=85&auto=format&fit=crop',
  cta: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80&auto=format&fit=crop',
};

const ROLE_BULLETS: { text: string; tag: string }[] = [
  {
    text: 'Own short-form performance — edit Reels & Shorts engineered to stop the scroll and convert viewers into followers.',
    tag: 'Core',
  },
  {
    text: 'Translate raw footage into brand-aligned stories that feel native to each platform — not like ads.',
    tag: 'Creative',
  },
  {
    text: 'Study retention curves and drop-off points. Iterate on cuts, pacing, and hooks until the numbers move.',
    tag: 'Analytical',
  },
  {
    text: 'Partner directly with the content strategist and marketing lead — your edits shape campaign direction.',
    tag: 'Collaborative',
  },
  {
    text: 'Maintain a consistent output cadence without compromising quality — reliability is non-negotiable here.',
    tag: 'Ownership',
  },
];

const IDEAL_BULLETS = [
  'Watches content analytics like a hawk',
  'Can identify why a video underperformed in 60 seconds',
  'Treats feedback as signal, not criticism',
  'Has an eye for pacing, rhythm, and visual tension',
  'Thinks about the viewer, not just the edit',
  'Takes creative ownership and runs with a brief',
  'Shows up consistently — no hand-holding required',
  'Hungry to grow beyond where they are today',
];

const REQUIREMENT_CARDS = [
  {
    title: 'Software & Technical',
    items: [
      'Proficient in DaVinci Resolve and/or Adobe Premiere Pro',
      'Working knowledge of After Effects for motion graphics',
      'Solid color correction and audio mixing fundamentals',
      'Comfortable working with LUTs, transitions, and overlays',
    ],
  },
  {
    title: 'Skills & Portfolio',
    items: [
      'Deep understanding of short-form content mechanics',
      'Portfolio that demonstrates hook-first editing thinking',
      'Proven ability to meet tight turnaround deadlines',
      'Bonus: experience with A/B testing video variants',
    ],
  },
];

const DAILY_TASKS = [
  {
    task: 'Edit 3–5 short-form videos per day across platforms',
    detail: 'Reels, Shorts, TikTok — each with platform-native pacing and hook structure.',
  },
  {
    task: 'Embed captions, SFX, and motion accents that amplify emotion',
    detail: 'Not decoration — these elements are part of the storytelling.',
  },
  {
    task: 'Adhere to brand guidelines while pushing creative boundaries',
    detail: 'The best editors work within constraints, not despite them.',
  },
  {
    task: 'Maintain clean, versioned project file architecture',
    detail: 'Speed comes from organisation. Chaos kills output quality.',
  },
  {
    task: 'Sync daily with designers, strategists, and campaign leads',
    detail: 'Your edit is one piece of a larger performance puzzle.',
  },
  {
    task: 'Review performance data and refine your editing decisions weekly',
    detail: 'If you\'re not looking at the numbers, you\'re just guessing.',
  },
];

const FILTER_ITEMS = [
  "Treat feedback as personal criticism and shut down",
  'Miss deadlines without a heads-up — ever',
  'Need constant direction to produce consistent output',
  'Rely on templates and presets as a substitute for craft',
  'Are looking for a freelance side-project or temp gig',
  "Aren't interested in studying what actually performs",
  'Prioritise your own aesthetic over the audience\'s experience',
];

const NAV_LINKS = [
  { label: 'The Role', href: '#role' },
  { label: 'Requirements', href: '#requirements' },
  { label: 'Day-to-Day', href: '#day-to-day' },
];

const META_ITEMS = [
  { label: 'Date Posted', value: 'Jul 31, 2026' },
  { label: 'Team', value: 'Content & Marketing' },
  { label: 'Location', value: 'Coimbatore (Office)' },
  { label: 'Type', value: 'Full-Time' },
];

function scrollToHash(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -96 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function LandingPage({ onApply }: LandingPageProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -40% 0px' },
    );

    document.querySelectorAll('#role, #requirements, #day-to-day').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <div className="min-h-screen">
      {/* Full-page grain overlay — card reads as floating above textured backdrop */}
      <div className="grain-overlay" aria-hidden />

      {/* ── Floating pill nav ── */}
      <nav className="floating-nav">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-3 flex items-center"
        >
          <img
            src="/logo.png"
            alt="Evocaa"
            className="h-5 w-auto object-contain hover:opacity-80 transition-opacity duration-200"
          />
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToHash(link.href);
              }}
              className={`nav-link hidden sm:inline-flex ${
                activeSection === link.href ? 'nav-link-active' : ''
              }`}
              style={{ color: activeSection === link.href ? undefined : 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Main card panel (floating shell) ── */}
      <div className="main-card">
        {/* ── Hero header block ── */}
        <section className="relative px-5 sm:px-10 pt-8 sm:pt-10">
          <div className="mt-10 sm:mt-14">
            <h1
              className="hero-title-animate font-light uppercase leading-[0.95] tracking-[0.05em]"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                color: 'var(--text-primary)',
              }}
            >
              Video Editor
            </h1>
          </div>

          {/* Meta row — 4-col grid, wraps 2x2 on mobile */}
          <div className="meta-row-animate mt-10 sm:mt-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {META_ITEMS.map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <span className="hero-meta-label">{item.label}</span>
                  <span className="hero-meta-value" style={{ color: 'var(--text-primary)' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hero media block (nested, Ken Burns) ── */}
        <section className="px-5 sm:px-10 mt-10 sm:mt-12">
          <div className="hero-media">
            <img
              src={UNSPLASH.hero}
              alt="video editor related image"
              className="hero-img-cinematic w-full max-w-full h-full object-cover"
              style={{
                filter: 'saturate(0.5) brightness(0.5)',
                objectPosition: 'center center',
                opacity: 0.92,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(11,11,13,0.2) 0%, rgba(11,11,13,0.1) 50%, rgba(20,20,22,0.6) 100%)',
              }}
            />
          </div>
        </section>

        {/* ── All content sections — two-column definition-list layout ── */}
        <div className="content-column sections-wrapper" style={{ paddingTop: 'clamp(40px, 6vw, 64px)' }}>

          {/* ── Job Summary ── */}
          <div className="content-section reveal">
            <h3 className="content-section-label">Job Summary</h3>
            <div className="content-section-body">
              <p className="body-copy text-xl sm:text-2xl font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                Short-form content is the fastest-growing acquisition channel for brands in 2026.
                We need an editor who treats every second of footage as{' '}
                <strong className="font-semibold" style={{ color: 'var(--accent)' }}>strategic real estate</strong> —
                someone who understands{' '}
                <strong className="font-semibold" style={{ color: 'var(--accent)' }}>storytelling, retention mechanics, and marketing psychology,</strong>{' '}
                <em style={{ color: 'var(--text-secondary)' }}>not just which buttons to press in Premiere.</em>
              </p>
              <p className="body-copy mt-4" style={{ color: 'var(--text-secondary)' }}>
                The average viewer decides within{' '}
                <strong style={{ color: 'var(--text-primary)' }}>1.7 seconds</strong>{' '}
                whether to keep watching. Your first cut is a hypothesis. Your final cut is a result.
                We expect you to know the difference — and to keep testing until the numbers prove it.
              </p>
              {/* Quote-callout card */}
              <div
                className="mt-8 p-6 rounded-xl"
                style={{
                  background: 'var(--bg-elevated)',
                  borderLeft: '3px solid var(--accent-secondary)',
                }}
              >
                <p className="body-copy text-base" style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>
                  "We don't hire based on certificates or years of experience.
                  We hire for mindset, craft, and the hunger to get better.
                  If your work moves people — and the data backs it up — we want to talk."
                </p>
                <p className="text-sm mt-3 font-semibold" style={{ color: 'var(--accent)' }}>— Evocaa Hiring Team</p>
              </div>
            </div>
          </div>

          {/* ── Your Role ── */}
          <div id="role" className="content-section">
            <h3 className="content-section-label">Your Role</h3>
            <div className="content-section-body">
              <h4>What you'll actually own.</h4>
              <p className="body-copy text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                This isn't a support role. You have direct impact on content performance from day one.
              </p>
              <ul className="space-y-4">
                {ROLE_BULLETS.map((item, i) => (
                  <li key={i} className="reveal flex items-start gap-4">
                    <span
                      className="flex-shrink-0 mt-1 text-lg font-bold leading-none"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--app-font-mono)', minWidth: '1.25rem' }}
                      aria-hidden="true"
                    >
                      →
                    </span>
                    <p className="body-copy" style={{ color: 'var(--text-primary)' }}>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Ideal Candidate ── */}
          <div className="content-section">
            <h3 className="content-section-label">Ideal Candidate</h3>
            <div className="content-section-body">
              <h4>You think like this.</h4>
              <p className="body-copy text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                Skills can be taught. These traits are harder to train for.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {IDEAL_BULLETS.map((item, i) => (
                  <li key={i} className="reveal flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                      style={{ background: 'var(--accent)' }}
                    />
                    <span className="body-copy">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Requirements ── */}
          <div id="requirements" className="content-section">
            <h3 className="content-section-label">Requirements</h3>
            <div className="content-section-body">
              <h4>Minimum qualifications.</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {REQUIREMENT_CARDS.map((card, i) => (
                  <div key={i} className="reveal glass-requirement">
                    <h3
                      className="text-sm font-bold uppercase tracking-[0.06em] mb-5"
                      style={{ color: 'var(--accent)' }}
                    >
                      {card.title}
                    </h3>
                    <ul className="space-y-3">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <ChevronRight
                            size={16}
                            className="flex-shrink-0 mt-1"
                            style={{ color: 'var(--accent-dim)' }}
                          />
                          <span className="body-copy text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Day-to-Day ── */}
          <div id="day-to-day" className="content-section">
            <h3 className="content-section-label">Day-to-Day</h3>
            <div className="content-section-body">
              <h4>A real day in this seat.</h4>
              <p className="body-copy text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                No two days are identical — but this is the consistent rhythm you'll build.
              </p>
              <ul className="space-y-0">
                {DAILY_TASKS.map((item, i) => (
                  <li
                    key={i}
                    className="reveal flex items-start gap-5 py-5"
                    style={{ borderBottom: '1px solid var(--divider)' }}
                  >
                    <span
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold"
                      style={{
                        fontFamily: 'var(--app-font-mono)',
                        fontSize: '15px',
                        color: 'var(--accent)',
                        background: 'rgba(124, 58, 237, 0.15)',
                      }}
                    >
                      {String(i + 1).padStart(3, '0')}
                    </span>
                    <div>
                      <p className="body-copy font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {item.task}
                      </p>
                      <p className="body-copy text-sm mt-1" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── You Shouldn't Apply If ── */}
          <div className="content-section">
            <h3 className="content-section-label">Important</h3>
            <div className="content-section-body">
              <h4>Read this before you apply.</h4>
              <p className="body-copy mb-6" style={{ color: 'var(--text-secondary)' }}>
                We keep our team tight. Every hire has direct impact on what we ship and how it
                performs. That means we're deliberate — and honest about who this role{' '}
                <em>isn't</em> for.
              </p>
              <div
                className="reveal rounded-xl p-6 sm:p-8"
                style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
                  Don't apply if you —
                </p>
                <ul className="space-y-4">
                  {FILTER_ITEMS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="text-base font-bold leading-none flex-shrink-0 mt-0.5"
                        style={{ color: '#FF4D4D' }}
                        aria-hidden="true"
                      >
                        ✕
                      </span>
                      <span className="body-copy" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* ── CTA Band (nested elevated panel) ── */}
        <section className="px-5 sm:px-10 pb-16 sm:pb-20">
          <div
            className="reveal rounded-[20px] px-6 sm:px-12 py-12 sm:py-16 text-center relative overflow-hidden"
            style={{ background: 'var(--bg-elevated)' }}
          >Terms
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `url(${UNSPLASH.cta})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                filter: 'saturate(0.45) brightness(0.8) blur(0.3px)',
                mixBlendMode: 'screen',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,11,13,0.12)] via-[rgba(11,11,13,0.28)] to-[rgba(11,11,13,0.72)]" />
            <div className="relative z-10">
              <h2
                className="font-bold uppercase tracking-[-0.02em] mb-4"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  color: 'var(--text-primary)',
                }}
              >
                Think You're a Fit?
              </h2>
              <p className="body-copy text-base mb-8 max-w-xl mx-auto">
                Complete the assessment honestly. Only candidates who meet our benchmark will
                move to the next stage. Shortlisted candidates will be contacted within{' '}
                <strong style={{ color: 'var(--text-primary)' }}>3 business days</strong>.
              </p>
              <button
                onClick={onApply}
                className="btn-accent w-full sm:w-auto px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wide inline-flex items-center justify-center gap-2"
              >
                Apply Now
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer (outside card) ── */}
      <footer className="relative z-10 py-10 px-5">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="Evocaa Logo"
              className="h-6 w-auto object-contain"
            />
          </div>
          <div
  className="flex flex-wrap items-center justify-center gap-2 text-xs"
  style={{ color: 'var(--text-muted)' }}
>
  {[
    { label: 'Privacy Policy', href: 'https://www.evocaa.in/privacy-policy/' },
    { label: 'Terms & Conditions', href: 'https://www.evocaa.in/terms-and-conditions/' },
    { label: 'Contact Us', href: '#' },
  ].map((link, i, arr) => (
    <React.Fragment key={link.label}>
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors duration-200 hover:opacity-80"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        {link.label}
      </a>
      {i < arr.length - 1 && <span aria-hidden="true">|</span>}
    </React.Fragment>
  ))}
</div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Evocaa is an equal opportunity employer. All applications are reviewed confidentially.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Evocaa. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </>
  );
}
