import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EmailCapture: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const progress = scrollHeight - clientHeight === 0 ? 0 : scrollTop / (scrollHeight - clientHeight);
      if (progress >= 0.6) {
        setVisible(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (email.includes('@')) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <section className="email-capture" aria-live="polite">
      <div>
        <h3>{t('writing.emailCapture.title')}</h3>
        <p>{t('writing.emailCapture.copy')}</p>
      </div>
      <form className="email-capture__form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="writing-email">
          {t('writing.emailCapture.label')}
        </label>
        <input
          id="writing-email"
          className="email-capture__input"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t('writing.emailCapture.placeholder')}
        />
        <button type="submit" className="email-capture__submit" disabled={status === 'loading'}>
          {status === 'success' ? t('writing.emailCapture.success') : t('writing.emailCapture.submit')}
        </button>
      </form>
      {status === 'error' && <p role="alert">{t('writing.emailCapture.error')}</p>}
    </section>
  );
};

export default EmailCapture;
