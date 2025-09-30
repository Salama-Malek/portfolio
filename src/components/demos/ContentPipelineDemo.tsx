import React from 'react';
import { useTranslation } from 'react-i18next';

const ContentPipelineDemo: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="card" aria-label={t('projects.mdxPipeline.demoAria')}>
      <h3>{t('projects.mdxPipeline.demoTitle')}</h3>
      <ul>
        <li>{t('projects.mdxPipeline.demoItems.0')}</li>
        <li>{t('projects.mdxPipeline.demoItems.1')}</li>
        <li>{t('projects.mdxPipeline.demoItems.2')}</li>
      </ul>
    </section>
  );
};

export default ContentPipelineDemo;
