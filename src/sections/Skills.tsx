import { content } from '../content/content';
import { Container, Grid, Section } from '../layout/Primitives';
import { H2 } from '../ui/Typography';

const skills = [
  ...content.skills.frontend,
  ...content.skills.backend,
  ...content.skills.mobile,
  ...content.skills.db,
  ...content.skills.tools,
  ...content.skills.cloudAndSecurity,
];

export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <H2>{content.nav.portfolio} Skills</H2>
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
