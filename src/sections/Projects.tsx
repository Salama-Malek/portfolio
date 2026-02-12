import { content } from '../content/content';
import { Container, Grid, Section } from '../layout/Primitives';
import { Reveal } from '../ui/Reveal';
import { Body, Caption, H2, H3 } from '../ui/Typography';

export function Projects() {
  return (
    <Section id="projects">
      <Container>
        <Caption>Featured Projects</Caption>
        <H2>Selected work with product and engineering focus.</H2>

        <Grid className="featured-projects-grid">
          {content.projects.featured.map((project, index) => (
            <Reveal key={project.title} delayMs={index * 80}>
              <article className="featured-project-card">
                <p className="project-category">{project.category}</p>
                <H3>{project.title}</H3>
                <Body>{project.description}</Body>
                <div className="badge-row">
                  {project.stack.map((tech) => (
                    <span className="badge" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.links.repo ? (
                    <a href={project.links.repo} target="_blank" rel="noreferrer" className="project-link">
                      Repository ↗
                    </a>
                  ) : (
                    <span className="project-link project-link-muted">TODO: repo link</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </Grid>

        <div className="other-projects">
          <H3>Other Projects</H3>
          <ul className="other-project-list">
            {content.projects.additional.map((project) => (
              <li key={project.title} className="other-project-item">
                <div>
                  <strong>{project.title}</strong>
                  <span>{project.category}</span>
                </div>
                <p>{project.stack.join(' · ')}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
