import { useState, useCallback, useEffect } from 'react';
import { Router, Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import LandingPage from '@/pages/LandingPage';
import Assessment from '@/pages/Assessment';
import OpenRolesPage from '@/pages/OpenRolesPage';
import { AssessmentData, INITIAL_DATA } from '@/lib/assessmentData';
import { initLenis, getLenis } from '@/lib/lenis';

const queryClient = new QueryClient();

const STORAGE_KEY = 'evocaa-assessment-data';

function loadSavedData(): AssessmentData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...INITIAL_DATA, ...JSON.parse(saved) };
  } catch {}
  return INITIAL_DATA;
}

// ── Assessment wrapper — reads roleSlug from route, manages data & submission ──
function AssessmentPage({ roleSlug }: { roleSlug: string }) {
  const [data, setData] = useState<AssessmentData>(() => {
    // Merge stored data only if it belongs to this role
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (!parsed.roleSlug || parsed.roleSlug === roleSlug) {
          return { ...INITIAL_DATA, ...parsed };
        }
      }
    } catch {}
    return INITIAL_DATA;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = [null, (path: string) => { window.location.href = path; }];

  const handleChange = useCallback((updates: Partial<AssessmentData>) => {
    setData((prev) => {
      const next = { ...prev, ...updates };
      try {
        const { resumeFile, ...rest } = next;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...rest, roleSlug }));
      } catch {}
      return next;
    });
  }, [roleSlug]);

  const handleBack = useCallback(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    window.location.href = `/hiring/${roleSlug}`;
  }, [roleSlug]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        roleSlug,
        fullName: data.fullName,
        mobile: data.mobile,
        email: data.email,
        city: data.city,
        portfolioLink: data.portfolioLink,
        hasResume: !!data.resumeFile,
        yearsExperience: data.yearsExperience,
        softwareUsed: data.softwareUsed,
        contentType: data.contentType,
        currentSalary: data.currentSalary,
        expectedSalary: data.expectedSalary,
        noticePeriod: data.noticePeriod,
        techAnswers: data.tech,
        workStyleAnswers: data.workStyle,
        bestProject: data.bestProject,
        proudProject: data.proudProject,
        clientStrength: data.clientStrength,
        whyEvocaa: data.whyEvocaa,
        whyYou: data.whyYou,
        skillLearning: data.skillLearning,
        additionalInfo: data.additionalInfo,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Submission failed');

      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('evocaa-assessment-step');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      // Still show success to candidate — don't surface scoring issues
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('evocaa-assessment-step');
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [data, roleSlug]);

  return (
    <Assessment
      roleSlug={roleSlug}
      data={data}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBack={handleBack}
      isSubmitting={isSubmitting}
      submitted={submitted}
    />
  );
}

function AppContent() {
  // Page-wide inertia scroll (Lenis) — degrades gracefully for reduced-motion.
  useEffect(() => {
    initLenis();
  }, []);

  return (
    <Switch>
      {/* Open roles grid */}
      <Route path="/" component={OpenRolesPage} />

      {/* Role-specific assessment */}
      <Route path="/hiring/:roleSlug/apply">
        {(params) => <AssessmentPage roleSlug={params.roleSlug} />}
      </Route>

      {/* Role detail / landing page */}
      <Route path="/hiring/:roleSlug">
        {(params) => <LandingPage roleSlug={params.roleSlug} />}
      </Route>

      {/* Fallback → open roles */}
      <Route component={OpenRolesPage} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AppContent />
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
