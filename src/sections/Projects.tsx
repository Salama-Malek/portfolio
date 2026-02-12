import { Container, Grid, Section } from '../layout/Primitives';
import { Reveal } from '../ui/Reveal';
import { Body, H2, H4 } from '../ui/Typography';

const projects = [
  {
    name: 'Velocity Commerce',
    summary: 'Conversion-focused storefront with 42% faster checkout and stronger UX clarity.',
    stack: ['React', 'TypeScript', 'Design System'],
  },
  {
    name: 'Orbit SaaS Console',
    summary: 'Complex dashboard architecture redesigned for scale, readability, and speed.',
    stack: ['Vite', 'Node.js', 'Motion'],
  },
  {
    name: 'Signal Labs Site',
    summary: 'Marketing platform balancing editorial typography with dynamic interaction.',
    stack: ['React', 'SEO', 'Performance'],
  },
];

export function Projects() {
  return (
    <Section id="projects">
      <Container>
        <H2>Selected projects</H2>
        <Grid className="project-grid">
          {projects.map((project, index) => (
            <Reveal key={project.name} delayMs={index * 90}>
              <article className="project-card">
                <H4>{project.name}</H4>
                <Body>{project.summary}</Body>
                <div className="badge-row">
                  {project.stack.map((tech) => (
                    <span className="badge" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                <a href="#contact" className="project-link">
                  View project ↗
                </a>
              </article>
            </Reveal>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
