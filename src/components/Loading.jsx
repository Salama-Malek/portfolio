import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="loading-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">{t('loading.aria')}</span>
              </div>
            </div>
            <h4 className="mt-3">{t('loading.title')}</h4>
            <p>{t('loading.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
