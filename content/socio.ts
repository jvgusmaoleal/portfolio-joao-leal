import type { SocioBusiness } from "./types";
import { site } from "./site";

export const hero = {
  cmd: "./deploy-squad --now",
  title: "Squads de agents entregando de verdade",
  subtitle:
    "Sou sócio de dois negócios e rodo esse método neles todo dia: squads de agents que geram proposta e conteúdo, uma recepcionista de IA que atende no WhatsApp, e engenharia por baixo pra aguentar produção. Fornecedor entrega e some. Sócio fica e responde pelo resultado.",
};

export const thesis = {
  cmd: "whoami --socio",
  paragraphs: [
    "Ser sócio muda o incentivo. Não entrego um projeto e sumo: eu convivo com o resultado mês após mês, porque parte dele é minha.",
    "Por isso testo tudo no meu próprio quintal antes. O método que uso nos clientes é o mesmo que roda na Drakes e na Orthotechniques: agente acelera o trabalho, engenharia garante que aguenta produção.",
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
  note: "Tem uma vertical dedicada, a Drakes Saúde, pra clínicas, dentro das regras de publicidade do CFM e do CFO.",
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
    "Uma agência e uma escola de cirurgia não poderiam ser mais diferentes. Por dentro, é o mesmo método: agente acelera, spec vira tela, tela vira produção, e no fim tem alguém dono do resultado.",
    "É isso que levo pra quem me contrata: não a ferramenta da moda, mas o hábito de transformar problema de negócio em coisa que funciona, rápido e sem quebrar.",
  ],
};
