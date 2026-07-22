# Portfólio João Leal V1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar a V1 do portfólio de João Leal (home + estudo de caso `/crm` + 404) em Next.js estático com estética dark terminal âmbar, deployado na Vercel.

**Architecture:** Site 100% estático (SSG) em Next.js App Router. Conteúdo em arquivos TypeScript tipados (`content/`), separados dos componentes visuais (`components/`). Páginas compõem seções; nenhum backend, nenhuma rota de API na V1.

**Tech Stack:** Next.js 15 (App Router) · TypeScript estrito · Tailwind CSS v4 · next/font (Inter + JetBrains Mono) · @vercel/analytics · deploy Vercel.

**Spec:** `docs/superpowers/specs/2026-07-22-portfolio-design.md`

**Referência de identidade visual (mockups aprovados):** `.superpowers/brainstorm/869-1784749986/content/accent-color.html` (opção B âmbar) e `estrutura.html` (opção B hub+casos).

**Paleta aprovada:**

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#0c0a09` | fundo da página |
| `surface` | `#17140f` | cards, janelas de terminal |
| `line` | `#292524` | bordas |
| `ink` | `#fafaf9` | texto principal |
| `mute` | `#a8a29e` | texto secundário |
| `amber` | `#fbbf24` | destaque da marca |
| `amber-soft` | `#fcd34d` | hover/realces suaves |

**Nota Windows/OneDrive:** o projeto vive dentro do OneDrive. Se `npm install` ficar lento ou travar por lock de arquivos, pausar a sincronização do OneDrive durante a instalação resolve.

---

### Task 0: Coletar dados reais do usuário (bloqueante)

Nenhum arquivo criado — só coleta. Os valores entram em `content/site.ts` na Task 3.

- [ ] **Step 0.1: Perguntar ao usuário (via AskUserQuestion ou chat) os valores abaixo e anotar as respostas:**

1. URL do site da **Costa Maritime** (no ar)
2. URL do site da **Drakes Company** (provável `https://drakescompany.com` — confirmar)
3. URL do site da **Orthotecniques**
4. Número de **WhatsApp** para contato profissional (formato internacional, ex: `5511999999999`)
5. URL do perfil **LinkedIn**
6. E-mail de contato público (default: `contato@drakescompany.com` — confirmar)
7. Arquivo do **avatar** (ilustração P&B): pedir para salvar em `public/avatar.png` (mínimo 800×800). Pode chegar depois — a Task 14 integra.

**Se alguma resposta não vier agora:** seguir com os defaults marcados `// CONFIRMAR` no código da Task 3 e registrar pendência na Task 14.

---

### Task 1: Scaffold Next.js

