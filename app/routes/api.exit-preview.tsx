import { redirect } from '@remix-run/node';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

import { parseCookie } from '~/utils/parse-cookie.server';
import { previewModeCookie } from '~/utils/preview-mode.server';

export async function loader({}: LoaderFunctionArgs) {
  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  const cookie = await parseCookie(request, previewModeCookie);
  cookie.stage = 'published';

  return redirect(`/`, {
    headers: {
      'Set-Cookie': await previewModeCookie.serialize(cookie),
    },
  });
}
