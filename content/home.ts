import type { Project, StackGroup, StackPrinciple, Stat } from "./types";
import { site } from "./site";

export const hero = {
  cmd: "whoami",
  headline: "João Leal",
  role: "Product Builder",
  sub: "Construo os sistemas que rodam meus dois negócios e a operação de clientes como a Costa Maritime. Com IA no processo, entrego sozinho o que antes pedia uma equipe.",
  ctaPrimary: { label: "Ver projetos", href: "#projetos" },
  ctaSecondary: { label: "Contato", href: "#contato" },
};

export const stats: Stat[] = [
  { value: "3", label: "negócios construídos como sócio ou builder" },
  { value: "4", label: "áreas de negócio atendidas por um único sistema" },
  { value: "6+", label: "pessoas usando todos os dias" },
  { value: "28.000+", label: "linhas de código em produção" },
];

export const projects: Project[] = [
  {
    id: "crm",
    badge: "Caso principal · Em produção",
    name: "Costa Maritime — CRM + site",
    description:
      "CRM completo construído do zero para uma empresa de serviços marítimos: propostas, operação e faturamento no mesmo fluxo, mais o site institucional. Antes, proposta era montada no Excel e o total do mês fechava por prints numa conversa fixa do ChatGPT.",
    visual: "arch",
    highlights: [
      "Uma pessoa, 4 meses: 7 módulos e 23 tabelas em produção",
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
      "Agência que mede quanto custa cada cliente novo. É onde aplico o método em escala comercial, da proposta ao site no ar.",
    highlights: [
      "Squads de agents no fluxo comercial: o time revisa proposta e conteúdo já gerados",
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
      "Comunidade de educação médica que ensina cirurgia de joelho a ortopedistas. Sou o builder do lado técnico, da captação à plataforma da comunidade e à gestão.",
    highlights: [
      "Funil e site de captação da lista de interesse",
      "E-mail marketing pra nutrir o interesse até virar aluno",
    ],
    links: [
      { label: "Ler a história", href: "/socio#ortho" },
      { label: "Visitar site", href: site.links.orthoSite, external: true },
    ],
  },
  {
    id: "making-of",
    badge: "Bônus",
    name: "Como este site foi construído",
    description:
      "Um estudo de caso do próprio portfólio: o método que usei pra construir este site, do brainstorm ao deploy, com specs, planos e commits abertos no repositório.",
    highlights: [
      "O pipeline de skills: brainstorm → spec → plano → subagentes → verificação",
      "Da spec ao site no ar em menos de 24 horas",
      "Tudo público e verificável no repositório",
    ],
    links: [
      { label: "Ler o making-of", href: "/making-of" },
      { label: "Ver o repositório", href: site.links.repo, external: true },
    ],
  },
];

export const stack = {
  intro:
    "Ferramenta nova se aprende no meio do projeto. O que eu trago pronto é o processo: transformar problema de negócio em spec, spec em tela funcionando, tela em produção. A IA acelera cada etapa; a engenharia segura o resultado. A primeira versão navegável sai em dias, e as decisões acontecem em cima da tela, não de um documento.",
  groups: [
    {
      label: "frontend",
      items: [
        {
          name: "JavaScript puro",
          note: "o núcleo do CRM da Costa roda sem nenhuma dependência npm",
        },
        {
          name: "Next.js + TypeScript + Tailwind",
          note: "este portfólio: estático, tipado, gerado inteiro no build",
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
          note: "banco do CRM inteiro em migrações versionadas",
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
          note: "print de cotação entra no banco como dado estruturado",
        },
        {
          name: "E-mail marketing sem ESP",
          note: "envio direto pela Azure/Graph via proxy, com relatórios automáticos",
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
          note: "cada mudança nasce de spec aprovada e termina verificada",
        },
        {
          name: "Disciplina embutida no agente",
          note: "TDD, debugging sistemático e verificação antes de concluir",
        },
        {
          name: "Memória de projeto",
          note: "regras e incidentes viram skills próprias que voltam no contexto da sessão seguinte",
        },
      ],
    },
  ] satisfies StackGroup[],
  principles: [
    {
      title: "Spec antes de código",
      text: "28 fases e ~30 specs internas em 4 meses. Cada fase entra desenhada e sai validada com quem usa.",
    },
    {
      title: "Teste onde o erro custa caro",
      text: "11 arquivos de teste no CRM; o parser de PDFs nasceu test-first contra documentos reais. Até a assinatura de e-mail tem teste.",
    },
    {
      title: "Produção com consequência",
      text: "Gente de quatro áreas depende do sistema. Problema que aparece é diagnosticado, resolvido e vira documentação.",
    },
    {
      title: "Memória institucional",
      text: "Cada fase vira histórico, cada incidente vira regra escrita. O conhecimento fica na empresa e o sistema não regride.",
    },
  ] satisfies StackPrinciple[],
  outro: {
    lead: "Este portfólio, aliás, saiu do mesmo método.",
    linkText: "Leia o making-of.",
    href: "/making-of",
  },
};
