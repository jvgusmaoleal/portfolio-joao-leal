import { backstage } from "@/content/making-of";

export function Backstage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {backstage.map((story) => (
        <div
          key={story.title}
          className="rounded-lg border border-line bg-surface p-5"
        >
          <h3 className="font-mono text-sm font-bold text-amber">
            {story.title}
          </h3>
          <div className="mt-2 space-y-3">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 32)} className="text-sm leading-relaxed text-mute">
                {p}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
