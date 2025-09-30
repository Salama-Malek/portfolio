import type { ComponentType } from 'react';

export type CaseStudyMetric = {
  labelKey: string;
  valueKey: string;
};

export type CaseStudy = {
  slug: string;
  titleKey: string;
  summaryKey: string;
  problemKey: string;
  approachKey: string;
  codeKey: string;
  metrics: CaseStudyMetric[];
  demo: () => Promise<{ default: ComponentType }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'liquid-ether',
    titleKey: 'projects.liquidEther.title',
    summaryKey: 'projects.liquidEther.summary',
    problemKey: 'projects.liquidEther.problem',
    approachKey: 'projects.liquidEther.approach',
    codeKey: 'projects.liquidEther.code',
    metrics: [
      { labelKey: 'projects.liquidEther.metrics.fps', valueKey: 'projects.liquidEther.metrics.fpsValue' },
      { labelKey: 'projects.liquidEther.metrics.gpu', valueKey: 'projects.liquidEther.metrics.gpuValue' },
    ],
    demo: () => import('../../components/demos/LiquidEtherDemo'),
  },
  {
    slug: 'mdx-pipeline',
    titleKey: 'projects.mdxPipeline.title',
    summaryKey: 'projects.mdxPipeline.summary',
    problemKey: 'projects.mdxPipeline.problem',
    approachKey: 'projects.mdxPipeline.approach',
    codeKey: 'projects.mdxPipeline.code',
    metrics: [
      { labelKey: 'projects.mdxPipeline.metrics.time', valueKey: 'projects.mdxPipeline.metrics.timeValue' },
      { labelKey: 'projects.mdxPipeline.metrics.bundle', valueKey: 'projects.mdxPipeline.metrics.bundleValue' },
    ],
    demo: () => import('../../components/demos/ContentPipelineDemo'),
  },
];
