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

  return await GetAllNavItems();
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
      <body className="">
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ navItems }: GetAllNavItemsQuery) {
  return (
    <div className="relative mx-auto max-w-7xl">
      <Header />
      <div>
        <Nav navItems={navItems} />
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  const { navItems } = useLoaderData<GetAllNavItemsQuery>();

  return (
    <Document>
      <Layout navItems={navItems} />
    </Document>
  );
}
