import { GraphCMSLogo } from "./graphcms-logo";

export function Header() {
  return (
    <div className="sticky top-0 z-50 border-b border-gray-300 shadow">
      <div className="before:absolute before:z-[-1] before:block before:h-full before:w-full before:bg-white before:bg-opacity-[.60] before:backdrop-blur-md">
        <header className="mx-auto max-w-5xl py-4 px-6">
          <div>
            <GraphCMSLogo className="max-w-[140px]" />
          </div>
        </header>
      </div>
    </div>
  );
}
