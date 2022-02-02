import { redirect, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import { getSdk } from "~/generated/schema.server";
import type { GetPageQuery } from "~/generated/schema.server";
import { graphcms } from "~/lib/graphcms.server";
import { RichText } from "@graphcms/rich-text-react-renderer";

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  const { GetPage, GetFirstPageFromChapter } = getSdk(graphcms);
  const { page } = await GetPage({
    slug: slug as string,
  });

  // If there's no page with the given slug, try to find a chapter
  if (!page) {
    // If there's a chapter, redirect to the first page of the chapter
    const { chapter } = await GetFirstPageFromChapter({ slug: slug as string });

    if (chapter) {
      throw redirect(`/${slug}/${chapter.pages[0].slug}`);
    }

    // If there's no chapter, redirect to 404
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
