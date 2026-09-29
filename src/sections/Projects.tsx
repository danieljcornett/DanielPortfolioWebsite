import { ArrowUpRight } from 'lucide-react'
import { projects } from '../content'
import { GithubIcon } from '../ui/icons'
import { ImagePlaceholder } from '../ui/ImagePlaceholder'
import styles from './sections.module.css'

export function Projects() {
  return (
    <ul className={styles.projects}>
      {projects.items.map((project) => (
        <li key={project.title} className={styles.project} data-featured={project.featured ?? false}>
          <div className={styles.projectMedia}>
            {project.image ? (
              <img className={styles.shot} src={project.image} alt={`Screenshot of ${project.title}`} loading="lazy" />
            ) : (
              <ImagePlaceholder label="Screenshot" />
            )}
          </div>

          <div className={styles.projectBody}>
            <p className={styles.meta}>
              <span>{project.year}</span>
              {project.featured && <span className={styles.badge}>Featured</span>}
            </p>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.summary}>{project.summary}</p>

            {project.highlights.length > 0 && (
              <ul className={styles.bullets}>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}

            <ul className={styles.tags} aria-label="Built with">
              {project.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>

            {(project.repoUrl || project.liveUrl) && (
              <div className={styles.links}>
                {project.repoUrl && (
                  <a className="button button-small" href={project.repoUrl} target="_blank" rel="noreferrer">
                    <GithubIcon width={16} height={16} />
                    Code
                    <span className="sr-only">for {project.title} (opens in a new tab)</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a className="button button-small button-accent" href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live demo
                    <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only">of {project.title} (opens in a new tab)</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
