# Design — Página `/making-of` (Bônus: como este site foi construído)

**Data:** 2026-07-24
**Status:** aprovado para plano de implementação
**Autor:** João Leal (via sessão de brainstorming)

## Contexto

O portfólio está no ar em [joaoleal.dev](https://joaoleal.dev) com dois casos: `/crm` (Costa
Maritime Hub) e `/socio` (Drakes + Ortho, em implementação). A home afirma o método em dois
lugares — "skills encadeadas: brainstorming → spec → plano → execução por subagentes" e o fecho
da seção Stack: *"Este portfólio, aliás, saiu do mesmo método."*

Esta página é a **prova dessa frase**. O material já existe e é público: specs e planos
commitados em `docs/superpowers/`, 40 commits contando o processo (spec às 17h16 de 22/07, site
no ar em 23/07), e o repo aberto em
[github.com/jvgusmaoleal/portfolio-joao-leal](https://github.com/jvgusmaoleal/portfolio-joao-leal).

## Objetivo

Uma página bônus `/making-of` que:

1. Conta **como este site foi construído**, do brainstorm ao deploy, com o máximo de contexto.
2. Prova o método com **artefatos verificáveis** — cada afirmação com link para o arquivo ou
   commit real no GitHub (prova profunda).
3. Mantém o tom de estudo de caso dos outros dois, com o charme de making-of.
4. Fecha com o toque meta: a própria página saiu do ciclo que ela descreve.

## Decisões travadas (do brainstorming)

- **Papel:** página bônus — terceiro caso do site, contando a construção do próprio portfólio.
- **Rota:** `/making-of`.
- **Escopo:** história completa — V1 inteira, saga dos prints, ciclo `/socio` e a recursão
  (esta página documentando o próprio ciclo).
- **Prova:** profunda — deep links para arquivos no GitHub, bloco estilo `git log --oneline`
  com commits reais, números conferidos no repo.
- **Home:** 4º card na seção projetos com badge "Bônus" **+** a frase final da seção Stack
  vira link para a página.
- **Formato:** narrativa em atos (como `/crm`) com a timeline como um dos atos e diagrama
  ASCII do pipeline de skills.

## Não-objetivos (YAGNI)

- Sem tutorial de como reproduzir o fluxo (o público é contratante, não dev).
- Sem embed dinâmico do GitHub (API, contadores ao vivo) — tudo estático, como o resto do site.
- Sem expor conteúdo sensível dos bastidores: o script de prints (contém termos reais usados
  na máscara) continua fora do repo, e a história não cita o que foi mascarado.
- Sem duplicar a seção "Como eu trabalho" da home — aqui é a execução real, não o processo
  genérico.

## Arquitetura e arquivos

Segue o padrão do projeto: **toda a copy vive em `content/*.ts` tipado**, componentes sem
texto, `Section`, tokens `amber`/`amber-soft`, tipografia mono.

- **`content/making-of.ts`** (novo) — todo o conteúdo da página, tipado.
- **`content/types.ts`** (editar) — novos tipos (abaixo).
- **`app/making-of/page.tsx`** (novo) — monta `Section`s a partir do conteúdo; `metadata`
  completa no padrão `/crm` (`title`, `description`, `alternates.canonical = "/making-of"`,
  `openGraph`, `twitter`).
- **`components/making-of/`** (novo) — componentes de apresentação: timeline (`git log`),
  grid de artefatos, diagrama do pipeline, histórias de bastidor.
- **`app/sitemap.ts`** (editar) — acrescentar `/making-of`.
- **`content/home.ts`** (editar) — 4º card + link no fecho da Stack (ver "Wiring da home").

Reuso direto: `CaseHero` e `BackLink` genéricos (já extraídos no ciclo `/socio`), `Section`,
`ExternalLink`, padrão de grid de cards. O diagrama ASCII segue o padrão do
`components/crm/arch-diagram.tsx` (bloco `role="img"` com `aria-label` descritivo).

## Estrutura da página (seção a seção)

Ordem e headers de comando (`cmd`); a copy final é escrita na implementação e aprovada pelo
João.

### 1. Hero
- `cmd`: `git init joaoleal.dev`
- Título na direção "o site que documenta a própria construção"; subtítulo com a promessa:
  processo completo, artefatos públicos, tudo verificável.
- Usa o `CaseHero` genérico.

### 2. O desafio meta
- `cmd`: `cat desafio.md`
- 2 parágrafos: o portfólio é um produto, e o produto de verdade é o método. A decisão foi
  construí-lo com o próprio método que ele descreve — e deixar o rastro público no repo
  ("portfólio-produto", conceito do spec V1).

### 3. O pipeline
- `cmd`: `cat pipeline.md`
- Diagrama ASCII do fluxo: brainstorming → spec aprovada + self-review → plano em tasks →
  execução por subagentes com **revisão em duas etapas** (conformidade com a spec + qualidade
  de código) → humanizer na copy → verificação antes de concluir → commit.
- Parágrafos explicam cada etapa e o papel humano no ciclo: o João aprova o design, aprova
  cada mudança de copy e decide os trade-offs.
- Ferramentas nomeadas: Claude Code, skills superpowers, memória de projeto, git worktrees.

### 4. A linha do tempo
- `cmd`: `git log --oneline`
- Bloco de terminal com ~12–18 commits reais (dos 40), agrupados em capítulos, cada capítulo
  com 1 linha de narrativa. Arco: spec às 17h16 de 22/07 → plano 10 minutos depois → scaffold →
  tokens/conteúdo tipado/componentes base → home e `/crm` → SEO/OG/404 → **site no ar em
  23/07** → domínio joaoleal.dev → prints reais mascarados → humanizer (11 ajustes) → ciclo
  `/socio` → esta página.
- O dado forte em destaque: **da spec ao ar em ~1 dia**.
- Commits exibidos com hash curto, data e mensagem real (conferidos no `git log` na
  implementação).

### 5. Os artefatos
- `cmd`: `ls docs/superpowers/`
- Grid de cards, cada um com deep link para o arquivo no GitHub: spec V1, plano V1 (17 tasks,
  0–16), spec `/socio`, plano `/socio` (8 tasks), spec desta página e plano desta página
  (recursão), `AGENTS.md` (nascido do drift Next 15→16).
- Cada card: o que é, papel no processo, link "ver no GitHub".

### 6. Bastidores
- `cmd`: `cat bastidores.md`
- 3–4 histórias curtas de problema real (candidatas; seleção final na revisão de copy):
  - **Prints do CRM:** dados mascarados **na camada de rede** (interceptando as respostas da
    API antes de chegarem no app), porque mascarar só o DOM falhava — o app re-renderiza e
    restaura o dado real. Cada imagem revisada olho a olho antes de publicar.
  - **Drift de framework:** o scaffold veio com Next 16 quando o plano assumia Next 15; a
    lição virou o `AGENTS.md` que avisa todas as sessões seguintes.
  - **Humanizer:** 11 ajustes de copy, aprovados um a um pelo João antes do commit.
  - **Memória de projeto:** incidente vira regra escrita (ex.: OneDrive segurando lock de
    arquivos no `npm install`; proxy da Cloudflare conflitando com o SSL da Vercel) —
    nenhuma sessão começa do zero.

### 7. Recursão + CTA
- Fecho meta curto: esta página saiu do ciclo que ela descreve — brainstorm em 24/07, spec e
  plano públicos no repo, mesmo pipeline.
- CTA no padrão dos outros casos: bloco com borda amber e botão "Falar com João" → `/#contato`,
  mais a linha "o repo é público" com link para o GitHub.

## Modelo de conteúdo (tipos)

Rascunho para `content/types.ts` (nomes finais na implementação):

```ts
export type TimelineCommit = {
  hash: string;     // hash curto real, ex.: "63fed5f"
  date: string;     // ex.: "22/07 17:16"
  message: string;  // mensagem real do commit
};

export type TimelineChapter = {
  title: string;          // ex.: "Spec e plano"
  note: string;           // 1 linha de narrativa
  commits: TimelineCommit[];
};

export type ArtifactCard = {
  name: string;   // ex.: "Spec do portfólio V1"
  role: string;   // papel no processo
  href: string;   // deep link para o arquivo no GitHub
};

export type BackstageStory = {
  title: string;
  paragraphs: string[];
};
```

`content/making-of.ts` exporta `hero`, `challenge`, `pipeline` (passos + diagrama ASCII +
`aria-label`), `timeline: TimelineChapter[]`, `artifacts: ArtifactCard[]`,
`backstage: BackstageStory[]` e `cta`.

## Wiring da home

Em `content/home.ts`:

1. **4º card** na seção projetos: `id: "making-of"`, badge "Bônus", nome na linha de "como
   este site foi construído", highlights curtos (pipeline de skills, ~1 dia da spec ao ar,
   repo público), link primário `{ label: "Ler o making-of", href: "/making-of" }` e
   secundário para o repo no GitHub (externo). Sem `visual` (o card do CRM continua sendo o
   único com diagrama).
