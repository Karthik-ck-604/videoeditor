import { Router } from 'express';

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

router.post('/submit', async (req, res) => {
  try {
    const body = req.body;

    // Recalculate scores server-side (never trust client)
    const techScore = scoreTech(body.techAnswers || {});
    const workStyleScore = scoreWorkStyle(body.workStyleAnswers || {});
    const autoTotal = techScore + workStyleScore;

    const timestamp = new Date().toISOString();

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

    // Log to console (in production, send to email/Slack/CRM)
    console.log('\n' + '='.repeat(60));
    console.log(hrPayload);
    console.log('='.repeat(60) + '\n');

    // Priority band tag (internal only)
    const band = autoTotal >= 50 ? 'Priority Review' : autoTotal >= 35 ? 'Standard Review' : 'Low Priority';
    console.log(`[EVOCAA] Application from ${body.fullName} — Auto: ${autoTotal}/60 — Band: ${band}`);

    res.json({
      success: true,
      message: 'Application received',
      // Never reveal score to client
    });
  } catch (err) {
    console.error('[EVOCAA] Submission error:', err);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
});

export default router;
