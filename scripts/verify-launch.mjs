import { existsSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const siteUrl = "https://www.passerelle-trotteurs.fr";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function filesUnder(directory, suffix) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(path, suffix);
    return !suffix || path.endsWith(suffix) ? [path] : [];
  });
}

const htmlFiles = filesUnder(dist, ".html");
assert(htmlFiles.length > 0, "No generated HTML found. Run the build first.");

let structuredDataBlocks = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const page = relative(dist, file);
  assert(/<title>[^<]+<\/title>/.test(html), `${page}: missing title`);
  assert(/<meta name="description" content="[^"]+">/.test(html), `${page}: missing description`);
  assert(/<link rel="canonical" href="https:\/\/www\.passerelle-trotteurs\.fr\/[^"]*">/.test(html), `${page}: invalid canonical`);
  assert(/<meta property="og:image" content="https:\/\/www\.passerelle-trotteurs\.fr\/[^"]+">/.test(html), `${page}: missing Open Graph image`);
  assert(/<meta name="twitter:image" content="https:\/\/www\.passerelle-trotteurs\.fr\/[^"]+">/.test(html), `${page}: missing Twitter image`);

  if (page === "404.html") {
    assert(/<meta name="robots" content="noindex, follow">/.test(html), "404.html: must be noindex");
  } else {
    assert(/<meta name="robots" content="index, follow, max-image-preview:large/.test(html), `${page}: must be indexable`);
  }

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [, json] of blocks) {
    JSON.parse(json);
    structuredDataBlocks += 1;
  }
}

const homepage = readFileSync(join(dist, "index.html"), "utf8");
assert(homepage.includes('rel="preload" href="/media/optimized/hero-trotteurs-960.avif" as="image" type="image/avif"'), "Homepage: optimized hero image is not preloaded");
assert(homepage.includes('<source type="image/avif"'), "Homepage: responsive AVIF images are missing");
assert(homepage.includes('<source type="image/webp"'), "Homepage: responsive WebP images are missing");
assert(homepage.includes('"@type":"NGO"'), "Homepage: NGO structured data missing");
assert(homepage.includes('"@type":"WebSite"'), "Homepage: WebSite structured data missing");

const articleFiles = htmlFiles.filter((file) => file.includes(`${join("actualites", "")}`) && file.endsWith("index.html") && file !== join(dist, "actualites", "index.html"));
for (const file of articleFiles) {
  const html = readFileSync(file, "utf8");
  assert(html.includes('<meta property="og:type" content="article">'), `${relative(dist, file)}: article Open Graph type missing`);
  assert(html.includes('"@type":"NewsArticle"'), `${relative(dist, file)}: NewsArticle structured data missing`);
}

const sitemap = readFileSync(join(dist, "sitemap-0.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
for (const url of sitemapUrls) {
  const target = url.pathname === "/"
    ? join(dist, "index.html")
    : join(dist, url.pathname, "index.html");
  assert(existsSync(target), `Sitemap target is missing: ${url.pathname}`);
}

const redirects = readFileSync(join(root, "public", "_redirects"), "utf8");
assert(redirects.includes("/fr/actualites/* /actualites/:splat 301"), "Legacy article redirect is missing");
for (const line of redirects.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [source, destination] = trimmed.split(/\s+/);
  if (source.startsWith("http") || source.includes("*")) continue;
  if (!destination.startsWith("/") || destination.includes(":")) continue;
  const target = destination === "/"
    ? join(dist, "index.html")
    : join(dist, destination, "index.html");
  assert(existsSync(target), `Redirect destination is missing: ${destination}`);
}

const legacyArticles = filesUnder(join(root, "src", "content", "actualites"), ".md")
  .filter((file) => /^legacyUrl:\s*["']?(?:https?:\/\/[^/]+)?\/fr\/actualites\//m.test(readFileSync(file, "utf8")));
assert(legacyArticles.length > 0, "No imported legacy article URLs found");

const robots = readFileSync(join(dist, "robots.txt"), "utf8");
assert(robots.includes("User-agent: *\nAllow: /"), "robots.txt does not allow crawling");
assert(robots.includes("Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference"), "robots.txt content signal is missing");
assert(robots.includes(`${siteUrl}/sitemap-index.xml`), "robots.txt sitemap is missing");

const headers = readFileSync(join(root, "public", "_headers"), "utf8");
const globalHeaders = headers.split("https://passerelle-trotteurs-site.pages.dev/*")[0];
assert(!globalHeaders.includes("X-Robots-Tag"), "Production headers still contain a global noindex");
assert(headers.includes("https://:version.passerelle-trotteurs-site.pages.dev/*"), "Branch preview noindex rule is missing");

const codeFiles = filesUnder(join(root, "src")).filter((file) => [".astro", ".js", ".ts"].includes(extname(file)));
const activeTracking = /document\.cookie|localStorage|sessionStorage|googletagmanager|google-analytics|\bgtag\s*\(|\bfbq\s*\(|connect\.facebook\.net/i;
for (const file of codeFiles) {
  assert(!activeTracking.test(readFileSync(file, "utf8")), `Tracking or browser storage found in ${relative(root, file)}`);
}

console.log(`Launch verification passed: ${htmlFiles.length} HTML pages, ${sitemapUrls.length} sitemap URLs, ${articleFiles.length} articles, ${legacyArticles.length} legacy article redirects, ${structuredDataBlocks} valid JSON-LD blocks.`);
