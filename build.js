// Gera as páginas do site em cada idioma, com todo o texto já escrito no HTML (bom para o Google).
//   src/index.template.html + i18n.js  ->  index.html (PT), en/index.html, es/index.html, sitemap.xml, robots.txt
// Uso: node build.js
const fs = require("fs"), path = require("path");
const T = require("./i18n.js");

const SITE = "https://mavision.com.br";
const WA = "5531972014324"; // André: número principal de atendimento
const LANGS = {
  pt: { dir: "", hl: "pt-BR", out: "index.html" },
  en: { dir: "en/", hl: "en", out: "en/index.html" },
  es: { dir: "es/", hl: "es", out: "es/index.html" },
};
const X_DEFAULT = "en"; // versão mostrada a quem não fala nenhum dos três idiomas

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const url = l => SITE + "/" + LANGS[l].dir;
const tpl = fs.readFileSync(path.join(__dirname, "src/index.template.html"), "utf8");

function head(l) {
  const t = T[l], alt = Object.keys(LANGS).map(k => `<link rel="alternate" hreflang="${LANGS[k].hl}" href="${url(k)}">`);
  alt.push(`<link rel="alternate" hreflang="x-default" href="${url(X_DEFAULT)}">`);
  return [`<title>${esc(t.mt)}</title>`, `<meta name="description" content="${esc(t.md)}">`, `<link rel="canonical" href="${url(l)}">`, ...alt].join("\n");
}

function ld(l) {
  const t = T[l];
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService", "@id": SITE + "/#mavision", name: "MAvision", url: url(l), inLanguage: LANGS[l].hl,
        slogan: "Your vision is MAvision", description: t.hs, logo: SITE + "/icon-512.png", image: SITE + "/icon-512.png",
        email: "mavisionsites@gmail.com", telephone: "+55-31-97201-4324",
        areaServed: [{ "@type": "Country", name: "Brazil" }, { "@type": "Place", name: "North America" }, { "@type": "Place", name: "Europe" }],
        availableLanguage: ["pt-BR", "en", "es"], sameAs: ["https://instagram.com/mavisiondigital"],
        makesOffer: { "@type": "Offer", itemOffered: { "@type": "Service", name: t.s1 }, priceSpecification: { "@type": "PriceSpecification", minPrice: "349.90", priceCurrency: "BRL" } },
        hasOfferCatalog: { "@type": "OfferCatalog", name: t.st, itemListElement: ["s1", "s2", "s3", "s4", "s5"].map(k => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t[k], description: t["d" + k.slice(1)] } })) },
      },
      { "@type": "FAQPage", inLanguage: LANGS[l].hl, mainEntity: [1, 2, 3, 4, 5].map(n => ({ "@type": "Question", name: t["q" + n], acceptedAnswer: { "@type": "Answer", text: t["w" + n] } })) },
    ],
  };
  return '<script type="application/ld+json">\n' + JSON.stringify(data).replace(/</g, "\\u003c") + "\n</script>";
}

function page(l) {
  const t = T[l], need = k => { if (!(k in t)) throw new Error(`Texto "${k}" não existe em ${l} (i18n.js)`); return t[k]; };
  let h = tpl
    .replace("{{hl}}", () => LANGS[l].hl).replace("{{head}}", () => head(l)).replace("{{ld}}", () => ld(l)).replace("{{lc}}", () => l.toUpperCase())
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

const today = new Date().toISOString().slice(0, 10);
const alts = Object.keys(LANGS).map(k => `    <xhtml:link rel="alternate" hreflang="${LANGS[k].hl}" href="${url(k)}"/>`).concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${url(X_DEFAULT)}"/>`).join("\n");
fs.writeFileSync(path.join(__dirname, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
  Object.keys(LANGS).map(l => `  <url>\n    <loc>${url(l)}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`).join("\n") + "\n</urlset>\n");
fs.writeFileSync(path.join(__dirname, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /exemplos/\nDisallow: /src/\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log("ok sitemap.xml, robots.txt");
