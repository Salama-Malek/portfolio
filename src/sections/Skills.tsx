import { content } from '../content/content';
import { Container, Grid, Section } from '../layout/Primitives';
import { Caption, H2, H4 } from '../ui/Typography';

const skillGroups = [
  { title: 'Frontend', skills: content.skills.frontend },
  { title: 'Backend', skills: content.skills.backend },
  { title: 'Mobile', skills: content.skills.mobile },
  { title: 'Tools', skills: content.skills.tools },
  { title: 'Cloud', skills: content.skills.cloud },
];

export function Skills() {
  return (
    <Section id="skills">
      <Container>
        <Caption>Skills</Caption>
        <H2>Technical stack grouped by discipline</H2>
        <Grid className="skills-group-grid">
          {skillGroups.map((group) => (
            <article className="skills-group-card" key={group.title}>
              <H4>{group.title}</H4>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
