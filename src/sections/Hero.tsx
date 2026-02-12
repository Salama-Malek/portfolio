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
            <Caption className="eyebrow">Principal Frontend Engineer · Product Designer</Caption>
            <Display>
              I craft premium digital products where code, motion, and brand feel inseparable.
            </Display>
            <Body className="hero-copy">
              I design and engineer high-performance experiences with a typography-first aesthetic,
              purpose-driven animation, and scalable React architecture.
            </Body>
            <div className="hero-cta-row">
              <Button variant="gradient" href="#projects">
                Explore projects
              </Button>
              <Button variant="magnetic" href="#contact">
                Book a strategy call
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
