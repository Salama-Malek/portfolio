import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SocialBtns({ variant, socialBtns }) {
  const { t } = useTranslation();
  const socialLinks = Array.isArray(socialBtns) ? socialBtns : [];
  const fallbackName = t('social.icons.fallbackName');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={`social-icon ${variant ? variant : ''}`}
      data-aos="zoom-in"
      data-aos-duration="1200"
      data-aos-delay="300"
    >
      {socialLinks?.map((item, index) => (
        <Link
          className={`${item.iconBgClass} social-btn`}
          to={item.href}
          key={index}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            animationDelay: `${index * 0.1}s`,
            transform: hoveredIndex === index ? 'translateY(-8px) scale(1.15)' : 'translateY(0) scale(1)',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          }}
          aria-label={t('social.icons.open', { name: item.label || item.iconBgClass || fallbackName })}
        >
          <div className="social-btn-inner">
            {item.iconBgClass === 'khamsat' ? (
              <img
                src="/images/khamsat-seeklogo.png"
                alt={t('social.icons.khamsatAlt')}
                className="social-icon-img"
              />
            ) : (
              <Icon icon={item.icon} className="social-icon-svg" aria-hidden="true" />
            )}
            <div className="social-btn-ripple"></div>
          </div>
        </Link>
      ))}
    </div>
  );
}
