import { GraphCMSLogo } from "./graphcms-logo";

export function Header() {
  return (
    <header className="sticky top-0 bg-white py-6">
      <div>
        <GraphCMSLogo className="max-w-[160px]" />
      </div>
    </header>
  );
}
