import { pipeline } from "@/content/making-of";

export function PipelineSteps() {
  return (
    <div className="grid gap-8">
      <ol className="grid gap-3">
        {pipeline.steps.map((step, i) => (
          <li
            key={step.label}
            className="flex gap-3 rounded-lg border border-line bg-surface p-4"
          >
            <span aria-hidden="true" className="font-mono text-sm text-amber">
              0{i + 1}
            </span>
            <div>
              <h3 className="font-mono text-sm font-bold text-amber">
                {step.label}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-mute">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <div>
        <h3 className="font-mono text-sm text-amber"># ferramentas</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {pipeline.tools.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-mute"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
