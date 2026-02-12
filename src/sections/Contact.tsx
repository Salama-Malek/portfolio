import { content } from '../content/content';
import { Container, Section } from '../layout/Primitives';
import { Button } from '../ui/Button';
import { Body, Caption, H2 } from '../ui/Typography';

export function Contact() {
  return (
    <Section id="contact" className="contact-section">
      <Container>
        <div className="contact-card">
          <Caption>Contact</Caption>
          <H2>{content.contact.title}</H2>
          <Body>{content.contact.subtitle}</Body>

          <form className="contact-form" aria-label="Contact form">
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="Your email" />
            </label>
            <label>
              Message
              <textarea name="message" rows={4} placeholder="Project details" />
            </label>
            <Button variant="primary" href={`mailto:${content.contact.email}`}>
              Send via Email
            </Button>
          </form>

          <ul className="contact-methods">
            {content.contact.methods.map((method) => (
              <li key={method.label}>
                <a href={method.href} target="_blank" rel="noreferrer">
                  {method.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`tel:${content.contact.phone.replace(/\s+/g, '')}`}>{content.contact.phone}</a>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
