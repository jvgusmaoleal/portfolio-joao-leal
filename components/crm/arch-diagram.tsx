import { TerminalWindow } from "@/components/terminal-window";

const DIAGRAM = String.raw`
 ┌─────────────────┐         ┌──────────────────┐
 │    FRONTEND     │  HTTPS  │    PROXY NODE    │
 │   vanilla JS    │────────▶│     (Railway)    │
 │    (Vercel)     │         └────────┬─────────┘
 └───────┬─────────┘                  │
         │                     Microsoft Graph
         ▼                    ┌───────┴────────┐
 ┌─────────────────┐          │ SharePoint IDs │
 │    SUPABASE     │          │ OneDrive PDFs  │
 │ Postgres · 23 t │          │ E-mail fin/op  │
 └───────┬─────────┘          └────────────────┘
         │
   ┌─────┴──────┬─────────────┬──────────────┐
   ▼            ▼             ▼              ▼
 Claude      ShipServ     SendPulse     AwesomeAPI
 Vision     (RFQ mail)   (campanhas)    (USD/BRL)
`;

export function ArchDiagram() {
  return (
    <TerminalWindow title="arquitetura.txt">
      <pre
        aria-label="Diagrama: frontend na Vercel fala com proxy Node no Railway e com Supabase; proxy integra Microsoft Graph (SharePoint, OneDrive, e-mail); sistema usa Claude Vision, ShipServ, SendPulse e AwesomeAPI"
        className="overflow-x-auto font-mono text-[11px] leading-relaxed text-mute sm:text-xs"
      >
        {DIAGRAM}
      </pre>
    </TerminalWindow>
  );
}
