import Link from "next/link";

export function ContactCta({ prompt }: { prompt: string }) {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-20">
      <div className="rounded-lg border border-amber/30 bg-amber/5 p-8 text-center">
        <p aria-hidden="true" className="font-mono text-sm text-amber">
          $ {prompt}
        </p>
        <Link
          href="/#contato"
          className="mt-4 inline-block rounded-md bg-amber px-6 py-3 font-mono text-sm font-bold text-bg transition-colors hover:bg-amber-soft"
        >
          Falar com João <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
