import type { Metadata } from "next";
import { CaseHero } from "@/components/case-hero";
import { ContactCta } from "@/components/contact-cta";
import { ModuleGallery } from "@/components/crm/module-gallery";
import { ArchDiagram } from "@/components/crm/arch-diagram";
import { StackList } from "@/components/crm/stack-list";
import { AiProcess } from "@/components/crm/ai-process";
import { ResultsGrid } from "@/components/crm/results-grid";
import { Section } from "@/components/section";
import { crm } from "@/content/crm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Estudo de caso: CRM Costa Maritime",
  description: crm.subtitle,
  alternates: { canonical: "/crm" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/crm",
    siteName: `${site.name} — ${site.title}`,
    title: "Estudo de caso: CRM Costa Maritime",
    description: crm.subtitle,
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudo de caso: CRM Costa Maritime",
    description: crm.subtitle,
  },
};

export default function CrmCasePage() {
  return (
    <main>
      <CaseHero cmd={crm.cmd} title={crm.title} subtitle={crm.subtitle} />
      <Section cmd="whatis costa-maritime-hub" title={crm.definition.heading}>
        <div className="max-w-2xl space-y-4">
          {crm.definition.paragraphs.map((p) => (
            <p key={p.slice(0, 32)} className="leading-relaxed text-mute">
              {p}
            </p>
          ))}
        </div>
      </Section>
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
      <ContactCta prompt="quer um sistema assim na sua empresa?" />
    </main>
  );
}
