import { ReactNode, LinkHTMLAttributes } from 'react';
import { Link as RemixLink, NavLink } from 'remix';
import type { NavLinkProps, LinkProps as RemixLinkProps } from 'remix';

const stripTrailingSlash = (href: string) => {
  if (href === `/`) return href;

  return href.endsWith(`/`) ? href.slice(0, -1) : href;
};

export type LinkProps = Partial<Omit<RemixLinkProps, 'className' | 'to'>> & {
  href: string;
  children: ReactNode;
  target?: string;
  asNavLink?: boolean;
  className?: NavLinkProps['className'];
};

export function Link({ href, children, asNavLink, ...props }: LinkProps) {
  const anchorLink = href.startsWith(`#`);

  if (href.includes(`http`) || href.includes(`mailto`) || anchorLink) {
    return (
      <a
        href={stripTrailingSlash(href)}
        {...(!anchorLink && { rel: `noopener noreferrer`, target: `_blank` })}
        {...(props as LinkHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  if (asNavLink) {
    return (
      <NavLink {...props} to={stripTrailingSlash(href)}>
        {children}
      </NavLink>
    );
  }

  return (
    <RemixLink {...(props as RemixLinkProps)} to={stripTrailingSlash(href)}>
      {children}
    </RemixLink>
  );
}
