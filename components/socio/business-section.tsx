import type { SocioBusiness } from "@/content/types";
import { Prose } from "@/components/prose";
import { ExternalLink } from "@/components/external-link";
import { BusinessBlock } from "./business-block";

export function BusinessSection({ business }: { business: SocioBusiness }) {
  return (
    <div className="space-y-10">
      <Prose paragraphs={business.intro} />
      {business.blocks?.map((block) => (
        <BusinessBlock key={block.heading} block={block} />
      ))}
      {business.sectors ? (
        <div>
          <h3 className="font-mono text-sm font-bold text-amber">
            Setores atendidos
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {business.sectors.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-mute"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {business.note ? (
        <p className="max-w-2xl text-sm leading-relaxed text-mute">
          {business.note}
        </p>
      ) : null}
      <ExternalLink href={business.link.href}>
        {business.link.label} <span aria-hidden="true">↗</span>
      </ExternalLink>
    </div>
  );
}
