# Página `/socio` — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar `/socio`, uma página que reúne os dois negócios em que o João é sócio (Drakes e Orthotechniques), liderada pelo fluxo agêntico e provando a skill de builder pela stack de cada entrega.

**Architecture:** Página estática do App Router (Next.js 16), 100% data-driven — toda a copy em `content/socio.ts` tipado, renderizada por componentes sem texto que reusam o sistema visual existente (`Section`, tokens `amber`, tipografia mono). O hero do `/crm` é extraído para um `CaseHero` genérico compartilhado pelas duas páginas.

**Tech Stack:** Next.js 16.2.11 (App Router, SSG), React 19, TypeScript, Tailwind CSS v4.

**Verificação (importante — este repo não tem test runner):** o projeto não usa Jest/Vitest e não tem arquivos de teste; introduzir um framework aqui seria contrariar o padrão do repo (YAGNI). O portão de qualidade real é **`npx tsc --noEmit`** (tipos), **`npm run lint`** (ESLint) e **`npm run build`** (falha em erro de tipo/import/conteúdo), mais **verificação visual no browser** (`npm run dev`). Cada tarefa usa esses comandos como verificação.

**Convenção de copy (obrigatória):** todo texto novo/alterado passa pela skill `humanizer` e é **aprovado pelo João antes do commit** daquela tarefa. Os textos abaixo são **rascunhos reais** — completos o bastante para executar, mas sujeitos a ajuste na aprovação. Guardas de honestidade da spec: recepcionista de IA descrita como **capacidade + arquitetura** (sem afirmar clínica usando); clientes **por setor, sem nomes**; nenhuma métrica inventada.

---

## Mapa de arquivos

**Criar:**
- `content/socio.ts` — conteúdo da página (hero, thesis, businesses, common).
- `components/back-link.tsx` — `BackLink` genérico (movido de `components/crm/`).
- `components/case-hero.tsx` — `CaseHero` genérico parametrizado por props.
- `components/contact-cta.tsx` — bloco de CTA de contato, compartilhado.
- `components/prose.tsx` — render de parágrafos (`text-mute`, `max-w-2xl`).
- `components/socio/business-block.tsx` — um bloco (heading + grid de itens; item com `stack` vira sub-lista).
- `components/socio/business-section.tsx` — corpo de um negócio (intro + blocos + setores + nota + link).
- `app/socio/page.tsx` — a página.

**Modificar:**
- `content/types.ts` — novos tipos `SocioItem`, `SocioBlock`, `SocioBusiness`.
- `app/crm/page.tsx` — usar o `CaseHero` genérico (com props) e o `ContactCta`.
- `app/sitemap.ts` — adicionar `/socio`.
- `content/home.ts` — links e copy dos cards Drakes/Ortho.

**Deletar:**
- `components/crm/case-hero.tsx` (substituído pelo genérico).
- `components/crm/back-link.tsx` (movido para `components/`).

---

## Task 1: Tipos do conteúdo de `/socio`

**Files:**
- Modify: `content/types.ts` (adicionar ao fim)

- [ ] **Step 1: Adicionar os tipos**

Acrescentar ao fim de `content/types.ts`:

```ts
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
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add content/types.ts
git commit -m "feat(socio): tipos do conteudo da pagina /socio"
```

---

## Task 2: Extrair `BackLink` e `CaseHero` genéricos

Remove o acoplamento do hero ao conteúdo do CRM, para servir às duas páginas.

**Files:**
- Create: `components/back-link.tsx`
- Create: `components/case-hero.tsx`
- Modify: `app/crm/page.tsx` (import do hero)
- Delete: `components/crm/back-link.tsx`, `components/crm/case-hero.tsx`

- [ ] **Step 1: Criar `components/back-link.tsx`**

```tsx
import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/"
      className="font-mono text-sm text-mute transition-colors hover:text-amber"
    >
      <span aria-hidden="true">←</span> cd ~/
    </Link>
  );
}
```

- [ ] **Step 2: Criar `components/case-hero.tsx` (genérico, por props)**

```tsx
import { site } from "@/content/site";
import { BackLink } from "./back-link";

export function CaseHero({
  cmd,
  title,
  subtitle,
}: {
  cmd: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="mx-auto max-w-5xl px-5 pb-4 pt-14 sm:pt-20">
      <BackLink />
      <p aria-hidden="true" className="mt-8 font-mono text-sm">
        <span className="text-amber">{site.promptPath} $</span>{" "}
        <span className="text-mute">{cmd}</span>
      </p>
      <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
        {subtitle}
      </p>
    </header>
  );
}
```

