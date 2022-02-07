import { redirect, useLoaderData, MetaFunction } from "remix";
import type { LoaderFunction } from "remix";

import { getSdk } from "~/generated/schema.server";
import type { GetPageQuery } from "~/generated/schema.server";
import { graphcms } from "~/lib/graphcms.server";
import { RichTextView } from "~/components/rich-text-view";

type LoaderData = GetPageQuery;

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.page?.title,
  };
};

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

export default function PostRoute() {
  const data = useLoaderData<LoaderData>();

  return <RichTextView page={data.page} />;
}
