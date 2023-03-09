import { Outlet, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import type { MetaFunction, LoaderArgs } from '@remix-run/node';
import cc from 'classcat';

import { sdk } from '~/lib/hygraph.server';

import { Header } from '~/components/header';
import { Footer } from '~/components/footer';
import { Nav } from '~/components/nav';
import { getDomainUrl, getSocialMetas, getUrl } from '~/utils/seo';
import { PreviewBanner } from '~/components/preview-banner';
import { isPreviewMode } from '~/utils/preview-mode.server';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const requestInfo = data.requestInfo;

  return {
    viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
    'theme-color': '#1d4ed8',
    ...getSocialMetas({
      origin: requestInfo?.origin,
      url: getUrl(requestInfo),
    }),
  };
};

export async function loader({ request }: LoaderArgs) {
  const isInPreview = await isPreviewMode(request);

  const { GetAllNavItems } = await sdk({ preview: isInPreview });
  const { navigations } = await GetAllNavItems();

  return json({
    navigations,
    isInPreview,
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  });
}

export default function Layout() {
  const { navigations, isInPreview } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="sticky top-0 z-50">
        {isInPreview && <PreviewBanner />}

        <Header navigations={navigations} />
      </div>

      <div className="h-full bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="p-6 text-indigo-700 md:flex md:space-x-12 md:px-12 md:py-12">
            <nav
              className={cc([
                'fixed hidden h-full w-full flex-shrink-0 pb-6 md:block md:w-52 md:pb-12',
                isInPreview ? 'top-[160px]' : 'top-[124px]',
              ])}
            >
              <Nav navigations={navigations} />
            </nav>
            <main className="w-full md:pl-52">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
