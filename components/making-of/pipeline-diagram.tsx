import { TerminalWindow } from "@/components/terminal-window";

const DIAGRAM = String.raw`
  brainstorming
       │   (design aprovado pelo João)
       ▼
  spec + self-review  ──────▶  docs/superpowers/specs/
       │
       ▼
  plano em tasks      ──────▶  docs/superpowers/plans/
       │
       ▼
  execução por subagentes
       │   revisão em 2 etapas:  spec ✓   código ✓
       ▼
  humanizer na copy   ──────▶  (João aprova cada ajuste)
       │
       ▼
  verificação         ──────▶  build · lint · browser
       │
       ▼
    git commit
`;

export function PipelineDiagram() {
  return (
    <TerminalWindow title="pipeline.txt">
      <pre
        role="img"
        aria-label="Fluxo do método: brainstorming com design aprovado pelo João; depois spec com auto-revisão, salva em docs/superpowers/specs; depois plano em tarefas, salvo em docs/superpowers/plans; execução por subagentes com revisão em duas etapas (spec e código); humanizer na copy com aprovação do João a cada ajuste; verificação por build, lint e browser; e por fim o commit."
        className="overflow-x-auto font-mono text-[11px] leading-relaxed text-mute sm:text-xs"
      >
        {DIAGRAM}
      </pre>
    </TerminalWindow>
  );
}
