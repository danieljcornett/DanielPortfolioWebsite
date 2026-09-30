export type SectionId = 'about' | 'projects' | 'skills' | 'education' | 'contact'

export type SocialIcon = 'github' | 'linkedin' | 'website'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
  /** Short handle shown on the Contact planet, e.g. "@your-username" */
  handle: string
}

export interface EmailAddress {
  /** Shown above the address, e.g. "School" or "Personal" */
  label: string
  address: string
}

export interface Profile {
  name: string
  initials: string
  /** The highlighted line under your name on the home screen */
  headline: string
  tagline: string
  /** Status chip on the home screen. Leave empty to hide it. */
  availability: string
  /** Listed on the Contact planet. The first one is also the home screen's mail button. */
  emails: EmailAddress[]
  /** Put the file in /public and point at it, e.g. '/resume.pdf'. Leave empty to hide the button. */
  resumeUrl: string
  /** Put the file in /public and point at it, e.g. '/me.jpg'. Leave empty to show a placeholder. */
  photo: string
  socials: SocialLink[]
}

export interface Fact {
  label: string
  value: string
}

export interface Job {
  title: string
  company: string
  location?: string
  /** Free text, e.g. "Dec 2024 – Aug 2026" */
  dates: string
  highlights: string[]
}

export interface Activity {
  name: string
  role: string
  /** Free text, e.g. "Aug 2023 – Present". Optional. */
  dates?: string
  description: string
}

export interface AboutContent {
  intro: string
  bio: string[]
  facts: Fact[]
  experience: Job[]
  activities: Activity[]
  /** Hobbies shown as chips under "Outside of code". Leave empty to hide the group. */
  interests: string[]
}

export interface Project {
  title: string
  /** Optional, e.g. "2026" */
  year?: string
  /** Optional label shown next to the year, e.g. "Personal project" or "Hackathon" */
  category?: string
  summary: string
  highlights: string[]
  tech: string[]
  repoUrl?: string
  liveUrl?: string
  /** Screenshot in /public, e.g. '/projects/project-one.png'. Leave it out for a text-only card. */
  image?: string
  /** What the screenshot shows, for screen readers. Defaults to "Screenshot of <title>". */
  imageAlt?: string
  featured?: boolean
}

export interface ProjectsContent {
  intro: string
  items: Project[]
}

export interface SkillGroup {
  name: string
  skills: string[]
}

export interface SkillsContent {
  intro: string
  groups: SkillGroup[]
}

export interface Course {
  /** e.g. "CS 3330" */
  code: string
  name: string
}

export interface Degree {
  school: string
  degree: string
  /** Optional, e.g. "Artificial Intelligence" */
  minor?: string
  location: string
  /** Free text, e.g. "2023 – 2027" or "Expected May 2027" */
  dates: string
  gpa?: string
  /** Completed courses worth highlighting. Leave empty to hide the group. */
  coursework: Course[]
  /** Courses in progress this term. Leave empty to hide the group. */
  currentCoursework: Course[]
  honors: string[]
}

export interface Certification {
  name: string
  /** One line on what it covers */
  description?: string
  issuer?: string
  date?: string
  credentialUrl?: string
}

export interface EducationContent {
  intro: string
  degrees: Degree[]
  certifications: Certification[]
}

export interface ContactContent {
  intro: string
  heading: string
  message: string
  responseNote: string
}
