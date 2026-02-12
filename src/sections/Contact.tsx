import { Container, Section } from '../layout/Primitives';
import { Button } from '../ui/Button';
import { Body, H2 } from '../ui/Typography';

export function Contact() {
  return (
    <Section id="contact" className="contact-section">
      <Container>
        <div className="contact-card">
          <H2>Let’s build something category-defining.</H2>
          <Body>
            If you need a senior partner for a premium web experience, I can help shape, design,
            and ship it with measurable impact.
          </Body>
          <Button variant="primary" href="mailto:hello@sm4tech.com">
            hello@sm4tech.com
          </Button>
        </div>
      </Container>
    </Section>
  );
}
