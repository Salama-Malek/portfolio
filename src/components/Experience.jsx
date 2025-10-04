import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { Icon } from '@iconify/react';

export default function Experience({ data = {} }) {
  const { sectionHeading = {}, allExperience = [] } = data;
  const [activeExperience, setActiveExperience] = useState(0);

  if (!data || !sectionHeading || allExperience.length === 0) {
    return null;
  }

  const activeData = allExperience[activeExperience];

  return (
    <section className="experience-section section" id="experience" style={{ minHeight: '100vh', width: '100vw' }}>
      <div className="container">
        <SectionHeading {...sectionHeading} />
        <div className="experience-switcher">
          <div className="switcher-nav">
            {allExperience.map((exp, index) => (
              <button
                key={index}
                className={`nav-item ${index === activeExperience ? 'active' : ''}`}
                onClick={() => setActiveExperience(index)}
              >
                {exp.company}
              </button>
            ))}
          </div>
          <div className="switcher-content">
            <div className="content-header">
              <h5 className="designation">{activeData.designation}</h5>
              <p className="company">
                <a href={activeData.companyUrl || '#'} target="_blank" rel="noopener noreferrer">
                  {activeData.company}
                </a>
                <span>- {activeData.jobType}</span>
              </p>
              <p className="duration">
                <Icon icon="bi:calendar-event" /> {activeData.duration}
              </p>
            </div>
            <p className="content-description">{activeData.companyDescription}</p>
          </div>
        </div>

        {/* Mobile Accordion View */}
        <div className="experience-accordion">
          {allExperience.map((exp, index) => (
            <div
              className={`accordion-item ${
                index === activeExperience ? 'active' : ''
              }`}
              key={index}
            >
              <button
                className="accordion-header"
                onClick={() => setActiveExperience(index)}
              >
                <span>{exp.company}</span>
                <Icon icon="bi:chevron-down" className="accordion-icon" />
              </button>
              <div className="accordion-content">
                <div className="accordion-content-inner">
                  <div className="content-header">
                    <h5 className="designation">{exp.designation}</h5>
                    <p className="company">
                      <a
                        href={exp.companyUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {exp.company}
                      </a>
                      <span>- {exp.jobType}</span>
                    </p>
                    <p className="duration">
                      <Icon icon="bi:calendar-event" /> {exp.duration}
                    </p>
                  </div>
                  <p className="content-description">{exp.companyDescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
