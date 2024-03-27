import { GitHub } from './github';
import { Link } from '~/components/link';

export function Footer() {
  return (
    <div className="border-t border-gray-100 h-16 bg-white mt-auto flex items-center relative z-10">
      <footer className="mx-auto max-w-7xl px-6 lg:px-12 w-full">
        <div className="flex items-center justify-between w-full">
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
