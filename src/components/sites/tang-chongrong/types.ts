import type { Sermon, SeriesInfo } from './data/sermons';

export type { Sermon, SeriesInfo };

export interface NavItem {
  href: string;
  label: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  detail: string;
}

export interface Theme {
  key: string;
  title: string;
  subtitle: string;
  body: string;
  practice: string;
}

export interface Quote {
  text: string;
  source: string;
}

export interface Ministry {
  name: string;
  full: string;
  founded: string;
  role: string;
  description: string;
}

export interface FeaturedCollection {
  title: string;
  description: string;
  slugs: string[];
}
