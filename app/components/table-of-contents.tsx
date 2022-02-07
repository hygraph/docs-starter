import { ReactNode, RefObject } from "react";
import cc from "classcat";

import { useActiveHeading } from "~/hooks/useActiveHeading";
import { slugify } from "~/utils/slugify";

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

export function TableOfContents({
  links,
  contentRef,
  className,
  labelText,
}: TOCProps) {
  const { activeHeading } = useActiveHeading({
    ref: contentRef,
    links,
  });

  return (
    <nav
      className={cc([`relative w-full max-w-[200px] rounded-md`, className])}
    >
      <Label>{labelText || `Table of contents`}</Label>

      <ul className="w-full">
        {links.map(({ title }, index) => {
          const slug = slugify(title);
          const isActive = activeHeading === index;

          return (
            <li
              key={slug}
              className={cc([
                `rounded-r transition`,
                isActive && `bg-catskill-white border-l-2 border-blue-700`,
                !isActive && `border-l border-gray-300`,
              ])}
            >
              <a
                className={cc([
                  `block h-full w-full py-2 px-4 text-[13px] leading-5 transition`,
                  isActive && `font-semibold text-gray-900`,
                  !isActive && `text-gray-700`,
                ])}
                href={`#${slug}`}
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
