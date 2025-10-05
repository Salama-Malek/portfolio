import React from 'react';
import parser from 'html-react-parser';
import SectionHeading from './SectionHeading';
import Timeline from './Timeline';
import Skillbar from './Skillbar';
import FunFact from './FunFact';

export default function About({ data = {} }) {
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

  if (!data || !title || !description) {
    return null;
  }

  // Manually adding icons to funfacts for design purposes
  const funfactsWithIcons = funfacts.map((fact, index) => {
    const icons = ['bi:briefcase', 'bi:clipboard-check', 'bi:people', 'bi:award'];
    return { ...fact, icon: icons[index % icons.length] };
  });

  return (
    <section className="about-section section" id="about">
      <div className="container">
        <div className="row align-items-start justify-content-center gy-5">
          <div
            className="col-lg-5 col-xl-4"
            data-aos="fade-right"
            data-aos-duration="1200"
            data-aos-delay="200"
          >
            <div className="about-banner">
              <img src={imgSrc} alt="Salama Malek - About Me" />
            </div>
          </div>
          <div className="col-lg-7 col-xl-8 ps-lg-5">
            <div
              className="about-text"
              data-aos="fade-in"
              data-aos-duration="1200"
              data-aos-delay="400"
            >
              {/* Use SectionHeading for consistency with other sections */}
              <SectionHeading miniTitle={miniTitle} title={title} />
              <p>{description}</p>
              <a href={btnUrl} className="px-btn">
                {btnText}
              </a>
            </div>
            <div className="about-funfacts">
              {funfactsWithIcons?.map((funfact, index) => (
                <FunFact funfact={funfact} key={index} />
              ))}
            </div>
            <div className="about-details">
              <div className="row gy-5">
                <div className="col-lg-6">
                  <Timeline data={timeline} />
                </div>
                <div className="col-lg-6">
                  <Skillbar data={skills} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
