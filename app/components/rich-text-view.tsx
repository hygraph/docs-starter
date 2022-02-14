import { RichText } from '@graphcms/rich-text-react-renderer';
import { EmbedReferences, EmbedProps } from '@graphcms/rich-text-types';

import type {
  GetPageQuery,
  Page,
  EmbeddedPageFragment,
} from '~/generated/schema.server';
import { Heading } from './heading';
import { Link } from './link';

type PageProps = GetPageQuery['page'];

export const RichTextView = ({ page }: { page: PageProps }) => {
  return (
    <div className="prose prose-indigo max-w-none prose-h1:font-light prose-h1:text-indigo-700">
      <h1>{page?.title}</h1>
      <RichText
        content={page?.content?.json}
        references={page?.content?.references as EmbedReferences}
        renderers={{
          h1: ({ children }) => <Heading as="h1">{children}</Heading>,
          h2: ({ children }) => <Heading as="h2">{children}</Heading>,
          h3: ({ children }) => <Heading as="h3">{children}</Heading>,
          h4: ({ children }) => <Heading as="h4">{children}</Heading>,
          h5: ({ children }) => <Heading as="h5">{children}</Heading>,
          h6: ({ children }) => <Heading as="h6">{children}</Heading>,
          img: ({ height, width, src, title, altText }) => (
            <img
              src={src}
              alt={altText}
              width={width}
              height={height}
              title={title}
              loading="lazy"
              className="shadow-image"
            />
          ),
          embed: {
            Page: ({ slug, title }: EmbedProps<EmbeddedPageFragment>) => (
              <Link
                href={`/${slug}`}
                className="flex items-center justify-between rounded border border-gray-200 bg-white p-3 no-underline shadow-image md:p-6"
              >
                <span>{title}</span>
                <span>&rarr;</span>
              </Link>
            ),
          },
        }}
      />
    </div>
  );
};
