import { content } from '../content/content';
import { Container, Grid, Section } from '../layout/Primitives';
import { Reveal } from '../ui/Reveal';
import { Body, Caption, H2, H4 } from '../ui/Typography';

export function Projects() {
  return (
    <Section id="projects">
      <Container>
        <Caption>{content.sections.portfolio.miniTitle}</Caption>
        <H2>{content.sections.portfolio.title}</H2>
        <Grid className="project-grid">
          {content.projects.map((project, index) => (
            <Reveal key={project.title} delayMs={index * 90}>
              <article className="project-card">
                <H4>{project.title}</H4>
                <Body>{project.description}</Body>
                <Body as="span" className="timeline-period">
                  {project.type}
                </Body>
                <div className="badge-row">
                  {project.technologies.map((tech) => (
                    <span className="badge" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.githubUrl ?? '#contact'} className="project-link" target="_blank" rel="noreferrer">
                  {content.sections.portfolio.viewProject}
                </a>
              </article>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
