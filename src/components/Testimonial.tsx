import React, { useMemo, useRef, useCallback, ReactNode } from "react";
import SectionHeading from "./SectionHeading";
import Slider from "react-slick";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

interface TestimonialItem {
  reviewText: string;
  avatarName: string;
  avatarCompany?: string;
}

interface TestimonialProps {
  data?: {
    sectionHeading?: {
      miniTitle?: string;
      title?: string;
    };
  };
}

export default function Testimonial({
  data = {},
}: TestimonialProps): ReactNode {
  const { t, i18n } = useTranslation();

  const isRTL = i18n.dir() === "rtl";

  const sliderRef = useRef<any>(null);

  const testimonials: TestimonialItem[] = useMemo(() => {
    const data = t("homePage.testimonial.allTestimonial", {
      returnObjects: true,
      defaultValue: [],
    });

    if (Array.isArray(data)) return data;
    if (typeof data === "object" && data !== null) return Object.values(data);

    return [];
  }, [t]);

  const hasTestimonials = testimonials.length > 0;

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 6000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    rtl: isRTL,
  };

  return (
    <section className="testimonial-section section" id="testimonial">
      <div className="container">
        <SectionHeading
          {...t("homePage.testimonial.sectionHeading", { returnObjects: true })}
          variant="text-center"
        />

        {hasTestimonials ? (
          <div className="testimonial-slider-wrapper" data-aos="fade-up">
            <Slider {...settings} ref={sliderRef}>
              {testimonials.map((item, index) => (
                <div className="testimonial-card" key={index}>
                  <div className="testimonial-content">
                    <div className="testimonial-stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} icon="material-symbols:star-rounded" />
                      ))}
                    </div>

                    <p className="testimonial-text">“{item.reviewText}”</p>

                    <div className="testimonial-author">
                      <strong>{item.avatarName}</strong>
                      {item.avatarCompany && <span>{item.avatarCompany}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="testimonial-arrows">
  <button
    className="testimonial-arrow prev"
    onClick={() => sliderRef.current?.slickPrev()}
    aria-label="Previous testimonial"
  >
    <Icon icon="mdi:chevron-left" />
  </button>

  <button
    className="testimonial-arrow next"
    onClick={() => sliderRef.current?.slickNext()}
    aria-label="Next testimonial"
  >
    <Icon icon="mdi:chevron-right" />
  </button>
</div>

          </div>
        ) : (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            {t(
              "homePage.testimonial.empty",
              "Client testimonials will appear here soon",
            )}
          </p>
        )}
      </div>
    </section>
  );
}
