import type { Metadata } from "next";
import { CaseHero } from "@/components/case-hero";
import { Section } from "@/components/section";
import { Prose } from "@/components/prose";
import { ExternalLink } from "@/components/external-link";
import { ContactCta } from "@/components/contact-cta";
import { PipelineDiagram } from "@/components/making-of/pipeline-diagram";
import { PipelineSteps } from "@/components/making-of/pipeline-steps";
import { Timeline } from "@/components/making-of/timeline";
import { ArtifactsGrid } from "@/components/making-of/artifacts-grid";
import { Backstage } from "@/components/making-of/backstage";
import {
  hero,
  challenge,
  pipeline,
  recursion,
  ctaPrompt,
} from "@/content/making-of";
import { site } from "@/content/site";

const pageTitle = "Making-of: como este site foi construído";

export const metadata: Metadata = {
  title: pageTitle,
  description: hero.subtitle,
  alternates: { canonical: "/making-of" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/making-of",
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

export default function MakingOfPage() {
  return (
    <main>
      <CaseHero cmd={hero.cmd} title={hero.title} subtitle={hero.subtitle} />
      <Section cmd={challenge.cmd} title={challenge.title}>
        <Prose paragraphs={challenge.paragraphs} />
      </Section>
      <Section cmd={pipeline.cmd} title={pipeline.title}>
        <div className="space-y-8">
          <Prose paragraphs={pipeline.intro} />
          <PipelineDiagram />
          <PipelineSteps />
        </div>
      </Section>
      <Section cmd="git log --oneline" title="A linha do tempo, commit a commit">
        <Timeline />
      </Section>
      <Section cmd="ls docs/superpowers/" title="Os artefatos, abertos">
        <ArtifactsGrid />
      </Section>
      <Section cmd="cat bastidores.md" title="Bastidores">
        <Backstage />
      </Section>
      <Section cmd={recursion.cmd} title={recursion.title}>
        <Prose paragraphs={recursion.paragraphs} />
        <p className="mt-6">
          <ExternalLink href={site.links.repo}>
            Ver o repositório no GitHub <span aria-hidden="true">↗</span>
          </ExternalLink>
        </p>
      </Section>
      <ContactCta prompt={ctaPrompt} />
    </main>
  );
}
