import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Icon } from '@iconify/react';
import SocialBtns from './SocialBtns';
import Particles from './Particles';
import Button from './Button';
import Card from './Card';

export default function Hero({ data = {}, socialData = [] }) {
  const {
    name,
    heading,
    typingText,
    description,
    btnText,
    btnUrl,
    cvUrl,
    imgUrl,
  } = data;

  if (!data || !name || !heading) {
    return null;
  }

  return (
    <section id="home" className="relative isolate overflow-hidden bg-slate-950">
      <div className="absolute inset-0 -z-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_theme(colors.indigo.500)/15,_transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <Particles />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-24 lg:flex-row lg:items-center lg:gap-20 lg:py-32">
        <div className="max-w-2xl space-y-8">
          <p className="text-xs font-semibold uppercase tracking-[0.6em] text-sky-400" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
            {name}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-slate-50 sm:text-5xl" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
            {heading}
          </h1>
          {typingText && (
            <div className="relative" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
              <span className="absolute -left-6 top-1/2 hidden h-12 w-12 -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-500/20 to-indigo-500/30 blur-lg lg:block" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-sky-300 sm:text-xl">
                <TypeAnimation sequence={typingText || []} speed={0} repeat={Infinity} />
              </h2>
            </div>
          )}
          {description && (
            <p className="max-w-xl text-base leading-relaxed text-slate-400" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="500">
            {btnUrl && btnText && (
              <Button asChild size="lg">
                <a href={btnUrl}>
                  {btnText}
                </a>
              </Button>
            )}
            {cvUrl && (
              <Button asChild variant="secondary" size="lg">
                <a href={cvUrl} download className="group">
                  <Icon icon="bi:download" className="text-lg transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span>Download CV</span>
                </a>
              </Button>
            )}
          </div>

          <div className="pt-4" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="600">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Connect</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <SocialBtns socialBtns={socialData} />
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:ml-auto lg:max-w-xl" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="500">
          <div
            className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-sky-500/20 via-indigo-500/10 to-purple-500/20 blur-3xl"
            aria-hidden="true"
          />
          <Card className="p-0" padding="none">
            <div className="relative overflow-hidden rounded-[calc(theme(borderRadius.3xl)-0.5rem)]">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" aria-hidden="true" />
              <img
                src={imgUrl}
                alt={name}
                className="relative z-10 h-full w-full object-cover"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
