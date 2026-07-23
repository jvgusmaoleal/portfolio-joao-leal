# Spec — Portfólio João Leal · Product Builder

**Data:** 2026-07-22
**Status:** aprovado em brainstorming, aguardando revisão final do spec

## 1. Contexto e objetivo

João Leal quer um portfólio pessoal para ser contratado como **product builder de vibe coding** por empresas e startups brasileiras. O portfólio deve tanto **gerar oportunidades novas** (recrutadores/founders chamam para conversar) quanto **validar credibilidade** em processos já em andamento (o link fecha a venda).

**Mensagem central:** resultados de negócio — "construo produtos que geram receita e uso real" — sustentada por domínio técnico constante das ferramentas de IA.

**Conceito:** portfólio-produto. O próprio site é uma demonstração viva de vibe coding, evoluindo em fases públicas (V1 → V3).

## 2. Público e idioma

- **Público primário:** empresas/startups brasileiras contratando (founders, CTOs, recrutadores tech)
- **Idioma:** PT-BR apenas
- **Dispositivo:** mobile-first (recrutador abre no celular), desktop impecável

## 3. Identidade visual

- **Estética:** dark + terminal ("builder"). O site já parece o trabalho.
- **Cor de destaque:** âmbar fósforo retrô (referência `#fbbf24` sobre fundo `#0c0a09`, tons stone/warm — ajuste fino na implementação)
- **Tipografia:** **Inter** para leitura + **JetBrains Mono** para elementos de terminal (prompt, tags, números, labels)
- **Avatar:** ilustração P&B do João (barba + óculos, traço grosso) fornecida pelo usuário. Usos: hero, favicon, OG image. Em círculo com anel âmbar sobre o dark.
- **Marca:** "João Leal — Product Builder" (título em inglês, corpo do site em PT-BR)
- **Detalhe de personalidade:** elementos de terminal funcionais na estética (prompt `~/joao-leal $`), 404 "comando não encontrado"

## 4. Estrutura do site (V1)

Modelo **home + páginas de caso** (hub and spoke):

```
/            home compacta, escaneável em ~30s
/crm         estudo de caso profundo: Costa Maritime (CRM + site institucional)
/404         personalizada, estética terminal
```

Drakes e Orthotechniques ficam como cards ricos na home (sem página própria na V1); ganham páginas na V2+ quando houver métricas e materiais coletados.

## 5. Conteúdo detalhado

### 5.1 Home `/`

1. **Hero terminal:** `~/joao-leal $ whoami` → nome, título, uma frase de posicionamento ("Construo produtos que geram receita real, com IA no centro do processo."), avatar, CTAs "Ver projetos" / "Contato"
2. **Prova em números:** 28.000 linhas em produção · 4 áreas de empresa atendidas · 6+ usuários diários · 3 negócios construídos/co-fundados (Costa como builder; Drakes e Ortho como sócio) — números do CRM conferidos na exploração do repositório costa-crm
3. **Card Costa Maritime** (caso principal) → `/crm`. Menciona a dupla entrega: CRM interno + site institucional (link para o site no ar). Print da tela do CRM.
4. **Card Drakes Company** (sócio): email marketing, sites vendidos, recepcionista de IA, consultoria de GEO. Clientes: odontologia, oftalmologia (hospitais), restaurantes, cursos (ex: bolos), ortopedia. **Link para o site da Drakes no ar.**
5. **Card Orthotechniques** (sócio): como vibe coding é empregado no dia a dia da operação. **Link para o site no ar.**
6. **Como eu trabalho:** processo de vibe coding em 3–4 passos (entender o negócio → prototipar com IA → iterar com usuários reais → produção e evolução). É onde "domínio técnico" aparece sem jargão.
7. **Contato:** e-mail, WhatsApp (link direto), LinkedIn.

### 5.2 Estudo de caso `/crm`

Narrativa em 5 atos:

