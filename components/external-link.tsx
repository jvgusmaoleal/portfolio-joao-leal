export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-amber underline-offset-4 transition-colors hover:text-amber-soft hover:underline ${className}`}
    >
      {children}
    </a>
  );
}
