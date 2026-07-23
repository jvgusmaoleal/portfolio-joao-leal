import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "404 — comando não encontrado",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-start justify-center px-5">
      <p aria-hidden="true" className="font-mono text-sm">
        <span className="text-amber">{site.promptPath} $</span>{" "}
        <span className="text-ink">abrir pagina</span>
      </p>
      <p aria-hidden="true" className="mt-3 font-mono text-sm text-mute">
        bash: pagina: comando não encontrado{" "}
        <span className="text-amber">(404)</span>
      </p>
      <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
        Essa página não existe.
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-md bg-amber px-5 py-2.5 font-mono text-sm font-bold text-bg transition-colors hover:bg-amber-soft"
      >
        cd ~/ <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
