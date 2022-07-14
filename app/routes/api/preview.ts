import { json, LoaderFunction, redirect } from 'remix';

import { sdk } from '~/lib/hygraph.server';
import { previewModeCookie } from '~/utils/preview-mode.server';
import { parseCookie } from '~/utils/parse-cookie.server';

export const loader: LoaderFunction = async ({ request }) => {
  const requestUrl = new URL(request?.url);
  const secret = requestUrl?.searchParams?.get('secret');
  const slug = requestUrl?.searchParams?.get('slug');

  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.PREVIEW_SECRET || !slug) {
    return json({ message: 'Invalid token' }, { status: 401 });
  }

  // Check if the provided `slug` exists
  const { GetPage } = await sdk({ preview: true });

  const { page } = await GetPage({
    slug,
  });

  // If the slug doesn't exist prevent preview from being enabled
  if (!page) {
    return json({ message: 'Invalid slug' }, { status: 401 });
  }

  // Enable preview by setting a cookie
  const cookie = await parseCookie(request, previewModeCookie);
  cookie.stage = 'draft';

  return redirect(`/${page.slug}`, {
    headers: {
      'Set-Cookie': await previewModeCookie.serialize(cookie),
    },
  });
};
