import { ReactNode } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useRouteError,
} from '@remix-run/react';
import type { LoaderFunctionArgs } from '@remix-run/node';

import { getDomainUrl } from '~/utils/seo';

import './tailwind.css';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  });
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
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
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Layout>
      <div className="p-6 text-white md:flex md:space-x-12 md:px-12 md:py-12 min-h-screen bg-indigo-700">
        <main className="w-full md:pl-52">
          <h1 className="text-2xl">
            {isRouteErrorResponse(error)
              ? `${error.status} ${error.statusText}`
              : error instanceof Error
                ? error.message
                : 'Unknown Error'}
          </h1>
        </main>
      </div>
    </Layout>
  );
}
