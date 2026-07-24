import { stack } from "@/content/home";

export function TechStack() {
  return (
    <div className="grid gap-8">
      <p className="max-w-3xl text-sm leading-relaxed text-mute sm:text-base">
        {stack.intro}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {stack.groups.map((group) => (
          <div
            key={group.label}
            className="rounded-lg border border-line bg-surface p-5"
          >
            <p className="font-mono text-xs text-amber"># {group.label}</p>
            <ul className="mt-3 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.name} className="flex gap-2 text-sm">
                  <span aria-hidden="true" className="font-mono text-amber">
                    ▸
                  </span>
                  <span className="leading-relaxed">
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-mute"> — {item.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>
        <h3 className="text-lg font-bold">Vibe coding, do meu jeito</h3>
        <p className="mt-1 text-sm text-mute">
          IA escreve código rápido. O critério continua sendo meu.
        </p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {stack.principles.map((p, i) => (
            <li
              key={p.title}
              className="flex gap-3 rounded-lg border border-line bg-surface p-4"
            >
              <span aria-hidden="true" className="font-mono text-sm text-amber">
                0{i + 1}
              </span>
              <div>
                <h4 className="text-sm font-bold">{p.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-mute">
                  {p.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-mute sm:text-base">
        {stack.outro}
      </p>
    </div>
  );
}
