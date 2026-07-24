import type {
  ArtifactCard,
  BackstageStory,
  PipelineStep,
  TimelineChapter,
} from "./types";
import { site } from "./site";

// deep link para um arquivo do repo, na branch main
const gh = (path: string) => `${site.links.repo}/blob/main/${path}`;

export const hero = {
  cmd: "git init joaoleal.dev",
  title: "Como este site foi construído",
  subtitle:
    "Um bônus: o portfólio documentando a própria construção. Do brainstorm ao deploy, o processo inteiro está aqui — e tudo é público, no repositório, commit a commit.",
};

export const challenge = {
  cmd: "cat desafio.md",
  title: "O produto é o método",
  paragraphs: [
    "Um portfólio de product builder tem um problema honesto: qualquer um diz que domina IA. A prova não é a tela bonita — é o processo que fez a tela existir e continuar de pé em produção.",
    "Então a decisão foi construir este site com o mesmo método que ele descreve, e deixar o rastro aberto: spec, plano, execução e revisão, tudo commitado no repositório público. Esta página é o tour por esse rastro.",
  ],
};

export const pipeline = {
  cmd: "cat pipeline.md",
  title: "O pipeline, etapa por etapa",
  intro: [
    "Nada aqui foi \"pedir código pra IA e colar\". Cada mudança passou por um fluxo fixo de skills encadeadas, com pontos de decisão que são meus, não do agente.",
  ],
  steps: [
    {
      label: "brainstorming",
      text: "Antes de qualquer código, uma conversa guiada transforma a ideia em requisito. Eu aprovo o design antes de seguir — nenhuma linha nasce sem esse aceite.",
    },
    {
      label: "spec + self-review",
      text: "O design aprovado vira um documento de especificação, que passa por uma auto-revisão (placeholders, contradições, escopo) antes de ser commitado em docs/superpowers/specs/.",
    },
    {
      label: "plano em tasks",
      text: "A spec vira um plano com tarefas pequenas, cada uma com o código e o comando de verificação. É o mapa que um executor segue sem precisar de contexto meu.",
    },
    {
      label: "execução por subagentes",
      text: "Cada tarefa é executada por um subagente novo, com revisão em duas etapas: primeiro a conformidade com a spec, depois a qualidade do código. O que não passa, volta.",
    },
    {
      label: "humanizer na copy",
      text: "Todo texto do site passa por uma skill que remove marcas de escrita de IA. Eu aprovo cada ajuste — a voz do portfólio é minha, não do gerador.",
    },
    {
      label: "verificação antes de concluir",
      text: "Nada é dado como pronto sem evidência: build, lint e o olho no browser. Só depois vem o commit.",
    },
  ] satisfies PipelineStep[],
  tools: [
    "Claude Code no fluxo diário",
    "skills encadeadas (superpowers)",
    "memória de projeto que vira regra escrita",
    "git worktrees pra isolar o trabalho",
  ],
};

export const timeline: TimelineChapter[] = [
  {
    title: "Do brainstorm ao plano",
    note: "Da spec ao plano em 10 minutos: desenho antes de qualquer código.",
    commits: [
      { hash: "63fed5f", date: "22/07 17:16", message: "docs: spec do portfólio V1 (design aprovado em brainstorming)" },
      { hash: "1f77b05", date: "22/07 17:26", message: "docs: plano de implementacao V1 (16 tasks)" },
    ],
  },
  {
    title: "Fundação: sistema antes das telas",
    note: "Tokens, conteúdo tipado e componentes base — a estrutura primeiro.",
    commits: [
      { hash: "daa5a67", date: "22/07 17:50", message: "chore: scaffold Next.js + TS + Tailwind" },
      { hash: "17c93d7", date: "22/07 18:02", message: "feat: design tokens dark/ambar, fontes Inter + JetBrains Mono" },
      { hash: "9d9eca0", date: "22/07 18:44", message: "feat: conteudo tipado (site, home, caso crm)" },
    ],
  },
  {
    title: "Home e o caso /crm",
    note: "Home escaneável e o estudo de caso do CRM, seção a seção.",
    commits: [
      { hash: "6e0b324", date: "22/07 19:12", message: "feat: home hero + prova em numeros" },
      { hash: "6700d80", date: "22/07 22:30", message: "feat: /crm hero e problema" },
      { hash: "26bf84e", date: "22/07 23:04", message: "feat: /crm stack + diagrama ascii" },
    ],
  },
  {
    title: "SEO, acessibilidade e no ar",
    note: "SEO, humanizer na copy e o domínio próprio: no ar no dia seguinte.",
    commits: [
      { hash: "7480d05", date: "23/07 09:55", message: "feat: seo completo, og image, favicon, analytics, sitemap" },
      { hash: "33a724b", date: "23/07 11:42", message: "style: passe humanizer no copy (11 ajustes aprovados pelo usuario)" },
      { hash: "99ee995", date: "23/07 15:54", message: "chore: dominio de producao joaoleal.dev (canonical/og/sitemap)" },
    ],
  },
  {
    title: "Prova real: prints com dados fictícios",
    note: "Prints reais com dados mascarados na camada de rede — e 86% mais leves.",
    commits: [
      { hash: "4f10ca6", date: "23/07 22:38", message: "feat: prints reais do CRM com dados ficticios (6 de 7 modulos)" },
      { hash: "9fef57c", date: "23/07 22:42", message: "perf: prints otimizados (2.6MB -> 0.37MB, -86%)" },
      { hash: "65a0dfc", date: "24/07 00:44", message: "feat: print do modulo Documentos + prints regerados com mascara na rede" },
    ],
  },
  {
    title: "Segundo caso: /socio",
    note: "Novo ciclo — brainstorm, spec, plano — e componentes extraídos pra reuso.",
    commits: [
      { hash: "22bfb32", date: "24/07 01:39", message: "docs: spec da pagina /socio (Socio & builder, Drakes + Ortho)" },
      { hash: "5bc72da", date: "24/07 01:55", message: "refactor: CaseHero e BackLink genericos (compartilhados por /crm e /socio)" },
    ],
  },
  {
    title: "Esta página",
    note: "O mesmo método documentando a si mesmo. Você está lendo o resultado.",
    commits: [
      { hash: "efa5abd", date: "24/07 02:11", message: "docs: spec da pagina /making-of (bonus: como o site foi construido)" },
    ],
  },
];

