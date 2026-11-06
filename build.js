// Gera as páginas do site em cada idioma, com todo o texto já escrito no HTML (bom para o Google).
//   src/index.template.html + i18n.js  ->  index.html (PT), en/index.html, es/index.html, sitemap.xml, robots.txt
// Uso: node build.js
// Caminhos dos arquivos são relativos ({{base}}), então o site funciona tanto em www.mavision.com.br quanto numa subpasta (GitHub Pages).
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const T = require("./i18n.js");

const SITE = "https://www.mavision.com.br";
const WA = "5531972014324"; // André: número principal de atendimento
const LANGS = {
  pt: { dir: "", hl: "pt-BR", og: "pt_BR", out: "index.html" },
  en: { dir: "en/", hl: "en", og: "en_US", out: "en/index.html" },
  es: { dir: "es/", hl: "es", og: "es_ES", out: "es/index.html" },
};
const X_DEFAULT = "en"; // versão mostrada a quem não fala nenhum dos três idiomas

// Política de segurança. O GitHub Pages não envia cabeçalhos próprios, então ela vai em uma meta tag de cada página.
const FONTS = "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com";
const CSP_SITE = `default-src 'none'; script-src 'self'; ${FONTS}; img-src 'self' data:; frame-src 'self'; manifest-src 'self'; base-uri 'none'; form-action 'none'`;
const cspExample = scripts => `default-src 'none'; script-src ${scripts.length ? scripts.join(" ") : "'none'"}; ${FONTS}; img-src 'self' data:; base-uri 'none'; form-action 'none'`;
const secTags = csp => `<meta http-equiv="Content-Security-Policy" content="${csp}">\n<meta name="referrer" content="strict-origin-when-cross-origin">`;

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const url = l => SITE + "/" + LANGS[l].dir;
const tpl = fs.readFileSync(path.join(__dirname, "src/index.template.html"), "utf8");

function head(l) {
  const t = T[l], alt = Object.keys(LANGS).map(k => `<link rel="alternate" hreflang="${LANGS[k].hl}" href="${url(k)}">`);
  alt.push(`<link rel="alternate" hreflang="x-default" href="${url(X_DEFAULT)}">`);
  const img = SITE + "/og-image.jpg", og = [["og:type", "website"], ["og:site_name", "MAvision"], ["og:locale", LANGS[l].og], ...Object.keys(LANGS).filter(k => k !== l).map(k => ["og:locale:alternate", LANGS[k].og]), ["og:url", url(l)], ["og:title", t.mt], ["og:description", t.md], ["og:image", img], ["og:image:width", "1200"], ["og:image:height", "630"], ["og:image:alt", "MAvision"]]
    .map(([p, c]) => `<meta property="${p}" content="${esc(c)}">`);
  const tw = [["twitter:card", "summary_large_image"], ["twitter:title", t.mt], ["twitter:description", t.md], ["twitter:image", img]].map(([n, c]) => `<meta name="${n}" content="${esc(c)}">`);
  return [`<title>${esc(t.mt)}</title>`, `<meta name="description" content="${esc(t.md)}">`, `<link rel="canonical" href="${url(l)}">`, ...alt, ...og, ...tw].join("\n");
}

function ld(l) {
  const t = T[l];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService", "@id": SITE + "/#mavision", name: "MAvision", url: url(l), inLanguage: LANGS[l].hl,
        slogan: "Your vision is MAvision", description: t.hs, logo: SITE + "/icon-512.png", image: SITE + "/og-image.jpg",
        email: "mavisionsites@gmail.com", telephone: "+55-31-97201-4324",
        address: { "@type": "PostalAddress", addressLocality: "Belo Horizonte", addressRegion: "MG", addressCountry: "BR" },
        areaServed: [{ "@type": "Country", name: "Brazil" }, { "@type": "Place", name: "North America" }, { "@type": "Place", name: "Europe" }],
        availableLanguage: ["pt-BR", "en", "es"], sameAs: ["https://instagram.com/mavisiondigital"],
        makesOffer: { "@type": "Offer", itemOffered: { "@type": "Service", name: t.s1 }, priceSpecification: (l === "pt" ? [["349.90", "BRL"]] : [["150", "USD"], ["150", "EUR"]]).map(([minPrice, priceCurrency]) => ({ "@type": "PriceSpecification", minPrice, priceCurrency })) },
        hasOfferCatalog: { "@type": "OfferCatalog", name: t.st, itemListElement: ["s1", "s2", "s3", "s4", "s5"].map(k => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t[k], description: t["d" + k.slice(1)] } })) },
      },
      { "@type": "WebSite", "@id": SITE + "/#site", url: SITE + "/", name: "MAvision", inLanguage: LANGS[l].hl, publisher: { "@id": SITE + "/#mavision" } },
      { "@type": "FAQPage", inLanguage: LANGS[l].hl, mainEntity: [1, 2, 3, 4, 5].map(n => ({ "@type": "Question", name: t["q" + n], acceptedAnswer: { "@type": "Answer", text: t["w" + n] } })) },
    ],
  };
  return '<script type="application/ld+json">\n' + JSON.stringify(data).replace(/</g, "\\u003c") + "\n</script>";
}

