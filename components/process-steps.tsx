import { processSteps } from "@/content/home";

export function ProcessSteps() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {processSteps.map((step, i) => (
        <li
          key={step.cmd}
          className="rounded-lg border border-line bg-surface p-5"
        >
          <p aria-hidden="true" className="font-mono text-xs text-mute">
            [{i + 1}/{processSteps.length}]{" "}
            <span className="text-amber">$ {step.cmd}</span>
          </p>
          <h3 className="mt-2 font-bold">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-mute">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
