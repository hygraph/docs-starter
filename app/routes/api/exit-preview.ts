import { LoaderFunction, redirect } from 'remix';

import { previewModeCookie } from '~/utils/preview-mode.server';

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await previewModeCookie.parse(cookieHeader)) || {};

  cookie.preview = false;

  return redirect(`/`, {
    headers: {
      'Set-Cookie': await previewModeCookie.serialize(cookie),
    },
  });
};
