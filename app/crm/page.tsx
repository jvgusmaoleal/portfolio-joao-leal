import type { Metadata } from "next";
import { CaseHero } from "@/components/crm/case-hero";
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
    </main>
  );
}
