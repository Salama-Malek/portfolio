import React from 'react';
import { useTranslation } from 'react-i18next';
import { backgroundLabels, type BackgroundId } from '../../ui/backgrounds';
import { useBackground } from '../../ui/backgrounds/background-provider';

const BackgroundSelect: React.FC = () => {
  const { background, setBackground, reducedMotion } = useBackground();
  const { t } = useTranslation();

  return (
    <label className="language-menu" aria-label={t('backgrounds.label')}>
      <span className="sr-only">{t('backgrounds.label')}</span>
      <select
        value={background}
        onChange={(event) => setBackground(event.target.value as BackgroundId)}
        className="language-menu__button"
        disabled={reducedMotion}
      >
        {(Object.keys(backgroundLabels) as BackgroundId[]).map((id) => (
          <option value={id} key={id}>
            {t(backgroundLabels[id])}
          </option>
        ))}
      </select>
    </label>
  );
};

export default BackgroundSelect;
