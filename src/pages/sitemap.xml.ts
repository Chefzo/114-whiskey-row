export async function GET() {
  // Use today's date as lastmod so Google sees the sitemap as fresh on
  // every build/deploy. Pages with higher-churn content (homepage, events,
  // blog) get a tighter changefreq.
  const today = new Date().toISOString().slice(0, 10);
  const base = "https://www.114barwhiskeyrow.com";

  const pages = [
    { path: "/",        changefreq: "weekly",  priority: "1.0" },
    { path: "/visit",   changefreq: "monthly", priority: "0.9" },
    { path: "/events",  changefreq: "weekly",  priority: "0.9" },
    { path: "/gallery", changefreq: "monthly", priority: "0.8" },
    { path: "/contact", changefreq: "monthly", priority: "0.8" },
    { path: "/menu",    changefreq: "monthly", priority: "0.8" },
    { path: "/blog",    changefreq: "weekly",  priority: "0.7" },
    { path: "/story",   changefreq: "yearly",  priority: "0.7" },
  ];

  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${base}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
