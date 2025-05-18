export interface ProjectContentItem {
  type: "paragraph" | "image" | "video" | "model" | "quote";
  content?: string;
  url?: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  thumbnailUrl: string;
  heroImage: string;
  description: string;
  shortDescription: string;
  year: number;
  client: string;
  role: string;
  technologies: string[];
  linkUrl: string;
  hasModel: boolean;
  modelUrl?: string;
  content: ProjectContentItem[];
}

export interface ProjectFilterOptions {
  categories: string[];
  tags: string[];
  years: number[];
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: string;
  category: string;
  relatedProjectId?: string;
}

export type ProjectSortOption = "newest" | "oldest" | "alphabetical";
