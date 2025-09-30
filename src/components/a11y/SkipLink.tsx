import React from 'react';
import { useTranslation } from 'react-i18next';

const SkipLink: React.FC = () => {
  const { t } = useTranslation();
  return (
    <a href="#main" className="skip-link">
      {t('a11y.skipToContent')}
    </a>
  );
};

export default SkipLink;
