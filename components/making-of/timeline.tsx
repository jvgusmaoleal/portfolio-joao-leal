import { TerminalWindow } from "@/components/terminal-window";
import { timeline } from "@/content/making-of";

export function Timeline() {
  return (
    <TerminalWindow title="git log --oneline">
      <div className="space-y-6 overflow-x-auto font-mono text-xs sm:text-sm">
        {timeline.map((chapter) => (
          <div key={chapter.title}>
            <p className="text-amber"># {chapter.title}</p>
            <p className="mt-0.5 text-mute/70">{"# "}{chapter.note}</p>
            <ul className="mt-2 space-y-1">
              {chapter.commits.map((c) => (
                <li key={c.hash} className="flex gap-3 whitespace-nowrap">
                  <span className="text-amber">{c.hash}</span>
                  <span className="hidden text-mute/60 sm:inline">{c.date}</span>
                  <span className="whitespace-normal text-mute">
                    {c.message}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </TerminalWindow>
  );
}