1. **O problema:** empresa marítima com processos manuais em planilhas e e-mails espalhados
2. **A solução:** tour pelos 7 módulos com prints (dados fictícios) — Dashboard (metas MTD, extração de vendas por imagem com Claude Vision), Propostas (kanban, follow-up progressivo 24h–30d, markups), Documentos (PDF automático → OneDrive → e-mail financeiro → card operacional), Contatos, Operacional (fainas/ordens de serviço), Port Costs, ShipServ (RFQ → proposta)
3. **Stack e integrações:** vanilla JS deliberado + Node proxy + Supabase; Microsoft Graph (SharePoint/OneDrive/e-mail), Claude Vision, ShipServ, SendPulse, AwesomeAPI — com **diagrama de arquitetura**
4. **IA no processo:** como vibe coding permitiu 1 pessoa entregar em ~4 meses (28 fases documentadas, abr–jul/2026)
5. **Resultados por área:** Comercial, Operações, Financeiro, Suprimentos — o que mudou para cada uma; 6+ usuários diários. + Site institucional da Costa (link) como entrega complementar.

**Confidencialidade:** liberado mostrar tudo com dados fictícios e citar o nome da empresa (confirmado pelo usuário).

## 6. Roadmap de complexidade

- **V1 (escopo deste spec):** tudo acima + SEO/OG + analytics + deploy. Nunca "em obras".
- **V2 — o portfólio conversa:** chat de IA com RAG sobre os projetos (rota de API + Claude); terminal interativo real no hero (comandos `projetos`, `stack`, `contato`); páginas próprias Drakes/Ortho. *Ciclo próprio de spec.*
- **V3 — prova viva:** demo do recepcionista de IA embutida; métricas reais ao vivo (anonimizadas); changelog público do portfólio. *Ciclo próprio de spec.*

## 7. Arquitetura técnica (V1)

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Renderização:** 100% estático na V1 (SSG); rotas de API só chegam na V2
- **Conteúdo:** arquivos de conteúdo tipados (ex: `content/*.ts`) separados dos componentes — edição fácil sem CMS (YAGNI)
- **Imagens:** prints do CRM em `public/`, servidos via `next/image`
- **Analytics:** Vercel Analytics (zero config, sem banner de cookies)
- **SEO:** Metadata API do Next, OG image no estilo terminal âmbar com avatar
- **Contato:** mailto + link WhatsApp + LinkedIn — **sem formulário/backend na V1**
- **Deploy:** Vercel (free tier). Domínio apontado ao final.
- **Qualidade:** TS estrito + ESLint + build como gate de CI; meta Lighthouse 95+ (performance e acessibilidade); sem suíte de testes dedicada na V1 (site estático — o gate de build cobre o risco real)
- **Tratamento de erros:** 404 personalizada; links externos com `rel="noopener"`; sem estados de erro dinâmicos na V1 (não há backend)

## 8. Domínio

- Preferência: **joaoleal.dev** (1ª opção) ou **joaoleal.com.br** (2ª); alternativas `jvleal.dev` / `gusmaoleal.com.br`
- **Compra feita pelo usuário** (registro.br / Namecheap / Cloudflare). Não bloqueia o desenvolvimento — site nasce em `*.vercel.app` e o domínio é apontado depois.

## 9. Assets a coletar (responsabilidade do usuário, com apoio na implementação)

- [ ] Arquivo do avatar (ilustração P&B) em boa resolução
- [ ] Prints das telas do CRM com dados fictícios (7 módulos; apoio: roteiro de quais telas capturar)
- [ ] URLs dos sites: Costa Maritime, Drakes Company, Orthotechniques
- [ ] Links de contato: e-mail público, WhatsApp, LinkedIn
- [ ] (Opcional V1) 1–2 números da Drakes (ex: nº de clientes atendidos, segmentos)

## 10. Fora de escopo da V1

- Chat de IA, terminal interativo, demos embutidas, métricas ao vivo (V2/V3)
- Formulário de contato com backend
- Blog/CMS
- Versão em inglês
- Páginas dedicadas para Drakes/Orthotechniques

## 11. Critérios de aceite da V1

1. Home carrega e comunica quem é João + prova em números em menos de 30s de leitura
2. `/crm` conta a história completa com prints e diagrama
3. Todos os links externos (3 sites + contatos) funcionam
4. Responsivo: legível e bonito em 375px (mobile) e 1440px (desktop)
5. Lighthouse ≥ 95 em Performance e Acessibilidade no deploy da Vercel
6. OG image aparece corretamente ao colar o link no WhatsApp/LinkedIn
7. Site publicado em URL da Vercel (domínio próprio opcional nesta fase)
