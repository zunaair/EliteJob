// js/data/companies.js — Company hiring processes

const COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    sector: 'Internet Services · AI',
    logoLetter: 'G',
    logoColor: '#fecaca',
    logoTextColor: '#b91c1c',
    summary: 'Heavy focus on Coding, System Design, and Googliness (culture fit) rounds.',
    tags: ['FAANG', 'SDE', 'SWE', 'System Design'],
    rounds: 5,
    difficulty: 'Very High',
    process: [
      {
        title: 'Resume Screening',
        desc: 'ATS and recruiter screening for relevant experience and GPA (for fresh grads). Strong emphasis on side projects and open-source.',
        tips: ['Clean resume', 'Quantify impact', 'Open-source links']
      },
      {
        title: 'Online Assessment',
        desc: 'Two coding questions on LeetCode-style algorithms and data structures. Typically 90 minutes. Auto-graded.',
        tips: ['Time complexity matters', 'Optimise after brute force', 'Handle edge cases']
      },
      {
        title: 'Technical Phone Screen',
        desc: 'One 45-minute round with a senior engineer. Focus on Big-O analysis, problem-solving approach, and communication clarity.',
        tips: ['Think aloud', 'Ask clarifying questions', 'Confirm Big-O']
      },
      {
        title: 'Onsite / Virtual Loop (4–5 Rounds)',
        desc: 'Covers: 2 Coding rounds (medium/hard), 1 System Design (L4+), 1 Behavioural (Googliness), and optionally 1 Domain-specific round.',
        tips: ['Googliness = culture alignment', 'SD: start with requirements', 'Think scalability']
      },
      {
        title: 'Hiring Committee Review',
        desc: 'All feedback is reviewed by a committee independent of interviewers. Google uses a levelling system (L3–L7). Offer depends on level match.',
        tips: ['Compensation is level-based', 'Negotiation is possible', 'HC is impartial']
      }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    sector: 'E-commerce · Cloud (AWS)',
    logoLetter: 'A',
    logoColor: '#fed7aa',
    logoTextColor: '#c2410c',
    summary: 'Famed for its 16 Leadership Principles integrated into every interview round.',
    tags: ['FAANG', 'SDE', 'LP Heavy', 'AWS'],
    rounds: 4,
    difficulty: 'High',
    process: [
      {
        title: 'Online Assessment (OA)',
        desc: 'Two DSA coding questions + Work Style Survey (LP-aligned). Time: 90 mins. Hosted on HackerRank or CodeSignal.',
        tips: ['Solve both problems', 'LP survey is scored', 'Don\'t rush the survey']
      },
      {
        title: 'Technical Phone Screen',
        desc: 'One coding round (medium difficulty) + 1–2 Leadership Principle behavioural questions. 60 minutes with an SDE.',
        tips: ['STAR method for LP', 'Use concrete examples', 'Prepare 3+ LP stories']
      },
      {
        title: 'Onsite Loop (4 Rounds, virtual)',
        desc: 'Each round includes coding OR system design AND mandatory LP questions. One interviewer is the "Bar Raiser" — an independent assessor.',
        tips: ['Every round has LP', 'Bar Raiser is toughest', 'Prepare 10+ LP stories']
      },
      {
        title: 'Hiring Decision',
        desc: 'Bar Raiser has veto power. The team needs consensus to proceed. All LP answers are reviewed holistically.',
        tips: ['Bar Raiser = culture gatekeeper', 'References may be checked', 'Offer is role+level based']
      }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    sector: 'Software · Cloud · OS',
    logoLetter: 'M',
    logoColor: '#bbf7d0',
    logoTextColor: '#15803d',
    summary: 'Balanced process — DSA, System Design, and a strong emphasis on Growth Mindset.',
    tags: ['FAANG', 'SDE', 'Azure', 'Growth Mindset'],
    rounds: 4,
    difficulty: 'High',
    process: [
      {
        title: 'Resume Screening',
        desc: 'Recruiter screen focusing on problem-solving experiences, relevant tech stack, and open-source or project work.',
        tips: ['Highlight scale', 'List measurable outcomes', 'Cover letter optional']
      },
      {
        title: 'Online Assessment',
        desc: 'Two DSA problems (Easy to Medium). Hosted on Codility or internal tools. 75 minutes.',
        tips: ['Focus on correctness first', 'Add comments', 'Optimise if time allows']
      },
      {
        title: 'Phone Screen with Hiring Manager',
        desc: 'A mix of behavioural and a light coding or design problem. 30–45 minutes. Tests communication and technical depth.',
        tips: ['Show growth mindset', 'STAR stories ready', 'Ask good questions']
      },
      {
        title: 'Onsite / Loop (3–4 Rounds)',
        desc: 'Covers Coding (1–2 rounds), System Design (senior roles), Core CS (OS, Networking), and Culture/Behavioural. Final round is with "As-Appropriate" interviewer.',
        tips: ['Core CS is important', 'Show curiosity', 'AA round = final culture check']
      }
    ]
  },
  {
    id: 'meta',
    name: 'Meta',
    sector: 'Social Media · VR · AI',
    logoLetter: 'M',
    logoColor: '#bfdbfe',
    logoTextColor: '#1d4ed8',
    summary: 'High coding bar with rapid hiring cycles. Strong culture fit around "Move Fast".',
    tags: ['FAANG', 'SWE', 'Product Sense', 'Fast Paced'],
    rounds: 4,
    difficulty: 'Very High',
    process: [
      {
        title: 'Initial Recruiter Screen',
        desc: 'Background + motivations check. 15–30 mins with a technical recruiter. High-level experience discussion.',
        tips: ['Know why Meta', 'Articulate past impact', 'Ask about team']
      },
      {
        title: 'Technical Phone Screen (1–2 rounds)',
        desc: 'Coding-focused with LeetCode medium–hard problems. Emphasis on clean, optimal solutions and communication.',
        tips: ['Optimal from the start preferred', 'Explain trade-offs', 'Test your code']
      },
      {
        title: 'Onsite Loop (4–5 Rounds)',
        desc: 'Coding (2 rounds, hard difficulty), System Design (1 round), Behavioural / Leadership (1 round), optionally Domain Expertise.',
        tips: ['SD: Meta scale = billions', 'Leadership: impact stories', 'Time-box solutions']
      },
      {
        title: 'Hiring Committee & Offer',
        desc: 'Feedback compiled and reviewed by a hiring committee. Compensation structured around IC levels (E3–E8).',
        tips: ['Negotiate stock component', 'Levels.fyi for benchmarks', 'Counter-offer is expected']
      }
    ]
  },
  {
    id: 'apple',
    name: 'Apple',
    sector: 'Hardware · Software · Services',
    logoLetter: 'A',
    logoColor: '#e5e7eb',
    logoTextColor: '#374151',
    summary: 'Domain-specific, detail-oriented process. Stealth culture and high attention to craft.',
    tags: ['FAANG', 'SWE', 'Domain Expert', 'Detail Oriented'],
    rounds: 5,
    difficulty: 'Very High',
    process: [
      {
        title: 'Recruiter Screen',
        desc: 'Short conversation about your background, interest in Apple, and the specific team. Very team-specific hiring.',
        tips: ['Research the specific team', 'Know Apple products deeply', 'Show passion for craft']
      },
      {
        title: 'Technical Phone Screen',
        desc: 'Coding or design questions depending on role (iOS dev vs backend vs ML). 45–60 minutes with an engineer.',
        tips: ['Deep dive on your stack', 'Swift/ObjC for iOS roles', 'Show attention to detail']
      },
      {
        title: 'Take-Home Project (some roles)',
        desc: 'Some teams assign a take-home coding project (1–5 days). Quality and code design are prioritised over speed.',
        tips: ['Write clean, documented code', 'Consider edge cases', 'Include tests']
      },
      {
        title: 'Onsite Loop (5–6 Rounds)',
        desc: 'Mix of technical depth (coding + domain), system design, and cultural interviews. Very team-driven — less standardised.',
        tips: ['Expect deep domain questions', 'Privacy & performance mindset', 'Show end-user empathy']
      },
      {
        title: 'Hiring Decision',
        desc: 'Decisions are largely team-led. Background check and security clearance for some divisions.',
        tips: ['Patience — Apple moves slowly', 'Headcount is limited', 'Negotiate total comp']
      }
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix',
    sector: 'Streaming · Entertainment · Tech',
    logoLetter: 'N',
    logoColor: '#fecaca',
    logoTextColor: '#dc2626',
    summary: 'Freedom & Responsibility culture. Top of market comp. Very high bar for senior engineers.',
    tags: ['Top-tier', 'Senior Focus', 'High Comp', 'Culture Bar'],
    rounds: 3,
    difficulty: 'High',
    process: [
      {
        title: 'Recruiter & Hiring Manager Screen',
        desc: 'Two initial conversations — one with a recruiter, one with the hiring manager. Focus on culture fit and strategic thinking.',
        tips: ['Know Netflix culture deck', 'Show independence & ownership', 'Discuss past impact at scale']
      },
      {
        title: 'Technical Interview (Virtual)',
        desc: '1–2 technical rounds covering system design and coding. Emphasis on architecture decisions and trade-off reasoning.',
        tips: ['Scalability first', 'Strong opinions loosely held', 'Explain WHY not just HOW']
      },
      {
        title: 'Culture & Leadership Panel',
        desc: 'Panel of cross-functional team members assessing culture fit, communication, and alignment with Netflix values.',
        tips: ['Freedom & Responsibility mindset', 'Candor is valued', 'Self-motivation stories']
      }
    ]
  }
];
