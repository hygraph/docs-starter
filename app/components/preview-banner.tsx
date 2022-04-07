export function PreviewBanner() {
  return (
    <div className="w-full bg-indigo-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="text-center text-sm font-medium text-white sm:text-base">
          <span>
            You&apos;re in <strong>preview mode</strong> (Content served from
            DRAFT) &mdash;&nbsp;
          </span>
          <form
            action="/api/exit-preview"
            method="post"
            className="inline-block"
          >
            <button type="submit" className="font-bold text-white underline">
              Exit Preview Mode <span aria-hidden="true">&rarr;</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
