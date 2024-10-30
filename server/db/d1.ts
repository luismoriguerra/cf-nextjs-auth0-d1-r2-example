import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";


export function getDb() {
  return getRequestContext().env.DB;
}

export async function executeQuery(query: string, bind: any[] = []) {
  const db = getDb();
  const stmt = db.prepare(query).bind(...bind);
  return await stmt.all();
}
