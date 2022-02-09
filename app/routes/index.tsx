import { json, MetaFunction, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';

import { getSdk } from '~/generated/schema.server';
import type { GetPageQuery } from '~/generated/schema.server';
import { graphcms } from '~/lib/graphcms.server';
import { Content } from '~/components/content';
import { getDomainUrl, getSocialMetas, getUrl } from '~/utils/seo';

type LoaderData = GetPageQuery & {
  requestInfo: {
    origin: string;
    path: string;
  };
};

const fallbackContent = {
  title: 'GraphCMS Docs Starter',
  content: {
    json: {
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Add a homepage in your GraphCMS project to replace this default view.',
            },
          ],
        },
      ],
    },
    markdown: ``,
  },
};

type MetaFunctionData = {
  data: GetPageQuery;
};

export const meta: MetaFunction = ({ data }: MetaFunctionData) => {
  const requestInfo = (data as LoaderData | undefined)?.requestInfo;

  const title = data?.page?.seo?.title ?? data?.page?.title;

  return getSocialMetas({
    title,
    description: data?.page?.seo?.description as string,
    origin: requestInfo?.origin,
    url: getUrl(requestInfo),
    noindex: data?.page?.seo?.noindex ?? false,
    image: data?.page?.seo?.image?.url,
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const { GetPage } = getSdk(graphcms);
  const { page } = await GetPage({
    slug: 'homepage',
  });

  const requestInfo = {
    origin: getDomainUrl(request),
    path: new URL(request.url).pathname,
  };

  return json({
    page: page ? page : fallbackContent,
    requestInfo,
  });
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return <Content page={data.page} disableToc />;
}
