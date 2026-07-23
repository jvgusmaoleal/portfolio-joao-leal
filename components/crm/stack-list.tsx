import { crm } from "@/content/crm";

export function StackList() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h3 className="font-mono text-sm text-amber"># decisões</h3>
        <ul className="mt-3 space-y-2.5">
          {crm.stack.decisions.map((d) => (
            <li key={d.slice(0, 32)} className="flex gap-2 text-sm text-mute">
              <span aria-hidden="true" className="font-mono text-amber">▸</span>
              <span className="leading-relaxed">{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-mono text-sm text-amber"># integrações</h3>
        <ul className="mt-3 space-y-2.5">
          {crm.stack.integrations.map((i) => (
            <li key={i.name} className="text-sm leading-relaxed text-mute">
              <span className="font-mono font-bold text-ink">{i.name}</span> —{" "}
              {i.desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
