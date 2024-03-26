import type { LoaderFunctionArgs } from '@remix-run/node';

import { getSitemapXml } from '~/utils/sitemap.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const sitemap = await getSitemapXml(request);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(sitemap)),
      'cache-control': 'max-age=900',
    },
  });
}
