// Server-side roles answer keys — never sent to the client.
// Each role has techAnswers and workStyleAnswers arrays that correspond
// positionally to the questions in frontend/src/lib/roles/index.ts.

export interface RoleAnswerKey {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  type: string;
  recruiterEmailOverride?: string; // overrides RECRUITER_EMAIL env var if set
  /** Correct answer strings for tech questions, in order (index = question position) */
  techAnswers: string[];
  /** Correct answer strings for work-style questions, in order */
  workStyleAnswers: string[];
}

export const ROLE_ANSWER_KEYS: RoleAnswerKey[] = [
  {
    slug: 'video-editor',
    title: 'Video Editor',
    subtitle: '(Full-Time)',
    location: 'Coimbatore (Office)',
    type: 'Full-Time',
    techAnswers: [
      'Adobe After Effects',                              // q1
      '9:16',                                             // q2
      'Support the main story visually',                  // q3
      'MP4 (H.264)',                                      // q4
      "Grab the viewer's attention",                      // q5
      'They improve viewer retention and accessibility',  // q6
      'Jump cuts',                                        // q7
      'Background noise',                                 // q8
      'Animate properties over time',                     // q9
      'Storytelling and audience retention',              // q10
    ],
    workStyleAnswers: [
      'Understand the feedback and improve the edit',             // w1
      'Inform the team immediately and suggest a solution',       // w2
      'Review the feedback and improve the video',                // w3
      "Help if you're available and communicate with the team",   // w4
      'I edit to help the audience understand and take action.',  // w5
    ],
  },
  {
    slug: 'graphic-designer',
    title: 'Graphic Designer',
    subtitle: '(Full-Time)',
    location: 'Coimbatore (Office)',
    type: 'Full-Time',
    techAnswers: [
      'RGB',                                                                                        // gd-q1
      'Vectors are made of math paths and scale cleanly; Rasters use pixels and degrade.',          // gd-q2
      'The adjustment of space between individual characters',                                      // gd-q3
      'Figma',                                                                                      // gd-q4
      "Guide the viewer's eye to key information in order of importance",                           // gd-q5
      'PNG',                                                                                        // gd-q6
      'The distance between lines of text',                                                         // gd-q7
      'The empty space around elements that gives them breathing room',                             // gd-q8
      '72 PPI',                                                                                     // gd-q9
      'They scale infinitely without loss of quality.',                                             // gd-q10
    ],
    workStyleAnswers: [
      'Brainstorm 3 new CTA layouts and A/B test them',                         // gd-w1
      'Incorporate the changes quickly and verify layout integrity',             // gd-w2
      'Fix it immediately and update the team',                                 // gd-w3
      'Offer tips and walk them through visual solutions',                      // gd-w4
      'Evaluate conversion/business impact with the team and order accordingly',// gd-w5
    ],
  },
  {
    slug: 'client-support',
    title: 'Client Support',
    subtitle: '(Full-Time)',
    location: 'Coimbatore (Office)',
    type: 'Full-Time',
    techAnswers: [
      'The time between customer submission and the first human agent reply',                                                    // cs-q1
      'Acknowledge the frustration, apologize for the delay, and provide tracking details',                                      // cs-q2
      'A commitment between support and the client regarding target response/resolution times',                                   // cs-q3
      'Inform the client you are looking into it and will follow up shortly, then consult documentation/team',                   // cs-q4
      'Customer Satisfaction score',                                                                                             // cs-q5
      'Keep paragraphs short, use formatting like bold text for key actions, and sound professional',                            // cs-q6
      'Customer Relationship Management',                                                                                        // cs-q7
      'Steps to reproduce the bug, browser version, and screenshots',                                                           // cs-q8
      'Fully focusing on, understanding, and responding thoughtfully to what the client is saying',                              // cs-q9
      'Use canned templates where appropriate, remain calm, prioritize quick tasks, and set expectations',                       // cs-q10
    ],
    workStyleAnswers: [
      'Apologize sincerely, review the interaction objectively, and resolve the root issue',                            // cs-w1
      'Flag it to the engineering team immediately and draft a template response for incoming chats',                   // cs-w2
      'Simplify the explanation, try a different angle (e.g. video or screenshots), or offer a quick screen share',    // cs-w3
      'Use it to adjust your communication style and improve customer interactions',                                    // cs-w4
      'Acknowledge the query, explain that you are looping in a specialist, and route it with context notes',          // cs-w5
    ],
  },
];

export function getRoleBySlug(slug: string): RoleAnswerKey | undefined {
  return ROLE_ANSWER_KEYS.find((r) => r.slug === slug);
}