- [ ] **Step 3: Confirmar quem importa os arquivos antigos**

Run: `grep -rn "crm/case-hero\|crm/back-link" app components`
Expected: só `app/crm/page.tsx` importa `crm/case-hero` (o `back-link` era usado só pelo `case-hero`). Se aparecer outro importador, atualizar também.

- [ ] **Step 4: Atualizar `app/crm/page.tsx`**

Trocar o import do hero e a chamada. Substituir a linha:

```tsx
import { CaseHero } from "@/components/crm/case-hero";
```

por:

```tsx
import { CaseHero } from "@/components/case-hero";
```

E trocar `<CaseHero />` por:

```tsx
<CaseHero cmd={crm.cmd} title={crm.title} subtitle={crm.subtitle} />
```

(`crm` já está importado no arquivo.)

- [ ] **Step 5: Deletar os arquivos antigos**

```bash
git rm components/crm/case-hero.tsx components/crm/back-link.tsx
```

- [ ] **Step 6: Build + type-check**

Run: `npm run build`
Expected: build conclui sem erro.

- [ ] **Step 7: Verificação visual do `/crm`**

Run: `npm run dev` e abrir `http://localhost:3000/crm`.
Expected: o hero do `/crm` aparece igual a antes (link "cd ~/", prompt, título, subtítulo).

- [ ] **Step 8: Commit**

```bash
git add components/back-link.tsx components/case-hero.tsx app/crm/page.tsx
git commit -m "refactor: CaseHero e BackLink genericos (compartilhados por /crm e /socio)"
```

---

## Task 3: Extrair `ContactCta` compartilhado

**Files:**
- Create: `components/contact-cta.tsx`
- Modify: `app/crm/page.tsx` (usar o componente no lugar do CTA inline)

- [ ] **Step 1: Criar `components/contact-cta.tsx`**

```tsx
import Link from "next/link";

export function ContactCta({ prompt }: { prompt: string }) {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-20">
      <div className="rounded-lg border border-amber/30 bg-amber/5 p-8 text-center">
        <p aria-hidden="true" className="font-mono text-sm text-amber">
          $ {prompt}
        </p>
        <Link
          href="/#contato"
          className="mt-4 inline-block rounded-md bg-amber px-6 py-3 font-mono text-sm font-bold text-bg transition-colors hover:bg-amber-soft"
        >
          Falar com João <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Usar no `app/crm/page.tsx`**

Adicionar o import:

```tsx
import { ContactCta } from "@/components/contact-cta";
```

Substituir todo o bloco final `<div className="mx-auto max-w-5xl px-5 pb-20"> ... </div>` (o CTA inline com "quer um sistema assim na sua empresa?") por:

```tsx
<ContactCta prompt="quer um sistema assim na sua empresa?" />
```

Remover o `import Link from "next/link";` do `app/crm/page.tsx` **se** ele não for mais usado no arquivo (confirmar com `grep -n "Link" app/crm/page.tsx`; o CRM ainda usa `<Link href="/#contato">`? Após a troca, se não houver mais uso de `Link`, remover o import para o lint passar).

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: sem erro (inclusive lint de import não usado).

- [ ] **Step 4: Verificação visual**

Abrir `http://localhost:3000/crm` — o CTA no rodapé continua igual.

- [ ] **Step 5: Commit**

```bash
git add components/contact-cta.tsx app/crm/page.tsx
git commit -m "refactor: ContactCta compartilhado"
```

---

## Task 4: Conteúdo de `/socio` (`content/socio.ts`)

Copy em rascunho — **passa pela `humanizer` e aprovação do João antes do commit** (Step 3).

**Files:**
- Create: `content/socio.ts`

- [ ] **Step 1: Criar `content/socio.ts`**

