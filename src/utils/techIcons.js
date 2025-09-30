import React from 'react';
import { Icon } from '@iconify/react';

const iconMap = {
  react: 'logos:react',
  javascript: 'logos:javascript',
  nodejs: 'logos:nodejs-icon',
  mongodb: 'logos:mongodb-icon',
  express: 'logos:express',
  css: 'logos:css-3',
  html: 'logos:html-5',
  scss: 'logos:sass',
  bootstrap: 'logos:bootstrap',
  nextjs: 'logos:nextjs-icon',
  typescript: 'logos:typescript-icon',
  firebase: 'logos:firebase',
  python: 'logos:python',
  django: 'logos:django-icon',
  flask: 'logos:flask',
  postgresql: 'logos:postgresql',
  graphql: 'logos:graphql',
  docker: 'logos:docker-icon',
  kubernetes: 'logos:kubernetes',
  aws: 'logos:aws',
  // Add more mappings as needed
};

const TechIcon = ({ technology }) => {
  const icon = iconMap[technology.toLowerCase().replace(' ', '')] || 'bi:code-slash'; // Default icon
  return <Icon icon={icon} />;
};

export default TechIcon;
