import { ReactNode, RefObject } from 'react';
import { Link } from 'remix';
import cc from 'classcat';

import { useActiveHeading } from '~/hooks/useActiveHeading';
import { slugify } from '~/utils/slugify';

type LabelProps = {
  children: ReactNode;
};

export function Label({ children }: LabelProps) {
  return (
    <h4 className="text-haiti mb-4 pl-2 text-xs font-medium uppercase tracking-wider">
      {children}
    </h4>
  );
}

type TOCProps = {
  links: {
    title: string;
    depth: number;
  }[];
  contentRef: RefObject<HTMLElement>;
  className?: string;
  labelText?: string;
};

export function TableOfContents({ links, className, labelText }: TOCProps) {
  const { currentIndex } = useActiveHeading();

  return (
    <nav
      className={cc([`relative w-full max-w-[208px] rounded-md`, className])}
    >
      <Label>{labelText || `Table of contents`}</Label>

      <ul className="w-full pl-2">
        {links.map(({ title }, index) => {
          const slug = slugify(title);
          const isActive = currentIndex === index;

          return (
            <li
              key={slug}
              className={cc([
                `rounded-r transition`,
                isActive && `bg-catskill-white border-l-2 border-indigo-700`,
                !isActive && `border-l border-gray-300`,
              ])}
            >
              <Link
                className={cc([
                  `block h-full w-full py-2 px-4 text-[13px] leading-5 transition`,
                  isActive && `font-semibold text-gray-900`,
                  !isActive && `text-gray-700`,
                ])}
                to={`#${slug}`}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
