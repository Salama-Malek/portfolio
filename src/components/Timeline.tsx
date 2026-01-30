import React, { memo, ReactNode } from "react";
import SectionHeading from "./SectionHeading";
import { useTranslation } from "react-i18next";

interface TimelineItem {
  duration: string;
  title: string;
  company: string;
}

interface TimelineProps {
  data?: TimelineItem[];
}

const Timeline = memo(({ data = [] }: TimelineProps): ReactNode => {
  const { t } = useTranslation();
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="timeline-section">
      <SectionHeading title={t("timeline.sectionHeading.title")} />
      <ul className="timeline">
        {data.map((item, index) => (
          <li
            className="timeline-item"
            key={index}
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay={index * 100}
          >
            <div className="timeline-info">
              <span>{item.duration}</span>
            </div>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h5 className="timeline-title">{t(item.title)}</h5>
              <p>{t(item.company)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

Timeline.displayName = "Timeline";
export default Timeline;
