import React, { memo } from "react";
import parser from "html-react-parser";

interface SectionHeadingProps {
  miniTitle?: string;
  title?: string;
  variant?: string;
}

const SectionHeading = memo(function SectionHeading({
  miniTitle,
  title,
  variant,
}: SectionHeadingProps): React.JSX.Element {
  // Ensure title is a string before parsing
  const safeTitle = typeof title === "string" ? title : "";
  return (
    <div className={`section-heading ${variant ? variant : ""}`}>
      <h2
        data-aos={variant === "text-center" ? "fade-up" : "fade-right"}
        data-aos-duration="1200"
        data-aos-delay="200"
      >
        <span>{miniTitle}</span>
      </h2>
      <h3>{parser(safeTitle)}</h3>
    </div>
  );
});

SectionHeading.displayName = "SectionHeading";
export default SectionHeading;
