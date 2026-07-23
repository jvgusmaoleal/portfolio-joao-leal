import Image from "next/image";
import { crm } from "@/content/crm";
import { TerminalWindow } from "@/components/terminal-window";
import { printExists } from "@/lib/prints";

export function ModuleGallery() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {crm.modules.map((mod) => {
        const has = printExists(mod.image);
        return (
          <TerminalWindow key={mod.name} title={`modulo: ${mod.name.toLowerCase()}`}>
            {has && mod.image ? (
              <Image
                src={`/crm/${mod.image}`}
                alt={`Tela do módulo ${mod.name} do CRM`}
                width={1280}
                height={800}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="rounded border border-line"
              />
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center rounded border border-dashed border-line">
                <p aria-hidden="true" className="font-mono text-xs text-mute">
                  $ carregando print de {mod.name.toLowerCase()}...
                </p>
              </div>
            )}
            <h3 className="mt-4 font-bold">{mod.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-mute">{mod.blurb}</p>
          </TerminalWindow>
        );
      })}
    </div>
  );
}
