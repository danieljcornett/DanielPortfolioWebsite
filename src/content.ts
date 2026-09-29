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
  name: 'Your Name',
  initials: 'YN',
  role: 'Software Engineer',
  tagline: 'One sentence about what you build and who it helps.',
  location: 'City, State',
  availability: 'Open to new opportunities',
  email: 'you@example.com',
  resumeUrl: '',
  photo: '',
  socials: [
    { label: 'GitHub', href: 'https://github.com/your-username', icon: 'github', handle: '@your-username' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-username', icon: 'linkedin', handle: 'in/your-username' },
    { label: 'Email', href: 'mailto:you@example.com', icon: 'email', handle: 'you@example.com' },
  ],
}

/* ── Planet 1: About ────────────────────────────────────────────────── */

export const about: AboutContent = {
  intro: 'Who I am, how I got into software, and what I care about.',
  bio: [
    'Paragraph one: a quick introduction. Who you are, where you are based, and what you work on today.',
    'Paragraph two: your path into engineering. The class, project, or job that got you hooked, and what has kept you building since.',
    'Paragraph three: what you want to do next and the kind of team where you do your best work.',
  ],
  facts: [
    { label: 'Based in', value: 'City, State' },
    { label: 'Currently', value: 'Role at Company' },
    { label: 'Focus', value: 'Full-stack web development' },
    { label: 'Open to', value: 'Full-time roles' },
  ],
  interests: ['Interest one', 'Interest two', 'Interest three', 'Interest four'],
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
