import { Router } from 'express';
import { logger } from '../lib/logger';
import { sendRecruiterEmail } from '../lib/mailer';
import { getRoleBySlug } from './roles';

const router = Router();

function scoreTech(answers: Record<number, string>, correctAnswers: string[]): number {
  return correctAnswers.reduce((sum, correct, i) => {
    return sum + (answers[i] === correct ? 4 : 0);
  }, 0);
}

function scoreWorkStyle(answers: Record<number, string>, correctAnswers: string[]): number {
  return correctAnswers.reduce((sum, correct, i) => {
    return sum + (answers[i] === correct ? 4 : 0);
  }, 0);
}

const submissionValue = (value: unknown, fallback = 'Not provided'): string => {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
};

router.post('/submit', async (req, res) => {
  try {
    const payload = req.body;

    // ── Role lookup & validation ──────────────────────────────────────────────
    const roleSlug = typeof payload.roleSlug === 'string' ? payload.roleSlug.trim() : '';
    const role = getRoleBySlug(roleSlug);

    if (!role) {
      logger.warn({ roleSlug }, 'Submission rejected: unrecognised roleSlug');
      res.status(400).json({
        success: false,
        message: `Unknown role: "${roleSlug}". Valid roles are: video-editor, graphic-designer, client-support.`,
      });
      return;
    }

    // ── Server-side scoring (never trust the client) ──────────────────────────
    const techScore = scoreTech(payload.techAnswers || {}, role.techAnswers);
    const workStyleScore = scoreWorkStyle(payload.workStyleAnswers || {}, role.workStyleAnswers);
    // Only Steps 3 and 4 are objectively scorable.
    // The remaining points are reserved for manual recruiter review.
    const autoScore = techScore + workStyleScore;
    const maxAutoScore = (role.techAnswers.length + role.workStyleAnswers.length) * 4;

    // ── Candidate summary ─────────────────────────────────────────────────────
    const candidate = {
      fullName: submissionValue(payload.fullName),
      email: submissionValue(payload.email),
      mobile: submissionValue(payload.mobile),
      city: submissionValue(payload.city),
      portfolio: submissionValue(payload.portfolioLink),
      resume: payload.hasResume ? 'Attached' : 'Not provided',
      experience: submissionValue(payload.yearsExperience),
      software:
        Array.isArray(payload.softwareUsed) && payload.softwareUsed.length
          ? payload.softwareUsed.join(', ')
          : 'Not provided',
      currentSalary: submissionValue(payload.currentSalary),
      expectedSalary: submissionValue(payload.expectedSalary),
      noticePeriod: submissionValue(payload.noticePeriod),
    };

    const roleLabel = `${role.title} ${role.subtitle}`;

    // ── Recruiter email ───────────────────────────────────────────────────────
    const subject = `New Assessment Submission — ${candidate.fullName} — ${roleLabel} — Auto Score: ${autoScore}/${maxAutoScore}`;

    const body = `Hi Recruiting Team,
A candidate has completed the full hiring assessment for ${roleLabel}. Summary below.

CANDIDATE

Name: ${candidate.fullName}
Email: ${candidate.email}
Mobile: ${candidate.mobile}
City: ${candidate.city}
Portfolio: ${candidate.portfolio}
Resume: ${candidate.resume}

LOGISTICS
Experience: ${candidate.experience}
Software: ${candidate.software}
Current Salary: ${candidate.currentSalary}
Expected Salary: ${candidate.expectedSalary}
Notice Period: ${candidate.noticePeriod}

SCORING
Technical Assessment (Step 3): ${techScore}/${role.techAnswers.length * 4}
Work Style Assessment (Step 4): ${workStyleScore}/${role.workStyleAnswers.length * 4}
Auto Score Subtotal: ${autoScore}/${maxAutoScore}

Submitted: ${new Date().toISOString()}

This is an automated notification from the Evocaa hiring assessment for the ${roleLabel} role.
Please complete manual scoring for the remaining points and update the candidate's status accordingly.`;

    // Use role-level override first, then fall back to env var.
    const toEmail = role.recruiterEmailOverride ?? process.env.RECRUITER_EMAIL!;

    // Email send must never block or fail the candidate-facing response.
    await sendRecruiterEmail(subject, body, toEmail);

    // ── Priority band tagging (internal only) ─────────────────────────────────
    const band =
      autoScore >= maxAutoScore * 0.83
        ? 'Priority Review'
        : autoScore >= maxAutoScore * 0.58
          ? 'Standard Review'
          : 'Low Priority';

    logger.info(
      { candidateName: candidate.fullName, roleSlug, autoScore, maxAutoScore, band },
      'Application submission processed',
    );

    res.json({
      success: true,
      message: 'Application received',
      // Never reveal score to client
    });
  } catch (err) {
    logger.error({ err }, 'Application submission error');
    res.status(500).json({ success: false, message: 'Internal error' });
  }
});

export default router;