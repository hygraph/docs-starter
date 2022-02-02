import type { GetAllNavItemsQuery } from "~/generated/schema.server";

export function Nav({ navItems }: GetAllNavItemsQuery) {
  console.log(navItems);
  return (
    <aside>
      <nav></nav>
    </aside>
  );
}
