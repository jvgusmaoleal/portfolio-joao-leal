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

export type ContactChannel = { label: string; href: string; handle: string };

export type CrmModule = { name: string; blurb: string; image?: string };

export type AreaResult = { area: string; text: string };

export type Integration = { name: string; desc: string };

export type StackItem = { name: string; note: string };

export type StackGroup = { label: string; items: StackItem[] };

export type StackPrinciple = { title: string; text: string };

export type SocioItem = {
  name: string;
  detail: string;
  stack?: string[]; // peças/tecnologias, quando fizer sentido (ex.: recepcionista de IA)
};

export type SocioBlock = {
  heading: string;
  items: SocioItem[];
};

export type SocioBusiness = {
  id: string; // "drakes" | "ortho" — vira a âncora da Section
  cmd: string;
  name: string;
  intro: string[];
  blocks?: SocioBlock[];
  sectors?: string[];
  note?: string;
  link: { label: string; href: string };
};

export type TimelineCommit = {
  hash: string;    // hash curto real, ex.: "63fed5f"
  date: string;    // ex.: "22/07 17:16"
  message: string; // mensagem real do commit
};

export type TimelineChapter = {
  title: string;             // ex.: "Do brainstorm ao plano"
  note: string;              // 1 linha de narrativa (vira comentário no log)
  commits: TimelineCommit[];
};

export type PipelineStep = { label: string; text: string };

export type ArtifactCard = {
  name: string; // ex.: "Spec do portfólio V1"
  role: string; // papel no processo
  href: string; // deep link para o arquivo no GitHub
};

export type BackstageStory = { title: string; paragraphs: string[] };
