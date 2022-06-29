import urljoin from 'url-join';

const defaultDomain = 'https://docs.withheadlesscms.com';

export function removeTrailingSlash(s: string) {
  return s.endsWith('/') ? s.slice(0, -1) : s;
}

export function getUrl(requestInfo?: { origin: string; path: string }) {
  return removeTrailingSlash(
    urljoin(requestInfo?.origin ?? defaultDomain, requestInfo?.path ?? ''),
  );
}

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');

  if (!host) {
    throw new Error('Could not determine domain URL.');
  }

  const protocol = host.includes('localhost') ? 'http' : 'https';

  return `${protocol}://${host}`;
}

export function getSocialMetas({
  url,
  title = 'Docs Starter - Hygraph',
  description = 'Docs Starter built with Remix and powered by Hygraph. No longer are you tied to markdown files, Git workflows, and writing documentation in your code editor.',
  noindex = false,
  image,
  origin,
}: {
  origin?: string;
  image?: string;
  url: string;
  title?: string;
  description?: string;
  noindex?: boolean;
}) {
  const parsedImage = image
    ? image
    : urljoin(origin ?? defaultDomain, '/og-fallback.png');

  const tags: { [key: string]: string } = {
    title,
    description,
    image: parsedImage,
    'og:url': url,
    'og:title': title,
    'og:image': parsedImage,
    'og:description': description,
    'og:type': 'website',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@hygraphcom',
    'twitter:site': '@hygraphcom',
    'twitter:title': title,
    'twitter:image': parsedImage,
    'twitter:description': description,
    'twitter:alt': title,
  };

  if (noindex) {
    tags.robots = 'noindex';
  }

  return tags;
}
