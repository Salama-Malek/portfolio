import React, { ReactNode } from "react";
import { Icon } from "@iconify/react";
import Tooltip from "./Tooltip";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useToast } from "./ToastProvider";
import { useTranslation } from "react-i18next";

interface ContactInfoItem {
  type?: string;
  title?: string;
  email?: string;
  tel?: string;
  address?: string;
}

interface ContactInfoProps {
  contactInfoData: ContactInfoItem[];
}

export default function ContactInfo({
  contactInfoData,
}: ContactInfoProps): ReactNode {
  const { t } = useTranslation();
  const { copy } = useCopyToClipboard();
  const { pushToast } = useToast();

  const getIcon = (item: ContactInfoItem): string => {
    const key = (item.type || item.title || "").toLowerCase();
    switch (key) {
      case "email":
        return "bi:envelope";
      case "phone":
        return "bi:phone";
      case "address":
        return "bi:geo-alt";
      default:
        return "bi:person";
    }
  };

  const handleCopyClick = async (
    text: string | undefined,
    itemTitle: string,
  ): Promise<void> => {
    if (!text) return;
    const ok = await copy(text);
    if (ok) {
      pushToast({
        type: "info",
        title: t("contact.info.toastTitle"),
        description: t("contact.info.toastDescription", { value: text }),
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>): void => {
    if (e.key === "Enter") {
      (e.currentTarget as HTMLSpanElement).click();
    }
  };

  return (
    <div className="contact-info">
      <div className="contact-info-header">
        <h4>{t("contact.info.heading")}</h4>
        <p>{t("contact.info.description")}</p>
      </div>
      <div className="contact-info-list">
        {contactInfoData.map((item, index) => (
          <div
            className="contact-info-item"
            key={index}
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay={index * 100}
          >
            <div className="contact-info-icon">
              <Tooltip content={t("contact.info.copy", { field: item.title })}>
                <span
                  onClick={() => {
                    const text = item.email || item.tel || item.address || "";
                    handleCopyClick(text, item.title || "");
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Copy ${item.title}: ${item.email || item.tel || item.address}`}
                  onKeyDown={handleKeyDown}
                >
                  <Icon icon={getIcon(item)} />
                </span>
              </Tooltip>
            </div>
            <div className="contact-info-text">
              <h6>{item.title}</h6>
              {item.email && <a href={`mailto:${item.email}`}>{item.email}</a>}
              {item.tel && <a href={`tel:${item.tel}`}>{item.tel}</a>}
              {item.address && <span>{item.address}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
