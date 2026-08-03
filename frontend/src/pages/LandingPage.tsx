import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { getLenis } from '@/lib/lenis';
import { ROLES } from '@/lib/roles';
import { Link, useLocation } from 'wouter';

interface LandingPageProps {
  roleSlug: string;
}

const UNSPLASH = {
  cta: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80&auto=format&fit=crop',
};

const NAV_LINKS = [
  { label: 'The Role', href: '#role' },
  { label: 'Requirements', href: '#requirements' },
  { label: 'Day-to-Day', href: '#day-to-day' },
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

export default function LandingPage({ roleSlug }: LandingPageProps) {
  const [, setLocation] = useLocation();
  const [activeSection, setActiveSection] = useState<string>('');

  const role = ROLES.find((r) => r.slug === roleSlug);

  // ── Dynamic page title and meta tags override ──
  useEffect(() => {
    if (!role) return;

    // Set document title
    document.title = `${role.title} ${role.subtitle} — Evocaa`;

    // Set dynamic meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        `Evocaa is hiring a ${role.type.toLowerCase()} ${role.title} in ${role.location}. We hire mindset over resume.`
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${role.title} ${role.subtitle} — Evocaa`);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        `Evocaa is hiring a ${role.type.toLowerCase()} ${role.title} in ${role.location}. We hire mindset over resume.`
      );
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', `${role.title} ${role.subtitle} — Evocaa`);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute(
        'content',
        `Apply for the ${role.title} role at Evocaa. ${role.location}, ${role.type}.`
      );
    }
  }, [role]);

  // Section observer for active links
  useEffect(() => {
    if (!role) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -40% 0px' }
    );

    document.querySelectorAll('#role, #requirements, #day-to-day').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [role]);

  // Content reveal on scroll
  useEffect(() => {
    if (!role) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [role]);

  // Role not found fallback
  if (!role) {
    return (
      <>
        <div className="page-bg" aria-hidden="true" />
        <div className="min-h-screen flex items-center justify-center px-5">
          <div className="grain-overlay" aria-hidden />
          <div
            className="max-w-lg w-full text-center glow-card p-10"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
            }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Role Not Found</h2>
            <p className="text-[var(--text-primary)] mb-6 leading-relaxed">
              We couldn't find the job opening you are looking for. It may have been closed or removed.
            </p>
            <Link href="/" className="btn-accent px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide inline-flex items-center justify-center">
              Back to Open Roles
            </Link>
          </div>
        </div>
      </>
    );
  }

  const handleApply = () => {
    setLocation(`/hiring/${roleSlug}/apply`);
  };

  const META_ITEMS = [
    { label: 'Date Posted', value: role.datePosted },
    { label: 'Team', value: role.team },
    { label: 'Location', value: role.location },
    { label: 'Type', value: role.type },
  ];

  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <div className="min-h-screen">
        {/* Full-page grain overlay */}
        <div className="grain-overlay" aria-hidden />

        {/* ── Floating pill nav ── */}
        <nav className="floating-nav">
          <Link href="/" className="px-3 flex items-center">
            <img
              src="/logo.png"
              alt="Evocaa"
              className="h-5 w-auto object-contain hover:opacity-80 transition-opacity duration-200"
            />
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(link.href);
                }}
                className={`nav-link hidden sm:inline-flex ${activeSection === link.href ? 'nav-link-active' : ''
                  }`}
                style={{ color: activeSection === link.href ? undefined : 'var(--text-primary)' }}
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
                {role.title}
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
                src={role.heroImage}
                alt={`${role.title} related image`}
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

          {/* ── All content sections — two-column layout ── */}
          <div className="content-column sections-wrapper" style={{ paddingTop: 'clamp(40px, 6vw, 64px)' }}>
            {/* ── Job Summary ── */}
            <div className="content-section reveal">
              <h3 className="content-section-label">Job Summary</h3>
              <div className="content-section-body">
                <p className="body-copy text-xl sm:text-2xl font-light leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {role.jobSummary}
                </p>
                {/* Quote-callout card */}
                {role.quoteCallout && (
                <div
                  className="mt-8 p-6 rounded-xl"
                  style={{
                    background: 'var(--bg-elevated)',
                    borderLeft: '3px solid var(--accent-secondary)',
                  }}
                >
                  <p className="body-copy text-base" style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>
                    {role.quoteCallout}
                  </p>
                </div>
                )}
              </div>
            </div>

            {/* ── Your Role ── */}
            <div id="role" className="content-section">
              <h3 className="content-section-label">Your Role</h3>
              <div className="content-section-body">
                <h4>{role.yourRole.heading}</h4>
                {!role.yourRole.hideSubtitle && (
                  <p className="body-copy text-sm mb-6" style={{ color: 'var(--text-primary)' }}>
                    This isn't a support role. You have direct impact on content performance from day one.
                  </p>
                )}
                <ul className="space-y-4">
                  {role.yourRole.paragraphs.map((item, i) => (
                    <li key={i} className="reveal flex items-start gap-4">
                      <span
                        className="flex-shrink-0 mt-1 text-lg font-bold leading-none"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--app-font-mono)', minWidth: '1.25rem' }}
                        aria-hidden="true"
                      >
                        →
                      </span>
                      <p className="body-copy" style={{ color: 'var(--text-primary)' }}>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Ideal Candidate ── */}
            <div className="content-section">
              <h3 className="content-section-label">Ideal Candidate</h3>
              <div className="content-section-body">
                {Array.isArray(role.idealCandidate) ? (
                  <>
                    <h4>You think like this.</h4>
                    <p className="body-copy text-sm mb-6" style={{ color: 'var(--text-primary)' }}>
                      Skills can be taught. These traits are harder to train for.
                    </p>
                  </>
                ) : (
                  <h4>{role.idealCandidate.heading}</h4>
                )}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {(Array.isArray(role.idealCandidate) ? role.idealCandidate : role.idealCandidate.items).map((item, i) => (
                    <li key={i} className="reveal flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                        style={{ background: 'var(--text-primary)' }}
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
                  {role.requirements.map((card, i) => (
                    <div key={i} className="reveal requirement-list flex flex-col gap-5">
                      {card.title && (
                        <h3
                          className="text-sm font-bold uppercase tracking-[0.06em]"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {card.title}
                        </h3>
                      )}
                      <ul className="space-y-3">
                        {card.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span className="flex-shrink-0 mt-1.5 text-xs text-[var(--text-primary)]" aria-hidden="true">
                              ▶
                            </span>
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
              <h3 className="content-section-label">
                {Array.isArray(role.whatYoullDo) ? 'Day-to-Day' : role.whatYoullDo.label}
              </h3>
              <div className="content-section-body">
                {Array.isArray(role.whatYoullDo) ? (
                  <>
                    <h4>A real day in this seat.</h4>
                    <p className="body-copy text-sm mb-6" style={{ color: 'var(--text-primary)' }}>
                      No two days are identical — but this is the consistent rhythm you'll build.
                    </p>
                  </>
                ) : (
                  <>
                    <h4>{role.whatYoullDo.heading}</h4>
                    {!role.whatYoullDo.hideSubtitle && (
                      <p className="body-copy text-sm mb-6" style={{ color: 'var(--text-primary)' }}>
                        No two days are identical — but this is the consistent rhythm you'll build.
                      </p>
                    )}
                  </>
                )}
                <ul className="space-y-0">
                  {(Array.isArray(role.whatYoullDo) ? role.whatYoullDo : role.whatYoullDo.items).map((item, i) => {
                    const [task, detail] = item.split('|');
                    return (
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
                            color: 'var(--text-primary)',
                            background: 'rgba(124, 58, 237, 0.15)',
                          }}
                        >
                          {String(i + 1).padStart(3, '0')}
                        </span>
                        <div>
                          <p className="body-copy font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {task}
                          </p>
                          {detail && (
                            <p className="body-copy text-sm mt-1" style={{ color: 'var(--text-primary)', fontSize: '14px' }}>
                              {detail}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* ── What You'll Learn ── */}
            {role.whatYoullLearn && (
            <div className="content-section">
              <h3 className="content-section-label">{role.whatYoullLearn.heading}</h3>
              <div className="content-section-body">
                <p className="body-copy text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
                  {role.whatYoullLearn.subtitle1}
                </p>
                <p className="body-copy text-base mb-6" style={{ color: 'var(--text-primary)' }}>
                  {role.whatYoullLearn.subtitle2}
                </p>
                <ul className="space-y-4">
                  {role.whatYoullLearn.items.map((item, i) => (
                    <li key={i} className="reveal flex items-start gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                        style={{ background: 'var(--text-primary)' }}
                      />
                      <span className="body-copy">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            )}

            {/* ── You Shouldn't Apply If ── */}
            <div className="content-section">
              <h3 className="content-section-label">
                {Array.isArray(role.dontApplyIf) ? 'Important' : role.dontApplyIf.label}
              </h3>
              <div className="content-section-body">
                {Array.isArray(role.dontApplyIf) ? (
                  <>
                    <h4>Read this before you apply.</h4>
                    <p className="body-copy mb-6" style={{ color: 'var(--text-primary)' }}>
                      We keep our team tight. Every hire has direct impact on what we ship and how it
                      performs. That means we're deliberate - and honest about who this role{' '}
                      <em>isn't</em> for.
                    </p>
                  </>
                ) : (
                  <p className="body-copy mb-6" style={{ color: 'var(--text-primary)' }}>
                    {role.dontApplyIf.subtitle1}
                  </p>
                )}
                <div
                  className="reveal rounded-xl p-6 sm:p-8"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: 'var(--text-primary)' }}>
                    {Array.isArray(role.dontApplyIf) ? "Don't apply if you -" : role.dontApplyIf.subtitle2}
                  </p>
                  <ul className="space-y-4">
                    {(Array.isArray(role.dontApplyIf) ? role.dontApplyIf : role.dontApplyIf.items).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="text-base font-bold leading-none flex-shrink-0 mt-0.5"
                          style={{ color: '#FF4D4D' }}
                          aria-hidden="true"
                        >
                          ✕
                        </span>
                        <span className="body-copy" style={{ color: 'var(--text-primary)' }}>{item}</span>
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
            >
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
                  onClick={handleApply}
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
              style={{ color: 'var(--text-primary)' }}
            >
              {[
                { label: 'Privacy Policy', href: 'https://www.evocaa.in/privacy-policy/' },
                { label: 'Terms & Conditions', href: 'https://www.evocaa.in/terms-and-conditions/' },
              ].map((link, i, arr) => (
                <React.Fragment key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:opacity-80"
                    style={{ color: 'var(--text-primary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  >
                    {link.label}
                  </a>
                  {i < arr.length - 1 && <span aria-hidden="true">|</span>}
                </React.Fragment>
              ))}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              Evocaa is an equal opportunity employer. All applications are reviewed confidentially.
            </p>
            <p className="text-xs" style={{ color: 'var(--text-primary)' }}>
              © {new Date().getFullYear()} Evocaa. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