function page(l) {
  const t = T[l], need = k => { if (!(k in t)) throw new Error(`Texto "${k}" não existe em ${l} (i18n.js)`); return t[k]; };
  let h = tpl
    .replace("{{sec}}", () => secTags(CSP_SITE)).replace("{{hl}}", () => LANGS[l].hl).replace("{{head}}", () => head(l)).replace("{{ld}}", () => ld(l)).replace("{{lc}}", () => l.toUpperCase())
    .split("{{base}}").join(LANGS[l].dir ? "../" : "").split("{{home}}").join(LANGS[l].dir ? "../" : "./")
    .split("{{wa}}").join(esc(`https://wa.me/${WA}?text=${encodeURIComponent(t.wam)}`));
  h = h.replace(/(<(\w+)\b[^>]*\sdata-t="(\w+)"[^>]*>)(<\/\2>)/g, (m, open, tag, k, close) => open + esc(need(k)) + close);
  h = h.replace(/(<\w+\b[^>]*\sdata-p="(\w+)")/g, (m, a, k) => `${a} placeholder="${esc(need(k))}"`);
  h = h.replace(/<(\w+)\b([^>]*)\sdata-a="(\w+)"/g, (m, tag, a, k) => `<${tag}${a} data-a="${k}" ${tag.toLowerCase() === "iframe" ? "title" : "aria-label"}="${esc(need(k))}"`);
  h = h.replace(/<div class="g"><\/div>/g, '<div class="g">' + Array(6).fill(t.mq.map(w => `<span>${esc(w)}</span><span>✦</span>`).join("")).join("") + "</div>");
  h = h.replace(new RegExp(`(<a [^>]*data-l="${l}")`), '$1 aria-current="true"');
  const left = h.match(/\{\{\w+\}\}|<(\w+)\b[^>]*\sdata-t="\w+"[^>]*><\/\1>/g);
  if (left) throw new Error(`Sobrou algo sem preencher em ${l}: ${left.slice(0, 3).join(" ")}`);
  return h.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!-- Gerado por build.js a partir de src/index.template.html e i18n.js. Não edite este arquivo; edite o modelo e rode: node build.js -->");
}

for (const l of Object.keys(LANGS)) {
  const out = path.join(__dirname, LANGS[l].out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(l));
  console.log("ok", LANGS[l].out);
}

// Exemplos: libera só os scripts exatos de cada página, pelo hash. Rodar de novo após editar um exemplo.
for (const f of fs.readdirSync(path.join(__dirname, "exemplos")).filter(n => n.endsWith(".html"))) {
  const p = path.join(__dirname, "exemplos", f);
  let h = fs.readFileSync(p, "utf8").replace(/<meta http-equiv="Content-Security-Policy"[^>]*>\r?\n<meta name="referrer"[^>]*>\r?\n/, "");
  const hashes = [...h.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)]
    .map(m => "'sha256-" + crypto.createHash("sha256").update(m[1].replace(/\r\n?/g, "\n"), "utf8").digest("base64") + "'");
  h = h.replace(/(<meta name="viewport"[^>]*>\r?\n)/, (m, v) => v + secTags(cspExample(hashes)) + "\n");
  fs.writeFileSync(p, h);
  console.log("ok exemplos/" + f, hashes.length, "script(s)");
}

const today = new Date().toISOString().slice(0, 10);
const alts = Object.keys(LANGS).map(k => `    <xhtml:link rel="alternate" hreflang="${LANGS[k].hl}" href="${url(k)}"/>`).concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url(X_DEFAULT)}"/>`).join("\n");
fs.writeFileSync(path.join(__dirname, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  Object.keys(LANGS).map(l => `  <url>\n    <loc>${url(l)}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`).join("\n") + "\n</urlset>\n");
fs.writeFileSync(path.join(__dirname, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /exemplos/\nDisallow: /src/\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log("ok sitemap.xml, robots.txt");
