import { RichText } from "@graphcms/rich-text-react-renderer";

import type { GetPageQuery } from "~/generated/schema.server";

type PageProps = GetPageQuery["page"];

export const RichTextView = ({ page }: { page: PageProps }) => {
  return (
    <div className="prose prose-blue prose-h1:text-blue-700 prose-h1:font-light max-w-none">
      <h1>{page?.title}</h1>
      <RichText content={page?.content?.json} />
    </div>
  );
};
