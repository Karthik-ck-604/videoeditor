import React, { useState, useEffect, useRef } from 'react';
import {
  AssessmentData,
  STEP_NAMES,
  TECH_QUESTIONS,
  WORK_STYLE_QUESTIONS,
} from '@/lib/assessmentData';
import { ChevronLeft, ChevronRight, Upload, X, Check } from 'lucide-react';

interface AssessmentProps {
  data: AssessmentData;
  onChange: (updates: Partial<AssessmentData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  submitted: boolean;
}

// ── Step Header ──
function StepHeader({
  step,
  total,
  title,
  subtitle,
}: {
  step: number;
  total: number;
  title: string;
  subtitle?: string;
}) {
  const progress = ((step - 1) / total) * 100;

  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-5">
        <span
          style={{
            fontFamily: 'var(--app-font-mono)',
            fontSize: '0.75rem',
            color: 'var(--evocaa-accent)',
            fontWeight: 600,
          }}
        >
          Step {step} of {total}
        </span>
        <div
          className="flex-1 h-1 rounded-full"
          style={{ background: 'rgba(201,255,61,0.15)' }}
        >
          <div
            className="progress-bar-fill h-1 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--app-font-mono)',
            fontSize: '0.75rem',
            color: 'var(--evocaa-muted)',
          }}
        >
          {STEP_NAMES[step - 1]}
        </span>
      </div>

      {/* Step pills */}
      <div className="hidden sm:flex gap-2 mb-6 overflow-x-auto pb-1">
        {STEP_NAMES.map((name, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300"
            style={{
              background:
                i + 1 < step
                  ? 'rgba(201,255,61,0.3)'
                  : i + 1 === step
                  ? 'var(--evocaa-gradient)'
                  : 'rgba(255,255,255,0.06)',
              color:
                i + 1 <= step ? '#0B0B0D' : 'var(--evocaa-muted)',
              border:
                i + 1 === step
                  ? '1px solid rgba(201,255,61,0.5)'
                  : '1px solid transparent',
            }}
          >
            {i + 1 < step ? <Check size={10} className="inline mr-1" /> : null}
            {name}
          </div>
        ))}
      </div>

      <h2
        className="font-bold leading-tight mb-2"
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          color: '#fff',
        }}
      >
        {title.split('|').map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} className="gradient-text">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </h2>
      {subtitle && (
        <p style={{ color: 'var(--evocaa-muted)', fontSize: '0.9375rem' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Field Wrapper ──
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: 'var(--evocaa-text)' }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--evocaa-accent)', marginLeft: 4 }}>*</span>
        )}
      </label>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

// ── Quiz Option ──
function QuizOption({
  label,
  index,
  selected,
  onClick,
  multi,
}: {
  label: string;
  index: number;
  selected: boolean;
  onClick: () => void;
  multi?: boolean;
}) {
  const badge = ['A', 'B', 'C', 'D', 'E'][index] || String(index + 1);

  if (multi) {
    return (
      <button
        onClick={onClick}
        className={`multi-option ${selected ? 'selected' : ''}`}
      >
        <div className={`multi-check ${selected ? 'selected' : ''}`}>
          {selected && <Check size={12} color="#fff" />}
        </div>
        <span style={{ color: 'var(--evocaa-text)', fontSize: '0.9375rem' }}>
          {label}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`quiz-option ${selected ? 'selected' : ''}`}
    >
      <span
        className="option-badge"
        style={
          selected
            ? { background: 'var(--evocaa-gradient)' }
            : {}
        }
      >
        {badge}
      </span>
      <span style={{ color: 'var(--evocaa-text)', fontSize: '0.9375rem' }}>
        {label}
      </span>
    </button>
  );
}

