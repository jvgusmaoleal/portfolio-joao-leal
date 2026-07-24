import type { ContactChannel } from "./types";

export const site = {
  name: "João Leal",
  title: "Product Builder",
  url: "https://joaoleal.dev",
  description:
    "Construo produtos que geram receita real, com IA no centro do processo. Do primeiro protótipo à produção que a empresa inteira usa.",
  promptPath: "~/joao-leal",
  links: {
    costaSite: "https://costamaritime.com",
    drakesSite: "https://drakescompany.com",
    orthoSite: "https://orthotechniques.com.br",
    repo: "https://github.com/jvgusmaoleal/portfolio-joao-leal",
  },
  contacts: [
    {
      label: "E-mail",
      href: "mailto:contato@drakescompany.com",
      handle: "contato@drakescompany.com",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/5581988865866",
      handle: "conversar agora",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/drakescompany/",
      handle: "/company/drakescompany",
    },
  ] satisfies ContactChannel[],
};