export const artifacts: ArtifactCard[] = [
  {
    name: "Spec do portfólio V1",
    role: "O design aprovado no brainstorming, antes da primeira linha de código.",
    href: gh("docs/superpowers/specs/2026-07-22-portfolio-design.md"),
  },
  {
    name: "Plano V1 (16 tasks)",
    role: "A spec quebrada em tarefas pequenas, cada uma com código e verificação.",
    href: gh("docs/superpowers/plans/2026-07-22-portfolio-v1.md"),
  },
  {
    name: "Spec da página /socio",
    role: "O ciclo do segundo caso do site, do mesmo jeito: desenho antes de codar.",
    href: gh("docs/superpowers/specs/2026-07-24-pagina-socio-design.md"),
  },
  {
    name: "Plano /socio (8 tasks)",
    role: "Plano da página dos negócios em que sou sócio, tarefa a tarefa.",
    href: gh("docs/superpowers/plans/2026-07-24-pagina-socio.md"),
  },
  {
    name: "Spec desta página",
    role: "A recursão: a especificação do /making-of que você está lendo agora.",
    href: gh("docs/superpowers/specs/2026-07-24-making-of-design.md"),
  },
  {
    name: "Plano desta página",
    role: "E o plano que a construiu — o mapa exato deste tour.",
    href: gh("docs/superpowers/plans/2026-07-24-making-of.md"),
  },
  {
    name: "AGENTS.md",
    role: "Regra nascida de um imprevisto: avisa toda sessão que o Next aqui não é o do treino da IA.",
    href: gh("AGENTS.md"),
  },
];

export const backstage: BackstageStory[] = [
  {
    title: "Mascarar no DOM não bastava",
    paragraphs: [
      "Os prints do CRM precisavam de dados fictícios. A primeira tentativa trocava o texto na tela — e falhava: o sistema re-renderiza e restaura o dado real no meio da captura.",
      "A solução foi mascarar uma camada antes: interceptar as respostas da API e reescrevê-las antes de chegarem no app. Ainda assim, cada imagem foi revisada a olho antes de publicar. Foi assim que os vazamentos foram pegos.",
    ],
  },
  {
    title: "O framework mudou embaixo do plano",
    paragraphs: [
      "O plano assumia uma versão do Next.js; o scaffold instalou a seguinte, com convenções diferentes. Em vez de brigar com o agente, a lição virou arquivo.",
      "O AGENTS.md passou a avisar toda sessão: leia a doc da versão instalada antes de escrever código. O imprevisto virou regra permanente.",
    ],
  },
  {
    title: "A voz é minha, não do gerador",
    paragraphs: [
      "IA escreve rápido, mas com tiques reconhecíveis. Toda a copy passou por uma skill que caça essas marcas — foram 11 ajustes só na primeira passada, aprovados um a um.",
      "O critério de o que soa como eu continua sendo meu. O agente propõe; eu decido.",
    ],
  },
  {
    title: "Nenhuma sessão começa do zero",
    paragraphs: [
      "Cada incidente que custou caro virou memória escrita: o OneDrive segurando lock de arquivo no install, o proxy da Cloudflare conflitando com o SSL da Vercel.",
      "Da próxima vez, o problema já vem resolvido no contexto. O conhecimento fica no projeto, não na minha cabeça.",
    ],
  },
];

export const recursion = {
  cmd: "git remote -v",
  title: "Feito à vista de todos",
  paragraphs: [
    "Esta página não descreve o método de fora: ela saiu dele. Brainstorm, spec e plano commitados, execução por tarefas, verificação antes do commit — o mesmo fluxo dos outros dois casos.",
    "E tudo está aberto. O repositório é público: dá pra ler cada spec, cada plano e cada commit que levou a este parágrafo.",
  ],
};

export const ctaPrompt = "quer construir assim no seu produto?";
