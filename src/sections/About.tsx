import { content } from '../content/content';
import { Container, Section } from '../layout/Primitives';
import { Body, Caption, H2 } from '../ui/Typography';

export function About() {
  return (
    <Section id="about">
      <Container>
        <Caption>About Me</Caption>
        <H2>Available for Full Stack Projects</H2>
        <Body>{content.person.summary}</Body>
      </Container>
    </Section>
  );
}
