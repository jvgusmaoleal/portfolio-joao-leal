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
          <p aria-hidden="true" className="font-mono text-sm text-amber">
            $ quer um sistema assim na sua empresa?
          </p>
          <Link
            href="/#contato"
            className="mt-4 inline-block rounded-md bg-amber px-6 py-3 font-mono text-sm font-bold text-bg transition-colors hover:bg-amber-soft"
          >
            Falar com João <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
