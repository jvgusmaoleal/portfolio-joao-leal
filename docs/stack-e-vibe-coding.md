# stack.md — Tecnologias & vibe coding

> Conteúdo para a section final da home (sugestão de comando: `cat stack.md`, entre
> "Como eu trabalho" e "Vamos conversar?"). Cada bloco abaixo vira um subcomponente.
> Todos os números vêm do repositório do CRM da Costa Maritime — nada é estimativa.

## A tese

Ferramenta nova se aprende no meio do projeto. O que eu trago pronto é o processo:
transformar problema de negócio em spec, spec em tela funcionando, tela em produção —
com IA acelerando cada etapa e engenharia segurando a qualidade.

## Stack em produção hoje

Cada item diz onde roda de verdade, não onde eu "já mexi".

**Frontend**
- **JavaScript puro** — escolha deliberada no CRM da Costa Maritime: zero dependência
  npm no núcleo, carregamento instantâneo, 28.000+ linhas em produção
- **Next.js + TypeScript + Tailwind** — este portfólio: estático, tipado, Lighthouse 95+
- **Geração de PDF no navegador** (jsPDF) — as propostas comerciais da Costa saem
  prontas para o cliente, com identidade visual da marca

**Backend & dados**
- **Node.js** — proxy de integrações rodando 24/7 no Railway, ponte segura entre o
  frontend e a Microsoft Graph API
- **Supabase (PostgreSQL)** — 23 tabelas, migrações versionadas no repositório
- **Vercel + Railway + GitHub** — deploy contínuo dos dois lados desde o primeiro mês

**Integrações que rodam sozinhas**
- **Microsoft Graph / 365** — PDF arquivado no OneDrive, planilha de controle no
  SharePoint, e-mail automático para o financeiro e a operação
- **Claude (API e Vision)** — print de cotação vira registro estruturado no banco;
  IA embutida no produto, não só no processo
- **ShipServ** — RFQs que chegam por e-mail são monitoradas a cada 30 minutos e
  viram proposta com um clique
- **E-mail marketing sem ESP** — prospecção enviada direto pela Microsoft Azure
  (Graph API) através do proxy: rascunho no Outlook do remetente real, supressão
  automática de bounces e opt-outs protegendo a reputação do domínio, e relatórios
  de rotina chegando prontos por e-mail
- **AwesomeAPI** — câmbio USD/BRL atualizado em tempo real

**IA no fluxo de trabalho**
- **Claude Code todos os dias** — desenvolvimento guiado por skills (fluxos
  reutilizáveis do agente): `brainstorming` → spec → `writing-plans` → execução
  por subagentes, com `test-driven-development`, `systematic-debugging` e
  `verification-before-completion` fechando o ciclo
- **Agente com memória do projeto** — regras de negócio, incidentes resolvidos e
  decisões viram memória persistente e skills próprias; nenhuma sessão começa
  do zero
- **TDD com IA** — 11 arquivos de teste no CRM; o parser de PDFs do ShipServ nasceu
  test-first, validado contra documentos reais

## Vibe coding, do meu jeito

IA escreve código rápido. O critério continua sendo meu. Na prática:

1. **Spec antes de código.** Foram 28 fases documentadas em ~4 meses, com cerca de 30
   documentos de especificação no repositório. Cada fase: spec, implementação,
   validação com quem usa.
2. **Teste onde o erro custa caro.** Parser de e-mail e de PDF com fixtures reais;
   até a assinatura de e-mail da empresa tem teste travando o telefone correto.
3. **Produção de verdade.** Mais de 6 pessoas dependem do sistema todo dia. Segurança
   de banco, limite de API da Microsoft, e-mail devolvido por regra órfã de caixa de
   entrada — problema real aparece, é diagnosticado, resolvido e documentado.
4. **Memória institucional.** Cada fase vira histórico, cada incidente vira regra
   escrita. O sistema evolui sem regredir — e o conhecimento fica na empresa, não
   só na minha cabeça.

## Em números

| Prova | Número |
|---|---|
| Linhas de código em produção | 28.000+ |
| Módulos no CRM | 7 |
| Tabelas no banco | 23 |
| Fases documentadas (abr–jul/2026) | 28 |
| Arquivos de teste | 11 |
| Integrações em produção | 5 |
| Usuários diários | 6+ |
| Pessoas no time de desenvolvimento | 1 |

## Tradução para quem contrata

Uma pessoa com esse processo entrega o que antes pedia uma equipe — na velocidade
da conversa, com rastro de engenharia. O portfólio que você está lendo saiu do
mesmo método.
