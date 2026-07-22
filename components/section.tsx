import { TerminalPrompt } from "./terminal-prompt";

export function Section({
  id,
  cmd,
  title,
  children,
}: {
  id?: string;
  cmd: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-8 px-5 py-14 sm:py-20">
      <TerminalPrompt cmd={cmd} />
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
