import { content } from '../content/content';
import { Container, Section } from '../layout/Primitives';
import { Reveal } from '../ui/Reveal';
import { Body, Caption, H2, H4 } from '../ui/Typography';

export function Experience() {
  return (
    <Section id="experience">
      <Container>
        <Caption>{content.sections.experience.miniTitle}</Caption>
        <H2>{content.sections.experience.title}</H2>
        <div className="timeline">
          {content.experience.map((item, index) => (
            <Reveal key={`${item.company}-${item.role}`} delayMs={index * 80}>
              <article className="timeline-item">
                <span className="timeline-period">
                  {item.start} — {item.end}
                </span>
                <H4>
                  {item.role} · {item.company}
                </H4>
                {item.bullets.map((bullet) => (
                  <Body key={bullet}>{bullet}</Body>
                ))}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
