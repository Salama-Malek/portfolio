import { content } from '../content/content';
import { Container, Grid, Section } from '../layout/Primitives';
import { Body, Caption, H2 } from '../ui/Typography';

export function About() {
  return (
    <Section id="about">
      <Container>
        <Caption>{content.sections.about.miniTitle}</Caption>
        <H2>{content.sections.about.title}</H2>
        <Body>
          {content.person.aboutShort} {content.person.aboutLong}
        </Body>
        <Grid className="skills-grid" style={{ marginTop: '1.5rem' }}>
          {content.stats.map((stat) => (
            <div className="skill-chip" key={stat.label}>
              {stat.label}: {stat.value}
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
