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
    <div className="min-h-screen" style={{ background: 'var(--bg-page)' }}>
      {/* Textured backdrop — sits behind the glass card so backdrop-filter has something to blur */}
      <div className="page-backdrop" aria-hidden />
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
          className="text-sm font-bold tracking-[0.12em] uppercase px-3"
          style={{ color: 'var(--text-primary)' }}
        >
          Evocaa
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
          {/* <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 w-fit"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <ArrowLeft size={14} />
            Back to Careers
          </a> */}

          <div className="mt-10 sm:mt-14">
            <h1
              className="hero-title-animate font-bold uppercase leading-[0.95] tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                color: 'var(--text-primary)',
              }}
            >
              Video Editor
              <br />
              <span style={{ color: 'var(--accent)' }}>(Full-Time)</span>
            </h1>
          </div>

          {/* Meta row — 4-col grid, wraps 2x2 on mobile */}
          <div className="meta-row-animate mt-10 sm:mt-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
              {META_ITEMS.map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <span className="section-eyebrow">{item.label}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
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
              alt=""
              className="hero-img-cinematic absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(0.5) brightness(0.5)' }}
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

        {/* ── CTA Band (nested elevated panel) ── */}
        <section className="px-5 sm:px-10 pb-16 sm:pb-20">
          <div
            className="reveal rounded-[20px] px-6 sm:px-12 py-12 sm:py-16 text-center"
            style={{ background: 'var(--bg-elevated)' }}
          >
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
              className="btn-lime w-full sm:w-auto px-10 py-4 rounded-full text-sm font-bold uppercase tracking-wide inline-flex items-center justify-center gap-2"
            >
              Apply Now
              <ChevronRight size={18} />
            </button>
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