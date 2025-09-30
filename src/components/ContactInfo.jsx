import React from 'react';
import { Icon } from '@iconify/react';
import Tooltip from './Tooltip';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from './ToastProvider';

export default function ContactInfo({ contactInfoData }) {
  const { copy } = useCopyToClipboard();
  const { pushToast } = useToast();
  const getIcon = (title) => {
    switch (title.toLowerCase()) {
      case 'email':
        return 'bi:envelope';
      case 'phone':
        return 'bi:phone';
      case 'address':
        return 'bi:geo-alt';
      default:
        return 'bi:person';
    }
  };

  return (
    <div className="contact-info">
      <div className="contact-info-header">
        <h4>Get In Touch</h4>
        <p>Ready to start your next project? Let's discuss how I can help bring your ideas to life.</p>
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
              <Tooltip content={`Copy ${item.title.toLowerCase()}`}>
                <span
                  onClick={async () => {
                    const text = item.email || item.tel || item.address || '';
                    if (!text) return;
                    const ok = await copy(text);
                    if (ok) pushToast({ type: 'info', title: 'Copied', description: text });
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.click();
                  }}
                >
                  <Icon icon={getIcon(item.title)} />
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
