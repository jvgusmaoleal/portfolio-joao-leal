import { existsSync } from "node:fs";
import { join } from "node:path";

export function printExists(file?: string): boolean {
  if (!file) return false;
  return existsSync(join(process.cwd(), "public", "crm", file));
}
