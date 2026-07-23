import { hero } from "@/content/home";
import { site } from "@/content/site";

export function Hero() {
  return (
    <header className="mx-auto max-w-5xl px-5 pb-10 pt-20 sm:pb-16 sm:pt-28">
      <p aria-hidden="true" className="font-mono text-sm sm:text-base">
        <span className="text-amber">{site.promptPath} $</span>{" "}
        <span className="text-ink">{hero.cmd}</span>
      </p>
      <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
        {hero.headline}
      </h1>
      <p className="mt-1 font-mono text-xl font-semibold text-amber sm:text-2xl">
        {hero.role}
      </p>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
        {hero.sub}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={hero.ctaPrimary.href}
          className="rounded-md bg-amber px-5 py-2.5 font-mono text-sm font-bold text-bg transition-colors hover:bg-amber-soft"
        >
          {hero.ctaPrimary.label} <span aria-hidden="true">→</span>
        </a>
        <a
          href={hero.ctaSecondary.href}
          className="rounded-md border border-line px-5 py-2.5 font-mono text-sm text-amber-soft transition-colors hover:border-amber/50"
        >
          {hero.ctaSecondary.label}
        </a>
      </div>
    </header>
  );
}
