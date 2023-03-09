import type { LoaderArgs } from '@remix-run/node';
import {
  typedjson,
  TypedMetaFunction,
  useTypedLoaderData,
} from 'remix-typedjson';

import { sdk } from '~/lib/hygraph.server';
import { Content } from '~/components/content';
import { getDomainUrl, getSocialMetas, getUrl } from '~/utils/seo';
import { isPreviewMode } from '~/utils/preview-mode.server';
import { GetPageQuery } from '~/generated/schema.server';

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

export const meta: TypedMetaFunction<typeof loader> = ({ data }) => {
  const requestInfo = data?.requestInfo;

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

export async function loader({ request }: LoaderArgs) {
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

  return typedjson({
    page: page ?? fallbackContent,
    requestInfo,
  });
}

export default function Index() {
  const data = useTypedLoaderData<typeof loader>();

  return <Content page={data.page} disableToc />;
}
