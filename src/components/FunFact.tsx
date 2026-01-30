import React, { ReactNode } from "react";
import { Icon } from "@iconify/react";

interface FunFactData {
  number: number | string;
  title: string;
  icon: string;
  [key: string]: any;
}

interface FunFactProps {
  funfact: FunFactData;
}

export default function FunFact({ funfact }: FunFactProps): ReactNode {
  const { number, title, icon } = funfact;
  return (
    <div className="funfact-card">
      <div className="funfact-icon-wrapper">
        <div className="funfact-icon">
          <Icon icon={icon} />
        </div>
      </div>
      <div className="funfact-content">
        <div className="funfact-number">
          {number}
          <span className="funfact-plus">+</span>
        </div>
        <div className="funfact-title">{title}</div>
      </div>
    </div>
  );
}
