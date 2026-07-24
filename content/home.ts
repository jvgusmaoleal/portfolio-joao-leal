import type {
  ProcessStep,
  Project,
  StackGroup,
  StackPrinciple,
  Stat,
} from "./types";
import { site } from "./site";

export const hero = {
  cmd: "whoami",
  headline: "João Leal",
  role: "Product Builder",
  sub: "Construo produtos que geram receita real, com IA no centro do processo. Do primeiro protótipo à produção que a empresa inteira usa.",
  ctaPrimary: { label: "Ver projetos", href: "#projetos" },
  ctaSecondary: { label: "Contato", href: "#contato" },
};

export const stats: Stat[] = [
  { value: "28.000+", label: "linhas de código em produção" },
  { value: "4", label: "áreas de negócio atendidas por um único sistema" },
  { value: "6+", label: "pessoas usando todos os dias" },
  { value: "3", label: "negócios construídos como sócio ou builder" },
];

export const projects: Project[] = [
  {
    id: "crm",
    badge: "Caso principal · Em produção",
    name: "Costa Maritime — CRM + site",
    description:
      "CRM completo construído do zero para uma empresa de serviços marítimos: propostas, operação e faturamento no mesmo fluxo, mais o site institucional. Uma pessoa, quatro meses, a empresa inteira dentro.",
    visual: "arch",
    highlights: [
      "7 módulos · 23 tabelas · 6+ usuários diários",
      "Integrações: Microsoft Graph, Claude Vision, ShipServ, e-mail de prospecção",
      "Automação: proposta aprovada → PDF → OneDrive → e-mail → operação",
    ],
    links: [
      { label: "Ler estudo de caso", href: "/crm" },
      { label: "Site da Costa", href: site.links.costaSite, external: true },
    ],
  },
  {
    id: "drakes",
    badge: "Sócio",
    name: "Drakes Company",
    description:
      "Agência que mede custo por cliente, não curtida. É onde aplico vibe coding em escala comercial: squads de agents que geram proposta e conteúdo, recepcionista de IA no WhatsApp e sites que convertem.",
    highlights: [
      "Squads de agents no fluxo comercial: proposta e conteúdo gerados e revisados, não do zero",
      "Recepcionista de IA que atende e agenda no WhatsApp, pensada pra clínicas",
      "Setores atendidos: educação, saúde, software, logística e audiovisual",
    ],
    links: [
      { label: "Ler a história", href: "/socio#drakes" },
      { label: "Visitar site", href: site.links.drakesSite, external: true },
    ],
  },
  {
    id: "ortho",
    badge: "Sócio",
    name: "Orthotechniques",
    description:
      "Comunidade de educação médica que ensina cirurgia de joelho a ortopedistas. Sou o builder do lado técnico: funil de captação, plataforma da comunidade, e-mail marketing e gestão.",
    highlights: [
      "Funil e site de captação da lista de interesse",
      "E-mail marketing pra nutrir o interesse até virar aluno",
    ],
    links: [
      { label: "Ler a história", href: "/socio#ortho" },
      { label: "Visitar site", href: site.links.orthoSite, external: true },
    ],
  },
];

export const stack = {
  intro:
    "Ferramenta nova se aprende no meio do projeto. O que eu trago pronto é o processo: transformar problema de negócio em spec, spec em tela funcionando, tela em produção — com IA acelerando cada etapa e engenharia segurando a qualidade.",
  groups: [
    {
      label: "frontend",
      items: [
        {
          name: "JavaScript puro",
          note: "28.000+ linhas em produção no CRM, decisão deliberada: zero dependência no núcleo",
        },
        {
          name: "Next.js + TypeScript + Tailwind",
          note: "este portfólio: estático, tipado, Lighthouse 95+",
        },
        {
          name: "PDF no navegador (jsPDF)",
          note: "propostas comerciais saem prontas, com a identidade da marca",
        },
      ],
    },
    {
      label: "backend & dados",
      items: [
        {
          name: "Node.js",
          note: "proxy de integrações rodando 24/7 no Railway",
        },
        {
          name: "Supabase (PostgreSQL)",
          note: "23 tabelas, migrações versionadas no repositório",
        },
        {
          name: "Vercel + Railway + GitHub",
          note: "deploy contínuo dos dois lados desde o primeiro mês",
        },
      ],
    },
    {
      label: "integrações",
      items: [
        {
          name: "Microsoft Graph / 365",
          note: "PDF no OneDrive, planilha no SharePoint, e-mail automático para financeiro e operação",
        },
        {
          name: "Claude API + Vision",
          note: "print de cotação vira registro estruturado no banco",
        },
        {
          name: "E-mail marketing sem ESP",
          note: "envio pela Azure/Graph via proxy: remetente real, domínio protegido, relatórios automáticos",
        },
        {
          name: "ShipServ + AwesomeAPI",
          note: "RFQs monitoradas a cada 30 min; câmbio USD/BRL ao vivo",
        },
      ],
    },
    {
      label: "ia no fluxo",
      items: [
        {
          name: "Claude Code todos os dias",
          note: "skills encadeadas: brainstorming → spec → plano → execução por subagentes",
        },
        {
          name: "Disciplina embutida no agente",
          note: "TDD, debugging sistemático e verificação antes de concluir",
        },
        {
          name: "Memória de projeto",
          note: "regras e incidentes viram skills próprias: nenhuma sessão começa do zero",
        },
      ],
    },
  ] satisfies StackGroup[],
  principles: [
    {
      title: "Spec antes de código",
      text: "28 fases documentadas em ~4 meses, ~30 specs no repositório. Cada fase: spec, implementação, validação com quem usa.",
    },
    {
      title: "Teste onde o erro custa caro",
      text: "11 arquivos de teste no CRM; o parser de PDFs nasceu test-first contra documentos reais — até a assinatura de e-mail tem teste.",
    },
    {
      title: "Produção de verdade",
      text: "6+ pessoas dependem do sistema todo dia. Problema real aparece, é diagnosticado, resolvido e vira documentação.",
    },
    {
      title: "Memória institucional",
      text: "Cada fase vira histórico, cada incidente vira regra escrita. O conhecimento fica na empresa — e o sistema não regride.",
    },
  ] satisfies StackPrinciple[],
  outro:
    "Uma pessoa com esse processo entrega o que antes pedia uma equipe — na velocidade da conversa, com rastro de engenharia. Este portfólio, aliás, saiu do mesmo método.",
};

export const processSteps: ProcessStep[] = [
  {
    cmd: "entender",
    title: "Mergulhar no negócio",
    text: "Antes do código: quem usa, o que dói, o que vale dinheiro. O produto certo nasce do problema certo.",
  },
  {
    cmd: "prototipar",
    title: "Primeira versão em dias",
    text: "Com IA no fluxo de trabalho, a primeira versão navegável sai em dias. As decisões acontecem em cima de tela real, não de documento.",
  },
  {
    cmd: "iterar",
    title: "Feedback de gente de verdade",
    text: "Usuários reais usando, feedback direto, ajuste em ciclo curto. O produto evolui na velocidade da conversa.",
  },
  {
    cmd: "produzir",
    title: "Produção e evolução",
    text: "Integrações, dados reais, automação de ponta a ponta. E o produto continua evoluindo depois do lançamento.",
  },
];
