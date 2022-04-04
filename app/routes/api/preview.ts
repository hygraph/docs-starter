import { json, LoaderFunction, redirect } from 'remix';

import { getSdk } from '~/generated/schema.server';
import { graphcms } from '~/lib/graphcms.server';
import { previewModeCookie } from '~/utils/preview-mode.server';

export const loader: LoaderFunction = async ({ request }) => {
  const requestUrl = new URL(request?.url);
  const secret = requestUrl?.searchParams?.get('secret');
  const slug = requestUrl?.searchParams?.get('slug');

  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.PREVIEW_SECRET || !slug) {
    return json({ message: 'Invalid token' }, { status: 401 });
  }

  // Check if the provided `slug` exists
  const { GetPage } = await getSdk(graphcms);

  const { page } = await GetPage({
    slug,
  });

  // If the slug doesn't exist prevent preview from being enabled
  if (!page) {
    return json({ message: 'Invalid slug' }, { status: 401 });
  }

  // Enable preview by setting a cookie
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await previewModeCookie.parse(cookieHeader)) || {};

  cookie.preview = true;

  return redirect(`/${page.slug}`, {
    headers: {
      'Set-Cookie': await previewModeCookie.serialize(cookie),
    },
  });
};
