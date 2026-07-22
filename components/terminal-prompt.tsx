import { site } from "@/content/site";

export function TerminalPrompt({
  cmd,
  className = "",
}: {
  cmd: string;
  className?: string;
}) {
  return (
    <p className={`font-mono text-sm ${className}`}>
      <span className="text-amber">{site.promptPath} $</span>{" "}
      <span className="text-mute">{cmd}</span>
    </p>
  );
}
