import { Router } from 'express';
import { logger } from '../lib/logger';
import { sendRecruiterEmail } from '../lib/mailer';

const router = Router();

// ── Internal answer keys (server-only, never sent to client) ──
const TECH_ANSWERS = [
  'Adobe After Effects',
  '9:16',
  'Support the main story visually',
  'MP4 (H.264)',
  "Grab the viewer's attention",
  'They improve viewer retention and accessibility',
  'Jump cuts',
  'Background noise',
  'Animate properties over time',
  'Storytelling and audience retention',
];

const WORK_STYLE_ANSWERS = [
  'Understand the feedback and improve the edit',
  'Inform the team immediately and suggest a solution',
  'Review the feedback and improve the video',
  "Help if you're available and communicate with the team",
  'I edit to help the audience understand and take action.',
];

function scoreTech(answers: Record<number, string>): number {
  return TECH_ANSWERS.reduce((sum, correct, i) => {
    return sum + (answers[i] === correct ? 4 : 0);
  }, 0);
}

function scoreWorkStyle(answers: Record<number, string>): number {
  return WORK_STYLE_ANSWERS.reduce((sum, correct, i) => {
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

    // Recalculate scores server-side (never trust client)
    const techScore = scoreTech(payload.techAnswers || {});
    const workStyleScore = scoreWorkStyle(payload.workStyleAnswers || {});
    // Only Steps 3 and 4 are objectively scorable here. The remaining 40 points
    // are intentionally left for recruiter review; do not infer a /100 total.
    const autoScore = techScore + workStyleScore;

    // Candidate fields, populated from the actual validated submission payload.
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

    const subject = `New Assessment Submission — ${candidate.fullName} — Video Editor (Full-Time) — Auto Score: ${autoScore}/60`;

    const body = `Hi Recruiting Team,
A candidate has completed the full hiring assessment for Video Editor (Full-Time). Summary below.
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
Technical Assessment (Step 3): ${techScore}/40
Work Style Assessment (Step 4): ${workStyleScore}/20
Auto Score Subtotal: ${autoScore}/60

Submitted: ${new Date().toISOString()}
This is an automated notification from the Evocaa hiring assessment. Please complete manual scoring for the remaining 40 points and update the candidate's status accordingly.`;

    // Email send must never block or fail the candidate-facing response.
    // sendRecruiterEmail absorbs delivery errors internally and logs them.
    await sendRecruiterEmail(subject, body);

    // Priority band tag (internal only)
    const band =
      autoScore >= 50
        ? 'Priority Review'
        : autoScore >= 35
          ? 'Standard Review'
          : 'Low Priority';
    logger.info(
      { candidateName: candidate.fullName, autoScore, band },
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