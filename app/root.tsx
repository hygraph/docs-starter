import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction, LoaderFunction } from "remix";

import { graphcms } from "~/lib/graphcms.server";
import { getSdk } from "~/generated/schema.server";
import type { GetAllNavItemsQuery } from "~/generated/schema.server";

import styles from "./tailwind.css";
import { ReactNode } from "react";
import { Header } from "./components/header";
import { Nav } from "./components/nav";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const loader: LoaderFunction = async () => {
  const { GetAllNavItems } = getSdk(graphcms);

  return GetAllNavItems();
};

function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ navigations }: GetAllNavItemsQuery) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-5xl">
        <div className="p-6 md:flex md:space-x-12 md:px-12 md:py-12">
          <nav className="sticky top-32 h-full w-full flex-shrink-0 pb-6 md:w-52 md:pb-12">
            <Nav navigations={navigations} />
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const { navigations } = useLoaderData<GetAllNavItemsQuery>();

  return (
    <Document>
      <Layout navigations={navigations} />
    </Document>
  );
}
