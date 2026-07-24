import type { SocioBusiness } from "./types";
import { site } from "./site";

export const hero = {
  cmd: "./deploy-squad --now",
  title: "Squads de agents rodando dois negócios",
  subtitle:
    "Sou sócio dos dois e aplico esse método neles todo dia: squads de agents que geram proposta e conteúdo, uma recepcionista de IA que atende no WhatsApp, e engenharia por baixo pra aguentar produção.",
  // Descrição curta só para SEO (~155 caracteres); o subtítulo acima é o texto de tela.
  seoDescription:
    "Sócio da Drakes e da Orthotechniques, onde aplico vibe coding todo dia: squads de agents, recepcionista de IA no WhatsApp e engenharia que aguenta produção.",
};

export const thesis = {
  cmd: "whoami --socio",
  paragraphs: [
    "Ser sócio muda o incentivo. Não entrego um projeto e sumo: eu convivo com o resultado mês após mês, porque parte dele é minha.",
    "Por isso testo tudo no meu próprio quintal antes: o que chega a cliente já rodou na Drakes e na Orthotechniques.",
  ],
};

const drakes: SocioBusiness = {
  id: "drakes",
  cmd: "cd ~/drakes",
  name: "Drakes Company",
  intro: [
    "A Drakes mede quanto custa cada cliente novo, não curtida. Toco a agência com um sócio: a minha parte é construir os produtos e as automações que a gente entrega.",
  ],
  blocks: [
    {
      heading: "Como eu trabalho: squads de agents",
      items: [
        {
          name: "Squad de propostas",
          detail:
            "Lê a reunião gravada com o cliente, me entrevista pra preencher o que faltou e sugere escopo e preço a partir do histórico da própria Drakes.",
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
            "Responde na hora, tira dúvida, marca horário na agenda e persegue o lead que ficou sem resposta. Pensada pra clínica, onde lead parado é paciente que não voltou.",
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
            "Next.js estático, Tailwind e deploy na Vercel, com a conversão medida de ponta a ponta. Foi assim que este portfólio e o site da Costa foram feitos.",
        },
        {
          name: "E-mail marketing",
          detail:
            "Disparo pela Microsoft Graph via proxy, sem plataforma de e-mail no meio: remetente próprio, domínio protegido e relatório de rotina.",
        },
        {
          name: "Relatórios automáticos",
          detail:
            "Todo mês o cliente recebe um relatório com a identidade visual dele, entregue por e-mail sem ninguém montar na mão. Vira rotina, e essa rotina sustenta a relação com o cliente.",
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
  note: "Tem uma vertical dedicada, a Drakes Saúde, pra clínicas, dentro das regras de publicidade do CFM e do CFO.",
  link: { label: "Visitar drakescompany.com", href: site.links.drakesSite },
};

const ortho: SocioBusiness = {
  id: "ortho",
  cmd: "cd ~/orthotechniques",
  name: "Orthotechniques",
  intro: [
    "A Orthotechniques é uma comunidade de educação médica: ensina técnicas de cirurgia de joelho a ortopedistas, conduzida por cirurgiões que operam de verdade. O negócio vive de atrair médico interessado e nutrir esse interesse até virar aluno.",
    "Meu papel de sócio ali é o de sempre, do lado técnico: construo o funil e o site de captação, cuido da plataforma que entrega a comunidade, monto o e-mail marketing que trabalha a lista de interesse e mantenho a gestão interna rodando.",
  ],
  link: { label: "Visitar orthotechniques.com.br", href: site.links.orthoSite },
};

export const businesses: SocioBusiness[] = [drakes, ortho];

export const common = {
  cmd: "diff drakes ortho",
  paragraphs: [
    "Uma agência e uma escola de cirurgia não poderiam ser mais diferentes. Por dentro, é o mesmo método: agente acelera, spec vira tela, tela vira produção, e no fim tem alguém dono do resultado.",
    "É isso que levo pra quem me contrata: o hábito de pegar um problema de negócio e entregar coisa que funciona, rápido e sem quebrar.",
  ],
};