```ts
import type { SocioBusiness } from "./types";
import { site } from "./site";

export const hero = {
  cmd: "./deploy-squad --now",
  title: "Squads de agents entregando de verdade",
  subtitle:
    "Sou sócio de dois negócios e rodo esse método neles todo dia: agentes que geram proposta, conteúdo e atendimento, com engenharia por baixo pra aguentar produção. Não é fornecedor que entrega e some; é dono construindo pra durar.",
};

export const thesis = {
  cmd: "whoami --socio",
  paragraphs: [
    "Ser sócio muda o incentivo. Não entrego um projeto e sumo: eu convivo com o resultado mês após mês, porque parte dele é minha.",
    "Por isso testo tudo no meu próprio quintal antes. O método que uso nos clientes é o mesmo que roda na Drakes e na Orthotechniques — agentes acelerando o trabalho, engenharia garantindo que aguenta produção.",
  ],
};

const drakes: SocioBusiness = {
  id: "drakes",
  cmd: "cd ~/drakes",
  name: "Drakes Company",
  intro: [
    "A Drakes é uma agência que mede o que importa: quanto custa cada cliente novo, não curtida. Toco a agência com o Henrique Sena, e o meu lado é construir os produtos e as automações que a gente entrega.",
  ],
  blocks: [
    {
      heading: "Como eu trabalho: squads de agents",
      items: [
        {
          name: "Squad de propostas",
          detail:
            "Lê a reunião gravada com o cliente, me entrevista pra preencher o que faltou e sugere escopo e preço a partir do histórico da própria Drakes. A proposta sai fundamentada, não no chute.",
        },
        {
          name: "Squad de conteúdo",
          detail:
            "Pesquisa o que está acontecendo no nicho do cliente e monta os carrosséis de Instagram já no design system e no tom de voz definidos. O time de marketing revisa em vez de começar do zero.",
        },
      ],
    },
    {
      heading: "O que eu construo pra entregar",
      items: [
        {
          name: "Recepcionista de IA no WhatsApp",
          detail:
            "Um atendente que responde na hora, tira dúvida, marca horário na agenda e persegue o lead que ficou sem resposta. Pensado pra clínica, onde lead parado é paciente que não voltou.",
          stack: [
            "WhatsApp Business Platform (API oficial da Meta) pra receber e responder",
            "Claude API pra entender a mensagem e conduzir a conversa",
            "Google Calendar, ou a agenda da clínica, pra checar horário e marcar",
            "Orquestrador em Node.js no Railway, a mesma arquitetura do CRM da Costa",
            "Supabase guardando conversa, leads e agendamentos",
            "Base de conhecimento da clínica pra responder sem inventar",
            "Follow-up automático por gatilho de tempo",
            "Passagem pra um humano quando a conversa foge do combinado",
          ],
        },
        {
          name: "Sites que convertem",
          detail:
            "Next.js estático, Tailwind e deploy na Vercel, com a conversão medida de ponta a ponta. O mesmo jeito com que este portfólio e o site da Costa foram feitos.",
        },
        {
          name: "E-mail marketing",
          detail:
            "Disparo pela Microsoft Graph via proxy, sem plataforma de e-mail no meio: remetente real, domínio protegido e relatório de rotina. O mesmo que montei pra Costa.",
        },
        {
          name: "Relatórios automáticos",
          detail:
            "Todo mês o cliente recebe um relatório com a identidade visual dele, entregue por e-mail sem ninguém montar na mão. Vira rotina, e é a rotina que sustenta a relação.",
        },
      ],
    },
    {
      heading: "Bastidor: a gestão também é código",
      items: [
        {
          name: "Sistema interno de gestão",
          detail:
            "Rodo um sistema próprio pra controlar freelancers e as contas a pagar e receber da agência, com Supabase no banco. A casa funciona com a mesma qualidade de ferramenta que a gente vende.",
        },
      ],
    },
  ],
  sectors: [
    "educação e idiomas",
    "saúde e clínicas",
    "software de engenharia",
    "logística e transporte",
    "audiovisual",
  ],
  note: "Tem uma vertical dedicada, a Drakes Saúde, pra clínicas — dentro das regras de publicidade do CFM e do CFO.",
  link: { label: "Visitar drakescompany.com", href: site.links.drakesSite },
};

const ortho: SocioBusiness = {
  id: "ortho",
  cmd: "cd ~/orthotechniques",
  name: "Orthotechniques",
  intro: [
    "A Orthotechniques é uma comunidade de educação médica: ensina técnicas de cirurgia de joelho a ortopedistas, conduzida por cirurgiões que operam de verdade. O negócio vive de atrair médico interessado e nutrir esse interesse até virar aluno.",
    "Meu papel de sócio ali é o de sempre, do lado técnico: construo o funil e o site de captação, cuido da plataforma que entrega a comunidade, monto o e-mail marketing que nutre a lista de interesse (mesmo método da Costa) e mantenho a gestão interna rodando.",
  ],
  link: { label: "Visitar orthotechniques.com.br", href: site.links.orthoSite },
};

export const businesses: SocioBusiness[] = [drakes, ortho];

export const common = {
  cmd: "diff drakes ortho",
  paragraphs: [
    "Uma agência e uma escola de cirurgia não poderiam ser mais diferentes. Por dentro, é o mesmo método: agente acelerando, spec virando tela, tela virando produção, e alguém dono do resultado no fim.",
    "É isso que levo pra quem me contrata. Não a ferramenta da moda, mas o hábito de transformar problema de negócio em coisa funcionando, rápido e sem quebrar.",
  ],
};
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros (o conteúdo satisfaz `SocioBusiness`).

- [ ] **Step 3: Passe humanizer + aprovação do João**

Aplicar a skill `humanizer` na copy deste arquivo e apresentar as mudanças ao João. Só seguir para o commit com a aprovação dele. Confirmar também: título/subtítulo do hero.

- [ ] **Step 4: Commit**

```bash
git add content/socio.ts
git commit -m "feat(socio): conteudo da pagina /socio (copy aprovada)"
```

---

## Task 5: Componentes de apresentação

**Files:**
- Create: `components/prose.tsx`
- Create: `components/socio/business-block.tsx`
- Create: `components/socio/business-section.tsx`

- [ ] **Step 1: Criar `components/prose.tsx`**

```tsx
export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-2xl space-y-4">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 32)} className="leading-relaxed text-mute">
          {p}
        </p>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Criar `components/socio/business-block.tsx`**

