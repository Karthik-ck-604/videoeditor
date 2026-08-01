import React, { useEffect } from 'react';
import { useStickyNav } from '@/hooks/useStickyNav';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onApply: () => void;
}

const UNSPLASH = {
  hero: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=85&auto=format&fit=crop',
  cta: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80&auto=format&fit=crop',
};

const ROLE_BULLETS = [
  'Edit high-performing Instagram Reels & YouTube Shorts',
  'Create engaging marketing videos',
  'Work closely with the content and marketing team',
  'Improve videos based on performance data and feedback',
  'Deliver projects on time',
];

const IDEAL_BULLETS = [
  'Loves storytelling',
  'Learns quickly',
  'Accepts feedback positively',
  'Has strong attention to detail',
  'Enjoys solving creative problems',
  'Wants long-term career growth',
];

const REQUIREMENT_CARDS = [
  {
    title: 'Software & Technical',
    items: [
      'Experience with DaVinci Resolve & Adobe Premiere Pro',
      'Basic knowledge of After Effects',
      'Basic color correction and audio editing',
    ],
  },
  {
    title: 'Skills & Portfolio',
    items: [
      'Understanding of short-form content',
      'Portfolio with previous work',
      'Ability to meet deadlines',
    ],
  },
];

const DAILY_TASKS = [
  'Edit 3–5 short-form videos daily',
  'Add captions, sound effects, and motion graphics',
  'Follow brand guidelines',
  'Organize project files',
  'Collaborate with designers and marketers',
  'Continuously improve editing quality',
];

const FILTER_ITEMS = [
  "Can't accept constructive feedback",
  'Frequently miss deadlines',
  'Prefer working without accountability',
  'Only know basic template editing',
  'Are looking for a temporary job',
  "Aren't willing to learn and improve",
];

const NAV_LINKS = [
  { label: 'The Role', href: '#role' },
  { label: 'Requirements', href: '#requirements' },
  { label: 'Day-to-Day', href: '#day-to-day' },
];

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 px-2 py-1 lg:flex-1">
      <span className="section-eyebrow">{label}</span>
      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  );
}

