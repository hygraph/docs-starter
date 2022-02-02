import { ExternalLinkIcon } from "@heroicons/react/outline";

import {
  NavExternalLinkFragment,
  NavPageFragment,
} from "~/generated/schema.server";
import { Link } from "~/components/link";

export function ExternalLink(props: NavExternalLinkFragment) {
  return (
    <Link href={props.url} className="flex items-center">
      {props.label}
      <ExternalLinkIcon className="ml-2 h-4 w-4" />
    </Link>
  );
}

export function InternalLink(props: NavPageFragment) {
  return (
    <Link href={props.slug} className="block">
      {props.title}
    </Link>
  );
}