export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  points: number
}

export interface RoleConfig {
  slug: string
  title: string
  subtitle: string
  team: string
  location: string
  type: string
  datePosted: string
  heroImage: string
  jobSummary: string
  yourRole: { heading: string; paragraphs: string[] }
  idealCandidate: string[]
  requirements: { title: string; items: string[] }[]
  whatYoullDo: string[]
  dontApplyIf: string[]
  softwareOptions: string[]
  portfolioPrompt: string
  techQuestions: QuizQuestion[]
  workStyleQuestions: QuizQuestion[]
  recruiterEmail: string
}

export const ROLES: RoleConfig[] = [
  {
    slug: 'video-editor',
    title: 'Video Editor',
    subtitle: '(Full-Time)',
    team: 'Content & Marketing',
    location: 'Coimbatore (Office)',
    type: 'Full-Time',
    datePosted: 'Jul 31, 2026',
    heroImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&q=85&auto=format&fit=crop',
    jobSummary: 'Short-form content is the fastest-growing acquisition channel for brands in 2026. We need an editor who treats every second of footage as strategic real estate — someone who understands storytelling, retention mechanics, and marketing psychology, not just which buttons to press in Premiere. The average viewer decides within 1.7 seconds whether to keep watching. Your first cut is a hypothesis. Your final cut is a result. We expect you to know the difference — and to keep testing until the numbers prove it.',
    yourRole: {
      heading: "What you'll actually own.",
      paragraphs: [
        'Own short-form performance — edit Reels & Shorts engineered to stop the scroll and convert viewers into followers.',
        'Translate raw footage into brand-aligned stories that feel native to each platform — not like ads.',
        'Study retention curves and drop-off points. Iterate on cuts, pacing, and hooks until the numbers move.',
        'Partner directly with the content strategist and marketing lead — your edits shape campaign direction.',
        'Maintain a consistent output cadence without compromising quality — reliability is non-negotiable here.'
      ]
    },
    idealCandidate: [
      'Watches content analytics like a hawk',
      'Can identify why a video underperformed in 60 seconds',
      'Treats feedback as signal, not criticism',
      'Has an eye for pacing, rhythm, and visual tension',
      'Thinks about the viewer, not just the edit',
      'Takes creative ownership and runs with a brief',
      'Shows up consistently — no hand-holding required',
      'Hungry to grow beyond where they are today'
    ],
    requirements: [
      {
        title: 'Software & Technical',
        items: [
          'Proficient in DaVinci Resolve and/or Adobe Premiere Pro',
          'Working knowledge of After Effects for motion graphics',
          'Solid color correction and audio mixing fundamentals',
          'Comfortable working with LUTs, transitions, and overlays'
        ]
      },
      {
        title: 'Skills & Portfolio',
        items: [
          'Deep understanding of short-form content mechanics',
          'Portfolio that demonstrates hook-first editing thinking',
          'Proven ability to meet tight turnaround deadlines',
          'Bonus: experience with A/B testing video variants'
        ]
      }
    ],
    whatYoullDo: [
      'Edit 3–5 short-form videos per day across platforms|Reels, Shorts, TikTok — each with platform-native pacing and hook structure.',
      'Embed captions, SFX, and motion accents that amplify emotion|Not decoration — these elements are part of the storytelling.',
      'Adhere to brand guidelines while pushing creative boundaries|The best editors work within constraints, not despite them.',
      'Maintain clean, versioned project file architecture|Speed comes from organisation. Chaos kills output quality.',
      'Sync daily with designers, strategists, and campaign leads|Your edit is one piece of a larger performance puzzle.',
      'Review performance data and refine your editing decisions weekly|If you\'re not looking at the numbers, you\'re just guessing.'
    ],
    dontApplyIf: [
      'Treat feedback as personal criticism and shut down',
      'Miss deadlines without a heads-up — ever',
      'Need constant direction to produce consistent output',
      'Rely on templates and presets as a substitute for craft',
      'Are looking for a freelance side-project or temp gig',
      'Aren\'t interested in studying what actually performs',
      'Prioritise your own aesthetic over the audience\'s experience'
    ],
    softwareOptions: [
      'Adobe Premiere Pro',
      'After Effects',
      'DaVinci Resolve',
      'Final Cut Pro',
      'CapCut',
      'Photoshop',
      'Illustrator',
      'Other'
    ],
    portfolioPrompt: 'Share your best editing project',
    techQuestions: [
      {
        id: 'q1',
        question: 'Which software is primarily used for motion graphics?',
        options: ['Adobe Premiere Pro', 'Adobe After Effects', 'Adobe Photoshop', 'Canva'],
        correct: 1,
        points: 4
      },
      {
        id: 'q2',
        question: 'Which aspect ratio is best for Instagram Reels?',
        options: ['16:9', '9:16', '1:1', '4:3'],
        correct: 1,
        points: 4
      },
      {
        id: 'q3',
        question: 'What is the main purpose of B-roll footage?',
        options: ['Increase video length', 'Support the main story visually', 'Add background music', 'Reduce file size'],
        correct: 1,
        points: 4
      },
      {
        id: 'q4',
        question: 'Which export format is most commonly used for social media?',
        options: ['MP4 (H.264)', 'MOV', 'AVI', 'GIF'],
        correct: 0,
        points: 4
      },
      {
        id: 'q5',
        question: 'What is the most important goal of the first 3 seconds of a short-form video?',
        options: ['Display the logo', 'Introduce the editor', 'Grab the viewer\'s attention', 'Show credits'],
        correct: 2,
        points: 4
      },
      {
        id: 'q6',
        question: 'Why are captions important in short-form content?',
        options: ['They reduce file size', 'They improve viewer retention and accessibility', 'They improve camera quality', 'They make exporting faster'],
        correct: 1,
        points: 4
      },
      {
        id: 'q7',
        question: 'Which editing technique removes awkward pauses while keeping the video engaging?',
        options: ['Color grading', 'Jump cuts', 'Masking', 'Tracking'],
        correct: 1,
        points: 4
      },
      {
        id: 'q8',
        question: 'Which audio issue should always be fixed before exporting?',
        options: ['Low saturation', 'Background noise', 'Frame rate', 'White balance'],
        correct: 1,
        points: 4
      },
      {
        id: 'q9',
        question: 'What is the purpose of keyframes?',
        options: ['Export videos faster', 'Animate properties over time', 'Compress videos', 'Improve internet speed'],
        correct: 1,
        points: 4
      },
      {
        id: 'q10',
        question: 'What is more important in a marketing video?',
        options: ['Fancy transitions', 'Storytelling and audience retention', 'Expensive camera footage', 'Slow-motion effects'],
        correct: 1,
        points: 4
      }
    ],
    workStyleQuestions: [
      {
        id: 'w1',
        question: 'A client requests multiple revisions. What would you do?',
        options: ['Refuse the request', 'Understand the feedback and improve the edit', 'Ignore the request', 'Deliver the same version again'],
        correct: 1,
        points: 4
      },
      {
        id: 'w2',
        question: 'You realize you cannot meet today\'s deadline. What should you do first?',
        options: ['Wait and hope for more time', 'Inform the team immediately and suggest a solution', 'Ignore the deadline', 'Submit unfinished work'],
        correct: 1,
        points: 4
      },
      {
        id: 'w3',
        question: 'You receive constructive feedback on your edit. How do you respond?',
        options: ['Defend every decision', 'Review the feedback and improve the video', 'Ignore the feedback', 'Leave the project'],
        correct: 1,
        points: 4
      },
      {
        id: 'w4',
        question: 'Your teammate is struggling with a project and asks for help. What do you do?',
        options: ['Ignore the request', 'Help if you\'re available and communicate with the team', 'Tell them to figure it out themselves', 'Report them to the manager'],
        correct: 1,
        points: 4
      },
      {
        id: 'w5',
        question: 'Which statement best describes your editing approach?',
        options: ['I edit to impress other editors.', 'I edit to help the audience understand and take action.', 'I only focus on visual effects.', 'I only follow trends.'],
        correct: 1,
        points: 4
      }
    ],
    recruiterEmail: 'hiring@evocaa.in'
  },
  {
    slug: 'graphic-designer',
    title: 'Graphic Designer',
    subtitle: '(Full-Time)',
    team: 'Creative & Design',
    location: 'Coimbatore (Office)',
    type: 'Full-Time',
    datePosted: 'Aug 03, 2026',
    heroImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1920&q=80&auto=format&fit=crop',
    jobSummary: '[Placeholder Content] Evocaa is looking for a versatile Graphic Designer to produce engaging marketing collateral, web components, layouts, and brand assets. You should have a solid foundation in typography, visual balance, color theory, and digital marketing design guidelines. This is a full-time in-office role that focuses on fast iteration and beautiful execution.',
    yourRole: {
      heading: "What you'll actually own.",
      paragraphs: [
        '[Placeholder] Drive graphic design initiatives and own the design of brand banners and website static cards.',
        '[Placeholder] Construct layout architectures for multiple landing pages and creative variants.',
        '[Placeholder] Work with campaign strategists to iterate visual ideas based on conversion testing feedback.'
      ]
    },
    idealCandidate: [
      '[Placeholder] Possesses a pixel-perfect design philosophy and is eager to explore styles',
      '[Placeholder] Responds constructively to feedback from team members and performance metrics',
      '[Placeholder] Is capable of maintaining strict visual guidelines while introducing fresh visual concepts',
      '[Placeholder] Works autonomously and manages project deliverables consistently'
    ],
    requirements: [
      {
        title: 'Design Tools & Experience',
        items: [
          '[Placeholder] Highly proficient in Figma, Adobe Photoshop, and Illustrator',
          '[Placeholder] Experienced with vector design, masking techniques, and photo manipulation',
          '[Placeholder] Solid understanding of layout hierarchy and digital typography principles'
        ]
      }
    ],
    whatYoullDo: [
      '[Placeholder] Design 2–3 high-converting static templates daily|Collaborate closely with copywriters and developers.',
      '[Placeholder] Refine design systems and shared brand kits weekly|Ensure consistency across all active campaign channels.',
      '[Placeholder] Coordinate with external printers or production teams|Verify correct resolution and specs for release.'
    ],
    dontApplyIf: [
      '[Placeholder] You cannot handle feedback or iterate rapidly',
      '[Placeholder] You prefer high-concept designs over practical, user-centric assets'
    ],
    softwareOptions: [
      'Figma',
      'Photoshop',
      'Illustrator',
      'InDesign',
      'Canva',
      'Other'
    ],
    portfolioPrompt: 'Link to Figma, Behance, or Dribbble',
    techQuestions: [
      {
        id: 'gd-q1',
        question: 'Which color space is preferred for standard web layouts and digital devices?',
        options: ['CMYK', 'RGB', 'Pantone', 'Grayscale'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-q2',
        question: 'What is the primary difference between a vector graphic and a raster image?',
        options: ['Vectors are made of math paths and scale cleanly; Rasters use pixels and degrade.', 'Rasters are larger in file size.', 'Vectors only support black and white.', 'There is no functional difference.'],
        correct: 0,
        points: 4
      },
      {
        id: 'gd-q3',
        question: 'In typography, what is kerning?',
        options: ['The vertical spacing between lines of text', 'The adjustment of space between individual characters', 'The style of a serif ornament', 'The thickness of a font style'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-q4',
        question: 'Which tool is ideal for collaborative, cloud-based product and UI design?',
        options: ['Adobe Premiere', 'Figma', 'Adobe Lightroom', 'MS Paint'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-q5',
        question: 'What is the primary goal of establishing a clear visual hierarchy?',
        options: ['Use as many colors as possible', 'Guide the viewer\'s eye to key information in order of importance', 'Fill all white space completely', 'Avoid repeating any layout elements'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-q6',
        question: 'Which file format supports true transparency and is widely used for digital icons?',
        options: ['JPEG', 'PNG', 'BMP', 'TIFF'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-q7',
        question: 'What does the term "leading" refer to in typography layout?',
        options: ['The distance between lines of text', 'The main header size', 'The thickness of card borders', 'The text alignment styling'],
        correct: 0,
        points: 4
      },
      {
        id: 'gd-q8',
        question: 'How do you describe "whitespace" or "negative space" in design layout?',
        options: ['An error in design spacing', 'The empty space around elements that gives them breathing room', 'Space reserved for future text overrides', 'The default background white canvas'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-q9',
        question: 'What is the standard resolution (DPI/PPI) for web images?',
        options: ['300 DPI', '72 PPI', '1200 DPI', '16 PPI'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-q10',
        question: 'What is the main advantage of SVGs in web development?',
        options: ['They are highly compressed binary frames.', 'They scale infinitely without loss of quality.', 'They support sound and video layers.', 'They cannot be indexed by search engines.'],
        correct: 1,
        points: 4
      }
    ],
    workStyleQuestions: [
      {
        id: 'gd-w1',
        question: '[Placeholder] Feedback indicates the CTA design is underperforming. What is your reaction?',
        options: ['Argue that the design looks perfect', 'Brainstorm 3 new CTA layouts and A/B test them', 'Ignore the feedback', 'Wait for someone to design it for you'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-w2',
        question: '[Placeholder] A copywriter sends late text updates right before a critical launch. How do you handle it?',
        options: ['Refuse to update the design', 'Incorporate the changes quickly and verify layout integrity', 'Submit the old layout', 'Complain to the coordinator'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-w3',
        question: '[Placeholder] You notice a typo in a design that was approved and is going live. What do you do?',
        options: ['Do nothing since it was approved', 'Fix it immediately and update the team', 'Blame the editor', 'Wait for a user to report it'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-w4',
        question: '[Placeholder] A designer colleague is struggling with a complex layout. You:',
        options: ['Mind your own business', 'Offer tips and walk them through visual solutions', 'Suggest they use a basic template', 'Tell the lead designer they are slow'],
        correct: 1,
        points: 4
      },
      {
        id: 'gd-w5',
        question: '[Placeholder] You have competing design tasks due at the same time. How do you prioritize?',
        options: ['Work on the easiest one first', 'Evaluate conversion/business impact with the team and order accordingly', 'Ask to drop one task', 'Procrastinate'],
        correct: 1,
        points: 4
      }
    ],
    recruiterEmail: 'hiring@evocaa.in'
  },
  {
    slug: 'client-support',
    title: 'Client Support',
    subtitle: '(Full-Time)',
    team: 'Customer Success',
    location: 'Coimbatore (Office)',
    type: 'Full-Time',
    datePosted: 'Aug 03, 2026',
    heroImage: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=1920&q=80&auto=format&fit=crop',
    jobSummary: '[Placeholder Content] Evocaa is searching for a dedicated Client Support Specialist. You will act as the first line of contact for customers, handling questions, troubleshooting software issues, managing client relations, and collecting feedback to improve the product. Excellent communication, active listening, and problem-solving skills are essential for this in-office full-time position.',
    yourRole: {
      heading: "What you'll actually own.",
      paragraphs: [
        '[Placeholder] Resolve customer inquiries efficiently across support channels including email, chat, and phone.',
        '[Placeholder] Document repeat issues and compile logs to help the technical team implement system fixes.',
        '[Placeholder] Own onboarding operations and guide clients through software setup steps.'
      ]
    },
    idealCandidate: [
      '[Placeholder] Naturally empathetic, patient, and detail-oriented',
      '[Placeholder] Communicates complex instructions clearly and concisely',
      '[Placeholder] Enjoys solving problems and helping others',
      '[Placeholder] Is proactive in identifying opportunities to improve client workflows'
    ],
    requirements: [
      {
        title: 'Communication & Tools',
        items: [
          '[Placeholder] Outstanding verbal and written communication in English',
          '[Placeholder] Familiarity with CRM systems and ticketing software (Zendesk, HubSpot, etc.)',
          '[Placeholder] Ability to multitask, prioritize, and manage time effectively'
        ]
      }
    ],
    whatYoullDo: [
      '[Placeholder] Manage 30-50 client interactions daily|Ensure high customer satisfaction scores.',
      '[Placeholder] Build client documentation and help desk FAQs weekly|Make self-service troubleshooting easier.',
      '[Placeholder] Participate in product feedback meetings|Represent client interests and highlight common pain points.'
    ],
    dontApplyIf: [
      '[Placeholder] You get frustrated easily by repetitive client questions',
      '[Placeholder] You struggle to explain technical concepts to non-technical users'
    ],
    softwareOptions: [
      'HubSpot',
      'Zendesk',
      'Intercom',
      'Slack',
      'Notion',
      'Other'
    ],
    portfolioPrompt: 'Link to a writing sample, resume project, or video intro',
    techQuestions: [
      {
        id: 'cs-q1',
        question: 'What does "First Response Time" (FRT) measure in customer support?',
        options: ['The total time taken to fully resolve a ticket', 'The time between customer submission and the first human agent reply', 'The time taken to close an account', 'The average call duration'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-q2',
        question: 'When a customer is angry about a delayed shipment, what is the best initial response?',
        options: ['Explain that it is not support\'s fault', 'Acknowledge the frustration, apologize for the delay, and provide tracking details', 'Tell them to contact the shipping company directly', 'Offer a full refund immediately without checking'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-q3',
        question: 'What is a SLA (Service Level Agreement)?',
        options: ['A code library for databases', 'A commitment between support and the client regarding target response/resolution times', 'A sales promotion policy', 'A software licensing contract'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-q4',
        question: 'How should you handle a question when you do not know the correct answer?',
        options: ['Make up an answer that sounds correct', 'Tell the client you cannot help them', 'Inform the client you are looking into it and will follow up shortly, then consult documentation/team', 'Ignore the message'],
        correct: 2,
        points: 4
      },
      {
        id: 'cs-q5',
        question: 'What is CSAT?',
        options: ['Customer Satisfaction score', 'Client Sales and Marketing tracking', 'Computer Software Assessment test', 'None of the above'],
        correct: 0,
        points: 4
      },
      {
        id: 'cs-q6',
        question: 'Which of the following is considered a best practice for writing support emails?',
        options: ['Use highly technical jargon', 'Keep paragraphs short, use formatting like bold text for key actions, and sound professional', 'Write in all capital letters to show urgency', 'Use emojis in every sentence'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-q7',
        question: 'What does CRM stand for?',
        options: ['Client Resource Model', 'Customer Relationship Management', 'Computer Routing Mechanism', 'Centralized Retail Matrix'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-q8',
        question: 'If a client reports a bug in the application, what info is most critical to request?',
        options: ['Their billing history', 'Steps to reproduce the bug, browser version, and screenshots', 'Their computer password', 'No info is needed'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-q9',
        question: 'What is active listening?',
        options: ['Listening to music while drafting replies', 'Fully focusing on, understanding, and responding thoughtfully to what the client is saying', 'Interrupting the client to provide answers faster', 'Reading emails very quickly'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-q10',
        question: 'What is the best way to handle multiple clients on live chat at the same time?',
        options: ['Focus on one client only and log off others', 'Use canned templates where appropriate, remain calm, prioritize quick tasks, and set expectations', 'Ignore chats until they close themselves', 'Send the same reply to everyone'],
        correct: 1,
        points: 4
      }
    ],
    workStyleQuestions: [
      {
        id: 'cs-w1',
        question: '[Placeholder] A client complains that a support agent was rude. You:',
        options: ['Defend your teammate blindly', 'Apologize sincerely, review the interaction objectively, and resolve the root issue', 'Argue with the customer', 'Tell the manager immediately without looking'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-w2',
        question: '[Placeholder] You realize a system outage is affecting dozens of clients. What is your action?',
        options: ['Wait for individual tickets to pile up', 'Flag it to the engineering team immediately and draft a template response for incoming chats', 'Close all support channels', 'Go on break'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-w3',
        question: '[Placeholder] A customer keeps repeating the same issue despite detailed steps. You:',
        options: ['Tell them they are being difficult', 'Simplify the explanation, try a different angle (e.g. video or screenshots), or offer a quick screen share', 'Close their ticket', 'Transfer them to someone else without note'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-w4',
        question: '[Placeholder] How do you handle work feedback from your team lead?',
        options: ['Take it personally', 'Use it to adjust your communication style and improve customer interactions', 'Ignore it', 'Request a new supervisor'],
        correct: 1,
        points: 4
      },
      {
        id: 'cs-w5',
        question: '[Placeholder] A ticket is outside your scope of expertise. You:',
        options: ['Try to solve it anyway and guess', 'Acknowledge the query, explain that you are looping in a specialist, and route it with context notes', 'Leave it unassigned', 'Close it as resolved'],
        correct: 1,
        points: 4
      }
    ],
    recruiterEmail: 'hiring@evocaa.in'
  }
]
