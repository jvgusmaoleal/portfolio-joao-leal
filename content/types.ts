export type Stat = { value: string; label: string };

export type ProjectLink = { label: string; href: string; external?: boolean };

export type Project = {
  id: string;
  badge: string;
  name: string;
  description: string;
  highlights: string[];
  links: ProjectLink[]; // primeiro link = ação primária
};

export type ProcessStep = { cmd: string; title: string; text: string };

export type ContactChannel = { label: string; href: string; handle: string };

export type CrmModule = { name: string; blurb: string; image?: string };

export type AreaResult = { area: string; text: string };

export type Integration = { name: string; desc: string };
