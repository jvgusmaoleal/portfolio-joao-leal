import type { SocioBlock } from "@/content/types";

export function BusinessBlock({ block }: { block: SocioBlock }) {
  return (
    <div>
      <h3 className="font-mono text-sm font-bold text-amber">{block.heading}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {block.items.map((item) => (
          <div
            key={item.name}
            className="rounded-lg border border-line bg-surface p-5"
          >
            <h4 className="font-bold">{item.name}</h4>
            <p className="mt-2 text-sm leading-relaxed text-mute">{item.detail}</p>
            {item.stack ? (
              <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                {item.stack.map((s) => (
                  <li key={s} className="flex gap-2 text-sm text-mute">
                    <span aria-hidden="true" className="font-mono text-amber">
                      ▸
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
