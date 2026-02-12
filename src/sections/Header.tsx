import { useEffect, useMemo, useState } from 'react';
import { content } from '../content/content';
import { Container } from '../layout/Primitives';
import { cn } from '../lib/motion';

export function Header() {
  const [active, setActive] = useState('#home');

  const brandMark = useMemo(
    () =>
      content.person.name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    [],
  );

  useEffect(() => {
    const sections = content.navigation
      .map((item) => document.querySelector(item.href))
      .filter((node): node is Element => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <Container className="header-inner">
        <a href="#home" className="brand" aria-label="Go to top">
          <span className="brand-mark">{brandMark}</span>
          <span>{content.person.name}</span>
        </a>
        <nav aria-label="Primary">
          <ul className="nav-list">
            {content.navigation.map((item) => (
              <li key={item.href}>
                <a className={cn('nav-link', active === item.href && 'is-active')} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
