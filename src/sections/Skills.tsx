import { Container, Grid, Section } from '../layout/Primitives';
import { H2 } from '../ui/Typography';

const skills = [
  'Product Strategy',
  'React + TypeScript',
  'Design Systems',
  'Performance Engineering',
  'Accessibility',
  'Animation & Micro-interactions',
  'Frontend Architecture',
  'Technical SEO',
];

export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <H2>Capabilities</H2>
        <Grid className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-chip" key={skill}>
              {skill}
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
