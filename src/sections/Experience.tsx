import { content } from '../content/content';
import { Container, Section } from '../layout/Primitives';
import { Reveal } from '../ui/Reveal';
import { Body, Caption, H2, H4 } from '../ui/Typography';

export function Experience() {
  return (
    <Section id="experience">
      <Container>
        <Caption>Experience</Caption>
        <H2>Professional timeline</H2>
        <div className="timeline">
          {content.experience.map((item, index) => (
            <Reveal key={`${item.company}-${item.role}`} delayMs={index * 90}>
              <article className="timeline-item">
                <span className="timeline-period">{item.duration}</span>
                <H4>
                  {item.role} · {item.company}
                </H4>
                <ul className="timeline-list">
                  {item.highlights.map((bullet) => (
                    <li key={bullet}>
                      <Body as="span">{bullet}</Body>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
