import { crm } from "@/content/crm";
import { site } from "@/content/site";
import { BackLink } from "./back-link";

export function CaseHero() {
  return (
    <header className="mx-auto max-w-5xl px-5 pb-4 pt-14 sm:pt-20">
      <BackLink />
      <p aria-hidden="true" className="mt-8 font-mono text-sm">
        <span className="text-amber">{site.promptPath} $</span>{" "}
        <span className="text-mute">{crm.cmd}</span>
      </p>
      <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
        {crm.title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute sm:text-lg">
        {crm.subtitle}
      </p>
    </header>
  );
}
