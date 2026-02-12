import { content } from '../content/content';
import { Container } from '../layout/Primitives';

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <Container className="site-footer-inner">
        <p>{content.footer.description}</p>
        <p>{content.footer.copyright}</p>
      </Container>
    </footer>
  );
}
