import React from 'react';
import { useTranslation } from 'react-i18next';

const BlogRoute: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="typography-prose">
      <h1>{t('blog.title')}</h1>
      <p>{t('blog.description')}</p>
    </section>
  );
};

export default BlogRoute;
