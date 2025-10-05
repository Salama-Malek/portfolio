import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import SectionHeading from './SectionHeading';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import TestimonialClassic from './TestimonialClassic';

const REVIEW_IMAGE_FILES = [
  '11047a5cb70a289ffce3c0e6561d9409.png',
  '12a3924ef2b896cfba174f30bfc0753e.png',
  '2689ec40e809b37ec730a5630d44a648.png',
  '3fefc0d7a020a8d149bd13a338a72277.png',
  '43d8461bce3214bf3d3a830beb4e4825.png',
  '461adbea90978a20d803b66ecc2df621.png',
  '56ad2ac9c8e3762e5e9d83f2887f5a24.png',
  '59b25a5867817b1a30332046c22f95f7.png',
  '792d62d464fe2b06692e315f436fab55.png',
  '79efb6178015069234f034d49eededf6.png',
  '7b0ea8871f4704ecf8b2482a00d2f7fb.png',
  '7c658841ab2b0afb39792ad9a1df3154.png',
  'ae6b13c06b69f4552230f0d7bfadbd8b.png',
  'c372213c22dc456333c06ee0f8e26c3b.png',
  'c6ad1c67c637c480134fe1c4f92a4180.png',
  'e43d41bc435f909ddd2a2dee34944bed.png',
  'e6c53fcb3f47a75c178bc78270b51d9f.png',
  'f0a614ad28a990a7fbe8629cebedcc85.png',
  'f96f0bba13c1c5af6c10e6f49d14c4ed.png',
];

const getActiveLanguage = (i18nInstance) => {
  if (!i18nInstance) {
    return '';
  }

  if (typeof i18nInstance.language === 'string') {
    return i18nInstance.language;
  }

  if (Array.isArray(i18nInstance.languages) && i18nInstance.languages.length > 0) {
    return i18nInstance.languages[0];
  }

  return '';
};

export default function Testimonial({ data = {} }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const { sectionHeading = {} } = data;

  const sliderRef = useRef(null);
  const [activeImage, setActiveImage] = useState(null);

  const activeLanguage = getActiveLanguage(i18n).toLowerCase();
  const isArabicExperience = activeLanguage.startsWith('ar');

  const reviewImages = useMemo(
    () =>
      REVIEW_IMAGE_FILES.map(
        (fileName) => `${process.env.PUBLIC_URL || ''}/reviews/${fileName}`
      ),
    []
  );

  const slides = useMemo(() => {
    if (!isArabicExperience || reviewImages.length === 0) {
      return [];
    }

    return reviewImages.map((image, index) => ({
      image,
      altText: `Client review ${index + 1}`,
    }));
  }, [isArabicExperience, reviewImages]);

  const openImage = useCallback((slide) => {
    setActiveImage(slide);
  }, []);

  const closeImage = useCallback(() => {
    setActiveImage(null);
  }, []);

  useEffect(() => {
    if (!activeImage) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeImage();
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage, closeImage]);

  if (!isArabicExperience) {
    return <TestimonialClassic data={data} />;
  }

  if (!data || !sectionHeading || slides.length === 0) {
    return null;
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <section className="testimonial-section section" id="testimonial">
      <div className="container">
        <SectionHeading {...sectionHeading} variant="text-center" />
        <div className="testimonial-slider-wrapper" data-aos="fade-up" data-aos-duration="800">
          <div className="testimonial-slider">
            <Slider {...settings} ref={sliderRef}>
              {slides.map(({ image, altText }, index) => (
                <div className="testimonial-card testimonial-card--enhanced" key={index}>
                  <div className="testimonial-media">
                    <div
                      className="testimonial-image-trigger"
                      role="button"
                      tabIndex={0}
                      onClick={() => openImage({ image, altText })}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          openImage({ image, altText });
                        }
                      }}
                    >
                      <span className="testimonial-image-overlay" aria-hidden="true" />
                      <img className="testimonial-image" src={image} alt={altText} loading="lazy" />
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

      {activeImage && (
        <div
          className="testimonial-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded client review image"
          onClick={closeImage}
        >
          <div
            className="testimonial-modal__content"
            role="document"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="testimonial-modal__close"
              onClick={closeImage}
              aria-label="Close image"
            >
              <Icon icon="bi:x" />
            </button>
            <img src={activeImage.image} alt={activeImage.altText} />
          </div>
        </div>
      )}
    </section>
  );
}
