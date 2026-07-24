import { crm } from "@/content/crm";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-line bg-bg px-2 py-1 font-mono text-[11px] text-mute">
      {children}
    </span>
  );
}

function Camada({
  rotulo,
  children,
  destaque = false,
}: {
  rotulo: string;
  children: React.ReactNode;
  destaque?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        destaque ? "border-amber/40 bg-amber/5" : "border-line bg-surface"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-wider text-amber">
        {rotulo}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Fio() {
  return (
    <div aria-hidden="true" className="flex justify-center py-1.5">
      <span className="h-4 w-px bg-line" />
    </div>
  );
}

/** Arquitetura do CRM: módulos, aplicação, dados e integrações. */
export function ArchStack() {
  const modulos = crm.modules.map((m) => m.name);
  const integracoes = crm.stack.integrations.map((i) => i.name);

  return (
    <div className="mb-4 rounded-lg border border-line bg-bg/40 p-4">
      <Camada rotulo={`${modulos.length} módulos em produção`}>
        <div className="flex flex-wrap gap-1.5">
          {modulos.map((m) => (
            <Chip key={m}>{m}</Chip>
          ))}
        </div>
      </Camada>

      <Fio />

      <Camada rotulo="Aplicação" destaque>
        <div className="grid gap-2 sm:grid-cols-2">
          <p className="text-sm text-ink">
            Frontend em JavaScript puro
            <span className="block font-mono text-[11px] text-mute">
              zero dependências · Vercel
            </span>
          </p>
          <p className="text-sm text-ink">
            Proxy Node.js
            <span className="block font-mono text-[11px] text-mute">
              ponte segura · Railway
            </span>
          </p>
        </div>
      </Camada>

      <Fio />

      <div className="grid gap-3 sm:grid-cols-2">
        <Camada rotulo="Banco de dados">
          <p className="text-sm text-ink">Supabase · PostgreSQL</p>
          <p className="mt-1 font-mono text-[11px] text-mute">
            23 tabelas · migrações versionadas · região São Paulo
          </p>
        </Camada>

        <Camada rotulo={`${integracoes.length} integrações`}>
          <div className="flex flex-wrap gap-1.5">
            {integracoes.map((i) => (
              <Chip key={i}>{i}</Chip>
            ))}
          </div>
        </Camada>
      </div>
    </div>
  );
}
