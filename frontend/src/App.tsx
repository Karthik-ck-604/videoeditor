import { useState, useCallback, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import LandingPage from '@/pages/LandingPage';
import Assessment from '@/pages/Assessment';
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

function AppContent() {
  const [view, setView] = useState<'landing' | 'assessment'>('landing');
  const [data, setData] = useState<AssessmentData>(loadSavedData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  // Page-wide inertia scroll (Lenis) — degrades gracefully for reduced-motion.
  useEffect(() => {
    initLenis();
  }, []);

  const handleChange = useCallback((updates: Partial<AssessmentData>) => {
    setData((prev) => {
      const next = { ...prev, ...updates };
      // Persist to localStorage (excluding file)
      try {
        const { resumeFile, ...rest } = next;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
      } catch {}
      return next;
    });
  }, []);

  const handleApply = useCallback(() => {
    setView('assessment');
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleBack = useCallback(() => {
    setView('landing');
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        // Basic info
        fullName: data.fullName,
        mobile: data.mobile,
        email: data.email,
        city: data.city,
        portfolioLink: data.portfolioLink,
        hasResume: !!data.resumeFile,
        // Professional
        yearsExperience: data.yearsExperience,
        softwareUsed: data.softwareUsed,
        contentType: data.contentType,
        currentSalary: data.currentSalary,
        expectedSalary: data.expectedSalary,
        noticePeriod: data.noticePeriod,
        // Tech answers
        techAnswers: data.tech,
        // Work style answers
        workStyleAnswers: data.workStyle,
        // Portfolio
        bestProject: data.bestProject,
        proudProject: data.proudProject,
        clientStrength: data.clientStrength,
        // Final
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

      // Clear persisted data
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('evocaa-assessment-step');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      // Still show success to candidate — don't reveal scoring issues
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('evocaa-assessment-step');
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [data]);

  if (view === 'assessment') {
    return (
      <Assessment
        data={data}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onBack={handleBack}
        isSubmitting={isSubmitting}
        submitted={submitted}
      />
    );
  }

  return <LandingPage onApply={handleApply} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
