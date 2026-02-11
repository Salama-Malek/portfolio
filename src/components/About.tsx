import React, { useMemo, lazy } from "react";
import { Link as ScrollLink } from "react-scroll";
import SectionHeading from "./SectionHeading";
import OptimizedImage from "./OptimizedImage";
import type { FunFactData } from "../types/common";

const Timeline = lazy(() => import("./Timeline"));
const Skillbar = lazy(() => import("./Skillbar"));
const FunFact = lazy(() => import("./FunFact"));

interface AboutData {
  imgSrc?: string;
  miniTitle?: string;
  title?: string;
  description?: string;
  funfacts?: FunFactData[];
  btnText?: string;
  btnUrl?: string;
  timeline?: unknown[];
  skills?: unknown[];
}

interface AboutProps {
  data?: AboutData;
}

export default function About({ data = {} }: AboutProps): React.JSX.Element | null {
  const {
    imgSrc,
    miniTitle,
    title,
    description,
    funfacts,
    btnText,
    btnUrl,
    timeline,
    skills,
  } = data;

  // Memoize funfacts with icons to avoid recalculation
  const funfactsWithIcons = useMemo(() => {
    if (!funfacts) return [];
    const icons = [
      "bi:briefcase",
      "bi:clipboard-check",
      "bi:people",
      "bi:award",
    ];
    return (funfacts as any[]).map((fact, index) => ({
      ...fact,
      icon: icons[index % icons.length],
    }));
  }, [funfacts]);

  if (!data || !title || !description) {
    return null;
  }

  return (
    <section className="about-section section" id="about">
      <div className="container">
        {/* Main content row */}
        <div className="row align-items-center justify-content-between gy-5 mb-5">
          <div
            className="col-lg-5 col-xl-5"
            data-aos="fade-right"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <div className="about-banner">
              <OptimizedImage
                src={imgSrc}
                alt="Salama Malek - About Me"
                aspectRatio={1}
                loading="lazy"
                sizes="(max-width: 575px) 90vw, (max-width: 991px) 75vw, 32vw"
              />
            </div>
          </div>
          <div className="col-lg-7 col-xl-6 ps-lg-5">
            <div
              className="about-text"
              data-aos="fade-in"
              data-aos-duration="1200"
              data-aos-delay="400"
            >
              {/* Use SectionHeading for consistency with other sections */}
              <SectionHeading miniTitle={miniTitle} title={title} />
              <p>{description}</p>
              <ScrollLink
                to={(btnUrl || "#") as string}
                smooth={true}
                offset={-80}
                duration={500}
                className="px-btn"
              >
                {btnText}
              </ScrollLink>
            </div>
          </div>
        </div>

        {/* Fun Facts Row */}
        <div className="row gy-4 mb-5">
          <div className="col-12">
            <div
              className="about-funfacts"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="300"
            >
              {funfactsWithIcons?.map((funfact: any, index: number) => (
                <FunFact funfact={funfact} key={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline and Skills Row */}
        <div className="about-details">
          <div className="row gy-5">
            <div className="col-lg-6">
              <div
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="400"
              >
                <Timeline data={timeline as any} />
              </div>
            </div>
            <div className="col-lg-6">
              <div
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="500"
              >
                <Skillbar data={skills as any} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
