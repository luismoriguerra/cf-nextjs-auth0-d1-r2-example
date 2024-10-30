import { getRequestContext } from "@cloudflare/next-on-pages";



export function getR2() {
  return getRequestContext().env.R2;
}