**Files:**
- Create: projeto Next.js na raiz (`package.json`, `app/`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`)
- Modify: `.gitignore` (merge com o existente)

A raiz já contém `.git/`, `.gitignore`, `docs/` e `.superpowers/` — o `create-next-app` recusa diretório "sujo", então o scaffold é feito em subpasta e movido.

- [ ] **Step 1.1: Scaffold em subpasta temporária (sem instalar deps)**

Rodar no bash:

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal"
npx --yes create-next-app@latest ._scaffold --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --skip-install
```

Expected: pasta `._scaffold/` criada com `package.json`, `app/`, configs.

- [ ] **Step 1.2: Mover arquivos para a raiz e mesclar .gitignore**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal"
mv ._scaffold/.gitignore ./gitignore-next.tmp
shopt -s dotglob && mv ._scaffold/* . && rmdir ._scaffold
cat gitignore-next.tmp >> .gitignore && rm gitignore-next.tmp
```

Depois, abrir `.gitignore` com Edit e remover linhas duplicadas (ex: `node_modules/`, `.next/` aparecem 2×) — manter uma ocorrência de cada e garantir que `.superpowers/` continua listado.

- [ ] **Step 1.3: Instalar dependências**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && npm install
```

Expected: `node_modules/` criado sem erros.

- [ ] **Step 1.4: Verificar build do boilerplate**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && npm run build
```

Expected: `✓ Compiled successfully`, rota `/` estática.

- [ ] **Step 1.5: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js + TS + Tailwind"
```

---

### Task 2: Design tokens, fontes e layout raiz

**Files:**
- Modify: `app/globals.css` (substituir todo o conteúdo)
- Modify: `app/layout.tsx` (substituir todo o conteúdo)
- Delete: `app/page.tsx` será substituído na Task 5 (por ora, esvaziar para placeholder mínimo)

- [ ] **Step 2.1: Escrever `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-bg: #0c0a09;
  --color-surface: #17140f;
  --color-line: #292524;
  --color-ink: #fafaf9;
  --color-mute: #a8a29e;
  --color-amber: #fbbf24;
  --color-amber-soft: #fcd34d;

  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-jbmono), ui-monospace, "Cascadia Code", monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-bg);
  color: var(--color-ink);
}

::selection {
  background: var(--color-amber);
  color: var(--color-bg);
}
```

- [ ] **Step 2.2: Escrever `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jbMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  title: { default: "João Leal — Product Builder", template: "%s · João Leal" },
  description:
    "Construo produtos que geram receita real, com IA no centro do processo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jbMono.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2.3: Substituir `app/page.tsx` por placeholder mínimo**

```tsx
export default function Home() {
  return (
    <main className="p-8">
      <p className="font-mono text-amber">~/joao-leal $ em construção</p>
    </main>
  );
}
```

- [ ] **Step 2.4: Verificar visual**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && npm run build
```

Expected: build passa. Abrir preview (`npm run dev` via preview_start ou browser) e conferir: fundo quase-preto `#0c0a09`, texto âmbar em JetBrains Mono.

- [ ] **Step 2.5: Commit**

```bash
git add -A && git commit -m "feat: design tokens dark/ambar, fontes Inter + JetBrains Mono"
```

---

### Task 3: Conteúdo tipado (todo o copy do site)

**Files:**
- Create: `content/types.ts`
- Create: `content/site.ts`
- Create: `content/home.ts`
- Create: `content/crm.ts`

Todo o texto do site mora aqui. Componentes NUNCA contêm copy hardcoded. Valores vindos da Task 0 substituem os marcados `// CONFIRMAR`.

- [ ] **Step 3.1: Escrever `content/types.ts`**

```ts
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
```

- [ ] **Step 3.2: Escrever `content/site.ts`**

Substituir os valores `// CONFIRMAR` pelos coletados na Task 0.

```ts
import type { ContactChannel } from "./types";

export const site = {
  name: "João Leal",
  title: "Product Builder",
  url: "https://portfolio-joao-leal.vercel.app", // trocar pelo domínio final na Task 16
  description:
    "Construo produtos que geram receita real, com IA no centro do processo. Do primeiro protótipo à produção que a empresa inteira usa.",
  promptPath: "~/joao-leal",
  links: {
    costaSite: "https://SITE-DA-COSTA.com.br", // CONFIRMAR (Task 0)
    drakesSite: "https://drakescompany.com", // CONFIRMAR (Task 0)
    orthoSite: "https://SITE-DA-ORTHO.com.br", // CONFIRMAR (Task 0)
  },
  contacts: [
    {
      label: "E-mail",
      href: "mailto:contato@drakescompany.com", // CONFIRMAR (Task 0)
      handle: "contato@drakescompany.com",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/55XXXXXXXXXXX", // CONFIRMAR (Task 0)
      handle: "conversar agora",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/USUARIO", // CONFIRMAR (Task 0)
      handle: "/in/USUARIO",
    },
  ] satisfies ContactChannel[],
};
```

- [ ] **Step 3.3: Escrever `content/home.ts`**

```ts
import type { ProcessStep, Project, Stat } from "./types";
import { site } from "./site";

export const hero = {
  cmd: "whoami",
  headline: "João Leal",
  role: "Product Builder",
  sub: "Construo produtos que geram receita real — com IA no centro do processo. Do primeiro protótipo à produção que a empresa inteira usa.",
  ctaPrimary: { label: "Ver projetos", href: "#projetos" },
  ctaSecondary: { label: "Contato", href: "#contato" },
};

export const stats: Stat[] = [
  { value: "28.000+", label: "linhas de código em produção" },
  { value: "4", label: "áreas de empresa atendidas por um único sistema" },
  { value: "6+", label: "pessoas usando todos os dias" },
  { value: "3", label: "negócios construídos como sócio ou builder" },
];

export const projects: Project[] = [
  {
    id: "crm",
    badge: "Caso principal · Em produção",
    name: "Costa Maritime — CRM + site",
    description:
      "CRM completo construído do zero para uma empresa de serviços marítimos: propostas, operação e faturamento no mesmo fluxo — mais o site institucional. Uma pessoa, quatro meses, a empresa inteira dentro.",
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
      "Agência digital onde aplico vibe coding em escala comercial: sites vendidos e entregues, e-mail marketing, recepcionista de IA e consultoria de GEO — aparecer nas respostas das IAs.",
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
    name: "Orthotecniques",
    description:
      "Na operação da Orthotecniques, vibe coding é ferramenta do dia a dia: sistemas e automações internas construídos conforme a necessidade do negócio aparece.",
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
    text: "Com IA no fluxo de trabalho, a primeira versão navegável sai em dias — e as decisões passam a ser tomadas em cima de tela real, não de documento.",
  },
  {
    cmd: "iterar",
    title: "Feedback de gente de verdade",
    text: "Usuários reais usando, feedback direto, ajuste em ciclo curto. O produto evolui na velocidade da conversa.",
  },
  {
    cmd: "produzir",
    title: "Produção e evolução",
    text: "Integrações, dados reais, automação de ponta a ponta — e o produto continua evoluindo depois do lançamento.",
  },
];
```

- [ ] **Step 3.4: Escrever `content/crm.ts`**

```ts
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
```

- [ ] **Step 3.5: Verificar tipos**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3.6: Commit**

```bash
git add content/ && git commit -m "feat: conteudo tipado (site, home, caso crm)"
```

---

### Task 4: Componentes base de terminal

**Files:**
- Create: `components/terminal-prompt.tsx`
- Create: `components/section.tsx`
- Create: `components/terminal-window.tsx`
- Create: `components/external-link.tsx`

- [ ] **Step 4.1: Escrever `components/terminal-prompt.tsx`**

```tsx
import { site } from "@/content/site";

export function TerminalPrompt({
  cmd,
  className = "",
}: {
  cmd: string;
  className?: string;
}) {
  return (
    <p className={`font-mono text-sm ${className}`}>
      <span className="text-amber">{site.promptPath} $</span>{" "}
      <span className="text-mute">{cmd}</span>
    </p>
  );
}
```

- [ ] **Step 4.2: Escrever `components/section.tsx`**

```tsx
import { TerminalPrompt } from "./terminal-prompt";

export function Section({
  id,
  cmd,
  title,
  children,
}: {
  id?: string;
  cmd: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-8 px-5 py-14 sm:py-20">
      <TerminalPrompt cmd={cmd} />
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
```

- [ ] **Step 4.3: Escrever `components/terminal-window.tsx`** (moldura de janela com os 3 pontinhos — usada em diagrama, prints e hero)

```tsx
export function TerminalWindow({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-line bg-surface ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-amber/60" />
        {title ? (
          <span className="ml-2 font-mono text-xs text-mute">{title}</span>
        ) : null}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
```

- [ ] **Step 4.4: Escrever `components/external-link.tsx`**

```tsx
export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-amber underline-offset-4 transition-colors hover:text-amber-soft hover:underline ${className}`}
    >
      {children}
    </a>
  );
}
```

- [ ] **Step 4.5: Verificar tipos e commit**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && npx tsc --noEmit && git add components/ && git commit -m "feat: componentes base terminal (prompt, section, window, link)"
```

---

### Task 5: Home — Hero + números

**Files:**
- Create: `components/hero.tsx`
- Create: `components/stats-row.tsx`
- Modify: `app/page.tsx` (substituir todo o conteúdo)

- [ ] **Step 5.1: Escrever `components/hero.tsx`**

Nesta task o hero NÃO inclui o avatar — o arquivo `public/avatar.png` ainda não existe. A Task 14 (Step 14.3) substitui este componente pela versão com avatar. O hero desta task é completo e funcional sem ele.

```tsx
import { hero } from "@/content/home";
import { site } from "@/content/site";

export function Hero() {
  return (
    <header className="mx-auto max-w-5xl px-5 pb-10 pt-20 sm:pb-16 sm:pt-28">
      <p className="font-mono text-sm sm:text-base">
        <span className="text-amber">{site.promptPath} $</span>{" "}
        <span className="text-ink">{hero.cmd}</span>
      </p>
      <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
        {hero.headline}
      </h1>
      <p className="mt-1 font-mono text-xl font-semibold text-amber sm:text-2xl">
        {hero.role}
      </p>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
        {hero.sub}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={hero.ctaPrimary.href}
          className="rounded-md bg-amber px-5 py-2.5 font-mono text-sm font-bold text-bg transition-colors hover:bg-amber-soft"
        >
          {hero.ctaPrimary.label} →
        </a>
        <a
          href={hero.ctaSecondary.href}
          className="rounded-md border border-line px-5 py-2.5 font-mono text-sm text-amber-soft transition-colors hover:border-amber/50"
        >
          {hero.ctaSecondary.label}
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 5.2: Escrever `components/stats-row.tsx`**

```tsx
import { stats } from "@/content/home";

export function StatsRow() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface p-5">
            <dd className="font-mono text-2xl font-bold text-amber sm:text-3xl">
              {s.value}
            </dd>
            <dt className="mt-1 text-xs leading-snug text-mute sm:text-sm">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
```

- [ ] **Step 5.3: Substituir `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { StatsRow } from "@/components/stats-row";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsRow />
    </main>
  );
}
```

- [ ] **Step 5.4: Verificar visual (dev server)**

Subir preview e conferir em 375px e 1280px: hero legível, stats em grade 2×2 no mobile e 4 colunas no desktop, sem overflow horizontal.

- [ ] **Step 5.5: Commit**

```bash
git add -A && git commit -m "feat: home hero + prova em numeros"
```

---

### Task 6: Home — cards de projetos

**Files:**
- Create: `components/project-card.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 6.1: Escrever `components/project-card.tsx`**

```tsx
import Link from "next/link";
import type { Project } from "@/content/types";

function CardLink({
  link,
  primary,
}: {
  link: Project["links"][number];
  primary: boolean;
}) {
  const base = primary
    ? "rounded-md bg-amber px-4 py-2 font-mono text-xs font-bold text-bg hover:bg-amber-soft"
    : "rounded-md border border-line px-4 py-2 font-mono text-xs text-amber-soft hover:border-amber/50";
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} transition-colors`}
      >
        {link.label} ↗
      </a>
    );
  }
  return (
    <Link href={link.href} className={`${base} transition-colors`}>
      {link.label} →
    </Link>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-lg border border-line bg-surface p-6">
      <span className="w-fit rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-[11px] text-amber">
        {project.badge}
      </span>
      <h3 className="mt-4 text-xl font-bold">{project.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mute">
        {project.description}
      </p>
      <ul className="mt-4 space-y-1.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-mute">
            <span className="font-mono text-amber">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2 pt-2">
        {project.links.map((link, i) => (
          <CardLink key={link.href} link={link} primary={i === 0} />
        ))}
      </div>
    </article>
  );
}
```

- [ ] **Step 6.2: Adicionar seção de projetos em `app/page.tsx`**

```tsx
import { Hero } from "@/components/hero";
import { StatsRow } from "@/components/stats-row";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { projects } from "@/content/home";

export default function Home() {
  const [crmProject, ...otherProjects] = projects;
  return (
    <main>
      <Hero />
      <StatsRow />
      <Section id="projetos" cmd="ls projetos/" title="Projetos">
        <div className="grid gap-4">
          <ProjectCard project={crmProject} />
          <div className="grid gap-4 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
```

- [ ] **Step 6.3: Verificar visual + commit**

Conferir no preview: card CRM em destaque (largura cheia), Drakes/Ortho lado a lado no desktop e empilhados no mobile. Links externos abrem em nova aba.

```bash
git add -A && git commit -m "feat: home cards de projetos"
```

---

### Task 7: Home — como eu trabalho + contato

**Files:**
- Create: `components/process-steps.tsx`
- Create: `components/contact.tsx`
- Create: `components/site-footer.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx` (footer global)

- [ ] **Step 7.1: Escrever `components/process-steps.tsx`**

```tsx
import { processSteps } from "@/content/home";

export function ProcessSteps() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {processSteps.map((step, i) => (
        <li
          key={step.cmd}
          className="rounded-lg border border-line bg-surface p-5"
        >
          <p className="font-mono text-xs text-mute">
            [{i + 1}/{processSteps.length}]{" "}
            <span className="text-amber">$ {step.cmd}</span>
          </p>
          <h3 className="mt-2 font-bold">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-mute">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 7.2: Escrever `components/contact.tsx`**

```tsx
import { site } from "@/content/site";

export function Contact() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {site.contacts.map((c) => (
        <a
          key={c.label}
          href={c.href}
          target={c.href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="group rounded-lg border border-line bg-surface p-5 transition-colors hover:border-amber/50"
        >
          <p className="font-mono text-xs text-mute">$ open {c.label.toLowerCase()}</p>
          <p className="mt-2 font-mono text-sm text-amber group-hover:text-amber-soft">
            {c.handle}
          </p>
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 7.3: Escrever `components/site-footer.tsx`**

```tsx
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-5 py-8">
        <p className="font-mono text-xs text-mute">
          {site.name} · {site.title}
        </p>
        <p className="font-mono text-xs text-mute">
          feito com vibe coding <span className="text-amber">▮</span>
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 7.4: Adicionar seções em `app/page.tsx` e footer no `app/layout.tsx`**

`app/page.tsx` completo:

```tsx
import { Hero } from "@/components/hero";
import { StatsRow } from "@/components/stats-row";
import { ProjectCard } from "@/components/project-card";
import { ProcessSteps } from "@/components/process-steps";
import { Contact } from "@/components/contact";
import { Section } from "@/components/section";
import { projects } from "@/content/home";

export default function Home() {
  const [crmProject, ...otherProjects] = projects;
  return (
    <main>
      <Hero />
      <StatsRow />
      <Section id="projetos" cmd="ls projetos/" title="Projetos">
        <div className="grid gap-4">
          <ProjectCard project={crmProject} />
          <div className="grid gap-4 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </Section>
      <Section cmd="cat processo.md" title="Como eu trabalho">
        <ProcessSteps />
      </Section>
      <Section id="contato" cmd="./contato --agora" title="Vamos conversar?">
        <Contact />
      </Section>
    </main>
  );
}
```

No `app/layout.tsx`, importar e renderizar o footer após `{children}`:

```tsx
import { SiteFooter } from "@/components/site-footer";
// ... dentro do body:
//   {children}
//   <SiteFooter />
```

- [ ] **Step 7.5: Verificar home completa + commit**

Build + preview: rolagem completa da home funciona, âncoras `#projetos` e `#contato` navegam suave.

```bash
git add -A && git commit -m "feat: home processo + contato + footer"
```

---

### Task 8: `/crm` — estrutura, hero do caso e problema

**Files:**
- Create: `app/crm/page.tsx`
- Create: `components/crm/case-hero.tsx`
- Create: `components/crm/back-link.tsx`

- [ ] **Step 8.1: Escrever `components/crm/back-link.tsx`**

```tsx
import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/"
      className="font-mono text-sm text-mute transition-colors hover:text-amber"
    >
      ← cd ~/
    </Link>
  );
}
```

- [ ] **Step 8.2: Escrever `components/crm/case-hero.tsx`**

```tsx
import { crm } from "@/content/crm";
import { site } from "@/content/site";
import { BackLink } from "./back-link";

export function CaseHero() {
  return (
    <header className="mx-auto max-w-5xl px-5 pb-4 pt-14 sm:pt-20">
      <BackLink />
      <p className="mt-8 font-mono text-sm">
        <span className="text-amber">{site.promptPath} $</span>{" "}
        <span className="text-mute">{crm.cmd}</span>
      </p>
      <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
        {crm.title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
        {crm.subtitle}
      </p>
    </header>
  );
}
```

- [ ] **Step 8.3: Escrever `app/crm/page.tsx` (primeira versão: hero + problema)**

```tsx
import type { Metadata } from "next";
import { CaseHero } from "@/components/crm/case-hero";
import { Section } from "@/components/section";
import { crm } from "@/content/crm";

export const metadata: Metadata = {
  title: "Estudo de caso: CRM Costa Maritime",
  description: crm.subtitle,
};

export default function CrmCasePage() {
  return (
    <main>
      <CaseHero />
      <Section cmd="git log --reverse" title={crm.problem.heading}>
        <div className="max-w-2xl space-y-4">
          {crm.problem.paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="leading-relaxed text-mute">
              {p}
            </p>
          ))}
        </div>
      </Section>
    </main>
  );
}
```

- [ ] **Step 8.4: Verificar + commit**

Preview em `/crm`: hero e problema renderizam; link `← cd ~/` volta à home.

```bash
git add -A && git commit -m "feat: /crm hero e problema"
```

---

### Task 9: `/crm` — tour dos módulos + roteiro de prints

**Files:**
- Create: `components/crm/module-gallery.tsx`
- Create: `docs/prints-roteiro.md`
- Create: `public/crm/` (diretório, via `.gitkeep`)
- Modify: `app/crm/page.tsx`

- [ ] **Step 9.1: Escrever `components/crm/module-gallery.tsx`**

Enquanto os prints não existem em `public/crm/`, o componente mostra um placeholder estilizado (janela de terminal com o nome do módulo). A troca é automática: quando o arquivo do print existir, `hasImage` vira `true` na Task 14 (campo `image` já preenchido no content + arquivo presente).

```tsx
import Image from "next/image";
import { crm } from "@/content/crm";
import { TerminalWindow } from "@/components/terminal-window";
import { existsSync } from "node:fs";
import { join } from "node:path";

function printExists(file?: string): boolean {
  if (!file) return false;
  return existsSync(join(process.cwd(), "public", "crm", file));
}

export function ModuleGallery() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {crm.modules.map((mod) => {
        const has = printExists(mod.image);
        return (
          <TerminalWindow key={mod.name} title={`modulo: ${mod.name.toLowerCase()}`}>
            {has && mod.image ? (
              <Image
                src={`/crm/${mod.image}`}
                alt={`Tela do módulo ${mod.name} do CRM`}
                width={1280}
                height={800}
                className="rounded border border-line"
              />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded border border-dashed border-line">
                <p className="font-mono text-xs text-mute">
                  $ carregando print de {mod.name.toLowerCase()}...
                </p>
              </div>
            )}
            <h3 className="mt-4 font-bold">{mod.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-mute">{mod.blurb}</p>
          </TerminalWindow>
        );
      })}
    </div>
  );
}
```

Nota: `existsSync` roda só no build/servidor (Server Component) — em site estático isso é resolvido em build time, zero custo no cliente.

- [ ] **Step 9.2: Criar `public/crm/.gitkeep`** (arquivo vazio) para versionar o diretório.

- [ ] **Step 9.3: Escrever `docs/prints-roteiro.md`**

```markdown
# Roteiro de prints do CRM (dados fictícios)

Resolução: janela do navegador em 1440px de largura. Tema/estado real do sistema.
Antes de capturar: carregar dados de demonstração (sem nomes reais de clientes,
valores reais ou e-mails reais). Salvar em `public/crm/` com os nomes EXATOS abaixo.

| Arquivo | Tela | O que mostrar |
|---|---|---|
| `dashboard.png` | Dashboard | gauge de meta MTD preenchido, top 5 serviços |
| `propostas.png` | Propostas (kanban) | colunas com 2-3 cards cada, badges de follow-up |
| `documentos.png` | Preview de proposta | template v2 com dados fictícios |
| `operacional.png` | Kanban operacional | card aberto com tarefas/faina visíveis |
| `contatos.png` | Contatos | lista com filtros visíveis |
| `portcosts.png` | Port Costs | tabela com serviços e câmbio |
| `shipserv.png` | Inbox ShipServ | 2-3 RFQs na lista |

Checklist de dados fictícios: navios "MV Atlantico", "MV Horizonte"; clientes
"Oceanic Shipping Ltd", "Mar Azul Navegação"; valores redondos (US$ 1.500,00).
```

- [ ] **Step 9.4: Adicionar a galeria em `app/crm/page.tsx`** (após a seção do problema):

```tsx
import { ModuleGallery } from "@/components/crm/module-gallery";
// ... após a Section do problema:
      <Section cmd="ls modulos/" title="A solução: 7 módulos, um fluxo">
        <ModuleGallery />
      </Section>
```

- [ ] **Step 9.5: Verificar + commit**

Preview: 7 janelas de terminal com placeholders elegantes (aspect-video, borda tracejada).

```bash
git add -A && git commit -m "feat: /crm tour de modulos + roteiro de prints"
```

---

### Task 10: `/crm` — stack e diagrama de arquitetura

**Files:**
- Create: `components/crm/arch-diagram.tsx`
- Create: `components/crm/stack-list.tsx`
- Modify: `app/crm/page.tsx`

- [ ] **Step 10.1: Escrever `components/crm/arch-diagram.tsx`**

Diagrama ASCII em JetBrains Mono dentro de uma TerminalWindow — on-brand e zero dependências. `overflow-x-auto` garante mobile.

```tsx
import { TerminalWindow } from "@/components/terminal-window";

const DIAGRAM = String.raw`
 ┌─────────────────┐         ┌──────────────────┐
 │    FRONTEND     │  HTTPS  │    PROXY NODE    │
 │   vanilla JS    │────────▶│     (Railway)    │
 │    (Vercel)     │         └────────┬─────────┘
 └───────┬─────────┘                  │
         │                     Microsoft Graph
         ▼                    ┌───────┴────────┐
 ┌─────────────────┐          │ SharePoint IDs │
 │    SUPABASE     │          │ OneDrive PDFs  │
 │ Postgres · 23 t │          │ E-mail fin/op  │
 └───────┬─────────┘          └────────────────┘
         │
   ┌─────┴──────┬─────────────┬──────────────┐
   ▼            ▼             ▼              ▼
 Claude      ShipServ     SendPulse     AwesomeAPI
 Vision     (RFQ mail)   (campanhas)    (USD/BRL)
`;

export function ArchDiagram() {
  return (
    <TerminalWindow title="arquitetura.txt">
      <pre
        aria-label="Diagrama: frontend na Vercel fala com proxy Node no Railway e com Supabase; proxy integra Microsoft Graph; sistema usa Claude Vision, ShipServ, SendPulse e AwesomeAPI"
        className="overflow-x-auto font-mono text-[11px] leading-relaxed text-mute sm:text-xs [&_b]:text-amber"
      >
        {DIAGRAM}
      </pre>
    </TerminalWindow>
  );
}
```

- [ ] **Step 10.2: Escrever `components/crm/stack-list.tsx`**

```tsx
import { crm } from "@/content/crm";

export function StackList() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h3 className="font-mono text-sm text-amber"># decisões</h3>
        <ul className="mt-3 space-y-2.5">
          {crm.stack.decisions.map((d) => (
            <li key={d.slice(0, 32)} className="flex gap-2 text-sm text-mute">
              <span className="font-mono text-amber">▸</span>
              <span className="leading-relaxed">{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-mono text-sm text-amber"># integrações</h3>
        <ul className="mt-3 space-y-2.5">
          {crm.stack.integrations.map((i) => (
            <li key={i.name} className="text-sm leading-relaxed text-mute">
              <span className="font-mono font-bold text-ink">{i.name}</span> —{" "}
              {i.desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 10.3: Adicionar em `app/crm/page.tsx`** (após módulos):

```tsx
import { ArchDiagram } from "@/components/crm/arch-diagram";
import { StackList } from "@/components/crm/stack-list";
// ...
      <Section cmd="cat arquitetura.txt" title={crm.stack.heading}>
        <div className="space-y-8">
          <ArchDiagram />
          <StackList />
        </div>
      </Section>
```

- [ ] **Step 10.4: Verificar + commit**

Preview: diagrama alinhado (conferir colunas do ASCII), com scroll horizontal no mobile sem quebrar a página.

```bash
git add -A && git commit -m "feat: /crm stack + diagrama ascii"
```

---

### Task 11: `/crm` — IA no processo, resultados e CTA final

**Files:**
- Create: `components/crm/ai-process.tsx`
- Create: `components/crm/results-grid.tsx`
- Modify: `app/crm/page.tsx`

- [ ] **Step 11.1: Escrever `components/crm/ai-process.tsx`**

```tsx
import { crm } from "@/content/crm";

export function AiProcess() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="max-w-2xl space-y-4">
        {crm.aiProcess.paragraphs.map((p) => (
          <p key={p.slice(0, 32)} className="leading-relaxed text-mute">
            {p}
          </p>
        ))}
      </div>
      <ul className="h-fit space-y-2 rounded-lg border border-line bg-surface p-5">
        {crm.aiProcess.facts.map((f) => (
          <li key={f} className="flex gap-2 font-mono text-xs text-mute">
            <span className="text-amber">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 11.2: Escrever `components/crm/results-grid.tsx`**

```tsx
import { crm } from "@/content/crm";
import { ExternalLink } from "@/components/external-link";

export function ResultsGrid() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {crm.results.areas.map((r) => (
          <div key={r.area} className="rounded-lg border border-line bg-surface p-5">
            <h3 className="font-mono text-sm font-bold text-amber">
              {r.area}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mute">{r.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-2xl leading-relaxed text-mute">
        {crm.results.extra}{" "}
        <ExternalLink href={crm.results.siteUrl}>
          Ver o site da Costa Maritime ↗
        </ExternalLink>
      </p>
    </div>
  );
}
```

- [ ] **Step 11.3: Completar `app/crm/page.tsx`** — versão final da página:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CaseHero } from "@/components/crm/case-hero";
import { ModuleGallery } from "@/components/crm/module-gallery";
import { ArchDiagram } from "@/components/crm/arch-diagram";
import { StackList } from "@/components/crm/stack-list";
import { AiProcess } from "@/components/crm/ai-process";
import { ResultsGrid } from "@/components/crm/results-grid";
import { Section } from "@/components/section";
import { crm } from "@/content/crm";

export const metadata: Metadata = {
  title: "Estudo de caso: CRM Costa Maritime",
  description: crm.subtitle,
};

export default function CrmCasePage() {
  return (
    <main>
      <CaseHero />
      <Section cmd="git log --reverse" title={crm.problem.heading}>
        <div className="max-w-2xl space-y-4">
          {crm.problem.paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="leading-relaxed text-mute">
              {p}
            </p>
          ))}
        </div>
      </Section>
      <Section cmd="ls modulos/" title="A solução: 7 módulos, um fluxo">
        <ModuleGallery />
      </Section>
      <Section cmd="cat arquitetura.txt" title={crm.stack.heading}>
        <div className="space-y-8">
          <ArchDiagram />
          <StackList />
        </div>
      </Section>
      <Section cmd="claude --historico" title={crm.aiProcess.heading}>
        <AiProcess />
      </Section>
      <Section cmd="./resultados --por-area" title={crm.results.heading}>
        <ResultsGrid />
      </Section>
      <div className="mx-auto max-w-5xl px-5 pb-20">
        <div className="rounded-lg border border-amber/30 bg-amber/5 p-8 text-center">
          <p className="font-mono text-sm text-amber">
            $ quer um sistema assim na sua empresa?
          </p>
          <Link
            href="/#contato"
            className="mt-4 inline-block rounded-md bg-amber px-6 py-3 font-mono text-sm font-bold text-bg transition-colors hover:bg-amber-soft"
          >
            Falar com João →
          </Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 11.4: Verificar página completa + commit**

Preview `/crm` inteiro: 5 atos + CTA. Link do CTA leva a `/#contato`.

```bash
git add -A && git commit -m "feat: /crm ia no processo, resultados e cta"
```

---

### Task 12: 404 terminal

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 12.1: Escrever `app/not-found.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-start justify-center px-5">
      <p className="font-mono text-sm">
        <span className="text-amber">{site.promptPath} $</span>{" "}
        <span className="text-ink">abrir pagina</span>
      </p>
      <p className="mt-3 font-mono text-sm text-mute">
        bash: pagina: comando não encontrado{" "}
        <span className="text-amber">(404)</span>
      </p>
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Essa página não existe.
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-md bg-amber px-5 py-2.5 font-mono text-sm font-bold text-bg transition-colors hover:bg-amber-soft"
      >
        cd ~/ →
      </Link>
    </main>
  );
}
```

- [ ] **Step 12.2: Verificar + commit**

Preview em `/qualquer-coisa`: página 404 estilizada aparece.

```bash
git add -A && git commit -m "feat: 404 terminal"
```

---

### Task 13: SEO, OG image, favicon, analytics, sitemap

**Files:**
- Modify: `app/layout.tsx` (metadata completa + Analytics)
- Create: `app/opengraph-image.tsx`
- Create: `app/icon.svg`
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

- [ ] **Step 13.1: Instalar analytics**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && npm install @vercel/analytics
```

- [ ] **Step 13.2: Atualizar `app/layout.tsx`** — versão final:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jbMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: `${site.name} — ${site.title}`,
    title: `${site.name} — ${site.title}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jbMono.variable}`}>
      <body className="bg-bg font-sans text-ink antialiased">
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 13.3: Escrever `app/opengraph-image.tsx`** (gerada em build pelo next/og; fonte padrão do runtime — sem mono de verdade, aceitável para OG)

```tsx
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0c0a09",
          border: "16px solid #fbbf24",
        }}
      >
        <div style={{ display: "flex", color: "#fbbf24", fontSize: 32 }}>
          {site.promptPath} $ whoami
        </div>
        <div
          style={{
            display: "flex",
            color: "#fafaf9",
            fontSize: 96,
            fontWeight: 700,
            marginTop: 24,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            color: "#fbbf24",
            fontSize: 48,
            fontWeight: 700,
            marginTop: 8,
          }}
        >
          {site.title}
        </div>
        <div
          style={{
            display: "flex",
            color: "#a8a29e",
            fontSize: 28,
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          Construo produtos que geram receita real, com IA no centro do
          processo.
        </div>
      </div>
    ),
    { ...size },
  );
}
```

- [ ] **Step 13.4: Escrever `app/icon.svg`** (monograma terminal — favicons com rosto não leem bem em 16px; avatar fica no hero/OG)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0c0a09"/>
  <text x="10" y="42" font-family="monospace" font-size="28" font-weight="bold" fill="#fbbf24">&gt;_</text>
</svg>
```

Remover `app/favicon.ico` do boilerplate se existir (`rm app/favicon.ico`), para o `icon.svg` assumir.

- [ ] **Step 13.5: Escrever `app/sitemap.ts` e `app/robots.ts`**

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), priority: 1 },
    { url: `${site.url}/crm`, lastModified: new Date(), priority: 0.9 },
  ];
}
```

```ts
// app/robots.ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 13.6: Verificar + commit**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && npm run build
```

Expected: build gera `/opengraph-image`, `/sitemap.xml`, `/robots.txt` sem erros. Abrir `http://localhost:3000/opengraph-image` no preview e conferir o card âmbar.

```bash
git add -A && git commit -m "feat: seo completo, og image, favicon, analytics, sitemap"
```

---

### Task 14: Assets reais (avatar + prints) e valores confirmados

**Files:**
- Create: `public/avatar.png` (fornecido pelo usuário)
- Create: `public/crm/*.png` (7 prints, fornecidos pelo usuário conforme `docs/prints-roteiro.md`)
- Modify: `content/site.ts` (remover marcadores `// CONFIRMAR` com valores reais)
- Modify: `components/hero.tsx` (adicionar avatar)

Esta task depende do usuário. Se os prints ainda não existirem, o site funciona com os placeholders — **não bloquear o deploy da Task 16 por causa disso**; os prints podem entrar depois com novo deploy automático.

- [ ] **Step 14.1: Pedir ao usuário os arquivos**

Mensagem: "Salve o avatar em `public/avatar.png` e os prints em `public/crm/` seguindo `docs/prints-roteiro.md` (nomes exatos). Me avise quando estiverem lá."

- [ ] **Step 14.2: Confirmar/atualizar `content/site.ts`** com URLs e contatos reais (remover todos os comentários `// CONFIRMAR`).

- [ ] **Step 14.3: Adicionar avatar ao `components/hero.tsx`**

Substituir o conteúdo do componente por:

```tsx
import Image from "next/image";
import { hero } from "@/content/home";
import { site } from "@/content/site";

export function Hero() {
  return (
    <header className="mx-auto max-w-5xl px-5 pb-10 pt-20 sm:pb-16 sm:pt-28">
      <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm sm:text-base">
            <span className="text-amber">{site.promptPath} $</span>{" "}
            <span className="text-ink">{hero.cmd}</span>
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-1 font-mono text-xl font-semibold text-amber sm:text-2xl">
            {hero.role}
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
            {hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={hero.ctaPrimary.href}
              className="rounded-md bg-amber px-5 py-2.5 font-mono text-sm font-bold text-bg transition-colors hover:bg-amber-soft"
            >
              {hero.ctaPrimary.label} →
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="rounded-md border border-line px-5 py-2.5 font-mono text-sm text-amber-soft transition-colors hover:border-amber/50"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>
        <Image
          src="/avatar.png"
          alt={`Avatar ilustrado de ${site.name}`}
          width={160}
          height={160}
          priority
          className="rounded-full border-2 border-amber bg-ink"
        />
      </div>
    </header>
  );
}
```

- [ ] **Step 14.4: Verificar prints na galeria**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && npm run build
```

Preview `/crm`: cada print presente aparece; ausentes seguem com placeholder.

- [ ] **Step 14.5: Commit**

```bash
git add -A && git commit -m "feat: avatar no hero + prints reais do crm + dados confirmados"
```

---

### Task 15: QA final

**Files:** nenhum novo — correções pontuais se surgirem.

- [ ] **Step 15.1: Lint + typecheck + build**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && npm run lint && npx tsc --noEmit && npm run build
```

Expected: tudo verde.

- [ ] **Step 15.2: Revisão visual mobile/desktop**

Com o preview aberto: `resize_window` para 375×812 (mobile) e 1280×800 (desktop). Nas duas larguras, conferir home, `/crm` e `/404`:
- sem overflow horizontal (especialmente o diagrama ASCII — deve ter scroll interno próprio)
- textos legíveis, espaçamentos consistentes
- console do browser sem erros

- [ ] **Step 15.3: Conferir todos os links**

Na home: 2 âncoras (#projetos, #contato), link `/crm`, 3 links externos de sites, 3 contatos. No `/crm`: back-link, link site Costa, CTA `/#contato`. Clicar em cada um.

- [ ] **Step 15.4: Lighthouse (produção local)**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && npm run build && npm run start
```

Em outro terminal:

```bash
npx --yes lighthouse http://localhost:3000 --only-categories=performance,accessibility --preset=desktop --chrome-flags="--headless" --output=json --output-path=./lighthouse-home.json && npx --yes lighthouse http://localhost:3000/crm --only-categories=performance,accessibility --preset=desktop --chrome-flags="--headless" --output=json --output-path=./lighthouse-crm.json
```

Ler os scores nos JSONs (`categories.performance.score`, `categories.accessibility.score`). Expected: ≥ 0.95 em ambos. Se abaixo: corrigir (imagens sem `alt`, contraste, tamanho de imagem) e repetir. Deletar os JSONs depois (`rm lighthouse-*.json`).

- [ ] **Step 15.5: Commit de eventuais correções**

```bash
git add -A && git commit -m "fix: ajustes de qa (lighthouse/responsivo)"
```

---

### Task 16: Deploy (GitHub + Vercel)

**Files:**
- Modify: `content/site.ts` (campo `url` com a URL real do deploy)

- [ ] **Step 16.1: Criar repositório GitHub e push**

```bash
cd "C:/Users/joaov/OneDrive/Desktop/portifolio_joao_leal" && gh auth status
```

Se autenticado:

```bash
gh repo create portfolio-joao-leal --private --source=. --push
```

Se `gh` não estiver autenticado, pedir ao usuário para rodar `gh auth login` no terminal dele, ou criar o repo manualmente no GitHub e fornecer a URL do remote.

- [ ] **Step 16.2: Conectar na Vercel (ação do usuário)**

Instruir o usuário: acessar [vercel.com/new](https://vercel.com/new), importar o repositório `portfolio-joao-leal`, aceitar as configurações default de Next.js e clicar Deploy. (Alternativa CLI: `npx vercel login` + `npx vercel --prod` — requer login interativo do usuário.)

- [ ] **Step 16.3: Atualizar `content/site.ts` com a URL real** (ex: `https://portfolio-joao-leal.vercel.app`), commit e push — a Vercel redeploya sozinha:

```bash
git add content/site.ts && git commit -m "chore: url de producao no metadata" && git push
```

- [ ] **Step 16.4: Verificação pós-deploy**

1. Abrir a URL de produção: home, `/crm`, `/404`, `/sitemap.xml`, `/robots.txt`
2. Testar OG: colar a URL em [opengraph.xyz](https://www.opengraph.xyz) — card âmbar deve aparecer
3. Conferir Vercel Analytics ativo no dashboard do projeto

- [ ] **Step 16.5: Domínio (ação do usuário, opcional nesta fase)**

Quando o usuário comprar `joaoleal.dev` (ou alternativa): adicionar o domínio em Vercel → Settings → Domains, seguir instruções de DNS do registrador, e atualizar `site.url` + commit.

---

## Critérios de aceite (do spec §11)

- [ ] Home comunica quem é João + números em <30s de leitura
- [ ] `/crm` conta a história completa com prints (ou placeholders elegantes) e diagrama
- [ ] Todos os links externos funcionam
- [ ] Responsivo em 375px e 1440px
- [ ] Lighthouse ≥ 95 (performance e acessibilidade)
- [ ] OG image correta ao compartilhar
- [ ] Publicado na Vercel
