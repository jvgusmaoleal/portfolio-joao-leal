import type { ProcessStep, Project, Stat } from "./types";
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
    highlights: [
      "7 módulos · 23 tabelas · 6+ usuários diários",
      "Integrações: Microsoft 365, Claude Vision, ShipServ, SendPulse",
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
      "Agência digital onde aplico vibe coding em escala comercial: sites vendidos e entregues, e-mail marketing, recepcionista de IA e consultoria de GEO (aparecer nas respostas das IAs).",
    highlights: [
      "Clientes: odontologia, hospitais de oftalmologia, restaurantes, cursos e ortopedia",
      "Do site institucional à automação de atendimento com IA",
    ],
    links: [
      { label: "Visitar site", href: site.links.drakesSite, external: true },
    ],
  },
  {
    id: "ortho",
    badge: "Sócio",
    name: "Orthotechniques",
    description:
      "Na operação da Orthotechniques, vibe coding é ferramenta do dia a dia: sistemas e automações internas construídos conforme a necessidade do negócio aparece.",
    highlights: [
      "Tecnologia aplicada à rotina da empresa, sem depender de fornecedor externo",
    ],
    links: [
      { label: "Visitar site", href: site.links.orthoSite, external: true },
    ],
  },
];

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
