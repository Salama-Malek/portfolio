import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useToast } from './ToastProvider';
import { useDebounce } from '../hooks/useDebounce';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { pushToast } = useToast();
  const debouncedForm = useDebounce(formData, 300);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', debouncedForm);
    pushToast({
      type: 'success',
      title: t('contactForm.toast.successTitle'),
      description: t('contactForm.toast.successMessage'),
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-header">
        <h4>{t('contactForm.title')}</h4>
        <p>{t('contactForm.description')}</p>
      </div>
      <div className="form-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">{t('contactForm.nameLabel')}</label>
              <div className="input-wrapper">
                <Icon icon="bi:person" className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder={t('contactForm.namePlaceholder')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email" className="form-label">{t('contactForm.emailLabel')}</label>
              <div className="input-wrapper">
                <Icon icon="bi:envelope" className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder={t('contactForm.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="subject" className="form-label">{t('contactForm.subjectLabel')}</label>
              <div className="input-wrapper">
                <Icon icon="bi:tag" className="input-icon" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  placeholder={t('contactForm.subjectPlaceholder')}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="message" className="form-label">{t('contactForm.messageLabel')}</label>
              <div className="input-wrapper">
                <Icon icon="bi:chat-dots" className="input-icon textarea-icon" />
                <textarea
                  id="message"
                  name="message"
                  className="form-control textarea-control"
                  placeholder={t('contactForm.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="px-btn form-submit-btn">
              <Icon icon="bi:send" />
              <span>{t('contactForm.send')}</span>
              <div className="btn-ripple"></div>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
