import React from 'react';
import { useTranslation } from 'react-i18next';

const ExamplesRoute: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="typography-prose">
      <h1>{t('examples.title')}</h1>
      <p>{t('examples.description')}</p>
    </section>
  );
};

export default ExamplesRoute;
