import React, { useCallback } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import TechIcon from "../utils/techIcons";
import OptimizedImage from "./OptimizedImage";

interface ProjectCardData {
  thumbUrl?: string;
  title: string;
  subTitle: string;
  category: string;
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
  onClick?: () => void;
}

export default function ProjectCard({
  project,
  onClick,
}: ProjectCardProps): JSX.Element {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const {
    thumbUrl,
    title,
    subTitle,
    category,
    technologies = [],
    demoUrl,
    githubUrl,
  } = project;

  const handleDemoClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      if (demoUrl) {
        window.open(demoUrl, "_blank", "noopener,noreferrer");
      }
    },
    [demoUrl],
  );

  const handleGithubClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.stopPropagation();
      if (githubUrl) {
        window.open(githubUrl, "_blank", "noopener,noreferrer");
      }
    },
    [githubUrl],
  );

  const handleDetailsClick = useCallback((): void => {
    onClick?.();
  }, [onClick]);

  return (
    <article
      className="project-card"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="project-card-img">
        <OptimizedImage
          src={thumbUrl}
          alt={title}
          aspectRatio={16 / 9}
          loading="lazy"
        />
        <div className="project-card-overlay">
          <div className="overlay-content">
            {demoUrl && (
              <button
                type="button"
                className="overlay-btn"
                onClick={handleDemoClick}
                title={t("portfolioShowcase.projectModal.liveDemo")}
              >
                <Icon icon="bi:play-circle" />
              </button>
            )}
            {githubUrl && (
              <button
                type="button"
                className="overlay-btn"
                onClick={handleGithubClick}
                title={t("portfolioShowcase.projectModal.sourceCode")}
              >
                <Icon icon="bi:github" />
              </button>
            )}
          </div>
        </div>
        <div className="project-card-category">{category}</div>
      </div>

      <div className="project-card-body">
        <div className="project-card-header">
          <h5 className="project-card-title">{title}</h5>
          <div className="project-card-rating">
            <Icon icon="bi:star-fill" />
            <Icon icon="bi:star-fill" />
            <Icon icon="bi:star-fill" />
            <Icon icon="bi:star-fill" />
            <Icon icon="bi:star" />
          </div>
        </div>

        <p className="project-card-subtitle">{subTitle}</p>

        <div className="project-card-tech">
          {technologies.slice(0, 4).map((tech) => (
            <div className="tech-icon-wrapper" key={tech} title={tech}>
              <TechIcon technology={tech} />
            </div>
          ))}
          {technologies.length > 4 && (
            <div
              className="tech-icon-wrapper more"
              title={t("portfolioShowcase.projectCard.additionalTech", {
                count: technologies.length - 4,
              })}
            >
              +{technologies.length - 4}
            </div>
          )}
        </div>

        <div className="project-card-actions">
          <button
            type="button"
            className="project-card-btn"
            onClick={handleDetailsClick}
          >
            <span>{t("portfolioShowcase.projectCard.details")}</span>
            <Icon icon={isRTL ? "bi:arrow-left" : "bi:arrow-right"} />
          </button>
          {demoUrl && (
            <button
              type="button"
              className="project-card-demo"
              onClick={handleDemoClick}
            >
              <Icon icon="bi:box-arrow-up-right" />
              <span>{t("portfolioShowcase.projectCard.liveDemo")}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
