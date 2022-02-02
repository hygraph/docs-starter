import { redirect, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import { getSdk } from "~/generated/schema.server";
import type { GetPageQuery } from "~/generated/schema.server";
import { graphcms } from "~/lib/graphcms.server";
import { RichText } from "@graphcms/rich-text-react-renderer";

export const loader: LoaderFunction = async ({ params }) => {
  const { chapter, slug } = params;

  const { GetPage } = getSdk(graphcms);
  const { page } = await GetPage({
    slug: slug as string,
  });

  if (!page) {
    throw redirect(`/404`);
  }

  // Checks if the page chapter is the same as the chapter slug from the params
  if (chapter && slug && page.chapter?.slug !== chapter) {
    throw redirect(`/404`);
  }

  return {
    page,
  };
};

type LoaderData = GetPageQuery;

export default function PostRoute() {
  const data = useLoaderData<LoaderData>();

  return <RichText content={data.page?.content?.json} />;
}
