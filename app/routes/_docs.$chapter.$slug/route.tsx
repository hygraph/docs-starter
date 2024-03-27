import { json, redirect } from '@remix-run/node';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

import { sdk } from '~/lib/hygraph.server';
import { Content } from '~/components/content';
import { getDomainUrl, getSocialMetas, getUrl } from '~/utils/seo';
import { isPreviewMode } from '~/utils/preview-mode.server';
import { useLoaderData } from '@remix-run/react';
import { GetPageQuery } from '~/generated/schema.server';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const requestInfo = data?.requestInfo;

  const title = data?.page?.seo?.title ?? data?.page?.title;

  return getSocialMetas({
    title,
    description: data?.page?.seo?.description as string,
    requestInfo,
    url: getUrl(requestInfo),
    noindex: data?.page?.seo?.noindex ?? false,
    image: data?.page?.seo?.image?.url,
  });
};

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { chapter, slug } = params;

  const isInPreview = await isPreviewMode(request);

  const { GetPage } = await sdk({ preview: isInPreview });
  const { page } = await GetPage({
    slug: slug as string,
  });

  if (!page) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  // Checks if the page chapter is the same as the chapter slug from the params
  if (chapter && slug && page.chapter?.slug !== chapter) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return json({
    page: page,
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  });
}

export default function PostRoute() {
  const data = useLoaderData<typeof loader>();

  return <Content page={data.page as GetPageQuery['page']} />;
}
