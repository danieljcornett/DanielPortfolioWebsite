/**
 * Everything visitors read lives in this file.
 * Replace the placeholder text one section at a time; the layout adapts to whatever you put here.
 * (Also update the <title> and meta description in index.html so link previews match.)
 */
import type {
  AboutContent,
  ContactContent,
  EducationContent,
  Profile,
  ProjectsContent,
  SkillsContent,
} from './types'

/* ── The sun: home screen ───────────────────────────────────────────── */

export const profile: Profile = {
  name: 'Daniel Cornett',
  initials: 'DC',
  headline: 'Looking for new grad / entry-level opportunities',
  tagline:
    'Computer Science & Engineering student at the University of Iowa who builds machine learning apps and digs into data.',
  availability: 'Graduating May 2027',
  emails: [
    { label: 'School', address: 'daniel-cornett@uiowa.edu' },
    { label: 'Personal', address: 'daniel12cornett@gmail.com' },
  ],
  resumeUrl: '/Daniel_Cornett_Resume.pdf',
  photo: '/daniel-cornett.webp',
  socials: [
    { label: 'GitHub', href: 'https://github.com/danieljcornett', icon: 'github', handle: '@danieljcornett' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/daniel-cornett-742410299',
      icon: 'linkedin',
      handle: 'in/daniel-cornett-742410299',
    },
  ],
}

/* ── Planet 1: About ────────────────────────────────────────────────── */

export const about: AboutContent = {
  intro: 'A little about me, where I have worked, and what I do outside of class.',
  bio: [
    "I'm a Computer Science & Engineering student in the University of Iowa's College of Engineering, minoring in Artificial Intelligence and graduating in May 2027.",
    'I like building software that puts machine learning to work. My phishing detection system scores every link in a pasted email and shows which parts of each URL drove its prediction. I also dig into data to see what is working, like an analysis of marketing campaigns across five channels that recommended where the budget should go.',
    "Outside of class I'm an executive in the Generative AI Club's consulting branch, where I help plan hackathons and maintain the club website. I spent almost two years as a bookkeeper and IT assistant at OAT Payroll & Tax Services, and I'm an Eagle Scout.",
  ],
  facts: [
    { label: 'Studying', value: 'B.S. Computer Science & Engineering' },
    { label: 'Minor', value: 'Artificial Intelligence' },
    { label: 'Graduating', value: 'May 2027' },
    { label: 'Focus', value: 'Software engineering & data analysis' },
  ],
  experience: [
    {
      title: 'Bookkeeper and IT Assistant',
      company: 'OAT Payroll & Tax Services',
      location: 'Crystal Lake, IL',
      dates: 'Dec 2024 – Aug 2026',
      highlights: [
        'Performed bank reconciliations for small business accounts to ensure accurate financial reporting',
        'Managed and organized datasets in Excel, ensuring accuracy and consistency across large volumes of information',
        'Resolved computer, printer, and server issues to maintain day-to-day operations',
      ],
    },
  ],
  activities: [
    {
      name: 'Generative AI Club',
      role: 'Executive, Consulting Branch',
      description:
        'Plan and organize hackathons, develop event concepts, maintain and update the club website, analyze meeting data to track participation, and explore new AI tools to share with members.',
    },
    {
      name: 'Sigma Phi Epsilon Fraternity',
      role: 'Member',
      dates: 'Aug 2023 – Present',
      description:
        'Served on the Recruitment Committee, planning and organizing rush events for 50+ attendees, and on the Apparel Committee, overseeing design selection, vendor coordination, and sales.',
    },
    {
      name: 'Boy Scouts of America',
      role: 'Eagle Scout',
      dates: 'Sep 2023 – Present',
      description:
        'Led a volunteer project to build and install a stage for the McHenry County Fair, coordinating a team of 10: planned logistics, secured funding, and worked with local officials to get it approved. Earned 21+ merit badges.',
    },
  ],
  interests: ['Playing basketball', 'Watching the NFL (Bears fan)', 'Lifting weights', 'True crime documentaries'],
}

/* ── Planet 2: Projects ─────────────────────────────────────────────── */

