import React, { useState, useMemo, useCallback } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ServiceModal from "./ServiceModal";
import Ratings from "./Ratings";
import TechIcon from "../utils/techIcons";
import OptimizedImage from "./OptimizedImage";
import type { Certificate } from "../types/common";

interface Project {
  id?: string;
  thumbUrl?: string;
  title: string;
  subTitle: string;
  category: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  description?: string;
}

interface Service {
  imgUrl?: string;
  title: string;
  subTitle: string;
  icon: string;
  ratings?: number;
  features?: string[];
  description?: string;
  category?: string;
  deliveryTime?: string;
}

interface Tab {
  id: string;
  label: string;
  icon: string;
  count: number;
}

interface TechStackItem {
  name: string;
  level: number;
  description?: string;
}

interface SectionHeadingData {
  miniTitle?: string;
  title?: string;
}

interface PortfolioShowcaseData {
  sectionHeading?: SectionHeadingData;
  projects?: { allProjects?: Project[] };
  services?: { allService?: Service[] };
  certificates?: Certificate[];
  techStack?: any[];
}

interface PortfolioShowcaseProps {
  data?: PortfolioShowcaseData;
}

export default function PortfolioShowcase({
  data = {},
}: PortfolioShowcaseProps): JSX.Element {
  const { t } = useTranslation();
  const {
    sectionHeading = {},
    projects = {},
    services = {},
    certificates = [],
    techStack = [],
  } = data;

  const [activeTab, setActiveTab] = useState<string>("projects" as string);
  const [modalData, setModalData] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const tabs: Tab[] = useMemo(
    () => [
      {
        id: "projects",
        label: t("portfolioShowcase.tabs.projects"),
        icon: "bi:code-slash",
        count: projects.allProjects?.length || 0,
      },
      {
        id: "services",
        label: t("portfolioShowcase.tabs.services"),
        icon: "bi:gear",
        count: services.allService?.length || 0,
      },
      {
        id: "certificates",
        label: t("portfolioShowcase.tabs.certificates"),
        icon: "bi:award",
        count: certificates.length,
      },
      {
        id: "techstack",
        label: t("portfolioShowcase.tabs.techStack"),
        icon: "bi:stack",
        count: techStack.length,
      },
    ],
    [
      t,
      projects.allProjects?.length,
      services.allService?.length,
      certificates.length,
      techStack.length,
    ],
  );

  const handleServiceClick = useCallback((service: Service): void => {
    setSelectedService(service);
  }, []);

  const handleCertificateDownload = useCallback(
    (cert: Partial<Certificate> = {}): void => {
      const url = (cert.downloadUrl || cert.image) as string;
      if (!url) return;

      const link = document.createElement("a");
      link.href = url;
      link.download =
        (cert.title && `${cert.title.replace(/[^a-z0-9]/gi, "_")}.jpg`) ||
        "certificate.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [],
  );

  const closeModal = useCallback((): void => {
    setSelectedService(null);
  }, []);

  const renderProjects = useCallback((): JSX.Element => {
    if (!projects.allProjects || projects.allProjects.length === 0) {
      return (
        <div className="empty-state">
          <Icon icon="bi:folder-x" className="empty-icon" />
          <p>{t("portfolioShowcase.emptyStates.projects")}</p>
        </div>
      );
    }

    return (
      <div className="project-grid">
        {projects.allProjects.map((project, index) => (
          <ProjectCard
            key={project.id || index}
            project={project}
            onClick={() => setModalData(project)}
          />
        ))}
      </div>
    );
  }, [projects.allProjects, t]);

  const renderCertificates = useCallback((): JSX.Element => {
    if (!certificates || certificates.length === 0) {
      return (
        <div className="empty-state">
          <Icon icon="bi:award" className="empty-icon" />
          <p>{t("portfolioShowcase.emptyStates.certificates")}</p>
        </div>
      );
    }

    return (
      <div className="certificates-grid">
        {certificates.map((cert, index) => (
          <div key={cert.id ?? (cert as { credentialId?: string }).credentialId ?? `cert-${index}`} className="certificate-card">
            <div className="certificate-image">
              <OptimizedImage
                src={cert.image}
                alt={cert.title}
                aspectRatio={16 / 10}
                loading="lazy"
              />
              <div className="certificate-overlay" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                <a
                  href={(cert.credentialUrl ?? (cert as { url?: string }).url) ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-icon"
                  onClick={(e) => e.stopPropagation()}
                  title={t("portfolioShowcase.serviceModal.viewDetails")}
                >
                  <Icon icon="bi:box-arrow-up-right" />
                </a>
                <button
                  type="button"
                  className="certificate-overlay-btn view-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCertificateDownload(cert);
                  }}
                  aria-label={t("portfolioShowcase.serviceModal.downloadPortfolio")}
                  title={t("portfolioShowcase.serviceModal.downloadPortfolio")}
                >
                  <Icon icon="bi:download" />
                </button>
              </div>
            </div>
            <div className="certificate-content">
              <h5 className="certificate-title">{cert.title}</h5>
              {cert.issuer && (
                <p className="certificate-issuer">{cert.issuer}</p>
              )}
              {cert.date && (
                <p className="certificate-date">{cert.date}</p>
              )}
              {(cert as { credentialId?: string }).credentialId && (
                <p className="certificate-id">
                  {(cert as { credentialId?: string }).credentialId}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }, [certificates, t, handleCertificateDownload]);

  const renderTechStack = useCallback((): JSX.Element => {
    const items = techStack as TechStackItem[];
    if (!items || items.length === 0) {
      return (
        <div className="empty-state">
          <Icon icon="bi:stack" className="empty-icon" />
          <p>{t("portfolioShowcase.emptyStates.techStack")}</p>
        </div>
      );
    }

    return (
      <div className="tech-stack-grid">
        {items.map((item, index) => (
          <div key={item.name + index} className="tech-item">
            <div className="tech-icon">
              <TechIcon technology={item.name} />
            </div>
            <div className="tech-content">
              <h5 className="tech-name">{item.name}</h5>
              <div className="tech-level">
                <div className="tech-progress">
                  <div
                    className="tech-progress-bar"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
                <span className="tech-percentage">{item.level}%</span>
              </div>
              {item.description && (
                <p className="tech-description">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }, [techStack, t]);

  const renderServices = useCallback((): JSX.Element => {
    if (!services.allService || services.allService.length === 0) {
      return (
        <div className="empty-state">
          <Icon icon="bi:gear" className="empty-icon" />
          <p>{t("portfolioShowcase.emptyStates.services")}</p>
        </div>
      );
    }

    return (
      <div className="services-grid">
        {services.allService.map((item, index) => (
          <article
            key={index}
            className="service-card"
            onClick={() => handleServiceClick(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleServiceClick(item);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`${item.title} – ${t("portfolioShowcase.serviceModal.viewDetails")}`}
          >
            <div className="service-media">
              <OptimizedImage
                src={item.imgUrl}
                alt={item.title}
                aspectRatio={16 / 10}
                loading="lazy"
              />
              <div className="service-overlay">
                <div className="service-overlay-content">
                  <Icon icon="bi:arrow-right-circle" className="service-overlay-icon" />
                  <span className="service-overlay-label">
                    {t("portfolioShowcase.serviceModal.viewDetails")}
                  </span>
                </div>
              </div>
            </div>

            <div className="service-content">
              <div className="service-header">
                <div className="service-icon">
                  <Icon icon={item.icon} />
                </div>
                <div className="service-rating">
                  <Ratings rating={item.ratings || 0} />
                </div>
              </div>
              <h3 className="service-title">{item.title}</h3>
              <p className="service-description">{item.subTitle}</p>
              {item.features && item.features.length > 0 && (
                <ul className="service-features" aria-label="Key features">
                  {item.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="service-feature-item">
                      <Icon icon="bi:check-circle-fill" className="service-feature-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    );
  }, [services.allService, t, handleServiceClick]);

  return (
    <section className="portfolio-section section portfolio-showcase-section" id="project">
      <div className="container">
        <SectionHeading {...sectionHeading} />

        <div className="showcase-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              aria-pressed={activeTab === tab.id}
              aria-label={`${tab.label} (${tab.count})`}
            >
              <Icon icon={tab.icon} className="tab-icon" />
              <span className="tab-label">{tab.label}</span>
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "projects" && renderProjects()}
          {activeTab === "services" && renderServices()}
          {activeTab === "certificates" && renderCertificates()}
          {activeTab === "techstack" && renderTechStack()}
        </div>

        {modalData && (
          <ProjectModal
            project={modalData}
            onClose={() => setModalData(null)}
          />
        )}

        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={closeModal}
          />
        )}
      </div>
    </section>
  );
}
