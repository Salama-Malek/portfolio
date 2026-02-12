import { content } from '../content/content';
import { Container, Section } from '../layout/Primitives';
import { Button } from '../ui/Button';
import { Body, Caption, H2 } from '../ui/Typography';

export function Contact() {
  return (
    <Section id="contact" className="contact-section">
      <Container>
        <div className="contact-card">
          <Caption>{content.sections.contact.miniTitle}</Caption>
          <H2>{content.sections.contact.title}</H2>
          <Body>{content.sections.contact.subtitle}</Body>
          <div className="hero-cta-row">
            <Button variant="primary" href={`mailto:${content.contact.emails[0]}`}>
              {content.contact.emails[0]}
            </Button>
            <Button variant="ghost" href={`tel:${content.contact.phone.replace(/\s+/g, '')}`}>
              {content.contact.phone}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
