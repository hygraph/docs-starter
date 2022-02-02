import type { GetAllNavItemsQuery } from "~/generated/schema.server";

export function Nav({ navigations }: GetAllNavItemsQuery) {
  console.log(navigations);
  return (
    <aside>
      <nav></nav>
    </aside>
  );
}
