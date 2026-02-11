import React from "react";
import SectionHeading from "./SectionHeading";
import SocialBtns from "./SocialBtns";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import { useTranslation } from "react-i18next";
import type { SocialLink } from "../types/common";

interface SectionHeadingData {
  miniTitle?: string;
  title?: string;
  [key: string]: any;
}

interface ContactInfoItem {
  type?: string;
  title?: string;
  email?: string;
  tel?: string;
  address?: string;
}

interface ContactData {
  sectionHeading?: SectionHeadingData;
  contactInfo?: ContactInfoItem[];
}

interface ContactProps {
  data?: ContactData;
  socialData?: SocialLink[];
}

export default function Contact({
  data = {},
  socialData = [],
}: ContactProps): JSX.Element | null {
  const { t } = useTranslation();
  const { sectionHeading = {}, contactInfo = [] } = data;

  if (!data || !sectionHeading) {
    return null;
  }

  return (
    <section id="contactus" className="section contact-section">
      <div className="container">
        <SectionHeading {...sectionHeading} />
        <div className="contact-content">
          <div className="contact-info-wrapper">
            <div className="contact-info-content">
              <ContactInfo contactInfoData={contactInfo} />
              <div className="contact-social">
                <h4>{t("contact.followMe")}</h4>
                <SocialBtns socialBtns={socialData as SocialLink[]} />
              </div>
            </div>
            <div className="contact-decoration">
              <div className="contact-shape-1"></div>
              <div className="contact-shape-2"></div>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
