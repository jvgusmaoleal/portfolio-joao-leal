export type Stat = { value: string; label: string };

export type ProjectLink = { label: string; href: string; external?: boolean };

export type Project = {
  id: string;
  badge: string;
  name: string;
  description: string;
  image?: string; // print em public/crm/ — renderiza no card quando o arquivo existir
  visual?: "arch"; // "arch" troca o print pelo diagrama de arquitetura (prova de stack)
  highlights: string[];
  links: ProjectLink[]; // primeiro link = ação primária
};

export type ProcessStep = { cmd: string; title: string; text: string };

export type ContactChannel = { label: string; href: string; handle: string };

export type CrmModule = { name: string; blurb: string; image?: string };

export type AreaResult = { area: string; text: string };

export type Integration = { name: string; desc: string };

export type StackItem = { name: string; note: string };

export type StackGroup = { label: string; items: StackItem[] };

export type StackPrinciple = { title: string; text: string };
