import { content } from '../content/content';
import { Container, Grid, Section } from '../layout/Primitives';
import { Button } from '../ui/Button';
import { MotionSafe } from '../ui/MotionSafe';
import { Body, Caption, Display } from '../ui/Typography';

export function Hero() {
  return (
    <Section id="home" className="hero-section">
      <Container>
        <Grid className="hero-grid">
          <div>
            <Caption className="eyebrow">{content.sections.hero.eyebrow}</Caption>
            <Display>{content.person.name}</Display>
            <Body className="hero-copy">
              {content.person.shortTagline} {content.person.aboutShort}
            </Body>
            <div className="hero-cta-row">
              <Button variant="gradient" href="#projects">
                {content.sections.hero.ctaPrimary}
              </Button>
              <Button variant="magnetic" href="#contact">
                {content.sections.hero.ctaSecondary}
              </Button>
            </div>
          </div>
          <MotionSafe className="hero-visual" aria-hidden="true">
            <div className="orb orb-a" />
            <div className="orb orb-b" />
            <div className="orb orb-c" />
          </MotionSafe>
        </Grid>
      </Container>
    </Section>
  );
}
