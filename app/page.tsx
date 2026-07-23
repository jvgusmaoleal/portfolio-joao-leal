import { Hero } from "@/components/hero";
import { StatsRow } from "@/components/stats-row";
import { ProjectCard } from "@/components/project-card";
import { ProcessSteps } from "@/components/process-steps";
import { Contact } from "@/components/contact";
import { Section } from "@/components/section";
import { projects } from "@/content/home";

export default function Home() {
  const [crmProject, ...otherProjects] = projects;
  return (
    <main>
      <Hero />
      <StatsRow />
      <Section id="projetos" cmd="ls projetos/" title="Projetos">
        <div className="grid gap-4">
          <ProjectCard project={crmProject} />
          <div className="grid gap-4 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </Section>
      <Section cmd="cat processo.md" title="Como eu trabalho">
        <ProcessSteps />
      </Section>
      <Section id="contato" cmd="./contato --agora" title="Vamos conversar?">
        <Contact />
      </Section>
    </main>
  );
}
