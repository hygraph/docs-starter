import { MetaFunction, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

import { getSdk } from "~/generated/schema.server";
import type { GetPageQuery } from "~/generated/schema.server";
import { graphcms } from "~/lib/graphcms.server";
import { RichTextView } from "~/components/rich-text-view";

type LoaderData = GetPageQuery;

const fallbackContent = {
  title: "GraphCMS Docs Starter",
  content: {
    json: {
      children: [
        {
          type: "paragraph",
          children: [
            {
              text: "Add a homepage in your GraphCMS project to replace this default view.",
            },
          ],
        },
      ],
    },
  },
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.page?.title,
  };
};

export const loader: LoaderFunction = async () => {
  const { GetPage } = getSdk(graphcms);
  const { page } = await GetPage({
    slug: "homepage",
  });

  return {
    page: page || fallbackContent,
  };
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return <RichTextView page={data.page} />;
}
