import React from "react";
import { Icon } from "@iconify/react";

type TechnologyKey =
  | "react"
  | "javascript"
  | "nodejs"
  | "mongodb"
  | "express"
  | "css"
  | "html"
  | "scss"
  | "bootstrap"
  | "nextjs"
  | "typescript"
  | "firebase"
  | "python"
  | "django"
  | "flask"
  | "postgresql"
  | "graphql"
  | "docker"
  | "kubernetes"
  | "aws";

const iconMap: Record<TechnologyKey, string> = {
  react: "logos:react",
  javascript: "logos:javascript",
  nodejs: "logos:nodejs-icon",
  mongodb: "logos:mongodb-icon",
  express: "logos:express",
  css: "logos:css-3",
  html: "logos:html-5",
  scss: "logos:sass",
  bootstrap: "logos:bootstrap",
  nextjs: "logos:nextjs-icon",
  typescript: "logos:typescript-icon",
  firebase: "logos:firebase",
  python: "logos:python",
  django: "logos:django-icon",
  flask: "logos:flask",
  postgresql: "logos:postgresql",
  graphql: "logos:graphql",
  docker: "logos:docker-icon",
  kubernetes: "logos:kubernetes",
  aws: "logos:aws",
};

interface TechIconProps {
  technology: string;
}

const TechIcon: React.FC<TechIconProps> = ({
  technology,
}): React.ReactElement => {
  const normalizedTech = technology
    .toLowerCase()
    .replace(/\s+/g, "") as TechnologyKey;
  const icon = iconMap[normalizedTech] || "bi:code-slash";
  return <Icon icon={icon} />;
};

export default TechIcon;
