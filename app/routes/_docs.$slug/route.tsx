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

export async function loader({ request, params }: LoaderFunctionArgs) {
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
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return json({
    page,
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
