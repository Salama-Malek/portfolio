import { content } from '../content/content';
import { Container, Section } from '../layout/Primitives';
import { Button } from '../ui/Button';
import { Body, Caption, Display } from '../ui/Typography';

export function Hero() {
  return (
    <Section id="home" className="hero-section">
      <Container>
        <div className="hero-minimal">
          <Caption className="eyebrow">{content.hero.eyebrow}</Caption>
          <Display>{content.hero.headline}</Display>
          <p className="hero-role">{content.person.role}</p>
          <Body className="hero-copy">
            {content.person.tagline} {content.person.summary}
          </Body>
          <div className="hero-meta-row" aria-label="Profile highlights">
            {content.hero.keyFacts.map((fact) => (
              <div key={fact.label} className="hero-stat-pill">
                <span className="hero-stat-value">{fact.value}</span>
                <span className="hero-stat-label">{fact.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-cta-row">
            <Button variant="gradient" href={content.hero.primaryCta.href}>
              {content.hero.primaryCta.label}
            </Button>
            <Button variant="ghost" href={content.hero.secondaryCta.href}>
              {content.hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