2. **Fecho da Stack:** a frase *"Este portfólio, aliás, saiu do mesmo método."* passa a
   linkar para `/making-of`. O `outro` hoje é uma string simples — o componente que o
   renderiza ganha suporte a um link no final (ajuste pequeno; forma exata na implementação).

## SEO / metadata

Padrão do `/crm` em `app/making-of/page.tsx`: `metadata` com `title`, `description`,
`alternates.canonical = "/making-of"`, `openGraph` e `twitter`. Acrescentar `/making-of` ao
`app/sitemap.ts`.

## Guardas de honestidade (crítico)

- **Todos os números conferidos no repo** antes de entrar na copy (datas e horas de commit,
  contagem de commits/tasks, o "~1 dia" da spec ao ar).
- Hashes, mensagens de commit e deep links reais — nada inventado ou aproximado.
- Bastidores sem conteúdo sensível: o script de prints continua fora do repo; a história não
  cita o que foi mascarado nem nomes de clientes/embarcações.
- Copy passa pela skill `humanizer`; o João aprova todo o texto antes do commit.

## Dependência de ordem

O `/making-of` só entra em implementação **depois do `/socio` concluído e no ar**: a página
cita o ciclo do `/socio` como parte da história, e o 4º card entra numa home que já terá o
wiring do `/socio`. O plano de implementação registra essa dependência como pré-condição.

## Validação

- `npm run build` e `npm run lint` sem erros.
- Todos os deep links do GitHub retornam 200 (conferir um a um antes de concluir).
- Links externos abrem em nova aba com `rel="noopener"`; glifos decorativos com
  `aria-hidden`; diagrama ASCII com `role="img"` e `aria-label`.
- Responsivo (375px e 1440px) e Lighthouse em linha com o resto do site (95+).
- `/crm` e `/socio` continuam funcionando após as mudanças na home.

## Itens em aberto (para a revisão de copy)

1. Título/subtítulo finais do hero (direção "o site que se documenta" já escolhida).
2. Seleção final dos commits da timeline (~12–18 dos 40+) e recorte dos capítulos.
3. Quais histórias de bastidor entram (3–4 das candidatas listadas).
4. Texto exato do badge do card ("Bônus" simples ou variação).
