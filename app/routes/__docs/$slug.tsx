import { json, MetaFunction, redirect, useLoaderData } from 'remix';
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
  const { slug } = params;

  // If slug is /homepage, redirect it to the index page to avoid duplicated pages
  // Important for SEO
  if (slug === `homepage`) {
    throw redirect('/', {
      status: 301,
    });
  }

  const isInPreview = await isPreviewMode(request);

  const { GetPage, GetFirstPageFromChapter } = await sdk({
    preview: isInPreview,
  });
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
