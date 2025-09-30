import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import TechIcon from '../utils/techIcons';

export default function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();
  const {
    title,
    subTitle,
    description,
    technologies = [],
    demoUrl,
    githubUrl,
    thumbUrl,
  } = project;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="project-modal" onClick={onClose}>
      <div
        className="project-modal-content"
        onClick={(e) => e.stopPropagation()}
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <button className="project-modal-close" onClick={onClose}>
          <Icon icon="bi:x" />
        </button>
        <div className="project-modal-img">
          <img src={thumbUrl} alt={title} />
        </div>
        <div className="project-modal-info">
          <h3 className="project-modal-title">{title}</h3>
          <p className="project-modal-subtitle">{subTitle}</p>
          <p className="project-modal-description">{description}</p>
          <div className="project-modal-tech">
            <h5>{t('portfolioShowcase.projectModal.technologiesUsed')}:</h5>
            <div className="tech-icons-container">
              {technologies.map((tech) => (
                <div className="tech-icon-item" key={tech}>
                  <TechIcon technology={tech} />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="project-modal-links">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-btn"
              >
                <Icon icon="bi:play-circle" />
                <span>{t('portfolioShowcase.projectModal.liveDemo')}</span>
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-btn-outline"
              >
                <Icon icon="bi:github" />
                <span>{t('portfolioShowcase.projectModal.sourceCode')}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
