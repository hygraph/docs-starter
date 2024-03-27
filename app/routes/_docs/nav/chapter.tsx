import urljoin from 'url-join';
import cc from 'classcat';

import type { NavChapterFragment } from '~/generated/schema.server';
import { Link } from '~/components/link';

export function NavChapter(props: NavChapterFragment) {
  const { title, slug: chapterSlug } = props;

  return (
    <>
      <div className="mb-2">
        <p className="font-semibold text-gray-900">{title}</p>
      </div>

      {props.pages.length > 0 && (
        <ul>
          {props.pages.map((page) => (
            <li key={page.slug}>
              <Link
                href={urljoin(chapterSlug, page.slug)}
                asNavLink
                className={({ isActive }) =>
                  cc([
                    isActive ? 'text-indigo-700' : 'text-gray-700',
                    'block py-0.5 hover:text-indigo-700',
                  ])
                }
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
