import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { sdk } from '~/lib/hygraph.server';
import { Content } from '~/components/content';
import { getDomainUrl, getSocialMetas, getUrl } from '~/utils/seo';
import { isPreviewMode } from '~/utils/preview-mode.server';
import { GetPageQuery } from '~/generated/schema.server';
import { useLoaderData } from '@remix-run/react';

const fallbackContent: GetPageQuery['page'] = {
  title: 'Hygraph Docs Starter',
  slug: ``,
  content: {
    json: {
      children: [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Add a homepage in your Hygraph project to replace this default view.',
            },
          ],
        },
      ],
    },
    references: [],
    markdown: ``,
  },
  seo: {
    title: 'Hygraph Docs Starter',
    description: `Docs Starter built with Remix and powered by Hygraph. No longer are you tied to markdown files, Git workflows, and writing documentation in your code editor.`,
    noindex: false,
    image: {
      url: ``,
    },
  },
};

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

export async function loader({ request }: LoaderFunctionArgs) {
  const isInPreview = await isPreviewMode(request);

  const { GetPage } = await sdk({
    preview: isInPreview,
  });
  const { page } = await GetPage({
    slug: 'homepage',
  });

  const requestInfo = {
    origin: getDomainUrl(request),
    path: new URL(request.url).pathname,
  };

  return json({
    page: page ?? fallbackContent,
    requestInfo,
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return <Content page={data.page as GetPageQuery['page']} disableToc />;
}
