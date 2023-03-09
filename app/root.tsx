import { ReactNode } from 'react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction, LoaderArgs } from '@remix-run/node';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';

import styles from '~/styles/tailwind.css';
import { getUrl, getDomainUrl } from '~/utils/seo';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export async function loader({ request }: LoaderArgs) {
  return typedjson({
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  });
}

function Document({
  children,
  requestInfo,
}: {
  children: ReactNode;
  requestInfo: { origin: string; path: string };
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
  const { requestInfo } = useTypedLoaderData<typeof loader>();

  return (
    <Document requestInfo={requestInfo}>
      <Outlet />
    </Document>
  );
}
