import { skills } from '../content'
import styles from './sections.module.css'

export function Skills() {
  return (
    <div className={styles.skillGroups}>
      {skills.groups.map((group, i) => (
        <section key={group.name} className={styles.skillGroup} aria-labelledby={`skill-group-${i}`}>
          <h3 id={`skill-group-${i}`} className={styles.label}>
            {group.name}
          </h3>
          <ul className={styles.chips}>
            {group.skills.map((skill) => (
              <li key={skill} className={styles.chip}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
