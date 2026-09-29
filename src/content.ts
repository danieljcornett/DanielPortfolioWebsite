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
  role: 'Software Engineer & Data Analyst',
  tagline:
    'Computer Science & Engineering student at the University of Iowa who builds machine learning apps and digs into data.',
  availability: 'Graduating May 2027 · Open to opportunities',
  email: 'daniel-cornett@uiowa.edu',
  resumeUrl: '',
  photo: '',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/daniel-cornett-742410299',
      icon: 'linkedin',
      handle: 'in/daniel-cornett-742410299',
    },
    { label: 'Email', href: 'mailto:daniel-cornett@uiowa.edu', icon: 'email', handle: 'daniel-cornett@uiowa.edu' },
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
  // Hobbies aren't on the résumé yet. Add a few (e.g. 'Hiking') to show an "Outside of code" group.
  interests: [],
}

/* ── Planet 2: Projects ─────────────────────────────────────────────── */

export const projects: ProjectsContent = {
  intro: 'A few things I have designed, built, and shipped.',
  items: [
    {
      title: 'Project One',
      year: '2026',
      featured: true,
      summary: 'One or two sentences on what this project does and the problem it solves.',
      highlights: [
        'A measurable result, e.g. "Cut page load time by 40%"',
        'The hardest technical problem you solved and how',
      ],
      tech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
      repoUrl: 'https://github.com/your-username/project-one',
      liveUrl: 'https://example.com',
    },
    {
      title: 'Project Two',
      year: '2025',
      summary: 'One or two sentences on what this project does and the problem it solves.',
      highlights: ['A measurable result or a notable feature'],
      tech: ['Python', 'FastAPI', 'Docker'],
      repoUrl: 'https://github.com/your-username/project-two',
    },
    {
      title: 'Project Three',
      year: '2025',
      summary: 'One or two sentences on what this project does and the problem it solves.',
      highlights: ['A measurable result or a notable feature'],
      tech: ['Go', 'gRPC', 'Redis'],
      repoUrl: 'https://github.com/your-username/project-three',
    },
    {
      title: 'Project Four',
      year: '2024',
      summary: 'One or two sentences on what this project does and the problem it solves.',
      highlights: ['A measurable result or a notable feature'],
      tech: ['Swift', 'SwiftUI'],
      liveUrl: 'https://example.com',
    },
  ],
}

/* ── Planet 3: Skills ───────────────────────────────────────────────── */

export const skills: SkillsContent = {
  intro: 'The languages, frameworks, and tools I use most.',
  groups: [
    { name: 'Languages', skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL'] },
    { name: 'Frontend', skills: ['React', 'Next.js', 'HTML & CSS', 'Three.js'] },
    { name: 'Backend', skills: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'Redis'] },
    { name: 'Tools & cloud', skills: ['Git', 'Docker', 'AWS', 'Linux', 'CI/CD'] },
    { name: 'Currently learning', skills: ['Skill one', 'Skill two'] },
  ],
}

/* ── Planet 4: Education & certifications ───────────────────────────── */

export const education: EducationContent = {
  intro: 'Where I studied and the certifications I have earned.',
  degrees: [
    {
      school: 'University Name',
      degree: 'B.S. in Computer Science',
      location: 'City, State',
      start: '2022',
      end: '2026',
      gpa: '3.x / 4.0',
      coursework: [
        'Data Structures',
        'Algorithms',
        'Operating Systems',
        'Databases',
        'Computer Networks',
        'Software Engineering',
      ],
      honors: ["Dean's List, an honors program, or a club you led"],
    },
  ],
  certifications: [
    { name: 'Certification Name', issuer: 'Issuing Organization', date: '2025', credentialUrl: 'https://example.com' },
    { name: 'Another Certification', issuer: 'Issuing Organization', date: '2024' },
  ],
}

/* ── Planet 5: Contact ──────────────────────────────────────────────── */

export const contact: ContactContent = {
  intro: 'The quickest ways to reach me.',
  heading: "Let's build something together.",
  message:
    'Hiring for a role, have a project in mind, or just want to talk shop? A short note about what you have in mind is plenty.',
  responseNote: 'I usually reply within a day or two.',
}
