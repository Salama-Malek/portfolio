import React, { useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Icon } from '@iconify/react';
import SocialBtns from './SocialBtns';
import { useTranslation } from 'react-i18next';
import Particles from './Particles';
import LiquidEther from './LiquidEther';

export default function Hero({ data = {}, socialData = [] }) {
  const {
    name,
    heading,
    typingText,
    description,
    btnText,
    btnUrl,
    cvUrl,
    imgUrl,
  } = data;
  const heroImgRef = useRef(null);
  const { t } = useTranslation();

  // Removed parallax effect for hero image to keep it stationary
  // Background animations (Particles and LiquidEther) will continue to move

  if (!data || !name || !heading) {
    return null;
  }

  return (
    <section className="hero-section" id="home" style={{ minHeight: '100vh', width: '100vw' }}>
      <Particles />
      <div className="hero-liquid-container">
        <LiquidEther
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-xl-6">
            <div className="hero-text">
              <h6 data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
                {name}
              </h6>
              <h1 data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
                {heading}
              </h1>
              <div className="typing-animation-wrapper">
                <h2 data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
                  <TypeAnimation
                    sequence={typingText || []}
                    speed={0}
                    repeat={Infinity}
                  />
                </h2>
              </div>
              <p data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
                {description}
              </p>
              <div
                className="btn-bar"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="500"
              >
                <a href={btnUrl} className="px-btn">
                  {btnText}
                </a>
                {cvUrl && (
                  <a href={cvUrl} className="px-btn-outline" download>
                    <Icon icon="bi:download" />
                    <span>{t('hero.downloadCv')}</span>
                  </a>
                )}
              </div>
              <div className="social-links">
                <SocialBtns socialBtns={socialData} />
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-xl-6">
            <div className="hero-img-wrapper" ref={heroImgRef}>
              <div className="hero-img-shape" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="500"></div>
              <img
                src={imgUrl}
                alt={name}
                className="hero-img"
                data-aos="fade-left"
                data-aos-duration="1200"
                data-aos-delay="800"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
