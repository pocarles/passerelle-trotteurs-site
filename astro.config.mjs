// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.passerelle-trotteurs.fr",
  // "never" keeps every stylesheet external so the CSP can use
  // style-src 'self' with no inline allowance. On a multi-page site the
  // shared sheet is also cached once instead of duplicated per page.
  // Directory format: Cloudflare Pages 308-redirects /association to
  // /association/ and serves it there. The redirect is edge-served and the
  // canonical URL already matches the trailing-slash form, so it costs
  // nothing. "file" format would avoid the hop but emits /association.html
  // into the canonical, which is worse.
  build: { inlineStylesheets: "never" },
});