// ── Navigation Buttons ──
function NavButtons({
  onBack,
  onNext,
  isFirst,
  isLast,
  isSubmitting,
  nextLabel,
}: {
  onBack: () => void;
  onNext: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  isSubmitting?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex gap-3 mt-8">
      {!isFirst && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--evocaa-border)',
            color: 'var(--evocaa-muted)',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = 'var(--evocaa-text)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'var(--evocaa-muted)')
          }
        >
          <ChevronLeft size={18} />
          Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={isSubmitting}
        className="btn-gradient flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold"
        style={{ background: 'var(--evocaa-gradient)', opacity: isSubmitting ? 0.7 : 1 }}
      >
        {isSubmitting ? (
          <span className="animate-spin">⟳</span>
        ) : (
          <>
            {nextLabel || (isLast ? 'Submit Assessment' : 'Continue')}
            {!isLast && <ChevronRight size={18} />}
          </>
        )}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────
// STEP 1: Basic Information
// ─────────────────────────────────────────
function Step1({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: AssessmentData;
  onChange: (u: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function validate() {
    const e: Record<string, string> = {};
    if (!data.fullName.trim()) e.fullName = 'Full name is required';
    if (!data.mobile.trim()) e.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(data.mobile.replace(/\s/g, '')))
      e.mobile = 'Enter a valid 10-digit mobile number';
    if (!data.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = 'Enter a valid email address';
    if (!data.city.trim()) e.city = 'Current city is required';
    if (!data.portfolioLink.trim()) e.portfolioLink = 'Portfolio link is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onChange({ resumeFile: file });
  }

  return (
    <div>
      <StepHeader
        step={1}
        total={6}
        title="Let's start with |the basics.|"
        subtitle="We need to know who you are."
      />

      <div className="space-y-5">
        <Field label="Full Name" required error={errors.fullName}>
          <input
            className="dark-input"
            placeholder="Your full name"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Mobile Number" required error={errors.mobile}>
            <input
              className="dark-input"
              placeholder="10-digit mobile number"
              type="tel"
              value={data.mobile}
              onChange={(e) => onChange({ mobile: e.target.value })}
            />
          </Field>
          <Field label="Email Address" required error={errors.email}>
            <input
              className="dark-input"
              placeholder="your@email.com"
              type="email"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Current City" required error={errors.city}>
          <input
            className="dark-input"
            placeholder="City you currently live in"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
          />
        </Field>

        <Field
          label="Portfolio Link"
          required
          error={errors.portfolioLink}
        >
          <input
            className="dark-input"
            placeholder="Google Drive, Behance, YouTube, Instagram, or personal website"
            type="url"
            value={data.portfolioLink}
            onChange={(e) => onChange({ portfolioLink: e.target.value })}
          />
        </Field>

        <Field label="Resume (Optional)">
          <div
            className={`dropzone ${dragging ? 'active' : ''}`}
            onDragEnter={() => setDragging(true)}
            onDragLeave={() => setDragging(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => onChange({ resumeFile: e.target.files?.[0] || null })}
            />
            {data.resumeFile ? (
              <div className="flex items-center justify-center gap-3">
                <Upload size={18} style={{ color: 'var(--evocaa-accent)' }} />
                <span style={{ color: 'var(--evocaa-text)' }}>
                  {data.resumeFile.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange({ resumeFile: null });
                  }}
                  className="ml-2"
                >
                  <X size={16} style={{ color: 'var(--evocaa-muted)' }} />
                </button>
              </div>
            ) : (
              <div>
                <Upload size={24} className="mx-auto mb-2" style={{ color: 'var(--evocaa-accent)' }} />
                <p className="text-sm" style={{ color: 'var(--evocaa-muted)' }}>
                  Drop your resume here or{' '}
                  <span style={{ color: 'var(--evocaa-accent)' }}>browse</span>
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--evocaa-muted)' }}>
                  PDF, DOC, DOCX — optional
                </p>
              </div>
            )}
          </div>
        </Field>
      </div>

      <NavButtons onBack={onBack} onNext={() => validate() && onNext()} isFirst />
    </div>
  );
}

// ─────────────────────────────────────────
// STEP 2: Professional Information
// ─────────────────────────────────────────
function Step2({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: AssessmentData;
  onChange: (u: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const experienceOpts = [
    'Fresher',
    'Less than 1 year',
    '1–2 years',
    '2–4 years',
    '4+ years',
  ];
  const softwareOpts = [
    'Adobe Premiere Pro',
    'After Effects',
    'DaVinci Resolve',
    'Final Cut Pro',
    'CapCut',
    'Photoshop',
    'Illustrator',
    'Other',
  ];
  const contentTypeOpts = [
    'Instagram Reels',
    'YouTube Shorts',
    'YouTube Long-form Videos',
    'Corporate Videos',
    'Commercial Ads',
    'Podcasts',
    'Wedding Videos',
    'Other',
  ];
  const noticePeriodOpts = [
    'Immediate',
    'Within 7 Days',
    'Within 15 Days',
    'Within 30 Days',
    'More than 30 Days',
  ];

  function validate() {
    const e: Record<string, string> = {};
    if (!data.yearsExperience) e.yearsExperience = 'Please select your experience';
    if (data.softwareUsed.length === 0) e.softwareUsed = 'Select at least one software';
    if (!data.contentType) e.contentType = 'Please select a content type';
    if (!data.noticePeriod) e.noticePeriod = 'Please select a notice period';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function toggleSoftware(s: string) {
    const next = data.softwareUsed.includes(s)
      ? data.softwareUsed.filter((x) => x !== s)
      : [...data.softwareUsed, s];
    onChange({ softwareUsed: next });
  }

  return (
    <div>
      <StepHeader
        step={2}
        total={6}
        title="|Professional| background."
        subtitle="Tell us about your editing experience."
      />

      <div className="space-y-6">
        {/* Experience */}
        <Field label="Years of professional video editing experience" required error={errors.yearsExperience}>
          <div className="flex flex-wrap gap-2 mt-1">
            {experienceOpts.map((opt) => (
              <button
                key={opt}
                onClick={() => onChange({ yearsExperience: opt })}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background:
                data.yearsExperience === opt
                  ? 'var(--evocaa-gradient)'
                  : 'rgba(255,255,255,0.06)',
              border:
                data.yearsExperience === opt
                  ? '1px solid rgba(201,255,61,0.5)'
                  : '1px solid var(--evocaa-border)',
              color:
                data.yearsExperience === opt
                  ? '#0B0B0D'
                  : 'var(--evocaa-text)',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          {errors.yearsExperience && (
            <p className="field-error">{errors.yearsExperience}</p>
          )}
        </Field>

        {/* Software — multi select */}
        <Field
          label="Editing software you use regularly"
          required
          error={errors.softwareUsed}
        >
          <p className="text-xs mb-3" style={{ color: 'var(--evocaa-muted)' }}>
            Select all that apply
          </p>
          <div className="space-y-2">
            {softwareOpts.map((opt) => (
              <QuizOption
                key={opt}
                label={opt}
                index={softwareOpts.indexOf(opt)}
                selected={data.softwareUsed.includes(opt)}
                onClick={() => toggleSoftware(opt)}
                multi
              />
            ))}
          </div>
        </Field>

        {/* Content type */}
        <Field label="Content type you've edited the most" required error={errors.contentType}>
          <div className="flex flex-wrap gap-2 mt-1">
            {contentTypeOpts.map((opt) => (
              <button
                key={opt}
                onClick={() => onChange({ contentType: opt })}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background:
                    data.contentType === opt
                      ? 'var(--evocaa-gradient)'
                      : 'rgba(255,255,255,0.06)',
                  border:
                    data.contentType === opt
                      ? '1px solid rgba(201,255,61,0.5)'
                      : '1px solid var(--evocaa-border)',
                  color:
                    data.contentType === opt ? '#0B0B0D' : 'var(--evocaa-text)',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </Field>

        {/* Salary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Current monthly salary (₹)">
            <input
              className="dark-input"
              placeholder="e.g. 15000"
              type="text"
              value={data.currentSalary}
              onChange={(e) => onChange({ currentSalary: e.target.value })}
            />
          </Field>
          <Field label="Expected monthly salary (₹)">
            <input
              className="dark-input"
              placeholder="e.g. 20000"
              type="text"
              value={data.expectedSalary}
              onChange={(e) => onChange({ expectedSalary: e.target.value })}
            />
          </Field>
        </div>

        {/* Notice period */}
        <Field label="Notice period" required error={errors.noticePeriod}>
          <div className="flex flex-wrap gap-2 mt-1">
            {noticePeriodOpts.map((opt) => (
              <button
                key={opt}
                onClick={() => onChange({ noticePeriod: opt })}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  background:
                    data.noticePeriod === opt
                      ? 'var(--evocaa-gradient)'
                      : 'rgba(255,255,255,0.06)',
                  border:
                    data.noticePeriod === opt
                      ? '1px solid rgba(201,255,61,0.5)'
                      : '1px solid var(--evocaa-border)',
                  color:
                    data.noticePeriod === opt ? '#0B0B0D' : 'var(--evocaa-text)',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <NavButtons onBack={onBack} onNext={() => validate() && onNext()} />
    </div>
  );
}

// ─────────────────────────────────────────
// STEP 3: Technical Assessment
// ─────────────────────────────────────────
function Step3({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: AssessmentData;
  onChange: (u: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [errors, setErrors] = useState('');
  const total = TECH_QUESTIONS.length;
  const q = TECH_QUESTIONS[currentQ];
  const answered = Object.keys(data.tech).length;

  function selectAnswer(answer: string) {
    const next = { ...data.tech, [currentQ]: answer };
    onChange({ tech: next });
    setErrors('');
    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQ < total - 1) setCurrentQ((p) => p + 1);
    }, 450);
  }

  function handleNext() {
    if (answered < total) {
      setErrors(`Please answer all ${total} questions. (${answered}/${total} answered)`);
      return;
    }
    onNext();
  }

  return (
    <div>
      <StepHeader
        step={3}
        total={6}
        title="|Technical| Assessment."
        subtitle="10 questions — 4 marks each. Answer what you know."
      />

      {/* Question navigator dots */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {TECH_QUESTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
            style={{
              background:
                data.tech[i] !== undefined
                  ? 'var(--evocaa-gradient)'
                  : i === currentQ
                  ? 'rgba(201,255,61,0.3)'
                  : 'rgba(255,255,255,0.06)',
              color: data.tech[i] !== undefined || i === currentQ ? '#0B0B0D' : 'var(--evocaa-muted)',
              border:
                i === currentQ ? '2px solid rgba(201,255,61,0.6)' : '1px solid var(--evocaa-border)',
              fontFamily: 'var(--app-font-mono)',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question card */}
      <div
        className="glow-card p-6 sm:p-8 mb-6 quiz-glow-bg"
        key={currentQ}
        style={{
          animation: 'fadeInUp 0.35s ease-out',
        }}
      >
        <div className="flex items-start gap-4 mb-6">
          <span
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
            style={{
              background: 'var(--evocaa-gradient)',
              fontFamily: 'var(--app-font-mono)',
              color: '#0B0B0D',
            }}
          >
            Q{currentQ + 1}
          </span>
          <h3
            className="font-semibold leading-snug pt-1"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#fff' }}
          >
            {q.q}
          </h3>
        </div>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <QuizOption
              key={opt}
              label={opt}
              index={i}
              selected={data.tech[currentQ] === opt}
              onClick={() => selectAnswer(opt)}
            />
          ))}
        </div>
      </div>

      {errors && <p className="field-error mb-4">{errors}</p>}

      {/* Navigation within questions */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
          disabled={currentQ === 0}
          className="text-sm flex items-center gap-1 transition-colors"
          style={{
            color: currentQ === 0 ? 'var(--evocaa-border)' : 'var(--evocaa-muted)',
          }}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span
          style={{
            fontFamily: 'var(--app-font-mono)',
            fontSize: '0.75rem',
            color: 'var(--evocaa-muted)',
          }}
        >
          {answered}/{total} answered
        </span>
        <button
          onClick={() => setCurrentQ((p) => Math.min(total - 1, p + 1))}
          disabled={currentQ === total - 1}
          className="text-sm flex items-center gap-1 transition-colors"
          style={{
            color:
              currentQ === total - 1 ? 'var(--evocaa-border)' : 'var(--evocaa-muted)',
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      <NavButtons onBack={onBack} onNext={handleNext} />
    </div>
  );
}

// ─────────────────────────────────────────
// STEP 4: Work Style & Problem Solving
// ─────────────────────────────────────────
function Step4({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: AssessmentData;
  onChange: (u: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [errors, setErrors] = useState('');
  const total = WORK_STYLE_QUESTIONS.length;
  const q = WORK_STYLE_QUESTIONS[currentQ];
  const answered = Object.keys(data.workStyle).length;

  function selectAnswer(answer: string) {
    onChange({ workStyle: { ...data.workStyle, [currentQ]: answer } });
    setErrors('');
    setTimeout(() => {
      if (currentQ < total - 1) setCurrentQ((p) => p + 1);
    }, 450);
  }

  function handleNext() {
    if (answered < total) {
      setErrors(`Please answer all ${total} questions. (${answered}/${total} answered)`);
      return;
    }
    onNext();
  }

  return (
    <div>
      <StepHeader
        step={4}
        total={6}
        title="|Work Style| & Problem Solving."
        subtitle="5 scenarios — how do you think and act?"
      />

      {/* Question dots */}
      <div className="flex gap-2 mb-6">
        {WORK_STYLE_QUESTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
            style={{
              background:
                data.workStyle[i] !== undefined
                  ? 'var(--evocaa-gradient)'
                  : i === currentQ
                  ? 'rgba(201,255,61,0.3)'
                  : 'rgba(255,255,255,0.06)',
              color:
                data.workStyle[i] !== undefined || i === currentQ
                  ? '#0B0B0D'
                  : 'var(--evocaa-muted)',
              border:
                i === currentQ
                  ? '2px solid rgba(201,255,61,0.6)'
                  : '1px solid var(--evocaa-border)',
              fontFamily: 'var(--app-font-mono)',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div
        className="glow-card p-6 sm:p-8 mb-6 quiz-glow-bg"
        key={currentQ}
      >
        <div className="flex items-start gap-4 mb-6">
          <span
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
            style={{
              background: 'var(--evocaa-gradient)',
              fontFamily: 'var(--app-font-mono)',
              color: '#0B0B0D',
            }}
          >
            S{currentQ + 1}
          </span>
          <h3
            className="font-semibold leading-snug pt-1"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: '#fff' }}
          >
            {q.q}
          </h3>
        </div>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <QuizOption
              key={opt}
              label={opt}
              index={i}
              selected={data.workStyle[currentQ] === opt}
              onClick={() => selectAnswer(opt)}
            />
          ))}
        </div>
      </div>

      {errors && <p className="field-error mb-4">{errors}</p>}

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
          disabled={currentQ === 0}
          className="text-sm flex items-center gap-1"
          style={{ color: currentQ === 0 ? 'var(--evocaa-border)' : 'var(--evocaa-muted)' }}
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span
          style={{
            fontFamily: 'var(--app-font-mono)',
            fontSize: '0.75rem',
            color: 'var(--evocaa-muted)',
          }}
        >
          {answered}/{total} answered
        </span>
        <button
          onClick={() => setCurrentQ((p) => Math.min(total - 1, p + 1))}
          disabled={currentQ === total - 1}
          className="text-sm flex items-center gap-1"
          style={{
            color:
              currentQ === total - 1
                ? 'var(--evocaa-border)'
                : 'var(--evocaa-muted)',
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      <NavButtons onBack={onBack} onNext={handleNext} />
    </div>
  );
}

// ─────────────────────────────────────────
// STEP 5: Portfolio Evaluation
// ─────────────────────────────────────────
function Step5({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: AssessmentData;
  onChange: (u: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!data.bestProject.trim()) e.bestProject = 'Please share a link to your best project';
    if (!data.proudProject.trim()) e.proudProject = 'Please answer this question';
    if (!data.clientStrength.trim()) e.clientStrength = 'Please answer this question';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div>
      <StepHeader
        step={5}
        total={6}
        title="|Portfolio| Evaluation."
        subtitle="Show us your best work. This is reviewed personally by our team."
      />

      <div className="space-y-6">
        <Field label="Share your best editing project" required error={errors.bestProject}>
          <input
            className="dark-input"
            placeholder="Link to your best project (YouTube, Drive, Vimeo, etc.)"
            type="url"
            value={data.bestProject}
            onChange={(e) => onChange({ bestProject: e.target.value })}
          />
        </Field>

        <Field
          label="Which project are you most proud of, and why?"
          required
          error={errors.proudProject}
        >
          <textarea
            className="dark-input"
            placeholder="Describe the project and what makes it special to you..."
            rows={4}
            value={data.proudProject}
            onChange={(e) => onChange({ proudProject: e.target.value })}
          />
        </Field>

        <Field
          label="If we contact one of your previous clients or employers, what would they say is your biggest strength?"
          required
          error={errors.clientStrength}
        >
          <textarea
            className="dark-input"
            placeholder="Be honest and specific..."
            rows={4}
            value={data.clientStrength}
            onChange={(e) => onChange({ clientStrength: e.target.value })}
          />
        </Field>
      </div>

      <NavButtons onBack={onBack} onNext={() => validate() && onNext()} />
    </div>
  );
}

// ─────────────────────────────────────────
// STEP 6: Final Questions
// ─────────────────────────────────────────
function Step6({
  data,
  onChange,
  onNext,
  onBack,
  isSubmitting,
}: {
  data: AssessmentData;
  onChange: (u: Partial<AssessmentData>) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!data.whyEvocaa.trim()) e.whyEvocaa = 'Please answer this question';
    if (!data.whyYou.trim()) e.whyYou = 'Please answer this question';
    if (!data.skillLearning.trim()) e.skillLearning = 'Please answer this question';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div>
      <StepHeader
        step={6}
        total={6}
        title="|Final| Questions."
        subtitle="These long-form answers are read personally. Be authentic."
      />

      <div className="space-y-6">
        <Field label="Why do you want to join Evocaa?" required error={errors.whyEvocaa}>
          <textarea
            className="dark-input"
            placeholder="Tell us what specifically draws you to Evocaa..."
            rows={5}
            value={data.whyEvocaa}
            onChange={(e) => onChange({ whyEvocaa: e.target.value })}
          />
        </Field>

        <Field
          label="Why should we hire you instead of other candidates?"
          required
          error={errors.whyYou}
        >
          <textarea
            className="dark-input"
            placeholder="What makes you uniquely valuable to us..."
            rows={5}
            value={data.whyYou}
            onChange={(e) => onChange({ whyYou: e.target.value })}
          />
        </Field>

        <Field
          label="What editing skill are you currently learning or improving?"
          required
          error={errors.skillLearning}
        >
          <textarea
            className="dark-input"
            placeholder="Be specific — what, how, and why..."
            rows={4}
            value={data.skillLearning}
            onChange={(e) => onChange({ skillLearning: e.target.value })}
          />
        </Field>

        <Field label="Anything else you'd like us to know? (Optional)">
          <textarea
            className="dark-input"
            placeholder="Optional — share anything that didn't fit elsewhere..."
            rows={3}
            value={data.additionalInfo}
            onChange={(e) => onChange({ additionalInfo: e.target.value })}
          />
        </Field>
      </div>

      <NavButtons
        onBack={onBack}
        onNext={() => validate() && onNext()}
        isLast
        isSubmitting={isSubmitting}
        nextLabel="Submit Assessment"
      />
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN ASSESSMENT COMPONENT
// ─────────────────────────────────────────
export default function Assessment({
  data,
  onChange,
  onSubmit,
  onBack,
  isSubmitting,
  submitted,
}: AssessmentProps) {
  const [step, setStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top on step change
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Restore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('evocaa-assessment-step');
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (parsed >= 1 && parsed <= 6) setStep(parsed);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('evocaa-assessment-step', String(step));
  }, [step]);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ background: 'var(--evocaa-bg)' }}>
        <div
          className="max-w-lg w-full text-center glow-card p-10"
          style={{
            background: 'rgba(201,255,61,0.06)',
          }}
        >
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: 'var(--evocaa-gradient)' }}
          >
            <Check size={36} color="#fff" />
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#fff' }}
          >
            Assessment Submitted.
          </h2>
          <p
            className="text-lg mb-6"
            style={{ color: 'var(--evocaa-muted)', lineHeight: 1.7 }}
          >
            Thanks, <strong style={{ color: 'var(--evocaa-text)' }}>{data.fullName}</strong> — your assessment has been submitted. Shortlisted candidates will be contacted within{' '}
            <strong style={{ color: 'var(--evocaa-accent)' }}>3 business days.</strong>
          </p>
          <p className="text-sm" style={{ color: 'var(--evocaa-muted)' }}>
            Step 3 of 6 — Technical Assessment.
          </p>
        </div>
      </div>
    );
  }

  const stepProps = { data, onChange, onNext: () => setStep((s) => s + 1), onBack: () => (step === 1 ? onBack() : setStep((s) => s - 1)) };

  return (
    <div
      ref={containerRef}
      className="min-h-screen"
      style={{ background: 'var(--evocaa-bg)' }}
    >
      <div className="grain-overlay" aria-hidden />

      {/* Assessment header bar */}
      <div
        className="sticky top-0 z-50 py-3 px-5"
        style={{
          backdropFilter: 'blur(20px)',
          background: 'rgba(10,10,11,0.9)',
          borderBottom: '1px solid rgba(42,42,46,0.6)',
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => (step === 1 ? onBack() : setStep((s) => s - 1))}
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--evocaa-muted)' }}
          >
            <ChevronLeft size={16} />
            {step === 1 ? 'Back to Job' : 'Back'}
          </button>
          <span
            className="text-sm font-bold tracking-widest"
            style={{ color: 'var(--evocaa-text)' }}
          >
            EVOCAA
          </span>
          <span
            style={{
              fontFamily: 'var(--app-font-mono)',
              fontSize: '0.75rem',
              color: 'var(--evocaa-muted)',
            }}
          >
            Step {step}/6
          </span>
        </div>
      </div>

      {/* Form content */}
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        {/* Radial glow behind quiz card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(201,255,61,0.1) 0%, transparent 70%)',
          }}
        />

        <div className="relative">
          {step === 1 && <Step1 {...stepProps} />}
          {step === 2 && <Step2 {...stepProps} />}
          {step === 3 && <Step3 {...stepProps} />}
          {step === 4 && <Step4 {...stepProps} />}
          {step === 5 && <Step5 {...stepProps} />}
          {step === 6 && (
            <Step6
              {...stepProps}
              onNext={onSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}