export default function LandingPage({ onApply }: LandingPageProps) {
  const isGlassNav = useStickyNav(60);

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
    <div className="min-h-screen" style={{ background: 'var(--bg-page)' }}>
      {/* ── Navbar (full-bleed, outside card) ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={
          isGlassNav
            ? undefined
            : {
                background: 'transparent',
                borderBottom: '1px solid transparent',
              }
        }
      >
        <div
          className={`transition-all duration-500 ${isGlassNav ? 'glass-nav' : ''}`}
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
            <span
              className="text-sm font-bold tracking-[0.12em] uppercase"
              style={{ color: 'var(--text-primary)' }}
            >
              Evocaa
            </span>

            <div className="flex items-center gap-6 sm:gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hidden sm:block text-xs font-medium tracking-wide transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </a>
              ))}
              {/* <button
                onClick={onApply}
                className="btn-lime inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide"
              >
                Apply Now
              </button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" aria-hidden="true" />

      {/* ── Main card panel ── */}
      <div className="main-card mb-8">
        {/* ── Hero ── */}
        <section className="relative min-h-[85vh] flex flex-col overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={UNSPLASH.hero}
              alt=""
              className="hero-img-cinematic absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(0.5) brightness(0.5)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(11,11,13,0.7) 0%, rgba(11,11,13,0.35) 40%, rgba(11,11,13,0.2) 70%, rgba(20,20,22,1) 100%)',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col flex-1 px-5 sm:px-10 pt-8 pb-0">
            {/* <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 w-fit mb-auto"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <ArrowLeft size={14} />
              Back to Careers
            </a> */}

            <div className="flex-1 flex items-center justify-center py-16 sm:py-20">
              <h1
                className="hero-title-animate font-bold uppercase text-center leading-[0.95] tracking-[-0.02em]"
                style={{
                  fontSize: 'clamp(2.25rem, 6vw + 1rem, 5rem)',
                  color: 'var(--text-primary)',
                }}
              >
                Video Editor
                <br />
                <span style={{ color: 'var(--accent)' }}>(Full-Time)</span>
              </h1>
            </div>
          </div>

          {/* Glass meta row */}
          <div className="relative z-10 px-5 sm:px-10 pb-8 sm:pb-10 -mb-6 sm:-mb-8">
            <div className="meta-row-animate glass-meta mx-auto max-w-3xl px-5 sm:px-6 py-5 sm:py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-stretch lg:justify-between gap-5 sm:gap-6 lg:gap-0">
                {[
                  { label: 'Date Posted', value: 'Jul 31, 2026' },
                  { label: 'Team', value: 'Content & Marketing' },
                  { label: 'Location', value: 'Coimbatore (Office)' },
                  { label: 'Type', value: 'Full-Time' },
                ].map((item, i, arr) => (
                  <React.Fragment key={item.label}>
                    <MetaCell label={item.label} value={item.value} />
                    {i < arr.length - 1 && (
                      <div
                        className="meta-divider hidden lg:block mx-6"
                        aria-hidden="true"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Job Summary ── */}
        <section className="section-spacing pt-16 sm:pt-20">
          <div className="content-column reveal">
            <p className="section-eyebrow mb-4">Job Summary</p>
            <p className="body-copy text-xl sm:text-2xl font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              We're looking for a creative Video Editor who understands{' '}
              <strong className="font-semibold">storytelling, marketing psychology,</strong> and
              short-form content —{' '}
              <em style={{ color: 'var(--text-secondary)' }}>not just editing software.</em>
            </p>
            <div
              className="mt-8 p-6 rounded-xl"
              style={{
                background: 'var(--bg-elevated)',
                borderLeft: '3px solid var(--accent)',
              }}
            >
              <p className="body-copy text-base">
                We don't hire based only on certificates or years of experience. We hire people
                with the right mindset, a willingness to learn, and the ability to solve real
                problems. If you can prove your skills through our assessment, we care more about
                your potential than your resume.
              </p>
            </div>
          </div>
        </section>

        {/* ── Your Role ── */}
        <section id="role" className="section-spacing">
          <div className="content-column">
            <div className="reveal mb-10">
              <p className="section-eyebrow mb-3">Your Role</p>
              <h2 className="section-heading">What success looks like.</h2>
            </div>
            <ul className="space-y-5">
              {ROLE_BULLETS.map((item, i) => (
                <li key={i} className="reveal flex items-start gap-4">
                  <span className="step-num">{String(i + 1).padStart(3, '0')}</span>
                  <p className="body-copy pt-2">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Ideal Candidate ── */}
        <section className="section-spacing">
          <div className="content-column">
            <div className="reveal mb-10">
              <p className="section-eyebrow mb-3">Ideal Candidate</p>
              <h2 className="section-heading">You are someone who:</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {IDEAL_BULLETS.map((item, i) => (
                <li key={i} className="reveal flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: 'var(--accent)' }}
                  />
                  <span className="body-copy">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Requirements (2 glass cards) ── */}
        <section id="requirements" className="section-spacing">
          <div className="content-column">
            <div className="reveal mb-10">
              <p className="section-eyebrow mb-3">Requirements</p>
              <h2 className="section-heading">Minimum qualifications.</h2>
            </div>
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
        </section>

        {/* ── What You'll Do ── */}
        <section id="day-to-day" className="section-spacing">
          <div className="content-column">
            <div className="reveal mb-10">
              <p className="section-eyebrow mb-3">Day-to-Day</p>
              <h2 className="section-heading">What You'll Do.</h2>
            </div>
            <ul className="space-y-6">
              {DAILY_TASKS.map((item, i) => (
                <li
                  key={i}
                  className="reveal flex items-start gap-5 pb-6"
                  style={{ borderBottom: i < DAILY_TASKS.length - 1 ? '1px solid var(--divider)' : undefined }}
                >
                  <span className="step-num">{String(i + 1).padStart(3, '0')}</span>
                  <p className="body-copy font-medium pt-1" style={{ color: 'var(--text-primary)' }}>
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── You Shouldn't Apply If ── */}
        <section className="section-spacing">
          <div className="content-column">
            <div className="reveal mb-10">
              <p className="section-eyebrow mb-3">Important</p>
              <h2 className="section-heading">You Shouldn't Apply If</h2>
              <p className="body-copy mt-3 text-base">Don't apply if you:</p>
            </div>
            <div
              className="reveal rounded-xl p-6 sm:p-8"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <ul className="space-y-4">
                {FILTER_ITEMS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="text-lg leading-none flex-shrink-0 mt-0.5"
                      style={{ color: 'var(--text-muted)' }}
                      aria-hidden="true"
                    >
                      ×
                    </span>
                    <span className="body-copy">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── CTA Band ── */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={UNSPLASH.cta}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(0.4) brightness(0.35)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(11,11,13,0.7) 0%, rgba(11,11,13,0.2) 50%, rgba(11,11,13,0.7) 100%)',
              }}
            />
          </div>

          <div className="relative z-10 px-5 sm:px-10">
            <div className="reveal glass-cta max-w-xl mx-auto px-8 sm:px-16 py-10 sm:py-12 text-center">
              <h2
                className="font-bold uppercase tracking-[-0.02em] mb-4"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  color: 'var(--text-primary)',
                }}
              >
                Think You're a Fit?
              </h2>
              <p className="body-copy text-base mb-8">
                Complete the assessment honestly. Only candidates who meet our benchmark will
                move to the next stage. Shortlisted candidates will be contacted within{' '}
                <strong style={{ color: 'var(--text-primary)' }}>3 business days</strong>.
              </p>
              <button
                onClick={onApply}
                className="btn-lime w-full sm:w-auto px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wide inline-flex items-center justify-center gap-2"
              >
                Apply Now
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ── Footer (outside card) ── */}
      <footer className="py-10 px-5">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <p
            className="text-sm font-bold tracking-[0.12em] uppercase"
            style={{ color: 'var(--text-primary)' }}
          >
            Evocaa
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-2 text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            {['Privacy Policy', 'Terms & Conditions', 'Contact Us'].map((link, i, arr) => (
              <React.Fragment key={link}>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:opacity-80"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {link}
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
  );
}
