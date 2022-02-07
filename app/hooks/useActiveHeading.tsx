import { RefObject, useEffect, useState, useCallback } from 'react';
import throttle from 'lodash.throttle';
import { useEvent } from 'react-use';

const accumulateOffsetTop = (
  el: HTMLHeadingElement,
  totalOffset = 0,
): number => {
  while (el) {
    totalOffset += el.offsetTop - el.scrollTop + el.clientTop;
    el = el.offsetParent as HTMLHeadingElement;
  }

  return totalOffset;
};

type UseActiveHeadingProps = {
  links: {
    title: string;
    depth: number;
  }[];
  ref: RefObject<HTMLElement>;
};

export function useActiveHeading({ ref, links }: UseActiveHeadingProps) {
  const [activeHeading, setActiveHeading] = useState<number | null>(null);
  const [nodes, setNodes] = useState<HTMLHeadingElement[]>([]);

  useEffect(() => {
    const allHeadings = ref.current?.querySelectorAll(`h2`);
    const headingNodes = allHeadings ? Array.from(allHeadings) : [];

    setNodes(headingNodes);
    setActiveHeading(null);
  }, [ref, links]);

  const scrollHandler = useCallback(
    throttle(() => {
      if (nodes.length > 0) {
        const offsets = nodes
          .map((el) => {
            const accumulatedOffset = accumulateOffsetTop(el);

            if (accumulatedOffset > 0) return accumulatedOffset;

            return null;
          })
          .filter(Boolean);

        if (offsets.length > 0) {
          const activeIndex = offsets.findIndex((offset) => {
            if (offset) {
              const position = window.scrollY + 0.8 * window.innerHeight;
              return offset > position;
            }

            return false;
          });

          setActiveHeading(
            activeIndex === -1 ? links.length - 1 : activeIndex - 1,
          );
        }
      }
    }, 200),
    [nodes],
  );

  useEvent(`scroll`, scrollHandler, window, { capture: true });

  return { activeHeading };
}
