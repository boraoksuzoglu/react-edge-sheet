export interface NavItem {
  title: string;
  slug: string;
  description: string;
}

export const docsNav: NavItem[] = [
  {
    title: 'Getting Started',
    slug: 'getting-started',
    description: 'Installation and first sheet',
  },
  {
    title: 'API Reference',
    slug: 'api',
    description: 'Props, ref methods, and types',
  },
  {
    title: 'Examples',
    slug: 'examples',
    description: 'Common patterns and recipes',
  },
  {
    title: 'Advanced',
    slug: 'advanced',
    description: 'Animation internals and SSR',
  },
  {
    title: 'Keyboard & Focus',
    slug: 'keyboard',
    description: 'Focus trap, ARIA, and screen readers',
  },
  {
    title: 'Animations',
    slug: 'animation',
    description: 'Presets, asymmetric transitions',
  },
  {
    title: 'Gestures',
    slug: 'gestures',
    description: 'Drag-to-dismiss and snap points',
  },
  {
    title: 'Changelog',
    slug: 'changelog',
    description: 'Release history',
  },
];
