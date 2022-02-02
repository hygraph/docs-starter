import { ReactNode, LinkHTMLAttributes } from "react";
import { Link as RemixLink } from "remix";
import type { LinkProps as RemixLinkProps } from "remix";

const stripTrailingSlash = (href: string) => {
  if (href === `/`) return href;

  return href.endsWith(`/`) ? href.slice(0, -1) : href;
};

export type LinkProps = LinkHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  target?: string;
} & Partial<RemixLinkProps>;

export function Link({ href, children, ...props }: LinkProps) {
  if (!href) return null;

  const anchorLink = href.startsWith(`#`);

  if (href.includes(`http`) || href.includes(`mailto`) || anchorLink) {
    return (
      <a
        href={stripTrailingSlash(href)}
        {...(!anchorLink && { rel: `noopener noreferrer`, target: `_blank` })}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <RemixLink to={stripTrailingSlash(href)} {...props}>
      {children}
    </RemixLink>
  );
}
