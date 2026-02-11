import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import type { SocialLink } from "../types/common";

interface SocialBtnsProps {
  variant?: string;
  socialBtns: SocialLink[];
}

export default function SocialBtns({
  variant,
  socialBtns,
}: SocialBtnsProps): React.ReactElement {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const fallbackName = t("social.icons.fallbackName");

  return (
    <div className={`social-icon ${variant ?? ""}`}>
      {socialBtns.map((item, index) => {
        const iconBgClass = item.iconBgClass ?? "";

        return (
          <a
            key={item.href}
            href={item.href}
            className={`${iconBgClass} social-btn`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              animationDelay: `${index * 0.1}s`,
              transform:
                hoveredIndex === index
                  ? "translateY(-8px) scale(1.15)"
                  : "translateY(0) scale(1)",
              transition:
                "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            aria-label={t("social.icons.open", {
              name: item.label || fallbackName,
            })}
          >
            <div className="social-btn-inner">
              {iconBgClass === "khamsat" ? (
                <img
                  src="/images/khamsat-seeklogo.png"
                  alt={t("social.icons.khamsatAlt")}
                  className="social-icon-img"
                />
              ) : (
                item.icon && (
                  <Icon
                    icon={item.icon}
                    className="social-icon-svg"
                    aria-hidden="true"
                  />
                )
              )}
              <div className="social-btn-ripple" />
            </div>
          </a>
        );
      })}
    </div>
  );
}
