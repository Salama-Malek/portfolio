import { useEffect, useMemo, useState } from 'react';
import { contentMap } from '../content/contentMap';
import { Container } from '../layout/Primitives';
import { cn } from '../lib/motion';

const navItems = [
  { label: contentMap.nav.home, href: '#home' },
  { label: contentMap.nav.about, href: '#about' },
  { label: contentMap.nav.portfolio, href: '#projects' },
  { label: contentMap.nav.experience, href: '#experience' },
  { label: contentMap.nav.testimonials, href: '#testimonials' },
  { label: contentMap.nav.contact, href: '#contact' },
];

export function Header() {
  const [active, setActive] = useState('#home');

  const brandMark = useMemo(
    () =>
      contentMap.person.name
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    [],
  );

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
        <a href="#home" className="brand">
          <span className="brand-mark">{brandMark}</span>
          <span>{contentMap.person.name}</span>
        </a>
        <nav>
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
