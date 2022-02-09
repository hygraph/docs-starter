import { LoaderFunction } from 'remix';
import { getSitemapXml } from '~/utils/sitemap.server';

export const loader: LoaderFunction = async ({ request }) => {
  const sitemap = await getSitemapXml(request);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(sitemap)),
      'cache-control': 'max-age=900',
    },
  });
};
