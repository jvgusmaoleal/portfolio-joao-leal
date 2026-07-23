import { crm } from "@/content/crm";

export function AiProcess() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="max-w-2xl space-y-4">
        {crm.aiProcess.paragraphs.map((p, i) => (
          <p key={i} className="leading-relaxed text-mute">
            {p}
          </p>
        ))}
      </div>
      <ul className="h-fit space-y-2 rounded-lg border border-line bg-surface p-5">
        {crm.aiProcess.facts.map((f) => (
          <li key={f} className="flex gap-2 font-mono text-xs text-mute">
            <span aria-hidden="true" className="text-amber">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
