import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import { graphcms } from "~/lib/graphcms.server";
import { getSdk } from "~/generated/schema.server";

export const loader: LoaderFunction = async () => {
  const { GetAllNavItems } = getSdk(graphcms);

  const { navItems } = await GetAllNavItems();

  return { navItems };
};

export default function Index() {
  const data = useLoaderData();

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
