import React from 'react';
import parser from 'html-react-parser';
import { useTranslation } from 'react-i18next';

export default function Modal({ modalData }) {
  const { t } = useTranslation();
  const { thumbUrl, details } = modalData;
  const { title, description, type, languages, platform, country, url } =
    details;
  return (
    <div className="px-modal">
      <div className="single-project-box">
        <div className="row align-items-start">
          <div className="col-lg-7">
            <img className="border" src={thumbUrl} alt="Project Thumbnail" />
          </div>
          <div className="col-lg-5 pt-4 pt-lg-0">
            {title && <h4>{parser(title)}</h4>}
            {description && <p>{parser(description)}</p>}
            <div className="about-content">
              <ul>
                {type && (
                  <li className="d-flex">
                    <span className="col-4 col-lg-3">{t('modal.type')}:</span>
                    <span>{type}</span>
                  </li>
                )}
                {languages && (
                  <li className="d-flex">
                    <span className="col-4 col-lg-3">{t('modal.languages')}:</span>
                    <span>{languages}</span>
                  </li>
                )}
                {platform && (
                  <li className="d-flex">
                    <span className="col-4 col-lg-3">{t('modal.platform')}:</span>
                    <span>{platform}</span>
                  </li>
                )}
                {country && (
                  <li className="d-flex">
                    <span className="col-4 col-lg-3">{t('modal.country')}:</span>
                    <span>{country}</span>
                  </li>
                )}
                {url && (
                  <li className="d-flex">
                    <span className="col-4 col-lg-3">{t('modal.url')}:</span>
                    <span>{url}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
