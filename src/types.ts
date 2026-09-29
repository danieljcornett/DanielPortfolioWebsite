export type SectionId = 'about' | 'projects' | 'skills' | 'education' | 'contact'

export type SocialIcon = 'github' | 'linkedin' | 'email' | 'website'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
  /** Short handle shown on the Contact planet, e.g. "@your-username" */
  handle: string
}

export interface Profile {
  name: string
  initials: string
  role: string
  tagline: string
  /** Status chip on the home screen. Leave empty to hide it. */
  availability: string
  email: string
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
  year: string
  summary: string
  highlights: string[]
  tech: string[]
  repoUrl?: string
  liveUrl?: string
  /** Screenshot in /public, e.g. '/projects/project-one.png'. A placeholder shows until you add one. */
  image?: string
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

export interface Degree {
  school: string
  degree: string
  location: string
  start: string
  end: string
  gpa?: string
  coursework: string[]
  honors: string[]
}

export interface Certification {
  name: string
  issuer: string
  date: string
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
