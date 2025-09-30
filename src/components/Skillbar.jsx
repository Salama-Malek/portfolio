import React, { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';

export default function Skillbar({ data = [] }) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const skillbarSection = document.querySelector('.skillbar-section');
      if (skillbarSection) {
        const top = skillbarSection.getBoundingClientRect().top;
        const bottom = skillbarSection.getBoundingClientRect().bottom;
        if (top < window.innerHeight && bottom >= 0) {
          setInView(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="skillbar-section">
      <SectionHeading title="My Skills" />
      <div className="skillbars">
        {data.map((skill, index) => (
          <div className="skillbar" key={index}>
            <div className="skillbar-title">
              <span>{skill.name}</span>
              <span>{skill.percentage}%</span>
            </div>
            <div className="skillbar-bar">
              <div
                className="skillbar-progress"
                style={{ width: inView ? `${skill.percentage}%` : 0 }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
