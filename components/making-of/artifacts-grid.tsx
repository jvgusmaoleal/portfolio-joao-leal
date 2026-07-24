import { ExternalLink } from "@/components/external-link";
import { artifacts } from "@/content/making-of";

export function ArtifactsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {artifacts.map((a) => (
        <div
          key={a.name}
          className="flex flex-col rounded-lg border border-line bg-surface p-5"
        >
          <h3 className="font-mono text-sm font-bold text-amber">{a.name}</h3>
          <p className="mt-2 grow text-sm leading-relaxed text-mute">{a.role}</p>
          <p className="mt-4">
            <ExternalLink href={a.href} className="text-sm">
              ver no GitHub <span aria-hidden="true">↗</span>
            </ExternalLink>
          </p>
        </div>
      ))}
    </div>
  );
}
