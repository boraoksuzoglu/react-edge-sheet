import { NextResponse } from 'next/server';
import { docsNav } from '@/lib/nav';

const BASE_URL = 'https://react-sheet.borao.dev';

export const dynamic = 'force-static';

export function GET() {
  const staticPages = [
    { loc: BASE_URL, priority: '1.0', changefreq: 'weekly' },
    { loc: `${BASE_URL}/playground`, priority: '0.7', changefreq: 'monthly' },
  ];

  const docPages = docsNav.map((item) => ({
    loc: `${BASE_URL}/docs/${item.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const allPages = [...staticPages, ...docPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
