import { crm } from "@/content/crm";
import { ExternalLink } from "@/components/external-link";

export function ResultsGrid() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {crm.results.areas.map((r) => (
          <div key={r.area} className="rounded-lg border border-line bg-surface p-5">
            <h3 className="font-mono text-sm font-bold text-amber">
              {r.area}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mute">{r.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 max-w-2xl leading-relaxed text-mute">
        {crm.results.extra}{" "}
        <ExternalLink href={crm.results.siteUrl}>
          Ver o site da Costa Maritime <span aria-hidden="true">↗</span>
        </ExternalLink>
      </p>
    </div>
  );
}
