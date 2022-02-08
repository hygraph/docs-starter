import { slugify } from '~/utils/slugify';

type HeadingProps = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: any;
};

export function Heading({ as, children }: HeadingProps) {
  const Component = `${as}` as keyof JSX.IntrinsicElements;

  let title = children?.props?.parent.children;

  if (typeof title === `object`) {
    const parsedTitle = title.map((child: any) => child?.text);

    title = parsedTitle.join(``);
  }

  const slug = slugify(title);

  return (
    <Component
      id={slug}
      className="group relative whitespace-pre-wrap"
      style={{
        scrollMarginTop: `80px`,
      }}
    >
      {children}
      <a
        href={`#${slug}`}
        aria-label="Anchor"
        className="anchor ml-[10px] text-[length:inherit] text-gray-500 !no-underline opacity-0 transition-opacity duration-100 after:text-gray-500 after:content-['#'] group-hover:opacity-100"
      >
        <span className="sr-only">Anchor</span>
      </a>
    </Component>
  );
}
