import React, { useRef } from 'react';
import SectionHeading from './SectionHeading';
import Slider from 'react-slick';
import Ratings from './Ratings';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export default function Testimonial({ data = {} }) {
const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const { sectionHeading = {}, allTestimonial = [] } = data;
  const sliderRef = useRef(null);

  if (!data || !sectionHeading || allTestimonial.length === 0) {
    return null;
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="testimonial-section section" id="testimonial" style={{ minHeight: '100vh', width: '100vw' }}>
      <div className="container">
        <SectionHeading {...sectionHeading} variant="text-center" />
        <div className="testimonial-slider-wrapper" data-aos="fade-up" data-aos-duration="800">
          <div className="testimonial-slider">
            <Slider {...settings} ref={sliderRef}>
              {allTestimonial.map((item, index) => (
                <div className="testimonial-card" key={index}>
                  <div className="testimonial-icon">
                    <Icon icon="bi:quote" />
                  </div>
                  <p className="testimonial-text">{item.reviewText}</p>
                  <div className="testimonial-author">
                    <div className="author-img">
                      <img src={item.avatarImg} alt={item.avatarName} />
                    </div>
                    <div className="author-info">
                      <h6 className="author-name">{item.avatarName}</h6>
                      <span className="author-company">{item.avatarCompany}</span>
                      <Ratings rating={item.rating} />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="slider-nav">
            <button className="nav-btn prev" onClick={() => sliderRef.current?.slickPrev()}>
            <Icon icon={isRTL ? 'bi:arrow-right' : 'bi:arrow-left'} />

            </button>
            <button className="nav-btn next" onClick={() => sliderRef.current?.slickNext()}>
            <Icon icon={isRTL ? 'bi:arrow-left' : 'bi:arrow-right'} />

            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
