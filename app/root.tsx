import { ReactNode } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/node';

import { getUrl, getDomainUrl } from '~/utils/seo';

import './tailwind.css';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { requestInfo } = useLoaderData<typeof loader>();

  return (
    <Document requestInfo={requestInfo}>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : error instanceof Error
              ? error.message
              : 'Unknown Error'}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
