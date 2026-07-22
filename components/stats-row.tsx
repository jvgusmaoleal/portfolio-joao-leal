import { stats } from "@/content/home";

export function StatsRow() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface p-5">
            <dd className="font-mono text-2xl font-bold text-amber sm:text-3xl">
              {s.value}
            </dd>
            <dt className="mt-1 text-xs leading-snug text-mute sm:text-sm">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
