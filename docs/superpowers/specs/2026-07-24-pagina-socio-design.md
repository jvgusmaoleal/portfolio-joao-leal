# Design — Página `/socio` ("Sócio & builder")

**Data:** 2026-07-24
**Status:** aprovado para plano de implementação
**Autor:** João Leal (via sessão de brainstorming)

## Contexto

O portfólio V1 está no ar em [joaoleal.dev](https://joaoleal.dev) com o caso principal `/crm`
(Costa Maritime Hub). O roadmap previa páginas dedicadas para os outros dois negócios em que o
João é sócio — Drakes Company e Orthotechniques.

Ao contrário do CRM, esses dois casos **não têm prova visual** (prints de tela) nem métricas
duras hoje. A força deles é narrativa: a história, o que é entregue e, principalmente, **como o
João constrói cada entrega e com qual stack**. Uma página só, combinando as duas, evita duas
páginas magras e cria uma narrativa mais forte em torno de uma tese: *ser sócio, não fornecedor*,
com o **fluxo agêntico** como diferencial de abertura.

## Objetivo

Uma página única `/socio` que:

1. Abre pelo diferencial mais raro do João: **usar squads de agents (OpenSquad) para entregar de
   verdade** no dia a dia comercial — não é discurso, é o método.
2. Posiciona o João como **sócio/builder** — dono do resultado a longo prazo, não de uma entrega
   avulsa.
3. Prova a skill mostrando, para cada entrega da Drakes, **como ele faz e com qual tecnologia**.
4. Cobre Orthotechniques de forma honesta e curta (uma comunidade de educação médica onde ele é o
   builder do funil, da plataforma, do email e da gestão).
5. Mantém a credibilidade que o `/crm` construiu: **zero métrica inventada, zero nome de cliente
   exposto, nenhuma afirmação de cliente que não exista**.

## Decisões travadas (do brainstorming)

- **Rota:** `/socio` (curta, on-brand com a estética de terminal).
- **Formato:** uma página só combinando Drakes + Ortho, com âncoras `#drakes` e `#ortho`.
- **Tom:** narrativo, sem prints. A prova vem da especificidade (fluxo agêntico, entregas, stack,
  setores), não de estatística.
- **Hero:** lidera pelo **agêntico** (squads de agents entregando de verdade), com a tese de sócio
  logo em seguida.
- **Clientes:** citados **por setor, sem nomes de marca**. Setores reais observados no site da
  Drakes: educação/idiomas, saúde e clínicas, software de engenharia, logística/transporte,
  audiovisual.
- **Recepcionista de IA:** o João **construiu**, mas ainda não vendeu para clínica. Escrever
  **como capacidade + o "como" (arquitetura/stack)**, em presente, com alvo = clínicas. **Não
  afirmar** que já há clínica usando.
- **Tráfego pago:** operado pelo outro sócio. No portfólio, o entregável do João é a
  **automação de relatórios** com a identidade visual do cliente, entregues por email automático.
- **Guardas:** copy passa pela skill `humanizer`; o João aprova todo o texto antes do commit.

## Não-objetivos (YAGNI)

- Sem galeria de prints (não há material).
- Sem página separada por empresa (decisão: uma só).
- Sem logos ou nomes de clientes de terceiros no domínio pessoal.
- Sem métricas/estatísticas não verificáveis; sem afirmar clientes que não existem.
- Sem reescrever os sites da Drakes/Ortho; apenas referenciar e linkar.

## Arquitetura e arquivos

Segue o padrão do projeto: **toda a copy vive em `content/*.ts` tipado**, componentes sem texto,
estética com `Section`, tokens `amber`/`amber-soft` e tipografia mono.

- **`content/socio.ts`** (novo) — todo o conteúdo da página, tipado.
- **`content/types.ts`** (editar) — novos tipos (abaixo).
- **`app/socio/page.tsx`** (novo) — monta `Section`s a partir de `content/socio.ts`.
- **`components/socio/`** (novo) — componentes de apresentação (grids da página).
- **`components/case-hero.tsx`** — **extrair um `CaseHero` genérico** parametrizado por props
  (`cmd`, `title`, `subtitle`); o `/crm` passa a usá-lo também, removendo o acoplamento atual ao
  conteúdo do CRM. Serve às duas páginas.
- **`content/home.ts`** (editar) — wiring dos cards Drakes/Ortho.

Reuso direto: `Section` (já aceita `id` para âncoras), `BackLink`, `ExternalLink`, e o padrão de
grid de cards do `ResultsGrid` (borda + heading mono + texto).

## Estrutura da página (seção a seção)

Ordem e headers de comando (`cmd`) propostos; a copy final é escrita na implementação e aprovada
pelo João.

### 1. Hero
- `cmd`: `./deploy-squad --now`
- Título: lidera pelo agêntico (ex.: "Squads de agents entregando de verdade" — a definir).
- Subtítulo: a ponte para a tese — sou sócio de dois negócios e uso esse método neles todo dia.

### 2. A tese
- `cmd`: `whoami --socio`
- 1–2 parágrafos: sócio, não fornecedor. Pele em jogo, dono do resultado a longo prazo, usa o
  próprio método (agentes + engenharia) nos próprios negócios.

### 3. Drakes (`id="drakes"`)
- `cmd`: `cd ~/drakes`
- **Intro:** a Drakes mede **custo por cliente** (não vaidade); sociedade com o outro sócio. O
  papel do João: builder dos produtos e das automações que a agência entrega.

- **Bloco A — Como eu trabalho: squads de agents (OpenSquad).** O diferencial de abertura da
  seção, alinhado ao hero. Itens:
  - **Squad de propostas:** ingere a reunião gravada/transcrita, entrevista o João para captar
    contexto do cliente e **sugere serviços + precificação com base no histórico da Drakes**.
  - **Squad de conteúdo:** pesquisa notícias do nicho (da Drakes ou do cliente) e um time de mkt
    agêntico **gera carrosséis de Instagram** já no design system e no tom de voz definidos.

- **Bloco B — O que eu construo pra entregar (com a stack).** Grid "entrega + como/stack":
  - **Recepcionista de IA no WhatsApp** (capacidade; alvo: clínicas) — atende, agenda e faz
    follow-up. Ganha um sub-bloco de arquitetura (ver abaixo).
  - **Sites que convertem** — Next.js (App Router, estático/SSG) + Tailwind, deploy na Vercel,
    medição de ponta a ponta. Mesmo método deste portfólio e do site da Costa.
  - **Email marketing** — no método da Costa: envio pela Azure/Microsoft Graph via proxy, sem ESP,
    remetente real e domínio protegido.
  - **Relatórios automatizados** — relatório mensal com a **identidade visual do cliente**,
    entregue por **email automático**, criando rotina de acompanhamento.

- **Bloco C — Bastidor: gestão.** Prova de que ele também constrói ferramenta interna:
  - **Software interno de gestão** rodando localmente, **Supabase (Postgres)** como banco, para
    controle de freelancers e de contas a pagar/receber.

- **Setores atendidos:** chips, sem nomes — educação/idiomas, saúde e clínicas, software de
  engenharia, logística/transporte, audiovisual.
- **Drakes Saúde:** menção curta à vertical para clínicas (dentro das regras CFM/CFO).
- **Link:** `Visitar drakescompany.com` (externo).

#### Arquitetura da recepcionista de IA (sub-bloco)

Descrita como capacidade — "é assim que eu construo". Peças/conectores:

1. **WhatsApp Business Platform (Cloud API oficial da Meta)** — receber/enviar mensagem (conta
   WhatsApp Business + número verificado + Meta Business Manager + webhook).
2. **Claude API** — entender a intenção, conversar naturalmente, decidir a ação.
3. **Conector de agenda** — Google Calendar API (ou a agenda da clínica) para checar
   disponibilidade e marcar, respeitando fuso e horário de atendimento.
4. **Orquestrador Node.js** — proxy no Railway (mesma arquitetura do CRM): recebe o webhook, chama
   o Claude, consulta a agenda e responde.
5. **Supabase (Postgres)** — estado da conversa, leads e agendamentos.
6. **Base de conhecimento da clínica (RAG)** — FAQ, procedimentos, valores, endereço — para
   responder sem alucinar.
7. **Agendador de follow-up** — cron para reengajar lead parado.
8. **Handoff humano** — regra para passar ao atendente quando fugir do escopo.

### 4. Ortho (`id="ortho"`)
- `cmd`: `cd ~/orthotechniques`
- **O que é (corrigido):** Orthotechniques é uma **comunidade de educação médica** que ensina
  técnicas de cirurgia de joelho a ortopedistas, conduzida por dois cirurgiões (faces públicas do
  produto), com um funil de captação ("lista de interesse").
- **Papel do João (builder-sócio):** funil e site de captação, plataforma/entrega da comunidade,
  **email marketing** para nutrir a lista de interesse (mesmo método da Costa), e a gestão interna.
- Seção mais curta e honesta. Sem inventar métricas.
- **Link:** `Visitar orthotechniques.com.br` (externo).

### 5. O fio comum
- `cmd`: `diff drakes ortho`
- Fechamento: o que os dois têm em comum — mesmo método (agentes + spec → tela → produção), dono
  do resultado, tecnologia como vantagem de quem constrói em vez de terceirizar.

### 6. CTA
- Igual ao rodapé do `/crm`: bloco com borda amber e botão "Falar com João" → `/#contato`.

## Modelo de conteúdo (tipos)

Rascunho para `content/types.ts` (nomes finais na implementação):

```ts
export type SocioItem = {
  name: string;      // ex.: "Recepcionista de IA no WhatsApp"
  detail: string;    // o que é / como o João faz
  stack?: string[];  // peças/tecnologias, quando fizer sentido
};

export type SocioBlock = {
  heading: string;               // ex.: "Como eu trabalho: squads de agents"
  kind: "agentic" | "build" | "internal";
  items: SocioItem[];
};

export type SocioBusiness = {
  id: string;          // "drakes" | "ortho" — vira a âncora
  cmd: string;         // header de comando da Section
  name: string;
  intro: string[];
  blocks?: SocioBlock[];
  sectors?: string[];  // setores atendidos, sem nomes (Drakes)
  note?: string;       // menção curta (ex.: Drakes Saúde)
  link: { label: string; href: string };
};
```

`content/socio.ts` exporta `hero`, `thesis`, `businesses: SocioBusiness[]` (Drakes, Ortho) e
`common` (o fio comum). A recepcionista usa `SocioItem.stack` com os 8 itens de arquitetura.

## Wiring da home

Em `content/home.ts`, nos projetos `drakes` e `ortho`, adicionar **link primário** para a nova
página, mantendo o site externo como secundário:

- Drakes → `{ label: "Ler a história", href: "/socio#drakes" }` + `Visitar site` (externo).
- Ortho → `{ label: "Ler a história", href: "/socio#ortho" }` + `Visitar site` (externo).

O `ProjectCard` já renderiza o primeiro link como primário e os demais como secundários — sem
mudança de componente.

**Atualização de copy adjacente:** a `description`/`highlights` do card Drakes na home está
desatualizada ("e-mail marketing" genérico). Atualizar para bater com o posicionamento atual
(custo por cliente, squads de agents, recepcionista de IA, sites que convertem). Texto aprovado
pelo João antes do commit.

## SEO / metadata

Seguir o padrão do `/crm` em `app/socio/page.tsx`: `metadata` com `title`, `description`,
`alternates.canonical = "/socio"`, `openGraph` e `twitter`. Acrescentar `/socio` ao
`app/sitemap.ts`.

## Guardas de honestidade (crítico)

- Recepcionista de IA: descrita como **capacidade + arquitetura**, alvo clínicas; **sem afirmar
  cliente/clinica já usando**.
- Nenhuma métrica não verificável; nenhum cliente inventado.
- Nenhum nome de cliente de terceiros — nem na página, nem neste documento (repo público).
- Copy passa pela skill `humanizer`; João aprova antes do commit.

## Validação

- `npm run build` e `npm run lint` sem erros.
- Âncoras `/socio#drakes` e `/socio#ortho` rolam para as seções corretas (`scroll-mt`).
- Links da home levam à página; externos abrem em nova aba com `rel="noopener"`.
- Responsivo (mobile/desktop) e Lighthouse em linha com o resto do site (95+).
- `/crm` continua funcionando após a extração do `CaseHero` genérico.

## Itens em aberto (para a revisão de copy)

1. Título/subtítulo finais do hero (direção agêntica já escolhida).
2. Handle correto do Instagram da Orthotechniques, se houver (o testado não resolveu) — opcional,
   só para enriquecer a leitura do negócio.
3. Nomear ou não os dois médicos que conduzem a Orthotechniques (são públicos no site).
