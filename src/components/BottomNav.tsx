import React, { useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link as ScrollLink } from "react-scroll";
import { Icon } from "@iconify/react";
import LanguageSwitcher from "./LanguageSwitcher";
import useScrollSpy from "../hooks/useScrollSpy";

interface NavLink {
  to: string;
  label: string;
  icon: string;
}

interface MoreMenuSheetProps {
  navLinks: NavLink[];
  onClose: () => void;
}

const MoreMenuSheet: React.FC<MoreMenuSheetProps> = ({
  navLinks,
  onClose,
}): ReactNode => {
  const { t } = useTranslation();
  return (
    <>
      <div className="more-menu-sheet">
        <div className="more-menu-sheet-header">
          <h5>{t("navigation.moreOptions")}</h5>
          <button
            type="button"
            onClick={onClose}
            className="close-btn"
            aria-label={t("navigation.close")}
            title={t("navigation.close")}
          >
            <Icon icon="bi:x" />
          </button>
        </div>
        <div className="more-menu-sheet-content">
          <ul className="secondary-nav-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <ScrollLink
                  to={link.to}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="secondary-nav-link"
                  onClick={onClose}
                >
                  {t(link.label)}
                </ScrollLink>
              </li>
            ))}
          </ul>
          <div className="sheet-actions">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      <div className="sheet-overlay" onClick={onClose}></div>
    </>
  );
};

export default function BottomNav(): ReactNode {
  const { t } = useTranslation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { to: "home", label: "header.nav.home", icon: "bi:house-door" },
    { to: "about", label: "header.nav.about", icon: "bi:person" },
    { to: "project", label: "header.nav.portfolio", icon: "bi:briefcase" },
    { to: "experience", label: "header.nav.experience", icon: "bi:award" },
    {
      to: "testimonial",
      label: "header.nav.testimonials",
      icon: "bi:chat-square-heart",
    },
    { to: "contactus", label: "header.nav.contact", icon: "bi:envelope" },
  ];

  const sectionIds: string[] = navLinks.map((link) => link.to);
  const activeIndex: number = useScrollSpy(sectionIds, -100);

  const primaryLinks: NavLink[] = [
    navLinks[0],
    navLinks[1],
    navLinks[2],
    navLinks[5],
  ];

  const secondaryLinks: NavLink[] = [navLinks[3], navLinks[4]];

  return (
    <>
      <div className="bottom-nav">
        {primaryLinks.map((link, index) => (
          <ScrollLink
            key={link.to}
            to={link.to}
            smooth={true}
            offset={-80}
            duration={500}
            className={`bottom-nav-link ${
              activeIndex === sectionIds.indexOf(link.to) ? "active" : ""
            }`}
            activeClass="active"
            spy={true}
          >
            <Icon icon={link.icon} />
            <span>{t(link.label)}</span>
          </ScrollLink>
        ))}
        <button
          type="button"
          className="bottom-nav-link"
          onClick={() => setIsMoreMenuOpen(true)}
          aria-label={t("navigation.openMore")}
          title={t("navigation.openMore")}
        >
          <Icon icon="bi:grid-3x3-gap" />
          <span>{t("navigation.more")}</span>
        </button>
      </div>
      {isMoreMenuOpen && (
        <MoreMenuSheet
          navLinks={secondaryLinks}
          onClose={() => setIsMoreMenuOpen(false)}
        />
      )}
    </>
  );
}
