import { Container, Section } from '../layout/Primitives';
import { Reveal } from '../ui/Reveal';
import { Body, H2, H4 } from '../ui/Typography';

const timeline = [
  {
    period: '2023 — Present',
    title: 'Principal Frontend Architect · SM4Tech',
    text: 'Leading product delivery across UI architecture, design systems, and performance.',
  },
  {
    period: '2021 — 2023',
    title: 'Senior Frontend Engineer',
    text: 'Built enterprise-grade interfaces with strong DX, accessibility, and analytics clarity.',
  },
  {
    period: '2018 — 2021',
    title: 'Product Designer → Frontend Engineer',
    text: 'Bridged design and code to ship cohesive experiences from wireframe to production.',
  },
];

export function Experience() {
  return (
    <Section id="experience">
      <Container>
        <H2>Experience</H2>
        <div className="timeline">
          {timeline.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 80}>
              <article className="timeline-item">
                <span className="timeline-period">{item.period}</span>
                <H4>{item.title}</H4>
                <Body>{item.text}</Body>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
