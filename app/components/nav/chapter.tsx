import type { NavChapterFragment } from "~/generated/schema.server";
import { Link } from "~/components/link";

export function NavChapter(props: NavChapterFragment) {
  return (
    <>
      <div className="mb-2">
        {props.slug ? (
          <Link href={props.slug} className="font-bold">
            {props.title}
          </Link>
        ) : (
          <p className="font-bold">{props.title}</p>
        )}
      </div>

      {props.pages.length > 0 && (
        <ul>
          {props.pages.map((page) => (
            <li key={page.slug}>
              <Link href={page.slug}>{page.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
