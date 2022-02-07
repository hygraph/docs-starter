export function useMarkdownHeadings({ content }: { content: string }) {
  const headingRegex = /^(#{2,2} .*[\n\r\v\t\s]*)$/gim;

  const contentHeading = content.match(headingRegex);
  const links = contentHeading?.map((link) => {
    const level = link.match(/^#{2}/);

    return {
      title: link.slice(3),
      depth: level ? level[0].length : 0,
    };
  });

  return { links };
}