export const projects: ProjectsContent = {
  intro: 'Machine learning and data projects I have built.',
  items: [
    {
      title: 'Phishing Website Detection System',
      featured: true,
      summary:
        'A machine learning classifier that flags phishing URLs, served through a full-stack web app that can check a single link or every link in a pasted email.',
      highlights: [
        'Trained a logistic regression URL classifier on 500K+ labeled URLs using an NLTK tokenize-and-stem pipeline with bag-of-words features, achieving 96.5% accuracy, 96.5% precision, and 87.8% recall on a held-out test set',
        'Built and deployed a full-stack web app (FastAPI backend, React/Tailwind frontend, hosted on Vercel) that scores a single URL or every link in a pasted email and shows which URL tokens drove each prediction',
        'Reduced false positives with a trusted-domain allowlist that still flags lookalike domains, and capped request sizes to protect the hosted API',
        'Used AI-assisted development (Cursor, Claude Code) to accelerate the web app build',
      ],
      tech: ['Python', 'Scikit-Learn', 'NLTK', 'FastAPI', 'React', 'Tailwind CSS', 'Vercel'],
      liveUrl: 'https://phishing-detection-system-using-mac.vercel.app/',
      repoUrl: 'https://github.com/danieljcornett/Phishing-Website-Detection-System-Using-Machine-Learning',
      image: '/projects/phishing-detection.webp',
      imageAlt:
        'The Anti-Phishing Detection app flagging a lookalike Amazon refund link as likely phishing at 85.6%, with the URL words that drove the score',
    },
    {
      title: 'Marketing Channel Performance & Budget Reallocation Analysis',
      category: 'Personal project',
      summary:
        'A data analysis of marketing campaigns across five channels to find where the budget would earn the best return.',
      highlights: [
        'Analyzed marketing campaigns across 5 channels to evaluate ROI, conversion rate, and acquisition cost using Python (Pandas, Matplotlib, Seaborn) and SQL',
        'Built channel- and segment-level comparisons across audience and location dimensions to uncover underperforming areas',
        'Recommended reallocating investments toward top-performing channels and segments, projecting a lift in overall ROI',
      ],
      tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'SQL'],
    },
  ],
}

/* ── Planet 3: Skills ───────────────────────────────────────────────── */

export const skills: SkillsContent = {
  intro: 'The languages, frameworks, and tools I use most.',
  // From the résumé's two skill lines, regrouped; Excel, Tailwind CSS, Vercel, and Cursor come from
  // the experience and project bullets.
  groups: [
    { name: 'Languages', skills: ['Python', 'SQL', 'Java', 'C++'] },
    {
      name: 'Data & machine learning',
      skills: ['Pandas', 'Scikit-Learn', 'NLTK', 'Matplotlib', 'Seaborn', 'Jupyter Notebooks', 'Excel'],
    },
    { name: 'Web & app development', skills: ['FastAPI', 'React', 'Tailwind CSS', 'JavaFX'] },
    { name: 'Tools & platforms', skills: ['GitHub', 'Vercel', 'Claude Code', 'Cursor'] },
  ],
}

/* ── Planet 4: Education & certifications ───────────────────────────── */

export const education: EducationContent = {
  intro: 'Where I study and the certifications I have earned.',
  degrees: [
    {
      school: 'University of Iowa, College of Engineering',
      degree: 'B.S. in Computer Science & Engineering',
      minor: 'Artificial Intelligence',
      location: 'Iowa City, IA',
      dates: 'Expected May 2027',
      gpa: '2.8',
      coursework: [
        { code: 'CS 3330', name: 'Algorithms' },
        { code: 'ECE 5995', name: 'GAIT: Generative AI Tools' },
        { code: 'CS 3820', name: 'Programming Language Concepts' },
        { code: 'CS 2230', name: 'Computer Science II: Data Structures' },
        { code: 'ENGR 3110', name: 'Intro to AI and Machine Learning' },
      ],
      currentCoursework: [
        { code: 'ECE 5845', name: 'Modern Databases' },
        { code: 'ECE 5200', name: 'Machine Learning' },
      ],
      // Add honors (e.g. "Dean's List, Fall 2025") and they show up as bullets.
      honors: [],
    },
  ],
  certifications: [
    {
      name: 'Python and Data Certification',
      description: 'Professional-level data analysis using Python and Jupyter Notebooks',
    },
    {
      name: 'AI Professional Skills Certification',
      description: 'Practical knowledge of AI, LLMs, and responsible use in professional settings',
    },
    {
      name: 'Intercultural Skills Certification',
      description: 'Effective communication and collaboration with diverse teams',
    },
  ],
}

/* ── Planet 5: Contact ──────────────────────────────────────────────── */

export const contact: ContactContent = {
  intro: 'The quickest ways to reach me.',
  heading: "Let's build something together.",
  message:
    'Hiring for a new grad or entry-level role, or want to talk about a project? Email me at either address below, or connect on LinkedIn.',
  responseNote: 'I usually reply within a day or two.',
}
