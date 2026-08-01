import { Router } from 'express';
import nodemailer from 'nodemailer';
import { logger } from '../lib/logger';

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

const EMAIL_RETRY_DELAY_MS = 500;

const submissionValue = (value: unknown, fallback = 'Not provided'): string => {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function sendRecruiterEmail({
  subject,
  text,
  candidateName,
}: {
  subject: string;
  text: string;
  candidateName: string;
}) {
  const recipient = process.env.RECRUITER_EMAIL;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!recipient || !host || !user || !pass || !from) {
    logger.warn(
      {
        candidateName,
        hasRecruiterEmail: Boolean(recipient),
        hasSmtpHost: Boolean(host),
        hasSmtpUser: Boolean(user),
        hasSmtpPass: Boolean(pass),
        hasSmtpFrom: Boolean(from),
      },
      'Recruiter email was not sent because SMTP configuration is incomplete',
    );
    return;
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host,
    port: Number.isFinite(port) ? port : 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const result = await transporter.sendMail({ from, to: recipient, subject, text });
      logger.info(
        { candidateName, messageId: result.messageId, attempt },
        'Recruiter notification email sent',
      );
      return;
    } catch (err) {
      if (attempt === 2) {
        logger.error({ err, candidateName, attempt }, 'Recruiter notification email failed');
        return;
      }

      logger.warn({ err, candidateName, attempt }, 'Recruiter notification email failed; retrying');
      await delay(EMAIL_RETRY_DELAY_MS);
    }
  }
}

router.post('/submit', async (req, res) => {
  try {
    const body = req.body;

    // Recalculate scores server-side (never trust client)
    const techScore = scoreTech(body.techAnswers || {});
    const workStyleScore = scoreWorkStyle(body.workStyleAnswers || {});
    // Only Steps 3 and 4 are objectively scorable here. The remaining 40 points
    // are intentionally left for recruiter review; do not infer a /100 total.
    const autoTotal = techScore + workStyleScore;

    const submittedAt = new Date();
    const timestamp = submittedAt.toISOString();
    const submittedDisplay = submittedAt.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      timeZoneName: 'short',
    });

    // Build HR notification payload
    const hrPayload = `
NEW APPLICATION — Video Editor (Full-Time) — Evocaa

Candidate: ${body.fullName}
Mobile: ${body.mobile}
Email: ${body.email}
City: ${body.city}
Portfolio: ${body.portfolioLink}
Resume: ${body.hasResume ? 'attached' : 'not provided'}

Experience: ${body.yearsExperience}
Software: ${(body.softwareUsed || []).join(', ')}
Content type: ${body.contentType}
Current salary: ${body.currentSalary || 'not provided'}
Expected salary: ${body.expectedSalary || 'not provided'}
Notice period: ${body.noticePeriod}

Auto Score — Technical (Step 3): ${techScore}/40
Auto Score — Work Style (Step 4): ${workStyleScore}/20
Auto Subtotal: ${autoTotal}/60

Portfolio Evaluation (Step 5):
  Best project: ${body.bestProject}
  Most proud of: ${body.proudProject}
  Client strength: ${body.clientStrength}

Final Questions (Step 6):
  Why Evocaa: ${body.whyEvocaa}
  Why hire: ${body.whyYou}
  Skill learning: ${body.skillLearning}
  Additional: ${body.additionalInfo || 'none'}

Manual Score: Pending Review
Combined Score: ${autoTotal}/60 + Manual (pending)

Submitted: ${timestamp}
    `.trim();

    // Keep the full internal payload for operational debugging; the email itself is summary-only.
    logger.info({ candidateName: body.fullName, hrPayload }, 'Application submission received');

    const fullName = submissionValue(body.fullName);
    const emailText = `Hi Recruiting Team,
A candidate has completed the full hiring assessment for Video Editor (Full-Time). Summary below.
CANDIDATE

Name: ${fullName}
Email: ${submissionValue(body.email)}
Mobile: ${submissionValue(body.mobile)}
City: ${submissionValue(body.city)}
Portfolio: ${submissionValue(body.portfolioLink)}
Resume: ${body.hasResume ? 'Attached' : 'Not provided'}

LOGISTICS
Experience: ${submissionValue(body.yearsExperience)}
Software: ${Array.isArray(body.softwareUsed) && body.softwareUsed.length ? body.softwareUsed.join(', ') : 'Not provided'}
Current Salary: ${submissionValue(body.currentSalary)}
Expected Salary: ${submissionValue(body.expectedSalary)}
Notice Period: ${submissionValue(body.noticePeriod)}

SCORING
Technical Assessment (Step 3): ${techScore}/40
Work Style Assessment (Step 4): ${workStyleScore}/20
Auto Score Subtotal: ${autoTotal}/60

Submitted: ${submittedDisplay}
This is an automated notification from the Evocaa hiring assessment. Please complete manual scoring for the remaining 40 points and update the candidate's status accordingly.`;

    // Deliberately detached: an SMTP outage must not delay or fail the candidate response.
    void sendRecruiterEmail({
      candidateName: fullName,
      subject: `New Assessment Submission — ${fullName} — Video Editor (Full-Time) — Auto Score: ${autoTotal}/60`,
      text: emailText,
    });

    // Priority band tag (internal only)
    const band = autoTotal >= 50 ? 'Priority Review' : autoTotal >= 35 ? 'Standard Review' : 'Low Priority';
    logger.info({ candidateName: fullName, autoTotal, band }, 'Application auto-score calculated');

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
