import { Hero } from "@/components/hero";
import { StatsRow } from "@/components/stats-row";
import { ProjectCard } from "@/components/project-card";
import { TechStack } from "@/components/tech-stack";
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
      <Section id="stack" cmd="cat stack.md" title="Stack & vibe coding">
        <TechStack />
      </Section>
      <Section id="contato" cmd="./contato --agora" title="Vamos conversar?">
        <Contact />
      </Section>
    </main>
  );
}
