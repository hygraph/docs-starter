import { Link } from "remix";

import { GraphCMSLogo } from "./graphcms-logo";

export function Header() {
  return (
    <div className="sticky top-0 z-50 bg-blue-700">
      <header className="mx-auto max-w-7xl py-4 px-6 md:py-5 md:px-12">
        <Link to="/">
          <GraphCMSLogo className="inline-block max-w-[140px] text-white" />
        </Link>
      </header>
    </div>
  );
}
