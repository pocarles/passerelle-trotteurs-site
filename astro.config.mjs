// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.passerelle-trotteurs.fr",
  // "never" keeps every stylesheet external so the CSP can use
  // style-src 'self' with no inline allowance. On a multi-page site the
  // shared sheet is also cached once instead of duplicated per page.
  build: { inlineStylesheets: "never" },
});
