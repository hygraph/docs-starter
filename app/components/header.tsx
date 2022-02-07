import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'remix';
import { Popover } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import cc from 'classcat';

import { Logo } from '~/components/logo';
import { GetAllNavItemsQuery } from '~/generated/schema.server';
import { Nav } from '~/components/nav';

export function Header({ navigations }: GetAllNavItemsQuery) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Dirty workaround to close the nav when the route changes
    if (buttonRef.current) buttonRef.current.click();
  }, [location]);

  return (
    <div className="sticky top-0 z-50">
      <Popover
        as="header"
        className={({ open }) =>
          cc([
            open
              ? 'fixed inset-0 z-40 overflow-y-auto bg-white'
              : 'bg-blue-700',
          ])
        }
      >
        {({ open, close }) => (
          <>
            <div className="mx-auto flex max-w-7xl items-center justify-between bg-blue-700 px-6 py-4 md:px-12 md:py-5">
              <Link to="/" className="block w-full">
                <Logo className="inline-block max-w-[140px] text-white" />
              </Link>

              <div className="flex flex-shrink-0 items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-white">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>

            <button
              ref={buttonRef}
              className="hidden"
              aria-hidden="true"
              onClick={() => close()}
            >
              close
            </button>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="mx-auto max-w-3xl px-4 py-6">
                <Nav navigations={navigations} />
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
}
