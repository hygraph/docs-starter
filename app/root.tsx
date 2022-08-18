import { ReactNode } from 'react';
import {
  json,
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix';

import styles from '~/styles/tailwind.css';
import { getUrl, getDomainUrl } from '~/utils/seo';

type LoaderData = {
  requestInfo: {
    origin: string;
    path: string;
  };
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const loader: LoaderFunction = async ({ request }) => {
  return json({
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

export default function Root() {
  const { requestInfo } = useLoaderData<LoaderData>();

  return (
    <Document requestInfo={requestInfo}>
      <Outlet />
    </Document>
  );
}
