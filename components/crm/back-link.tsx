import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/"
      className="font-mono text-sm text-mute transition-colors hover:text-amber"
    >
      <span aria-hidden="true">←</span> cd ~/
    </Link>
  );
}
