import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ROLES } from '@/lib/roles';
import { ArrowRight, Briefcase, MapPin } from 'lucide-react';

export default function OpenRolesPage() {
  // Set fallback title/metadata on mount
  useEffect(() => {
    document.title = 'Evocaa — Open Roles';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore open job opportunities and careers at Evocaa. Apply through our direct assessments.');
    }
  }, []);

  return (
    <>
      <div className="page-bg" aria-hidden="true" />
      <div className="min-h-screen flex flex-col justify-between">
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
            <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(255,255,255,0.06)] text-[var(--text-secondary)] border border-[rgba(255,255,255,0.08)]">
              Careers Portal
            </span>
          </div>
        </nav>

        {/* ── Main Container ── */}
        <main className="flex-grow max-w-5xl mx-auto w-full px-6 pt-32 pb-16">
          {/* Header section */}
          <div className="text-center mb-12 sm:mb-16">
            <h1
              className="font-light uppercase leading-tight tracking-[0.05em] mb-4 gradient-text"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontFamily: 'var(--app-font-sans)',
              }}
            >
              Open Opportunities
            </h1>
            <p className="max-w-xl mx-auto text-[var(--text-secondary)] font-light text-base sm:text-lg">
              We don't hire based on certificates or years of experience. We hire for mindset, craft, and the hunger to get better.
            </p>
          </div>

          {/* 2-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {ROLES.map((role) => (
              <Link key={role.slug} href={`/hiring/${role.slug}`}>
                <a className="group block relative rounded-[20px] overflow-hidden aspect-[16/10] border border-[rgba(255,255,255,0.08)] bg-[var(--bg-card)] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(255, 255, 255, 0.4)] hover:shadow-[0_12px_40px_rgba(255, 255, 255, 0.15)]">
                  {/* Hero background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${role.heroImage})`,
                      filter: 'brightness(0.4) saturate(0.65)',
                    }}
                  />
                  
                  {/* Overlay gradient to boost readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,8,32,0.92)] via-[rgba(18,8,32,0.4)] to-[rgba(18,8,32,0.2)]" />

                  {/* Card content */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
                    {/* Top row: Team badge */}
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full bg-[rgba(18,8,32,0.7)] text-[var(--text-secondary)] border border-[rgba(255,255,255,0.06)] flex items-center gap-1.5">
                        <Briefcase size={12} className="text-[var(--accent)]" />
                        {role.team}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                        <ArrowRight size={16} />
                      </span>
                    </div>

                    {/* Bottom row: Title and Logistics */}
                    <div>
                      <h2 className="text-xl sm:text-2xl font-semibold uppercase tracking-wide text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                        {role.title}
                      </h2>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--text-secondary)] font-light">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-[var(--text-muted)]" />
                          {role.location}
                        </span>
                        <span>•</span>
                        <span>{role.type}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="relative z-10 py-10 px-5 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,11,0.2)]">
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
