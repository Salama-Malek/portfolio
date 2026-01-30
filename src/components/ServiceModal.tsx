import React, { useEffect, useCallback, ReactNode } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import OptimizedImage from "./OptimizedImage";
import Ratings from "./Ratings";

export interface ServiceModalData {
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

interface ServiceModalProps {
  service: ServiceModalData;
  onClose: () => void;
}

export default function ServiceModal({
  service,
  onClose,
}: ServiceModalProps): ReactNode {
  const { t } = useTranslation();
  const {
    imgUrl,
    title,
    subTitle,
    icon,
    ratings = 0,
    features = [],
    description,
    category,
    deliveryTime,
  } = service;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
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
      className="service-modal"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="service-modal-content"
        onClick={handleModalClick}
        data-aos="fade-up"
        data-aos-duration="400"
      >
        <button
          type="button"
          className="service-modal-close"
          onClick={onClose}
          aria-label={t("navigation.close")}
        >
          <Icon icon="bi:x" />
        </button>

        <div className="service-modal-media">
          <OptimizedImage
            src={imgUrl}
            alt={title}
            aspectRatio={16 / 10}
            loading="eager"
          />
          <div className="service-modal-icon-wrap">
            <div className="service-modal-icon">
              <Icon icon={icon} />
            </div>
          </div>
        </div>

        <div className="service-modal-info">
          <h2 id="service-modal-title" className="service-modal-title">
            {title}
          </h2>
          <p className="service-modal-subtitle">{subTitle}</p>

          <div className="service-modal-meta">
            {category && (
              <div className="service-modal-meta-item">
                <span className="service-modal-meta-label">
                  {t("portfolioShowcase.serviceModal.category")}
                </span>
                <span className="service-modal-meta-value">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </div>
            )}
            <div className="service-modal-meta-item">
              <span className="service-modal-meta-label">
                {t("portfolioShowcase.serviceModal.rating")}
              </span>
              <span className="service-modal-meta-value service-modal-rating">
                <Ratings rating={ratings} />
                <span className="service-modal-rating-text">
                  {t("portfolioShowcase.serviceModal.ratingValue", {
                    rating: ratings,
                  })}
                </span>
              </span>
            </div>
            <div className="service-modal-meta-item">
              <span className="service-modal-meta-label">
                {t("portfolioShowcase.serviceModal.delivery")}
              </span>
              <span className="service-modal-meta-value">
                {deliveryTime ??
                  t("portfolioShowcase.serviceModal.defaultDelivery")}
              </span>
            </div>
          </div>

          {description && (
            <div className="service-modal-description-block">
              <h4 className="service-modal-heading">
                {t("portfolioShowcase.serviceModal.serviceDescription")}
              </h4>
              <p className="service-modal-description">{description}</p>
            </div>
          )}

          {features.length > 0 && (
            <div className="service-modal-features-block">
              <h4 className="service-modal-heading">
                {t("portfolioShowcase.serviceModal.keyFeatures")}
              </h4>
              <ul className="service-modal-features">
                {features.map((feature, idx) => (
                  <li key={idx} className="service-modal-feature-item">
                    <Icon
                      icon="bi:check-circle-fill"
                      className="service-modal-feature-icon"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="service-modal-actions">
            <a
              href="#contactus"
              className="service-modal-btn service-modal-btn-primary"
              onClick={onClose}
            >
              <Icon icon="bi:chat-dots" />
              <span>{t("portfolioShowcase.serviceModal.startProject")}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
