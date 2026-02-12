import { content } from '../content/content';
import { Container } from '../layout/Primitives';
import { Body } from '../ui/Typography';

export function Footer() {
  return (
    <footer className="section" id="footer">
      <Container>
        <Body>{content.sections.footer.description}</Body>
        <Body>{content.sections.footer.copyright}</Body>
      </Container>
    </footer>
  );
}
