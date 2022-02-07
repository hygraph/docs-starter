import { useRef } from "react";
import { ClientOnly } from "remix-utils";
import cc from "classcat";

import type { GetPageQuery } from "~/generated/schema.server";
import { useMarkdownHeadings } from "~/hooks/useMarkdownHeadings";

type PageProps = GetPageQuery["page"];

import { RichTextView } from "./rich-text-view";
import { TableOfContents } from "./table-of-contents";

export function Content({ page }: { page: PageProps }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { links } = useMarkdownHeadings({
    content: page?.content?.markdown as string,
  });

  const hasLinks = links && links?.length > 0;

  return (
    <div className="flex items-start">
      <div
        ref={contentRef}
        className={cc([hasLinks && "max-w-[720px] md:pr-12"])}
      >
        <RichTextView page={page} />
      </div>

      {hasLinks && (
        <ClientOnly>
          <TableOfContents
            contentRef={contentRef}
            links={links}
            labelText="Table of Contents"
            className="sticky top-32 hidden md:block"
          />
        </ClientOnly>
      )}
    </div>
  );
}
