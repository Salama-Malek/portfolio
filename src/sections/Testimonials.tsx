import { content } from '../content/content';
import { Container, Section } from '../layout/Primitives';
import { Body, Caption, H2 } from '../ui/Typography';

export function Testimonials() {
  return (
    <Section id="testimonials">
      <Container>
        <Caption>{content.sections.testimonials.miniTitle}</Caption>
        <H2>{content.sections.testimonials.title}</H2>
        {content.testimonials.length === 0 ? <Body>{content.sections.testimonials.empty}</Body> : null}
      </Container>
    </Section>
  );
}
