import type { AreaResult, CrmModule, Integration } from "./types";
import { site } from "./site";

export const crm = {
  cmd: "cat caso-costa-maritime.md",
  title: "Do papel à produção: o CRM que roda a Costa Maritime",
  subtitle:
    "Como uma pessoa, com IA no processo, construiu em ~4 meses o sistema que hoje atende comercial, operações, financeiro e suprimentos de uma empresa de serviços marítimos.",

  problem: {
    heading: "O problema",
    paragraphs: [
      "A Costa Maritime atende navios em portos brasileiros — cotações chegam por e-mail, viram propostas, propostas aprovadas viram ordens de serviço, e tudo precisa ser faturado. Esse fluxo vivia espalhado em planilhas, caixas de entrada e documentos soltos.",
      "Cada área tinha seu pedaço da informação: o comercial não via a execução, a operação não via o que foi vendido, o financeiro cobrava atrás dos dois. Retrabalho, follow-ups perdidos e zero visão de funil.",
    ],
  },

  modules: [
    {
      name: "Dashboard",
      blurb:
        "Metas mensais ao vivo (MTD), comparativo produtos vs serviços e extração de vendas a partir de um print — a IA lê a imagem e lança os dados.",
      image: "dashboard.png",
    },
    {
      name: "Propostas",
      blurb:
        "Kanban do rascunho à aprovação, com follow-up progressivo (24h a 30 dias), markups por tipo de cliente e importação colando do Excel.",
      image: "propostas.png",
    },
    {
      name: "Documentos",
      blurb:
        "Proposta aprovada dispara a esteira: PDF gerado, arquivado no OneDrive, e-mail ao financeiro e card criado na operação. Sem toque humano.",
      image: "documentos.png",
    },
    {
      name: "Operacional",
      blurb:
        "Kanban de execução com ordens de serviço (fainas) tarefa a tarefa: anexos, tags, controle de executado e do que vai para faturamento.",
      image: "operacional.png",
    },
    {
      name: "Contatos",
      blurb:
        "Empresas, contatos e histórico de interações — a base que alimenta propostas e campanhas de prospecção.",
      image: "contatos.png",
    },
    {
      name: "Port Costs",
      blurb:
        "Tabela de custos portuários em duas camadas (serviços e fornecedores), com câmbio USD/BRL atualizado automaticamente.",
      image: "portcosts.png",
    },
    {
      name: "ShipServ",
      blurb:
        "RFQs que chegam por e-mail são monitoradas e viram proposta com um clique — a caixa de entrada deixou de ser gargalo.",
      image: "shipserv.png",
    },
  ] satisfies CrmModule[],

  stack: {
    heading: "Stack e integrações",
    decisions: [
      "Frontend em JavaScript puro — decisão deliberada: zero dependências npm no núcleo, carregamento instantâneo e manutenção simples.",
      "Proxy em Node.js fazendo a ponte segura com a Microsoft Graph API.",
      "Supabase (PostgreSQL, região São Paulo) com 23 tabelas e migrações versionadas.",
      "Frontend na Vercel, proxy no Railway — deploy contínuo via GitHub.",
    ],
    integrations: [
      {
        name: "Microsoft Graph",
        desc: "planilha de IDs no SharePoint, PDFs no OneDrive, e-mails do financeiro e operacional",
      },
      {
        name: "Claude Vision",
        desc: "extração de dados de imagens de cotações — print vira registro estruturado",
      },
      { name: "ShipServ", desc: "monitoramento de RFQs via parsing de e-mails" },
      { name: "SendPulse", desc: "campanhas de prospecção segmentadas" },
      { name: "AwesomeAPI", desc: "cotação USD/BRL em tempo real" },
    ] satisfies Integration[],
  },

  aiProcess: {
    heading: "IA no processo",
    paragraphs: [
      "O sistema foi construído em 28 fases documentadas entre abril e julho de 2026 — cada fase com spec, implementação e validação com os usuários reais.",
      "Vibe coding aqui não é gerar código às cegas: é usar IA para transformar conversa com usuário em spec, spec em tela funcionando, e feedback em iteração — no mesmo dia. É o que permite uma pessoa entregar o que normalmente pediria uma equipe.",
    ],
    facts: [
      "28 fases de desenvolvimento em ~4 meses",
      "~30 documentos internos de especificação",
      "Testes unitários nos fluxos críticos",
      "Extração por IA (Claude Vision) embutida no produto final",
    ],
  },

  results: {
    heading: "O que mudou, área por área",
    areas: [
      {
        area: "Comercial",
        text: "Funil de propostas com follow-up automático progressivo e metas acompanhadas ao vivo no dashboard.",
      },
      {
        area: "Operações",
        text: "Ordens de serviço tarefa a tarefa, com anexos e status — o kanban substituiu a planilha paralela.",
      },
      {
        area: "Financeiro",
        text: "Aprovação de proposta gera PDF e e-mail automaticamente; faturamento rastreado item a item.",
      },
      {
        area: "Suprimentos",
        text: "RFQs do ShipServ viram propostas em um clique; custos portuários centralizados e sempre atualizados.",
      },
    ] satisfies AreaResult[],
    extra:
      "Além do CRM, o site institucional da Costa Maritime também foi construído com vibe coding — a presença digital completa da empresa, de ponta a ponta.",
    siteUrl: site.links.costaSite,
  },
};
