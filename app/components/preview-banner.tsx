export function PreviewBanner() {
  return (
    <div className="w-full bg-indigo-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:px-16 sm:text-center">
          <p className="font-medium text-white">
            <span>
              You&apos;re in <strong>preview mode</strong> (Content served from
              DRAFT) &mdash;&nbsp;
            </span>
            <span className="block sm:ml-2 sm:inline-block">
              <form action="/api/exit-preview" method="post">
                <button
                  type="submit"
                  className="font-bold text-white underline"
                >
                  Exit Preview Mode <span aria-hidden="true">&rarr;</span>
                </button>
              </form>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
