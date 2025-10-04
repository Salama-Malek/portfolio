import React, { useMemo, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export default function ReviewsGallery({ images = [], heading }) {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [activeIndex, setActiveIndex] = useState(null);

  const shapedImages = useMemo(() => {
    return images.map((src, index) => ({
      src,
      rotation: ((index % 6) - 3) * 2.5 + (index % 2 === 0 ? 1 : -1),
      zIndex: 1 + (index % 5),
      stagger: (index % 4) * 80,
    }));
  }, [images]);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeIndex]);

  const closeLightbox = () => setActiveIndex(null);
  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const goNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  const showPrev = (e) => {
    e.stopPropagation();
    goPrev();
  };
  const showNext = (e) => {
    e.stopPropagation();
    goNext();
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex]);

  if (!images || images.length === 0) return null;

  return (
    <section className="reviews-gallery section" id="reviews">
      <div className="container">
        {heading && (
          <div className="section-heading text-center" data-aos="fade-up" data-aos-duration="600">
            <h3 className="title">{heading.title}</h3>
            {heading.subtitle && <p className="sub-title">{heading.subtitle}</p>}
          </div>
        )}
        <div className="reviews-grid" data-aos="fade-up" data-aos-duration="700">
          {shapedImages.map((img, index) => (
            <button
              key={index}
              className="polaroid-card"
              style={{
                transform: `rotate(${img.rotation}deg)`
              }}
              onClick={() => setActiveIndex(index)}
            >
              <span className="polaroid-shadow" style={{ zIndex: img.zIndex }} />
              <img src={img.src} alt={`Review ${index + 1}`} loading="lazy" />
              <span className="tape tape-top-left" />
              <span className="tape tape-top-right" />
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            <Icon icon="bi:x" />
          </button>
          <button className="lightbox-nav prev" onClick={showPrev} aria-label="Previous">
            <Icon icon={isRTL ? "bi:arrow-right" : "bi:arrow-left"} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={images[activeIndex]} alt={`Review ${activeIndex + 1}`} />
          </div>
          <button className="lightbox-nav next" onClick={showNext} aria-label="Next">
            <Icon icon={isRTL ? "bi:arrow-left" : "bi:arrow-right"} />
          </button>
        </div>
      )}
    </section>
  );
}

