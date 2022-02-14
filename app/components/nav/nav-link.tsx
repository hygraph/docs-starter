import { ExternalLinkIcon } from '@heroicons/react/outline';
import cc from 'classcat';

import {
  NavExternalLinkFragment,
  NavPageFragment,
} from '~/generated/schema.server';
import { Link } from '~/components/link';

export function ExternalLink(props: NavExternalLinkFragment) {
  return (
    <Link
      href={props.url}
      className="flex items-center py-0.5 text-gray-700 hover:text-indigo-700"
    >
      {props.label}
      <ExternalLinkIcon className="ml-2 h-4 w-4" />
    </Link>
  );
}

export function InternalLink(props: NavPageFragment) {
  return (
    <Link
      href={props.slug}
      asNavLink
      className={({ isActive }) =>
        cc([
          isActive ? 'text-indigo-700' : 'text-gray-700',
          'block py-0.5 hover:text-indigo-700',
        ])
      }
    >
      {props.title}
    </Link>
  );
}
