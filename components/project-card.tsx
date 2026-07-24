import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { printExists } from "@/lib/prints";
import { ArchStack } from "@/components/arch-stack";

function CardLink({
  link,
  primary,
}: {
  link: Project["links"][number];
  primary: boolean;
}) {
  const base = primary
    ? "rounded-md bg-amber px-4 py-2 font-mono text-xs font-bold text-bg hover:bg-amber-soft"
    : "rounded-md border border-line px-4 py-2 font-mono text-xs text-amber-soft hover:border-amber/50";
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} transition-colors`}
      >
        {link.label} <span aria-hidden="true">↗</span>
        <span className="sr-only"> (abre em nova aba)</span>
      </a>
    );
  }
  return (
    <Link href={link.href} className={`${base} transition-colors`}>
      {link.label} <span aria-hidden="true">→</span>
    </Link>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-lg border border-line bg-surface p-6">
      {project.visual === "arch" ? <ArchStack /> : null}
      {project.visual !== "arch" && project.image && printExists(project.image) ? (
        <Image
          src={`/crm/${project.image}`}
          alt={`Tela do sistema ${project.name}`}
          width={1280}
          height={800}
          sizes="(min-width: 1024px) 984px, 100vw"
          className="mb-4 rounded border border-line"
        />
      ) : null}
      <span className="w-fit rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-[11px] text-amber">
        {project.badge}
      </span>
      <h3 className="mt-4 text-xl font-bold">{project.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mute">
        {project.description}
      </p>
      <ul className="mt-4 space-y-1.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-mute">
            <span aria-hidden="true" className="font-mono text-amber">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2 pt-2">
        {project.links.map((link, i) => (
          <CardLink key={link.href} link={link} primary={i === 0} />
        ))}
      </div>
    </article>
  );
}
