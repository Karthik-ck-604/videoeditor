export type AssessmentData = {
  // Step 1 - Basic Info
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  portfolioLink: string;
  resumeFile?: File | null;

  // Step 2 - Professional Info
  yearsExperience: string;
  softwareUsed: string[];
  contentType: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;

  // Step 3 - Technical (10 questions, auto-scored)
  tech: Record<number, string>; // question index -> selected option text

  // Step 4 - Work Style (5 questions, auto-scored)
  workStyle: Record<number, string>;

  // Step 5 - Portfolio Evaluation
  bestProject: string;
  proudProject: string;
  clientStrength: string;

  // Step 6 - Final Questions
  whyEvocaa: string;
  whyYou: string;
  skillLearning: string;
  additionalInfo: string;
};

export const INITIAL_DATA: AssessmentData = {
  fullName: '',
  mobile: '',
  email: '',
  city: '',
  portfolioLink: '',
  resumeFile: null,
  yearsExperience: '',
  softwareUsed: [],
  contentType: '',
  currentSalary: '',
  expectedSalary: '',
  noticePeriod: '',
  tech: {},
  workStyle: {},
  bestProject: '',
  proudProject: '',
  clientStrength: '',
  whyEvocaa: '',
  whyYou: '',
  skillLearning: '',
  additionalInfo: '',
};

// Question text and options are intentionally client-side. Correct answers live only in
// the API server, which re-scores every submission and is the score source of truth.
export const TECH_QUESTIONS = [
  {
    q: 'Which software is primarily used for motion graphics?',
    options: [
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'Adobe Photoshop',
      'Canva',
    ],
  },
  {
    q: 'Which aspect ratio is best for Instagram Reels?',
    options: ['16:9', '9:16', '1:1', '4:3'],
  },
  {
    q: 'What is the main purpose of B-roll footage?',
    options: [
      'Increase video length',
      'Support the main story visually',
      'Add background music',
      'Reduce file size',
    ],
  },
  {
    q: 'Which export format is most commonly used for social media?',
    options: ['MP4 (H.264)', 'MOV', 'AVI', 'GIF'],
  },
  {
    q: 'What is the most important goal of the first 3 seconds of a short-form video?',
    options: [
      'Display the logo',
      'Introduce the editor',
      "Grab the viewer's attention",
      'Show credits',
    ],
  },
  {
    q: 'Why are captions important in short-form content?',
    options: [
      'They reduce file size',
      'They improve viewer retention and accessibility',
      'They improve camera quality',
      'They make exporting faster',
    ],
  },
  {
    q: 'Which editing technique removes awkward pauses while keeping the video engaging?',
    options: ['Color grading', 'Jump cuts', 'Masking', 'Tracking'],
  },
  {
    q: 'Which audio issue should always be fixed before exporting?',
    options: ['Low saturation', 'Background noise', 'Frame rate', 'White balance'],
  },
  {
    q: 'What is the purpose of keyframes?',
    options: [
      'Export videos faster',
      'Animate properties over time',
      'Compress videos',
      'Improve internet speed',
    ],
  },
  {
    q: 'What is more important in a marketing video?',
    options: [
      'Fancy transitions',
      'Storytelling and audience retention',
      'Expensive camera footage',
      'Slow-motion effects',
    ],
  },
];

export const WORK_STYLE_QUESTIONS = [
  {
    q: 'A client requests multiple revisions. What would you do?',
    options: [
      'Refuse the request',
      'Understand the feedback and improve the edit',
      'Ignore the request',
      'Deliver the same version again',
    ],
  },
  {
    q: "You realize you cannot meet today's deadline. What should you do first?",
    options: [
      'Wait and hope for more time',
      'Inform the team immediately and suggest a solution',
      'Ignore the deadline',
      'Submit unfinished work',
    ],
  },
  {
    q: 'You receive constructive feedback on your edit. How do you respond?',
    options: [
      'Defend every decision',
      'Review the feedback and improve the video',
      'Ignore the feedback',
      'Leave the project',
    ],
  },
  {
    q: 'Your teammate is struggling with a project and asks for help. What do you do?',
    options: [
      'Ignore the request',
      "Help if you're available and communicate with the team",
      'Tell them to figure it out themselves',
      'Report them to the manager',
    ],
  },
  {
    q: 'Which statement best describes your editing approach?',
    options: [
      'I edit to impress other editors.',
      'I edit to help the audience understand and take action.',
      'I only focus on visual effects.',
      'I only follow trends.',
    ],
  },
];

export const STEP_NAMES = [
  'Basic Info',
  'Professional Info',
  'Technical Assessment',
  'Work Style',
  'Portfolio',
  'Final Questions',
];
