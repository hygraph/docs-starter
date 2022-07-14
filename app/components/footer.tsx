import { GitHub } from './github';
import { Link } from './link';

export function Footer() {
  return (
    <div className="relative z-20 mt-6 border-t border-gray-100 py-6 md:mt-12 md:py-12">
      <footer className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <p>
            Docs Starter by{' '}
            <Link href="https://hygraph.com" className="text-indigo-700">
              Hygraph
            </Link>
          </p>

          <Link
            href="https://github.com/hygraph/docs-starter"
            className="text-gray-500 hover:text-indigo-700"
          >
            <GitHub className="h-7 w-7" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
