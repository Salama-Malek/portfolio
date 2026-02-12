import { useEffect, useState } from 'react';
import { content } from '../content/content';
import { Container } from '../layout/Primitives';
import { cn } from '../lib/motion';

const navItems = [
  { label: content.nav.home, href: '#home' },
  { label: content.nav.about, href: '#about' },
  { label: content.nav.portfolio, href: '#projects' },
  { label: content.nav.experience, href: '#experience' },
  { label: content.nav.testimonials, href: '#testimonials' },
  { label: content.nav.contact, href: '#contact' },
];

export function Header() {
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const sections = navItems
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
        <a href="#home" className="brand" aria-label="Go to home section">
          {content.person.name}
        </a>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
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
