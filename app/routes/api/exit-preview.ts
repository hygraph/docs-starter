import { LoaderFunction, redirect } from 'remix';

import { parseCookie } from '~/utils/parse-cookie.server';
import { previewModeCookie } from '~/utils/preview-mode.server';

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = await parseCookie(request, previewModeCookie);
  cookie.preview = false;

  return redirect(`/`, {
    headers: {
      'Set-Cookie': await previewModeCookie.serialize(cookie),
    },
  });
};
