import { contentMap } from '../content/contentMap';
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
            <Caption className="eyebrow">{contentMap.sections.hero.eyebrow}</Caption>
            <Display>{contentMap.person.name}</Display>
            <p className="hero-role">{contentMap.person.title}</p>
            <Body className="hero-copy">
              {contentMap.person.shortTagline} {contentMap.person.aboutShort}
            </Body>
            <div className="hero-meta-row" aria-label="Portfolio quick stats">
              {contentMap.stats.map((stat) => (
                <div key={stat.label} className="hero-stat-pill">
                  <span className="hero-stat-value">{stat.value}</span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="hero-cta-row">
              <Button variant="gradient" href="#projects">
                {contentMap.sections.hero.ctaPrimary}
              </Button>
              <Button variant="magnetic" href="#contact">
                {contentMap.sections.hero.ctaSecondary}
              </Button>
            </div>
          </div>
          <MotionSafe className="hero-visual" aria-hidden="true">
            <div className="hero-panel-grid">
              <div className="hero-panel">
                <span className="hero-panel-label">Focus</span>
                <p>{contentMap.person.title}</p>
              </div>
              <div className="hero-panel">
                <span className="hero-panel-label">Primary stack</span>
                <p>{contentMap.skills.frontend.slice(0, 3).join(' · ')}</p>
              </div>
              <div className="hero-panel">
                <span className="hero-panel-label">Availability</span>
                <p>{contentMap.sections.about.title}</p>
              </div>
            </div>
            <div className="orb orb-a" />
            <div className="orb orb-b" />
            <div className="orb orb-c" />
          </MotionSafe>
        </Grid>
      </Container>
    </Section>
  );
}
