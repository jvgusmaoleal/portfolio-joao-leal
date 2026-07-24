import type { Metadata } from "next";
import { CaseHero } from "@/components/case-hero";
import { Section } from "@/components/section";
import { Prose } from "@/components/prose";
import { BusinessSection } from "@/components/socio/business-section";
import { ContactCta } from "@/components/contact-cta";
import { hero, thesis, businesses, common } from "@/content/socio";
import { site } from "@/content/site";

const pageTitle = "Sócio & builder: Drakes e Orthotechniques";

export const metadata: Metadata = {
  title: pageTitle,
  description: hero.subtitle,
  alternates: { canonical: "/socio" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/socio",
    siteName: `${site.name} — ${site.title}`,
    title: pageTitle,
    description: hero.subtitle,
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: hero.subtitle,
  },
};

export default function SocioPage() {
  return (
    <main>
      <CaseHero cmd={hero.cmd} title={hero.title} subtitle={hero.subtitle} />
      <Section cmd={thesis.cmd} title="Sócio, não fornecedor">
        <Prose paragraphs={thesis.paragraphs} />
      </Section>
      {businesses.map((b) => (
        <Section key={b.id} id={b.id} cmd={b.cmd} title={b.name}>
          <BusinessSection business={b} />
        </Section>
      ))}
      <Section cmd={common.cmd} title="O fio comum">
        <Prose paragraphs={common.paragraphs} />
      </Section>
      <ContactCta prompt="quer esse método tocando o seu negócio?" />
    </main>
  );
}
