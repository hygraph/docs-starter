import { getSdk } from '~/generated/schema.server';
import { hygraph } from '~/lib/hygraph.server';
import { getDomainUrl, getUrl } from './seo';

type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: 0.0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;
};

export async function getSitemapXml(request: Request) {
  const { GetAllPages } = getSdk(hygraph);
  const { pages } = await GetAllPages();

  const domainUrl = getDomainUrl(request);

  const fields: SitemapEntry[] = pages.map((page) => ({
    loc: getUrl({
      origin: domainUrl,
      path: page.slug === 'homepage' ? '/' : page.slug,
    }),
    lastmod: new Date(page.updatedAt).toISOString(),
    changefreq: `daily`,
    priority: 0.7,
  }));

  function getEntry({ loc, lastmod, changefreq, priority }: SitemapEntry) {
    return `
<url>
  <loc>${loc}</loc>
  ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
  ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
  ${priority ? `<priority>${priority}</priority>` : ''}
</url>
  `.trim();
  }

  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  ${fields.map((entry) => getEntry(entry)).join('')}
</urlset>
  `.trim();
}
