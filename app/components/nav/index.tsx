import type {
  GetAllNavItemsQuery,
  NavChapterFragment,
  NavExternalLinkFragment,
  NavPageFragment,
} from '~/generated/schema.server';
import { NavChapter } from './chapter';
import { ExternalLink, InternalLink } from './nav-link';

type NavigationItem = GetAllNavItemsQuery['navigations'][0];

type NavRendererProps = NavigationItem['linkTo'][0];

export function NavRenderer({ __typename, ...props }: NavRendererProps) {
  switch (__typename) {
    case 'Chapter':
      return (
        <div className="py-6">
          <NavChapter {...(props as NavChapterFragment)} />
        </div>
      );
    case 'ExternalLink':
      return <ExternalLink {...(props as NavExternalLinkFragment)} />;
    case 'Page':
      return <InternalLink {...(props as NavPageFragment)} />;
    default:
      return <></>;
  }
}

export function Nav({ navigations }: GetAllNavItemsQuery) {
  return (
    <div>
      <InternalLink title="Homepage" slug="/" id="homepage" />
      {navigations[0].linkTo.map((entry) => (
        <NavRenderer key={entry.id} {...entry} />
      ))}
    </div>
  );
}
