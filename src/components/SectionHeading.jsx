import React from 'react';
import parser from 'html-react-parser';

export default function SectionHeading({ miniTitle, title, variant }) {
  // Ensure title is a string before parsing
  const safeTitle = typeof title === 'string' ? title : '';
  return (
    <div className={`section-heading ${variant ? variant : ''}`}>
      <h6
        data-aos={variant === 'text-center' ? 'fade-up' : 'fade-right'}
        data-aos-duration="1200"
        data-aos-delay="200"
      >
        <span>{miniTitle}</span>
      </h6>
      <h2>{parser(safeTitle)}</h2>
    </div>
  );
}
