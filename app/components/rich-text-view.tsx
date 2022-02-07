import { RichText } from '@graphcms/rich-text-react-renderer';

import type { GetPageQuery } from '~/generated/schema.server';
import { Heading } from './heading';

type PageProps = GetPageQuery['page'];

export const RichTextView = ({ page }: { page: PageProps }) => {
  return (
    <div className="prose prose-blue max-w-none prose-h1:font-light prose-h1:text-blue-700">
      <h1>{page?.title}</h1>
      <RichText
        content={page?.content?.json}
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
        }}
      />
    </div>
  );
};