```tsx
import type { SocioBlock } from "@/content/types";

export function BusinessBlock({ block }: { block: SocioBlock }) {
  return (
    <div>
      <h3 className="font-mono text-sm font-bold text-amber">{block.heading}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {block.items.map((item) => (
          <div
            key={item.name}
            className="rounded-lg border border-line bg-surface p-5"
          >
            <h4 className="font-bold">{item.name}</h4>
            <p className="mt-2 text-sm leading-relaxed text-mute">{item.detail}</p>
            {item.stack ? (
              <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                {item.stack.map((s) => (
                  <li key={s} className="flex gap-2 text-sm text-mute">
                    <span aria-hidden="true" className="font-mono text-amber">
                      ▸
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Criar `components/socio/business-section.tsx`**

```tsx
import type { SocioBusiness } from "@/content/types";
import { Prose } from "@/components/prose";
import { ExternalLink } from "@/components/external-link";
import { BusinessBlock } from "./business-block";

export function BusinessSection({ business }: { business: SocioBusiness }) {
  return (
    <div className="space-y-10">
      <Prose paragraphs={business.intro} />
      {business.blocks?.map((block) => (
        <BusinessBlock key={block.heading} block={block} />
      ))}
      {business.sectors ? (
        <div>
          <h3 className="font-mono text-sm font-bold text-amber">
            Setores atendidos
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {business.sectors.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-mute"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {business.note ? (
        <p className="max-w-2xl text-sm leading-relaxed text-mute">
          {business.note}
        </p>
      ) : null}
      <ExternalLink href={business.link.href}>
        {business.link.label} <span aria-hidden="true">↗</span>
      </ExternalLink>
    </div>
  );
}
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 5: Commit**

```bash
git add components/prose.tsx components/socio/business-block.tsx components/socio/business-section.tsx
git commit -m "feat(socio): componentes de apresentacao (prose, blocos, secao de negocio)"
```

---

## Task 6: A página `/socio` + sitemap

**Files:**
- Create: `app/socio/page.tsx`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Criar `app/socio/page.tsx`**

```tsx
import type { Metadata } from "next";
import { CaseHero } from "@/components/case-hero";
import { Section } from "@/components/section";
import { Prose } from "@/components/prose";
import { BusinessSection } from "@/components/socio/business-section";
import { ContactCta } from "@/components/contact-cta";
import { hero, thesis, businesses, common } from "@/content/socio";
import { site } from "@/content/site";

const pageTitle = "Sócio & builder: Drakes e Orthotechniques";

export const metadata: Metadata = {
  title: pageTitle,
  description: hero.subtitle,
  alternates: { canonical: "/socio" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/socio",
    siteName: `${site.name} — ${site.title}`,
    title: pageTitle,
    description: hero.subtitle,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: hero.subtitle,
  },
};

export default function SocioPage() {
  return (
    <main>
      <CaseHero cmd={hero.cmd} title={hero.title} subtitle={hero.subtitle} />
      <Section cmd={thesis.cmd} title="Sócio, não fornecedor">
        <Prose paragraphs={thesis.paragraphs} />
      </Section>
      {businesses.map((b) => (
        <Section key={b.id} id={b.id} cmd={b.cmd} title={b.name}>
          <BusinessSection business={b} />
        </Section>
      ))}
      <Section cmd={common.cmd} title="O fio comum">
        <Prose paragraphs={common.paragraphs} />
      </Section>
      <ContactCta prompt="quer esse método tocando o seu negócio?" />
    </main>
  );
}
```

- [ ] **Step 2: Adicionar `/socio` ao `app/sitemap.ts`**

No array retornado, após a entrada do `/crm`, adicionar:

```ts
    { url: `${site.url}/socio`, lastModified: new Date(), priority: 0.9 },
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build conclui; `/socio` aparece como rota estática gerada.

- [ ] **Step 4: Verificação visual + âncoras**

Abrir `http://localhost:3000/socio`. Conferir: hero, tese, seção Drakes (3 blocos, o card da recepcionista com a sub-lista de stack, chips de setores, nota da Drakes Saúde, link externo), seção Ortho, fio comum, CTA. Abrir `http://localhost:3000/socio#drakes` e `#ortho` e confirmar que rola até a seção certa. Testar em mobile (viewport estreito) e desktop.

- [ ] **Step 5: Commit**

```bash
git add app/socio/page.tsx app/sitemap.ts
git commit -m "feat(socio): pagina /socio + entrada no sitemap"
```

---

## Task 7: Wiring da home (links + copy dos cards)

Copy em rascunho — **humanizer + aprovação do João antes do commit**.

**Files:**
- Modify: `content/home.ts` (projetos `drakes` e `ortho`)

- [ ] **Step 1: Atualizar o projeto `drakes`**

Substituir o objeto do projeto `drakes` em `content/home.ts` por:

```ts
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
```

- [ ] **Step 2: Atualizar o projeto `ortho`**

Substituir o objeto do projeto `ortho` por:

```ts
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
```

- [ ] **Step 3: Type-check + build**

Run: `npm run build`
Expected: sem erros.

- [ ] **Step 4: Passe humanizer + aprovação do João**

Aplicar `humanizer` nos textos alterados dos dois cards e aprovar com o João.

- [ ] **Step 5: Verificação visual**

Abrir `http://localhost:3000/`. Nos cards Drakes e Ortho: o botão primário "Ler a história" leva a `/socio#drakes` / `#ortho` (rola até a seção); "Visitar site" continua abrindo em nova aba.

- [ ] **Step 6: Commit**

```bash
git add content/home.ts
git commit -m "feat(socio): cards Drakes/Ortho da home apontam pra /socio + copy atualizada"
```

---

## Task 8: Verificação final

**Files:** nenhum (só verificação).

- [ ] **Step 1: Lint + build limpos**

Run: `npm run lint && npm run build`
Expected: ambos sem erro/aviso.

- [ ] **Step 2: Regressão do `/crm`**

Abrir `http://localhost:3000/crm` e confirmar que hero e CTA seguem idênticos após as extrações (Tasks 2 e 3).

- [ ] **Step 3: Passada final na `/socio`**

Conferir mobile e desktop; links externos com `rel="noopener"`; nenhuma métrica inventada, nenhum nome de cliente, recepcionista descrita como capacidade. Se possível, rodar Lighthouse e confirmar que segue em linha com o resto do site (95+).

- [ ] **Step 4: Deploy**

Como a `main` é auto-deployada pela Vercel, os commits acima publicam `/socio` em produção. Confirmar em `https://joaoleal.dev/socio` após o deploy.

---

## Self-review (cobertura da spec)

- Hero agêntico → Task 4 (`hero`) + Task 6 (render). ✓
- Tese sócio → Task 4 (`thesis`) + Task 6. ✓
- Drakes: squads (bloco A), build + stack da recepcionista (bloco B), gestão interna (bloco C), setores sem nomes, Drakes Saúde, link → Task 4 + Task 5 + Task 6. ✓
- Ortho como comunidade de educação médica, papel de builder, link → Task 4 + Task 6. ✓
- Fio comum + CTA → Task 4 + Task 6 + Task 3. ✓
- `CaseHero` genérico compartilhado → Task 2. ✓
- Wiring da home + copy do card → Task 7. ✓
- SEO/metadata + sitemap → Task 6. ✓
- Guardas de honestidade (capacidade, setores, sem métrica inventada) → embutidas na copy da Task 4/7 e revisadas na Task 8. ✓
- Verificação por build/lint/browser (sem test runner, por padrão do repo) → todas as tasks. ✓
