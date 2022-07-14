import { redirect, useLoaderData, MetaFunction, json } from 'remix';
import type { LoaderFunction } from 'remix';

import type { GetPageQuery } from '~/generated/schema.server';
import { sdk } from '~/lib/hygraph.server';
import { Content } from '~/components/content';
import { getDomainUrl, getSocialMetas, getUrl } from '~/utils/seo';
import { isPreviewMode } from '~/utils/preview-mode.server';

type LoaderData = GetPageQuery & {
  requestInfo: {
    origin: string;
    path: string;
  };
};

export const meta: MetaFunction = ({ data }) => {
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

export const loader: LoaderFunction = async ({ params, request }) => {
  const { chapter, slug } = params;

  const isInPreview = await isPreviewMode(request);

  const { GetPage } = await sdk({ preview: isInPreview });
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

  return json({
    page,
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  });
};

export default function PostRoute() {
  const data = useLoaderData<LoaderData>();

  return <Content page={data.page} />;
}
