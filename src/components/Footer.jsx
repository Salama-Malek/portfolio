import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import SocialBtns from './SocialBtns';
import Button from './Button';

export default function Footer({ socialData = [] }) {
  const { t } = useTranslation();

  const navLinks = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About' },
    { to: 'project', label: 'Projects' },
    { to: 'experience', label: 'Experience' },
    { to: 'testimonial', label: 'Testimonials' },
    { to: 'contactus', label: 'Contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-slate-950 text-slate-300">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr,1fr,1fr]">
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-3 shadow-lg shadow-indigo-500/10 transition hover:border-slate-700 hover:shadow-indigo-500/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/30 via-indigo-500/40 to-purple-500/30">
                <img
                  src="/images/tech1.png"
                  alt="Salama Malek - Full Stack Developer"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="text-left">
                <span className="block text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Salama</span>
                <span className="block text-lg font-semibold text-slate-100">Malek</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              A passionate full-stack developer dedicated to building innovative and user-friendly web applications.
            </p>
            <div className="pt-2">
              <SocialBtns socialBtns={socialData} />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Quick Links</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-400">
              {navLinks.map((item) => (
                <li key={item.to}>
                  <ScrollLink
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-slate-400 transition hover:text-slate-100 hover:underline hover:underline-offset-4"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition group-hover:bg-sky-400" aria-hidden />
                    {item.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Get In Touch</p>
            <p className="text-sm leading-relaxed text-slate-400">
              Have a project in mind? Let's talk about it.
            </p>
            <Button asChild>
              <ScrollLink to="contactus" smooth={true} duration={500} offset={-80}>
                <span>Let's Talk</span>
              </ScrollLink>
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p className="leading-relaxed">{t('footer.copyright')}</p>
          <button
            onClick={scrollToTop}
            title="Back to Top"
            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-800/70 bg-slate-900/70 text-slate-300 shadow-lg shadow-slate-900/40 transition hover:border-sky-400 hover:text-sky-300 hover:shadow-slate-900/60"
            aria-label="Back to top"
          >
            <span
              className="text-lg font-semibold transition-transform duration-300 group-hover:-translate-y-1"
              aria-hidden="true"
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
