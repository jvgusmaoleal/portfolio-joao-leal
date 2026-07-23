import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-5 py-8">
        <p className="font-mono text-xs text-mute">
          {site.name} · {site.title}
        </p>
        <p className="font-mono text-xs text-mute">
          feito com vibe coding <span aria-hidden="true" className="text-amber">▮</span>
        </p>
      </div>
    </footer>
  );
}
