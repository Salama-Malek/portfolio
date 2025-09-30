export type WritingPost = {
  slug: string;
  titleKey: string;
  excerptKey: string;
  tags: string[];
  startHere?: boolean;
  bodyKey: string;
};

export const posts: WritingPost[] = [
  {
    slug: 'liquid-ether-internals',
    titleKey: 'writing.posts.liquidEtherInternals.title',
    excerptKey: 'writing.posts.liquidEtherInternals.excerpt',
    tags: ['backgrounds', 'performance', 'motion'],
    startHere: true,
    bodyKey: 'writing.posts.liquidEtherInternals.body',
  },
  {
    slug: 'a11y-dark-tokens',
    titleKey: 'writing.posts.a11yDarkTokens.title',
    excerptKey: 'writing.posts.a11yDarkTokens.excerpt',
    tags: ['design', 'a11y'],
    startHere: true,
    bodyKey: 'writing.posts.a11yDarkTokens.body',
  },
  {
    slug: 'mdx-workflows',
    titleKey: 'writing.posts.mdxWorkflows.title',
    excerptKey: 'writing.posts.mdxWorkflows.excerpt',
    tags: ['mdx', 'content'],
    bodyKey: 'writing.posts.mdxWorkflows.body',
  },
];
