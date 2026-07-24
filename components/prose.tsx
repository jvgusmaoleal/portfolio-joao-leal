export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-2xl space-y-4">
      {paragraphs.map((p) => (
        <p key={p.slice(0, 32)} className="leading-relaxed text-mute">
          {p}
        </p>
      ))}
    </div>
  );
}
