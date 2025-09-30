import React from 'react';
import { useTranslation } from 'react-i18next';

const DocsRoute: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="typography-prose">
      <h1>{t('docs.title')}</h1>
      <p>{t('docs.description')}</p>
    </section>
  );
};

export default DocsRoute;
