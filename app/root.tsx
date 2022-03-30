import {
  json,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix';
import type { MetaFunction, LoaderFunction } from 'remix';
import cc from 'classcat';

import { graphcms } from '~/lib/graphcms.server';
import { getSdk } from '~/generated/schema.server';
import type { GetAllNavItemsQuery } from '~/generated/schema.server';

import styles from './tailwind.css';
import { ReactNode } from 'react';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Nav } from './components/nav';
import { getDomainUrl, getSocialMetas, getUrl } from './utils/seo';
import { PreviewBanner } from './components/preview-banner';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

type LoaderData = GetAllNavItemsQuery & {
  isInPreview: boolean;
  requestInfo: {
    origin: string;
    path: string;
  };
};

export const meta: MetaFunction = ({ data }) => {
  const requestInfo = (data as LoaderData | undefined)?.requestInfo;

  return {
    viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
    'theme-color': '#1d4ed8',
    ...getSocialMetas({
      origin: requestInfo?.origin,
      url: getUrl(requestInfo),
    }),
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const requestUrl = new URL(request?.url);
  const previewParam = requestUrl?.searchParams?.get('preview');
  const isInPreview = previewParam === process.env.PREVIEW_SECRET;

  if (isInPreview) {
    graphcms.setHeader(
      `authorization`,
      `Bearer ${process.env.GRAPHCMS_PREVIEW_TOKEN}`,
    );
  }

  const { GetAllNavItems } = getSdk(graphcms);

  const { navigations } = await GetAllNavItems();

  return json({
    navigations,
    isInPreview,
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  });
};

function Document({
  children,
  requestInfo,
}: {
  children: ReactNode;
  requestInfo: LoaderData['requestInfo'];
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />

        <link rel="canonical" href={getUrl(requestInfo)} />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ navigations, isInPreview }: LoaderData) {
  return (
    <>
      <div className="sticky top-0 z-50">
        {isInPreview && <PreviewBanner />}

        <Header navigations={navigations} />
      </div>

      <div className="bg-white">
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

export default function App() {
  const { navigations, requestInfo, isInPreview } = useLoaderData<LoaderData>();

  return (
    <Document requestInfo={requestInfo}>
      <Layout
        navigations={navigations}
        requestInfo={requestInfo}
        isInPreview={isInPreview}
      />
    </Document>
  );
}
