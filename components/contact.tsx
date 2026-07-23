import { site } from "@/content/site";

export function Contact() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {site.contacts.map((c) => {
        const isMail = c.href.startsWith("mailto:");
        return (
          <a
            key={c.label}
            href={c.href}
            target={isMail ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group rounded-lg border border-line bg-surface p-5 transition-colors hover:border-amber/50"
          >
            <p aria-hidden="true" className="font-mono text-xs text-mute">
              $ open {c.label.toLowerCase()}
            </p>
            <p className="mt-2 font-mono text-sm text-amber group-hover:text-amber-soft">
              {c.handle}
              {!isMail && (
                <span className="sr-only"> (abre em nova aba)</span>
              )}
            </p>
          </a>
        );
      })}
    </div>
  );
}
