import React, { useEffect, useCallback, useId, useRef } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import TechIcon from "../utils/techIcons";
import OptimizedImage from "./OptimizedImage";

interface ProjectModalData {
  title: string;
  subTitle: string;
  description?: string;
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
  thumbUrl?: string;
}

interface ProjectModalProps {
  project: ProjectModalData;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps): React.JSX.Element {
  const dialogTitleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
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
    lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "auto";
      lastFocusedElementRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  const handleModalClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation();
    },
    [],
  );

  return (
    <div
      className="project-modal"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={dialogTitleId}
    >
      <div
        className="project-modal-content"
        onClick={handleModalClick}
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label={t("navigation.close")}
        >
          <Icon icon="bi:x" />
        </button>
        <div className="project-modal-img">
          <OptimizedImage
            src={thumbUrl}
            alt={title}
            aspectRatio={16 / 9}
            loading="eager"
          />
        </div>
        <div className="project-modal-info">
          <h3 id={dialogTitleId} className="project-modal-title">{title}</h3>
          <p className="project-modal-subtitle">{subTitle}</p>
          <p className="project-modal-description">{description}</p>
          <div className="project-modal-tech">
            <h5>{t("portfolioShowcase.projectModal.technologiesUsed")}:</h5>
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
                className="px-btn-outline"
              >
                <Icon icon="bi:play-circle" />
                <span>{t("portfolioShowcase.projectModal.liveDemo")}</span>
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
                <span>{t("portfolioShowcase.projectModal.sourceCode")}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
