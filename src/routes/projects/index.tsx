import React, { Suspense, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { caseStudies } from '../../content/case-studies';
import MdxRenderer from '../../components/mdx/MdxRenderer';

const ProjectsRoute: React.FC = () => {
  const { t } = useTranslation();
  const [activeSlug, setActiveSlug] = useState(caseStudies[0]?.slug ?? '');

  const active = useMemo(() => caseStudies.find((study) => study.slug === activeSlug) ?? caseStudies[0], [
    activeSlug,
  ]);

  const Demo = useMemo(() => (active ? React.lazy(active.demo) : null), [active]);

  return (
    <section className="case-study">
      <header>
        <h1>{t('projects.title')}</h1>
        <p>{t('projects.subtitle')}</p>
      </header>
      <nav aria-label={t('projects.nav')} className="filter-row">
        {caseStudies.map((study) => (
          <button
            key={study.slug}
            type="button"
            onClick={() => setActiveSlug(study.slug)}
            aria-pressed={active?.slug === study.slug}
          >
            {t(study.titleKey)}
          </button>
        ))}
      </nav>
      {active && (
        <article>
          <section className="case-study__section">
            <h2>{t(active.titleKey)}</h2>
            <p>{t(active.summaryKey)}</p>
          </section>
          <section className="case-study__section">
            <MdxRenderer content={t(active.problemKey)} />
          </section>
          <section className="case-study__section">
            <MdxRenderer content={t(active.approachKey)} />
          </section>
          <section className="case-study__section case-study__metrics">
            {active.metrics.map((metric) => (
              <div className="metric" key={metric.labelKey}>
                <div className="metric__label">{t(metric.labelKey)}</div>
                <div className="metric__value">{t(metric.valueKey)}</div>
              </div>
            ))}
          </section>
          <section className="case-study__section">
            <MdxRenderer content={t(active.codeKey)} />
          </section>
          {Demo && (
            <section className="case-study__section">
              <Suspense fallback={<p>{t('projects.demo.loading')}</p>}>
                <Demo />
              </Suspense>
            </section>
          )}
        </article>
      )}
    </section>
  );
};

export default ProjectsRoute;
